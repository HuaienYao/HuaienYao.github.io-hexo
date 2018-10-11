---
title: typecho文章评论带表情就database query error
date: 2017-06-26 21:28:16
tags:
- typecho
- database
- mysql
categories: 技术记录
urlname: comment-with-emoji-shows-datebase-error-on-typecho
keywords: typecho,数据库,mysql
description: 本文记录了在typecho文章评论时带表情出现datebase query error的错误的解决办法。
---
前几天开了童童的博客，但是在发布文章经常出现错误。老婆说发不出去。发给我的截图显示错误为

> database query error

但是我测试了发送，却没有问题。这时候我以为是数据库连接不稳定。
后来又有文章发不出去，老婆把要发的内容发给我，让我来人发。但是我也是发不出去。后来排查了一番。发现去掉文章中的表情。就可以发出。按照网上的说法，打开了typecho的调试模式
<!--more-->


> 在config.inc.php里加入

    define('__TYPECHO_DEBUG__', true);

然后尝试了下文章里面带表情发布测试下就出现以下内容，只复制了开头，实际上有好多

    Incorrect string value: '\xF0\x9F\x91\x8F\x0D\x0A...' for column 'text' at row 1

然后网上找了很久教程，都说是数据库的编码问题。
通过执行以下sql命令可以查询到数据库的编码

    show variables like '%char%';

但是查询了之后 数据库的database 和server都是latin1，通过网上的教程修改成utf8后还是没解决问题。
最后还是通过这个[typecho 支持 Emoji 表情][1]博问解决了问题
原因总结来说就是utf8的数据库不支持表情。

> 要想数据库支持 Emoji 表情，就得使用 utf8mb4 编码来支持，于是我们需要修改已有数据库的编码格式，好消息是 utf8mb4 是 utf-8 的超集，完全兼容 utf-8，修改后，不会影响现有数据。
>
>  
>
>  
>
>  - 修改数据表编码
>
> 登录服务器的 MySQL 命令行或使用 phpAdmin：
>
> mysql -u 有typecho数据库权限的用户名 -p 输入密码，进入 MySQL，切换到 typecho 的数据库。
>
> use typecho数据库名; 执行以下 sql 语句，修改 typecho 数据库中表的编码格式为 utf8mb4。
>
>     alter table typecho_comments convert to character set utf8mb4 collate utf8mb4_general_ci;
>     alter table typecho_contents convert to character set utf8mb4 collate utf8mb4_general_ci;
>     alter table typecho_fields convert to character set utf8mb4 collate utf8mb4_general_ci;
>     alter table typecho_metas convert to character set utf8mb4 collate utf8mb4_general_ci;
>     alter table typecho_options convert to character set utf8mb4 collate utf8mb4_general_ci;
>     alter table typecho_relationships convert to character set utf8mb4 collate utf8mb4_general_ci;
>     alter table typecho_users convert to character set utf8mb4 collate utf8mb4_general_ci;
>
>  - 修改 config.inc.php 配置
>
> 修改 charset 的至为 utf8mb4。
>
>     /** 定义数据库参数 */
>     $db = new Typecho_Db('Pdo_Mysql', 'typecho_');
>     $db->addServer(array (
>       ...
>       'charset' => 'utf8mb4',  # 修改编码为 utf8mb4
>       ...
>     ), Typecho_Db::READ | Typecho_Db::WRITE);
>     Typecho_Db::set($db);


 通过操作以上步骤，就可以实现发文章可以带表情了。
  [1]: http://www.blogjava.net/wldandan/archive/2007/09/04/142669.html
