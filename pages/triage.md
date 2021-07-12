---
layout: page
title: Forensic triage
---

In this page I'm summarizing a lot of stuff which is related to collection triage data.

## Required tools

 - sleuthkit [https://www.sleuthkit.org/](https://www.sleuthkit.org/)
 - afflib-tools [https://github.com/simsong/AFFLIBv3](https://github.com/simsong/AFFLIBv3)

## Expected Result (sorted by priority)

1. Bodyfile for all partitions
1. Windows event logs
1. Registry
1. User hives
1. User profiles

## Mounting stuff

If you have vmdk files, you first need to turn them to raw images (which is vvery slow) or you need to create a raw view onto them:

```shell
sudo affuse -o ro,allow_other /cases/sample/myserver.vmdk /mnt/aff/myserver/
```

| Option | Meaning |
|--------|---------|
| `-o ro` | read-only|
| `-o allow_other`| allow access to other users |

Next, to make things easy, we create loop devices for every partition:

```shell
$ sudo losetup --show -f -P /mnt/aff/myserver/myserver.vmdk.raw
/dev/loop2
```

this generates `/dev/loop2p1` for partition 1, and so on. To see which partitions you have, use `mmls`.

| Option | Meaning | 
|--------|---------|
| `--show` | print device name after setup  (with `-f`) |
| `-f \| --find` | find first unused device |
| ` -P \| --partscan ` | create a partitioned loop device |

Now, we could mount a partition. Keep in mind that you never, ever, omit the `ro` option!
 ```shell
 $ sudo mount -o ro,show_sys_files,streams_interface=windows /dev/loop2p1 /mnt/myserver/C
 ```

| Option | Meaning | 
|--------|---------|
| `-o ro`| read-only |
| `-o show_sys_files`|Show the metafiles in directory listings|
| `-o streams_interface=windows`| enable access to streams using the Windows syntax (e.g. `cat file:stream`) |

## Timeline

### Filesystem timeline

To create a filesystem timeline, you need to know the following information:

- Which partition to triage?
- Which timezone has been configured on the system?

```shell
fls -r -m "C:/" -z CET /dev/loop2p1 >myserver_c.bodyfile
```

| Option | Meaning | 
|--------|---------|
|`-r`| Recurse on directory entries |
|`-m "C:/"`| Display output in mactime input format with `C:/` as the actual mount point of the image |
| `-z CET`| Time zone of original machine (`CET`) (only useful with -l)|


## Important Windows triage artifacts

| Artifact | Location | 
|-|-|
|System Registry | `%windir%\System32\config\SYSTEM` `%windir%\System32\config\SOFTWARE` |
|Event Logs | `%windir%\System32\winevt\Logs\*.evtx`|
|User profile hives| `C:\Users\*\NTUSER.DAT` |
|User profiles|`C:\Users\*`|