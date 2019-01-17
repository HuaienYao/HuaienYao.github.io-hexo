---
title: 忘记Imagevue的登录信息的解决方案
id: 206
date: 2011-03-06 12:10:49
tags:
- 图床
- Imagevue
- 相册程序
categories: 技术记录
urlname: forgot-imagevue-login-information
keywords: 图床,Imagevue,相册程序
---

今天想要登录下[锅烧网媒体库](http://www.guosao.com)，但好像登录的用户名密码都不正确，无法正常登录，所以在网上找了找，看到zfreet.com的一个教程，现在分享下方法。

找到**\imagevue\config\users.php **这个文件，由于无法破解里面的加密信息，所以只能删除该文件，然后进入登录地址，用初始的**admin/admin** 进去，然后再修改用户名及密码。<!--more-->

感谢zfreet [教程地址](http://www.zfreet.com/post/reset-password-of-imagevue-x2.html)
