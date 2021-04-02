---
layout: page
title: Forensics
---

{% for p in site.forensics_pages %}
<h2>{{ p.title }}: </h2>
  <a href=" {{ p.url }} ">{{ p.excerpt | strip_html | normalize_whitespace | truncate: 160 | escape }}</a>
{% endfor %}