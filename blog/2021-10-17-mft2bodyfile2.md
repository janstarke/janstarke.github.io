---
layout: post
title:  "$MFT file parser improved"
date:   2021-10-17
categories: rust forensics
authors: [jasa]
---

I added some improvements to `mft2bodyfile` ([https://github.com/janstarke/mft2bodyfile](https://github.com/janstarke/mft2bodyfile)) and released version *0.5.0*. Mainly, the following things have changed:

- I fixed the problem with nonresident attributes: `mft2bodyfile` reads all (really: _all_) MFT entries and tries to correlate them. This is possible, because there is a bidirectional relationship between the base entry and the nonbase entries. Until now, I started with the base entry and tried to find the corresponding nonbase entries, which failed if the `$ATTRIBUTE_LIST` was nonresident. Now, I don't try to find the nonbase entries, but instead use the base reference to find the base entry.
- The performance has improved a lot.

# What's missing?

Only one thing (at the moment): Sometimes there are nonbase entries which belonged to base entries of deleted files (this can be detected to the sequence numbers of the base reference and the entry at the base position do not match). This is no problem, until we try to read `$STANDARD_INFORMATION`or `$FILENAME`, which may not be existing anymore. These entries are ignored by `mft2bodyfile`.