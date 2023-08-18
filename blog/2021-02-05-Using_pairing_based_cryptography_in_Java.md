---
layout: post
title:  "Using Pairing-based cryptography in Java"
date:   2021-02-5
categories: java crypto
author: jasa
---

Since some years I'm working on this topic, and guess what: It is working now :-)

# What should I need Pairing-based cryptography for?

Imagine the following: You are in a hospital and get some test results (e.g. from a Covid-19 test). You want to protect the result by encrypting it, but you are not sure who needs to be able to read that result later. But you don't want to decrypt and reencrypt the result later. This is, where PBC comes in play. You can do as 2nd-level encryption, which protects the data from being read by any person. To decrypt 2nd-level encrypted data, you must first convert that to 1st-level-encrypted data, which requires the public key of the person you want to grant access to you data, and your own private key. After this step, the person for who you created the 1st-level encrypted data can decrypt the data using its own private key.

This enables the following use cases:

* Storage of confidential data in a cloud which you don't trust, while giving partners access to your data. This works as long as the cloud provider doesn't know any private keys. It even allows the cloud provider to do the transformation from 2nd-level to 1st-level, if you calculate the reencryption-key on-premise.
* Revocation of data access by revoking the reencryption key.

# What happened until now? 

My starting point is the **PBC Library** [https://crypto.stanford.edu/pbc/](https://crypto.stanford.edu/pbc/) which was written by Ben Lynn as part of his PhD thesis. To use this in a prototyping project, we had to transmit encrypted content and key material from one computer to another. So we needed a machine-independant representation of all of the data, which was not subject of **PBC Library**. So, we wrapped all the data structures used in **PBC Library** by C++-based structures. After this, it was possible to easily export and import cryptographic data using

* any data format, such as JSON, ASN.1, XML, ...
* any other PBC library (lower case L).

Our next challenge was to make the C++ library accessible for higher level languages, such as Java (required for Android devices as well as Java Backends) or Swift (required for iOS devices). As of today, we succeeded. The following is running:

```java
package com.company;
import com.tsystems_mms.je2ee.*;

public class Main {

    static {
        System.loadLibrary("je2ee");
    }

    private static final char[] HEX_ARRAY = "0123456789ABCDEF".toCharArray();
    public static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = HEX_ARRAY[v >>> 4];
            hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0F];
        }
        return new String(hexChars);
    }

    public static void main(String[] args) {
        PbcContext context = je2ee.createContext();
        GlobalParameters global = je2ee.getGlobal(context);

        KeyPair kp = je2ee.createKeyPair(global);
        Element dek = je2ee.generateDataEncryptionKey(global);

        byte[] aesKey1 = je2ee.kdf256(dek);
        Tuple ciphertext = je2ee.encryptFirstLevel(je2ee.publicKey(kp), dek);
        Element decryptedDek = je2ee
            .decryptFirstLevel(je2ee.secretKey(kp), ciphertext);

        byte[] aesKey2 = je2ee.kdf256(decryptedDek);

        String aes1 = bytesToHex(aesKey1);
        String aes2 = bytesToHex(aesKey2);

        assert aes1.equals(aes2);
        System.out.println(aes2);
    }
}
```

# Where can I get the code?

You need to recursively clone the following repo: [https://github.com/T-Systems-MMS/libe2ee](https://github.com/T-Systems-MMS/libe2ee)

# Can I use this for my project?

Yes, you can, but **YOU SHOULDN'T**! This project is a prototype and is only made to show what's possible. Neither **PBC Library** nor this very project has been checked thoroughly by cryptography experts. I do not give any guarantee that this code is secure against any attacks. Maybe if someone is willing to pay for it, it may be possible to raise this code to production level. Until then, this is only a freetime project of myself.

# Some insights...

## Example of a public key in machine independent format

```json
{
    "root": {
        "id": "a990af45-2269-537b-95c0-2d1815c6bddb",
        "type": "element"
    },
    "a990af45-2269-537b-95c0-2d1815c6bddb": {
        "type": "element",
        "id": "a990af45-2269-537b-95c0-2d1815c6bddb",
        "field": "3709e538-b580-5e21-a2ae-333585123e35",
        "y": "d5TgGd3TwTiVhhdZpQ6L0BS5YqdzIxQVK4ZTPANMqNVvCo1qdeKSz2HZnPKqM9mazGKGZcwG9toinepFSmMvcf",
        "x": "AiblhfGZ24J3IA1MNyfKaV3HGMHyCIngbR2sU9D5QyZc5IJV8yxXUGQpbiGBQ3I8N8DXgHQ1dSOKYilloO5BOq"
    },
    "3709e538-b580-5e21-a2ae-333585123e35": {
        "type": "field",
        "subtype": "curve",
        "id": "3709e538-b580-5e21-a2ae-333585123e35",
        "order": "aWgEPTl1tmebfs3ZETd8TJLcWlT",
        "pairing": "86ec11e5-802e-5ea0-9cc6-5a429f653359",
        "a": "a4cb7d3e-d31e-5472-9928-0b17725c9ae4",
        "b": "a47e3ca0-d570-5fe4-bd87-245b0100dbc2",
        "cofac": "1iRiNwETOuqBD7ugR7bRatbQL7JDKXfb6QfKFlQdbxb46gQKAjLCS397ZbnU"
    },
    "86ec11e5-802e-5ea0-9cc6-5a429f653359": {
        "type": "pairing",
        "id": "86ec11e5-802e-5ea0-9cc6-5a429f653359",
        "G1": "3709e538-b580-5e21-a2ae-333585123e35",
        "G2": "3709e538-b580-5e21-a2ae-333585123e35",
        "GT": "6e9b64ba-e391-5c46-a9b9-0527b3c22212",
        "Zr": "a6d00cef-ce1b-5410-bd45-41a0058b4540",
        "Eq": "3709e538-b580-5e21-a2ae-333585123e35",
        "Fq": "49f4d9d3-3110-5d68-a069-d035ef71b54b",
        "Fq2": "df25d091-9992-5b89-9ab7-487678fbd9d3",
        "r": "aWgEPTl1tmebfs3ZETd8TJLcWlT",
        "phikonr": "1iRiNwETOuqBD7ugR7bRatbQL7JDKXfb6QfKFlQdbxb46gQKAjLCS397ZbnU"
    },
    "6e9b64ba-e391-5c46-a9b9-0527b3c22212": {
        "type": "field",
        "subtype": "mulg",
        "id": "6e9b64ba-e391-5c46-a9b9-0527b3c22212",
        "order": "aWgEPTl1tmebfs3ZETd8TJLcWlT",
        "pairing": "86ec11e5-802e-5ea0-9cc6-5a429f653359",
        "base": "df25d091-9992-5b89-9ab7-487678fbd9d3"
    },
    "df25d091-9992-5b89-9ab7-487678fbd9d3": {
        "type": "field",
        "subtype": "fi",
        "id": "df25d091-9992-5b89-9ab7-487678fbd9d3",
        "order": "11QugYb4N8ouqquotyF8IDXtacHwMTbO0nzw4DSKv860wA8OmQwaM5NwQDuGzdsaq7qNH2vjKAZYuuiiAkgzugeZZJGzPCyBalRcL5Un43QnC77oOh4PwFfDudE7kPVfi9kMYY9ETj6JjicbhyWKqsrYaU4WMTQfwjMsA1IwD08m1",
        "pairing": "86ec11e5-802e-5ea0-9cc6-5a429f653359",
        "base": "49f4d9d3-3110-5d68-a069-d035ef71b54b"
    },
    "49f4d9d3-3110-5d68-a069-d035ef71b54b": {
        "type": "field",
        "subtype": "montfp",
        "id": "49f4d9d3-3110-5d68-a069-d035ef71b54b",
        "order": "10iCaKEy0HbDHT6PP7xruLvQ6exXF4OXOWMsLG1cWzUGqHPKb3iHXFPHp5i6InsKwpSoCRA0udlrariW7VXEft1",
        "modulus": "10iCaKEy0HbDHT6PP7xruLvQ6exXF4OXOWMsLG1cWzUGqHPKb3iHXFPHp5i6InsKwpSoCRA0udlrariW7VXEft1",
        "negpinv": "KdbJ0wZgOLZ",
        "R": "Y3IcJ7iNkOkQg5TzeRWCJ5hLYyIjT6hZsVtkHTRaFzT7sr2lxvr37CT7VuW77EbDxq0kazOYLhOdzC31vZhUzz",
        "R3": "ebReJS6QeiIxqNFKFf4H01oKlyOviNcOAYf0Ksc4DVIJ8Uk1AxsCiwdUCbzMFFEwkBwtsN5OHZ7ThgIxHNwAq8"
    },
    "a6d00cef-ce1b-5410-bd45-41a0058b4540": {
        "type": "field",
        "subtype": "montfp",
        "id": "a6d00cef-ce1b-5410-bd45-41a0058b4540",
        "order": "aWgEPTl1tmebfs3ZETd8TJLcWlT",
        "modulus": "aWgEPTl1tmebfs3ZETd8TJLcWlT",
        "negpinv": "1",
        "R": "01lnGH9GscRlVEuYE2YC",
        "R3": "2HXdeLEYzbwUJfGOVzp6EZRig0e"
    },
    "a4cb7d3e-d31e-5472-9928-0b17725c9ae4": {
        "type": "element",
        "id": "a4cb7d3e-d31e-5472-9928-0b17725c9ae4",
        "field": "49f4d9d3-3110-5d68-a069-d035ef71b54b",
        "x": "1"
    },
    "a47e3ca0-d570-5fe4-bd87-245b0100dbc2": {
        "type": "element",
        "id": "a47e3ca0-d570-5fe4-bd87-245b0100dbc2",
        "field": "49f4d9d3-3110-5d68-a069-d035ef71b54b",
        "x": "0"
    }
}
```