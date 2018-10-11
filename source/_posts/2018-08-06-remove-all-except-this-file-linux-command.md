---
title: linux下删除某个文件之外的其他所有文件的命令之extglob模式
tags: [Linux,命令,Shell,后端技术]
date: 2018-08-06 11:27:39
categories: 技术记录
urlname: remove-all-except-this-file-linux-command
keywords: Linux,命令,Shell,后端技术
description: 有时候我们需要文件夹内留下一个或两个文件，其余的全部删除的时候，用`rm *`会将文件夹内包括我们需要的文件都删除掉，这个时候需要用到extglob模式来匹配文件。本文就来讲讲extglob模式。
---
## 背景
比如最近我在备份Hexo的时候，多次需要调试效果，因为有备份一个文件夹叫hexo.zip，把这个传到服务器的网站根目录下，然后将其解压。但是之后再重建Hexo的时候需要将目录下所有文件除了hexo.zip都删除的时候，不能只用到简单的rm命令了。
<!--more-->

## 方法
最简单的方法是开启extglob模式，开启之后Shell可以另外识别出下列5个模式匹配操作符，更加方便的匹配文件。
### shopt 命令
shopt命令是set命令的一种替代，很多方面都和set命令一样，但它增加了很多选项。可有使用“-p”选项来查看shopt选项的设置。“-u”开关表示一个复位的选项，“-s”表示选项当前被设置。

```
# shopt -s extglob      #打开extglob模式
# shopt -u extglob      #关闭extglob模式
```


#### set 命令
> set命令作用主要是显示系统中已经存在的shell变量，以及设置shell变量的新变量值。使用set更改shell特性时，符号"+"和"-"的作用分别是打开和关闭指定的模式。set命令不能够定义新的shell变量。如果要定义新的变量，可以使用declare命令以变量名=值的格式进行定义即可。

具体set命令可以参考[官方手册](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html)



```
?(pattern-list) - 所给模式匹配0次或1次；

*(pattern-list) - 所给模式匹配0次以上包括0次；

+(pattern-list) - 所给模式匹配1次以上包括1次；

@(pattern-list) - 所给模式仅仅匹配1次；

!(pattern-list) - 不匹配括号内的所给模式。
```

### 操作命令实例


```
# shopt -s extglob      #打开extglob模式
# rm -fr !(file1)    #删除除了file1的所有文件
```

 
如果是多个要排除的，可以这样利用管道线：

```
# rm -rf !(file1|file2)  #删除除了file1和file2的所有文件
```


```
# rm -i !(*.zip)       #删除除了.zip 之外的所有文件
```


```
# shopt -u extglob      #关闭extglob模式
```

### grep -v 反选
或者还可以利用 grep -v 反选操作  （推荐，支持正则表达式）

示例：


```
rm -rf `ls -a | grep -v "^tes"`  #删除目录下除了test 文件以外的其他文件以及文件夹
```






## 来源

- https://www.jianshu.com/p/9292881a1a10
- https://www.jb51.net/article/122897.htm
- https://www.codetd.com/article/1689145