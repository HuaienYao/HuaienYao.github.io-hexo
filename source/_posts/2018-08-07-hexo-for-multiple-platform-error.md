---
title: 多平台维护Hexo提示node_modules错误问题
tags: [Hexo,node.js,Linux,博客程序]
date: 2018-08-07 15:55:22
categories: 技术记录
urlname: hexo-for-multiple-platform-error
keywords: node.js,Linux,Hexo,多平台,博客程序
description: 将Hexo源码文件直接移动到其他平台后使用时会出现错误。大部分是因为node组件没有安装好的原因。本文记录了Hexo移动到新平台后执行命令时出现的错误和解决办法。
---
## 背景
在将Hexo在多个平台之间移动，配置，使用的时候会遇到组件问题，如下面，在原平台可以正常使用。但是移动到新的64位Linux系统后各种错误。大部分是因为node组件没有安装好的原因。

就像之前写的两个问题
- [Linux安装nvm后无法使用nvm安装node](/article/frontend/not-able-to-install-nodejs-by-nvm/)  
- [32位Linux系统的node.js移到64位下无法使用](/article/backend/unable-to-use-nodejs-on-64-bit-os/)
<!--MORE-->
## 错误
```
root@do-sf2:/www/wwwroot/pan.guosao.com/data/User/admin/home/blog# hexo d -g
INFO  Start processing
INFO  Files loaded in 14 s
ERROR SyntaxError: Unexpected token - in file /www/wwwroot/pan.guosao.com/data/User/admin/home/blog/themes/next/layout/_partials/header/menu.swig.
Error: SyntaxError: Unexpected token - in file /www/wwwroot/pan.guosao.com/data/User/admin/home/blog/themes/next/layout/_partials/header/menu.swig.
    at Object.exports.throwError (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/swig-templates/lib/utils.js:183:9)
    at exports.Swig.precompile (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/swig-templates/lib/swig.js:504:13)
    at exports.Swig.compile (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/swig-templates/lib/swig.js:605:16)
    at exports.Swig.compileFile (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/swig-templates/lib/swig.js:695:17)
    at Object.eval [as tpl] (eval at precompile (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/swig-templates/lib/swig.js:497:13), <anonymous>:7:18)
    at compiled (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/swig-templates/lib/swig.js:618:18)
    at Object.eval [as tpl] (eval at precompile (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/swig-templates/lib/swig.js:497:13), <anonymous>:445:164)
    at compiled (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/swig-templates/lib/swig.js:618:18)
    at Theme._View.View._compiled.locals [as _compiled] (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/hexo/lib/theme/view.js:124:48)
    at Theme._View.View.View.render (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/hexo/lib/theme/view.js:29:15)
    at route.set (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/hexo/lib/hexo/index.js:386:29)
    at tryCatcher (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/bluebird/js/release/util.js:16:23)
    at /www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/bluebird/js/release/method.js:15:34
    at RouteStream._read (/www/wwwroot/pan.guosao.com/data/User/admin/home/blog/node_modules/hexo/lib/hexo/router.js:134:3)
    at RouteStream.Readable.read (_stream_readable.js:449:10)
    at resume_ (_stream_readable.js:888:12)
    at process._tickCallback (internal/process/next_tick.js:63:19)

```
## 原因

出现上面的错误的原因是在移动到新平台后没有在博客目录下执行`npm install`来安装nodejs组件。导致无法正常生成页面。

## 解决办法
### npm install
只需要执行`npm install`就可以，但是如果出现下面的提示，会提示让你执行`npm audit fix` 来自动修复检测到的漏洞。

```
# npm install
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

audited 5350 packages in 7.802s
found 4 moderate severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details

```

### npm audit fix

```
# npm audit fix
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

up to date in 5.927s
fixed 0 of 4 vulnerabilities in 5350 scanned packages
  4 vulnerabilities required manual review and could not be updated

```


注：

> npm audit 是 npm 6 新增的一个命令，可以允许开发人员分析复杂的代码并查明特定的漏洞。在刚刚发布的 npm 6.1.0 版本中，开发团队对该命令进行了完善。现在可使用 npm audit fix 子命令自动修复检测到的漏洞，而不必再自己进行跟踪和修复。  
> 新版本针对 npm audit 还包括以下改进：  
> - npm audit --json —— 新的子命令，用于以 JSON 格式打印报告 
> - npm install 摘要输出中将包含审计软件包的数量
> - npm-audit-report@1.2.1 —— 对审计安装和输出格式进行了大幅调整，新格式更加紧凑，更符合 CLI 视觉风格，同时仍然提供所需的重要信息。 

> 此外，npm 6.1.0 同样扩展了 npm init 命令的功能，新增对 git 包的支持，即 npm init name。

参考：https://www.oschina.net/news/96421/npm-6-1-0-released