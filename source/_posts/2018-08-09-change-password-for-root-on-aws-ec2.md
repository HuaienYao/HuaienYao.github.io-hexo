---
title: AWS用ec2-user用户来更改root密码并使用root用户
tags: [AWS,后端技术,服务器]
date: 2018-08-09 09:41:01
categories: 技术记录
urlname: change-password-for-root-on-aws-ec2
keywords: EC2,AWS,root,ec2-user,密码,后端技术
description: 本文记录了如何使用AWS的EC2的默认用户ec2-user用户登录来创建root密码并切换到root登录的方法。
---
## 背景
AWS的EC2在创建实例后，默认是使用ec2-user用户加密钥文件来登录ssh，使用AWS默认的EC2账户登录服务器后，用户权限收到很大的限制，有些目录无法访问，需要切换到root账户下工作。
## 创建root密码
初次登录aws后并没有默认的root用户密码，需要在ec2用户下创建root密码，可以使用命令
<!--MORE-->
```
sudo passwd root
```
在出现提示后创建新密码。
## 重置密码
如果出现root密码丢失的情况，也可以使用上边的命令重新生成新的root密码。 
## 切换root用户
密码更改完成，后续的切换用户操作用 su 命令输入设定好的新密码就可以切换到root用户了。

经常登录AWS EC2的话，这个在一开始就会用到，如果修改密码，这个命令也是很方便的。