---
title: 解决wordpress后台安装插件时提示需要ftp账号和密码
tags: [WordPress,ftp,博客程序]
date: 2018-09-26 14:08:54
categories: 技术记录
urlname: wordpress-install-plugin-show-ftp-info
keywords: WordPress,插件,ftp,博客程序
description: 在安装wordpress后如果没有配置好权限，在后台安装插件主题等会弹出提示需要输入ftp账户与密码，本文记录了该问题的解决方法。
---

在wordpress安装之后，想要安装一个插件来用，结果弹出提示输入ftp账户与密码。如下图

![弹出提示输入ftp账户与密码](https://ww1.sinaimg.cn/large/005YhI8igy1fvmtky7cxqj30ch0dzaab.jpg)

最后搜索了一下网上的解决方案，所需要更改wordpress文件夹的权限，命令如下：

```
sudo chown -R www  /home/wwwroot/wordpress
```
这个命令是将wordpress目录下的所有文件与子目录进行相同的拥有者变更为www(即以递回的方式逐个变更)

后面的`/home/wwwroot/wordpress`路径是自己安装wordpress的文件夹。

如果这样操作报一下错误的话


```
chown: changing ownership of `/home/wwwroot/wordpress/.user.ini': Operation not permitted
```

只需要如下更改之后就ok了：

```
sudo chown -R www  /home/wwwroot/hi/*
```

只需要在文件路径之后再加一个/* 。

---------------------

本文来自：https://blog.csdn.net/u014182411/article/details/78127663?utm_source=copy
