---
title: WordPress插件ShadowBoxJS幻灯片
id: 31
date: 2010-08-04 18:14:04
tags:
- WordPress
- 插件
- ShadowBox
- Javascript
- 博客程序
categories: 技术记录
urlname: shadowbox-wordpress-plugin
keywords: WordPress,插件,shadowbox,JavaScript,博客程序
description: 本文记录了如何用Shadowbox插件来给WordPress增加幻灯片功能。
---

wordpress之所以强大就是因为它有很多插件做后盾，多彩丰富的博客都是我们所希望的，幻灯片插件那么就是必不可少的了，Shadowbox JS就一款不错的幻灯片插件，除了一般的图片效果外，它还支持图片的裁剪、拖动、多媒体播放等功能。

动态的载入视频，播放SWF、FLV更是轻而易举的事情，与LightBox相比，有过之而无不及，效果非常的棒，而且，它还支持多国语言，支持中文也真是十分的难得啊。

Shadowbox JS安装使用：
1.下载Shadowbox JS插件，解压后，上传到plugin目录；
2\. 登录wordpress后台控制面板激活该插件，激活插件后，点击Settings选项，在里面找到Shadowbox JS选项，出现如下图界面

页面中有很多的选项，你可以更加自己的需求进行选择、设置，其实这些也都不需要什么设置，默认不动也是可以的，最主要的是，添加相关的代码：
在你需要添加幻灯片效果的图片上添加，如下代码：
单张图片：

`【a rel="shadowbox" href="images/01.jpg"】
【img src="images01.jpg" border="0" alt="" width="200" height="150" /】【/a】`

或者

多张图片：

`【a rel="shadowbox[group]" href="images/01.jpg"】【img src="images01.jpg" border="0" alt="" width="200" height="150" /】【/a】`

将代码中的【】 替换成`&lt;&gt;`

除此之外，你还可以添加Flash、视频等功能，具体的你可以参见作者[官方的介绍](http://sivel.net/wordpress/shadowbox-js/)，这里就做过多的介绍了。

shadowbox JS 版本 3.0.3.2  可以支持直接插入图片， 比如你在编辑文章的时候上传或者插入图片，就可以直接显示效果了，
同样适用于 FLASH 等其他多媒体， 比如SWF格式

【a href='http://player.youku.com/player.php/sid/XMTE1NDA0Mzg4/v.swf' 】点击这里观看视频【/a】

将代码中的【】 替换成`&lt;&gt;`

所以说 只要链接是指向于 JPG SWF  等等多媒体时 就行了。

附带网上找的其他资料

> Shadowbox.js是一个基于网络浏览器的应用程序，支持网络上最流行的媒体格式。使用Shadowbox访问各式各样的媒体时，用户可以直接在所有主流的浏览器中浏览，而且不用去打开一个新的媒体页。
>
> 这里说媒体主要包括：图片，SWF，QuickTime，Video和一些网络Video等等。
>
>
> Shadowbox使用Javascript和CSS编写，可以定制当前非常流行的各种JS库，比如说：
>
> * jQuery
>
> * Prototype
>
> * MooTools (requires 1.2 Core)
>
> * Dojo Toolkit
>
> * Yahoo! User Interface Library (requires yahoo-dom-event.js)
>
> * Ext (requires ext-core.js)
>
> 所以大家还是非常值得一试的，下面是它的官方网站和下载地址，下载的时候可以选择你所使用JS库文件和你所希望播放的媒体：
>
> 官方地址：http://www.shadowbox-js.com/index.html
>
> 下载地址：http://www.shadowbox-js.com/download.html
>
>
> 下面给给大家介绍一下这个应用的具体用法，最简单的办法就是在你建立应用的页面头部加入下载的JS文件和CSS文件，然后调用Shadowbox.init：
>
>
> <link rel=”stylesheet” type=”text/css” href=”shadowbox.css”>
>
> <script type=”text/javascript” src=”shadowbox.js”></script>
>
> <script type=”text/javascript”>
>
> Shadowbox.init();
>
> </script>
>
>
> 当然在头部还需要把你使用JS库加到前面。还有一个比较复杂的方法，就是在调用Shadowbox.init的时候，使用对象来指定一些选项，这样可以实现一些复杂的效果。
>
>
> <link rel=”stylesheet” type=”text/css” href=”shadowbox.css”>
>
> <script type=”text/javascript” src=”shadowbox.js”></script>
>
> <script type=”text/javascript”>
>
> Shadowbox.init({
>
>         handleOversize: “drag”,
>
>         modal: true
>
>     });
>
> </script>
>
>
> 关于Shadowbox的复杂用法我会在下一篇文章里详细介绍。当我们加入所需要的JS库和CSS文件以后，就要告诉shadowbox对哪些链接执行这些操作了。要执行这个操作有两种方法，一个是在链接的标签里添加属性，还有一个方法是用Javascript对Shadowbox进行设置。
>
>
> 在这篇文章主要介绍在链接的标签里添加属性，只要在链接里增加一个属性rel=”shadowbox”就可以了。假设你页面里有一个这样的链接：
>
>
> [My Image](”myimage.jpg”)
>
>
> 要建立shadowbox的效果之需要修改成这样即可：
>
>
> [My Image](”myimage.jpg” rel=”shadowbox”)
>
>
> 这时当你点击它的时候，就会在本页面打开一个弹出层来显示href里的图片。这种方法对于页面展示小图，点击以后展示大图有着很好的用户体验。这种效果就和lightbox展示的效果一样。（如果大家对lightbox不熟悉的话，我会在以后的文章中详细介绍它的主要用法）
>
>
> 如果你想显示图片标题，只需在链接属性里添加一个title。
>
>
> [My Image](”myimage.jpg” rel=”shadowbox” title=”My Image” "”My Image”")
>
>
> 如果你想给弹出来的媒体设定长与宽的话，只要在rel属性中添加width和height就可以，用”;”号隔开，默认是以Pixel为单位，
>
>
> [My Movie](”mymovie.swf” rel=”shadowbox;height=140;width=120″)
>
>
> 除了显示单张图片和电影以外，还可以显示画廊效果，如果想显示这一效果之需要在rel的shadowbox后面紧跟着一个用中括号括起来的画廊名字，这个名字是随便起的，不过需要注意的是，画廊名字相同的图片是在一个画廊里，下面以画廊名为“Vacation”的两个图片做为例子：
>
>
> [The Beach](”beach.jpg” rel=”shadowbox[Vacation]“)
>
> [The Pier](”pier.jpg” rel=”shadowbox[Vacation]“)
>
>
> 画廊可能由许多不同类型的内容。下面的标记显示不同的媒介，如何能成为一个单一的库相结合。
>
>
> [jpg](”myimage.jpg”)
>
> [swf](”myswf.swf”)
>
> [movie](”mymovie.mp4″)
>
> [iframe](”mywebsite.html”)
>
>
> 这篇文章先介绍这么多，熟悉这些用法，就可以在自己的页面里添加Shadowbox的效果了。在后面的文章里我会继续介绍Shadowbox的其他一些用法。

<blockquote>
