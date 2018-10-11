---

date: 2017-10-1T11:59:30+09:00
draft: false
title: 用Linux系统搭建Web环境做网站网站FTP权限问题
tags: [VPS,权限,FTP,后端技术]
isCJKLanguage: true
categories: 技术记录
urlname: linux-ftp-permission
keywords: VPS,权限,FTP,后端技术
description: 本文记录了Linux系统搭建Web环境做网站的FTP权限问题解决办法。
---

在搬瓦工的VPS上，wordpress的主题或者插件无法直接在后台安装与修改。会弹出ftp设置。
导致这一问题，一个是需要修改wordpress的主题和插件的文件夹的权限为777。
但是还有个问题是ftp终端上无法直接修改网站的相关文件及文件夹。会出现`响应:	550 Could not change perms on filebox.php: Operation not permitted`
<!--more-->
此时需要在shell操作，将指定文件夹修改为www用户的所有权。比如在lnmp环境下，修改网站的默认文件夹是`chown -R www.www /home/wwwroot/` 要修改755权限等等的话操作
`find /home/wwwroot/ -type d -exec chmod 755 {} \;`
`find /home/wwwroot/ -type f -exec chmod 644 {} \;`

以上参考了[vps部落相关资源](https://www.vpsbuluo.com/jiaocheng/47.html)
