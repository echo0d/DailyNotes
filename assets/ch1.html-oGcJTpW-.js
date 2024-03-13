import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as s,e as a}from"./app-8Yoi8o-c.js";const i={},d=a(`<h1 id="_1-入门" tabindex="-1"><a class="header-anchor" href="#_1-入门" aria-hidden="true">#</a> 1-入门</h1><h2 id="_1、go基础" tabindex="-1"><a class="header-anchor" href="#_1、go基础" aria-hidden="true">#</a> 1、Go基础</h2><h3 id="_1-1-goproxy设置" tabindex="-1"><a class="header-anchor" href="#_1-1-goproxy设置" aria-hidden="true">#</a> 1.1 GOPROXY设置</h3><p>windows下载安装包，直接默认安装。此处版本go1.15.15</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PS C:\\Users\\echo0d\\Desktop\\gopl.io-master\\ch1\\helloworld&gt; go env
set GO111MODULE=on
set GOARCH=amd64                                  
set GOBIN=                                        
set GOCACHE=C:\\Users\\echo0d\\AppData\\Local\\go-build
set GOENV=C:\\Users\\echo0d\\AppData\\Roaming\\go\\env  
set GOEXE=.exe                                    
set GOFLAGS=
set GOHOSTARCH=amd64
set GOHOSTOS=windows
set GOINSECURE=
set GOMODCACHE=C:\\Users\\echo0d\\go\\pkg\\mod
set GONOPROXY=
set GONOSUMDB=
set GOOS=windows
set GOPATH=C:\\Users\\echo0d\\go
set GOPRIVATE=
set GOPROXY=https://proxy.golang.org,direct
set GOROOT=C:\\Program Files\\Go
set GOSUMDB=sum.golang.org
set GOTMPDIR=
set GOTOOLDIR=C:\\Program Files\\Go\\pkg\\tool\\windows_amd64
set GCCGO=gccgo
set AR=ar
set GOMOD=C:\\Users\\echo0d\\Desktop\\gopl.io-master\\go.mod
set CGO_CFLAGS=-g -O2
set CGO_CPPFLAGS=
set CGO_CXXFLAGS=-g -O2
set CGO_FFLAGS=-g -O2
set CGO_LDFLAGS=-g -O2
set PKG_CONFIG=pkg-config
set GOGCCFLAGS=-m64 -mthreads -fno-caret-diagnostics -Qunused-arguments -fmessage-length=0 -fdebug-prefix-map=C:\\Users\\echo0d\\AppData\\Local\\Temp\\go-build967739482=/tmp/go-build -gno-record-gcc-switches
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译程序会报错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PS C:\\Users\\echo0d\\Desktop\\gopl.io-master\\ch1\\helloworld&gt; go run main.go
go: golang.org/x/net@v0.0.0-20210929193557-e81a3d93ecf6: Get &quot;https://proxy.golang.org/golang.org/x/net/@v/v0.0.0-20210929193557-e81a3d93ecf6.mod&quot;: dial tcp [2404:6800:4003:c04::8d]:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>原因：从 <code>Go 1.11</code> 版本开始，官方支持了 <code>go module</code> 包依赖管理工具。还新增了 <code>GOPROXY</code> 环境变量。</p><p>如果设置了该变量，下载源代码时将会通过这个环境变量设置的代理地址，而不再是以前的直接从代码库下载。也就是这个变量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>set GOPROXY=https://proxy.golang.org,direct
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>把他修改，powershell执行，https://goproxy.io这个项目看起来非常不错</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 启用 Go Modules 功能</span>
<span class="token variable">$env</span>:GO111MODULE=<span class="token string">&quot;on&quot;</span>
<span class="token comment"># 配置 GOPROXY 环境变量</span>
<span class="token variable">$env</span>:GOPROXY=<span class="token string">&quot;https://goproxy.io&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用的 Go 版本&gt;=1.13, 你可以通过设置 GOPRIVATE 环境变量来控制哪些私有仓库和依赖(公司内部仓库)不通过 proxy 来拉取，直接走本地，设置如下：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 配置 GOPROXY 环境变量</span>
<span class="token variable">$env</span>:GOPROXY = <span class="token string">&quot;https://goproxy.io,direct&quot;</span>
<span class="token comment"># 设置不走 proxy 的私有仓库或组，多个用逗号相隔（可选）</span>
<span class="token variable">$env</span>:GOPRIVATE = <span class="token string">&quot;git.mycompany.com,github.com/my/private&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外还有</p><p>七牛云：https://goproxy.cn</p><p>aliyun：https://mirrors.aliyun.com/goproxy/</p><blockquote><p>后面感觉go1.15版本有点低，改成 go1.21.8</p></blockquote><h3 id="_1-2-hello-world" tabindex="-1"><a class="header-anchor" href="#_1-2-hello-world" aria-hidden="true">#</a> 1.2 Hello, World</h3><p>初始化，新建一个文件夹，例如ch2</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>cd ch2
go mod init ch2
# 生成一个go.mod文件，内容如下
module ch2
go 1.22.1

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例代码<em>gopl.io/ch1/helloworld</em></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, 世界&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go是一门编译型语言，Go语言的工具链将源代码及其依赖转换成计算机的机器指令（译注：静态编译）。Go语言提供的工具都通过一个单独的命令<code>go</code>调用，<code>go</code>命令有一系列子命令。最简单的一个子命令就是run。这个命令编译一个或多个以.go结尾的源文件，链接库文件，并运行最终生成的可执行文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ go run helloworld.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令会输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Hello, 世界
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Go语言原生支持Unicode，它可以处理全世界任何语言的文本。</p><p>单独编译这个程序，保存编译结果以备将来之用。可以用build子命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ go build helloworld.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令生成一个名为helloworld的可执行的二进制文件，Windows系统下生成的可执行文件是helloworld.exe，增加了.exe后缀名</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.\\helloworld.exe
Hello, 世界
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-package" tabindex="-1"><a class="header-anchor" href="#_1-3-package" aria-hidden="true">#</a> 1.3 package</h3><p>Go语言的代码通过<strong>包</strong>（package）组织，包类似于其它语言里的库（libraries）或者模块（modules）。一个包由位于<strong>单个目录</strong>下的一个或多个.go源代码文件组成，目录定义包的作用。</p><p>每个源文件都以一条<code>package</code>声明语句开始，这个例子里就是<code>package main</code>，表示该文件属于哪个包，紧跟着一系列导入（<code>import</code>）的包，之后是存储在这个文件里的程序语句。</p><p><code>main</code>包比较特殊。它定义了一个独立可执行的程序，而不是一个库。在<code>main</code>里的<code>main</code> <em>函数</em> 也很特殊，它是整个程序执行时的入口（译注：C系语言差不多都这样）。</p><blockquote><p>必须恰当导入需要的包，缺少了必要的包或者导入了不需要的包，程序都无法编译通过。这项严格要求避免了程序开发过程中引入未使用的包（Go语言编译过程没有警告信息，争议特性之一）。</p></blockquote>`,37),l=[d];function o(t,c){return n(),s("div",null,l)}const u=e(i,[["render",o],["__file","ch1.html.vue"]]);export{u as default};
