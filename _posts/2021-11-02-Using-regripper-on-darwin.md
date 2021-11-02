---
layout: post
title:  "Using regripper on MacOS"
date:   2021-11-02
categories: forensics tools
author: jasa
---

# Installation of regripper on MacOS

```shell
git clone https://github.com/keydet89/RegRipper3.0.git

cpan install Parse::Win32Registry

# find out where Parse::Win32Registry was installed

/usr/local/Cellar/perl/5.34.0/lib/perl5/site_perl/5.34.0/Parse .

mv *.pm Parse/Win32Registry/WinNT/
```

# Usage example

```fish
PERL5LIB=(pwd) perl rip.pl -r Amcache.hve -p amcache_tln >amcache.tln
```

# Convert `TLN` format to `bodyfile` format

```shell
awk -F '|' '{OFS="|";print 0,$5,0,0,0,0,0,-1,$1,-1,-1}' <test.tln |TZ=UTC mactime -b - -d
```
