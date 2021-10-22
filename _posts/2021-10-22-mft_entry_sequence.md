---
layout: post
title:  "Forensic analysis of deleted ´$MFT´ entries"
date:   2021-10-22
categories: forensics
author: jasa
---

In the book *FILE SYSTEM FORENSIC ANALYSIS*, the author *Brian Carrier* states that *"Every MFT entry also has a 16-bit sequence numberthat is incremented when the entry is allocated. For example, consider MFT entry 313 with a sequence number of 1. The file that allocated entry 313 is deleted, and the entry is allocated to a new file. When the entry is reallocated, it has a new sequence number of 2."* (page 276).

I think this i partially wrong. Let's see what Microsoft is saying: *"The sequence number. This value is incremented each time that a file record segment is freed; it is 0 if the segment is not used. The SequenceNumber field of a file reference must match the contents of this field; if they do not match, the file reference is incorrect and probably obsolete."* ([https://docs.microsoft.com/en-us/windows/win32/devnotes/file-record-segment-header](https://docs.microsoft.com/en-us/windows/win32/devnotes/file-record-segment-header))

# Why is this important?

This information is crucial when you found a file which has been content of some deleted folder. To retrieve the folders name, you need to find its `$FILE_NAME` information. So, you take the `parent` field from the `$FILE_NAME`attribute of the deleted file. Let's assume this is `313-1` (where `313` is the parent entry number and `1` is its sequence number). Further, let's assume that this parent has been deleted, but the MFT entry was not reallocated:

 - If the sequence number was incremented upon reallocated, it would still be `1`
 - Otherwise, if the sequence number was incremented when deleting the folder, it would be `2` now.

 But how can we be sure that we can use the `$FILE_NAME` of `313-2`, if the deleted file refered to `313-1`?

 # Let's test what happens.

## Test setup

 I created a NTFS partition using Windows 8, and created three folders:

  - `bulk delete`
  - `single delete`
  - `mixed delete`

Each folder had two files: `sample1.rtf` and `samples.rtf`. Than I did the following:
 
  - delete `bulk delete` with all its contents
  - delete `mixed delete/sample2.rtf`
  - delete `mixed delete` with all of its contents (`sample1.rtf`)
  - delete `single delete/sample1.rtf`
  - delete `single delete/sample2.rtf`
  - delete `single delete` with all of its contents (none)

## Results

After deletion, I found the following MFT references

| Name | Entry # | Parent entry # |
|-|-|-|
|`bulk delete`| `37-2` | `5-5` |
|`bulk delete/sample1.rtf`| `43-2` | `37-1` |
|`bulk delete/sample2.rtf`| `44-2` | `37-1`|
|`single delete`| `41-2` | |
|`single delete/sample1.rtf`| `47-2` | `41-1` |
|`single delete/sample2.rtf`| `48-2` | `41-1` |
|`mixed delete`| `42-2` | |
|`mixed delete/sample1.rtf`| `45-1` | `42-1` |
|`mixed delete/sample2.rtf`| `46-1` | `42-1` |

Obviously, our test shows that sequence numbers are incremented right after deletion, but *not* nessecarily at reallocation. The Microsofzt documentation is right. 