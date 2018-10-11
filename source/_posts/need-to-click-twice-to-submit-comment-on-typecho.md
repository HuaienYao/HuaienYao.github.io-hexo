---
title: typecho发表评论需要发送两次才成功的解决方案
date: 2017-06-26 21:28:16
tags:
- typecho
- 博客程序
categories: 技术记录
urlname: need-to-click-twice-to-submit-comment-on-typecho
keywords: typecho,博客程序
description: 本文记录了typecho发表评论需要发送两次才成功的解决方案。
---
最近发现typecho发表评论需要发送两次才会成功发送出去，网上查询了下资料，好像把***后台设置里面的开启反垃圾评论选项关闭***就可以解决问题。
原来typecho的反垃圾就是通过用户发送两次评论来实现。。。
但是这样造成第一次输入了评论，点击发送后，变成空白，也没显示出来。只能重新编辑评论内容，重新点击发送。。。
