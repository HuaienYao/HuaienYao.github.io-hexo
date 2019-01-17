---
title: 利用Caddy来搭建网站之Caddy配置文件教程
tags:
  - Caddy
  - Linux
  - Web服务器
  - 后端技术
categories : 技术记录
date: 2018-07-19
draft: false
urlname: use-caddy-to-run-site
keywords: Caddy,Linux,Web服务器,后端技术
description: 除了Nginx,Apache,大家可能没有了解过Caddy，这是一个Go语言开发的HTTP服务器，可以用它来简单快速的配置支持SSL证书的网站。
---

前面我们了解了[Caddy是一个极简HTTP服务器](https://huaien.me/article/backend/caddy-a-light-http-server/)，可以用来快速配置网站。并且支持HTTPS，支持自己的SSL证书或者只需要一个邮箱，Caddy帮你自动生成Let's Encrypt的免费证书，简单的配置就能搭建好一个HTTPS的Web服务器环境。
<!--more-->

### 安装Caddy

这里是复习一下前面的内容。
```
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/caddy_install.sh && chmod +x caddy_install.sh && bash caddy_install.sh install http.filemanager

# 如果上面这个脚本无法下载，尝试使用备用下载：

wget -N --no-check-c# 如果上面这个脚本无法下载，尝试使用备用下载：
ertificate https://softs.loan/Bash/caddy_install.sh && chmod +x caddy_install.sh && bash caddy_install.sh install http.filemanager
```

安装完成
![image](https://i.loli.net/2018/07/19/5b4fe31ad8663.png)

### 使用方法
以下使用方法仅适用于本一键安装脚本安装的Caddy。  
其他方式安装的Caddy需要其他的操作指令。


```
启动：/etc/init.d/caddy start

停止：/etc/init.d/caddy stop

重启：/etc/init.d/caddy restart

查看状态：/etc/init.d/caddy status

查看Caddy启动日志： tail -f /tmp/caddy.log

安装目录：/usr/local/caddy

Caddy配置文件位置：/usr/local/caddy/Caddyfile

Caddy自动申请SSL证书位置：/.caddy/acme/acme-v01.api.letsencrypt.org/sites/xxx.xxx(域名)/
```
根据上面我们可以知道Caddy配置文件位置：/usr/local/caddy/Caddyfile

这个文件就是我们用来添加网站，配置SSL等操作的重要文件。

### 配置虚拟主机、添加网站

#### 修改方法
这里可以通过两种方式来修改

Caddy配置文件 /usr/local/caddy/Caddyfile

一种是直接
```
vi /usr/local/caddy/Caddyfile
```
另一种是直接用echo来添加内容到指定文件。

例如

```
#清空覆盖源文件内容替换为新内容
echo "配置内容" > /usr/local/caddy/Caddyfile
```
```
#在源文件内容最后追加新内容
echo "配置内容" >> /usr/local/caddy/Caddyfile
```
#### Caddyfile 的格式

Caddfile的格式还是比较简单的，首先第一行必须是网站的地址，例如：

```
#ip端口
localhost:8080
#域名
huaien.me
```
> 地址可以带一个端口号，那么 caddy 只会在这个端口上开启 http 服务，而不会开启 https，如果不写端口号的话，caddy 会默认绑定 80 和 443 端口，同时启动 http 和 https 服务。
>
> 地址后面可以再跟一大堆指令（directive）。Caddyfile 的基本格式就是这样，由一个网站地址和指令组成，是不是很简单。


#### 单网站写法

```
example.com
root /usr/local/caddy/www
#其他指令
```

#### 多网站写法
网站后面用{}花括号包起来

```
example.com1 {
  gzip
  root /usr/local/caddy/www
  #其他指令
}
example.com2 {
  gzip
  root /usr/local/caddy/www
  #其他指令
}
```

#### 一些常见的指令

```
#网站根目录
root /usr/local/caddy/www/example.com

#log日志
log /usr/local/caddy/www/example.log

#目录访问
browse

#gzip压缩
gzip

#自主ssl证书
tls /path/ssl/example.com.crt /path/ssl/example.com.key

#caddy帮你申请Let's Encrypt证书并续约
tls 邮箱地址

#访问口令认证（用户emiria，密码password）
basicauth / admin password

#跳转功能
redir http://example.com{url}

#自定义错误页面
errors {
    404 404.html
    500 /usr/local/caddy/www/500.html
}

#使用了 fastcgi 指令，代表把请求通过 fastcgi 传给 php，ruby 等后端程序
fastcgi / 127.0.0.1:9000 php {
    index index.php

#header 指令代表为所有的 /api/xxx 的请求加上 Access-Control-Allow-Origin 和 Access-Control-Allow-Methods 这两个 header，从而能支持 javascript 跨域访问 ，第 9 行代表删除 Server header，防止别人看到服务器类型
header /api {
    Access-Control-Allow-Origin  *
    Access-Control-Allow-Methods "GET, POST, OPTIONS"
    -Server
}

#rewrite 指令，这个指令的作用是 服务器内部重定向 在下面的参数 to 后面，又跟了三个参数，这个功能上有点类似 nginx 的 try_files 。
rewrite {
    to {path} {path}/ /index.php?{query}
}
```

更多配置参考：https://caddyserver.com/tutorial/caddyfile  
设置文档参考：https://caddyserver.com/docs

#### 多网站配置例子
##### vi模式修改Caddy配置文件

```
vi /usr/local/caddy/Caddyfile
```
进入vi界面后按i键进入insert模式

填入以下*(花括号与域名之间需要半角空格)

```
#第一个网站
huaien.me {
 #指定根目录
 root /usr/local/caddy/www/huaien.me
 #开启gzip压缩
 gzip
 #开启https,使用免费证书自签
 tls 邮箱
 #如果有自己的证书，可以指定证书路径
 #tls /path/ssl/example.com.crt /path/ssl/example.com.key
 #开启log记录
 log /usr/local/caddy/www/huaien.me/example.log
}
#第二个网站
huaien2.me {
 #指定根目录
 root /usr/local/caddy/www/huaien2.me
 #开启gzip压缩
 gzip
 #开启https,使用免费证书自签
 tls 邮箱
 #如果有自己的证书，可以指定证书路径
 #tls /path/ssl/example.com.crt /path/ssl/example.com.key
 #开启log记录
 log /usr/local/caddy/www/huaien2.me/example.log
}
```
修改完后，按左上角esc键退出insert模式，再按半角冒号
```
:wq
```

保存修改并退出。

每次修改Caddyfile文件都需要重启Caddy使其生效

```
/etc/init.d/caddy restart
```
##### 直接追加内容至Caddy配置文件

以下一串是整体代码，需要复制全部内容*（不是一句一句复制粘贴）

```
echo "huaien.me {
 #指定根目录
 root /usr/local/caddy/www/huaien.me
 #开启gzip压缩
 gzip
 #开启https,使用免费证书自签
 tls 邮箱
 #如果有自己的证书，可以指定证书路径
 #tls /path/ssl/example.com.crt /path/ssl/example.com.key
 #开启log记录
 log /usr/local/caddy/www/huaien.me/example.log
}
#第二个网站
huaien2.me {
 #指定根目录
 root /usr/local/caddy/www/huaien2.me
 #开启gzip压缩
 gzip
 #开启https,使用免费证书自签
 tls 邮箱
 #如果有自己的证书，可以指定证书路径
 #tls /path/ssl/example.com.crt /path/ssl/example.com.key
 #开启log记录
 log /usr/local/caddy/www/huaien2.me/example.log
}" > /usr/local/caddy/Caddyfile
```
重启Caddy使其生效

```
/etc/init.d/caddy restart
```

其他操作就是修改DNS记录，添加A记录到该服务器IP并等其生效。然后通过ftp上传网页到指定网站根目录。

就可以访问了。

### 本人在折腾中遇到的问题

在添加网站的时候自己遇到了几个问题，在这里记录一下。

#### 无法重启/启动Caddy

好几次都遇到无法重启或者启动Caddy的情况。
但是基本不外乎就是Caddyfile里面的内容出错了。
遇到问题时候先查看Caddy的log，里面会显示是什么原因无法启动。

```
tail -f /tmp/caddy.log
```
#### 网站的网址写法

按正常写法单网站是直接下面这样写
```
domain.com
gzip
root /usr/local/caddy/www/domain.com
```
但是如果遇到无法访问网站好像可以网址前面加上  http://  可以正常访问。

如果还是有问题，重新查看配置内容。

#### 开启SSL的方法
只需要在网站内配置指令加入

```
tls 自己的证书路径
```

或者
```
tls 自己的邮箱
```
如果在第一行的域名用的是domain.com没有  http://  ，这种情况是默认开通80和443端口，默认启用https



### 参考来源

https://doub.io/shell-jc1/  
https://www.moerats.com/archives/404/  
https://www.zybuluo.com/zwh8800/note/844776
