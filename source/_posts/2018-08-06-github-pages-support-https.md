---
title: Github Pages已经官方支持HTTPS与如何开启GitHub Pages HTTPS支持
tags: [GitHub Pages,HTTPS]
date: 2018-08-06 13:25:35
categories: 小道消息
urlname: github-pages-support-https
keywords: GitHub Pages,HTTPS
description: 本站是同时托管在GitHub Pages和Coding Pages,Coding Pages很早的时候就支持后台开通HTTPS，用的是自动签发Let's Encrypt的免费证书。而在今年5月1日，GitHub官方也宣布了GitHub Pages支持HTTPS。
---

## 背景
根据GitHub博客，Github Pages是从今年5月1日开始支持的HTTPS的：
https://blog.github.com/2018-05-01-github-pages-custom-domains-https/
<!--more-->

## 为GitHub开启HTTP
### 已经成功绑定域名的情况
如果你的Github Pages已经绑定了自己的域名，那就可以直接在Github的设置里面打开自定义域名的HTTPS支持。
![GitHub Pages里面的自定义域名设置](https://i.loli.net/2018/08/02/5b6258e92e11e.png)
如图 在GitHub Pages的选项里面最后一栏有Enforce HTTPS选项。要开启这个功能需要下面条件。

> 域名已经解析到GitHub 服务器来绑定域名

具体请参考这里

https://help.github.com/articles/about-supported-custom-domains/

这是如果没有解析到GitHub服务器，会提示你没有正确把域名指向GitHub服务器。这需要你添加CNAME记录解析到 你的github pages地址，如username.github.io

![没有正确解析指向GitHub服务器会提示错误](https://i.loli.net/2018/08/02/5b62629e6acac.png)

### HTTPS支持问题
如果HTTPS出现支持问题可以通过直接添加A记录解析到GitHub服务器来启用HTTPS。


具体请参考这里：
https://help.github.com/articles/troubleshooting-custom-domains/#https-errors

需要做的是 添加以下任意一个A记录解析到下面的服务器IP
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

这样就会出现前面图片的结果，会提示 ：

> — Not yet available for your site because the certificate has not finished being issued.
> Please allow 24 hours for this process to complete.

### 成功开启
解析后会开始申请证书。通常需要24小时来完成。  
耐心等待就好。但是事实上只要几分钟，刷新页面就可以了。如图，我提交后不到几分钟就可以打钩HTTPS选项了
![几分钟后HTTPS选项就可以启用了](https://i.loli.net/2018/08/02/5b626e2386220.png)

开启之后上面会提示

> Your site is published at https://huaien.me/

已经是加了https的链接。

以上就是开启GitHub Pages的HTTPS支持的方法。