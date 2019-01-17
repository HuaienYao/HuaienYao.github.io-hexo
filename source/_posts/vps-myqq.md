---
title: myqq3.19.zip 折腾VPS挂QQ 教程
id: 190
date: 2011-01-01 11:35:58
tags:
- QQ
- VPS
categories: 技术记录
urlname: hang-qq-on-vps
keywords: QQ,挂机
description: 本文是介绍了用Windows系统的VPS来QQ挂机。
---

这文章是转自http://bynai.com/archives/528/ 的  hostloc 上weishimi的
> myqq3.19.zip 下载地址：[http://xiaoxia.org/home/upfiles/myqq3.19.zip](http://xiaoxia.org/home/upfiles/myqq3.19.zip "http://xiaoxia.org/home/upfiles/myqq3.19.zip")
>
>
> 该程序解压之后是可以在 Windows 等操作系统下运行的、Win系统下无聊才用这个软件，不过用来熟悉熟悉还是可以的、（解压 &gt; myqq3.19 &gt; bin &gt; i386-windows &gt; myqq.exe）<!--more-->
>
>
> _（验证码文件被放在 verify文件夹下, 以QQ号命名的 png图片. 之后提到的VPS中, 验证码也需要去 verify目录下查找. ）_
>
>
> * * *
> 废话就不多说了，**下面正式来介绍VPS端通过编译该程序挂QQ：**
>
>
> 通过SSH用root帐户登录、
>
>
> **1、**首先，当然是**下载：**
>
>
> $ wget http://xiaoxia.org/home/upfiles/myqq3.19.zip
>
>
> _PS：如果下载地址失效, 自己Google一下吧;_
>
>
> **2、然后解压：**
>
>
> $ unzip myqq3.19.zip
>
>
> _PS：如果系统上没有unzip介个, 自行通过yum安装; 其中yum命令, 在不同的操作系统上, 例如debian上, 请自己更换为apt-get._
>
>
> **3、更换好记的文件名，并进入文件夹：**
>
>
> $ mv myqq3.19 qq
>
>
> $ cd qq
>
>
> **4、**编译首先**安装make**，大多数系统上都没有安装；如果有，请忽略：
>
>
> $ yum install make -y
>
>
> _PS：其中yum命令, 在不同的操作系统上, 例如debian上, 请自己更换为apt-get._
>
>
> **5、编译：**
>
>
> $ make -C src -flinux.mak clean all
>
>
> **6、**到这里为止你的VPS上就已经**成功安装myqq3.19，运行：**
>
>
> $ ./myqq
>
>
> **7、完成**，之后的就和Win系统下的差不多，当然有小小的区别、
>
>
> 至于在上面提到的验证码要在 verify文件夹下查看，你可以登录VPS管理后台，或者安装winscp FTP管理程序来下载查看、byNai这里用的是进入VPS的后台 Hypervm File Manager、目录：默认安装在 root 文件夹下 qq verify 123456.png、在下面的文章中将有截图、查看的方式多种多样，各位各显神通吧！
>
>
> myqq3.19 安装上去，挂着当然要用到 screen 命令、要不然你切断SSH，程序也就挂了、
>
>
> **8、**首先是安装，一般的都有**screen命令**，不过一些精简的系统上，还是得要安装一下的、
>
>
> $ yum install screen
>
>
> PS：在不同的操作系统上, 安装过程输入一个y 或者是两个; 其中yum命令, 例如debian上, 请自己更换为apt-get.
>
>
> 通过root登录后，输入screen命令新建窗口，进入qq目录，运行./myqq、下面简单放上几个screen命令：
>
>
> $ screen //新建窗口
>
>
> $ screen -S byNai //新建一个备注名为 byNai 的窗口
>
>
> $ screen -ls //列出被挂起的窗口, 例如: 8011.byNai (11/21/10 00:59:16) (Detached)
>
>
> $ screen -r 8011 //恢复窗口
>
>
> 按 Ctrl + a 然后再按 d 即保留窗口并退出，QQ正常的被挂着，可以通过命令恢复窗口；关闭窗口exit，或许你之前需要按 Ctrl + z
>
>
> **随便说说：**
>
>
> 老天啊！我试了 Centos 和 debian 两个系统环境，编译后运行居然发现全部乱码！囧～ 好在还能挂QQ，就没继续折腾了、只用来挂挂QQ是肯定可以的！
>
>
> 因为是乱码，我还是截图说一下登录过程吧：
>
>
> 下面图片、第一行是QQ帐号；第二行是密码；第三行是是否隐身登录；第四行无视；第五行是验证码；第六行是验证码；第七行还是验证码；……怎么都是验证码啊！汗～没办法，验证码的缩略图太小了，我看的眼睛都累、如果一直都错误下去，关掉重新运行、./myqq
>
>
> 验证码图片保存在 root qq verify 123456.png (文件名是固定的, 自动覆盖的, 在该刷新的时候刷新)
>
>
> 成功输入验证码后，然后挂Q成功了，你可以去看看这个QQ是否在线、
>
>
> 然后，没然后了、^_^ 按 Ctrl + a 再 d 然后关掉SSH睡觉吧、
>
>
> 无语，写了老半天、、
>
>
> **挂QQ过程：****挂QQ过程：**screen -S qq123 //新建一个以qq123为备注的窗口cd qq //进入QQ目录./myqq //运行QQ然后输入QQ帐号和密码，然后选择是否隐身登录（y | n），如果没有弹出好几行文字的话，那么你需要输入验证码、验证码所在的目录我在文章中已经标注了、可以用sftp登录查看、如果弹出十多行的乱码文字，基本上则证明你的QQ登录成功、按Ctrl+a，再d，保持该窗口并关闭（挂起），然后你切断SSH，QQ还是挂着的、**如何回到已挂起的窗口：**screen -ls //列出已挂起的窗口screen -r 2345 //回到已挂起的窗口，其中数字2345更换为 screen -ls 每行列出的数字、
我测试后的相关问题备份：

-----------------vps挂Q不乱码-----------------
1  先 yum update
**<span style="color: #ff0000;"> 2  关键的一步  yum install gcc  很多童鞋编译不过是因为没有gcc</span>**
3  yum install "fonts-chinese*"  安装中文字体
4  vi /etc/sysconfig/i18n 删掉里面的东西 改成
> LANG="zh_CN.GB18030"
>
> LANGUAGE="zh_CN.GB18030:zh_CN.GB2312:zh_CN"
>
> SUPPORTED="zh_CN.GB18030:zh_CN:zh"
>
> SYSFONT="lat0-sun16"
>
> SYSFONTACM="8859-15"
5  重启  具体reboot还是点按钮 自己看着办
6  按照这里面的东西安装 myqq  http://bynai.com/archives/528
7  securecrt里的utf-8 设置： 选项-会话选项-终端-外观-字符编码-utf-8

完成！！~~~
这里有个后遗症就是  出了myqq 外面的中文不显示了
所以不用myqq的时候还要把第7步的字符编码调成 default  ----------这个问题后面再解决

vps挂Q不乱码~~【centos】教程来自http://www.hostloc.com/thread-41194-1-1.html的guxin0123
