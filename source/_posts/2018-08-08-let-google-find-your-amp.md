---
title: 正确使用AMP 让Google找到你的AMP页面
tags: [AMP,网页制作,SEO]
date: 2018-08-08 10:33:08
categories: 技术记录
urlname: let-google-find-your-amp
keywords: Google,AMP,SEO,网页制作
description: 本文介绍了如何在网页插入相关代码来使Google找到并收录你的AMP网页。
---
## 背景
在用Hexo的[hexo-generator-amp](https://github.com/tea3/hexo-generator-amp)插件后，发现并没有被收录AMP页面。
查看了下官方文档，如果要让你的AMP页面被找到，需要在head加入link。
<!--MORE-->
## 如何让 Google 发现我的 AMP 网页？
如果有其他网页链接到或引荐 AMP 网页，Google 会将这些 AMP 网页编入索引。

 

如果您的网页既有 AMP 版本，又有非 AMP 版本，请包含以下链接：

### 非AMP网页
在任意非 AMP 网页上，引荐相应网页的 AMP 版本，让 Google 和其他平台知道相应网页存在 AMP 版本：

```
<link rel="amphtml" href="https://www.example.com/url/to/amp-version.html" />
```
### AMP网页
在 AMP 网页上，添加以下文本，以便引荐相应的非 AMP 规范版本：

```
<link rel="canonical" href="https://www.example.com/url/to/regular-html-version.html" />
```

### 独立的AMP网页
对于独立的 AMP 网页（即不存在非 AMP 版本），请将 AMP 网页本身指定为规范版本：


```
<link rel="canonical" href="https://www.example.com/url/to/amp-document.html" />
```

Google 在发现独立的 AMP 网页后，也会将其编入索引。因此，对于独立的 AMP 网页，请务必确保能够通过其他已编入索引的网页链接到它们，或将它们列入站点地图。

最后，请务必仔细检查以确保您未在 AMP 网页的 robots.txt 文件中阻止 Google！

虽然Hexo的amp生成插件有一段代码需要加入head里面。
例如本站用的Next主题，需要在https://github.com/iissnan/hexo-theme-next/blob/master/layout/_partials/head.swig里面加入

```
{% if is_post() && config.generator_amp %}
  <link rel="amphtml" href="./amp/index.html">
{% endif %}
```
但是生成页面后查看页面源码，却没有在正常页面里面发现上面这个amp的指向码，所以觉得应该是判断的语句有问题，索性就直接删除了判断语句，直接用中间那一句就好。也就是

```
<link rel="amphtml" href="./amp/index.html">
```

再次生成后就发现页面里面有该代码了。

而且在AMP的测试网站测试正常页面的时候也会提示
> 链接到在提交的网址上检测到的 AMP 网址
您可能输入的是权威网页的网址。该网页链接到以下 AMP 网址：

![AMP的测试网站](https://i.loli.net/2018/08/08/5b6a55a0a87b3.png)


## 如何检查 Google 是否发现了我的 AMP 网页？
我们在 Search Console 中提供了 [AMP 搜索结果外观报告](https://support.google.com/webmasters/answer/6328309)，以帮助您了解 Google 发现了哪些 AMP 网页。在 Search Console 中依次点击“搜索结果外观”>“Accelerated Mobile Pages”即可找到此类报告。

 

搜索结果外观报告可帮助您快速找出未编入索引的 AMP 网页存在的最常见的问题，以便您在网站上实现 AMP 网页的过程中系统性地解决这些问题。您可能只需对模板进行细微调整，或者为内容管理系统 (CMS) 安装兼容的插件，便能解决相关问题。

 

请注意，如果您最近才创建了有效的 AMP 网页，那么这些网页可能要过几天才会显示在搜索结果外观报告中。

 

## 如何检查我的 AMP 网页是否可以显示在 Google 搜索中？
只有有效的 AMP 网页才可显示在 Google 搜索中。因此，请使用 [AMP HTML 网页验证工具](https://validator.ampproject.org/)、[Chrome 扩展程序](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)或通过更加自动化的流程（例如 cron 作业）来检查您的 AMP 网页是否有效，从而确保所有新内容均有效。

 

虽然总体来讲在您的 AMP 网页中添加结构化数据是不错的做法（我们建议使用 JSON-LD），但这对新闻发布商来说尤其重要，因为包含[相应标记属性](https://developers.google.com/structured-data/rich-snippets/articles)的新闻内容可能会显示在 Google 搜索结果的“焦点新闻”链接版块（包括“焦点新闻”轮换展示部分）中。使用 [Google 结构化数据测试工具](https://developers.google.com/structured-data/testing-tool)测试结构化数据的操作步骤很简单。
更多请参考：

https://www.ampproject.org/docs/fundamentals/discovery

https://productforums.google.com/forum/?hl=zh-hant#!topic/webmaster-zh-cn/1uPZAhxpReg