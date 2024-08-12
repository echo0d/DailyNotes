# CS





### CS梼杌插件里两个抓密码功能区别

`Mimikatz Logon Passwords` ：内存加载mimikatz到目标主机，然后执行`sekurlsa::logonpasswords`

`DumpLsass SharpDump`：先内存加载一个SharpDump.exe，然后调用rundll32执行，把从内存里抓到的内容保存在xxx.out文件里，然后gz压缩成.bin文件，这个文件会留在靶机上，下载下来解压，用mimakatz读就行了。

![image-20240715154133457](./img/CS/image-20240715154133457.png)
