---
title: "Some emotet variants use bad crypto (in the first stage)"
date: "2021-01-25"
categories: 
  - "allgemein"
tags: 
  - "forensics"
layout: post
---

What can I say? I recently analyzed an emotet variant which I found in a customer network. Eventually, I found that a new PE binary was being encrypted and loaded into memory. As encryption, simple RC4 was being used, with a static key `@nw<jss6fG3Na4jvh^c&4Cgp$*rZ<g?TD@%FgTnwg3`, hashed with MD5, which results in `21755ce816bd55c92f57eb4fd2060197` as RC4 key.

[![](/img/2021-01-25-some-emotet-variants-use-bad-crypto-in-the-first-stage/key_generation.png)](/img/2021-01-25-some-emotet-variants-use-bad-crypto-in-the-first-stage/key_generation.png)

Fortunately, it was not necessary to do the decryption on my own. I could simply set a breakpoint after 0x100013B5 and could read the resulting plaintext PE image.

I instantly uploaded it to https://www.virustotal.com/gui/file/f6d224a8af3d56e8d17ccea43a8ac6791e658b656e481630a770716b6116fc0c/detection
