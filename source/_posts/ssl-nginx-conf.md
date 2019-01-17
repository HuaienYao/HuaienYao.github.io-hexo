---
date: 2017-10-03T06:42:21-07:00
draft: false
title: 添加SSL后Nginx的https伪静态配置多次不成功
urlname: nginx-conf-after-ssl
isCJKLanguage: true
categories: 技术记录
tags: [LNMP,Nginx,SSL,Wordpress,后端技术]
keywords: LNMP,Nginx,SSL,Wordpress,后端技术
description: 本文记录了添加SSL证书后如何配置Nginx的伪静态配置来实现https的方法。
---
### 背景
前两天给[HanaYao博客](http://www.hanayao.com "HanaYao博客")添加了SSL证书。但是经过多次测试，会出现访问带www的域名就会显示Nginx默认页面，或者是404 。多次修改伪静态配置后也还是会出现带www和不带www域名访问出现问题，或者就是进入后台会出现404。
<!--more-->
------------
### 重定向配置
但是在多次调试后。调阅Nginx官方的资料后。现在官方推荐的301重定向语法应该是
`return 301 https://$server_name$request_uri;`
并且80端口和443端口要开两个
`server{ }`
一个为

    server
        {
            listen 80;
            server_name hanayao.com www.hanayao.com;
            return 301 https://$server_name$request_uri;

        }

另一个为（以下配置为wordpress用）


    server
        {

            listen 443; #监听443端口
            server_name hanayao.com www.hanayao.com;
            index index.html index.htm index.php default.html default.htm default.php;
            root  /home/wwwroot/www.hanayao.com;
            ssl on; #开启SSL
            ssl_certificate /usr/local/nginx/conf/vhost/ssl/hanayao.pem; #刚才存放域名证书的路径
            ssl_certificate_key /usr/local/nginx/conf/vhost/ssl/hanayao.key; #存放key的路径
            include wordpress.conf;
            error_page   404   /404.html;
            include enable-php.conf;

            location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
            {
                expires      30d;
            }

            location ~ .*\.(js|css)?$
            {
                expires      12h;
            }

            location ~ /\.
            {
                deny all;
            }

            access_log  /home/wwwlogs/www.hanayao.com.log;
        }

### 调试效果
所以直接将SSL证书放在制定路径后，修改`/usr/local/nginx/conf/vhost/`下虚拟主机的配置文件conf。将以上配置粘贴进去。然后在ssh端通过 `/etc/init.d/nginx restart`可以重启Nginx或者直接用lnmp restart 直接重启整个web环境。我觉得后者还比较好用。修改ssl配置并重启后需要清楚浏览器缓存后刷新来查看效果，或者直接用chrome新建个无痕页面也可以。


参考[Nginx](https://nginx.org/en/ "Nginx")
