---
title: 如何申请成为Cloudflare Partner合作伙伴
tags: [CloudFlare Partner,CDN,SSL]
date: 2018-10-11 15:01:37
categories: 网络资源
urlname: become-cloudflare-partner
keywords: CloudFlare Partner,CDN,SSL,合作伙伴,CNAME解析
description: 在2017年左右，看到论坛还有一些大佬的博客在讨论申请CloudFlare Partner，当时并没多大兴趣去研究，最近因为看到越来越多人开源了面板，所以也想试试，就申请了CloudFlare Partner合作伙伴计划。本文记录了如何申请CloudFlare Partner合作伙伴计划。
---

## 什么是CloudFlare 
CloudFlare想必大家还是挺熟悉的，作为世界最大的CDN服务提供商之一，CloudFlare不但提供了免费的域名DNS解析服务，包括了HTTPS加密的免费的CDN服务，还有吊炸天的1.1.1.1 1.0.0.1的公共DNS服务。而且解析速度非常之快，我也将自己10个左右的域名托管在CloudFlare的DNS解析服务上。试过如果添加解析记录或者修改解析记录后，几乎即时生效，虽然说这样有好有坏，但是反应速度之快，真的让我吓一跳。

## 什么是CloudFlare Partner
上面提到了CloudFlare提供域名解析服务和CDN服务等，但是如果你使用的是免费套餐，必须把域名的NS服务器改为CloudFlare提供的地址，虽然大部分DNS解析服务商都是如此，但是有很多人不愿意修改DNS服务器，比如用了DNSPOD的智能解析服务，如果用NS解析来使用CloudFlare的话，就无法使用DNSPOD的解析服务。但是通过CloudFlare Partner合作伙伴计划，我们可以通过另一种方法来使用CloudFlare的DNS解析和CDN服务。

这就是通过解析cname记录来使用CloudFlare的服务。这样可以使用他们提供的SSL证书来开启HTTPS和CDN服务。
CloudFlare Partner其实就是CloudFlare为了拓展用户提供的合作分销计划。旨在为开发者或者主机提供商提供便利的API服务以拓展用户。用户不需要登录CloudFlare官网来管理域名解析，可以在WHMCS、Cpanel等面板中使用集成的Cloudflare CDN加速服务。

## 申请CloudFlare Partner
### 填写信息
申请CloudFlare Partner页面：

https://www.cloudflare.com/partners/become-a-partner/

打开后界面如下

[![](https://ww1.sinaimg.cn/large/005YhI8igy1fw4bjkwemzj310d0h5768)](https://ww1.sinaimg.cn/large/005YhI8igy1fw4bjkwemzj310d0h5768)

自上而下需要填入的信息为
- 公司名称 （这个你可以只要域名名字，比如abc.com的话写abc）
- ==业务类目== *（这里我第一次选择了Web Designer/Developer被拒绝，回信说合作伙伴计划是提供给主机提供商的服务。）
- 网址 （你自己的域名如https://abc.com）
- 名字
- 姓氏
- 职位 （这个虽然为非必填，但是我填了申请成功）
- ==联系邮箱== *（这里为重点，需要使用企业邮箱，没有的话也可以用域名邮箱。比如QQ的域名邮箱，申请方便，可以接收到信。另外邮箱格式最好为admin@abc.com这样的，虽然我用的是w@abc.com这样的）
- 联系电话 （格式为+8613912345678）
- 通过什么途径知道的 （我选择的Customer request，客户要求）
- 备注 （可以放空）

最后我填写的资料差不多是下面这样的
[![](https://ww1.sinaimg.cn/large/005YhI8igy1fw4bna1j9qj30cd0em74w)](https://ww1.sinaimg.cn/large/005YhI8igy1fw4bna1j9qj30cd0em74w)

但是我前两次申请失败了。第一次因为选择业务类目选择的网页设计者/开发者，第二次还是用一样信息只是业务类目改为VPS/服务器提供商，估计是留底了。

点击提交后你的邮箱就会收到邮件
> XXX -- [Cloudflare]: Application Received
> Dear XXX,
> 
> Thank you for applying to Cloudflare's Certified Partner Program. Your application has been submitted. We review all applications and respond shortly.
> 
> Cloudflare offers many benefits to you as a service provider:
> *   Reduced server load
> *   Bandwidth savings
> *   Fewer customer support tickets
> *   Mitigation of DDoS attacks
> *   IPv4 / IPv6 gateway
> 
> On average, a website on Cloudflare:
> *   Loads twice as fast, on an international CDN
> *   Uses 60% less bandwidth
> *   Sees 65% fewer requests
> *   Is way more secure
> 
> Thank you for your interest in Cloudflare.
> 
> Regards,
> The Cloudflare Team

第一次申请不到五个小时就回信说拒绝了
> XXX -- [Cloudflare] Application Declined
> 
> Dear XXX,
> 
> Thank you for your interest in Cloudflare's Certified Hosting Provider program. Unfortunately at this time, Cloudflare has declined your application to become a partner in this program.
> 
> The program is created for hosting providers offering commercial hosting only. I'd like to encourage you to sign up for Cloudflare directly, take a look at our plans here: www.cloudflare.com/plans
> 
> We apologize for any inconvenience that this may cause. If you feel that this decision was reached in error, please contact us at partners@cloudflare.com.
> 
> Regards,
> The Cloudflare Team

第二次只是修改了业务类目为VPS还是拒绝，但是时间花了将近5天才回复。

拒绝的原因还是一样，估计是我这个域名没有写有关主机相关的内容吧，后来看到其他人说可以通过反代一个VPS博客就可以，于是就换了一个com域名反代了一个主机博客。申请后大概过了一天回信通过。

```
[Cloudflare] Partnership Application Approved for XXX

Congratulations - you've been approved for Cloudflare's Certified Partner Program!

Follow these four steps to get up and running:


Step 1: Log into the Cloudflare Partner Portal

Set Your Password: https://partners.cloudflare.com/reset-password/XXXX

In the partner portal, you will be able to manage your and your customers' services with Cloudflare as well as use it as a central source of news and information about Cloudflare.


Step 2: Integrate your control panels, billing system, or online store

To make it easy for your customers to sign up, Cloudflare offers several options to make this easy. We have pre-created plugins for popular control panel systems like cPanel, Parallels Plesk Panel, Interworx, and ISPsystem. For other systems or for custom systems, Cloudflare offers a documented Host API with which you can integrate. 

Plugin downloads, your Host API access key, and many other resources can be found in the Cloudflare Partner Portal at: https://partners.cloudflare.com


Step 3: Preserve Original Visitor IP in Log Files

All requests to a Cloudflare protected website will come from the Cloudflare IP address ranges: http://www.cloudflare.com/ips

DO NOT THROTTLE OR RATE-LIMIT these IP addresses, or your customers' website visitors will see a "Website Offline" page.

Cloudflare passes the original visitor IP address in the header of every request. To retrieve the original visitor IP from the header, install the appropriate software on your server, you can find download links in the Cloudflare Partner Portal at https://partners.cloudflare.com. (Note: If you use the cPanel plugin and are running Apache, the visitor IP software will automatically be installed).


Step 4: Enable Cloudflare for Three Test Websites

To ensure that Cloudflare was properly installed, enable Cloudflare for three test websites from your control panel.

To check if a website is on Cloudflare, use Terminal. Open Terminal, and enter the following dig command.

    dig www.mydomain.com

Output without Cloudflare-enabled:

    www.mydomain.com   10782   IN   CNAME      www.mydomain.com

Output with Cloudflare-enabled:

    www.mydomain.com    10782  IN           CNAME   www.mydomain.com.cdn.cloudflare.net.

If you see '.cdn.cloudflare.net' at the end, then Cloudflare is enabled.


Understanding How Cloudflare Integrates:
- The plugins and API provision Cloudflare via delegating CNAMEs. Your customers continue to point their domain to your authoritative DNS servers. You do the delegation for them via the plugins or API. Note: this is different than websites that sign up at cloudflare.com directly.
- Since Cloudflare works through CNAMEs, Cloudflare cannot be enabled on the root domain, which is an A record. If your customer wants to use Cloudflare to accelerate and protect traffic going to the root domain, they must add a redirect in the .htaccess file to 'www'.
- As a reference, here is one example:

    RewriteEngine On
    # Rewrite added for CloudflareInstall - mysite.com
    # Wednesday 25th of August 2010 04:59:42 AM
    RewriteCond %{HTTP_HOST} ^mysite.com$ [NC]
    RewriteCond %{SERVER_PORT} ^80$
    RewriteRule ^(.*)$ http://www.mysite.com/$1 [R=301,L]


Support Options:
- Partner Technical Support: submit a question here: https://support.cloudflare.com/anonymous_requests/new
    (Note: select "Hosting Partners - Certified" in the dropdown menu)
- Other: email partners@cloudflare.com


Once you have installed Cloudflare and enabled three test websites, within 24 hours you will receive an email outlining next steps and a Launch Plan. We look forward to getting you up and running as a Certified Partner.


Thanks!
The Cloudflare Team
```

###  注意点
看了一些人的申请攻略，总结了以下几点
1. 申请表填写的内容全部为英文，用中文填写会导致对方看不懂而拒绝申请。
2. 业务类型选择VPS/服务器
3. 内容要和VPS/服务器有关，如果你是主机推介博客，那就可以了，没有的话可以把你的域名反代一个主机推介博客。
4. 邮箱需要企业邮箱。就是name@yourdomainname.com这种格式的。有人说用国内企业邮箱会导致收不到信，国内企业邮箱服务的确有这种可能信，但是我这次用的是QQ域名邮箱和腾讯企业邮箱都可以正常接收到邮件。
5. 关于申请理由，可填可不填，有些人说可以填写国内网络登录CloudFlare不稳定，因为客户需求，所以申请。但是我这次没填写也通过了。

## 申请通过后的步骤
通过邮件通知你申请被批准后，需要留意邮件中的链接，
> Step 1: Log into the Cloudflare Partner Portal
> 
> Set Your Password: https://partners.cloudflare.com/reset-password/XXXX

第一步就是让你点击链接进去修改密码。
接着登录进去后会让你填写问卷调查。

填完点击下一步，就会显示你的CloudFlare Partner API，再返回到主页，你就可以看到Cloudflare Partner后台了。

## 使用Cloudflare Partner部署域名

有几种办法来通过Cloudflare Partner来部署解析域名。
### 自用的情况
通过Cloudflare Partner CLI来管理
https://github.com/fffonion/cloudflare-partner-cli

### 使用他人搭建的面板
我也用Cloudflare-CNAME-Setup搭建了一个  
https://cl.guosao.com
### 开源代码搭建面板
WeiUZ CloudFlare Partners PHP版本
https://github.com/mphreys/WeiUZ

SonicBreaker
https://github.com/AxelPanda/SonicBreaker/

CFPMP
https://github.com/Netrvin/CFPMP

CloudFlare partner website with python and flask 
https://github.com/luodaoyi/CloudFlarePartner

Cloudflare Partner Panel
https://github.com/ZE3kr/Cloudflare-CNAME-Setup




## 参考
https://wzfou.com/cloudflare-partner/
