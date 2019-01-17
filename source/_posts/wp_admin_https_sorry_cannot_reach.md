---
tags:
  - WordPress
  - HTTPS
  - SSL
title: 开启HTTPS后WordPress后台wp-admin登录后：显示抱歉，您不能访问此页面
categories:
 - 技术记录
urlname: wp_admin_https_sorry_cannot_reach
date: 2018-06-05
draft: false
keywords: WordPress,HTTPS,SSL证书
description: 本文记录了开启HTTPS后WordPress后台无法登陆的错误的解决办法。
---
之前提到Hanayao博客，开启HTTPS后访问后台`wp-admin`提示 `ERR_TOO_MANY_REDIRECTS`过多次重定向的[解决办法][1]
但是解决多次重定向的问题后，登陆账号后又显示“抱歉，您不能访问此页面。”的提示
经过查询，下面两部可以解决这个问题。

<!--more-->

1、打开根目录下wp-config.php文件，在require_once(ABSPATH . ‘wp-settings.php’);前添加以下代码
```
/**开启HTTPS*/
define('FORCE_SSL_ADMIN', true);
define('FORCE_SSL_LOGIN', true);
$_SERVER['HTTPS'] = 'ON';
define( 'CONCATENATE_SCRIPTS', false );
```
2、后台-设置-常规

WordPress地址（URL），地址改为https

站点地址（URL），地址改为https

（如果后台无法登录，可以在数据库里修改，wp_options表里的，siteurl、home）

参考来源[wordpress开启https，后台登录显示“抱歉，您不能访问此页面。”][2]


  [1]: https://huaien.me/2018/06/05/wp_admin_https_unavailable/
  [2]: https://www.myseo.com.cn/note/613.html
