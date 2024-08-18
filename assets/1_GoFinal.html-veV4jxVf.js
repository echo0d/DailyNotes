import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-re7Yuxiw.js";const i={},t=e(`<h1 id="_1-基础收尾" tabindex="-1"><a class="header-anchor" href="#_1-基础收尾" aria-hidden="true">#</a> 1. 基础收尾</h1><h2 id="_1-1-项目结构" tabindex="-1"><a class="header-anchor" href="#_1-1-项目结构" aria-hidden="true">#</a> 1.1. 项目结构</h2><p>在 Go 语言中，经典的项目结构通常遵循一种约定俗成的布局，这有助于使项目更具可读性和易维护性。以下是一个经典的 Go 项目结构示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>project-root/
|-- cmd/
|   |-- main.go
|
|-- internal/
|   |-- pkg1/
|   |   |-- ...
|   |
|   |-- pkg2/
|   |   |-- ...
|   |
|   |-- ...
|
|-- pkg/
|   |-- pkg3/
|   |   |-- ...
|   |
|   |-- pkg4/
|   |   |-- ...
|   |
|   |-- ...
|
|-- api/
|   |-- http/
|   |   |-- ...
|   |
|   |-- grpc/
|   |   |-- ...
|   |
|   |-- ...
|
|-- configs/
|   |-- config.go
|
|-- deployments/
|   |-- docker/
|   |   |-- Dockerfile
|   |
|   |-- kubernetes/
|   |   |-- ...
|   |
|   |-- ...
|
|-- docs/
|   |-- ...
|
|-- pkg/
|   |-- ...
|
|-- scripts/
|   |-- ...
|
|-- test/
|   |-- ...
|
|-- .gitignore
|-- go.mod
|-- go.sum
|-- README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>cmd/</strong>: 包含应用程序的入口点，每个可执行程序应该有一个对应的文件夹。</li><li><strong>internal/</strong>: 包含项目私有的代码，不希望被外部代码引用。</li><li><strong>pkg/</strong>: 包含项目的可重用代码包，可以被其他项目引用。</li><li><strong>api/</strong>: 包含项目的 API 定义，例如 HTTP 和 gRPC 的端点。</li><li><strong>configs/</strong>: 包含项目的配置文件。</li><li><strong>deployments/</strong>: 包含部署相关的文件，例如 Dockerfile 和 Kubernetes 配置。</li><li><strong>docs/</strong>: 包含项目文档和说明。</li><li><strong>scripts/</strong>: 包含项目的脚本文件。</li><li><strong>test/</strong>: 包含项目的测试代码。</li><li><strong>.gitignore</strong>: Git 忽略文件列表。</li><li><strong>go.mod</strong> 和 <strong>go.sum</strong>: Go modules 文件，用于管理项目依赖。</li><li><strong>README.md</strong>: 项目的说明文件。</li></ul><p>这种结构有助于组织和管理代码，同时也提供了清晰的分层结构和可扩展性。项目结构可能会因项目规模和需求而有所不同，但上述示例代表了一个通用的 Go 项目结构。</p><h2 id="_1-2-defer函数" tabindex="-1"><a class="header-anchor" href="#_1-2-defer函数" aria-hidden="true">#</a> 1.2. defer函数</h2><p>在 Go 语言中，<code>defer</code> 语句用于延迟（defer）函数的执行直到包含 <code>defer</code> 语句的函数执行完毕。<code>defer</code> 语句允许在函数执行的任何时候注册一个函数调用，该函数会在函数执行完毕时被调用。这种机制通常用于确保资源在函数执行完毕后得到正确释放，以及在函数返回之前执行清理操作。</p><p>defer的运行机制决定了无论函数是执行到函数体末尾正常返回，还是在函数体中的某个错误处理分支显式调用return返回，或函数体内部出现panic，已经注册了的deferred函数都会被调度执行。</p><h3 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> <strong>基本语法</strong></h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func someFunction() {
    defer fmt.Println(&quot;This will be executed last&quot;)
    
    // Other function logic
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例用途" tabindex="-1"><a class="header-anchor" href="#示例用途" aria-hidden="true">#</a> <strong>示例用途</strong></h3><p><strong>资源释放</strong>：<code>defer</code> 经常用于关闭文件、释放锁、关闭数据库连接等操作，确保资源得到正确释放。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">readFile</span><span class="token punctuation">(</span>filename <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    file<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> file<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 在函数返回前关闭文件</span>
    <span class="token comment">// 读取文件内容</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>跟踪执行</strong>：<code>defer</code> 可以用于跟踪函数的执行情况。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">printStartAndEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Function end&quot;</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Function start&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>处理错误</strong>：<code>defer</code> 可以用于处理错误，确保清理操作在函数返回时执行。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理错误</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">someFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">defer</span> <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 可能引发 panic 的代码</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>defer</code> 语句按照后进先出（LIFO）的顺序执行，即最后注册的函数最先执行。这使得 <code>defer</code> 在 Go 中成为一个强大而简洁的工具，用于确保资源管理和代码执行顺序的可靠性。</p><p>以下是一个示例，展示了一个函数内有多个 <code>defer</code> 语句的情况：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Start&quot;</span><span class="token punctuation">)</span>

    <span class="token comment">// 第一个 defer，注册的函数将在 main 函数执行结束后执行</span>
    <span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Deferred statement 1&quot;</span><span class="token punctuation">)</span>
 	
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Middle&quot;</span><span class="token punctuation">)</span>
    
    <span class="token comment">// 第二个 defer</span>
    <span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Deferred statement 2&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;End&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，<code>main</code> 函数内有两个 <code>defer</code> 语句，它们分别注册了两个匿名函数。当 <code>main</code> 函数执行时，它们会按照 LIFO 的顺序执行。因此，输出顺序将是：</p><ol><li><code>Start</code></li><li><code>End</code></li><li><code>Middle</code></li><li><code>Deferred statement 2</code></li><li><code>Deferred statement 1</code></li></ol><h3 id="哪些函数可以defer" tabindex="-1"><a class="header-anchor" href="#哪些函数可以defer" aria-hidden="true">#</a> 哪些函数可以defer</h3><p>Go语言中除了有自定义的函数或方法，还有内置函数。下面是Go语言内置函数的完整列表：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>append cap close complex copy delete imag len
make new panic print println real recover
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>内置函数是否都能作为deferred函数呢？</p><p>append、cap、len、make、new等内置函数是不可以直接作为deferred函数的，而close、copy、delete、print、recover等可以。</p><p>对于那些不能直接作为deferred函数的内置函数，我们可以使用一个包裹它的匿名函数来间接满足要求。以append为例：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token boolean">_</span> <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>sl<span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但这么做有什么实际意义需要开发者自己把握。</p><h2 id="_1-3-receiver参数" tabindex="-1"><a class="header-anchor" href="#_1-3-receiver参数" aria-hidden="true">#</a> 1.3. receiver参数</h2><p>Go语言虽然不支持经典的面向对象语法元素，比如类、对象、继承等，Go语言中的方法在声明形式上仅仅多了一个参数，Go称之为receiver参数。receiver参数是方法与类型之间的纽带。Go方法的一般声明形式如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>receiver T<span class="token comment">/*T) MethodName(参数列表) (返回值列表) {
    // 方法体
}
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面方法声明中的T称为receiver的基类型。通过receiver，上述方法被绑定到类型T上。换句话说，上述方法是类型T的一个方法，我们可以通过类型T或*T的实例调用该方法，如下面的伪代码所示：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> t T
t<span class="token punctuation">.</span><span class="token function">MethodName</span><span class="token punctuation">(</span>参数列表<span class="token punctuation">)</span>

<span class="token keyword">var</span> pt <span class="token operator">*</span>T <span class="token operator">=</span> <span class="token operator">&amp;</span>t
pt<span class="token punctuation">.</span><span class="token function">MethodName</span><span class="token punctuation">(</span>参数列表<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go方法具有如下特点。</p><p>1）方法名的首字母是否大写决定了该方法是不是导出方法。</p><p>2）方法定义要与类型定义放在同一个包内。由此我们可以推出：不能为原生类型（如int、float64、map等）添加方法，只能为自定义类型定义方法（示例代码如下）。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 错误的做法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span> <span class="token comment">// 编译器错误：cannot define new methods on non- local type int</span>
    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%d&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 正确的做法</span>
<span class="token keyword">type</span> MyInt <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>i MyInt<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%d&quot;</span><span class="token punctuation">,</span> <span class="token function">int</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）每个方法只能有一个receiver参数，不支持多receiver参数列表或变长receiver参数。一个方法只能绑定一个基类型，Go语言不支持同时绑定多个类型的方法。</p><p>4）receiver参数的基类型本身不能是指针类型或接口类型，下面的示例展示了这点：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> MyInt <span class="token operator">*</span><span class="token builtin">int</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r MyInt<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span> <span class="token comment">// 编译器错误：invalid receiver type MyInt (MyInt  is a pointer type)</span>
    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%d&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> MyReader io<span class="token punctuation">.</span>Reader
<span class="token keyword">func</span> <span class="token punctuation">(</span>r MyReader<span class="token punctuation">)</span> <span class="token function">Read</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 编译器错误：invalid receiver  type MyReader (MyReader is an  interface type)</span>
    <span class="token keyword">return</span> r<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,43),p=[t];function c(o,l){return s(),a("div",null,p)}const r=n(i,[["render",c],["__file","1_GoFinal.html.vue"]]);export{r as default};
