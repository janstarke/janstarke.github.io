"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[8570],{3905:(e,t,n)=>{n.d(t,{Zo:()=>f,kt:()=>u});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),d=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},f=function(e){var t=d(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,f=o(e,["components","mdxType","originalType","parentName"]),c=d(n),m=a,u=c["".concat(l,".").concat(m)]||c[m]||p[m]||s;return n?r.createElement(u,i(i({ref:t},f),{},{components:n})):r.createElement(u,i({ref:t},f))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,i=new Array(s);i[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[c]="string"==typeof e?e:a,i[1]=o;for(var d=2;d<s;d++)i[d]=n[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4449:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var r=n(7462),a=(n(7294),n(3905));const s={title:"Merging wordlist files",date:"2015-08-05",layout:"post",authors:["jasa"]},i=void 0,o={permalink:"/blog/2015/08/05/merging-wordlist-files",source:"@site/blog/2015-08-05-merging-wordlist-files.md",title:"Merging wordlist files",description:"Sometimes when cracking password, one has to create password candidates which are combinations of words from a wordlist. Unfortunately, common password cracking tools do not support this feature. This makes perfectly sense, because the task of a password cracking tool is cracking passwords. We need a tool which creates line wise cross combinations of text files.",date:"2015-08-05T00:00:00.000Z",formattedDate:"August 5, 2015",tags:[],readingTime:2.325,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{title:"Merging wordlist files",date:"2015-08-05",layout:"post",authors:["jasa"]},prevItem:{title:'New Malware: "Pro InvoiceWMZ45445"',permalink:"/blog/2015/12/01/new-malware-pro-invoicewmz45445"},nextItem:{title:"Rexgen is back again",permalink:"/blog/2015/03/08/rexgen-is-back-again"}},l={authorsImageUrls:[void 0]},d=[],f={toc:d},c="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Sometimes when cracking password, one has to create password candidates which are combinations of words from a wordlist. Unfortunately, common password cracking tools do not support this feature. This makes perfectly sense, because the task of a password cracking tool is cracking passwords. We need a tool which creates line wise cross combinations of text files."),(0,a.kt)("p",null,"Using perl, this is a simple task:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-perl"},'#!/usr/bin/perl -w\n\n#/usr/bin/perl -w\nuse strict;\nuse warnings;\nuse Getopt::Long;\n\nmy $first = \'-\';\nmy $second = undef;\nmy $dest = \'-\';\nmy $max_length = undef;\n\nsub Usage(;$) {\n    my $usage = \'\';\n    if (my $message = shift) {\n        $usage .= $message . "n";\n    }\n\n    $usage .= "crossproduct.pl --first=<infile> --second=<infile> --dest=<outfile>";\n    $usage;\n}\n\nsub ValidateInputFile($) {\n    my $filename = shift;\n    return if $filename eq \'-\';\n    -f $filename or die Usage("\'$filename\' is not a file");\n    -r $filename or die Usage("\'$filename\' is not readable");\n}\n\nsub ValidateOutputFile($) {\n    my $filename = shift;\n    return if $filename eq \'-\';\n    return unless -e $filename;\n\n    # the file does not exist, so it will be created\n    -f $filename or die Usage("\'$filename\' is not a file");\n    -w $filename or die Usage("\'$filename\' is not writable");\n}\n\nGetOptions (\n    "first=s" => $first,\n    "second=s" => $second,\n    "dest=s" => $dest,\n    "length=i" => $max_length) or die Usage();\n\ndefined($first) or die Usage("missing first input file");\ndefined($second) or die Usage("missing second input file");\n($first ne \'-\' or $second or \'-\') or die Usage("cannot combine stdin with itself");\n\nValidateInputFile($first);\nValidateInputFile($second);\nValidateOutputFile($dest);\n\nmy ($first_fh, $second_fh, $dest_fh);\nif ($first eq \'-\') {\n    $first_fh = *STDIN;\n} else {\n    open($first_fh, "<$first") or die Usage($!);\n}\n\nif ($second eq \'-\') {\n    $second_fh = *STDIN;\n} else {\n    open($second_fh, "<$second") or die Usage($!);\n}\n\nif ($dest eq \'-\') {\n    $dest_fh = *STDOUT;\n} else {\n    open($dest_fh, ">$dest") or die Usage($!);\n}\n\nmy ($a, $b, $da, $db);\nmy ($dest_first, $dest_second);\n\nif ($first eq \'-\') {\n    ($a, $b) = ($first_fh, $second_fh); \n    ($dest_first, $dest_second) = ($da, $db);\n} else {\n    ($a, $b) = ($second_fh, $first_fh);\n    ($dest_second, $dest_first) = ($da, $db);\n}\n\nwhile ($da = <$a>) {\n    seek($b, 0, 0);\n    while ($db = <$b>) {\n        chomp $da;\n        chomp $db;\n        my $word = "$$dest_first$$dest_second";\n        if ($max_length) {\n            $word = substr($word, 1, $max_length); \n        }\n\n        print $dest_fh "$word";\n    }\n}\n')),(0,a.kt)("p",null,"The script has 4 parameters:"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Meaning"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"--first")),(0,a.kt)("td",{parentName:"tr",align:null},'file name of the wordlist for the first part of the generated words; or "-" for stdin (which is the default value)')),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"--second")),(0,a.kt)("td",{parentName:"tr",align:null},'file name of the wordlist for the second\xa0part of the generated words; or "-" for stdin')),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"--dest")),(0,a.kt)("td",{parentName:"tr",align:null},'name of the file where the generated wordlist will be stored; or "-" for stdout (which is the default value)')),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"--length")),(0,a.kt)("td",{parentName:"tr",align:null},"maximum length of generated words. All words which are longer then this value will be truncated. This parameter is optional. If you use this parameter, you should pipe the output to uniq")))))}p.isMDXComponent=!0}}]);