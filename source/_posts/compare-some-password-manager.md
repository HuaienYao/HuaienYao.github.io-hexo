---
title: 帮你记密码：几款密码管理器Keepass LastPass Bitwarden Enpass
tags:
  - 密码管理器
  - Keepass
  - LastPass
  - 1Password
  - Bitwarden
  - Enpass
  - 安全  
categories: 软件资源  
date: 2018-07-24  
urlname: compare-some-password-manager
keyword: 密码管理器,安全,软件,Keepass,1Password,Bitwarden,Enpass
description: 之前有听说过这类软件，比如1password，之前有在iOS的限免软件里面见到过，但是一直没有去了解。最近发现很多平台的密码给忘记了，而且找回密码需要用到绑定的手机来验证，但是有些网站绑定的手机号已经是国内高中，或者大学时期用得号码，想要找回非常麻烦，就比如之前所说的微博，还有特别要提的是百度的更改手机号的体验及其差，之后有时间会说到。这次想写写关于现在比较热门的几款密码管理器。
---

> 之前有听说过这类软件，比如1password，之前有在iOS的限免软件里面见到过，但是一直没有去了解。最近发现很多平台的密码给忘记了，而且找回密码需要用到绑定的手机来验证，但是有些网站绑定的手机号已经是国内高中，或者大学时期用得号码，想要找回非常麻烦，就比如之前所说的微博，还有特别要提的是百度的更改手机号的体验及其差，之后有时间会说到。这次想写写关于现在比较热门的几款密码管理器。

<!--more-->

## 关于密码管理器
在当今互联网时代，人们在上各种网站的时候需要注册账号，大部分人的做法就是用一个账号，同一个密码。但是每个网站对于用户注册的账号和密码有不同的要求。比如说账号，可能需要用邮箱作为账户名，也有可能是用户指定一个大于6位，不能使用大写或者符号，还有可能是网站在注册成功后给你分配一个用户名。再说密码，虽然在设置密码的时候会有安全提示。比如你输入的密码安全系数太低，建议你使用多种字符搭配的密码，而且对于密码的位数也有要求。这样你就不能用同一个账户同一个密码来注册使用各个网站的服务了，你的网龄越大，需要记住的密码越多。就像我之前整理了一下Chrome的密码管理器，里面居然有9接近1000条密码记录。这样时间一久你就会忘记了不常登录的网站的账号或者密码。虽然不常使用，但是当你需要用的时候却记不起来，找回密码需要时间而且麻烦。如果所有网站使用一个账号一个密码也会带来风险。不怀好意的人知道了你的一个密码就可能使用这个账号密码登录上你的其他网站。这样密码管理器就诞生了。

所谓密码管理器，就是你只需要记住一个密码来进入密码管理器或者密码数据库。所有网站都使用不一样的高强度密码，并和账号信息保存到密码管理器或者数据库里面。这样提高了安全系数，还帮你解决了记密码的难题。但是有人可能会说了，如果这个密码被人破解了那不就所有账号密码都被人知道了？其实这也是有道理的。但是普通用户的正常使用的情况下被破解的可能性很低的。这需要你把这一个账号的安全系数提高。你只需要设置一个密码，所以就尽量将其设置为高强度密码，如果记不住也可以写在本子上或者用其他编码加密后写到记事本或者哪里，当然别把账号和密码写在一起了。

> 还有人可能会说了，我的浏览器就有记住密码功能，那为什么还要用这个呢？

一个是浏览器自带的密码管理器功能比较简单，一般是提供记住账号密码，下次会自动输入。但是注册时候有些其他信息，需要你记下来的话，普通浏览器的密码管理器却不会帮你记下来。（这些信息可能用来将来申诉或者找回密码使用）另一个是浏览器的密码管理器也有风险，如果不能保证你的电脑是本人在使用的话，浏览器记住密码的网站可能会被他人登录。当然离开电脑前锁定账户是一个很好的习惯。

## 几款比较热门的密码管理器
这里列几个我最近研究的几个密码管理器。其实这也是和手机什么的一样，各有各的特点。你可以根据自己的情况来选择。1password由于大家都说是不差钱玩的，所以我就跳过了，虽然这款是评价最高的密码管理器。

### Keepass
Keepass是一款开源，免费，小巧的密码管理器。在查询的过程中，知道这是一款很受好评的密码管理器。Keepass提供的是很安全的加密方式来保存你的各种密码，用户名，或者可以备注。是通过kdbx后缀形式的数据库来保存，可以保存在本地硬盘，网盘，或者Webdav服务器是随时同步。  
#### 客户端
官方是提供了PC端的软件。不过由于是开源的，所以有很多人开发了各个平台的第三方应用。
比如
- 安卓：[Keepass2Android](https://play.google.com/store/apps/details?id=keepass2android.keepass2android&hl=zh)
- iOS：MiniKeePass，iKeePass，Passwordix 等
- Windows/Linux/MacOS: [KeepassXC](https://keepassxc.org/download/)
- 浏览器端的应用: [KeeWeb](https://app.keeweb.info/) 这个强烈推荐

Keepass还提供了Chrome浏览器的扩展插件[chromeIPass](https://keepass.info/plugins.html#chromeipass)，利用这个可以实现自动填充密码，记录新密码到数据库等操作。不过设置有点点麻烦，而且需要保持客户端运行。之后可以写一篇设置的教程。

至于手机端应用软件，个人觉得实用性一般，因为手机上也可以用Chrome浏览器自带的密码管理器帮你记住密码，自动填充这样更方便了。不用再安装一个软件来记录或者填充，而且安卓上我使用Keepass2Android好多次在载入数据库的时候闪退。所以个人前面强烈推荐KeeWeb来作为主力。因为你只需要一个浏览器，界面UI好看，手机端操作也适配的挺好，功能又强大。这里也预留一篇KeeWeb的应用教程。因为我的确花了很多时间在这上面。。。
#### Windows客户端界面
![KeepassWindows客户端界面](https://ws1.sinaimg.cn/large/007cmo4xgy1ftnle8m2wdj30i80dcdgd.jpg)
#### 支持其他平台数据导入
而且Keepass客户端也支持从其他各大密码管理器平台导入数据。例如Lastpass等密码管理器，CSV数据，Chrome浏览器数据等。我觉得这点也非常重要。因为我用了这么多年Chrome浏览器，导出后发现有近千条密码记录，所以这样一键导入就非常方便了。

![Keepass支持多平台数据导入](https://ws1.sinaimg.cn/large/007cmo4xgy1ftnlh5rw43j30i80dcjsl.jpg)

其实很多人选择Keepass是因为其绿色开源，在兼顾到平台兼容性突出并且用的比较放心。

### LastPass
与Keepass不同的是LastPass是不开源的。不过其支持Windows, Mac, Linux, iOS, Android, Windows Phone, 各大主流浏览器（IE, Chrome, FireFox, Opera, Safari），兼容性非常优秀，而且浏览器插件做的功能又强大又好看。

#### LastPass Chrome浏览器插件

![LastPass Chrome浏览器插件](https://ws1.sinaimg.cn/large/007cmo4xgy1ftnlxyrgldj30a40dpjrm.jpg)

可以看到功能还是很丰富的。支持的功能有站点的账户，密码记录，写安全笔记，表单的自动填写以及生成安全密码。

#### 注册界面可以方便生成密码

![注册界面可以方便生成密码](https://ws1.sinaimg.cn/large/007cmo4xgy1ftnm7dd0y8j30dm0cp0sy.jpg)

在网站的注册界面的密码输入栏右边有个按钮，可以一键生成密码，还可以指定密码的强度，并且LastPass可以帮你直接把密码输入到密码栏和密码确认栏。

#### LastPass官网
LastPass可以直接在官网直接管理。你只需要注册LastPass一个账号和高强度密码并记住它。而且LastPass也支持其他平台的数据导入。非常方便

#### 手机客户端很强大
和其他手机客户端相比较之下，LastPass可以很好的支持手机Chrome浏览器来自动填充，每次都能及时的弹出。我只试用了安卓客户端。
![手机客户端很强大](https://ws1.sinaimg.cn/large/007cmo4xgy1ftnoucczvqj30dw0afdhq.jpg)

#### 费用
LastPass在PC端是免费使用。移动端需要开通高级会员，定价为一个月2美元。一年24美元。
不过有时会搞特价活动。就像目前打折2.5折，一年只需要6美元。
![费用](https://ws1.sinaimg.cn/large/007cmo4xgy1ftnmo0lpxpj30lz0hh3z8.jpg)

LastPass是一款非常好用的密码管理器。如果你能接受付费，不在意密码托管于LastPass管理的话，或许这是一个非常不错的选择。

### Bitwarden
这一款是偶然在[小众软件](https://www.appinn.com/bitwarden/)上看到的。几乎支持所有的平台包括：Windows,Linux,MacOS的桌面平台，Chrome,Firefox,Safari,Opera等主流浏览器以及iOS,安卓平台的移动设备，和LastPass一样，它也有在线管理平台。
#### 全平台支持
![各大平台支持](https://ws1.sinaimg.cn/large/007cmo4xgy1ftnntbpeaij30r90qg0uq.jpg)

Bitwarden的Chrome浏览器插件也不错，和LastPass类似，但它是开源的。可能会有一部分人看到开源比较放心。
#### Chrome浏览器插件
![Chrome浏览器插](https://ws1.sinaimg.cn/large/007cmo4xgy1ftnnwm0i7sj30at0h2t8w.jpg)
#### 费用
价格方面，Bitwarden免费版完全够用，但是如果你有以下需求，或许可以试试高级会员版。相比之下很便宜了。
> 注册高级会员，获得：
>
> 1 GB 加密文件存储。
> YubiKey、FIDO U2F 和 Duo 作为两步验证登录选项。
> 为您的密码库登录采用 TOTP 验证码（两步验证）生成器。
> 优先客户支持。
> 未来所有高级功能。即将到来！
> 只需 $10 /每年！

只要每年10美金就可以升级成为高级版，这价格真的很有性价比。

### Enpass
#### 跨平台支持
Enpass是一款跨平台密码管理器，提供了以下平台的支持。
- iPhone+iPad
- Android
- Windows
- Mac OS X
- Windows PC
- Linux
- Portable
- Chromebook

![全平台支持](https://ws1.sinaimg.cn/large/007cmo4xgy1ftno3oyft7j30qr03dmx3.jpg)
在每个人有好几个设备的今天，跨平台就显得非常重要了。Enpass正好可以解决这一问题。

#### 设计风格
Enpass在界面设计上也是比较出色的。电脑客户端还是手机客户端，都非常好看。
![设计风格](https://ws1.sinaimg.cn/large/007cmo4xgy1ftnoa0o9hvj30oe0fs74t.jpg)
#### 数据管理方式
Enpass和Keepass的数据管理方式有点像，也是在第一次打开客户端的时候会让你选择或者新建一个数据库。这个数据库不用上传到Enpass官网，也是采用本地数据库管理或者自己上传到Onedrive，Google Drive，Dropbox等网盘或者自建Webdav服务器上。有些人还是比较放心自己保管数据库。

#### 费用
Enpass免费提供桌面客户端使用，手机端的话可以免费使用，但是只能显示20条密码记录，如果记录的数据多了，也可以考虑花钱升级。不过Enpass是在手机端直接内购升级，一次付费，永久使用，相比其他月付年付的付费方式，Enpass更适合长久使用的用户。

Enpass的功能还是很全面的。跨平台，并且自己管理数据库（有好有坏），一次付费永久使用。据说这款还是很类似于1Password。

## 总结

本人最终还是选择了Keepass。理由是：
- 开源，安全
- 免费
- 全平台支持
- 配合其他第三方应用足够使用

其实还是看到KeeWeb觉得很方便，所以选择了Keepass。

但是也有想过结合LastPass的桌面客户端，手机端就用KeeWeb来同步数据。但是由于LastPass是不是自己保存数据库，虽然可以导出，但是每次修改导出还是比较麻烦。不过好在密码也不会经常变换，所以这种方式也是可行的。因为感觉LastPass的桌面客户端真的太好用了。相比较之下Keepass就比较一般了。可以一段时间导出一次LastPass的数据，用来备份和同步到手机客户端。

最终方案是Keepass+Lastpass桌面端+KeeWeb浏览器端搭配使用。
