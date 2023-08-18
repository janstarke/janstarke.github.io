---
title: "How to (not) hack jasa's blog"
date: "2015-02-11"
categories: 
  - "allgemein"
  - "pentest"
layout: post
---

Today, a strange guy tried to hack this blog. He didn't succeed. What a shame. So, in this post, I will try to give you some hints about what to do and what not to do if you're trying to hack into this blog:

1. Try to guess my username and password. Start with jasa. This is not my username, but you can try it anyway. I'm a hacker, so try good passwords first. You're a hacker too, so you are using good passwords as wesll. Start with your own passwords; maybe all hackers use the same passwords. Nope. Try "Raketenkatze123" Nope. Use the wordlist you've found on the internet. After the first 1000 attempts I know which wordlist you are using and can check if my password is part of it. ...which is one thing I regularly do with all of my passwords, as soon as I find a new good wordlist.

2. Try to find some cross site scripting. After you've found one (there is none known), you can 2.a Send a malicious link to me, to steal my session 2.b Create a malicious comment, to steal my session 2.c Create a malicious comment, to exploit one of the currently known cross site request forgery vulnerabilities in wordpress.

Have you first checked if wordpress is vulnerable against session hijacking, before you fill wordpress's log files and my mailbox with your useless attempts? By the way:

3. Make sure that no one knows you. Although I cannot read wordpress's log files, you've been so kind to try to create a malicious comment. I've got a notification about this. Now, I have your IP address and the corresponding time. Did you know that it is possible to identify the computer you are using at the moment? The power feature is called "Telecommunications data retention"

4. Try to find a SQL injection vulnerability. Good luck. In the meantime I was able to geolocate your position, using your IP. Until now, you violated at least 2 statutes of the country you are living in.

5. Before you did some reconnaissance, hopefully you made sure that no other legal persons are involved in your attack. Now, you determine that my blog is not hosted by me, but by wordpress.com, whose place of jurisdiction is the United States. D'oh. They know your IP address, too.

6. Double-check that you typed the URL of this blog using your keyboard. You didn't want to click on a link to this blog, because I could see your Referer :-b

7. This is a blog about security (among others). Make sure your browser is up to date before you open this page (TODO: I must move this entry to position 1)

Kind regards

See you tomorrow, M. :-)

BTW, I forgot to say that you forgot to do a port scan against the LB of wordpress.com. Which doesn't matter anymore ... Knock knock
