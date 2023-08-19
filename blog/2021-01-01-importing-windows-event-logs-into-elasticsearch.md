---
title: "Importing Windows Event Logs into Elasticsearch"
date: "2021-01-01"
categories: 
  - "allgemein"
layout: post
authors: [jasa]
---

Historically, there were two options to import Windows Event Logs into Elasticsearch:

- using Winlogbeat, which requires a running Windows machine
- using plaso, which works only with complete images, but not with triage data, such as some `evtx` files. Additionally, plaso doesn't soupport elasticsearch 7 or above, so this is not an option.

As a result, I decided to implement a script which imports a bunch of `evtx` files into an elasticsearch index:

[https://github.com/teeshop/evtxtools](https://github.com/teeshop/evtxtools)

At the moment, you need to create an own index template to make sure that all `event_data` fields are imported as `text`: No index template is required anymore.
