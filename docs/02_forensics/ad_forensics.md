---
layout: page
title: Forensische Analyse von Active Directory Datenbanken
---

# Digitale Forensik: Analyse von Active Directory Datenbanken

## Übersicht

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

Für diesen Artikel habe ich eine öffentliche [AD](#AD) Datenbank von Didier Stevens [[2]](#a2) genutzt, die speziell für Lernzwecke zur Verfügung gestellt wurde.

:::

### Daten in der `ntds.dit`

Die Datei `ntds.dit` enthält &mdash; technisch gesehen &mdash; zunächst einmal eine EseDB-Datenbank (Extensible Storage Engine) mit mehreren Tabellen. Die Daten des Active Directory liegen in der Tabelle datatable; viele Verknüpfungen zwischen Objekten, bspw. Gruppenmitgliedschaften, sind in der Tabelle `link_table` gespeichert.

Jedes [AD](#AD)-Objekt entspricht einer Zeile (engl. `row`) der Tabelle `datatable`. Diese Tabelle hat eine Vielzahl von Spalten, je nachdem, wie genau das Schema des [AD](#AD) aussieht. Für jedes Attribut eines [AD](#AD)-Objekts existiert eine Spalte. Der Datentyp der Spalte sowie die Interpretation des Wertes obliegt dem Programm, das den Wert ausliest. Angenommen, wir wollen herausfinden, ob ein Account abgelaufen ist. Dann müssen wir folgende Schritte durchführen

Wir ermitteln die Spalte mit dem Namen `ATTq589983` und lesen den Wert aus

Der Wert in der Spalte ist (im Beispiel) `9223372036854775807`, mit dem Datentyp `Currency` (Währung). Natürlich handelt es sich nicht um Geld, sondern einfach um eine 64 Bit große Zahl, die die Anzahl der 100 Nanosekunden seit 01.01.1601 angibt [[3]](#a3), und zwar in [UTC](#UTC). Diese Zahl entspricht dem Zeitstempel `9999-12-31T23:59:59+0000`.

Theoretisch. Tatsächlich ist diese Zahl auch gleichzeitig die größte Zahl, die als 64 Bit mit Vorzeichen darstellbar ist. Microsoft hat diesen Wert vorgesehen, um zu speichern, dass ein Account nie abläuft [[4]](#a4).

Die Antwort ist also: Der Account ist nicht abgelaufen.

### *Record ID* und *Row ID*

Die Einträge in der `datatable` können normalerweise mit dem Attribute `DsRecordId` eindeutig identifiziert werden. Dieses Attribut wird nachfolgend mit *Record ID* bezeichnet und ist eine Eigenschaft eines [AD](#AD)-Objekts.

Allerdings nutzen einige Verknüpfungen nicht das Feld `DsRecordId`, sondern die Nummer der Zeile in der `datatable`. Das ist beispielsweise bei der Speicherung von Gruppenmitgliedschaften der Fall. Aus diesem Grund wird von [`ntdsextract2`](#a1) zusätzlich zur *Record ID* auch immer die Zeilennummer (*Row ID*) mit ausgelesen und verwendet.

## Timeline-Analyse

### Zeitstempel

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

### Erstellen der Timeline

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


### Unterstützte Timestamps

[`ntdsextract2`](#a1) kann aktuell folgende Timestamps darstellen:

|Attribut|Meldung|Beschreibung
|-|-|-
`DsRecordTime`|`record creation time`|Erstellung des AD-Eintrags
`AttWhenCreated`|`object created`|Erstellung des Objekts
`AttWhenChanged`|`object changed`|Letzte Änderung des Objekts
`AttLastLogon`|`last logon on this DC`|Letzte Anmeldung an diesem DC
`AttLastLogonTimestamp`|`last logon on any DC`|Letzte Anmeldung an einem anderen DC
`AttBadPasswordTime`|`bad pwd time`|Letztmalige Falscheingabe des Passworts
`AttPwdLastSet`|`password last set`|Letzte Änderung des Passworts

## Weitere Analysemöglichkeiten

### Gelöschte Objekte anzeigen

Interessant für Forensiker: Wenn im [AD](#AD) ein Objekt gelöscht, dann wird es zunächst nicht physisch gelöscht, sondern in den Container Deleted Objects verschoben und umbenannt. Angenommen, wir löschen das Objekt `cn=user01,cn=Users,dc=demo,cn=local`, und angenommen die [UUID](#UUID) des Containers `cn=Users,dc=demo,cn=local` ist `261d3f52-7117-4ef9-8cdb-1cc6fa87a31c`. Dann hat das Objekt anschließend den [DN](#DN) `cn=user01\0ADEL:261d3f52-7117-4ef9-8cdb-1cc6fa87a31c,cn=Deleted Objects,dc=demo,cn=local`. Mit Hilfe der [UUID](#UUID) lässt sich der ursprüngliche Speicherort rekonstruieren.

Erst nach Ablauf der *Tompstone Lifetime* ([TSL](#TSL)), die je nach Serverversion standardmäßig 60-180 Tage beträgt [[10]](#a19), wird das Objekt wirklich physisch gelöscht. Bis dahin ist das Objekt (leicht verändert; s.o.) noch vorhanden und kann durch [`ntdsextract2`](#a1) angezeigt werden, wenn man die timeline mit dem Schalter `--include-deleted` aktiviert.

### Verzeichnisbaum anzeigen

Eine weitere Möglichkeit, sich einen Überblick zu verschaffen, ist das Kommando `tree` von [`ntdsextract2`](#a1):

```text
$ ntdsextract2 ntds.dit tree
cn=$ROOT_OBJECT$ (id=2/row=1)
├── o=Boot (id=4/row=2)
│   ├── cn=Schema (id=5/row=3)
│   └── cn=BootMachine (id=7/row=5)
└── cn=local (id=1457/row=1267)
    └── dc=demo (id=1458/row=1268)
        ├── cn=System (id=1468/row=1278)
        │   ├── cn=Default Domain Policy (id=1689/row=1487)
        │   ├── cn=Meetings (id=1691/row=1489)
        │   ├── cn=RID Manager$ (id=1880/row=1652)
        │   ├── cn=RpcServices (id=1685/row=1483)
        │   ├── cn=Dfs-Configuration (id=1701/row=1499)
        │   ├── cn=BCKUPKEY_79ba72fa-c30c-4c8c-b832-91c5ac912716 Secret (id=1951/row=1719)
        │   ├── cn=IP Security (id=1702/row=1500)
        │   ├── cn=Server (id=1835/row=1607)
        │   ├── cn=BCKUPKEY_fc41aaf0-2a1e-4629-a6ae-a0d755f39395 Secret (id=1953/row=1721)
        │   ├── cn=DomainUpdates (id=1751/row=1531)
        │   ├── cn=File Replication Service (id=1700/row=1498)
        │   ├── cn=BCKUPKEY_P Secret (id=1952/row=1720)
        │   ├── cn=ComPartitionSets (id=1745/row=1525)
        │   ├── cn=RAS and IAS Servers Access Check (id=1699/row=1497)
        │   ├── cn=ComPartitions (id=1744/row=1524)
        │   ├── cn=WMIPolicy (id=1746/row=1526)
        │   ├── cn=BCKUPKEY_PREFERRED Secret (id=1954/row=1722)
        │   ├── cn=MicrosoftDNS (id=1884/row=1656)
        │   ├── cn=AdminSDHolder (id=1743/row=1523)
        │   ├── cn=FileLinks (id=1686/row=1484)
        │   ├── cn=Policies (id=1692/row=1490)
        │   └── cn=WinsockServices (id=1684/row=1482)
        ├── cn=Users (id=1465/row=1275)
        │   ├── cn=user08 (id=3283/row=3051)
        │   ├── cn=user37 (id=3312/row=3080)
        │   ├── cn=user06 (id=3281/row=3049)
...
```

Auch hier sieht man wieder die *Record ID* (Attribut `DsRecordId`), die bereits in der [Timeline-Analyse](#erstellen-der-timeline) aufgetaucht ist. Zusätzlich ist die Zeilennummer (`row`) innerhalb der Datentabelle der [AD](#AD) Datenbank angezeigt. Als Name der jeweiligen Objekte wird in der Baumansicht immer der *Relative Distinguished Name* ([RDN](#RDN)) angezeigt. Zusätzlich mit dem *Distinguished Name* ([DN](#DN)) des Elternobjekts lässt sich der [DN](#DN) eines bestimmten Objekts bilden. Beispielsweise ist `cn=user06,cn=Users,dc=demo,cn=local` der [DN](#DN) des Benutzers `user06`.

### Computerkonten anzeigen

Als nächstes schauen wir uns die Computerkonten an:

```shell
ntdsextract2 ntds.dit computer -F json-lines -D | jq
```

Die Befehle zum Anzeigen von Benutzern, Computern oder Gruppen unterstützen drei Ausgabeformate:

- `csv` (einzelne sind mit Semikolon voneinander getrennt)
- `json` (formatiertes [JSON](#JSON); als Liste von Einzelobjekten)
- `json-lines` (ein [JSON](#JSON)-Objekt pro Zeile)

Das Format `json-lines` eignet sich hervorragend zur Weiterverarbeitung durch Programme wie etwa [`jq`](#jq), was ich im Beispiel oben demonstriert habe. Die Ausgabe mit meinen Beispieldaten ist ziemlich kurz:

```json
{
  "sid": "S-1-5-21-3188177830-2933342842-421106997-1003",
  "distinguished_name": "cn=ADDEMO,ou=Domain Controllers,dc=demo,cn=local",
  "user_principal_name": null,
  "rdn": "ADDEMO",
  "sam_account_name": "ADDEMO$",
  "sam_account_type": "SAM_MACHINE_ACCOUNT",
  "user_account_control": "ADS_UF_SERVER_TRUST_ACCOUNT | ADS_UF_TRUSTED_FOR_DELEGATION",
  "logon_count": 10,
  "bad_pwd_count": 0,
  "admin_count": null,
  "is_deleted": false,
  "primary_group_id": 516,
  "primary_group": "Domain Controllers",
  "member_of": [],
  "comment": null,
  "record_time": "1601-06-01T18:23:32+0000",
  "when_created": "1601-06-01T18:23:32+0000",
  "when_changed": "1601-06-01T18:23:32+0000",
  "last_logon": "2016-07-10T10:55:23+0000",
  "last_logon_time_stamp": null,
  "account_expires": "9999-12-31T23:59:59+0000",
  "password_last_set": "2016-07-10T08:15:59+0000",
  "bad_pwd_time": "1601-01-01T00:00:00+0000",
  "creator_sid": null
}
```

Hier sind zwei Attribute hervorzuheben:

- `distinguished_name` ist kein Attribut des Objekts, sondern wird wie oben beschrieben aus dem [RDN](#RDN) des Objekts und dem [DN](#DN) des Elternobjekts gebildet. Deswegen wird dieses Attribut standardmäßig auch nicht angezeigt. Mit der Option `--include-dn` bzw. `-H` lässt sich die Anzeige aber aktivieren
- `creator_sid` zeigt die Security ID ([SID](#SID)) des Benutzers an, der diesen Computer zum [AD](#AD) hinzugefügt hat, falls dieser Benutzer kein Administrator ist. What???!!!! Das geht? Ja. Wenn die Eigenschaft [`ms-DS-MachineAccountQuota`](#a12) einen Wert größer 0 hat, dann gibt dieser Wert an, wie viele Computer ein eingeschränkter Benutzer ins [AD](#AD) aufnehmen darf. Standardmäßig ist dieser Wert auf 10 gestellt. Wir haben bereits Angriffe analysiert, bei denen diese Eigenschaft ausgenutzt wurde; und wir haben entsprechend auffällige Computer gesehen haben. 
  Eine einfache Option, verdächtige Computerkonten zu ermitteln, ist also indem man mit ` | jq 'select(.creator_sid!=null)'` filtert.

### Benutzerkonten anzeigen

Bis jetzt haben wir keine Auffälligkeiten gefunden. Schauen wir uns als nächstes mal alle Benutzer an, die Mitglied der Gruppe `Domain Admins` sind. Dazu nutzen wir wieder [`jq`](#jq):

#### Kommando

```shell
ntdsextract2 ntds.dit user -F json-lines -D | jq 'select(.member_of | contains(["Domain Admins"]))'
```

#### Ausgabe

```json
{
  "sid": "S-1-5-21-3188177830-2933342842-421106997-500",
  "distinguished_name": "cn=Administrator,cn=Users,dc=demo,cn=local",
  "user_principal_name": null,
  "rdn": "Administrator",
  "sam_account_name": "Administrator",
  "sam_account_type": "SAM_USER_OBJECT",
  "user_account_control": "ADS_UF_NORMAL_ACCOUNT | ADS_UF_DONT_EXPIRE_PASSWD",
  "logon_count": 4,
  "bad_pwd_count": 0,
  "admin_count": null,
  "is_deleted": false,
  "primary_group_id": 513,
  "primary_group": "Domain Users",
  "member_of": [
    "Group Policy Creator Owners",
    "Domain Admins",
    "Administrators",
    "Schema Admins",
    "Enterprise Admins"
  ],
  "comment": null,
  "record_time": "1601-06-01T18:23:32+0000",
  "when_created": "1601-06-01T18:23:32+0000",
  "when_changed": "1601-06-01T18:23:32+0000",
  "last_logon": "2016-07-10T10:55:22+0000",
  "last_logon_time_stamp": null,
  "account_expires": "9999-12-31T23:59:59+0000",
  "password_last_set": "2016-07-10T10:01:44+0000",
  "bad_pwd_time": "1601-01-01T00:00:00+0000"
}
```

:::info

Die Gruppenmitgliedschaften von Benutzern und Computern zu prüfen sollte Teil jeder forensischen Untersuchung sollte sein.

:::

[`ntdsextract2`](#a1) bietet die Möglichkeit, alternativ zum [RDN](#RDN) des Gruppennamens auch den vollständigen [DN](#DN) anzuzeigen, oder auch die [SID](#SID) oder den Wert von `samAccountName`. Die Option `--member-of` erlaubt die Auswahl des gewünschten Wertes.

### Detailansicht eines Eintrags

Es kann durchaus sein, dass man sich während einer Untersuchung für die Details eines Eintrags interessiert. Es gibt die Möglichkeit, sich mit [`ntdsextract2`](#a1) und dem Kommando `entry` die Rohdaten eines Eintrags anzeigen zu lassen. Dabei hat man die Wahl, ob für den Eintrag die *Record ID* (`DsRecordId`) oder die [RID](#RID) angegeben wird (die [SID](#SID) eines Benutzers besteht grob aus zwei Teilen: eine Domain-ID und eine [SID](#SID). Die Domain-ID ist für alle Benutzer in einer Domäne identisch. Die [RID](#RID) ist der Teil der [SID](#SID) nach dem letzten Minus;  bspw. ist `500` die [RID](#RID) von `S-1-5-21-3188177830-2933342842-421106997-500`).

#### Kommando

```shell
ntdsextract2 ntds.dit entry --sid 500
```

#### Ausgabe

```text
AttAccountExpires        : Currency(9223372036854775807)
AttBadPasswordTime       : Currency(0)
AttBadPwdCount           : I32(0)
AttCodePage              : I32(0)
AttCommonName            : LargeText(Administrator)
AttCountryCode           : I32(0)
AttDbcsPwd               : LargeBinary([17, 0, 0, 0, 0, 0, 0, 0, 208, 94, 27, 88, 60, 180, 61, 222, 135, 179, 115, 44, 163, 220, 20, 58, 223, 210, 160, 16, 8, 4, 18, 48, 181, 46, 245, 200, 161, 47, 192, 91])
AttDescription           : LargeText(Built-in account for administering the computer/domain)
AttInstanceType          : I32(4)
AttIsCriticalSystemObject: I32(1)
AttLastLogoff            : Currency(0)
AttLastLogon             : Currency(131126217226406250)
AttLogonCount            : I32(4)
AttNtSecurityDescriptor  : LargeBinary([51, 0, 0, 0, 0, 0, 0, 0])
AttObjDistName           : I32(1815)
AttObjectCategory        : I32(1128)
AttObjectClass           : Multi
AttObjectGuid            : LargeBinary([196, 146, 141, 186, 125, 119, 164, 65, 163, 20, 106, 106, 58, 95, 246, 109])
AttObjectSid             : LargeBinary([1, 5, 0, 0, 0, 0, 0, 5, 21, 0, 0, 0, 166, 187, 7, 190, 122, 66, 215, 174, 53, 149, 25, 25, 0, 0, 1, 244])
AttPrimaryGroupId        : I32(513)
AttPwdLastSet            : Currency(131126185044375000)
AttRdn                   : LargeText(Administrator)
AttReplPropertyMetaData  : Long
AttSamAccountName        : LargeText(Administrator)
AttSamAccountType        : I32(805306368)
AttUnicodePwd            : LargeBinary([17, 0, 0, 0, 0, 0, 0, 0, 44, 105, 0, 122, 74, 180, 161, 23, 83, 211, 68, 233, 176, 234, 208, 74, 152, 44, 61, 208, 167, 250, 124, 156, 131, 136, 137, 221, 25, 221, 51, 1])
AttUserAccountControl    : I32(66048)
AttUsnChanged            : Currency(8194)
AttUsnCreated            : Currency(8194)
AttWhenChanged           : Currency(13112612035)
AttWhenCreated           : Currency(13112612035)
DsAncestors              : LargeBinary([2, 0, 0, 0, 177, 5, 0, 0, 178, 5, 0, 0, 185, 5, 0, 0, 23, 7, 0, 0])
DsParentRecordId         : I32(1465)
DsRecordId               : I32(1815)
DsRecordTime             : Currency(13112612035)
```

Bei der Ausgabe von `entry` ist zu sehen, dass keine Interpretation der Daten vorgenommen wird. Der Wert von `DsRecordTime` ist beispielsweise vom Typ `Currency`(`13112612035`), weil `Currency` der interne Datentyp für Festkommazahlen mit 64bit Länge ist. Die Interpretation von Daten durch eine Software ist immer fehleranfällig (*nicht* fehlerhaft, aber anfällig); beispielsweise könnte ein Zeitstempel falsch berechnet sein. Durch den Verzicht auf jegliche Interpretation bei der Ausgabe von `entry` wird diese Art von Fehlern ausgeschlossen.

## Abkürzungen
| | |
|-|-|
|<a id="AD">AD</a>|Active Directory|
|<a id="DN">DN</a>|Distinguished Name|
|<a id="EseDB">EseDB</a>|Extensible Storage Engine Database|
|<a id="JSON">JSON</a>|Javascript Object Notation|
|<a id="RDN">RDN</a>|Relative Distinguished Name|
|<a id="RID">RID</a>|Relative Identifier|
|<a id="SID">SID</a>|Security Identifier|
|<a id="TSL">TSL</a>|Tompstone Lifetime|
|<a id="UAC">UAC</a>|User Acount Control|
|<a id="UTC">UTC</a>|Universal Time Coordinated|
|<a id="UUID">UUID</a>|Universally Unique Identifier|

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
|<a id="a10">[10]</a>|[https://learn.microsoft.com/de-de/windows/win32/adschema/a-tombstonelifetime](https://learn.microsoft.com/de-de/windows/win32/adschema/a-tombstonelifetime)|
|<a id="jq">[11]</a>|[https://jqlang.github.io/jq/](https://jqlang.github.io/jq/)|
|<a id="a12">[12]</a>|[https://learn.microsoft.com/de-de/windows/win32/adschema/a-ms-ds-machineaccountquota](https://learn.microsoft.com/de-de/windows/win32/adschema/a-ms-ds-machineaccountquota)|