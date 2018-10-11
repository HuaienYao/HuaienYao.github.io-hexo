---
title: LNMP环境下typecho无法登录后台解决方案
id: 203
date: 2011-03-06 10:44:42
tags:
- typecho
- LNMP
- 博客程序
categories: 技术记录
urlname: lnmp-typecho-login-error
keywords: typecho,LNMP,博客程序,后台登录
description: 本文记录了LNMP环境下typecho无法登陆后台的解决方法。
---

**感谢[小夜](http://www.vpsmm.com/)提供帮助。**
> 出现的问题：liccess的lnmp0.6 搭建好后安装了typecho后，只有首页可以访问，其他页面都不能访问，后台登录界面可以看到，但是登录后无法访问。官方有解决方案但是我按照那还是解决不了<!--more-->
解决方案：
> -lnmp安装typecho 后无法进入后台和其他页面要怎么解决呢？首页可以进去.
>
>
> 找到域名配置文件，修改为：include typecho.conf
>
> 再重载LNMP命令：/root/lnmp reload 应该就可以了。
>
>
> -安装lnmp时绑定的域名，直接放在/home/wwwroot/,所以没有添加虚拟主机，找不到/usr/local/nginx/conf/vhost/这个文件夹，不知道域名配置文件在哪
>
>
> 修改/usr/local/nginx/conf/nginx.conf，里面的域名为419.at或其它任意。
>
> 命令/root/vhost.sh重新绑定，记得绑定时，输入伪静态规则typecho就行了。
>
>
> -如何用ip直接访问
>
>
> 绑域名的时候，把网站的默认目录设置为/home/wwwroot/即可。
