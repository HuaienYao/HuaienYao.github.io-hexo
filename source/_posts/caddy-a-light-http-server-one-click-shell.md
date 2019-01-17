---
tags:
  - Caddy
  - Linux
  - Web服务器
  - 后端技术
title: Caddy一个轻量的Go语言HTTP服务器的一键安装脚本教程
categories : 技术记录
date: 2018-07-18
draft: false
urlname: caddy-a-light-http-server
keywords: Caddy,Linux,服务器,后端技术
---

最近在逛逗比根据地的时候发现了这个用Golang写的极简HTTP WEB Server，叫[Caddy](https://doub.io/shell-jc1/)，上网查了其实好多博客都写了关于这个。于是就想用闲置的服务器折腾试试。但是毕竟是折腾，过程中还是遇到挺多问题。这里就简单记录一下。
<!--more-->
下面部分内容与脚本来自[逗比根据地](https://doub.io/shell-jc1/)

## 关于Caddy
> Caddy服务器是一个开源的，使用 Golang 编写，支持 HTTP/2 的 Web 服务端。它使用Golang 标准库提供HTTP 功能。 Caddy 一个显著的特性是默认启用HTTPS。它是第一个无需额外配置即可提供HTTPS 特性的Web 服务器。

--来自维基百科

根据上面可以知道，Caddy是一个可以快速配置网站，给网站启用HTTPS的Web服务端。网上对他的评价是很适合新手上手。
> Caddy的作者Matt Holt在caddy官网以及FAQ中对caddy的目标阐释如下： 其他Web Server为Web而设计，Caddy为human设计。功能定位上，与经常充当最前端反向代理的nginx不同，caddy致力于成为一个易用的静态文件Web Server。可以看出Caddy主打易用性，使用配置简单。并且得益于Go的跨平台特性，caddy很容易的支持了三大主流平台:Windows、 Linux、Mac。

Caddy比较适合应用个人静态文件。但是如果配合PHP，mysql好像可以跑动态网站。

## 安装前的检查

> CentOS 6+ / Debian 6+ / Ubuntu 14.04 +
> 逗比推荐 Debian 7x64

## 安装步骤

由于本次用的是逗比提供的一键安装脚本，过程很简单。


```
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/caddy_install.sh && chmod +x caddy_install.sh && bash caddy_install.sh install http.filemanager

# 如果上面这个脚本无法下载，尝试使用备用下载：

wget -N --no-check-c# 如果上面这个脚本无法下载，尝试使用备用下载：
ertificate https://softs.loan/Bash/caddy_install.sh && chmod +x caddy_install.sh && bash caddy_install.sh install http.filemanager
```
以上是Caddy一键安装脚本的下载，安装，以及包含了一个filemanager的在线文件管理器的插件的安装，如不需要可以去掉http.filemanager即可。如果还想安装其他插件，可以把名字加到命令后面，例如安装扩展：http.filemanager、http.git、http.filter的情况是
```
bash caddy_install.sh install http.filemanager,http.git,http.filter
```
（这里省去下载部分，比如安装后需要重新安装新的插件，这样重新覆盖安装就行）就是各个插件用英文逗号,连接起来就行。
![image](https://i.loli.net/2018/07/19/5b4fdce134dd4.png)

要查看其他的插件名字可以在[这里官网](https://caddyserver.com/download)查看。

## 使用Caddy

在安装后会出现安装成功，并列出部分使用Caddy的说明。
![安装完成后的界面](https://i.loli.net/2018/07/19/5b4fe31ad8663.png)

以下是Caddy的使用说明

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
### 升级Caddy或者更新扩展
只需要重新执行你当初安装时候用的命令即可，需要追加插件扩展的时候也是这样。会覆盖安装最新的Caddy+扩展（如有）

### 卸载Caddy

> 卸载不会删除虚拟主机的内容，只会删除Caddy自身和配置文件。

```
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/caddy_install.sh && bash caddy_install.sh uninstall

# 如果上面这个脚本无法下载，尝试使用备用下载：

wget -N --no-check-certificate https://softs.loan/Bash/caddy_install.sh && bash caddy_install.sh uninstall
```
## 一些常见错误

### 提示 wget: command not found 的错误
这是你的系统精简的太干净了，wget下载功能都没有安装，所以需要安装wget。

安装wget命令

```
# CentOS系统:
yum install -y wget

# Debian/Ubuntu系统:
apt-get install -y wget
```

### 启动提示失败，或提示成功但是实际失败

启动失败或提示成功但是实际失败，请查看日志，如果看到类似这个提示：


```
2017/0X/0X XX:XX:XX  listen tcp :80: bind: address already in use
```

那么说明是因为端口被占用导致的无法绑定端口从而无法启动。

用这个命令
```
netstat -lntp
```
 查看一下那个程序占用了端口并结束它。

这个已经不需要了，所以隐藏起来

### Caddy启动失败，打开 http://ip 显示的是 It works !

一些系统会自带 apache2 ，而 apache2 会占用80端口，导致Caddy无法绑定端口，所以只要关掉就好了。


```
netstat -lntp
# 我们可以通过这个命令查看是不是被其他软件占用了 80 端口。
```
不过 apache2 会默认开机自启动，如果不需要可以关闭自启动或者卸载 apache2 。

停止 Apache2

```
# CentOS系统
/etc/init.d/httpd stop
# Debian/Ubuntu系统
/etc/init.d/apache2 stop

# 尝试使用上面代码关闭，如果没效果或者提示什么错误无法关闭，那就用下面这个强行关闭进程。
kill -9 $(ps -ef|grep "apache2"|grep -v "grep"|awk '{print $2}')
```

取消开机自启动

```
# CentOS 系统
chkconfig --del httpd
# Debian/Ubuntu 系统
update-rc.d -f apache2 remove
```

卸载 Apache2

```
# CentOS 系统
yum remove httpd
# Debian/Ubuntu 系统
apt-get remove --purge apache2
```
关闭 Apache2后，就可以尝试启动 Caddy ，并试试能不能打开网页。

```
/etc/init.d/caddy start
```
```
### 启动 Caddy后，无法访问

iptables -I INPUT -m state --state NEW -m tcp -p tcp --dport 端口 -j ACCEPT
iptables -I INPUT -m state --state NEW -m udp -p udp --dport 端口 -j ACCEPT

# 删除防火墙规则，内容一样把 -I 换成 -D 就行了：
iptables -D INPUT -m state --state NEW -m tcp -p tcp --dport 端口 -j ACCEPT
iptables -D INPUT -m state --state NEW -m udp -p udp --dport 端口 -j ACCEPT
```


以上这些问题我在执行过程中没遇到。
### 下面是我遇到的问题

如果用AWS EC2安装的话，执行下载安装命令，输入y确认覆盖安装后出现错误提示：

```
caddy_install.sh: line 41: kill: (3692) - Operation not permitted
caddy_linux.tar.gz: Permission denied
[错误] Caddy 下载失败 !

```
![普通用户下载失败](https://i.loli.net/2018/07/19/5b4fe4350cb6d.png)

这是由于AWS EC2登录的是ec2-user用户，安装脚本需要切换到root用户

```
#切换到root
sudo su
```
然后再执行安装命令就可以了

![切换到root用户后不会提示错误](https://i.loli.net/2018/07/19/5b4fe45c20117.png)


到这里是已经基本完成了Caddy的安装。
但是需要如何使用Caddy来做网站呢？
之后会写到三种应用实例。
1. [利用Caddy添加虚拟主机搭建网站](https://huaien.me/archives/use-caddy-to-run-site.html)
2. [利用Caddy的Filemanager插件搭建个人网盘](https://huaien.me/archives/use-caddy-filemanager-to-build-personal-netdisk.html)
3. [利用Caddy的WebDAV来搭建可挂载的WebDAV个人网盘](https://huaien.me/archives/use-caddy-to-build-webdav-server.html)


### 参考资料

https://caddyserver.com/download  
https://doub.io/shell-jc1/  
https://www.moerats.com/archives/404/
