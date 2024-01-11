"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[8868],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(n),f=r,m=d["".concat(l,".").concat(f)]||d[f]||u[f]||o;return n?a.createElement(m,i(i({ref:t},p),{},{components:n})):a.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:r,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},2010:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const o={title:"Invalid TCP segments created by macof",date:"2015-02-01",categories:["allgemein","pentest"],layout:"post",authors:["jasa"]},i=void 0,s={permalink:"/blog/2015/02/01/invalid-tcp-segments-created-by-macof",source:"@site/blog/2015-02-01-invalid-tcp-segments-created-by-macof.md",title:"Invalid TCP segments created by macof",description:"Some days ago, we used the tool macof, which is part of the dsniff package, in one penetration test. We observed that our attack had no effect to the hosts in the network, so we started sniffing around. Wireshark was our friend.",date:"2015-02-01T00:00:00.000Z",formattedDate:"February 1, 2015",tags:[],readingTime:1.575,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{title:"Invalid TCP segments created by macof",date:"2015-02-01",categories:["allgemein","pentest"],layout:"post",authors:["jasa"]},prevItem:{title:"Measuring Forensic Readiness",permalink:"/blog/2015/02/02/measuring-forensic-readiness"},nextItem:{title:"Userspace tool for (anti-forensically safe) wiping unallocated disk space",permalink:"/blog/2014/02/20/userspace-tool-for-wiping-unallocated-disk-space"}},l={authorsImageUrls:[void 0]},c=[],p={toc:c},d="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Some days ago, we used the tool ",(0,r.kt)("em",{parentName:"p"},"macof"),", which is part of the ",(0,r.kt)("a",{parentName:"p",href:"http://www.monkey.org/~dugsong/dsniff/",title:"dsniff"},"dsniff")," package, in one penetration test. We observed that our attack had no effect to the hosts in the network, so we started sniffing around. Wireshark was our friend."),(0,r.kt)("p",null,"Wireshark identified our packets, generated by ",(0,r.kt)("em",{parentName:"p"},"macof"),', as "invalid". It took some time for us to realize that IP Header value for ',(0,r.kt)("em",{parentName:"p"},"Total Length")," was indeed wrong! We used ",(0,r.kt)("em",{parentName:"p"},"macof")," to send TCP SYN segments to some specific port, so ",(0,r.kt)("em",{parentName:"p"},"Total Length")," should be 40 (20 Byte IP Header + 20 Byte TCP Header), but macos generated packets with a value of 20."),(0,r.kt)("p",null,"So we started a little code reading session and found the following statements in macof.c:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"libnet_build_tcp(sport, dport, seq, 0, TH_SYN, 512, 0, 0, LIBNET_TCP_H, NULL, 0, l, 0);\n\nlibnet_build_ipv4(LIBNET_TCP_H, 0, libnet_get_prand(LIBNET_PRu16), 0, 64, IPPROTO_TCP, 0, src, dst, NULL, 0, l, 0);\n")),(0,r.kt)("p",null,"Obviously, the length of the IP Header is not included in this calculation. We changed the above statements to"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"libnet_build_tcp(sport, dport, seq, 0, TH_SYN, 512, 0, 0, LIBNET_TCP_H, NULL, 0, l, 0);\n\nlibnet_build_ipv4(LIBNET_IPV4_H+LIBNET_TCP_H, 0, libnet_get_prand(LIBNET_PRu16), 0, 64, IPPROTO_TCP, 0, src, dst, NULL, 0, l, 0);\n")),(0,r.kt)("p",null,"with the result, that Wireshark didn't complain about our packets anymore."),(0,r.kt)("p",null,"And, more important, our attack did work now :-)"),(0,r.kt)("p",null,"After the test, I sent an email to the author of macof and dsniff, including a patch of what we've done, but until today I received no answer. So, I'll publsh our patch here, and you are free to use it:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"\xa0diff -rupN dsniff-2.4_beta1-r6/macof.c dsniff-2.4_beta1-r6_FIX/macof.c\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"--- dsniff-2.4_beta1-r6/macof.c 2015-01-20 08:50:53.980054279 +0100\n+++ dsniff-2.4_beta1-r6_FIX/macof.c 2015-01-20 08:51:24.220054894 +0100\n@@ -134,7 +134,7 @@ main(int argc, char *argv[])\n        libnet_build_tcp(sport, dport, seq, 0, TH_SYN, 512,\n                 0, 0, LIBNET_TCP_H, NULL, 0, l, 0);\n        \n-       libnet_build_ipv4(LIBNET_TCP_H, 0,\n+       libnet_build_ipv4(LIBNET_IPV4_H + LIBNET_TCP_H, 0,\n                  libnet_get_prand(LIBNET_PRu16), 0, 64,\n                  IPPROTO_TCP, 0, src, dst, NULL, 0, l, 0);\n")))}u.isMDXComponent=!0}}]);