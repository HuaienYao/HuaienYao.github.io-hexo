---
title: 修改Directory Lister的字体为小夜美化版并将字体本地化
tags:
  - Directory Lister
  - 文件目录列表程序
  - PHP
  - 源码程序
  - CSS
  - HTML
categories: 技术记录  
date: 2018-07-30
urlname: make-directory-lister-more-beautiful
keyword: Directory Lister,文件目录列表程序,PHP,字体,开源,源码,代码,CSS,HTML
description: 本文记录了如何把PHP文件目录列表程序Directory Lister的字体美化为小夜版本，并将字体本地化调用。
---

# 背景
前一段时间，在[Rat's Blog](https://www.moerats.com/archives/547/)上看到了小夜大佬Directory Lister美化修改版，但是发现网上下载下来的美化版都和小夜大佬的字体不一样。

自己安装好后是这样的

![image](https://i.loli.net/2018/07/30/5b5ebdd807858.png)

但是VPSMM的是这样的：

![image](https://i.loli.net/2018/07/30/5b5ebe0fa27f2.png)

明显小夜大佬的下载站好看多了。是经过优化的字体。

那要如何修改呢。之前试着直接导入小夜大佬下载站的样式表， 但是还是没变化。今天重新试了一下，原来是缺少了Source code pro字体库。

这样的话我们需要将这个字体库加到自己的样式表并调用它。

# 修改过程
## 对比样式表
将[小夜大佬的样式表](https://down.vpsmm.com/resources/themes/vpsmm/css/style.css)和自己的样式表对比一下后发现。自己的样式表有多处用到不同的`font-family`。

打开css样式表，搜索`font-family`，发现小夜的样式表里面只有两处`font-family`。

一处是第5行开始的body样式：

```css
body {
    padding: 70px 0 0;
    font-size: 16px;
    font-family: 'Source Code Pro',Lato,Helvetica,Arial,sans-serif;
}
```
另一处是第105行的`file-info .sha1-hash`样式

```css
#file-info .sha1-hash {
    font-family: 'Cutive Mono', monospace, serif;
}
```

但是实际上控制全局的字体样式只有body那个。

另一方面搜索我从网上下载到的小夜优化版本的CSS样式表。一共找到四处。

分别是23行，43行，49行，107行的样式表。

```css
#page-navbar .navbar-text {
    display: block;
    float: left;
    font-family: 'Cutive Mono', monospace, serif;
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

```
```css
#directory-list-header {
    font-family: 'Cutive Mono', monospace, serif;
    font-weight: bold;
    padding: 10px 15px;
}
```
```css
#directory-listing {
    font-family: 'Cutive Mono', monospace, serif;
}
```
```css
#file-info .sha1-hash {
    font-family: 'Cutive Mono', monospace, serif;
}
```

所以这个版本的样式表在每个地方都定义了字体唯独body没有，而小夜优化版的样式表在body直接定义了。

## 修改样式表

知道了样式表的区别后，就对样式表进行修改。

先在body样式里面插入`Source Code Pro`字体。

```css
body {
    padding: 70px 0 0;
    font-size: 16px;   
    font-family: 'Source Code Pro',Lato,Helvetica,Arial,sans-serif;
}
```

接着将其他地方的`font-family`注释或者删除。比如：23行，43行，49行的样式里面的`font-family`那一行，这些地方影响到`Source Code Pro`字体的生效。
css的注释方法是前后添加
```css
/* 要注释的代码 */
```

## 加入`Source Code Pro`字体

小夜的是直接调用网上的字体库

```html
<link href="//fonts.loli.net/css?family=Source+Code+Pro" rel="stylesheet">
```
你也可以这样，直接将这个代码加入到主题下面的主页文件`index.php`，比如我用的版本是`/resources/themes/vpsmm/index.php`，但是如果怕以后字体库失效的话可以把这个字体本地化（下载到自己的服务器）。

## 字体本地化

打开Source Code Pro的[样式表](https://fonts.loli.net/css?family=Source+Code+Pro)
可以看到样式表内容


```css
/* latin-ext */
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 400;
  src: local('Source Code Pro'), local('SourceCodePro-Regular'), url(https://gstatic.loli.net/s/sourcecodepro/v7/HI_SiYsKILxRpg3hIP6sJ7fM7PqlM-vWjMY.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 400;
  src: local('Source Code Pro'), local('SourceCodePro-Regular'), url(https://gstatic.loli.net/s/sourcecodepro/v7/HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevW.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

其中有两个字体，我们可以将其下载下来。
- https://gstatic.loli.net/s/sourcecodepro/v7/HI_SiYsKILxRpg3hIP6sJ7fM7PqlM-vWjMY.woff2
- https://gstatic.loli.net/s/sourcecodepro/v7/HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevW.woff2

这样会得到这两个字体

- HI_SiYsKILxRpg3hIP6sJ7fM7PqlM-vWjMY.woff2
- HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevW.woff2
字体的名字如果觉得太长要改成自己喜欢的名字也可以。这次我选择不修改。

将这两个字体文件传到服务器上。位置可以自己定。这次我是传到了/resources/themes/vpsmm/Source_Code_Pro里面，Source_Code_Pro是自己新建的文件夹。

这样我们可以通过调用这两个本地的字体来实现字体的样式。

在/resources/themes/vpsmm/css下面新建一个样式表命名为
`Source_Code_Pro.css`

内容为

```css
/* latin-ext */
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 400;
  src: local('Source Code Pro'), local('SourceCodePro-Regular'), url(/resources/themes/vpsmm/Source_Code_Pro/HI_SiYsKILxRpg3hIP6sJ7fM7PqlM-vWjMY.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 400;
  src: local('Source Code Pro'), local('SourceCodePro-Regular'), url(/resources/themes/vpsmm/Source_Code_Pro/HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevW.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

其中url部分是刚刚上传的字体的路径，如果不一样请修改。

最后在主题下面的主页文件`index.php`（我的版本是在`/resources/themes/vpsmm/index.php`）里面的`<head>`标签内调用我们刚刚新建的包含这两个字体文件的样式表`Source_Code_Pro.css`，其实就是将前面的  **加入`Source Code Pro`字体**那个步骤里面的路径改为自己的本地样式表，而不是调用loli字体库的样式表。
`<head>`标签内的`<!-- STYLES -->`的最后加入

```html
<link href="/resources/themes/vpsmm/css/Source_Code_Pro.css" rel="stylesheet">
```

这样就完成了。

# 对比

最后对比一下刚开始的截图

![和小夜字体优化版一样的字体](https://i.loli.net/2018/07/30/5b5ec86798850.png)对比


是不是好看了许多。

# 感谢

- [小夜大佬的下载站](https://down.vpsmm.com/)
- [Rats提供的Directory Lister 美化修改版源码](https://www.moerats.com/archives/547/)
