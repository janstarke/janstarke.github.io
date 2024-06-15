"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[3940],{8163:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>f,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var t=s(5893),i=s(1151);const r={title:"Merging wordlist files",date:"2015-08-05",layout:"post",authors:["jasa"]},o=void 0,a={permalink:"/blog/2015/08/05/merging-wordlist-files",source:"@site/blog/2015-08-05-merging-wordlist-files.mdx",title:"Merging wordlist files",description:"Sometimes when cracking password, one has to create password candidates which are combinations of words from a wordlist. Unfortunately, common password cracking tools do not support this feature. This makes perfectly sense, because the task of a password cracking tool is cracking passwords. We need a tool which creates line wise cross combinations of text files.",date:"2015-08-05T00:00:00.000Z",tags:[],readingTime:2.325,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{title:"Merging wordlist files",date:"2015-08-05",layout:"post",authors:["jasa"]},unlisted:!1,prevItem:{title:'New Malware: "Pro InvoiceWMZ45445"',permalink:"/blog/2015/12/01/new-malware-pro-invoicewmz45445"},nextItem:{title:"Rexgen is back again",permalink:"/blog/2015/03/08/rexgen-is-back-again"}},d={authorsImageUrls:[void 0]},l=[];function c(e){const n={code:"code",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"Sometimes when cracking password, one has to create password candidates which are combinations of words from a wordlist. Unfortunately, common password cracking tools do not support this feature. This makes perfectly sense, because the task of a password cracking tool is cracking passwords. We need a tool which creates line wise cross combinations of text files."}),"\n",(0,t.jsx)(n.p,{children:"Using perl, this is a simple task:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-perl",children:'#!/usr/bin/perl -w\n\n#/usr/bin/perl -w\nuse strict;\nuse warnings;\nuse Getopt::Long;\n\nmy $first = \'-\';\nmy $second = undef;\nmy $dest = \'-\';\nmy $max_length = undef;\n\nsub Usage(;$) {\n    my $usage = \'\';\n    if (my $message = shift) {\n        $usage .= $message . "n";\n    }\n\n    $usage .= "crossproduct.pl --first=<infile> --second=<infile> --dest=<outfile>";\n    $usage;\n}\n\nsub ValidateInputFile($) {\n    my $filename = shift;\n    return if $filename eq \'-\';\n    -f $filename or die Usage("\'$filename\' is not a file");\n    -r $filename or die Usage("\'$filename\' is not readable");\n}\n\nsub ValidateOutputFile($) {\n    my $filename = shift;\n    return if $filename eq \'-\';\n    return unless -e $filename;\n\n    # the file does not exist, so it will be created\n    -f $filename or die Usage("\'$filename\' is not a file");\n    -w $filename or die Usage("\'$filename\' is not writable");\n}\n\nGetOptions (\n    "first=s" => $first,\n    "second=s" => $second,\n    "dest=s" => $dest,\n    "length=i" => $max_length) or die Usage();\n\ndefined($first) or die Usage("missing first input file");\ndefined($second) or die Usage("missing second input file");\n($first ne \'-\' or $second or \'-\') or die Usage("cannot combine stdin with itself");\n\nValidateInputFile($first);\nValidateInputFile($second);\nValidateOutputFile($dest);\n\nmy ($first_fh, $second_fh, $dest_fh);\nif ($first eq \'-\') {\n    $first_fh = *STDIN;\n} else {\n    open($first_fh, "<$first") or die Usage($!);\n}\n\nif ($second eq \'-\') {\n    $second_fh = *STDIN;\n} else {\n    open($second_fh, "<$second") or die Usage($!);\n}\n\nif ($dest eq \'-\') {\n    $dest_fh = *STDOUT;\n} else {\n    open($dest_fh, ">$dest") or die Usage($!);\n}\n\nmy ($a, $b, $da, $db);\nmy ($dest_first, $dest_second);\n\nif ($first eq \'-\') {\n    ($a, $b) = ($first_fh, $second_fh); \n    ($dest_first, $dest_second) = ($da, $db);\n} else {\n    ($a, $b) = ($second_fh, $first_fh);\n    ($dest_second, $dest_first) = ($da, $db);\n}\n\nwhile ($da = <$a>) {\n    seek($b, 0, 0);\n    while ($db = <$b>) {\n        chomp $da;\n        chomp $db;\n        my $word = "$$dest_first$$dest_second";\n        if ($max_length) {\n            $word = substr($word, 1, $max_length); \n        }\n\n        print $dest_fh "$word";\n    }\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"The script has 4 parameters:"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"Parameter"}),(0,t.jsx)(n.th,{children:"Meaning"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"--first"})}),(0,t.jsx)(n.td,{children:'file name of the wordlist for the first part of the generated words; or "-" for stdin (which is the default value)'})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"--second"})}),(0,t.jsx)(n.td,{children:'file name of the wordlist for the second\xa0part of the generated words; or "-" for stdin'})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"--dest"})}),(0,t.jsx)(n.td,{children:'name of the file where the generated wordlist will be stored; or "-" for stdout (which is the default value)'})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"--length"})}),(0,t.jsx)(n.td,{children:"maximum length of generated words. All words which are longer then this value will be truncated. This parameter is optional. If you use this parameter, you should pipe the output to uniq"})]})]})]})]})}function f(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>o});var t=s(7294);const i={},r=t.createContext(i);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);