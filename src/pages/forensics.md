---
layout: page
title: Forensic snippets for me and you
---

# Windows Registry

## Coping with partly encrypted hive files

Some Ransomware has encrypted the first *x*KB of your files? No problem. Use the `--ignore-base-block` switch, which is supported by [regdump](https://github.com/janstarke/nt-hive2) and [regview](https://github.com/janstarke/regview)

## Recovering deleted registry keys

Use [hivescan](https://github.com/janstarke/nt-hive2)

## When did this key has been deleted???

Use the `-b` switch of [hivescan](https://github.com/janstarke/nt-hive2). This creates a bodyfile of all the keys in this file, including deleted ones (and marks deleted with `(deleted)`)