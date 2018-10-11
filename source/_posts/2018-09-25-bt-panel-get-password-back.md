---
title: 宝塔面板忘记密码如何找回宝塔面板账户登录密码
tags: [宝塔,密码,安全,后端技术]
date: 2018-09-25 9:39:21
categories: 技术记录
urlname: bt-panel-get-password-back
keywords: 宝塔,密码,安全,找回密码,忘记密码,后端技术
description: 我们在安装宝塔面板后忘记记下来给的默认账户和密码，之后我们要登录的时候却不知道账户和密码是什么，这时候我们可以通过ssh来命令找回或者重置密码。
---

## 找回密码

如果只是忘记了密码，还记得账号

可以输入以下命令回车找回密码（早期版本默认账号admin）


```
cat /www/server/panel/default.pl
```
下面是执行命令实例
```
root@woo2:~# cat /www/server/panel/default.pl
c58d3170
```
返回的c58d3170就是密码。

## 找回用户名

如果你也不记得账号，可以通过下面的命令来重置密码并得到默认账户。


```
cd /www/server/panel && python tools.pyc panel newpassword
```
newpassword请改成你要修改的密码


```bash
root@woo2:~# cd /www/server/panel && python tools.pyc panel newpassword
rwlfzj3w
```

可以看到返回的rwlfzj3w就是你的账号，你可以用这个账号和新密码来登录面板，登录进去后可以去面板设置修改账号密码。

原文地址：http://www.bt.cn/bbs/thread-1172-1-1.html
