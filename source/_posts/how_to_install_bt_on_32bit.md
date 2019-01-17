---
Tags:
  - 宝塔
  - 服务器面板
  - 后端技术
title: 解决32系统无法安装bt宝塔服务器面板
categories:
 - 技术记录
date: 2018-05-25
draft: false
urlname: install-bt-panel-on-32-bit-os
keywords: 宝塔面板，32位,后端技术,运维
description: 本文记录了用32位系统安装宝塔面板提示错误的解决办法。
---
## bt ##
  前段时间把VPS重装系统为debian的32位，因为内存只有512M，还是用32位比较省资源。
但是在安装宝塔面板的时候却提示BT不支持32位系统的安装（如图）
![BT不支持32位系统的安装][1]
原来是因为安装的时候会检测是否为64位系统。
<!--more-->
这里我们可以用
`vi install.sh`
来修改安装脚本，删除以下部分（如图）
vi命令

    删除命令
    ndw或ndW：删除光标处开始及其后的n-1个字
    do：删至行首
    d$：删至行尾
    ndd：删除当前行及其后n-1行
    x或X：删除一个字符，x删除光标后的，而X删除光标前的
    Ctrl+u：删除输入方式下所输入的文本

![图中部分删除][2]

    if [ "$is64bit" = '32' ];then
    	echo '=================================================';
    	echo -e "\033[31m BT-Panel Incompatible 32 bit OS. \033[0m";
    	exit;
    fi

`:wq`，保存退出，重新运行`sh install.sh`，即可安装。

  [1]: https://s1.ax1x.com/2018/05/29/C5ZVvF.png
  [2]: https://s1.ax1x.com/2018/05/29/C5ZEgU.png
