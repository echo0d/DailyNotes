import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,b as t,a as s,d as e,e as o,r,o as c}from"./app-ClR9AqGF.js";const i="/DailyNotes/assets/1714031873953-e7f8558e-f935-4d35-a617-fc53dc540975-C0wDylTz.png",d="/DailyNotes/assets/image-20240813200317802-oH-R8U-f.png",u="/DailyNotes/assets/image-20240813200437702-Bcr91QOm.png",k="/DailyNotes/assets/1719795932297-1f5702e5-6ef9-4120-829d-0deb7c5717d1-WaFmVndN.png",g="/DailyNotes/assets/1719796050917-d0775ee5-9392-48c9-8e38-634790d95f2c-yag2Wsrt.png",m="/DailyNotes/assets/1720432875735-64520777-a548-45ca-b3ee-8c36b5570154-EqFASTha.png",h="/DailyNotes/assets/1720432875064-58f7b5ff-05b2-4718-9a84-45a231996fba-Bddpd3Ti.png",b="/DailyNotes/assets/1714031874129-7ec2aca1-2876-45f7-a795-a8f8410744b6-kc_AcopC.png",f="/DailyNotes/assets/1714031874195-45122c1c-cc90-4e4e-b9d0-6289b8e49f6a-CY5CCB0K.png",w="/DailyNotes/assets/1714031874259-c5f82220-0f0c-404a-aba3-af1deb696e15-DwMUTr25.png",x="/DailyNotes/assets/1714375453271-e7299492-f81c-465f-9b35-26ef5e833b94-Du0-9VRI.webp",v="/DailyNotes/assets/1714375453409-b6275452-e4c7-4f99-b0a7-32c5b6139eac-Cd93bV0i.webp",y="/DailyNotes/assets/1714375453304-82f5c2cb-c3c7-42be-b1fa-8bb09052c7d2-CJNioCmG.webp",S="/DailyNotes/assets/1716184459191-081d7284-842c-4768-9d43-bfb7196f45a0-K-fk-IzD.png",D="/DailyNotes/assets/1716184459174-a993f228-5788-4775-a41e-e2bc642e1f8a-OudJikHs.png",q="/DailyNotes/assets/1716184459211-8026f27e-c4ef-4332-80b8-6dac62ba7976-BUhZA7tv.png",_="/DailyNotes/assets/1718589291687-f465ce8d-0e85-4168-874d-89381da303b3-BglC2VNq.png",P="/DailyNotes/assets/1718589173243-bf6e8d29-4421-4fbd-aec8-344aa6155366-YkDoY60w.png",E="/DailyNotes/assets/windows_security_alert-B-rd3unz.png",T={},C={href:"https://blog.csdn.net/liweigao01/article/details/94488191",target:"_blank",rel:"noopener noreferrer"},N={href:"https://eastmonster.github.io/2022/10/05/clash-config-in-wsl/",target:"_blank",rel:"noopener noreferrer"},O={href:"https://s2.loli.net/2024/01/22/sla3HO9UVu4wozn.png",target:"_blank",rel:"noopener noreferrer"},L={href:"https://s2.loli.net/2024/01/24/Y9DhxRw47tzlWIH.png",target:"_blank",rel:"noopener noreferrer"},G={href:"https://github.com/microsoft/WSL/releases/tag/2.0.5",target:"_blank",rel:"noopener noreferrer"},M={href:"https://learn.microsoft.com/zh-cn/windows/wsl/networking#mirrored-mode-networking",target:"_blank",rel:"noopener noreferrer"},A={href:"https://cloud.tencent.com/developer/article/1854430",target:"_blank",rel:"noopener noreferrer"},W={href:"https://kalacloud.com/blog/how-to-install-and-use-docker-on-ubuntu/",target:"_blank",rel:"noopener noreferrer"},I={href:"https://docs.docker.com/engine/install/debian/#install-using-the-repository",target:"_blank",rel:"noopener noreferrer"},H={href:"https://download.docker.com/linux/debian/dists/",target:"_blank",rel:"noopener noreferrer"},z={href:"https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-posix/sjlj/x86_64-8.1.0-release-posix-sjlj-rt_v6-rev0.7z",target:"_blank",rel:"noopener noreferrer"},R={href:"https://sourceforge.net/projects/mingw-w64/files/",target:"_blank",rel:"noopener noreferrer"},$={href:"https://fuxiaochen.com/blog/fix-sqlite-requires-cgo",target:"_blank",rel:"noopener noreferrer"},V={href:"https://blog.csdn.net/asc_123456/article/details/125424500",target:"_blank",rel:"noopener noreferrer"};function U(B,n){const a=r("ExternalLinkIcon");return c(),p("div",null,[n[30]||(n[30]=t(`<h1 id="日常技巧" tabindex="-1"><a class="header-anchor" href="#日常技巧"><span>日常技巧</span></a></h1><p>这里记录一些常用的小技巧</p><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2><h3 id="如何让-windows-的-cmd-拥有-linux-的命令" tabindex="-1"><a class="header-anchor" href="#如何让-windows-的-cmd-拥有-linux-的命令"><span>如何让 windows 的 cmd 拥有 linux 的命令</span></a></h3><p>安装 git，然后把 git 的如下路径添加到 Path 环境变量</p><pre><code>******\\Git\\usr\\bin
</code></pre><h3 id="git-批量修改提交人信息" tabindex="-1"><a class="header-anchor" href="#git-批量修改提交人信息"><span>Git 批量修改提交人信息</span></a></h3><pre><code>git filter-branch --env-filter &#39;export GIT_AUTHOR_EMAIL=yourname@163.com&#39; --
git filter-branch --env-filter &#39;export GIT_COMMITTER_EMAIL=yourname@163.com&#39; --
git filter-branch -f --env-filter &#39;export GIT_COMMITTER_NAME=yourname&#39; --
git filter-branch -f --env-filter &#39;export GIT_AUTHOR_NAME=yourname&#39; --
git push -f origin main
</code></pre><h3 id="powershell-修改-profile" tabindex="-1"><a class="header-anchor" href="#powershell-修改-profile"><span>Powershell 修改 profile</span></a></h3><ul><li>所有用户，所有主机 - $PSHOME\\Profile.ps1</li><li>所有用户，当前主机 - $PSHOME\\Microsoft.PowerShell_profile.ps1</li><li>当前用户，所有主机 - $HOME\\Documents\\WindowsPowerShell\\Profile.ps1</li><li>当前用户，当前主机 - $HOME\\Documents\\WindowsPowerShell\\Microsoft.PowerShell_profile.ps1</li></ul><p>例如</p><pre><code>notepad $PSHOME\\Microsoft.PowerShell_profile.ps1
</code></pre><h3 id="cmd-和-powershell-显示执行命令时间" tabindex="-1"><a class="header-anchor" href="#cmd-和-powershell-显示执行命令时间"><span>CMD 和 Powershell 显示执行命令时间</span></a></h3><p>Powershell：将如下代码添加到 profile 文件</p><pre><code>function prompt {
    # 显示当前时间
    $currentTime = Get-Date -Format &quot;yyyy-MM-dd HH:mm:ss&quot;
    Write-Host &quot;Time: $currentTime&quot; -NoNewline -ForegroundColor Green

    # PowerShell默认提示符
    &quot; PS $($executionContext.SessionState.Path.CurrentLocation)$(&#39;&gt;&#39; * ($nestedPromptLevel + 1)) &quot;
}
</code></pre><p><img src="`+i+`" alt="" loading="lazy"> CMD：新建一个系统变量 PROMPT 值填入 <code>$T$S$P$G</code>并保存，然后重启 CMD</p><h3 id="某应用添加到右键" tabindex="-1"><a class="header-anchor" href="#某应用添加到右键"><span>某应用添加到右键</span></a></h3><p>以 Typora 为例，右键某文件夹，以 Typora 打开：</p><pre><code>Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\\Directory\\shell\\Typora]
@=&quot;Open in Typora&quot;
&quot;Icon&quot;=&quot;D:\\\\install\\\\Typora\\\\resources\\\\assets\\\\app.ico&quot;

[HKEY_CLASSES_ROOT\\Directory\\shell\\Typora\\command]
@=&quot;\\&quot;D:\\\\install\\\\Typora\\\\Typora.exe\\&quot; \\&quot;%1\\&quot;&quot;
</code></pre><p>右键文件夹里的空白处，以 Typora 打开：</p><pre><code>Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\Typora]
@=&quot;Open in Typora&quot;
&quot;Icon&quot;=&quot;\\&quot;D:\\\\install\\\\Typora\\\\resources\\\\assets\\\\app.ico\\&quot;&quot;

[HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\Typora\\command]
@=&quot;\\&quot;D:\\\\install\\\\Typora\\\\Typora.exe\\&quot; \\&quot;%V\\&quot;&quot;
</code></pre><h3 id="使用-xrdp-连接-ubuntu-桌面优化-黑屏解决" tabindex="-1"><a class="header-anchor" href="#使用-xrdp-连接-ubuntu-桌面优化-黑屏解决"><span>使用 xrdp 连接 ubuntu 桌面优化&amp;黑屏解决</span></a></h3><p>如果不做任何配置，启动之后的桌面是非常别扭的，因为是 Gnome 的原始桌面，没有左侧的任务栏，窗口也没有最小化按钮，等等一些列问题。解决方案也很简单：</p><pre><code class="language-shell"><span class="token function">vim</span> ~/.xsessionrc
<span class="token comment"># 添加：</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GNOME_SHELL_SESSION_MODE</span><span class="token operator">=</span>ubuntu
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">XDG_CURRENT_DESKTOP</span></span><span class="token operator">=</span>ubuntu:GNOME
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">XDG_CONFIG_DIRS</span></span><span class="token operator">=</span>/etc/xdg/xdg-ubuntu:/etc/xdg
<span class="token comment"># 重启xrdp</span>
<span class="token function">sudo</span> systemctl restart xrdp.service
</code></pre><p>一定要在上面步骤执行完后再改下面的，否则还是黑屏，否则需要 reboot 主机。 <strong>当你的本机没有注销的话，远程桌面就会黑屏</strong>，最佳解决策略就是退出本地登录，也就是注销登录。或者</p><pre><code class="language-shell"><span class="token function">sudo</span> <span class="token function">vim</span> /etc/xrdp/startwm.sh
<span class="token comment"># 添加配置</span>
<span class="token builtin class-name">unset</span> <span class="token environment constant">DBUS_SESSION_BUS_ADDRESS</span>
<span class="token builtin class-name">unset</span> <span class="token environment constant">XDG_RUNTIME_DIR</span>
<span class="token comment"># 重启xrdp</span>
<span class="token function">sudo</span> systemctl restart xrdp.service
</code></pre><h3 id="xrdp-卡顿解决" tabindex="-1"><a class="header-anchor" href="#xrdp-卡顿解决"><span>xrdp 卡顿解决</span></a></h3><pre><code class="language-shell"><span class="token function">vim</span> /etc/sysctl.conf
<span class="token comment"># 添加</span>
net.core.rmem_max <span class="token operator">=</span> <span class="token number">12582912</span>
net.core.wmem_max <span class="token operator">=</span> <span class="token number">8388608</span>
<span class="token comment"># 执行</span>
<span class="token function">sudo</span> <span class="token function">sysctl</span> <span class="token parameter variable">-p</span>
<span class="token comment"># 重启 xrdp 服务生效</span>
<span class="token function">sudo</span> systemctl restart xrdp
</code></pre><h3 id="ubuntu-下-wireshark-添加-root-权限" tabindex="-1"><a class="header-anchor" href="#ubuntu-下-wireshark-添加-root-权限"><span>ubuntu 下 wireshark 添加 root 权限</span></a></h3><p>wireshark 要监控 eth0，但是必须要 root 权限才行。但是，直接用 root 运行程序是相当危险，也是非常不方便的。解决方法如下：</p><ol><li>添加 wireshark 用户组 <code>sudo groupadd wireshark </code></li><li>将 dumpcap 更改为 wireshark 用户组 <code>sudo chgrp wireshark /usr/bin/dumpcap </code></li><li>让 wireshark 用户组有 root 权限使用 dumpcap <code>sudo chmod 4755 /usr/bin/dumpcap </code></li><li>将需要使用的用户名加入 wireshark 用户组，我的用户名是 craftor <code>sudo gpasswd -a craftor wireshark </code></li></ol>`,31)),s("p",null,[n[1]||(n[1]=e("参考：",-1)),s("a",C,[n[0]||(n[0]=e("ubuntu 下 wireshark 添加 root 权限_wireshark 加入到 root 组里面-CSDN 博客",-1)),o(a)])]),n[31]||(n[31]=t('<h3 id="vmware-启动报错-0xc000007b" tabindex="-1"><a class="header-anchor" href="#vmware-启动报错-0xc000007b"><span>Vmware 启动报错 ‘0xc000007b‘</span></a></h3><p>原因：</p><p>C++库改变。</p><p>解决方法：</p><p>windows 打开控制面板，然后打开程序，卸载程序(图中左下角)。然后找到图中两个 C++程序，分别右键，卸载，系统会弹出安装/卸载程序，然后<strong>点击修复</strong>。</p><figure><img src="'+d+'" alt="image-20240813200317802" tabindex="0" loading="lazy"><figcaption>image-20240813200317802</figcaption></figure><figure><img src="'+u+`" alt="image-20240813200437702" tabindex="0" loading="lazy"><figcaption>image-20240813200437702</figcaption></figure><h3 id="kali-zsh-切换为-bash" tabindex="-1"><a class="header-anchor" href="#kali-zsh-切换为-bash"><span>Kali zsh 切换为 bash</span></a></h3><p>查看当前 shell</p><pre><code class="language-bash"><span class="token builtin class-name">echo</span> <span class="token environment constant">$SHELL</span>
</code></pre><p>查看系统中是否有 bash 文件</p><pre><code class="language-bash"><span class="token function">ls</span> /bin/bash
</code></pre><p>切换 bash shell</p><pre><code class="language-bash">chsh <span class="token parameter variable">-s</span> /bin/bash
</code></pre><p>重启终端</p><p>注：仅当前用户切换成 bash shell，如其他用户切换，请切换的其他用户执行上述操作</p><h3 id="cursor-安装到-d-盘" tabindex="-1"><a class="header-anchor" href="#cursor-安装到-d-盘"><span>Cursor 安装到 D 盘</span></a></h3><pre><code class="language-powershell"><span class="token function">Start-Process</span> <span class="token operator">-</span>FilePath <span class="token string">&quot;.\\Cursor Setup 0.44.11 - x64.exe&quot;</span> <span class="token operator">-</span>ArgumentList <span class="token operator">/</span>D=<span class="token string">&quot;D:\\Cursor&quot;</span> <span class="token operator">-</span>Wait
</code></pre><p>但感觉他还是在 C 盘到处拉屎</p><h2 id="wsl-相关" tabindex="-1"><a class="header-anchor" href="#wsl-相关"><span>WSL 相关</span></a></h2><h3 id="wsl-制作快照和回滚" tabindex="-1"><a class="header-anchor" href="#wsl-制作快照和回滚"><span>WSL 制作快照和回滚</span></a></h3><pre><code class="language-shell"><span class="token comment"># 查看已安装的系统</span>
wsl <span class="token parameter variable">-l</span> <span class="token parameter variable">-v</span>
<span class="token comment"># 做快照</span>
wsl <span class="token parameter variable">--export</span> Ubuntu-18.04 d:<span class="token punctuation">\\</span>wsl-ubuntu18.04.tar

<span class="token comment"># 注销当前系统</span>
wsl <span class="token parameter variable">--unregister</span> Ubuntu-18.04
<span class="token comment"># 回滚</span>
wsl <span class="token parameter variable">--import</span> Ubuntu-18.04 d:<span class="token punctuation">\\</span>wsl d:<span class="token punctuation">\\</span>wsl-ubuntu18.04.tar <span class="token parameter variable">--version</span> <span class="token number">2</span>
<span class="token comment"># 设置默认登陆用户为安装时用户名</span>
ubuntu1804 config --default-user USERNAME
<span class="token comment"># 如果是ubuntu20.04，命令ubuntu1804改为ubuntu2004即可；USERNAME是登录用户名称，如Raymond</span>

</code></pre><h3 id="wsl-启动目录修改" tabindex="-1"><a class="header-anchor" href="#wsl-启动目录修改"><span>WSL 启动目录修改</span></a></h3><p><img src="`+k+`" alt="image.png" loading="lazy"> 路径是</p><pre><code class="language-bash">//wsl$/加wsl里虚拟机的路径
</code></pre><p>类似这样 <img src="`+g+`" alt="image.png" loading="lazy"></p><h3 id="wsl2-kali-安装报错" tabindex="-1"><a class="header-anchor" href="#wsl2-kali-安装报错"><span>WSL2 kali 安装报错</span></a></h3><p>我是从 MS Store 安装的，下载后点击打开，弹出 cmd 窗口 报错信息：</p><pre><code class="language-powershell">Installing<span class="token punctuation">,</span> this may take a few minutes<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
WslRegisterDistribution failed with error: 0x80004005
Error: 0x80004005 ???????

Press any key to <span class="token keyword">continue</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

</code></pre><p>解决方法：</p><ol><li><strong>将 LxssManager 服务修改为自动启动</strong></li></ol><p>从服务中修改会提示“拒绝访问”，所以从注册表改： win + R -&gt; regedit -&gt; \\HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\LxssManager -&gt; 右键 Start 项 -&gt; 将值修改为 2 默认为 3</p><ol start="2"><li><strong>更新 wsl</strong></li></ol><p>管理员启动 powershell</p><pre><code class="language-powershell">wsl <span class="token operator">--</span>update
</code></pre><p>成功安装，再次点击打开即可正常</p><h3 id="wsl2-安装后-kali-里没工具" tabindex="-1"><a class="header-anchor" href="#wsl2-安装后-kali-里没工具"><span>WSL2 安装后 kali 里没工具</span></a></h3><p>WSL2 默认的 kali 基本没什么工具，所以这里手动安装，工具集约 7G</p><pre><code class="language-shell"><span class="token comment">#更新源</span>
<span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token comment"># 安装</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> kali-linux-all
<span class="token comment"># 注意：新版本中kali-linux-all更名为kali-linux-everything</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> kali-linux-everything
</code></pre><h3 id="wsl-安装-kali-后安装-docker-报错" tabindex="-1"><a class="header-anchor" href="#wsl-安装-kali-后安装-docker-报错"><span>WSL 安装 kali 后安装 docker 报错</span></a></h3><p>安装 docker</p><pre><code class="language-bash"><span class="token function">apt-get</span> <span class="token function">install</span> docker.io
</code></pre><p>使用 systemctl 命令报错：</p><pre><code class="language-shell">xxxx@xxxxx:~$ systemctl start <span class="token function">docker</span>
System has not been booted with systemd as init system <span class="token punctuation">(</span>PID <span class="token number">1</span><span class="token punctuation">)</span>. Can&#39;t operate.
Failed to connect to bus: Host is down
</code></pre><p>可能是因为这个 Ubuntu 系统并没有使用 systemd，可能使用的是 SysV init（sysvinit）初始化系统。 通过如下命令查看：CMD 列，显示 init，可以确定使用的是 SysV init 初始化系统。</p><pre><code>ps -p 1
</code></pre><p>SysV init：如果您的系统使用 SysVinit 作为 init 系统，您可以使用 service 命令来管理和检查服务状态。例如，要检查 Docker 服务状态，可以运行：</p><pre><code class="language-bash"><span class="token function">sudo</span> <span class="token function">service</span> <span class="token function">docker</span> status
</code></pre><p>还是想要使用 systemd，在 WSL 中启用 systemd</p><pre><code class="language-bash"><span class="token comment"># 更新WSL到最新版</span>
wsl <span class="token parameter variable">--update</span>
<span class="token comment"># 查看版本</span>
wsl <span class="token parameter variable">--version</span>
</code></pre><p>然后在 Ubuntu 实例中，打开或者添加/etc/wsl.conf 文件(没有就新建)</p><pre><code class="language-bash"><span class="token punctuation">[</span>boot<span class="token punctuation">]</span>
<span class="token assign-left variable">systemd</span><span class="token operator">=</span>true
</code></pre><p>重新启动 wsl 即可。</p><h3 id="wsl2-使用主机的-clash-代理" tabindex="-1"><a class="header-anchor" href="#wsl2-使用主机的-clash-代理"><span>WSL2 使用主机的 clash 代理</span></a></h3>`,54)),s("p",null,[s("a",N,[n[2]||(n[2]=e("https://eastmonster.github.io/2022/10/05/clash-config-in-wsl/",-1)),o(a)])]),s("ol",null,[s("li",null,[n[7]||(n[7]=e("在 Clash 客户端内的操作 打开客户端的允许局域网连接 (Allow LAN) 开关，如图 1 所示。 记录下客户端内的端口 (Port)，如这里是 16514. 一般默认端口为 7890. ",-1)),s("a",O,[n[3]||(n[3]=s("img",{src:m,alt:"image.png",loading:"lazy"},null,-1)),o(a)]),n[8]||(n[8]=e(" 这个方法需要 Windows 10/11 22H2 和 WSL 2.0.5 及以上版本 你可以使用 winver 和 wsl -v 查看你的 Windows 和 WSL 版本。 如果你使用这个方法，你需要确保 Clash 客户端中设置的系统代理类型为 HTTP 而不是 PAC，否则无法代理 HTTPS 请求: ",-1)),s("a",L,[n[4]||(n[4]=s("img",{src:h,alt:"image.png",loading:"lazy"},null,-1)),o(a)]),n[9]||(n[9]=e(" 在 WSL ",-1)),s("a",G,[n[5]||(n[5]=e("2.0.5 版本",-1)),o(a)]),n[10]||(n[10]=e("后，一些特性得以稳定，这里要用到的是",-1)),s("a",M,[n[6]||(n[6]=e("镜像模式网络",-1)),o(a)]),n[11]||(n[11]=e("。 在 C:\\Users<UserName>.wslconfig 文件中 (如果不存在就手动创建一个) 加入以下内容:",-1))])]),n[32]||(n[32]=t(`<pre><code>[wsl2]
networkingMode=mirrored

</code></pre><p>不过需要注意，shell 的配置文件中不能再 export http_proxy=...</p><h2 id="docker-相关" tabindex="-1"><a class="header-anchor" href="#docker-相关"><span>Docker 相关</span></a></h2><h3 id="安装-docker-ce" tabindex="-1"><a class="header-anchor" href="#安装-docker-ce"><span>安装 docker-ce</span></a></h3><h4 id="kali" tabindex="-1"><a class="header-anchor" href="#kali"><span>kali</span></a></h4><pre><code class="language-bash"><span class="token comment"># 更新现有的软件包列表</span>
<span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token comment"># 安装所需工具包</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">curl</span> gnupg2 apt-transport-https software-properties-common ca-certificates
<span class="token comment"># 导入用于签署Docker软件包的Docker GPG密钥：</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/debian/gpg <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token comment"># 添加包含Docker CE最新稳定版本的Docker存储库：</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;deb [arch=amd64] https://download.docker.com/linux/debian buster stable&quot;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span>  /etc/apt/sources.list.d/docker.list
<span class="token comment"># 更新apt包索引</span>
<span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token comment"># 在Kali Linux上安装Docker CE</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io
<span class="token comment"># 检查安装的Docker版本</span>
<span class="token function">docker</span> version
</code></pre><h4 id="ubuntu" tabindex="-1"><a class="header-anchor" href="#ubuntu"><span>ubuntu</span></a></h4>`,7)),s("p",null,[s("a",A,[n[12]||(n[12]=e("ubuntu 安装 docker 详细步骤 - 腾讯云开发者社区-腾讯云 (tencent.com)open in new window",-1)),o(a)]),s("a",W,[n[13]||(n[13]=e("Docker 入门指南：如何在 Ubuntu 上安装和使用 Docker - 卡拉云 (kalacloud.com)open in new window",-1)),o(a)]),n[14]||(n[14]=e(" 使用如下脚本来安装 docker 即可:",-1))]),n[33]||(n[33]=t(`<pre><code class="language-bash"><span class="token comment"># Install the latest version docker</span>
<span class="token function">curl</span> <span class="token parameter variable">-s</span> https://get.docker.com/ <span class="token operator">|</span> <span class="token function">sh</span>

<span class="token comment"># Run docker service</span>
systemctl start <span class="token function">docker</span>
</code></pre><p>旧版安装指令:</p><pre><code class="language-bash"><span class="token comment"># 更新现有的软件包列表</span>
<span class="token function">apt</span> update
<span class="token comment"># 安装所需工具包</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> apt-transport-https ca-certificates <span class="token function">curl</span> gnupg-agent  software-properties-common
<span class="token comment"># 然后将官方 Docker 版本库的 GPG 密钥添加到系统中：</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/ubuntu/gpg <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token comment"># 将 Docker 版本库添加到APT源：</span>
<span class="token function">sudo</span> add-apt-repository <span class="token string">&quot;deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable&quot;</span>
<span class="token comment"># 用新添加的 Docker 软件包来进行升级更新。</span>
<span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token comment"># 确保要从 Docker 版本库，而不是默认的 Ubuntu 版本库进行安装：</span>
<span class="token function">apt-cache</span> policy docker-ce
<span class="token comment"># 安装 Docker ：</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> docker-ce
<span class="token comment"># 现在 Docker 已经安装完毕。我们启动守护程序。检查 Docker 是否正在运行：</span>
<span class="token function">sudo</span> systemctl status <span class="token function">docker</span>
<span class="token comment"># 设置 docker 开机自动启动</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> docker.service
</code></pre><h4 id="debian" tabindex="-1"><a class="header-anchor" href="#debian"><span>debian</span></a></h4>`,4)),s("p",null,[s("a",I,[n[15]||(n[15]=e("在 Debian 上安装 Docker 引擎 | Docker 文档 --- Install Docker Engine on Debian | Docker Docsopen in new window",-1)),o(a)]),s("a",H,[n[16]||(n[16]=e("Index of linux/debian/dists/ (docker.com)open in new window",-1)),o(a)])]),n[34]||(n[34]=t(`<ol><li>设置 Docker 的 apt 存储库</li></ol><pre><code class="language-bash"><span class="token comment"># Add Docker&#39;s official GPG key:</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> ca-certificates <span class="token function">curl</span>
<span class="token function">sudo</span> <span class="token function">install</span> <span class="token parameter variable">-m</span> 0755 <span class="token parameter variable">-d</span> /etc/apt/keyrings
<span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/debian/gpg <span class="token parameter variable">-o</span> /etc/apt/keyrings/docker.asc
<span class="token function">sudo</span> <span class="token function">chmod</span> a+r /etc/apt/keyrings/docker.asc

<span class="token comment"># Add the repository to Apt sources:</span>
<span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span>
  <span class="token string">&quot;deb [arch=<span class="token variable"><span class="token variable">$(</span>dpkg --print-architecture<span class="token variable">)</span></span> signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \\
  <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">.</span> /etc/os-release <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$VERSION_CODENAME</span>&quot;</span><span class="token variable">)</span></span> stable&quot;</span> <span class="token operator">|</span> <span class="token punctuation">\\</span>
  <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/docker.list <span class="token operator">&gt;</span> /dev/null
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
</code></pre><ol start="2"><li>安装 Docker packages</li></ol><pre><code class="language-bash"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-co
</code></pre><h3 id="docker-配置代理" tabindex="-1"><a class="header-anchor" href="#docker-配置代理"><span>docker 配置代理</span></a></h3><pre><code class="language-bash"><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/systemd/system/docker.service.d
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/systemd/system/docker.service.d/proxy.conf

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Environment</span><span class="token operator">=</span><span class="token string">&quot;HTTP_PROXY=http://127.0.0.1:7890/&quot;</span>
<span class="token assign-left variable">Environment</span><span class="token operator">=</span><span class="token string">&quot;HTTPS_PROXY=http://127.0.0.1:7890/&quot;</span>
<span class="token assign-left variable">Environment</span><span class="token operator">=</span><span class="token string">&quot;NO_PROXY=localhost,127.0.0.1&quot;</span>
</code></pre><h2 id="代码相关" tabindex="-1"><a class="header-anchor" href="#代码相关"><span>代码相关</span></a></h2><h3 id="centos7-安装-node-后重定向报错" tabindex="-1"><a class="header-anchor" href="#centos7-安装-node-后重定向报错"><span>Centos7 安装 node 后重定向报错</span></a></h3><pre><code>yum install nodejs npm cnpm -y
</code></pre><p><img src="`+b+`" alt="" loading="lazy"> 但是报错如下</p><pre><code>[root@bogon ~]# node -v
node: relocation error: /lib64/libnode.so.93: symbol FIPS_selftest, version OPENSSL_1_1_0g not defined in file libcrypto.so.1.1 with link time reference
[root@bogon ~]# npm -v
node: relocation error: /lib64/libnode.so.93: symbol FIPS_selftest, version OPENSSL_1_1_0g not defined in file libcrypto.so.1.1 with link time reference

</code></pre><p>openssl 装了新版本，但是没替换 <img src="`+f+`" alt="" loading="lazy"> 解决办法</p><pre><code>mv openssl openssl.bak
mv openssl111/ openssl
</code></pre><figure><img src="`+w+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="解决-go-中使用-sqlite-报错-go-sqlite3-requires-cgo-to-work" tabindex="-1"><a class="header-anchor" href="#解决-go-中使用-sqlite-报错-go-sqlite3-requires-cgo-to-work"><span>解决 Go 中使用 Sqlite 报错 go-sqlite3 requires cgo to work</span></a></h3><p>Windows 10 系统 在使用 <code>GORM</code> 中连接 <code>SQlite</code> 数据库时，启动项目报错，错误信息如下</p><pre><code>Binary was compiled with &#39;CGO_ENABLED=0&#39;, go-sqlite3 requires cgo to work. This is a stub
</code></pre><p>从错误信息里可以看到，是 <code>cgo</code> 没跑起来和 <code>CGO_ENABLED=0</code>，我隐约记得以前遇到过，这是因为 Windows 上面默认是没有 <code>gcc</code> 的，所以 <code>cgo</code> 跑不起来。Windows 上面可以安装 <code>MinGW</code> 获得 <code>gcc</code> 总之，就是 <code>SQlite</code> 需要 <code>C</code> 环境，<code>cgo</code> 也需要 <code>C</code> 环境，这都要 <code>gcc</code> 来支持</p><blockquote><p>PS：这也是为什么这种错误大多发生在 Windows 上的原因，因为 Mac 和 Linux 都默认安装了 <code>gcc</code></p></blockquote><p><strong>解决步骤</strong></p>`,20)),s("ol",null,[s("li",null,[n[19]||(n[19]=e("点这个",-1)),s("a",z,[n[17]||(n[17]=e("链接",-1)),o(a)]),n[20]||(n[20]=e("下载 ",-1)),n[21]||(n[21]=s("code",null,"MinGW",-1)),n[22]||(n[22]=e(" 的压缩包。或者访问",-1)),s("a",R,[n[18]||(n[18]=e("MinGW-w64 - for 32 and 64 bit Windows Files",-1)),o(a)]),n[23]||(n[23]=e("找到 ",-1)),n[24]||(n[24]=s("code",null,"x86_64-posix-xxxx",-1)),n[25]||(n[25]=e(" 链接，点击它下载",-1))])]),n[35]||(n[35]=t('<figure><img src="'+x+'" alt="image.jpg" tabindex="0" loading="lazy"><figcaption>image.jpg</figcaption></figure><ol start="2"><li>解压后会得到一个 <code>mingw64</code> 的文件夹，把这个文件夹复制到 <code>C:\\Program Files</code> 目录下，把 <code>C:\\Program Files\\mingw64\\bin</code> 这个路径添加到 <code>PATH </code>系统环境变量（这个不会的得自己百度了）</li></ol><p><code>bin</code> 目录下有很多可执行文件，可以用来编译执行 <code>C</code>、<code>C++</code> 代码。把 bin 目录加入到 <code>PATH</code> 系统环境变量是为了直接执行 <code>gcc</code> 等命令可以正确找到可执行文件 <img src="'+v+'" alt="image.jpg" loading="lazy"><code>PATH</code> 系统环境变量 <img src="'+y+`" alt="image.jpg" loading="lazy"></p><ol start="3"><li>添加到 <code>PATH</code> 系统环境变量后，在终端执行下面命令开启 <code>cgo</code></li></ol><pre><code class="language-shell">$ go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><ol><li>重启你当前的终端或者新开一个终端 tab，这样环境变量才会生效。如果是在 <code>VS Code</code> 的终端执行命令，需要重启 <code>VS Code</code></li><li>最后正常启动项目即可，第一次启动项目可能会有点慢，因为需要执行 <code>cgo</code> 编译打包好 <code>SQlite</code> 相关的东西</li></ol>`,6)),s("blockquote",null,[s("p",null,[n[27]||(n[27]=e("来自: ",-1)),s("a",$,[n[26]||(n[26]=e("解决 Go 中使用 Sqlite 报错 go-sqlite3 requires cgo to work - 付小晨",-1)),o(a)])])]),n[36]||(n[36]=t('<h3 id="goland-无法-debug" tabindex="-1"><a class="header-anchor" href="#goland-无法-debug"><span>Goland 无法 debug</span></a></h3><p>报错日志如下： couldn’t start listener: listen tcp: address 0:0:0:0:0:0:0:1:56648: too many colons in address<img src="'+S+'" alt="image.jpg" loading="lazy">我使用的 Goland 版本为 2021.2.3 从以上报错信息可以看出是 ip 解析相关的问题，经过了各种办法最终找到了解决方案：</p><ol><li><strong>第一步</strong>： <img src="'+D+'" alt="image.jpg" loading="lazy"></li><li><strong>第二步</strong>： 在 Goland 中：Help-&gt;Edit Custom VM options, 打开文件后如下图 <img src="'+q+`" alt="image.jpg" loading="lazy"> 在最后配置如下两行</li></ol><pre><code>-Djava.net.preferIPv4Stack=true
-Djava.net.preferIPv6Addresses=true
</code></pre><p>再次 debug 发现无法 Step Over,需要重新安装 dlv 工具</p><pre><code>git clone https://github.com/go-delve/delve.git
cd delve/cmd/dlv/
go build
go install
</code></pre><p>GOBIN 目录将会生成 dlv 可执行文件，最后将添加到 Edit Custom VM options 中即可。$GOPATH 改为自己电脑的路径，go env 命令可以查看</p><pre><code>-Ddlv.path=$GOPATH/bin/dlv
</code></pre>`,8)),s("blockquote",null,[s("p",null,[n[29]||(n[29]=e("来自: ",-1)),s("a",V,[n[28]||(n[28]=e("Goland 无法 debug\\地址解析出错\\无法下一步操作-CSDN 博客",-1)),o(a)])])]),n[37]||(n[37]=t('<h3 id="vs-code-集成终端上出现意外的-ansi-转义码" tabindex="-1"><a class="header-anchor" href="#vs-code-集成终端上出现意外的-ansi-转义码"><span>VS Code 集成终端上出现意外的 ANSI 转义码</span></a></h3><p>使用了 oh-my-posh，在打开 nodejs 的项目时，我的 vscode 中的 Windows powershell 打开时出现这行代码： <img src="'+_+`" alt="image.png" loading="lazy"></p><pre><code> \\x1b7                                                                                                                                                          \\x1b[38\\x3b2\\x3b89\\x3b201\\x3b165m \\x1b[0m\\x1b[38\\x3b2\\x3b224\\x3b222\\x3b244min \\x1b[38\\x3b2\\x3b75\\x3b149\\x3b233m\\x1b[1mpwsh\\x1b[22m\\x1b[27m\\x1b[38\\x3b2\\x3b224\\x3b222\\x3b244m \\x1b[0m\\x1b[38\\x3b2\\x3b224\\x3b222\\x3b244mat \\x1b[38\\x3b2\\x3b75\\x3b149\\x3b233m\\x1b[1m09:54:21\\x1b[22m\\x1b[0m\\x1b8
</code></pre><p>解决方式：在 vscode 设置处搜索 shell 集成，把如下勾选取消。 <img src="`+P+`" alt="image.png" loading="lazy"></p><h3 id="vscode-中-docker-插件无法连接" tabindex="-1"><a class="header-anchor" href="#vscode-中-docker-插件无法连接"><span>vscode 中 docker 插件无法连接</span></a></h3><p>报错<code>Failed to connect. Is Docker running Error: permission denied while trying connect ....</code> J 解决方案：普通用户增加到 docker 组中</p><pre><code class="language-bash"><span class="token function">sudo</span> <span class="token function">groupadd</span> <span class="token function">docker</span>          <span class="token comment">#添加docker用户组</span>
<span class="token function">sudo</span> gpasswd <span class="token parameter variable">-a</span> <span class="token environment constant">$USER</span> <span class="token function">docker</span>  <span class="token comment">#将当前用户添加至docker用户组</span>
newgrp <span class="token function">docker</span>                 <span class="token comment">#更新docker用户组</span>
</code></pre><p>添加后重新登录 vscode，用户重新连接后 docker 插件会正常运行。</p><h3 id="linux-deepin-安装配置-go" tabindex="-1"><a class="header-anchor" href="#linux-deepin-安装配置-go"><span>linux(deepin)安装配置 go</span></a></h3><p>（apt-get install golang 安装不是最新版）</p><pre><code># 直接在国内官网安装golang
sudo wget https://studygolang.com/dl/golang/go1.19.2.linux-amd64.tar.gz

# 然后将上面下载的golang安装包解压到/usr/local/这个目录，解压后会自动生成一个go文件夹目录
sudo tar -zxvf go1.19.2.linux-amd64.tar.gz -C /usr/local/

# Deepin 还是直接编辑sudo vim /etc/bash.bashrc文件就可以，直接追加下面的配置
sudo vim /etc/bash.bashrc

# 在文件的最下面增加Go的环境变量---bashrc文件begin
export GOROOT=/usr/local/go
export GOPATH=/home/gowork
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin

第一个就是我们刚刚安装Go的路径，Go的安装路径
第二个这里是Go的工作空间，也就是工作路径；自己创建的目录，这个下面自己创建src、pkg、bin
第三个环境变量
# 在文件的最下面增加Go的环境变量---bashrc文件end

sudo mkdir /home/gowork

# 刷新环境变量配置
source /etc/bash.bashrc

go env
# go env环境变量设置
go env -w GOPROXY=https://goproxy.io,direct
go env -w GOSUMDB=sum.golang.google.cn
go env -w GO111MODULE=on #有&quot;&quot;不用设置
</code></pre><blockquote><p>来自: https://zhuanlan.zhihu.com/p/588475095</p></blockquote><h3 id="idea-调试-wsl-中代码被-windows-防火墙阻断" tabindex="-1"><a class="header-anchor" href="#idea-调试-wsl-中代码被-windows-防火墙阻断"><span>IDEA 调试 WSL 中代码被 windows 防火墙阻断</span></a></h3><p>以管理员身份运行 Windows PowerShell。</p><pre><code class="language-powershell"><span class="token comment"># 执行以下命令以允许使用 WSL 的连接</span>
<span class="token function">New-NetFirewallRule</span> <span class="token operator">-</span>DisplayName <span class="token string">&quot;WSL&quot;</span> <span class="token operator">-</span>Direction Inbound <span class="token operator">-</span>InterfaceAlias <span class="token string">&quot;vEthernet (WSL)&quot;</span> <span class="token operator">-</span>Action Allow
<span class="token comment"># 然后执行命令以更新防火墙规则</span>
<span class="token function">Get-NetFirewallProfile</span> <span class="token operator">-</span>Name Public <span class="token punctuation">|</span> <span class="token function">Get-NetFirewallRule</span> <span class="token punctuation">|</span> where DisplayName <span class="token operator">-</span>ILike <span class="token string">&quot;IntelliJ IDEA*&quot;</span> <span class="token punctuation">|</span> <span class="token function">Disable-NetFirewallRule</span>
</code></pre><blockquote><p>如果您正在使用其他 IDE，请将 <code>IntelliJ IDEA*</code> 替换为其名称。</p></blockquote><p>现在启动调试器会话。当 Windows 防火墙弹出窗口出现时，选中“公共网络”复选框。</p><figure><img src="`+E+'" alt="Allow public networks" tabindex="0" loading="lazy"><figcaption>Allow public networks</figcaption></figure>',18))])}const Y=l(T,[["render",U]]),K=JSON.parse('{"path":"/others/DailySkills.html","title":"日常技巧","lang":"zh-CN","frontmatter":{"category":"日常备忘","tags":["WSL","Docker","报错解决"],"star":"1","sticky":"1","description":"日常技巧 这里记录一些常用的小技巧 其他 如何让 windows 的 cmd 拥有 linux 的命令 安装 git，然后把 git 的如下路径添加到 Path 环境变量 Git 批量修改提交人信息 Powershell 修改 profile 所有用户，所有主机 - $PSHOME\\\\Profile.ps1 所有用户，当前主机 - $PSHOME\\\\Mic...","head":[["meta",{"property":"og:url","content":"https://echo0d.github.io/DailyNotes/others/DailySkills.html"}],["meta",{"property":"og:site_name","content":"echo0d-notes"}],["meta",{"property":"og:title","content":"日常技巧"}],["meta",{"property":"og:description","content":"日常技巧 这里记录一些常用的小技巧 其他 如何让 windows 的 cmd 拥有 linux 的命令 安装 git，然后把 git 的如下路径添加到 Path 环境变量 Git 批量修改提交人信息 Powershell 修改 profile 所有用户，所有主机 - $PSHOME\\\\Profile.ps1 所有用户，当前主机 - $PSHOME\\\\Mic..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-06-04T09:27:16.000Z"}],["meta",{"property":"article:author","content":"echo0d"}],["meta",{"property":"article:tag","content":"WSL"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"报错解决"}],["meta",{"property":"article:modified_time","content":"2025-06-04T09:27:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"日常技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-06-04T09:27:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"echo0d\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":2,"title":"其他","slug":"其他","link":"#其他","children":[{"level":3,"title":"如何让 windows 的 cmd 拥有 linux 的命令","slug":"如何让-windows-的-cmd-拥有-linux-的命令","link":"#如何让-windows-的-cmd-拥有-linux-的命令","children":[]},{"level":3,"title":"Git 批量修改提交人信息","slug":"git-批量修改提交人信息","link":"#git-批量修改提交人信息","children":[]},{"level":3,"title":"Powershell 修改 profile","slug":"powershell-修改-profile","link":"#powershell-修改-profile","children":[]},{"level":3,"title":"CMD 和 Powershell 显示执行命令时间","slug":"cmd-和-powershell-显示执行命令时间","link":"#cmd-和-powershell-显示执行命令时间","children":[]},{"level":3,"title":"某应用添加到右键","slug":"某应用添加到右键","link":"#某应用添加到右键","children":[]},{"level":3,"title":"使用 xrdp 连接 ubuntu 桌面优化&黑屏解决","slug":"使用-xrdp-连接-ubuntu-桌面优化-黑屏解决","link":"#使用-xrdp-连接-ubuntu-桌面优化-黑屏解决","children":[]},{"level":3,"title":"xrdp 卡顿解决","slug":"xrdp-卡顿解决","link":"#xrdp-卡顿解决","children":[]},{"level":3,"title":"ubuntu 下 wireshark 添加 root 权限","slug":"ubuntu-下-wireshark-添加-root-权限","link":"#ubuntu-下-wireshark-添加-root-权限","children":[]},{"level":3,"title":"Vmware 启动报错 ‘0xc000007b‘","slug":"vmware-启动报错-0xc000007b","link":"#vmware-启动报错-0xc000007b","children":[]},{"level":3,"title":"Kali zsh 切换为 bash","slug":"kali-zsh-切换为-bash","link":"#kali-zsh-切换为-bash","children":[]},{"level":3,"title":"Cursor 安装到 D 盘","slug":"cursor-安装到-d-盘","link":"#cursor-安装到-d-盘","children":[]}]},{"level":2,"title":"WSL 相关","slug":"wsl-相关","link":"#wsl-相关","children":[{"level":3,"title":"WSL 制作快照和回滚","slug":"wsl-制作快照和回滚","link":"#wsl-制作快照和回滚","children":[]},{"level":3,"title":"WSL 启动目录修改","slug":"wsl-启动目录修改","link":"#wsl-启动目录修改","children":[]},{"level":3,"title":"WSL2 kali 安装报错","slug":"wsl2-kali-安装报错","link":"#wsl2-kali-安装报错","children":[]},{"level":3,"title":"WSL2 安装后 kali 里没工具","slug":"wsl2-安装后-kali-里没工具","link":"#wsl2-安装后-kali-里没工具","children":[]},{"level":3,"title":"WSL 安装 kali 后安装 docker 报错","slug":"wsl-安装-kali-后安装-docker-报错","link":"#wsl-安装-kali-后安装-docker-报错","children":[]},{"level":3,"title":"WSL2 使用主机的 clash 代理","slug":"wsl2-使用主机的-clash-代理","link":"#wsl2-使用主机的-clash-代理","children":[]}]},{"level":2,"title":"Docker 相关","slug":"docker-相关","link":"#docker-相关","children":[{"level":3,"title":"安装 docker-ce","slug":"安装-docker-ce","link":"#安装-docker-ce","children":[]},{"level":3,"title":"docker 配置代理","slug":"docker-配置代理","link":"#docker-配置代理","children":[]}]},{"level":2,"title":"代码相关","slug":"代码相关","link":"#代码相关","children":[{"level":3,"title":"Centos7 安装 node 后重定向报错","slug":"centos7-安装-node-后重定向报错","link":"#centos7-安装-node-后重定向报错","children":[]},{"level":3,"title":"解决 Go 中使用 Sqlite 报错 go-sqlite3 requires cgo to work","slug":"解决-go-中使用-sqlite-报错-go-sqlite3-requires-cgo-to-work","link":"#解决-go-中使用-sqlite-报错-go-sqlite3-requires-cgo-to-work","children":[]},{"level":3,"title":"Goland 无法 debug","slug":"goland-无法-debug","link":"#goland-无法-debug","children":[]},{"level":3,"title":"VS Code 集成终端上出现意外的 ANSI 转义码","slug":"vs-code-集成终端上出现意外的-ansi-转义码","link":"#vs-code-集成终端上出现意外的-ansi-转义码","children":[]},{"level":3,"title":"vscode 中 docker 插件无法连接","slug":"vscode-中-docker-插件无法连接","link":"#vscode-中-docker-插件无法连接","children":[]},{"level":3,"title":"linux(deepin)安装配置 go","slug":"linux-deepin-安装配置-go","link":"#linux-deepin-安装配置-go","children":[]},{"level":3,"title":"IDEA 调试 WSL 中代码被 windows 防火墙阻断","slug":"idea-调试-wsl-中代码被-windows-防火墙阻断","link":"#idea-调试-wsl-中代码被-windows-防火墙阻断","children":[]}]}],"git":{"createdTime":1721029551000,"updatedTime":1749029236000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":8}]},"readingTime":{"minutes":12.69,"words":3806},"filePathRelative":"others/DailySkills.md","localizedDate":"2024年7月15日","excerpt":"\\n<p>这里记录一些常用的小技巧</p>\\n","autoDesc":true}');export{Y as comp,K as data};
