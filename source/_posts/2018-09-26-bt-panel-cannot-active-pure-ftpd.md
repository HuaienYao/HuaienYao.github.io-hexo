---
title: 宝塔面板无法启动pure-ftpd服务的解决办法
tags: [宝塔,pure-ftpd,后端技术]
date: 2018-09-26 13:08:42
categories: 技术记录
urlname: bt-panel-cannot-active-pure-ftpd
keywords: 宝塔,pure-ftpd,后端技术
description: 本文记录了宝塔面板上无法启动pure-ftpd的解决办法。
---

宝塔面板安装pure-ftpd后发现并没有启动，多次手动重启还是显示关闭状态，重装好几次也无法启动。

进入ssh 
输入以下命令 看是否21端口给其他软件占用

```
lsof -i :21
```

如果结果是下面这样就是系统自带的ftp软件给占用了21端口
```
[root@izcupa3t172j1wz ~]# lsof -i :21
COMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
vsftpd  855 root    3u  IPv6  15453      0t0  TCP *:ftp (LISTEN)
```
输入以下命令启动即可

```
pkill -9 vsftpd
```


```
service pure-ftpd start
```
也可以用下面的命令启动pure-ftpd

```
/etc/init.d/pure-ftpd start

```



参考：https://www.bt.cn/bbs/thread-2746-1-1.html
