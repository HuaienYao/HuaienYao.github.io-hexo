---
title: 利用Caddy的Filemanager插件搭建个人网盘教程
tags:
  - Caddy
  - Linux
  - Web服务器
  - 个人网盘
  - 后端技术
categories : 技术记录
date: 2018-07-21
urlname: use-caddy-filemanager-to-build-personal-netdisk
keywords: Caddy,Linux,Web服务器,个人网盘,后端技术
description: Caddy自带的Filemanager插件可用很完美的搭建一个个人网盘，本文记录了如何利用Caddy的Filemanager插件搭建个人网盘。
---

前面我们了解了[Caddy是一个极简HTTP服务器](https://huaien.me/article/backend/caddy-a-light-http-server/)，可以用来[快速配置网站](https://huaien.me/article/backend/use-caddy-to-run-site/)。并且支持HTTPS，支持自己的SSL证书或者只需要一个邮箱，Caddy帮你自动生成Let's Encrypt的免费证书，简单的配置就能搭建好一个HTTPS的Web服务器环境。  
其实Caddy自带的Filemanager插件可以直接用来搭建一个个人网盘，而且支持的功能还挺多，界面还挺好看。
<!--MORE-->
### 认识一下File Manager
![File Manager](https://user-images.githubusercontent.com/5447088/28537288-39be4288-70a2-11e7-8ce9-0813d59f46b7.gif)

看上面的动图可以看到用Filemanager可以很方便的在线管理文件。

那么filemanager有哪些功能呢
#### Caddy FileBrowser扩展介绍
FileBrowser 是基于Caddy的扩展。它提供文件管理界面，可用于 上传/下载/删除/预览和重命名 等该目录中的文件。

- 支持 上传文件
- 支持 按类型 搜索文件
- 支持 批量压缩 文件下载
- 支持 多用户管理(权限可控)
- 支持 在网页执行 Linux命令
- 支持 创建 共享链接(限时/永久)
- 支持 在线编辑 各类文本文件
- 支持 在线浏览 图片/文本/视频等
- 支持 新建/重命名/移动/删除 文件和文件夹等
部署简单，几步完成，无需任何依赖环境
等等 ...

并且支持中文，日语，英语等多种语言。其中[中文文件](https://github.com/hacdias/filemanager/issues/168)由[逗比根据地](https://doub.io/jzzy-3/)博主制作。


### 安装Caddy与Filemanager插件

如果你已经安装了Caddy，但是没有Filemanager插件，你需要重新安装一次Caddy，附带Filemanager


```
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/caddy_install.sh && chmod +x caddy_install.sh && bash caddy_install.sh install http.filemanager

# 如果上面这个脚本无法下载，尝试使用备用下载：

wget -N --no-check-c# 如果上面这个脚本无法下载，尝试使用备用下载：
ertificate https://softs.loan/Bash/caddy_install.sh && chmod +x caddy_install.sh && bash caddy_install.sh install http.filemanager
```
==注意：此文中的Caddy管理命令与Caddy文件夹路径等仅试用于本文的脚本。==

### Caddy 使用说明

```
启动：/etc/init.d/caddy start

停止：/etc/init.d/caddy stop

重启：/etc/init.d/caddy restart

查看状态：/etc/init.d/caddy status

查看Caddy启动日志： tail -f /tmp/caddy.log

Caddy配置文件位置：/usr/local/caddy/Caddyfile

FileBrowser数据库位置：/usr/local/caddy/filemanager.db

Caddy自动申请SSL证书位置：/.caddy/acme/acme-v01.api.letsencrypt.org/sites/xxx.xxx(域名)/
```

### 修改Caddyfile来配置Filemanager

首先先创建一个网站根目录文件夹

```
mkdir /usr/local/caddy/www && mkdir /usr/local/caddy/www/pan
```

根据之前的教程，可以vi修改Caddyfile或者echo修改Caddyfile两种方式来配置。  

#### vi修改方式

```
example.com {
 root /usr/local/caddy/www/pan
 timeouts none
 #这里使用免费证书
 tls xxx@gmail.com
 gzip
 filemanager / /usr/local/caddy/www/pan {
  database /usr/local/caddy/filemanager.db
 }
}
```
#### echo修改方式

```
echo "example.com {
 root /usr/local/caddy/www/pan
 timeouts none
 #这里使用免费证书
 tls xxx@gmail.com
 gzip
 filemanager / /usr/local/caddy/www/pan {
  database /usr/local/caddy/filemanager.db
 }
}" > /usr/local/caddy/Caddyfile
```

==注意此操作会覆盖原Caddyfile文件内容，如果需要在原文件最后追加请修改最后一行为==
```
}" >> /usr/local/caddy/Caddyfile
```

#### 了解FileBrowser扩展各个参数

```
filemanager [url] [scope] {
 database path
}
```
- url 是要设置的网站URL。默认是 / (比如 /yourname 那么访问入口就是 http://ip/yourname )。
- scope 是要浏览的服务器文件目录路径，可以使相对或绝对路径。默认是 ./ (服务器上面文件的绝对或相对路径)。
- database path 是 filemanager 的数据库路径（如果不写这个参数，则默认就是 /usr/local/caddy/filemanager.db）。

#### 重启Caddy

当你已经配置完上面步骤后，那就需要启动Caddy了。
```
/etc/init.d/caddy start
```
#如果启动失败可以看Caddy日志：

```
tail -f /tmp/caddy.log
```
### 开始使用FileBrowser
#### 登陆，修改密码
打开网站，第一次登陆的默认账号密码都是admin，登陆后可以修改密码。

#### 切换中文
进入后可以点击左边侧栏 [Settings] 进入设置页面，然后选择 [language - Chinese (Simplified)] ，并点击右下角第一个 [Update] 按钮更新。

#### 快捷键

一些按键有对应的作用：

- F1 - 查看帮助
- F2 - 重命名 文件/文件夹
- DEL - 删除所选 文件/文件夹
- ESC - 清除当前选择 或 关闭提示
- CTRL + S - 保存下载 文件/文件夹（zip压缩）
- CTRL + 鼠标左键 单击 - 选择多个文件/文件夹
- 鼠标左键 双击 - 打开文件/文件夹
- 鼠标左键 单击 - 选择文件/文件夹

### 维护FIlemanager
#### 升级FileBrowser
只需要重新前面的Caddy安装命令覆盖安装Caddy＋Filemanager即可（只会覆盖 Caddy自身，不影响配置文件），覆盖安装后启动Caddy即可。

#### 卸载FileBrowser
因为扩展是集成于Caddy中的，所以无法单独卸载某个扩展。
所以卸载的话需要将前面的Caddy安装命令的install改为uninstall就可以了。
例如
```
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/caddy_install.sh && chmod +x caddy_install.sh && bash caddy_install.sh uninstall http.filemanager

# 如果上面这个脚本无法下载，尝试使用备用下载：

wget -N --no-check-c# 如果上面这个脚本无法下载，尝试使用备用下载：
ertificate https://softs.loan/Bash/caddy_install.sh && chmod +x caddy_install.sh && bash caddy_install.sh uninstall http.filemanager
```

### 可能遇到的问题

#### 启动显示成功，但是实际未运行

因为 服务脚本判断的问题，只判断了nohub是否运行 Caddy成功，但没有判断 Caddy 是否保持正常运行。

你可以理解为，nohub成功启动了 Caddy，但是 Caddy因为配置文件错误等原因，启动后又退出了。

所以这种情况下，你应该去查看启动日志：


```
tail -f /tmp/caddy.log
```
#### Caddy下载文件频繁中断

可能是因为 Caddy的超时时间机制导致的，可以在配置文件中加入这句代码 timeouts none ，例如这样：


```
example.com {
 root /usr/local/caddy/www/pan
 timeouts none
 #这里使用免费证书
 tls xxx@gmail.com
 gzip
 filemanager / /usr/local/caddy/www/pan {
  database /usr/local/caddy/filemanager.db
 }
}
```
#### Caddy启动失败，打开 http://ip 显示的是 It works !

一些系统会自带 apache2 ，而 apache2 会占用80端口，导致Caddy无法绑定端口，所以只要关掉就好了。


```
netstat -lntp
# 我们可以通过这个命令查看是不是被其他软件占用了 80 端口。
```

不过 apache2 会默认开机自启动，如果不需要可以关闭自启动或者卸载 apache2 。

停止 Apache2


```
/etc/init.d/apache2 stop
# 尝试使用上面这个关闭，如果没效果或者提示什么错误无法关闭，那就用下面这个强行关闭进程。
kill -9 $(ps -ef|grep "apache2"|grep -v "grep"|awk '{print $2}')
```

取消开机自启动


```
# 以下代码仅限 Debian/Ubuntu 系统 #
update-rc.d -f apache2 remove
```

卸载 Apache2


```
# 以下代码仅限 Debian/Ubuntu 系统 #
apt-get remove --purge apache2
```

关闭 Apache2后，就可以尝试启动 Caddy ，并试试能不能打开网页。


```
/etc/init.d/caddy start
```


#### 启动 Caddy后，无法访问
这个可能是防火墙的问题，开放防火墙端口即可。


```
iptables -I INPUT -m state --state NEW -m tcp -p tcp --dport 端口 -j ACCEPT
iptables -I INPUT -m state --state NEW -m udp -p udp --dport 端口 -j ACCEPT

# 删除防火墙规则，内容一样把 -I 换成 -D 就行了：
iptables -D INPUT -m state --state NEW -m tcp -p tcp --dport 端口 -j ACCEPT
iptables -D INPUT -m state --state NEW -m udp -p udp --dport 端口 -j ACCEPT


```
#### FileBrowser账号密码忘了或想要重置账号信息

我们可以重置FileBrowser的数据库文件来清除所有账号信息，这样我们就变成初始账号和密码了(admin/admin)。
> 注意：删除数据库文件只会影响数据库内储存的各账号信息，并不会影响服务器本地的文件夹/文件。

很简单，关闭Caddy，然后删除FileBrowser数据库文件，启动Caddy，使用初始账号密码登陆。

```
/etc/init.d/caddy stop
rm -rf /usr/local/caddy/filemanager.db
/etc/init.d/caddy start
```

### 参考资料

[利用 Caddy FileBrowser扩展 非常简单的部署 私人网盘/在线文件管理器](https://doub.io/jzzy-3/)

[Caddy 文档](https://caddyserver.com/docs/http.filemanager)

[Github 项目](https://github.com/filebrowser/filebrowser)
