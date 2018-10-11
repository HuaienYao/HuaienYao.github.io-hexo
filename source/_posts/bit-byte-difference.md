---
title: Byte与Bit有什么区别
id: 230
date: 2011-03-20 17:39:31
tags:
- IT知识
categories: 技术记录
urlname: difference-byte-bit
keywords: Byte,Bit,信息技术
description: 相信很多人会搞不明白Byte和Bit的区别，本文记录了这两者的区别。
---

在工作中遇到一些概念模糊的地方, 特此转载来以供查询。
bit意为“位”或“比特”，是计算机运算的基础；
byte意为“字节”，是计算机文件大小的基本计算单位； <!--more-->

说到usb2.0标准接口传输速率。许多人都将“480mbps”误解为480兆/秒。其实，这是错误的，事实上“480mbps”应为“480兆比特/秒”或“480兆位/秒”，它等于“60兆字节/秒”，大家看到差距了吧。

这要从bit和byte说起：bit和byte同译为"比特"，都是数据量度单位，bit=“比特”或“位”。
byte=字节即1byte=8bits,两者换算是1：8的关系。
mbps=mega bits per second(兆位/秒)是速率单位，所以正确的说法应该是说usb2.0的传输速度是480兆位/秒,即480mbps。
mb=mega bytes(兆比、兆字节)是量单位，1mb/s（兆字节/秒）=8mbps（兆位/秒）。

我们所说的硬盘容量是40gb、80gb、100gb，这里的b指是的byte也就是“字节”。
1 kb = 1024 bytes =2^10 bytes
1 mb = 1024 kb = 2^20 bytes
1 gb = 1024 mb = 2^30 bytes

比如以前所谓的56kb的modem换算过来56kbps除以8也就是7kbyte，所以真正从网上下载文件存在硬盘上的速度也就是每秒7kbyte。
也就是说与传输速度有关的b一般指的是bit。
与容量有关的b一般指的是byte。

最后再说一点: usb2.0 480mbps=60mb/s的传输速率还只是理论值，它还要受到系统环境的制约（cpu、硬盘和内存等），其实际读、取写入硬盘的速度约在11～16mb/s。但这也比usb1.1的12mbps(1.5m/s)快了近10倍。
转载自http://sujian.blog.51cto.com/8838/4632
