---
title: 宝塔启动nginx服务失败提示failed (98:Address already in use)
tags: [宝塔,nginx,后端技术]
date: 2018-09-21 10:39:21
categories: 技术记录
urlname: bt-panel-failed-to-start-nginx
keywords: 宝塔,nginx,端口,后端技术,80端口
description: nginx服务出现无法启动，启动失败提示nginx:[emerg] bind() to 0.0.0.0:80 failed (98:Address already in use)错误的时候的解决办法。
---


## 背景

发现宝塔的nginx没有在运行，于是在宝塔面板上手动重启，但是提示失败，失败信息是下面那样：

> 警告消息：
> 
> nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
> nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
> nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
> nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
> nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
> nginx: [emerg] still could not bind()

## 原因

原因是nginx服务被卡死，导致80端口被占用，地址已经被使用。

解决这一问题的办法，我们得找到占用80端口的服务进程，并结束它。

## 解决办法

用 `netstat -ntpl` 来查看端口使用情况


```
root@woo2:/www/server/panel# netstat -ntpl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      6822/nginx.conf
tcp        0      0 0.0.0.0:21              0.0.0.0:*               LISTEN      6672/pure-ftpd (SER
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1769/sshd
tcp        0      0 0.0.0.0:888             0.0.0.0:*               LISTEN      6822/nginx.conf
tcp        0      0 0.0.0.0:8888            0.0.0.0:*               LISTEN      20242/python
tcp        0      0 127.0.0.1:25            0.0.0.0:*               LISTEN      1943/sendmail: MTA:
tcp        0      0 127.0.0.1:587           0.0.0.0:*               LISTEN      1943/sendmail: MTA:
tcp6       0      0 :::21                   :::*                    LISTEN      6672/pure-ftpd (SER
tcp6       0      0 :::22                   :::*                    LISTEN      1769/sshd
tcp6       0      0 :::3306                 :::*                    LISTEN      19710/mysqld

```

可以看到进程pid 6822占用了80的端口，导致nginx无法启动。

我们只要将6822进程结束就行了


```
root@woo2:/www/server/panel# kill 6822

```

结束后再次查看端口使用情况


```
root@woo2:/www/server/panel# netstat -ntpl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:21              0.0.0.0:*               LISTEN      6672/pure-ftpd (SER
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1769/sshd
tcp        0      0 0.0.0.0:8888            0.0.0.0:*               LISTEN      20242/python
tcp        0      0 127.0.0.1:25            0.0.0.0:*               LISTEN      1943/sendmail: MTA:
tcp        0      0 127.0.0.1:587           0.0.0.0:*               LISTEN      1943/sendmail: MTA:
tcp6       0      0 :::21                   :::*                    LISTEN      6672/pure-ftpd (SER
tcp6       0      0 :::22                   :::*                    LISTEN      1769/sshd
tcp6       0      0 :::3306                 :::*                    LISTEN      19710/mysqld

```


发现已经没有80端口在使用中了。


然后就可以在宝塔面板上或者使用
`service nginx start`命令来启动nginx服务了。

