---
title: Wordpress无法编辑更新文章之解决方案
id: 208
date: 2011-03-07 21:28:16
tags:
- WordPress
- 博客程序
categories: 技术记录
urlname: wordpress-mod-security
keywords: WordPress,博客程序
description: 本文记录了WordPress无法编辑更新文章的解决方法。
---

前天锅烧网出现一个异常，可以添加新文章，但是无法更新和编辑文章，点击更新那个按钮后出现错误提示
> Not Acceptable
>
> An appropriate representation of the requested resource /wp-admin/post.php could not be found on this server.
>
>
> Additionally, a 404 Not Found error was encountered while trying to use an ErrorDocument to handle the request.<!--more-->
折腾了半死还是没办法，还因此丢失了一些数据，于是在hostloc上发了求助帖，[ifoneday同学](http://www.hostloc.com/viewthread.php?tid=49276&amp;page=2#pid654780)帮助了我，于是我就向主机商提交了TK，申请禁用Mod security模块，很快就解决了，在这里再次感谢下[ifoneday同学](http://www.hostloc.com/viewthread.php?tid=49276&amp;page=2#pid654780)，谢谢！

后来在网上看到有些人又有其他办法
> 8\. mod_security 可能会造成问题。禁用它，看看是否这就是问题所在。为此，需要新建一个.htaccess文件在wp-admin目录。内容为：
>
>
> &lt;IfModule mod_security.c&gt;
>
> SecFilterEngine Off
>
> SecFilterScanPOST Off
>
> &lt;/IfModule&gt;
>
>
> 这将为wp-admin整目录禁用mod_security。
上面的方法来自[http://seanchenxi.com/wordpress-25-add-image-problem.html](http://seanchenxi.com/wordpress-25-add-image-problem.html)

他里面提到这个来自[http://wordpress.org/support/topic/164999?replies=1](http://wordpress.org/support/topic/164999?replies=1)
