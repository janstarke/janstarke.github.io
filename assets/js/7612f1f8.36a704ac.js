"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[6401],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),m=i,f=u["".concat(p,".").concat(m)]||u[m]||g[m]||a;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9202:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>g,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=n(7462),i=(n(7294),n(3905));const a={layout:"post",title:"Using regripper on MacOS",date:new Date("2021-11-02T00:00:00.000Z"),categories:"forensics tools",authors:["jasa"]},o="Installation of regripper on MacOS",l={permalink:"/blog/2021/11/02/Using-regripper-on-darwin",source:"@site/blog/2021-11-02-Using-regripper-on-darwin.md",title:"Using regripper on MacOS",description:"Fixing construction of the plugins path",date:"2021-11-02T00:00:00.000Z",formattedDate:"November 2, 2021",tags:[],readingTime:.76,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{layout:"post",title:"Using regripper on MacOS",date:"2021-11-02T00:00:00.000Z",categories:"forensics tools",authors:["jasa"]},prevItem:{title:"Analyzing Linux memory images with volatility",permalink:"/blog/2022/04/04/centos7-volatility"},nextItem:{title:"Forensic analysis of deleted `$MFT` entries",permalink:"/blog/2021/10/22/mft_entry_sequence"}},p={authorsImageUrls:[void 0]},s=[{value:"Fixing construction of the <code>plugins</code> path",id:"fixing-construction-of-the-plugins-path",level:2}],c={toc:s},u="wrapper";function g(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"git clone https://github.com/keydet89/RegRipper3.0.git\n\ncpan install Parse::Win32Registry\n\n# find out where Parse::Win32Registry was installed\n\ncp -r /usr/local/Cellar/perl/5.34.0/lib/perl5/site_perl/5.34.0/Parse .\n\nmv *.pm Parse/Win32Registry/WinNT/\n")),(0,i.kt)("h2",{id:"fixing-construction-of-the-plugins-path"},"Fixing construction of the ",(0,i.kt)("inlineCode",{parentName:"h2"},"plugins")," path"),(0,i.kt)("p",null,"On unixoid systems, ",(0,i.kt)("inlineCode",{parentName:"p"},"rip.pl")," ignores the folder where it is stored and looks for the ",(0,i.kt)("inlineCode",{parentName:"p"},"plugins")," folder in the current working directory (",(0,i.kt)("a",{parentName:"p",href:"https://github.com/keydet89/RegRipper3.0/issues/42"},"https://github.com/keydet89/RegRipper3.0/issues/42"),"). This can be fixed using the following patch:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},'diff --git a/Analysis/RegRipper3.0/rip.pl b/Analysis/RegRipper3.0/rip.pl\nindex 8f626a7..9027209 100644\n--- a/Analysis/RegRipper3.0/rip.pl\n+++ b/Analysis/RegRipper3.0/rip.pl\n@@ -67,7 +67,7 @@ $str =~ s/($path[scalar(@path) - 1])//;\n # code updated 20190318\n my $plugindir;\n ($^O eq "MSWin32") ? ($plugindir = $str."plugins/")\n-                   : ($plugindir = File::Spec->catfile("plugins"));\n+                   : ($plugindir = File::Spec->catfile($str, "plugins"));\n #my $plugindir = $str."plugins/";\n #my $plugindir = File::Spec->catfile("plugins");\n #print "Plugins Dir = ".$plugindir."\\n";\n')),(0,i.kt)("h1",{id:"usage-example"},"Usage example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"PERL5LIB=$(pwd) perl rip.pl -r Amcache.hve -p amcache_tln >amcache.tln\n")),(0,i.kt)("h1",{id:"convert-tln-format-to-bodyfile-format"},"Convert ",(0,i.kt)("inlineCode",{parentName:"h1"},"TLN")," format to ",(0,i.kt)("inlineCode",{parentName:"h1"},"bodyfile")," format"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"awk -F '|' '{OFS=\"|\";print 0,$5,0,0,0,0,0,-1,$1,-1,-1}' <test.tln |TZ=UTC mactime -b - -d\n")))}g.isMDXComponent=!0}}]);