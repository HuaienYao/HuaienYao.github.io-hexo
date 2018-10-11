---
title: typecho博客程序上传后缀为大写JPG附件失败的解决办法
date: 2017-06-19 11:15:48
tags:
- typecho
- Linux
categories: 技术记录
urlname: typecho-upload-jpg-image
keywords: typecho,Linux,上传JPG失败
description: 本文记录了typecho博客程序上传后缀为大写JPG附件失败的解决办法。
---

昨天安装了Typecho 1.0 (14.10.10)，是官网最新的正式版，但是调试中遇到一个问题，就是上传照片的时候会出现不能上传，后来试来试去发现是后缀扩展名为大写的图片不能支持。比如JPG,PNG等，这些是最新ios拍照自动使用大写后缀。但是ios系统又不支持修改文件名，所以导致博客不能用ios系统来上传附件。后来网上找了好久资料，才看到[ Web Designer][1]有解决方法，这里谢谢他发出来。具体需要修改两个文件，以下摘自[ Web Designer][1]

> > 将var/Widget/Options/General.php 文件修改如下：
>
>     $getText = new Typecho_I18n_GetText($file);
>
>   改成下面一句
>
>     $getText = new Typecho_I18n_GetText($file, false);
>
>   将var/Widget/Upload.php 文件修改如下：
>
>     return isset($info['extension']) ? $info['extension'] : '';
>
>   改成下面一句
>
>     return isset($info['extension']) ? strtolower($info['extension']) : '';




  [1]: http://blog.freedomlang.com/250.html
