---
title: 给托管在Coding Pages上的博客开启HTTPS支持 申请失败的原因
tags: [Coding Pages,HTTPS,后端技术,SSL]
date: 2018-08-06 13:33:08
categories: 技术记录
urlname: enable-https-on-coding-pages
keywords: Coding Pages,HTTPS,后端技术,SSL
description: 如果你使用的是DNSPOD来智能解析博客到GitHub Pages和Coding Pages的话，在开启HTTPS的时候就要注意了。域名解析的时候需要解析对地址，才能成功申请到SSL证书
---

## 背景
前两天将[博客同时托管到GitHub Pages和Coding Pages，并备份到这两个平台](http://blog.huaien.me/article/blogengine/how-to-backup-hexo-to-github/)。
然后发现Coding Pages也是可以支持绑定域名和支持自定义域名的HTTPS。所以就顺便点击了申请证书，但是好几次都出现失败。之后研究了一下，才知道原因。
## 原因
不过需要注意的是，如果你同时使用GitHub Pages和Coding Pages来托管博客，用智能DNS解析的时候是将国内线路解析到Coding Pages，国外线路解析到GitHub Pages的话，在绑定域名的时候没什么问题，因为Coding是国内服务商，但是在开通HTTPS时候会出现申请失败的提示。

这是由于
> 申请 SSL/TLS 证书需要通过 Let's Encrypt 的 HTTP 方式验证域名所有权。如果您的域名在境外无法访问 Coding Pages 的服务器，将导致 SSL/TLS 证书申请失败。

## 解决
因此在申请Coding Pages的HTTPS之前需要将DNS解析的GitHub部分暂停或者删除，等生效后再申请。这样就会通过了。

成功后会显示状态为正常，并且可以开启强制HTTPS访问。
![image](https://i.loli.net/2018/08/02/5b626c4079b0c.png)

最后在上方会显示Coding Pages 已经运行在https://huaien.me

是加了https的链接
![image](https://i.loli.net/2018/08/02/5b626c4067d8b.png)

并且可以选择将不带www的域名设置为首选，或者反之。
![image](https://i.loli.net/2018/08/02/5b626c405933a.png)

## 结语

其实Coding Pages比较早就官方支持了Let's Encrypt 免费SSL证书和HTTPS。我是因为GitHub Pages屏蔽了百度蜘蛛，所以为了让百度可以正常收录，所以将博客也托管到了Coding Pages。但是在开通HTTPS的时候一直申请失败，才知道是解析问题。所以就做个记录。