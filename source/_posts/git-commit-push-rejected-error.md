---
title: git push远程版本和本地版本冲突时强制覆盖已有的分支有的分支
tags:
  - Git
  - 分支
  - 博客
  - 备份
categories: 技术记录  
date: 2018-08-03
urlname: git-commit-push-rejected-error
keyword: Git,分支,博客,备份
description: 本文记录了在git push的时候出现rejected的远程版本和本地版本冲突错误时，通过强制覆盖已有的分支有的分支来及决的办法。
---

## 背景

前面我们讲到[备份 Hexo 源码文件到GitHub仓库](https://huaien.me/article/blogengine/how-to-backup-hexo-to-github/)
在尝试将本地hexo源码文件同步到GitHub仓库的hexo分支的时候，执行

```
git add .
git commit -m "backup"
git push -u origin hexo
```

最后提示下面的错误：

rejected的远程版本和本地版本冲突错误
```
! [rejected]        hexo -> hexo (non-fast-forward)
error: failed to push some refs to 'https://github.com/Wyane/Wyane.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Merge the remote changes (e.g. 'git pull')
hint: before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
## 解决
原来是远程仓库的分支内容与本地不符。导致无法提交更新，
可以先试着`git pull `
如果能解决就最好，但是我还是提示错误，最后查询网上资料，还是得通过 -f参数来强制覆盖已有的分支。


```
git push -u origin master -f
```
这样就不会报错了。如果有重要文件 ，建议还是先备份，毕竟是强制覆盖，万一出问题的话丢失文件就麻烦了。


## 来源
- https://blog.csdn.net/shiren1118/article/details/7761203

- http://www.cnblogs.com/xwdreamer/archive/2012/05/29/2523958.html
