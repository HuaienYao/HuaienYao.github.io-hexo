---

date: 2017-9-29T06:42:21-07:00
draft: false
title: 关于WordPress后台只显示一个主题的问题
tags:
- WordPress
- SSL
- 博客程序
categories: 技术记录
urlname: wordpress-only-one-theme
isCJKLanguage: true
keywords: WordPress,SSL证书,博客程序
description: 本文记录了WordPress后台只显示一个主题的解决办法。


---

今天给Hanayao博客配置了SSL证书，但是发现前台还是不会显示安全。但是在wordpress后台登录界面却可以显示安全标识。于是进了Hanayao博客后台，想换个主题试试。因为可能是使用的情侣博客主题并不是很完善，导致页面有漏洞。但是却发现后台只能看到一个主题。不过可以安装新的主题，但是安装后也是只显示最新安装的主题。
于是查询了下资料，发现是
<!--more-->
> 服务器环境禁用了 scandir函数，导致WordPress无法正常缓存主题。
于是解决的办法只有通过开启php的scandir函数。
找到位于`/usr/local/php/etc` 目录下的php.ini，查找其中的“disable_funcions”字样，找到并删除紧随其后的“scandir”，最后保存该文件。
重启服务器的php服务就可以了

来自：[themebetter][1]
  [1]: https://themebetter.com/wordpress-one-theme.html
