---
title: 解决Linux系统SSH终端显示中文乱码以centos为例
tags: [Linux,SSH,编码,后端技术]
date: 2018-09-27 08:40:26
categories: 技术记录
urlname: linux-os-ssh-show-Chinese
keywords: Linux,SSH,编码,乱码,后端技术
description: 在使用服务器的时候，用SSH工具例如Putty连接Linux系统的服务器，在出现中文的时候会显示乱码，这个时候需要一些修改，就可以让Linux系统在SSH终端中正常显示中文。
---
![](https://ww1.sinaimg.cn/large/005YhI8igy1fvntln8qacj30gj09sgmt)
如果没有设置好编码，在SSH客户端连接Linux服务器的时候就是像上面那样显示效果。不过经过设置，可以正常显示中文。

## 查看当前系统编码设置

```
# echo $LANG
C
```
返回的值为C，可以知道当前的系统语言编码设置为C

## 查看当前系统的中文支持

```
# locale -a | grep zh_CN
zh_CN
zh_CN.gb18030
zh_CN.gb2312
zh_CN.gbk
zh_CN.utf8

```
以上列出的为当前系统可用中文字符集

> vim 只能正确识别列表中的中文编码文件，如需识别其他编码类型的中文文件，则需要做系统升级。

## 修改Linux系统的编码文件
以下操作在root权限下操作。

### 临时生效，重启失效

```
# export LANG="zh_CN.UTF-8"
```
查看编码设置是否变更为zh_CN.UTF-8
```
# echo $LANG
zh_CN.UTF-8
```

### 永久生效


只需要编辑/etc/sysconfig/i18n文件就好了

用vi编辑
```
# vi /etc/sysconfig/i18n
```

在原来的内容前加上“#”注释掉

并添加一行

```
LANG="zh_CN.UTF-8"  
```


![](https://ww1.sinaimg.cn/large/005YhI8igy1fvntwapar7j30gj09sdg3)

按esc退出insert模式

底行模式下输入`:wq`保存退出

用下面其中一种命令使修改生效

```
source /etc/sysconfig/i18n
```
或者
```
. /etc/sysconfig/i18n
```



附带网上几个版本的i18n配置文件

这个版本最普遍，当时可能是我的客户端没有找到这个编码导致还是有些中文无法显示。
```
LANG="zh_CN.GB18030"
SUPPORTED="zh_CN.UTF-8:zh_CN:zh:en_US.UTF-8:en_US:en:zh_CN.GB18030"
SYSFONT="latarcyrheb-sun16"
```


下面这个可以完全显示。

```
LANG="zh_CN.UTF-8"  
SUPPORTED="zh_CN.UTF-8:zh_CN:zh"  
SYSFONT="latarcyrheb-sun16"  
```


## 修改Putty客户端的编码设置

其他的客户端也需要设置，方法差不多。

putty设置

左侧设置类别的Window-Appearance，右侧的Font settings的Change按钮

![](https://ww1.sinaimg.cn/large/005YhI8igy1fvnt7nzrshj30cy0argmv)


在字体设置中字体选择带有中文的字体如下图选择楷体Kaiti ，在下方的文字设置选择中文。OK确定



![](https://ww1.sinaimg.cn/large/005YhI8igy1fvnt9pnoisj30c90fpjsa)

设置类别的Windows-Translation，右侧如图选择UTF-8编码。这里要选择之前设置的服务器配置文件设置的编码。


![](https://ww1.sinaimg.cn/large/005YhI8igy1fvntbuqak3j30cy0ap0u2)

以上就是putty客户端的编码设置。


## 正常显示中文效果

经过上面一系列的设置，就可以在SSH终端中正常显示中文了
![](https://ww1.sinaimg.cn/large/005YhI8igy1fvnteux1qej30gj09s756)

## 学到的几个Linux命令

```
#全局系统环境变量配置文件
echo 'export LANG="ZH_CN.GB18030"' >>/etc/profile
```

　
```
#使配置生效
source /etc/profile
```


```
#查看结果
echo $LANG
```
## 更改脚本字符集

有时候脚本内容出现中文乱码，也可以在脚本里面更改字符集

```
#!/bin/sh
　export LANG="ZH_CN.GB18030"
　（脚本内容）
```

## 批量文件转码命令

```
iconv -c -f gbk -t utf-8 $data_path/$item_uv
```

---


最后付上原centos默认编码配置文件内容

位置

/etc/sysconfig/i18n
```
LANG=C
SYSFONT=latarcyrheb-sun16
```


参考自 

https://blog.csdn.net/wzb56_earl/article/details/24046995

https://blog.csdn.net/wusuopuBUPT/article/details/50947243
