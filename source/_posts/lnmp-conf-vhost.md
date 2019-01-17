---
title: LNMP下给已存在的虚拟机添加伪静态规则
id: 198
date: 2011-02-04 11:35:01
tags:
- LNMP
- Nginx
- 伪静态
- 后端技术
categories: 技术记录
urlname: lnmp-conf-rules
keywords: LNMP,Nginx,伪静态,后端技术,虚拟主机
description: 本文记录了LNMP环境下给已存在的虚拟主机添加伪静态规则。
---

使用军哥的LNMP，在添加虚拟机的时候没有添加伪静态，但是后来真正使用程序的时候需要伪静态，所以想给已经存在的虚拟主机添加伪静态跪着，由于Apache开启伪静态支持后可以直接修改.htaccess文件就行，但是nginx需要新建一个例如名字为example.conf文件，编辑该文件，把伪静态规则输入进去（注意htaccess的伪静态规则需转成nginx的conf规则才行）然后，在/usr/local/nginx/conf/vhost下编辑 域名.conf文件，得到类似<!--more-->
server
	{
		listen       80;
		server_name ccav.in;
		index index.html index.htm index.php default.html default.htm default.php;
		root  /home/wwwroot/域名;

		include tinyurl.conf;
		location ~ .*\.(php|php5)?$
			{
				fastcgi_pass  unix:/tmp/php-cgi.sock;
				fastcgi_index index.php;
				include fcgi.conf;
			}

		location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
			{
				expires      30d;
			}

		location ~ .*\.(js|css)?$
			{
				expires      12h;
			}

		access_log off;
	}

文件，修改include other.conf 文件名称为你刚刚的include example.conf 就行
·最后执行 /usr/local/nginx/sbin/nginx -s  reload 命令重启 nginx 就OK了
