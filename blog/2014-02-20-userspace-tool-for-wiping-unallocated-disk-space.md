---
title: "Userspace tool for (anti-forensically safe) wiping unallocated disk space"
date: "2014-02-20"
categories: 
  - "forensics"
layout: post
---

This is just a simple idea and could as easily be rewritten in, e.g., Powershell, Perl, Python or whatever you want.

I had some problems with compressing the image of a virtual machine, which has been intensively used for a long period of time. I deleted all files inside the VM, but this does not really wipe the data, so that blocks of deleted files must be compressed as well. The simple fix of this is to overwrite unallocated blocks with all zeros.

Now, how to accomplish this? This is easy: We create a new file, and fill it with zeros. If we are finished (`fwrite()`failes), we are done and delete the file. That's it.

Here is the code. Feel free to reimplement it in the language of your choice:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>

const size_t block_size = 512;
const size_t block_count = 1;
static const char* filename = "diskwipe.dat";
static char* block = 0;
static FILE* fp = NULL;

void cleanup() {
	if (block) {
		free(block);
	}

	if (fp != NULL) {
		fflush(fp);
		fclose(fp);
		fp = NULL;
	}

	if (0 != _unlink(filename)) {
		perror("Unable to delete diskwipe.dat: ");
	}
}

void finish(int res) {
	cleanup();
	exit(res);
}

void handle_sigint (int sig) {
	finish(1);
}

void do_wipe() {
	unsigned long int count = 0;
	fp = fopen(filename, "wbc");
	if (fp == NULL) {
		perror("Unable to open diskwipe.dat: ");
		finish(1);
	}

	while (block_count == fwrite(block, block_size, block_count, fp)) {
		fflush(fp);
		fprintf(stderr, "\\r%lu", ++count);
	}
	fclose(fp);
}

int main(int argc, char* argv[]) {
	signal(SIGINT, handle_sigint);

	block = (char*) malloc(block_size);
	memset(block, 0, block_size);
	
	do_wipe();
	finish(0);
}
```

By the way, this is a very simple way for doing anti forensics:

1. do bad stuff
1. delete your files/traces
1. do a userspace wipe using a builtin scripting language, preferably using a one-liner
