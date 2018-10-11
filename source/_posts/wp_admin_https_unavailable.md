---
tags:
  - WordPress
  - HTTPS
  - SSL
  - 博客程序
title: 开启HTTPS后WordPress后台wp-admin提示ERR_TOO_MANY_REDIRECTS
categories:
 - 技术记录
urlname: wp_admin_https_unavailable
date: 2018-06-05
draft: false
keywords: WordPress,HTTPS,SSL证书,博客程序
description: 本文记录了HTTPS开启后WordPress后台登录提示ERR_TOO_MANY_REDIRECTS的解决办法。
---
今天打开Hanayao博客，访问后台`wp-admin`发现提示 `ERR_TOO_MANY_REDIRECTS`
于是查询了下解决方法，参考了[同富][1]的文章，发现可以解决。特记录下来。
在wp-config.php文件下增加了以下几行就可以。
<!--more-->

```
define('FORCE_SSL_ADMIN',true);
// in some setups HTTP_X_FORWARDED_PROTO might contain
// a comma-separated list e.g. http,https
// so check for https existence
if (strpos($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false)
$_SERVER['HTTPS']='on';
```


  [1]: https://www.tongfu.info/solve-wordpress-wp-admin-https-redirect-loop/
