---
title: 代码高亮插件SyntaxHighlighter Evolved
id: 118
date: 2010-11-23 16:30:57
tags:
- 代码高亮
- WordPress
- 插件
- 博客程序
categories: 技术记录
urlname: code-highlighter-wordpress-plugin
keywords: 代码高亮,WordPress,插件,博客程序
description: 本文记录了如何使用插件给WordPress开启代码高亮。
---

使用方法：

1.上传插件到 wp-contents/plugins 文件夹并在博客后台启用——————废话啊。。。。

2.在写文章时，在html模式下 使用这样的代码：

[php]/* Comment Image Embedder */
function embed_images($content) {
  $content = preg_replace('/\[img=?\]*(.*?)(\[\/img)?\]/e', '&amp;quot;&amp;lt;img src=\&amp;quot;$1\&amp;quot; alt=\&amp;quot;&amp;quot; . basename(&amp;quot;$1&amp;quot;) . &amp;quot;\&amp;quot; /&amp;gt;&amp;quot;', $content);
  return $content;
}
add_filter('comment_text', 'embed_images');
// -- END ----------------------------------------[/php]

其中php是指代码的类型，具体类型如下表：

C++ —   cpp, c, c++
C# —   c#, c-sharp, csharp
CSS —   css
Delphi —   delphi, pascal
Java —   java
JavaScript —   js, jscript, javascript
PHP —   php
Python —   py, python
Ruby —   rb, ruby, rails, ror
SQL —   sql
VB —   vb, vb.net
XML/HTML —   xml, html, xhtml, xslt
