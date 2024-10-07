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

Ziel des Artikels ist, Grundzüge der forensischen Analyse von AD-Datenbanken zu vermitteln. Es wird zunächst beschrieben, wie die AD-Datenbank aufgebaut ist, und was bei der forensischen Sicherung zu beachten ist. Abschließend wird gezeigt, wie man eine forensische Analyse einer AD-Datenbank mit [`ntdsextract2`](https://github.com/janstarke/ntdsextract2) durchführen kann. Um das möglichst einfach anschaulich zu gestalten, wurde eine einfache AD-Datenbank verwendet. In dieser Datenbank sind keine konkreten Angriffsspuren zu finden; der Artikel beschäftigt sich ausschließlich mit der Vorgehensweise bei der forensischen Arbeit; jedoch nicht mit konkreten Angriffsmethoden.

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

Für diesen Artikel habe eine öffentliche AD Datenbank von Didier Stevens genutzt, die speziell für Lernzwecke zur Verfügung gestellt wurde.

Quelle: <https://blog.didierstevens.com/2016/07/12/practice-ntds-dit-file-part-1/>

:::