"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[7526],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),l=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(n),f=r,g=u["".concat(c,".").concat(f)]||u[f]||d[f]||o;return n?a.createElement(g,i(i({ref:t},p),{},{components:n})):a.createElement(g,i({ref:t},p))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},6126:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=n(7462),r=(n(7294),n(3905));const o={title:"Some emotet variants use bad crypto (in the first stage)",date:"2021-01-25",categories:["allgemein"],tags:["forensics"],layout:"post",authors:["jasa"]},i=void 0,s={permalink:"/blog/2021/01/25/some-emotet-variants-use-bad-crypto-in-the-first-stage",source:"@site/blog/2021-01-25-some-emotet-variants-use-bad-crypto-in-the-first-stage.md",title:"Some emotet variants use bad crypto (in the first stage)",description:"What can I say? I recently analyzed an emotet variant which I found in a customer network. Eventually, I found that a new PE binary was being encrypted and loaded into memory. As encryption, simple RC4 was being used, with a static key @nw<jss6fG3Na4jvh^c&4Cgp$*rZ<g?TD@%FgTnwg3, hashed with MD5, which results in 21755ce816bd55c92f57eb4fd2060197 as RC4 key.",date:"2021-01-25T00:00:00.000Z",formattedDate:"January 25, 2021",tags:[{label:"forensics",permalink:"/blog/tags/forensics"}],readingTime:.445,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{title:"Some emotet variants use bad crypto (in the first stage)",date:"2021-01-25",categories:["allgemein"],tags:["forensics"],layout:"post",authors:["jasa"]},prevItem:{title:"Using Pairing-based cryptography in Java",permalink:"/blog/2021/02/05/Using_pairing_based_cryptography_in_Java"},nextItem:{title:"Importing Windows Event Logs into Elasticsearch",permalink:"/blog/2021/01/01/importing-windows-event-logs-into-elasticsearch"}},c={authorsImageUrls:[void 0]},l=[],p={toc:l},u="wrapper";function d(e){let{components:t,...o}=e;return(0,r.kt)(u,(0,a.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"What can I say? I recently analyzed an emotet variant which I found in a customer network. Eventually, I found that a new PE binary was being encrypted and loaded into memory. As encryption, simple RC4 was being used, with a static key ",(0,r.kt)("inlineCode",{parentName:"p"},"@nw<jss6fG3Na4jvh^c&4Cgp$*rZ<g?TD@%FgTnwg3"),", hashed with MD5, which results in ",(0,r.kt)("inlineCode",{parentName:"p"},"21755ce816bd55c92f57eb4fd2060197")," as RC4 key."),(0,r.kt)("p",null,(0,r.kt)("a",{target:"_blank",href:n(1068).Z},(0,r.kt)("img",{src:n(8121).Z,width:"3360",height:"2020"}))),(0,r.kt)("p",null,"Fortunately, it was not necessary to do the decryption on my own. I could simply set a breakpoint after 0x100013B5 and could read the resulting plaintext PE image."),(0,r.kt)("p",null,"I instantly uploaded it to ",(0,r.kt)("a",{parentName:"p",href:"https://www.virustotal.com/gui/file/f6d224a8af3d56e8d17ccea43a8ac6791e658b656e481630a770716b6116fc0c/detection"},"https://www.virustotal.com/gui/file/f6d224a8af3d56e8d17ccea43a8ac6791e658b656e481630a770716b6116fc0c/detection")))}d.isMDXComponent=!0},1068:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/files/key_generation-1c02fb41dce81ad838cecaed6063778b.png"},8121:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/key_generation-1c02fb41dce81ad838cecaed6063778b.png"}}]);