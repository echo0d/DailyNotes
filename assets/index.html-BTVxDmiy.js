import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,a as s,b as p,d as e,e as c,r as l,o as u}from"./app-Bkx5eYAF.js";const r={},k={href:"https://wangdoc.com/clang/",target:"_blank",rel:"noopener noreferrer"};function i(d,n){const a=l("ExternalLinkIcon");return u(),t("div",null,[n[1]||(n[1]=s("h1",{id:"c-语言",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#c-语言"},[s("span",null,"C 语言")])],-1)),s("blockquote",null,[s("p",null,[s("a",k,[n[0]||(n[0]=e("C 语言教程 - 网道",-1)),c(a)])])]),n[2]||(n[2]=p(`<p>C 语言是一种编译型语言，源码都是文本文件，本身无法执行。必须通过编译器，生成二进制的可执行文件，才能执行。编译器将代码从文本翻译成二进制指令的过程，就称为编译阶段，又称为“编译时”（compile time），跟运行阶段（又称为“运行时”）相区分。</p><p>目前，最常见的 C 语言编译器是自由软件基金会推出的 GCC 编译器，它可以免费使用。Linux 和 Mac 系统可以直接安装 GCC，Windows 系统可以安装 MinGW。线编译器举例：</p><ul><li>CodingGround: https://tutorialspoint.com/compile_c_online.php</li><li>OnlineGDB: https://onlinegdb.com/online_c_compiler</li></ul><h2 id="hello-world-示例" tabindex="-1"><a class="header-anchor" href="#hello-world-示例"><span>Hello World 示例</span></a></h2><p>C 语言的源代码文件，通常以后缀名<code>.c</code>结尾。下面是一个简单的 C 程序<code>hello.c</code>。它就是一个普通的文本文件，任何文本编译器都能用来写。</p><pre><code class="language-c"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>上面这个程序的唯一作用，就是在屏幕上面显示“Hello World”。</p><p>这里不讲解这些代码是什么意思，只是作为一个例子，让大家看看 C 代码应该怎么编译和运行。假设你已经安装好了 GCC 编译器，可以打开命令行，执行下面的命令。</p><pre><code class="language-shell">$ gcc hello.c
</code></pre><p>上面命令使用<code>gcc</code>编译器，将源文件<code>hello.c</code>编译成二进制代码。注意，<code>$</code>是命令行提示符，你真正需要输入的是<code>$</code>后面的部分。</p><p>运行这个命令以后，默认会在当前目录下生成一个编译产物文件<code>a.out</code>（assembler output 的缩写，Windows 平台为<code>a.exe</code>）。执行该文件，就会在屏幕上输出<code>Hello World</code>。</p><pre><code class="language-shell">$ ./a.out
Hello World
</code></pre><p>GCC 的<code>-o</code>参数（output 的缩写）可以指定编译产物的文件名。</p><pre><code class="language-shell">$ gcc <span class="token parameter variable">-o</span> hello hello.c
</code></pre><p>上面命令的<code>-o hello</code>指定，编译产物的文件名为<code>hello</code>（取代默认的<code>a.out</code>）。编译后就会生成一个名叫<code>hello</code>的可执行文件，相当于为<code>a.out</code>指定了名称。执行该文件，也会得到同样的结果。</p><pre><code class="language-shell">$ ./hello
Hello World
</code></pre><p>GCC 的<code>-std=</code>参数（standard 的缩写）还可以指定按照哪个 C 语言的标准进行编译。</p><pre><code class="language-shell">$ gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>c99 hello.c
</code></pre><p>上面命令指定按照 C99 标准进行编译。</p><p>注意，<code>-std</code> 后面需要用 <code>=</code> 连接参数，而不是像上面的 <code>-o</code> 一样用空格，并且 <code>=</code> 前后也不能有多余的空格。</p><h2 id="vscode-写-c-的配置" tabindex="-1"><a class="header-anchor" href="#vscode-写-c-的配置"><span>VSCode 写 C 的配置</span></a></h2><p><code>tasks.json</code></p><pre><code class="language-json"><span class="token punctuation">{</span>
    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2.0.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;tasks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//这里构建build任务</span>
            <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;build&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;shell&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;gcc&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token comment">//此处为编译选项</span>
                <span class="token string">&quot;\${file}&quot;</span><span class="token punctuation">,</span><span class="token comment">//该(单文件编译)</span>
                <span class="token comment">//&quot;\${workspaceFolder}\\\\*.c&quot;,//(多文件编译)</span>
                <span class="token string">&quot;-o&quot;</span><span class="token punctuation">,</span>
                <span class="token comment">//承接上述,把源代码编译为对应exe文件,</span>
                <span class="token string">&quot;\${workspaceFolder}\\\\bin\\\\\${fileBasenameNoExtension}.exe&quot;</span><span class="token punctuation">,</span><span class="token comment">//(单文件编译)</span>
                <span class="token comment">//&quot;\${workspaceFolder}\\\\\${workspaceRootFolderName}.exe&quot;,//(多文件编译)</span>
                <span class="token string">&quot;-g&quot;</span><span class="token punctuation">,</span>
                <span class="token string">&quot;-Wall&quot;</span><span class="token punctuation">,</span><span class="token comment">//获取警告</span>
                <span class="token string">&quot;-static-libgcc&quot;</span><span class="token punctuation">,</span>
                <span class="token string">&quot;-fexec-charset=GBK&quot;</span><span class="token punctuation">,</span><span class="token comment">//按GBK编码</span>
                <span class="token string">&quot;-std=c11&quot;</span><span class="token comment">//选择C标准,这里按照你需要的换</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">&quot;group&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token comment">//把该任务放在build组中</span>
                <span class="token property">&quot;kind&quot;</span><span class="token operator">:</span> <span class="token string">&quot;build&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;isDefault&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;presentation&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token comment">//配置build任务的终端相关</span>
                <span class="token property">&quot;echo&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token property">&quot;reveal&quot;</span><span class="token operator">:</span> <span class="token string">&quot;always&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;focus&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                <span class="token property">&quot;panel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;new&quot;</span><span class="token comment">//为了方便每次都重新开启一个终端</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;problemMatcher&quot;</span><span class="token operator">:</span> <span class="token string">&quot;$gcc&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//这里配置run任务</span>
            <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;run&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;shell&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;dependsOn&quot;</span><span class="token operator">:</span> <span class="token string">&quot;build&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${workspaceFolder}\\\\bin\\\\\${fileBasenameNoExtension}.exe&quot;</span><span class="token punctuation">,</span><span class="token comment">//(单文件编译)</span>
            <span class="token comment">//&quot;command&quot;:&quot;\${workspaceFolder}\\\\\${workspaceRootFolderName}.exe&quot;,//(多文件编译)</span>
            <span class="token comment">//这里command与前面build中的编译输出对应</span>
            <span class="token property">&quot;group&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token comment">//这里把run任务放在test组中,方便我们使用快捷键来执行程序</span>
                <span class="token comment">//请人为修改&quot;设置&quot;,&quot;键盘快捷方式&quot;中的&quot;运行测试任务&quot;为&quot;你喜欢的键位&quot;</span>
                <span class="token comment">//推荐为&quot;ALT+某个字母键&quot;,使用该键来运行程序</span>
                <span class="token property">&quot;kind&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;isDefault&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">&quot;presentation&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token comment">//同理配置终端</span>
                <span class="token property">&quot;echo&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token property">&quot;reveal&quot;</span><span class="token operator">:</span> <span class="token string">&quot;always&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;focus&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token property">&quot;panel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;new&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><p><code>launch.json</code></p><pre><code class="language-json"><span class="token punctuation">{</span>
    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.2.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;configurations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token comment">//‘调试(Debug)</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Debug&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cppdbg&quot;</span><span class="token punctuation">,</span>
            <span class="token comment">// cppdbg对应cpptools提供的调试功能；只能是cppdbg</span>
            <span class="token property">&quot;request&quot;</span><span class="token operator">:</span> <span class="token string">&quot;launch&quot;</span><span class="token punctuation">,</span>
            <span class="token comment">//这里program指编译好的exe可执行文件的路径,与tasks中要对应</span>
            <span class="token property">&quot;program&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${workspaceFolder}\\\\bin\\\\\${fileBasenameNoExtension}.exe&quot;</span><span class="token punctuation">,</span> <span class="token comment">//(单文件调试)</span>
            <span class="token comment">//&quot;program&quot;: &quot;\${workspaceFolder}\\\\\${workspaceRootFolderName}.exe&quot;, //(多文件调试)</span>
            <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">&quot;stopAtEntry&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 这里改为true作用等同于在main处打断点</span>
            <span class="token property">&quot;cwd&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${fileDirname}&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 调试程序时的工作目录,即为源代码所在目录,不用改</span>
            <span class="token property">&quot;environment&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">&quot;externalConsole&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 改为true时为使用cmd终端,推荐使用vscode内部终端</span>
            <span class="token property">&quot;internalConsoleOptions&quot;</span><span class="token operator">:</span> <span class="token string">&quot;neverOpen&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 设为true为调试时聚焦调试控制台,新手用不到</span>
            <span class="token property">&quot;MIMode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;gdb&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;miDebuggerPath&quot;</span><span class="token operator">:</span> <span class="token string">&quot;D:\\\\MinGW\\\\bin\\\\gdb.exe&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;preLaunchTask&quot;</span><span class="token operator">:</span> <span class="token string">&quot;build&quot;</span> <span class="token comment">// 调试开始前执行的任务(任务依赖),与tasks.json的label相对应</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre>`,25))])}const g=o(r,[["render",i]]),h=JSON.parse('{"path":"/develop/C/","title":"C 语言","lang":"zh-CN","frontmatter":{"category":"C","tag":"C","description":"C 语言 C 语言教程 - 网道 C 语言是一种编译型语言，源码都是文本文件，本身无法执行。必须通过编译器，生成二进制的可执行文件，才能执行。编译器将代码从文本翻译成二进制指令的过程，就称为编译阶段，又称为“编译时”（compile time），跟运行阶段（又称为“运行时”）相区分。 目前，最常见的 C 语言编译器是自由软件基金会推出的 GCC 编译器...","head":[["meta",{"property":"og:url","content":"https://echo0d.github.io/DailyNotes/develop/C/"}],["meta",{"property":"og:site_name","content":"echo0d-notes"}],["meta",{"property":"og:title","content":"C 语言"}],["meta",{"property":"og:description","content":"C 语言 C 语言教程 - 网道 C 语言是一种编译型语言，源码都是文本文件，本身无法执行。必须通过编译器，生成二进制的可执行文件，才能执行。编译器将代码从文本翻译成二进制指令的过程，就称为编译阶段，又称为“编译时”（compile time），跟运行阶段（又称为“运行时”）相区分。 目前，最常见的 C 语言编译器是自由软件基金会推出的 GCC 编译器..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-27T10:02:18.000Z"}],["meta",{"property":"article:author","content":"echo0d"}],["meta",{"property":"article:tag","content":"C"}],["meta",{"property":"article:modified_time","content":"2025-03-27T10:02:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"C 语言\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-27T10:02:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"echo0d\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":2,"title":"Hello World 示例","slug":"hello-world-示例","link":"#hello-world-示例","children":[]},{"level":2,"title":"VSCode 写 C 的配置","slug":"vscode-写-c-的配置","link":"#vscode-写-c-的配置","children":[]}],"git":{"createdTime":1734332093000,"updatedTime":1743069738000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":4}]},"readingTime":{"minutes":3.82,"words":1146},"filePathRelative":"develop/C/README.md","localizedDate":"2024年12月16日","excerpt":"","autoDesc":true}');export{g as comp,h as data};
