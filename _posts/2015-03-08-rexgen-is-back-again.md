---
title: "Rexgen is back again"
date: "2015-03-08"
categories: 
  - "allgemein"
layout: post
---

... with a new version 1.2.3 and a new repository location: https://github.com/janstarke/rexgen

## New features:

- improved uppercase/lowercase variation: 'a(?i:bc)' creates abc, abC, aBC, aBc
- that's it. But I had to rewrite a lot of internal data representation, so that the modifier `i` for _ignore case_ may be the first one in long list of additional iterators. One of my ideas for the next versions is some kind of Levenshtein Iterator. The idea is that the modifier will create all variants of a word with a Levenshtein distance of 1

## sWhat else is new?

- John the Ripper (jumbo) uses the new API of rexgen, so you can build the newest version JtR together with the newest version of rexgen

- wfuzz does not use rexgen, until now. I created a fork of wfuzz (https://github.com/janstarke/wfuzz). Unfortunately, xmendez ignores my pull request :-( But you can use my fork and I will try to keep it up2date

So long
