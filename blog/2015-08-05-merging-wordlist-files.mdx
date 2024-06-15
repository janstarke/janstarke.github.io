---
title: "Merging wordlist files"
date: "2015-08-05"
layout: post
authors: [jasa]
---

Sometimes when cracking password, one has to create password candidates which are combinations of words from a wordlist. Unfortunately, common password cracking tools do not support this feature. This makes perfectly sense, because the task of a password cracking tool is cracking passwords. We need a tool which creates line wise cross combinations of text files.

Using perl, this is a simple task:

```perl
#!/usr/bin/perl -w

#/usr/bin/perl -w
use strict;
use warnings;
use Getopt::Long;

my $first = '-';
my $second = undef;
my $dest = '-';
my $max_length = undef;

sub Usage(;$) {
    my $usage = '';
    if (my $message = shift) {
        $usage .= $message . "n";
    }

    $usage .= "crossproduct.pl --first=<infile> --second=<infile> --dest=<outfile>";
    $usage;
}

sub ValidateInputFile($) {
    my $filename = shift;
    return if $filename eq '-';
    -f $filename or die Usage("'$filename' is not a file");
    -r $filename or die Usage("'$filename' is not readable");
}

sub ValidateOutputFile($) {
    my $filename = shift;
    return if $filename eq '-';
    return unless -e $filename;

    # the file does not exist, so it will be created
    -f $filename or die Usage("'$filename' is not a file");
    -w $filename or die Usage("'$filename' is not writable");
}

GetOptions (
    "first=s" => $first,
    "second=s" => $second,
    "dest=s" => $dest,
    "length=i" => $max_length) or die Usage();

defined($first) or die Usage("missing first input file");
defined($second) or die Usage("missing second input file");
($first ne '-' or $second or '-') or die Usage("cannot combine stdin with itself");

ValidateInputFile($first);
ValidateInputFile($second);
ValidateOutputFile($dest);

my ($first_fh, $second_fh, $dest_fh);
if ($first eq '-') {
    $first_fh = *STDIN;
} else {
    open($first_fh, "<$first") or die Usage($!);
}

if ($second eq '-') {
    $second_fh = *STDIN;
} else {
    open($second_fh, "<$second") or die Usage($!);
}

if ($dest eq '-') {
    $dest_fh = *STDOUT;
} else {
    open($dest_fh, ">$dest") or die Usage($!);
}

my ($a, $b, $da, $db);
my ($dest_first, $dest_second);

if ($first eq '-') {
    ($a, $b) = ($first_fh, $second_fh); 
    ($dest_first, $dest_second) = ($da, $db);
} else {
    ($a, $b) = ($second_fh, $first_fh);
    ($dest_second, $dest_first) = ($da, $db);
}

while ($da = <$a>) {
    seek($b, 0, 0);
    while ($db = <$b>) {
        chomp $da;
        chomp $db;
        my $word = "$$dest_first$$dest_second";
        if ($max_length) {
            $word = substr($word, 1, $max_length); 
        }

        print $dest_fh "$word";
    }
}
```

The script has 4 parameters:

|Parameter|Meaning|
|---------|-------|
|`--first`|file name of the wordlist for the first part of the generated words; or "-" for stdin (which is the default value)
|`--second`|file name of the wordlist for the second part of the generated words; or "-" for stdin
|`--dest`|name of the file where the generated wordlist will be stored; or "-" for stdout (which is the default value) 
|`--length`|maximum length of generated words. All words which are longer then this value will be truncated. This parameter is optional. If you use this parameter, you should pipe the output to uniq
