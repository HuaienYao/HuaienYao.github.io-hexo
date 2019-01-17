---
title: Linux安装nvm后无法使用nvm安装node
tags: [nvm,node.js,Hexo,博客程序,后端技术]
date: 2018-08-07 04:35:20
categories: 技术记录
urlname: not-able-to-install-nodejs-by-nvm
keywords: nvm,node.js,Hexo,博客程序,bash_profile,source命令,Linux,后端技术
description: Linux服务器安装nvm后无法执行nvm来安装node，提示没有nvm这个命令，多次重装也不行，后来通过修改`bash_profile`文件来解决。本文记录了如何修改`bash_profile`文件和source命令来解决无法使用nvm来安装node.js的方法。
---


今天在给服务器安装nvm的时候出现无法安装node的错误，查询了网上资料，可以通过修改bash_profile来解决。

<!--MORE-->
## nvm安装node.js的方法
安装 Node.js 的最佳方式是使用 nvm。

cURL:


```
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
```

Wget:


```
$ wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
```

安装完成后，重启终端并执行下列命令即可安装 Node.js。


```
$ nvm install stable
```
## 遇到错误，无法安装node.js
但是最后一步的时候出现错误

提示

```

root@do-sf2:~# nvm install stable
-bash: nvm: command not found

```
重新安装的话提示


```
root@do-sf2:~# wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
=> nvm is already installed in /root/.nvm, trying to update using git
=> => Compressing and cleaning up git repository

=> nvm source string already in /root/.bashrc
=> bash_completion source string already in /root/.bashrc
=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

```
## 解决方法

安装完 nvm 后，输入nvm，当看到有输出时，则 nvm 安装成功。 如果遇到关闭shell后遇到以下提示：

```
root@do-sf2:~# nvm
-bash: nvm: command not found

```

编辑.bash_profile文件，没有的话就新建一个
```
vi .bash_profile
```

> 注：~/.bash_profile:每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc文件.  
> 此文件类似于/etc/profile，也是需要需要重启才会生效，/etc/profile对所有用户生效，~/.bash_profile只对当前用户生效。  
> ~/.bash_profile 是交互式、login 方式进入bash 运行的；
~/.bashrc 是交互式 non-login 方式进入bash 运行的；
通常二者设置大致相同，所以通常前者会调用后者。  
摘自：https://blog.csdn.net/chenchong08/article/details/7833242


内容为

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```

最后source一下该文件
```
source .bash_profile
```

注：

> source命令：  
source命令也称为“点命令”，也就是一个点符号（.）。source命令通常用于重新执行刚修改的初始化文件，使之立即生效，而不必注销并重新登录。  
用法： 
source filename 或 . filename


然后就可以安装node.js了

```
root@do-sf2:~# nvm install stable
Downloading and installing node v10.8.0...
Downloading https://nodejs.org/dist/v10.8.0/node-v10.8.0-linux-x64.tar.xz...
######################################################################## 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v10.8.0 (npm v6.2.0)
Creating default alias: default -> stable (-> v10.8.0)

```

## nvm的使用方法

```
nvm install stable # 安装最新稳定版 node，现在是 5.0.0
nvm install 4.2.2 # 安装 4.2.2 版本
nvm install 0.12.7 # 安装 0.12.7 版本

# 特别说明：以下模块安装仅供演示说明，并非必须安装模块
nvm use 4 # 切换至 4.2.2 版本
npm install -g mz-fis # 安装 mz-fis 模块至全局目录，安装完成的路径是 /Users/<你的用户名>/.nvm/versions/node/v0.12.7/lib/mz-fis
nvm use 0 # 切换至 0.12.7 版本
npm install -g react-native-cli #安装 react-native-cli 模块至全局目录，安装完成的路径是 /Users/<你的用户名>/.nvm/versions/node/v4.2.2/lib/react-native-cli

nvm alias default 0.12.7 #设置默认 node 版本为 0.12.7
```


## 参考来源

https://blog.csdn.net/zjuwwj/article/details/72805671

https://hexo.io/zh-cn/docs/

https://blog.csdn.net/chenchong08/article/details/7833242