---
tags:
  - Deepin
  - 深度系统
  - Linux
title: 解决Deepin深度系统下没有无线网络选项之安装驱动
categories : 技术记录
date: 2018-06-13
draft: false
urlname: fix-no-wifi-on-deepin-os
keywords: Deepin,深度系统,Linux
description: 本文记录了如何通过安装驱动来解决Deepin深度系统下没有网络选项。

---

背景
---

前两天装了Deepin 深度系统。在查询Linux资料的时候被安利了。深度系统是国内最大的国产系统，由于其界面优美，符合国人使用习惯。下面摘了维基百科的词条：
> 深度操作系统，亦称为Deepin，原名 Hiweed Linux 及 Linux Deepin，是武汉深之度科技有限公司开发的Linux发行版。除操作系统外，深度团队也进行桌面环境和配套基础软件的开发[1]，并与第三方厂商合作开发Linux版本应用。目前系统已经拥有很多针对Deepin系统开发的应用程序。此外开发团队也参与Linux内核补丁相关作业[2]。

其实以前学生的时候，折腾过Linux系统。之前出名的就是深度和雨林木风两个。不过雨林木风好像继续做下去了。但是深度系统越做越大，好像主要客户就是政府、企业什么的。
<!--more-->

问题
---

安装并不难，我是用了官方的U盘安装制作工具。顺利安装完成。
但是安装完发现控制中心的网络设置只有有线网卡设置并没有无线网络开关。我用的是台式机+外置USB无线网卡
如图网络连接设置只有有线网络的设置

![网络连接设置只有有线网络的设置](https://i.loli.net/2018/06/14/5b21af19a34bc.png)


解决过程
---

在查询网上资料的时候发现官方论坛也有很多人反馈这个问题。
参照其他人的帖子后，确定下来应该是驱动问题。
所以具体流程应该是

```
1. 查看外置网卡有没有被识别
2. 根据查到的外置网卡型号找对应的驱动
3. 下载驱动并安装，重启
```

先在终端里面用
```
lsusb
```
来列出当前usb硬件，如下图
![列出当前usb硬件](https://s1.ax1x.com/2018/06/13/CXnvwR.png)
一开始不好分辨，拔掉外置网卡后就发现第一个没了。所以可确定是第一个。

但是这样不知道是什么型号，于是把0bda:a811网上查了下 搜索到型号应该是rtl8812AU。参考的是这里的
[Raspberry Pi 3 issues with 0bda:a811 Realtek Semiconductor Corp](https://ubuntu-mate.community/t/raspberry-pi-3-issues-with-0bda-a811-realtek-semiconductor-corp/15649/2)

里面推荐的驱动这里下载

- https://github.com/diederikdehaas/rtl8812AU/tree/driver-4.3.8

但是好像我之后用了其他也行。这都放上来

- https://github.com/gnab/rtl8812au
- https://github.com/diederikdehaas/rtl8812AU
- https://github.com/lwfinger/rtlwifi_new （这是合集，但是没有我要的）


最后通过github下载zip或者git clone下来。
把zip解压出来，在解压的文件内打开终端，输入以下命令

```
make
sudo make install
sudo modprobe rtl8812au
```
输入`reboot`重启就可以了


修复结果
---

控制中心的无线网络选项就出来啦

![修复后的样子。红色框框的无线网络开关原来是没有的](https://s1.ax1x.com/2018/06/13/CXuEmd.png)



这次主要是在找驱动上花了较多时间，还有在网上找的有些驱动里面会make出错，所以多找了一些驱动。基本github都有的。因为一直都用有线连接，没有无线功能也是能用，但是强迫症没办法，不然就是不舒服。本来还以为这个外置无线网卡是杂牌的，应该找不到驱动，没想到还能找到。

> ps：并且发现自从安装了深度系统后，总感觉屏幕显示字体很大，今天才发现是显示设置里面把放大屏幕设置为1.25倍了。难怪感觉屏幕有点不清楚而且浏览器里面的字特别大。。。只要在装完系统后把显示里面的放大屏幕改为100%就好了。看起来舒服多了。



参考资料
---

[彻底解决deepin linux的无线网络问题](https://bbs.deepin.org/forum.php?mod=viewthread&tid=153154)
