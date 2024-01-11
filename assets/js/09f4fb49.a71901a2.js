"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[2278],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=p(a),h=i,u=m["".concat(s,".").concat(h)]||m[h]||f[h]||r;return a?n.createElement(u,o(o({ref:t},d),{},{components:a})):n.createElement(u,o({ref:t},d))}));function u(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:i,o[1]=l;for(var p=2;p<r;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},3047:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>f,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var n=a(7462),i=(a(7294),a(3905));const r={layout:"post",title:"$MFT file parser finalized",date:new Date("2021-05-16T00:00:00.000Z"),categories:"rust forensics",authors:["jasa"]},o=void 0,l={permalink:"/blog/2021/05/16/mft2bodyfile",source:"@site/blog/2021-05-16-mft2bodyfile.md",title:"$MFT file parser finalized",description:"After some days of work, I finalized version 0.3.0 of mft2bodyfile (https://github.com/janstarke/mft2bodyfile), which is aimed to be a replacement for analyze_mft.py, which is abandoned.",date:"2021-05-16T00:00:00.000Z",formattedDate:"May 16, 2021",tags:[],readingTime:1.875,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{layout:"post",title:"$MFT file parser finalized",date:"2021-05-16T00:00:00.000Z",categories:"rust forensics",authors:["jasa"]},prevItem:{title:"$MFT file parser improved",permalink:"/blog/2021/10/17/mft2bodyfile2"},nextItem:{title:"DoSing TLS endpoints",permalink:"/blog/2021/03/25/DoSing-TLS-endpoints"}},s={authorsImageUrls:[void 0]},p=[{value:"Update: fixed in <em>0.5.0</em>",id:"update-fixed-in-050",level:2}],d={toc:p},m="wrapper";function f(e){let{components:t,...a}=e;return(0,i.kt)(m,(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"After some days of work, I finalized version ",(0,i.kt)("em",{parentName:"p"},"0.3.0")," of ",(0,i.kt)("inlineCode",{parentName:"p"},"mft2bodyfile")," (",(0,i.kt)("a",{parentName:"p",href:"https://github.com/janstarke/mft2bodyfile"},"https://github.com/janstarke/mft2bodyfile"),"), which is aimed to be a replacement for ",(0,i.kt)("inlineCode",{parentName:"p"},"analyze_mft.py"),", which is abandoned."),(0,i.kt)("h1",{id:"why-did-i-start-this-project"},"Why did i start this project?"),(0,i.kt)("p",null,"Until now, me and my team used ",(0,i.kt)("inlineCode",{parentName:"p"},"analyze_mft.py")," to extract data from the ",(0,i.kt)("inlineCode",{parentName:"p"},"$MFT"),", when we got triage data from a customer. Unfortunately, ",(0,i.kt)("inlineCode",{parentName:"p"},"analyze_mft.py")," has some disadvantages:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"python2 is required"),(0,i.kt)("li",{parentName:"ul"},"either the ",(0,i.kt)("inlineCode",{parentName:"li"},"$STANDARD_INFORMATION")," or the ",(0,i.kt)("inlineCode",{parentName:"li"},"$FILE_NAME")," attribute used to generate the timestamps, bot not both of them at the same time. This always required us to merge both outputs, which is a little bit messy"),(0,i.kt)("li",{parentName:"ul"},"from time to time we had problems parsing the ",(0,i.kt)("inlineCode",{parentName:"li"},"$MFT"))),(0,i.kt)("p",null,"So, at first we started to work on ",(0,i.kt)("inlineCode",{parentName:"p"},"analyze_mft.py")," to fix our complaints, but we soon got stuck when we discovered one additional disadvantage:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"If a file has its ",(0,i.kt)("inlineCode",{parentName:"li"},"$FILE_NAME")," attribute not stored in its base entry, but in some nonbase entry which is refered by an ",(0,i.kt)("inlineCode",{parentName:"li"},"$ATTRIBUTE_LIST")," attribute, then this file is not shown in the bodyfile.")),(0,i.kt)("p",null,'You might think that "non-base MFT entries do not have the ',(0,i.kt)("inlineCode",{parentName:"p"},"$FILE_NAME")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"$STANDARD_INFORMATION"),' attributes in them", as Brian Carrier has stated in his great book. But we found that this does happen. Further investigation showed us that nearly all fast and simple tools have the same problem. So this was the last bit that led us write a tool for our own.'),(0,i.kt)("h1",{id:"what-are-the-advantages-of-this-tool"},"What are the advantages of this tool?"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"way more faster than ",(0,i.kt)("inlineCode",{parentName:"li"},"analyze_mft.py")),(0,i.kt)("li",{parentName:"ul"},"all files are displayed, even if they don't have a '$FILENAME' (Really??? Files can have no filename? Yes, they can. See below)")),(0,i.kt)("h1",{id:"what-are-the-limits-of-this-tool"},"What are the limits of this tool?"),(0,i.kt)("p",null,"Consider the following situation: You have a file, which has a lot of attributes. The list of attributes is so long, that it cannot be stored in an ",(0,i.kt)("inlineCode",{parentName:"p"},"$MFT")," entry. So, the ",(0,i.kt)("inlineCode",{parentName:"p"},"$ATTRIBUTE_LIST")," attribute is stored as a nonresident attribute, outside the ",(0,i.kt)("inlineCode",{parentName:"p"},"$MFT"),". At the moment, ",(0,i.kt)("inlineCode",{parentName:"p"},"mft2bodyfile")," is not able to find the corresponding ",(0,i.kt)("inlineCode",{parentName:"p"},"$MFT")," entries, and will generate a filename."),(0,i.kt)("p",null,"Can we fix this? Yes, we can. If we detect such a situation, we can search the ",(0,i.kt)("inlineCode",{parentName:"p"},"$MFT")," entries which refer to our base entry, and use those to find a ",(0,i.kt)("inlineCode",{parentName:"p"},"$FILE_NAME")," attribute. "),(0,i.kt)("h2",{id:"update-fixed-in-050"},"Update: fixed in ",(0,i.kt)("em",{parentName:"h2"},"0.5.0")))}f.isMDXComponent=!0}}]);