---
layout: post
title:  "Analyzing Linux memory images with volatility"
date:   2022-04-04
categories: forensics tools
author: jasa
---

# Installation of volatility3

Why volatility3? Because version 2 is deprecated.

```shell

# download the current git repo
git clone https://github.com/volatilityfoundation/volatility3.git

# create local python venv
python3 -m venv venv
source venv/bin/activate

# install volatility
pushd volatility3
pip3 install -r requirements.txt
python3 setup.py build
python3 setup.py install
popd
```

At this point in history, you have volatility3 installed in `venv`.

# Obtaining a matching profile

Volatility needs to know a lot about the memory layout you're going to work with. Because every linux kernel can have a different layout, you need to get the special layout for your kernel. volatility calls this the *profile*.

To generate the profile, you need the following:
 - the tool `dwarf2json`, which is a separate github project
 - the kernel with debug information (*not* the debug kernel)
 - the `System.map` file

## Installing `dwarf2json`

Assuming you already have the go language installed, you can do the following:

```shell
git clone https://github.com/volatilityfoundation/dwarf2json.git
pushd dwarf2json
go build
popd
```

This compiles a binary file named `dwarf2json` in the current directory. Copy it to whereever you want.

## Obtaining the kernel with debug information`

First, you need to know the exact kernel version. I managed to get it by `grep`ping for `Linux version` in the memory image and obtained `3.10.0-862.3.2.el7.x86_64`. For the distribution and this version, there existed a package named `kernel-debuginfo-3.10.0-862.3.2.el7.x86_64.rpm`, which I downloaded from the official repository. Now, you can extract the required file. I used `rpm2cpio` for this:

```shell
mkdir tmp_kernel
pushd tmp_kernel
rpm2cpio ../kernel-debuginfo-3.10.0-862.3.2.el7.x86_64.rpm |cpio -i --make-directories
popd
```

The resulting file in my case was `usr/lib/debug/lib/modules/3.10.0-862.3.2.el7.x86_64/vmlinux`. Let's keep this in mind...

## Obtaining System.map

This file is part of the normal kernel package: `kernel-3.10.0-862.3.2.el7.x86_64.rpm`

```shell
mkdir tmp_system_map
pushd tmp_system_map
rpm2cpio ../kernel-3.10.0-862.3.2.el7.x86_64.rpm |cpio -i --make-directories
popd
```

I found the `System.map` as `boot/System.map-3.10.0-862.3.2.el7.x86_64`

## Generating the profile

Now, we have all we need. Let's go

```shell
dwarf2json/dwarf2json linux \
        --elf tmp_kernel/usr/lib/debug/lib/modules/3.10.0-862.3.2.el7.x86_64/vmlinux \
        --system-map tmp_system_map/boot/System.map-3.10.0-862.3.2.el7.x86_64 >centos7-3.10.0-862.3.2.el7.x86_64.json

# cleaning up
rm -rf tmp_*
```

# Installing the profile

volatility expects the profile as *xz* file, so let's compress it:

```shell
xz centos7-3.10.0-862.3.2.el7.x86_64.json
```

Assume, you have *Python v3.9* and *volatility3 v2.0.3*, then you symbols directory is `venv/lib/python3.9/site-packages/volatility3-2.0.3-py3.9.egg/volatility3/symbols/`. We will refer to it as `$SYMBOLS_DIR`:

```shell
mkdir $SYMBOLS_DIR/linux
mv centos7-3.10.0-862.3.2.el7.x86_64.json.xz $SYMBOLS_DIR/linux
```

That's it. Now, you have a matching profile ready to be used.