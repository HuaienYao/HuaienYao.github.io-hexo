---
title: 宝塔面板安装Flarum轻论坛程序时提示The PHP extension 'fileinfo' is required
tags: [php,宝塔,Flarum,fileinfo,后端技术,轻论坛]
date: 2018-08-10 13:54:48
categories: 技术记录
urlname: bt-panel-install-fileinfo-for-php
keywords: 宝塔,fileinfo,php,Flarum,后端技术,轻论坛
description: 在使用宝塔面板安装Flarum轻论坛程序时，出现错误提示：The PHP extension 'fileinfo' is required，本文介绍了解决办法。
---

## 原因
宝塔面板默认并没有安装fileinfo模块，可按以下教程安装：

注意：以下教程中56为PHP版本，请替换成您要安装此扩展的PHP版本，Flarum轻论坛程序最低要求PHP5.6+
<!--MORE-->
## 解决过程

### 进入对应版本的fileinfo扩展源码目录

```
cd /www/server/php/56/src/ext/fileinfo
```



### 初始化扩展安装

```
/www/server/php/56/bin/phpize
```



### 生成编译配置

```
./configure --with-php-config=/www/server/php/56/bin/php-config
```



### 编译并安装扩展

```
make && make install
```



### 写入配置文件

```
echo 'extension=fileinfo.so' >> /www/server/php/56/etc/php.ini
```



### 重载PHP配置

```
service php-fpm-56 reload
```

这样就可以了。