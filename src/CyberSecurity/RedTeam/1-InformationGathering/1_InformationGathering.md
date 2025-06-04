---
category: 网络安全
tag: 红队
---

# 1-信息收集方法

> 会持续更新

从广度和深度两个阶段，整理一些信息收集的方法。

<!-- more -->

## 1. 广度信息收集

### 1.1 Whois 信息

[Whois](https://www.whois.com/) 可以查询域名是否被注册，以及注册域名的详细信息的数据库，其中可能会存在一些有用的信息，例如域名所有人、域名注册商、邮箱等。

- 站长之家: http://whois.chinaz.com
- Bugscaner: http://whois.bugscaner.com
- 国外在线: https://bgp.he.net

### 1.2 域名历史 IP

Nslookup 微步在线：https://x.threatbook.cn/

### 1.3 企业信息

- 小蓝本: https://www.xiaolanben.com/pc
- 企查查: https://www.qichacha.com
- 天眼查: https://www.tianyancha.com
- 爱企查: https://aiqicha.baidu.com

* 企业信用信息公示系统
* 企业邮箱收集
* 企业架构画像、人员统计、职责、部门、wifi
* 常用部门密码、人员是否泄露过密码
* 人员平时爱逛站点
* 网络安全设备（waf、ips、ids、router 等）
* 内部使用的代码托管平台、hug 管理平台、OA/erp/crm/sso/mail/vpn 等入口
* 服务器域名资产统计

### 1.4 子域名

泛解析是把 \*.example.com 的所有 A 记录都解析到某个 IP 地址上，在子域名枚举时需要处理这种情况以防生成大量无效的记录。

网络中有相当多的第三方应用提供了子域的查询功能：

- DNSDumpster：https://dnsdumpster.com/
- Virustotal：https://www.virustotal.com/
- CrtSearch
- threatminer
- Censys
- OneForAll: https://github.com/shmilylty/OneForAll
- layer 子域名探测
- https://phpinfo.me/domain/
- https://site.ip138.com/chinacycc.com/domain.htm
- knock.py

* Amass: https://github.com/OWASP/Amass
* Subfinder: https://github.com/projectdiscovery/subfinder
* ksubdomain: https://github.com/knownsec/ksubdomain
* subDomainsBrute: https://github.com/lijiejie/subDomainsBrute
* Sonar: https://omnisint.io/
* 查子域: https://chaziyu.com/ (在线)

### 1.4 旁站

- 在线: http://stool.chinaz.com/same
- 在线: https://site.ip138.com

### 1.5 真实 IP（CDN）

#### 1. CDN 验证

可通过多地 ping 的方式确定目标是否使用了 CDN，常用的网站有 http://ping.chinaz.com/

https://asm.ca.com/en/ping.php 等。

#### 2. 域名查找

使用了 CDN 的域名的父域或者子域名不一定使用了 CDN，可以通过这种方式去查找对应的 IP。

#### 3. 历史记录查找

CDN 可能是在网站上线一段时间后才上线的，可以通过查找域名解析记录的方式去查找真实 IP。

#### 4. 邮件信息

通过社会工程学的方式进行邮件沟通，从邮件头中获取 IP 地址，IP 地址可能是网站的真实 IP 或者是目标的出口 IP。

#### 5. 利用工具

- 全球 ping: https://www.wepcc.com
- dns 检测: https://tools.ipip.net/dns.php
- Xcdn: https://github.com/3xp10it/xcdn
- 在线: https://ipchaxun.com

### 1.6 敏感信息

#### 1. 网页源码

网页源码可能存在敏感信息泄露

#### 2. Googlehack 语法

- 后台地址

```
site:xxx.com intitle:管理|后台|登陆|管理员|系统|内部
site:xxx.com inurl:login|admin|system|guanli|denglu|manage|admin_login|auth|dev
```

- 敏感文件

```
site:xxx.com (filetype:doc OR filetype:ppt OR filetype:pps OR filetype:xls OR filetype:docx OR filetype:pptx OR filetype:ppsx OR filetype:xlsx OR filetype:odt OR filetype:ods OR filetype:odg OR filetype:odp OR filetype:pdf OR filetype:wpd OR filetype:svg OR filetype:svgz OR filetype:indd OR filetype:rdp OR filetype:sql OR filetype:xml OR filetype:db OR filetype:mdb OR filetype:sqlite OR filetype:log OR filetype:conf)
```

- 测试环境

```
site:xxx.com inurl:test|ceshi
site:xxx.com intitle:测试
```

- 邮箱

```
site:xxx.com (intitle:"Outlook Web App" OR intitle:"邮件" OR inurl:"email" OR inurl:"webmail")
```

- 其他

```
site:xxx.com inurl:api|uid=|id=|userid=|token|session
site:xxx.com intitle:index.of "server at"
```

#### 3. Github

- @xxx.com password/secret/credentials/token/config/pass/login/ftp/ssh/pwd
- @xxx.com security_credentials/connetionstring/JDBC/ssh2_auth_password/send_keys

#### 4. 网盘引擎

- 超能搜: https://www.chaonengsou.com

#### 5. 备份文件

文件格式 www.zip xx.com.zip www.xx.com.zip wwwroot.zip .svn/.git/sql/robots/crossdomin.xml/DS_Store 等

    *  https://github.com/lijiejie/ds_store_exp
    *  https://github.com/admintony/svnExploit

#### 6. 历史泄露过的资料

- Https://havaibeenpwned.com/
- https://github.com/kernelmachine/havaibeenpwned

#### 7. Github/Gitee 等代码托管平台

- https://github.com/lijiejie/GitHack
- https://github.com/MiSecurity/x-patrol
- https://github.com/az0ne/Github_Nuggests
- https://github.com/mazen160/GithubCloner

### 1.7 空间引擎搜索

- FOFA: https://fofa.so
- Quake: https://quake.360.cn/quake/#/index
- Hunter: https://hunter.qianxin.com
- Shadon: https://www.shodan.io
- ZoomEye: https://www.zoomeye.org

### 1.8 SSL 证书信息

- https://crt.sh/?q=%25.target.com
- https://censys.io/certificates?q=target.com
- https://github.com/cheetz/sslScrape

### 1.9 历史漏洞

- 乌云镜像: https://wooyun.x10sec.org
- Seebug: https://www.seebug.org
- Exploit Database: https://www.exploit-db.com
- Vulners: https://vulners.com
- Sploitus: https://sploitus.com

### 1.10 APP

- 小蓝本: https://www.xiaolanben.com/pc
- 七麦: https://www.qimai.cn
- AppStore: https://www.apple.com/app-store
- APP 反编译 搜索/截取 APP 的请求信息

### 1.11 小程序公众号

- 微信直接搜索
- 小蓝本: https://www.xiaolanben.com/pc
- 搜狗: https://weixin.sogou.com

### 1.13 端口+C 段

- Nmap: https://nmap.org
- Fscan: https://github.com/shadow1ng/fscan
- Txportmap: https://github.com/4dogs-cn/TXPortMap
- Masscan: https://github.com/robertdavidgraham/masscan

### 1.14 蜜罐判断

- https://honeyscore.shodan.io/

### 1.15 默认密码

- https://defualt-password.info/
- http://routerpasswords.com

### 1.16 需要注册时

sms

- https://www.materialtools.com/

- http://receivefreesms.com/

email

- https://10minutemail.net/

- https://zn.mytrashmailer.com/

- http://24mail.chacuo.net.enus

- https://www.linshiyouxiang.net/

Fake id

- https://www.fakenamegenerator.com/
- http://www.haoweichi.com/
- https://www.fakeaddressgenerator.com/

## 2. 深度信息收集

### 2.1 指纹识别

- 网页源代码、浏览器插件 findsomething、网站报错信息
- 请求头/响应头
- 浏览器插件: Wappalyzer whatruns
- 云悉: http://www.yunsee.cn
- EHole: https://github.com/EdgeSecurityTeam/EHole
- TideFinger: https://github.com/TideSec/TideFinger
- ObserverWard:https://github.com/0x727/ObserverWard_0x727
- Webfinger: https://github.com/se55i0n/Webfinger
- FingerPrint: https://github.com/tanjiti/FingerPrint
- WTFScan: https://github.com/dyboy2017/WTF_Scan
- WebEye: https://github.com/zerokeeper/WebEye/
- Dayu: https://github.com/Ms0x0/Dayu
-

### 2.2 Title 识别

- HTTPX: https://github.com/projectdiscovery/httpx
- WebBatchRequest: https://github.com/ScriptKid-Beta/WebBatchRequest
- Bscan: https://github.com/broken5/bscan

### 2.3 目录扫描

- Dirsearch: https://github.com/maurosoria/dirsearch
- Dirmap: https://github.com/H4ckForJob/dirmap

### 2.4 JS 接口

- JSFinder: https://github.com/Threezh1/JSFinder
- URLFinder: https://github.com/pingc0y/URLFinder
- LinkFinder: https://github.com/GerbenJavado/LinkFinder
- Packer-Fuzzer: https://github.com/rtcatc/Packer-Fuzzer (webpack)
- 搜索关键接口

1. config/api
2. method:"get"
3. http.get("
4. method:"post"
5. http.post("
6. $.ajax
7. service.httppost
8. service.httpget

### 2.5 WAF 识别

- WhatWaf: https://github.com/Ekultek/WhatWaf
- wafw00f: https://github.com/EnableSecurity/wafw00f
- 百度搜 WAF 图

### 2.7 社会工程学

基于之前收集到的信息，可以使用 Office/CHM/RAR/EXE/快捷方式等文件格式制作钓鱼邮件发送至目标，进一步收集信息。

- Office 可以使用 Office 漏洞、宏、OLE 对象、PPSX 等方式构造利用文件。

- Exe 可以使用特殊的 Unicode 控制字符如 RLO (Right-to-Left Override) 等来构建容易混淆的文件名。

- RAR 主要是利用自解压等方式来构建恶意文件，同样加密的压缩包也在一定程度上可以逃逸邮件网关的检测。

如果前期信息收集获取到了运维等人员的邮箱，可以使用运维人员的邮箱发送，如果未收集到相关的信息，可以使用伪造发送源的方式发送邮件。

需要注意的是，**钓鱼测试也需要注意合规问题**，不能冒充监管单位、不能发送违法违规信息。具体可以参考**《中华人民共和国电信条例》**、**《中华人民共和国互联网电子邮件服务管理办法》**等法律法规。

---

## 3. 信息收集平台

- ARL: https://github.com/TophantTechnology/ARL
- ARL-plus: https://github.com/ki9mu/ARL-plus-docker
- ShuiZe: https://github.com/0x727/ShuiZe_0x727
- BBOT: https://github.com/blacklanternsecurity/bbot

---

## 4. 漏洞扫描工具

- Goby: https://gobies.org
- Xray: https://github.com/chaitin/xray
- afrog: https://github.com/zan8in/afrog
- Nuclei: https://github.com/projectdiscovery/nuclei
