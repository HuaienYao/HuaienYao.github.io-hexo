---
title: Ubuntu修改时区的简单方法-以修改UTC为JST为例
tags:
- Ubuntu
- Linux
- 命令
categories: 技术记录
date: 2018-06-12 09:00:00
draft: false
urlname: change-timezone-for-unbuntu
keywords: Ubuntu,Linux,时区,命令
description: 本文记录了如何查看Linux的时区设置和变更时区。
---


背景
----

今天公司给了个课题，让我们查看AWS上的所有服务器是不是JST时区时间。
如果不是就需要修改为JST。
先用`date`命令来查看当前设置的时区。
![当前时区为EDT][1]
网上查询了下Ubuntu的时区修改方法。
<!--more-->

参照了[Ubuntu设置时区和更新时间][2]的教程。

解决方法
----

1、执行
```
tzselect
```
原文是推荐使用
```
sudo tzselect
```
*但是本次没有用sudo也成功了*
![这里选择5）Asia][3]
在出现的界面上选择你的时区。
这次我选的是Asia，Japan，Tokyo。这里只要输入对应选项前的号码就行了。
![选择19）Japan][4]

最后选择1）Yes 完成确认修改。
![选择1）Yes确认修改][5]


2、复制文件到 /etc/
```
sudo    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
```
![复制文件][6]
3、命令更新时间*(本次我没有执行此更新命令，发现时区已经修改为JST了)
```
sudo ntpdate us.pool.ntp.org
```
最后用`date`来确认当前时区。
![此处输入图片的描述][7]
最后的最后，`exit`退出服务器


  [1]: https://i.loli.net/2018/06/13/5b209ec985b9c.png
  [2]: https://blog.csdn.net/qq_20480611/article/details/50325653 "Ubuntu设置时区和更新时间"
  [3]: https://i.loli.net/2018/06/13/5b209ec99f1e6.png
  [4]: https://i.loli.net/2018/06/13/5b209ec9ad69a.png
  [5]: https://i.loli.net/2018/06/13/5b209ec9ae7bc.png
  [6]: https://i.loli.net/2018/06/13/5b209ec9ad5f0.png
  [7]: https://i.loli.net/2018/06/13/5b209ec9ad5f0.png
