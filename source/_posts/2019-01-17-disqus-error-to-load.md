---
title: Disqus提示无法加载的解决办法
tags: [Disqus]
date: 2018-11-25 15:01:37
categories: 技术记录
urlname: disqus-error-to-load
keywords: Disqus,无法加载
description: 前两天搭了一个新的Hexo博客，使用的是Disqus评论系统，但是在设置上出现问题，导致一直无法加载，在查询了一番，才解决了这个问题，本文记录了Disqus提示无法加载。如果您是管理员，请参阅故障排除指南。的解决办法。
---

![image](https://ae01.alicdn.com/kf/HTB1c6O0X6vuK1Rjy0Faq6x2aVXaB.jpg)

### 错误提示：

Disqus 无法加载。如果您是管理员，请参阅故障排除指南。

We were unable to load Disqus. If you are a moderator please see our troubleshooting guide.

### 解决方法：

在hexo中的根目录下的_config.yml文件中，这段代码：

```
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://www.nihoncard.com
root: /
permalink: :category/:title.html
permalink_defaults:
```
url: 处需要设置为带http的完整的链接。我原来写的是`/`就会出现以上错误。改了之后就好了。

### 参考：
https://www.jianshu.com/p/edcc22f6cf33
