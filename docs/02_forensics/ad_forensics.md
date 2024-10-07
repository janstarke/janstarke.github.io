---
layout: page
title: Forensische Analyse von Active Directory Datenbanken
---

# Digitale Forensik: Analyse von Active Directory Datenbanken

Viele komplexe Angriffe gegen Unternehmensnetzwerke finden in mehreren Phasen statt:

1. Informationsgewinnung
1. Initialer Zugriff: bspw. Ausnutzen einer Schwachstelle in einer Software
1. Persistenz: Sicherstellen, dass ein späterer Zugriff auf das System möglich ist, auch wenn bspw. die ausgenutzte Schwachstelle geschlossen wurde
1. Rechteausweitung: Übernahme eines Benutzerkontos mit weitergehenden Rechten

und so weiter...

Die Benutzerkonten, Passwörter, Berechtigungen etc. werden in den meisten Unternehmensnetzwerken in einem Active Directory ([AD](#AD)) verwaltet. Deswegen ist das [AD](#AD) ein für Angreifer interessantes Mittel sowohl für Persistenz als auch für die Rechteausweitung. Dazu sind aktuell folgende Optionen bekannt:

- versteckte Benutzerkonten unter der Kontrolle des Angreifers
- privilegierte Mitgliedschaften von Benutzerkonten, die eigentlich wenig Rechte haben sollten
- privilegierte Computerkonten unter der Kontrolle des Angreifers

Außerdem hinterlassen viele Angriffe auch unbeabsichtigt Spuren im Active Directory, die bei der Analyse genutzt werden können, bspw. neu angelegte Computerkonten. 

Ziel des Artikels ist, Grundzüge der forensischen Analyse von [AD](#AD)-Datenbanken zu vermitteln. Es wird zunächst beschrieben, wie die [AD](#AD)-Datenbank aufgebaut ist, und was bei der forensischen Sicherung zu beachten ist. Abschließend wird gezeigt, wie man eine forensische Analyse einer [AD](#AD)-Datenbank mit `ntdsextract2` [[1]](#a1) durchführen kann. Um das möglichst einfach anschaulich zu gestalten, wurde eine einfache [AD](#AD)-Datenbank verwendet. In dieser Datenbank sind keine konkreten Angriffsspuren zu finden; der Artikel beschäftigt sich ausschließlich mit der Vorgehensweise bei der forensischen Arbeit; jedoch nicht mit konkreten Angriffsmethoden.

## Spurensicherung

Wir haben von einem Domain Controller des angegriffenen Netzwerks die Datei `%windir%\NTDS\ntds`.dit gesichert. Diese Datei ist eine Jet-Datenbank, in der die [AD](#AD)-Objekte gespeichert sind. Außerdem haben wir alle Log-Dateien mit gesichert. Es besteht die Möglichkeit, dass einige Inhalte noch nicht in die `ntds.dit` zurückgeschrieben wurden. Wir müssen also in der Lage sein, eine vollständig synchrone Variante der [AD](#AD)-Datenbank zu schreiben. In Summe haben wir folgende Dateien gesichert:

|Datei|Beschreibung|Wichtig für Forensik?|
|-|-|-|
`ntds.dit`|AD Datenbank|:heavy_check_mark:|
`edb.log`|Transaction-Log für ntds.dit|:heavy_check_mark:|
`edbxxxxx.log`|Zusätzliche Transaction-Log-Dateien. Diese werden geschrieben, wenn `edb.log` voll ist, bevor die Logs in die `ntds.dit` zurückgeschrieben werden|:heavy_check_mark:|
`res1.log` und `res2.log`|Reserve-Logdateien. Diese enthalten keine Daten (theoretisch), sondern blockieren nur Speicherplatz. Wenn der Plattenplatz knapp wird, dann wird Speicherplatz dieser beiden Dateien genutzt, um die `edbxxxxx.log` schreiben zu können.|:x:|
`temp.ed`|"Notizblock" für die Arbeit mit der `ntds.dit`|:x:|
`schema.ini`|Schemabeschreibung für die initiale Einrichtung des [AD](#AD) Schema|:x:|

Sollte sich herausstellen, dass die `ntds.dit` nicht sauber ist, oder dass Informationen fehlen, dann müssen die Informationen in den Transaction-Logs zurückgespielt werden. Dafür wird das Programm `esentutl` genutzt; aber das ist nicht Thema dieses Artikels.

:::info

Für diesen Artikel habe eine öffentliche [AD](#AD) Datenbank von Didier Stevens [[2]](#a2) genutzt, die speziell für Lernzwecke zur Verfügung gestellt wurde.

:::

## Daten in der `ntds.dit`

Die Datei `ntds.dit` enthält &mdash; technisch gesehen &mdash; zunächst einmal eine EseDB-Datenbank (Extensible Storage Engine) mit mehreren Tabellen. Die Daten des Active Directory liegen in der Tabelle datatable; viele Verknüpfungen zwischen Objekten, bspw. Gruppenmitgliedschaften, sind in der Tabelle `link_table` gespeichert.

Jedes [AD](#AD)-Objekt entspricht einer Zeile (engl. `row`) der Tabelle `datatable`. Diese Tabelle hat eine Vielzahl von Spalten, je nachdem, wie genau das Schema des [AD](#AD) aussieht. Für jedes Attribut eines [AD](#AD)-Objekts existiert eine Spalte. Der Datentyp der Spalte sowie die Interpretation des Wertes obliegt dem Programm, das den Wert ausliest. Angenommen, wir wollen herausfinden, ob ein Account abgelaufen ist. Dann müssen wir folgende Schritte durchführen

Wir ermitteln die Spalte mit dem Namen `ATTq589983` und lesen den Wert aus

Der Wert in der Spalte ist (im Beispiel) `9223372036854775807`, mit dem Datentyp `Currency` (Währung). Natürlich handelt es sich nicht um Geld, sondern einfach um eine 64 Bit große Zahl, die die Anzahl der 100 Nanosekunden seit 01.01.1601 angibt [[3]](#a3), und zwar in [UTC](#UTC). Diese Zahl entspricht dem Zeitstempel `9999-12-31T23:59:59+0000`.

Theoretisch. Tatsächlich ist diese Zahl auch gleichzeitig die größte Zahl, die als 64 Bit mit Vorzeichen darstellbar ist. Microsoft hat diesen Wert vorgesehen, um zu speichern, dass ein Account nie abläuft [[4]](#a4).

Die Antwort ist also: Der Account ist nicht abgelaufen.

## *Record ID* und *Row ID*

Die Einträge in der `datatable` können normalerweise mit dem Attribute `DsRecordId` eindeutig identifiziert werden. Dieses Attribut wird nachfolgend mit *Record ID* bezeichnet und ist eine Eigenschaft eines [AD](#AD)-Objekts.

Allerdings nutzen einige Verknüpfungen nicht das Feld `DsRecordId`, sondern die Nummer der Zeile in der `datatable`. Das ist beispielsweise bei der Speicherung von Gruppenmitgliedschaften der Fall. Aus diesem Grund wird von [`ntdsextract2`](#a1) zusätzlich zur *Record ID* auch immer die Zeilennummer (*Row ID*) mit ausgelesen und verwendet.

## Zeitstempel

Obwohl EseDB einen eigenen Datentyp für Zeitstempel hat, nutzt [AD](#AD) den Datentyp `Currency`, um einen Zeitstempel im Format [FILETIME](#filetime) zu speichern. Einige Werte haben eine besondere Bedeutung, die bei der forensischen Analyse berücksichtigt werden sollte:

|Attribut|Bedeutung von `0x0000000000000000`|Bedeutung von `0x7FFFFFFFFFFFFFFF`|
|-|-|-|
`record_time`||
`when_created`||
`when_created`||
`last_logon`|Es ist unbekannt, wann die letzte Anmeldung war|
`last_logon_time_stamp`|Es ist unbekannt, wann die letzte Anmeldung war|
`account_expires`|"Wenn zu einem beliebigen Zeitpunkt ein Konto, das mit einer Ablaufzeit konfiguriert wurde, auf Nie läuft ab, wird das `accountExpires`-Attribut auf 0 festgelegt." [[6]](#accountExpires)|"Wenn ein Konto erstellt wird, wird das Konto zunächst auf Nie ablaufen festgelegt. Das accountExpires-Attribut ist auf den Standardwert von `9223372036854775807` festgelegt, ein Wert, der dem Höchstwert einer 64-Bit-Ganzzahl mit Vorzeichen entspricht."[[6]](#accountExpires)
`password_last_set`|Wenn das [UAC](#UAC)-Flag `UF_DONT_EXPIRE_PASSWD` nicht gesetzt ist, dann muss der Benutzer das Passwort bei der nächsten Anmeldung ändern.||
`bad_pwd_time`|Es ist unbekannt, wann der letzte erfolglose Anmeldeversuch war|

## Timeline

Zunächst verschaffen wir uns einen Überblick über die Aktivitäten in der Datenbank innerhalb eines bestimmten Zeitraums. Wir nutzen dafür die Programme [`ntdsextract2`](#a1) und [`mactime2`](#mactime), und zur schöneren Darstellung [`xsv`](#xsv). Das Kommando

```shell
ntdsextract2 ntds.dit timeline | mactime2 -d | xsv table
```

erzeugt folgende Ausgabe:

```text
2016-07-10T08:05:50+00:00  0   m...      0   0   1817  SUPPORT_388945a0 (Person, password last set)
2016-07-10T08:15:31+00:00  0   m...      0   0   1861  krbtgt (Person, password last set)
2016-07-10T08:15:59+00:00  0   m...      0   0   1836  ADDEMO$ (Computer, password last set)
2016-07-10T10:01:44+00:00  0   m...      0   0   1815  Administrator (Person, password last set)
2016-07-10T10:55:22+00:00  0   .a..      0   0   1815  Administrator (Person, last logon on this DC)
2016-07-10T10:55:23+00:00  0   .a..      0   0   1836  ADDEMO$ (Computer, last logon on this DC)
2016-07-10T10:55:29+00:00  0   m...      0   0   3276  user01 (Person, password last set)
2016-07-10T10:55:35+00:00  0   m...      0   0   3277  user02 (Person, password last set)
2016-07-10T10:55:35+00:00  0   m...      0   0   3278  user03 (Person, password last set)
2016-07-10T10:55:35+00:00  0   m...      0   0   3279  user04 (Person, password last set)
...
```

Das ist eine chronologisch sortierte Abfolge von Ereignissen, die im untersuchten [AD](#AD) stattgefunden haben. Man kann hier mehrere Informationen sehen:

| | |
|-|-|
`2016-07-10T08:05:50+00:00`|Das ist ein Zeitstempel in einem [RFC3339](#RFC3339)-konformen Format. 
`SUPPORT_388945a0 (Person, password last set)`|Der Name des Objekts ist `SUPPORT_388945a0`, der Objekttyp ist Person (was einem Benutzerkonto entspricht), und zu der angegebenen Zeit wurde das Passwort des Accounts gesetzt.
`1817`|In der Ausgabe von [`mactime2`](#mactime2) steht hier normalerweise die *Inode ID*, als eindeutige ID einer Datei im Dateisystem. Das [AD](#AD) hat keine Inodes, wohl aber eine *Record ID* (im Attribut `DsRecordId`). [`ntdsextract2`](#a1) schreibt diese Zahl in das Inode-Feld.
`last logon on this DC`|Dieser Zeitstempel gibt an, wann sich der Benutzer an diesem Domain Controller angemeldet hat. Wenn man eine Kopie der `ntds.dit` von einem anderen Domain Controller analysieren würde, würde bei diesem Timestamp die Meldung `last logon on any DC` stehen.

## Abkürzungen
| | |
|-|-|
|<a id="AD">AD</a>|Active Directory|
|<a id="EseDB">EseDB</a>|Extensible Storage Engine Database|
|<a id="UAC">UAC</a>|User Acount Control|
|<a id="UTC">UTC</a>|Universal Time Coordinated|

## Quellen

| | |
|-|-|
|<a id="a1">[1]</a>|[https://github.com/janstarke/ntdsextract2](https://github.com/janstarke/ntdsextract2)|
|<a id="a2">[2]</a>|[https://blog.didierstevens.com/2016/07/12/practice-ntds-dit-file-part-1](https://blog.didierstevens.com/2016/07/12/practice-ntds-dit-file-part-1)|
|<a id="a3">[3]</a>|[https://learn.microsoft.com/de-de/windows/win32/api/minwinbase/ns-minwinbase-filetime](https://learn.microsoft.com/de-de/windows/win32/api/minwinbase/ns-minwinbase-filetime)|
|<a id="a4">[4]</a>|[https://learn.microsoft.com/de-de/windows/win32/adschema/a-accountexpires](https://learn.microsoft.com/de-de/windows/win32/adschema/a-accountexpires)|
|<a id="filetime">[5]</a>|[https://learn.microsoft.com/de-de/windows/win32/api/minwinbase/ns-minwinbase-filetime](https://learn.microsoft.com/de-de/windows/win32/api/minwinbase/ns-minwinbase-filetime)|
|<a id="accountExpires">[6]</a>|[https://learn.microsoft.com/de-de/windows/win32/adschema/a-accountexpires](https://learn.microsoft.com/de-de/windows/win32/adschema/a-accountexpires)|
|<a id="mactime2">[7]</a>|[https://github.com/dfir-dd/dfir-toolkit/blob/main/doc/mactime2.md](https://github.com/dfir-dd/dfir-toolkit/blob/main/doc/mactime2.md)|
|<a id="xsv">[8]</a>|[https://github.com/BurntSushi/xsv](https://github.com/BurntSushi/xsv)|
|<a id="RFC3339">[9]</a>|[https://datatracker.ietf.org/doc/html/rfc3339](https://datatracker.ietf.org/doc/html/rfc3339)|