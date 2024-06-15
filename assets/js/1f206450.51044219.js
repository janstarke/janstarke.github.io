"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[9162],{7745:(e,o,t)=>{t.r(o),t.d(o,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var s=t(5893),n=t(1151);const a={title:"How to (not) hack jasa's blog",date:"2015-02-11",categories:["allgemein","pentest"],layout:"post",authors:["jasa"]},i=void 0,r={permalink:"/blog/2015/02/11/how-to-not-hack-jasas-blog",source:"@site/blog/2015-02-11-how-to-not-hack-jasas-blog.mdx",title:"How to (not) hack jasa's blog",description:"Today, a strange guy tried to hack this blog. He didn't succeed. What a shame. So, in this post, I will try to give you some hints about what to do and what not to do if you're trying to hack into this blog:",date:"2015-02-11T00:00:00.000Z",tags:[],readingTime:2.425,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{title:"How to (not) hack jasa's blog",date:"2015-02-11",categories:["allgemein","pentest"],layout:"post",authors:["jasa"]},unlisted:!1,prevItem:{title:"Rexgen is back again",permalink:"/blog/2015/03/08/rexgen-is-back-again"},nextItem:{title:"Measuring Forensic Readiness",permalink:"/blog/2015/02/02/measuring-forensic-readiness"}},l={authorsImageUrls:[void 0]},c=[];function u(e){const o={li:"li",ol:"ol",p:"p",...(0,n.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.p,{children:"Today, a strange guy tried to hack this blog. He didn't succeed. What a shame. So, in this post, I will try to give you some hints about what to do and what not to do if you're trying to hack into this blog:"}),"\n",(0,s.jsxs)(o.ol,{children:["\n",(0,s.jsxs)(o.li,{children:["\n",(0,s.jsx)(o.p,{children:"Try to guess my username and password. Start with jasa. This is not my username, but you can try it anyway. I'm a hacker, so try good passwords first. You're a hacker too, so you are using good passwords as wesll. Start with your own passwords; maybe all hackers use the same passwords. Nope. Try \"Raketenkatze123\" Nope. Use the wordlist you've found on the internet. After the first 1000 attempts I know which wordlist you are using and can check if my password is part of it. ...which is one thing I regularly do with all of my passwords, as soon as I find a new good wordlist."}),"\n"]}),"\n",(0,s.jsxs)(o.li,{children:["\n",(0,s.jsx)(o.p,{children:"Try to find some cross site scripting. After you've found one (there is none known), you can 2.a Send a malicious link to me, to steal my session 2.b Create a malicious comment, to steal my session 2.c Create a malicious comment, to exploit one of the currently known cross site request forgery vulnerabilities in wordpress."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(o.p,{children:"Have you first checked if wordpress is vulnerable against session hijacking, before you fill wordpress's log files and my mailbox with your useless attempts? By the way:"}),"\n",(0,s.jsxs)(o.ol,{start:"3",children:["\n",(0,s.jsxs)(o.li,{children:["\n",(0,s.jsx)(o.p,{children:"Make sure that no one knows you. Although I cannot read wordpress's log files, you've been so kind to try to create a malicious comment. I've got a notification about this. Now, I have your IP address and the corresponding time. Did you know that it is possible to identify the computer you are using at the moment? The power feature is called \"Telecommunications data retention\""}),"\n"]}),"\n",(0,s.jsxs)(o.li,{children:["\n",(0,s.jsx)(o.p,{children:"Try to find a SQL injection vulnerability. Good luck. In the meantime I was able to geolocate your position, using your IP. Until now, you violated at least 2 statutes of the country you are living in."}),"\n"]}),"\n",(0,s.jsxs)(o.li,{children:["\n",(0,s.jsx)(o.p,{children:"Before you did some reconnaissance, hopefully you made sure that no other legal persons are involved in your attack. Now, you determine that my blog is not hosted by me, but by wordpress.com, whose place of jurisdiction is the United States. D'oh. They know your IP address, too."}),"\n"]}),"\n",(0,s.jsxs)(o.li,{children:["\n",(0,s.jsx)(o.p,{children:"Double-check that you typed the URL of this blog using your keyboard. You didn't want to click on a link to this blog, because I could see your Referer :-b"}),"\n"]}),"\n",(0,s.jsxs)(o.li,{children:["\n",(0,s.jsx)(o.p,{children:"This is a blog about security (among others). Make sure your browser is up to date before you open this page (TODO: I must move this entry to position 1)"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(o.p,{children:"Kind regards"}),"\n",(0,s.jsx)(o.p,{children:"See you tomorrow, M. :-)"}),"\n",(0,s.jsx)(o.p,{children:"BTW, I forgot to say that you forgot to do a port scan against the LB of wordpress.com. Which doesn't matter anymore ... Knock knock"})]})}function h(e={}){const{wrapper:o}={...(0,n.a)(),...e.components};return o?(0,s.jsx)(o,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},1151:(e,o,t)=>{t.d(o,{Z:()=>r,a:()=>i});var s=t(7294);const n={},a=s.createContext(n);function i(e){const o=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function r(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(a.Provider,{value:o},e.children)}}}]);