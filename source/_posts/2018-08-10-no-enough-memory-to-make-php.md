---
title: 编译安装PHP组件出现错误提示内存不足：virtual memory exhausted Cannot allocate memory 
tags: [PHP,fileinfo,SWAP,后端技术]
date: 2018-08-10 14:59:51
categories: 技术记录
urlname: no-enough-memory-to-make-php
keywords: PHP,fileinfo,SWAP,后端技术
description: 本文介绍了在编译PHP组件时候遇到内存不足提示virtual memory exhausted Cannot allocate memory的时候，如何增加SWAP虚拟内存来解决。
---

## 背景
前面一篇我们介绍了[宝塔面板的PHP默认不安装fileinfo组件，需要手动编译安装](https://huaien.me/article/backend/bt-panel-install-fileinfo-for-php/)。在php5.6上是没有出现问题，但是在编译php7.1的版本的`make && make install`这一步出现错误，提示：
<!--MORE-->

```
virtual memory exhausted: Cannot allocate memory
Makefile:197: recipe for target 'libmagic/apprentice.lo' failed
```
下面是make编译后的详细信息：

```
/www/server/php/71/src/ext/fileinfo# make && make install /bin/sh /www/server/php/71/src/ext/fileinfo/libtool --mode=compile cc -I/www/server/php/71/src/ext/fileinfo/libmagic -I. -I/www/server/php/71/src/ext/fileinfo -DPHP_ATOM_INC -I/www/server/php/71/src/ext/fileinfo/include -I/www/server/php/71/src/ext/fileinfo/main -I/www/server/php/71/src/ext/fileinfo -I/www/server/php/71/include/php -I/www/server/php/71/include/php/main -I/www/server/php/71/include/php/TSRM -I/www/server/php/71/include/php/Zend -I/www/server/php/71/include/php/ext -I/www/server/php/71/include/php/ext/date/lib  -DHAVE_CONFIG_H  -g -O2   -c /www/server/php/71/src/ext/fileinfo/libmagic/apprentice.c -o libmagic/apprentice.lo
 cc -I/www/server/php/71/src/ext/fileinfo/libmagic -I. -I/www/server/php/71/src/ext/fileinfo -DPHP_ATOM_INC -I/www/server/php/71/src/ext/fileinfo/include -I/www/server/php/71/src/ext/fileinfo/main -I/www/server/php/71/src/ext/fileinfo -I/www/server/php/71/include/php -I/www/server/php/71/include/php/main -I/www/server/php/71/include/php/TSRM -I/www/server/php/71/include/php/Zend -I/www/server/php/71/include/php/ext -I/www/server/php/71/include/php/ext/date/lib -DHAVE_CONFIG_H -g -O2 -c /www/server/php/71/src/ext/fileinfo/libmagic/apprentice.c  -fPIC -DPIC -o libmagic/.libs/apprentice.o
virtual memory exhausted: Cannot allocate memory
Makefile:197: recipe for target 'libmagic/apprentice.lo' failed
make: *** [libmagic/apprentice.lo] Error 1

```
## 原因
==这个意思是内存不足，无法完成编译。==

本次使用的是AWS t2.micro配置的EC2实例，实际上其内存有1GB，但是还是出现本次的错误，应该是同时运行的其他程序导致内存不足。

## 解决办法

既然这样，物理内存不足我们没办法，但是可以通过自行增加虚拟内存的方法来解决。

### 通过free -m来查看下内存使用状况

```
# free -m
              total        used        free      shared  buff/cache   available
Mem:            990         466         447           3          76         401
Swap:             0           0           0

```
### 创建一个目录/opt/images/
 你可以自己定路径

```
# mkdir /opt/images/
# rm -rf /opt/images/swap
```
### 创建一个2GB大小的文件
```
# dd if=/dev/zero of=/opt/images/swap bs=1024 count=2048000
2048000+0 records in
2048000+0 records out
2097152000 bytes (2.1 GB, 2.0 GiB) copied, 30.3635 s, 69.1 MB/s

```

### 把创建的文件变成SWAP分区
```
# mkswap /opt/images/swap
Setting up swapspace version 1, size = 2 GiB (2097147904 bytes)
no label, UUID=dd2fa2db-f8bd-41db-9e1a-5d9257924c6f

```
### 启用这个SWAP文件

```
# swapon /opt/images/swap
swapon: /opt/images/swap: insecure permissions 0644, 0600 suggested.

```
### 看看SWAP是否生效

```
# free -m
              total        used        free      shared  buff/cache   available
Mem:            990         467          64           3         458         356
Swap:          1999           0        1999

```
可以看到的确有2GB的SWAP内存

### 然后回到原来的作业
使用`cd -`回到原来的`/www/server/php/71/src/ext/fileinfo`目录


### 继续编译fileinfo

```
# make && make install
```

执行成功

```
See any operating system documentation about shared libraries for
more information, such as the ld(1) and ld.so(8) manual pages.
----------------------------------------------------------------------

Build complete.
Don't forget to run 'make test'.

Installing shared extensions:     /www/server/php/71/lib/php/extensions/no-debug-non-zts-20160303/

```

### 完成后关闭SWAP


```
# swapoff swap
# rm -f /opt/images/swap

```
以后再出现内存不足可以通过增加SWAP虚拟内存来解决~


## 参考资料

https://www.cnblogs.com/chenpingzhao/p/4820814.html



