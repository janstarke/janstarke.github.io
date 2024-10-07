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

Die Benutzerkonten, Passwörter, Berechtigungen etc. werden in den meisten Unternehmensnetzwerken in einem Active Directory (AD) verwaltet. Deswegen ist das AD ein für Angreifer interessantes Mittel sowohl für Persistenz als auch für die Rechteausweitung. Dazu sind aktuell folgende Optionen bekannt:

- versteckte Benutzerkonten unter der Kontrolle des Angreifers
- privilegierte Mitgliedschaften von Benutzerkonten, die eigentlich wenig Rechte haben sollten
- privilegierte Computerkonten unter der Kontrolle des Angreifers

Außerdem hinterlassen viele Angriffe auch unbeabsichtigt Spuren im Active Directory, die bei der Analyse genutzt werden können, bspw. neu angelegte Computerkonten. 

Ziel des Artikels ist, Grundzüge der forensischen Analyse von AD-Datenbanken zu vermitteln. Es wird zunächst beschrieben, wie die AD-Datenbank aufgebaut ist, und was bei der forensischen Sicherung zu beachten ist. Abschließend wird gezeigt, wie man eine forensische Analyse einer AD-Datenbank mit `ntdsextract2` [[1]](#a1) durchführen kann. Um das möglichst einfach anschaulich zu gestalten, wurde eine einfache AD-Datenbank verwendet. In dieser Datenbank sind keine konkreten Angriffsspuren zu finden; der Artikel beschäftigt sich ausschließlich mit der Vorgehensweise bei der forensischen Arbeit; jedoch nicht mit konkreten Angriffsmethoden.

## Spurensicherung

Wir haben von einem Domain Controller des angegriffenen Netzwerks die Datei `%windir%\NTDS\ntds`.dit gesichert. Diese Datei ist eine Jet-Datenbank, in der die AD-Objekte gespeichert sind. Außerdem haben wir alle Log-Dateien mit gesichert. Es besteht die Möglichkeit, dass einige Inhalte noch nicht in die `ntds.dit` zurückgeschrieben wurden. Wir müssen also in der Lage sein, eine vollständig synchrone Variante der AD-Datenbank zu schreiben. In Summe haben wir folgende Dateien gesichert:

|Datei|Beschreibung|Wichtig für Forensik?|
|-|-|-|
`ntds.dit`|AD Datenbank|:heavy_check_mark:|
`edb.log`|Transaction-Log für ntds.dit|:heavy_check_mark:|
`edbxxxxx.log`|Zusätzliche Transaction-Log-Dateien. Diese werden geschrieben, wenn `edb.log` voll ist, bevor die Logs in die `ntds.dit` zurückgeschrieben werden|:heavy_check_mark:|
`res1.log` und `res2.log`|Reserve-Logdateien. Diese enthalten keine Daten (theoretisch), sondern blockieren nur Speicherplatz. Wenn der Plattenplatz knapp wird, dann wird Speicherplatz dieser beiden Dateien genutzt, um die `edbxxxxx.log` schreiben zu können.|:x:|
`temp.ed`|"Notizblock" für die Arbeit mit der `ntds.dit`|:x:|
`schema.ini`|Schemabeschreibung für die initiale Einrichtung des AD Schema|:x:|

Sollte sich herausstellen, dass die `ntds.dit` nicht sauber ist, oder dass Informationen fehlen, dann müssen die Informationen in den Transaction-Logs zurückgespielt werden. Dafür wird das Programm `esentutl` genutzt; aber das ist nicht Thema dieses Artikels.

:::info

Für diesen Artikel habe eine öffentliche AD Datenbank von Didier Stevens [[2]](#a2) genutzt, die speziell für Lernzwecke zur Verfügung gestellt wurde.

:::

## Daten in der `ntds.dit`

Die Datei `ntds.dit` enthält &mdash; technisch gesehen &mdash; zunächst einmal eine EseDB-Datenbank (Extensible Storage Engine) mit mehreren Tabellen. Die Daten des Active Directory liegen in der Tabelle datatable; viele Verknüpfungen zwischen Objekten, bspw. Gruppenmitgliedschaften, sind in der Tabelle `link_table` gespeichert.

Jedes AD-Objekt entspricht einer Zeile (engl. `row`) der Tabelle `datatable`. Diese Tabelle hat eine Vielzahl von Spalten, je nachdem, wie genau das Schema des AD aussieht. Für jedes Attribut eines AD-Objekts existiert eine Spalte. Der Datentyp der Spalte sowie die Interpretation des Wertes obliegt dem Programm, das den Wert ausliest. Angenommen, wir wollen herausfinden, ob ein Account abgelaufen ist. Dann müssen wir folgende Schritte durchführen

Wir ermitteln die Spalte mit dem Namen `ATTq589983` und lesen den Wert aus

Der Wert in der Spalte ist (im Beispiel) `9223372036854775807`, mit dem Datentyp `Currency` (Währung). Natürlich handelt es sich nicht um Geld, sondern einfach um eine 64 Bit große Zahl, die die Anzahl der 100 Nanosekunden seit 01.01.1601 angibt [[3]](#a3), und zwar in UTC. Diese Zahl entspricht dem Zeitstempel `9999-12-31T23:59:59+0000`.

Theoretisch. Tatsächlich ist diese Zahl auch gleichzeitig die größte Zahl, die als 64 Bit mit Vorzeichen darstellbar ist. Microsoft hat diesen Wert vorgesehen, um zu speichern, dass ein Account nie abläuft [[4]](#a4).

Die Antwort ist also: Der Account ist nicht abgelaufen.

## Abkürzungen
| | |
|-|-|
|AD|Active Directory|
|UTC|Universal Time Coordinated|

## Quellen

| | |
|-|-|
|<a name="a1">[1]</a>|[https://github.com/janstarke/ntdsextract2](https://github.com/janstarke/ntdsextract2)|
|<a name="a2">[2]</a>|[https://blog.didierstevens.com/2016/07/12/practice-ntds-dit-file-part-1](https://blog.didierstevens.com/2016/07/12/practice-ntds-dit-file-part-1)|
|<a name="a3">[3]</a>|[https://learn.microsoft.com/de-de/windows/win32/api/minwinbase/ns-minwinbase-filetime](https://learn.microsoft.com/de-de/windows/win32/api/minwinbase/ns-minwinbase-filetime)|
|<a name="a4">[4]</a>|[https://learn.microsoft.com/de-de/windows/win32/adschema/a-accountexpires](https://learn.microsoft.com/de-de/windows/win32/adschema/a-accountexpires)|