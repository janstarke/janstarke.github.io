---
layout: post
title:  "Using regripper on MacOS"
date:   2021-11-02
categories: forensics tools
authors: [jasa]
---

# Installation of regripper on MacOS

```shell
git clone https://github.com/keydet89/RegRipper3.0.git

cpan install Parse::Win32Registry

# find out where Parse::Win32Registry was installed

cp -r /usr/local/Cellar/perl/5.34.0/lib/perl5/site_perl/5.34.0/Parse .

mv *.pm Parse/Win32Registry/WinNT/
```

## Fixing construction of the `plugins` path

On unixoid systems, `rip.pl` ignores the folder where it is stored and looks for the `plugins` folder in the current working directory (https://github.com/keydet89/RegRipper3.0/issues/42). This can be fixed using the following patch:

```diff
diff --git a/Analysis/RegRipper3.0/rip.pl b/Analysis/RegRipper3.0/rip.pl
index 8f626a7..9027209 100644
--- a/Analysis/RegRipper3.0/rip.pl
+++ b/Analysis/RegRipper3.0/rip.pl
@@ -67,7 +67,7 @@ $str =~ s/($path[scalar(@path) - 1])//;
 # code updated 20190318
 my $plugindir;
 ($^O eq "MSWin32") ? ($plugindir = $str."plugins/")
-                   : ($plugindir = File::Spec->catfile("plugins"));
+                   : ($plugindir = File::Spec->catfile($str, "plugins"));
 #my $plugindir = $str."plugins/";
 #my $plugindir = File::Spec->catfile("plugins");
 #print "Plugins Dir = ".$plugindir."\n";
 ```

# Usage example

```shell
PERL5LIB=$(pwd) perl rip.pl -r Amcache.hve -p amcache_tln >amcache.tln
```

# Convert `TLN` format to `bodyfile` format

```shell
awk -F '|' '{OFS="|";print 0,$5,0,0,0,0,0,-1,$1,-1,-1}' <test.tln |TZ=UTC mactime -b - -d
```
