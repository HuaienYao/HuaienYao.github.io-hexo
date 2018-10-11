---
title: 开启Nginx的目录文件列表功能-让Nginx显示文件列表
id: 235
date: 2011-03-24 18:36:04
tags:
- Nginx
- 后端技术
categories: 技术记录 
urlname: let-nginx-show-file-list
keywords: Nginx,后端技术,目录列表,文件列表
description: 本文记录了如何开启Nginx的目录文件列表功能。
---

今天在hostloc上看到以为朋友xtmp 请教http://soft.vpser.net/是如何实现的，可以显示文件列表，因为http://soft.vpser.net/用的是nginx 作为webserver的，但是 nginx默认是不允许列出整个目录的，所以看到版主咯拉无米推荐的方法http://www.hostloc.com/thread-21478-1-4.html 帖子里美国VPS给出一个ctohome的详细教程，下面转自 ctohome<!--more-->

原地址详细教程请看这里[http://www.ctohome.com/FuWuQi/46/375.html](http://www.ctohome.com/FuWuQi/46/375.html)
> 打开nginx.conf文件，在location server 或 http段中加入
>
> autoindex on;
>
> 另外两个参数最好也加上去:
>
> autoindex_exact_size off;
>
> 默认为on，显示出文件的确切大小，单位是bytes。
>
> 改为off后，显示出文件的大概大小，单位是kB或者MB或者GB
>
> autoindex_localtime on;
>
> 默认为off，显示的文件时间为GMT时间。
>
> 改为on后，显示的文件时间为文件的服务器时间
>
>
> 配置Nginx目录列表的方法详细参照:http://wiki.nginx.org/NginxChsHttpAutoindexModule
>
>
> 如果想希望目录列表支持header,footer则可以安装三方插件: http://wiki.nginx.org/NginxNgxFancyIndex
>
>
> **配置Nginx目录列表的效果如下：**
>
> <pre>Index of /
>
>
> ../
>
> aspnet/                                            24-Jan-2010 21:45       -
>
> mui/                                               03-Jun-2010 11:42       -
>
> mysql/                                             24-Jan-2010 21:42       -
>
> others/                                            23-Apr-2010 10:35       -
>
> php/                                               24-Jan-2010 21:47       -
>
> sql/                                               31-Mar-2010 15:14       -
>
> zend/                                              16-Jan-2010 15:21       -
>
> ctohome.com                                        09-Jan-2010 11:35     130
>
> du.txt                                             25-Mar-2010 21:36      10
>
> dumeter.zip                                        22-Jan-2010 12:05      2M
>
> favicon.ico                                        26-Aug-2009 04:36     318
>
> ftp.exe                                            05-Jan-2010 06:31      4M
>
> index2.html                                        24-Jan-2010 21:53      24
>
> lxadmin.tar.gz                                     04-Jan-2010 19:27    820K
>
> servu.rar                                          08-Jan-2010 15:01     10M
>
> servu6.rar                                         16-Jan-2010 12:17      5M
>
> teamviewer.zip                                     15-Jan-2010 10:50      3M
>
> winrar.exe                                         09-Dec-2009 14:23      1M</pre>
