---
title: 如何修改h5ai右上角的版权信息powered by h5ai
tags:
  - PHP
  - 文件目录程序
  - h5ai
  - 源码程序
  - Linux
  - 命令
  - 前端技术
categories: 技术记录
date: 2018-07-29
urlname: modify-h5ai-copyright
keyword: h5ai,文件目录程序,版权,代码,PHP
description: h5ai,一款德国人开发的强大的PHP文件目录程序，由于其代码的复杂性，在修改的时候遇到很多麻烦，比如今天要说的如何修改h5ai右上角的版权信息powered by h5ai。

---
## 关于h5ai

前面我们说到了h5ai这款德国开发者开发的强大的PHP文件目录程序。在折腾这款程序的时候有一些地方一直搞不明白。比如今天要说的如何修改右上角版权信息Powered by h5ai。
<!--more-->
## 代码很复杂
前面的文章我们介绍了h5ai的时候写了如何安装，但是安装后在自己折腾的过程中，感觉代码结构比较复杂，想试着修改右上角版权信息，却发现只是修改`_h5ai/private/php/pages/`目录的index.php或者info.php里面的
```html
<span class="backlink">版权</span>
```
也是没有变化的。

找了一个晚上把除了js脚本的源码都看了一遍，还是没找到办法。
## 解决过程
### grep命令
第二天，昆哥来家里，就把这问题问了他。找了一圈也没找到，后来不甘心，他想到用Linux的grep命令。

> Linux系统中grep命令是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹 配的行打印出来。grep全称是Global Regular Expression Print，表示全局正则表达式版本，它的使用权限是所有用户。
  来源：[每天一个linux命令（39）：grep 命令](http://www.cnblogs.com/peida/archive/2012/12/17/2821195.html)

### 确认字符
所以我们要先找到需要找的字符。这里利用到Chrome浏览器的开发者工具，按F12或者在右上角的三个点 ++菜单-更多工具-开发者工具++来进入开发者工具。

然后再Ctrl+Shift+C来选定元素，如下图所示。
![](https://ws1.sinaimg.cn/large/007cmo4xgy1ftqspi6j1dj30on07qwet.jpg)

鼠标移动到h5ai的右上角版权信息位置。右边的元素会定位到该元素代码块。

由此我们可以知道是我们需要找的是

```html
<a id="backlink" href="https://larsjung.de/h5ai/" title="powered by h5ai - https://larsjung.de/h5ai/">
                <div>powered</div>
                <div>by h5ai</div>
            </a>
```

试着用backlink去找了一下。出来的结果有包括css在内的一堆文件，这样就不找了。于是昆哥用了larsjung来查找，可以查得到，结果少了很多。

这里我利用linux下的grep命令来查找定位含有`https://larsjung.de/h5ai/`的文件。
毕竟这个网址也是比较特别的。
### Linux下定位
因为不知道Windows下不知道怎么查找，于是直接进了Linux服务器来操作。

进入到服务器的网站根目录的 _h5ai目录,比如你的网站根目录在 www/wwwroot/ 的情况下

```shell
root@hostname:/# cd www/wwwroot/_h5ai

```
用grep搜索
```shell
root@woo://www/wwwroot/_h5ai# grep -rn "https://larsjung.de/h5ai/" *
private/conf/options.json:1:/* h5ai v0.29.0 - https://larsjung.de/h5ai/ */
private/conf/types.json:1:/* h5ai v0.29.0 - https://larsjung.de/h5ai/ */
public/css/styles.css:1:/* h5ai v0.29.0 - https://larsjung.de/h5ai/ */
public/js/scripts.js:1:/* h5ai v0.29.0 - https://larsjung.de/h5ai/ */ ! function(t) {
public/js/scripts.js:804:		a = '<div id="topbar">\n            <div id="toolbar"></div>\n            <div id="flowbar"></div>\n      <a id="backlink" href="https://larsjung.de/h5ai/" title="powered by h5ai - https://larsjung.de/h5ai/">\n                <div>powered</div>\n                <div>by h5ai</div>\n            </a>\n     </div>',

```
相关grep参数
-  `*` 表示当前目录所有文件，也可以是某个文件名
- -r 是递归查找
- -n 是显示行号
- -R 查找所有文件包含子目录
- -i 忽略大小写

通过定位可以知道应该是用了js脚本来显示。
### 修改代码
所以在`_h5ai/public/js/scripts.js`的文件里面搜索前面用Chrome开发者工具获得的`backlink`或者`powered by h5ai`

就会定位到下面的代码：

```html
<a id="backlink" href="https://larsjung.de/h5ai/" title="powered by h5ai - https://larsjung.de/h5ai/">\n                <div>powered</div>\n                <div>by h5ai</div>\n            </a>\n   
```
这里就是显示在h5ai的右上角版权信息。

直接修改服务器上的文件有风险，建议将此文件备份后再执行修改操作。
### PS
**这里只是研究一下这个h5ai的代码。尊重作者版权，不建议删除或者修改。**

只是想说真的h5ai里面内容真的很复杂，相比之下Directory Lister就简单多了。


## 参考资料
- [昆哥的博客](http://www.do1024.com/)
- [Linux查找含有某字符串的所有文件](http://blog.51cto.com/151wqooo/1162118)
- [每天一个linux命令（39）：grep 命令](http://www.cnblogs.com/peida/archive/2012/12/17/2821195.html)
