---
title: 32位Linux系统的node_modules文件夹移到64位系统下报错
tags: [node.js,Linux,后端技术]
date: 2018-08-07 14:55:22
categories: 技术记录
urlname: unable-to-use-nodejs-on-64-bit-os
keywords: node.js,Linux,node_modules,后端技术
description: 在32位Linux系统下的node_modules文件夹直接移动到64位Linux系统下无法直接使用，需要重新配置64位Linux系统用的环境。本文记录了32位Linux系统的node.js移到64位下无法使用的解决过程。
---

## 背景
把Hexo博客源码整个从32位的Linux系统搬到64位系统下，本来还没发现32位和64位，直到执行hexo clean的时候提示错误才发现。node_modules文件夹的指定模块报错。

<!--MORE-->
```
# hexo clean
ERROR Plugin load failed: hexo-generator-amp
Error: Missing binding /blog/node_modules/node-sass/vendor/linux-x64-64/binding.node
Node Sass could not find a binding for your current environment: Linux 64-bit with Node.js 10.x

Found bindings for the following environments:
  - Linux 32-bit with Node.js 8.x

This usually happens because your environment has changed since running `npm install`.
Run `npm rebuild node-sass` to download the binding for your current environment.
    at module.exports (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/node-sass/lib/binding.js:15:13)
    at Object.<anonymous> (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/node-sass/lib/index.js:14:35)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (internal/modules/cjs/helpers.js:20:18)
    at Object.<anonymous> (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/hexo-generator-amp/lib/templatePath.js:4:22)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (internal/modules/cjs/helpers.js:20:18)
    at Object.<anonymous> (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/hexo-generator-amp/lib/generator.js:5:24)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
INFO  Deleted database.
INFO  Deleted public folder.

```
## 错误信息
主要就是下面这两句


```
Node Sass could not find a binding for your current environment: Linux 64-bit with Node.js 10.x

Found bindings for the following environments:
  - Linux 32-bit with Node.js 8.x
```
> 就是node sass找不到适合你现在Linux 64位系统的环境捆绑，
> 当前找到的是适合32位Linux系统的。

## 解决方法
里面也附带了解决的办法


```
This usually happens because your environment has changed since running `npm install`.
Run `npm rebuild node-sass` to download the binding for your current environment.
```
这通常是因为你换了环境然后执行`npm install`导致。
执行`npm rebuild node-sass` 来下下载适合你的当前环境的捆绑。


```
root@do-sf2:/www/wwwroot/pan.guosao.com/data/User/admin/home/blog# npm rebuild node-sass

> node-sass@4.9.2 install /www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/node-sass
> node scripts/install.js

Downloading binary from https://github.com/sass/node-sass/releases/download/v4.9.2/linux-x64-64_binding.node
Download complete  ] - :
Binary saved to /www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/node-sass/vendor/linux-x64-64/binding.node
Caching binary to /root/.npm/node-sass/4.9.2/linux-x64-64_binding.node

> node-sass@4.9.2 postinstall /www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/node-sass
> node scripts/build.js

Binary found at /www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/node-sass/vendor/linux-x64-64/binding.node
Testing binary
Binary is fine
node-sass@4.9.2 /www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/node-sass
root@do-sf2:/www/wwwroot/pan.guosao.com/data/User/admin/home/blog# hexo clean
INFO  Deleted database.

```
执行后就可以正常使用了。


