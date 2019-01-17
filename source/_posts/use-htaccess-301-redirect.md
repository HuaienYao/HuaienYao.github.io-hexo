---
title: 配置.htaccess来实现301重定向（旧域名指向新域名）
id: 89
date: 2010-11-20 19:03:37
tags:
- htaccess
- 重定向
- apache
- 后端技术
categories: 技术记录
urlname: use-htaccess-301-redirect
keywords: htaccess,重定向，apache,后端技术
description: 本文记录了配置.htaccess来实现301重定向（旧域名指向新域名）。
---

换了域名，为了访问旧域名的访客引导到新域名上，要使用301重定向。

最后在网上找到这么一个方法，可以通过 .htaccess 来实现 301 重定向，原文如下：

出于 SEO、PR 值传递、网址转换的目的，在网站初建和网站迁移时我们都需要使用 301 重定向，通常包括域名对域名，目录对目录和一个独立网址对另一个独立网址的重定向。在虚拟主机上作 301 重定向，最常用的方法有2种：

1.直接编辑 .htaccess。

2.用 cPanel 设定。

实质二者都是修改文件 .htaccess，只是前者手工编辑，后者是由 cPanel 完成。用 cPanel 操作相当简单，登陆你的 cPanel Domain Redirects，选择相应的选项即可完成设置，这里暂不讨论。下面讲一下直接编辑 .htaccess 的方法。

注意：在设置 301 重定向之前务必备份相应目录下的.htaccess文件。

**1.重定向`domain.com`到`www.domain.com`**

这种重定向旨在使域名唯一，是网站SEO必须要做的，后面重定向`www.domain.com`到`domain.com`也是出于同样的原因，只是形式不同。打开.htaccess文件，加入以下规则。(下面的规则是针对主域名的，子域名要修改)
```
RewriteEngine On

RewriteCond %{HTTP_HOST} !^www.domain.com$ [NC]

RewriteRule ^(.*)$ http://www.domain.com/$1 [L,R=301]
```
**2.重定向www.domain.com到domain.com**
```
RewriteEngine On

RewriteCond %{HTTP_HOST} !^domain.com$ [NC]

RewriteRule ^(.*)$ http://domain.com/$1 [L,R=301]
```
**3.重定向olddomain.com到www.newdomain.com**
```
RewriteEngine On

RewriteCond %{HTTP_HOST} !olddomain.com$ [NC]

RewriteRule ^(.*)$ http://www.newdomain.com/$1 [L,R=301]
```
**4.重定向olddomain.com to newdomain.com**
```
RewriteEngine On

RewriteBase /

RewriteCond %{HTTP_HOST} !olddomain.com$ [NC]

RewriteRule ^(.*)$ http://newdomain.com/$1 [L,R=301]
```
**5.重定向domain.com/file/file.php 到 otherdomain.com/otherfile/other.php**
```
RewriteCond %{HTTP_HOST} ^www.domain.com$

RewriteRule ^file/file.php$ http://www.otherdomain.com/otherfile/other.php [R=301,L]
```
以上摘自：[Life Studio](http://wange.im/ "Life Studio") » [《修改 .htaccess 实现 301 重定向》](http://wange.im/redirect-by-htaccess.html "修改 .htaccess 实现 301 重定向")

wordpress博客目录下自动会有一个.htaccess文件，直接按照上面相关替换里面的一些文字就行。没有.htaccess文件的话可以用记事本新建一个。
附上我的.htaccess文件内容
```
<div id="_mcePaste"># BEGIN WordPress</div>

<div id="_mcePaste">&lt;IfModule mod_rewrite.c&gt;</div>

<div id="_mcePaste">RewriteEngine On</div>

<div id="_mcePaste">RewriteBase /</div>

<div id="_mcePaste">RewriteCond %{HTTP_HOST} !http://blog.wyane.net$ [NC]</div>

<div id="_mcePaste">RewriteRule ^(.*)$ http://www.maybe.asia/$1 [L,R=301]</div>

<div id="_mcePaste">&lt;/IfModule&gt;</div>

<div id="_mcePaste"># END WordPress</div>

# BEGIN WordPress IfModule mod_rewrite.c&gt;RewriteEngine OnRewriteBase /RewriteCond %{HTTP_HOST} !http://blog.wyane.net$ [NC]RewriteRule ^(.*)$ http://www.maybe.asia/$1 [R=301]&lt;/IfModule&gt;

# END WordPress
```
