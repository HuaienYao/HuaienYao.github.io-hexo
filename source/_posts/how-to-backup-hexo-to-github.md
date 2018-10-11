---
title: Windows,Linux多平台下共同维护Hexo 备份Hexo到GitHub
tags:
  - Hexo
  - 静态博客生成器
  - 博客
  - GitHub
  - 备份
  - 多平台
categories:
  - 技术记录
date: 2018-08-03
urlname: how-to-backup-hexo-to-github
keyword: Hexo,静态博客生成器,博客,GitHub,备份,多平台
description: 本文记录了如何通过两种方法备份Hexo文件到GitHub来实现方便的在多平台下写博客，维护博客。
---

## 前言
因为经常需要在不同的操作系统上工作，所以需要在每个平台下都可以方便的写博客。

Windows 家里，公司，Linux服务器上

博客最初是在Windows下，所以需要在Linux下也配置一下，方便写博客和维护。


其实有两种办法来讲hexo源码文件同步到github。

## 直接commit，push到分支
### 前提
首先，你应是在某一个平台下已经可以使用hexo创建博客，并可以使用hexo d同步到github，如果这一步还没实现，请自行网上搜索使用Github和Hexo搭建个人博客相关的关键字。

### 方法
已经搭建好的Hexo环境下
为了防止误操作，最好先备份一下

删除博客根目录和主题目录下的.git文件夹

创建.gitignory文件(如果博客根目录下没有的话)，并修改内容为


- .deploy_git
- public

将博客源码保存在github博客项目的一个分支上
在博客根目录下，依次执行以下命令



```
$ git init
$ git add .
$ git remote add origin git@xxxxxxxxxx.git   //自己的github中的博客项目
$ git branch hexo	//创建一个分支
$ git checkout hexo	//选择分支
$ git push -u origin hexo
```

新环境下
已经在Linux下或其他环境中安装了npm，node.js，hexo的条件下

直接克隆github中的博客项目


```
$ git clone git@xxxxxxxxx.git
$ git checkout hexo	//切换到hexo分支下
```

日常使用
不论在那个平台下，都要切换到src分支上操作

// 在Windows下

在hexo分支上正常使用hexo，当使用hexo new创建一篇博文，并使用hexo clean，hexo g，hexo d同步到github(master分支)
使用


```
$ git add .
$ git commit -m "hexo"
$ git push origin hexo
```

将更改提交到github上的src分支

// 在Linux下

在其他平台使用hexo更新了博客，并提交到了github的hexo分支，本平台下的本地hexo分支下的内容与github远端hexo分支的内容不一致，在本地hexo分支下使用


```
$ git pull
```

与远端src分支进行同步

然后，重复在Mac下的1，2步骤



原文链接：https://linuxszp.github.io/2017/05/17/%E5%A4%9A%E5%B9%B3%E5%8F%B0%E4%B8%8B%E5%85%B1%E5%90%8C%E7%BB%B4%E6%8A%A4hexo/


## 通过插件来实现同步
来自知乎张钊用户的回答：
https://www.zhihu.com/question/21193762/answer/172097576

安装安装 hexo-deployer-git插件
### 通过npm安装


```
$ npm install hexo-deployer-git --save

```
### 通过github安装

一开始还没发布到 npm 的原因，必须得从 github 安装


```
npm install git+git@github.com:hexojs/hexo-deployer-git.git --save
```

在项目根目录下的 _config.yml 里面就可以这样配置

下面是同时同步到GitHub和Coding.net的配置信息。

```
# _config.yaml
deploy:
  - type: git
    repo: git@github.com:<username>/<username>.github.io.git
    branch: master
  - type: git
    repo: git@github.com:<username>/<username>.github.io.git
    branch: hexo
    extend_dirs: /
    ignore_hidden: false
    ignore_pattern:
        public: .
        .deploy_git: .
  - type: git
    repo: git@github.com:<username>/<username>.github.io.git
    branch: hexo
    extend_dirs: /
    ignore_hidden: false
    ignore_pattern:
        public: .
        .deploy_git: .

```

这样，在每次写完博客的时候时候使用 hexo d 命令就能将所有其他文件发布到 hexo 分支换电脑的时候就能通过 git 重新下载下来整个项目，然后本地切换到远端的 hexo 分支
```
git checkout origin/src
```

就能重新获得所有的源文件，就能重新 hexo d发布对于每一个从git下载下来的项目或者主题，最好把每个的 .git 文件夹删掉，否则得通过 submodule 的方式来安装。
