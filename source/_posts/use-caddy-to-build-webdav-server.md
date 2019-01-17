---
title: 利用Caddy来搭建可挂载的WebDAV个人网盘+配合FileBrowser来管理文件
tags:
  - Caddy
  - Linux
  - WebDav
  - 个人网盘
  - FileBrowser
  - 后端技术
categories : 技术记录
date: 2018-07-23
draft: false
urlname: use-caddy-to-build-webdav-server
keywords: Caddy,Linux,WebDav,个人网盘,filemanager,后端技术
description: 前面我们介绍了Caddy的Filemanager插件，今天介绍一下用Caddy自带的插件来搭建WebDav服务器和用filemanager来管理文件。

---

前面我们讲到了[Caddy](https://huaien.me/article/backend/caddy-a-light-http-server/)以及用[Caddy搭建网站](https://huaien.me/article/backend/use-caddy-to-run-site/)还有用[Caddy的File Manager来搭建个人网盘](https://huaien.me/article/backend/use-caddy-filemanager-to-build-personal-netdisk/)。今天我们要讲的用Caddy的WebDav扩展组件来搭建一个Webdav服务器。并且配合Caddy的FileManager扩展组件来在线管理WebDav服务器的文件。
<!--more-->
## 什么是WebDav服务器
WebDAV是基于Web的分布式编写和版本控制，是超文本传输协议（HTTP）的扩展，有利于用户间协同编辑和管理存储在万维网服务器文档。WebDAV最重要的特性包括：

- 锁（防止覆盖）
- 特性（创建，移除和查询）
- 命名空间管理
- 集合（创建，移除和列举资源）

--来源：维基百科，掘金

有个好处就是可以像普通网盘那样挂载到本地硬盘，然后实现即时同步功能。

## 我为什么要搭建WebDav服务器？
其实是因为最近在研究密码管理器，比如[keepass](https://keepass.info/)，[1password](https://1password.com/)，[lastpass](https://lastpass.com/)，[enpass](https://www.enpass.io/)，[bitwarden](https://bitwarden.com/)等等。在使用keepass或者enpass过程中，遇到webdav这个同步选项。在研究后就想自己搭建一个WebDav服务器来同步数据。

## 利用Caddy的WebDav扩展组件来搭建WebDav服务器
### 安装Caddy
使用下面的一键安装包来安装Caddy，需要添加的组件是http.filemanager（在线个人网盘），http.webdav（Webdav支持）还有http.cors（这个是在使用KeeWeb连接Webdav时出现网络错误Netword Error的时候需要添加这个）。


```
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/caddy_install.sh && chmod +x caddy_install.sh && bash caddy_install.sh install http.filemanager,http.webdav,http.cors

# 如果上面这个脚本无法下载，尝试使用备用下载：

wget -N --no-check-c# 如果上面这个脚本无法下载，尝试使用备用下载：
ertificate https://softs.loan/Bash/caddy_install.sh && chmod +x caddy_install.sh && bash caddy_install.sh install http.filemanager,http.webdav,http.cors
```

具体安装Caddy教程请参考[这里](https://huaien.me/archives/caddy-a-light-http-server-one-click-shell.html)

### Caddy的使用说明及相关路径

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
### 搭建WebDav服务器
#### 修改Caddy配置文件
##### vi方式

```
vi /usr/local/caddy/Caddyfile
```
按i键进入insert模式
输入以下内容

```
dav.yourdomain.com {
 #申请免费SSL证书
 tls 你的邮箱
 #根目录
 root /usr/local/caddy/www/file/dav
 #给网站目录添加简单的登录机制（账号admin密码password自行修改）
 basicauth / admin password
 timeouts none
 gzip
 webdav / {
  scope /usr/local/caddy/www/file/dav
  allow /
 }
}

```
编辑完成按左上角esc键退出insert模式，再按:冒号进入末行模式「Last line mode」，然后输入wq保存退出。


##### echo方式
*下面的命令为一串命令，需要一次复制粘贴，不能每行分开复制。


```shell
echo "dav.yourdomain.com {
 #申请免费SSL证书
 tls 你的邮箱
 #根目录
 root /usr/local/caddy/www/file/dav
 #给网站目录添加简单的登录机制（账号admin密码password自行修改）
 basicauth / admin password
 timeouts none
 gzip
 webdav / {
  scope /usr/local/caddy/www/file/dav
  allow /
 }
}" > /usr/local/caddy/Caddyfile

```

上面的命令是清空覆盖源文件内容替换为新内容，如果要在源文件内容最后追加新内容的话把上面最后一行改为

```
}" >> /usr/local/caddy/Caddyfile
```

#### 重启Caddy

```
/etc/init.d/caddy restart
```
#### 验证搭建成功
然后浏览器进入你的域名 dav.yourdomain.com，应该会出现登录界面，输入前面配置文件设置的用户名admin密码password成功登录后如果出现下面的画面，表示搭建成功。
![搭建成功的界面](https://i.loli.net/2018/07/23/5b557034b6fe9.png)


## 配合FileManager扩展组件使用

其实上一步已经就完成了WebDav的搭建，后来想到如果能用浏览器在线管理WebDav上面的文件就方便多了。
于是可以结合之前写的[利用Caddy的Filemanager插件搭建个人网盘教程](https://huaien.me/archives/use-caddy-filemanager-to-build-personal-netdisk.html)来完善WebDav的使用。

前面把WebDav服务器的根目录设置为/usr/local/caddy/www/file/dav也是为了下面搭建个人网盘而准备的。

下面我们把FileManager的根目录设置为/usr/local/caddy/www/file，WebDav服务器就成了FileManager里面的一个文件夹。

如图
![在FIleManager搭建的个人网盘里面，可以直接管理刚才搭建的Webdav文件](https://i.loli.net/2018/07/23/5b557684a6f56.png)

### vi方式修改Caddy配置文件

```
file.example.com {
 root /usr/local/caddy/www/file
 timeouts none
 #这里使用免费SSL证书
 tls 你的邮箱
 gzip
 filemanager / /usr/local/caddy/www/file {
  database /usr/local/caddy/filemanager.db
 }
}
```
### echo方式修改Caddy配置文件
因为之前我们已经配置过Caddyfile了，本次就在前面WebDav配置的后面追加FileManager的配置。所以用下面的命令


```
echo "file.example.com {
 root /usr/local/caddy/www/file
 timeouts none
 #这里使用免费SSL证书
 tls 你的邮箱
 gzip
 filemanager / /usr/local/caddy/www/file {
  database /usr/local/caddy/filemanager.db
 }
}" >> /usr/local/caddy/Caddyfile
```

### 重启Caddy
```
/etc/init.d/caddy restart
```

## 相关问题
### 配合KeeWeb使用出现"Network Error"
#### 需启用http.cors扩展插件
查阅了[KeeWeb的官方Wiki](https://github.com/keeweb/keeweb/wiki/WebDAV-Config)后，得知需要启用http.cors扩展插件。   
http.cors扩展插件前面我们已经在安装Caddy的时候安装好了，现在我们只需要在Caddyfile里面的WebDav配置内容加上cors指令。
下面是完整的配置文件

```
dav.yourdomain.com {
 #申请免费SSL证书
 tls 你的邮箱
 #根目录
 root /usr/local/caddy/www/file/dav
 #给网站目录添加简单的登录机制（账号admin密码password自行修改）
 basicauth / admin password
 timeouts none
 gzip
 webdav / {
  scope /usr/local/caddy/www/file/dav
  allow /
 }
 cors / {
   origin *
   methods GET,HEAD,POST,PUT,OPTIONS,MOVE,DELETE,COPY,LOCK,UNLOCK,PROPFIND,MKCOL
   allow_credentials true
   max_age 1728000
   allowed_headers Authorization,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,X-Accept-Charset,X-Accept,origin,accept,if-match,destination,overwrite
   exposed_headers ETag
 }
}
```
具体指令里面为什么要写那些我也不知道，这是官方wiki提供的Sample。

但是这样还是有点问题。是下面这个问题。

#### KeeWeb无法连接数据库文件.kdbx
试了好几次好像是因为WebDav开启了认证就不好使。就是配置文件中的basicauth指令。
后来尝试把basicauth设置成下面的格式就可以用了，但是WebDav就没有认证登录机制了。


```
dav.yourdomain.com {
 #申请免费SSL证书
 tls 你的邮箱
 #根目录
 root /usr/local/caddy/www/file/dav
 #给网站目录添加简单的登录机制，这里删除了/
 basicauth admin password
 timeouts none
 gzip
 webdav / {
  scope /usr/local/caddy/www/file/dav
  allow /
 }
 cors / {
   origin *
   methods GET,HEAD,POST,PUT,OPTIONS,MOVE,DELETE,COPY,LOCK,UNLOCK,PROPFIND,MKCOL
   allow_credentials true
   max_age 1728000
   allowed_headers Authorization,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,X-Accept-Charset,X-Accept,origin,accept,if-match,destination,overwrite
   exposed_headers ETag
 }
}
```
这样设置之后KeeWeb可以正常连接到WebDav上面的密码数据库，而不会之前的报错Network Error，可能可以打开数据库但是修改后无法同步到WebDav服务器。

### 没有定义root路径

在试验中发现，配置内容里面去掉
```
root /usr/local/caddy/www/file/dav
```
也可以正常使用。。

附上我实际用的配置，应该是有安全风险的。

```
dav.domain.com {
 tls www@gmail.com
 basicauth admin password
 webdav / {
  scope /usr/local/caddy/www/file/dav
  allow /
 }
 cors / {
   origin *
   methods GET,HEAD,POST,PUT,OPTIONS,MOVE,DELETE,COPY,LOCK,UNLOCK,PROPFIND,MKCOL
   allow_credentials true
   max_age 1728000
   allowed_headers Authorization,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,X-Accept-Charset,X-Accept,origin,accept,if-match,destination,overwrite
   exposed_headers ETag
 }
}

```

### 出现其他问题

请活用启动日志

```
tail -f /tmp/caddy.log
```
**出现启动失败多数是因为Caddyfile指令写错或者没有安装相关扩展组件导致无法启动。**



## 相关连接
https://doub.io/jzzy-4/
