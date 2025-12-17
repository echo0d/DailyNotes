import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,b as a,o as e}from"./app-_WqHyd2I.js";const o={};function p(c,t){return e(),n("div",null,[...t[0]||(t[0]=[a(`<h1 id="rust" tabindex="-1"><a class="header-anchor" href="#rust"><span>Rust</span></a></h1><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><blockquote><p>https://blog.csdn.net/qq_41879343/article/details/104802548</p></blockquote><p>官方安装教程：https://doc.rust-lang.org/nightly/book/ch01-01-installation.html 需要有代理</p><p>国内安装：</p><pre><code class="language-shell"><span class="token comment"># 第一步：加入中国科技大学网络镜像代理</span>
<span class="token comment"># 注意以上命令，仅仅在本次终端生效，切换终端，仍然需要再次执行一次</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">RUSTUP_DIST_SERVER</span><span class="token operator">=</span>https://mirrors.ustc.edu.cn/rust-static
<span class="token builtin class-name">export</span> <span class="token assign-left variable">RUSTUP_UPDATE_ROOT</span><span class="token operator">=</span>https://mirrors.ustc.edu.cn/rust-static/rustup

<span class="token comment"># 第二步：执行脚本命令，完成rust安装</span>
<span class="token function">curl</span> https://sh.rustup.rs <span class="token parameter variable">-sSf</span> <span class="token operator">|</span> <span class="token function">sh</span>
<span class="token comment"># 在安装的时候，会让你选择安装路径，我们输入 1 （默认安装）回车</span>
<span class="token comment"># 安装成功之后，会提示：Rust is installed now. Great!</span>

<span class="token comment"># 第三步：执行重新加载环境变量，使rustup命令生效</span>
<span class="token builtin class-name">source</span> <span class="token environment constant">$HOME</span>/.cargo/env
rustc <span class="token parameter variable">-V</span> 或 rustup <span class="token parameter variable">-v</span> 
<span class="token comment"># 有提示相关说明，则生效</span>

<span class="token comment"># 第四步：配置包管理镜像代理。</span>
<span class="token comment"># 在$HOME/.cargo目录下创建一个名为config的文本文件，其内容为：</span>
<span class="token punctuation">[</span>source.crates-io<span class="token punctuation">]</span>
registry <span class="token operator">=</span> <span class="token string">&quot;https://github.com/rust-lang/crates.io-index&quot;</span>
replace-with <span class="token operator">=</span> <span class="token string">&#39;ustc&#39;</span>
<span class="token punctuation">[</span>source.ustc<span class="token punctuation">]</span>
registry <span class="token operator">=</span> <span class="token string">&quot;git://mirrors.ustc.edu.cn/crates.io-index&quot;</span>

<span class="token comment"># 第五步：安装RSL，RLS（Rust Language Server）是官方提供的一个标准化的编辑器增强工具</span>
rustup self update <span class="token comment">#更新rustup到最新</span>
rustup component <span class="token function">add</span> rls rust-analysis rust-src

<span class="token comment"># 第六步：安装编译GCC工具链</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> build-essential


</code></pre><p>编译遇到如下问题：</p><pre><code>error[E0554]: \`#![feature]\` may not be used on the stable release channel
</code></pre><p>解决方案https://blog.51cto.com/u_15127689/4298646</p>`,9)])])}const i=s(o,[["render",p]]),u=JSON.parse('{"path":"/develop/Rust/","title":"Rust","lang":"zh-CN","frontmatter":{"category":"Rust","tags":["Rust"],"article":false,"description":"Rust 安装 https://blog.csdn.net/qq_41879343/article/details/104802548 官方安装教程：https://doc.rust-lang.org/nightly/book/ch01-01-installation.html 需要有代理 国内安装： 编译遇到如下问题： 解决方案https://blo...","head":[["meta",{"property":"og:url","content":"https://echo0d.github.io/DailyNotes/develop/Rust/"}],["meta",{"property":"og:site_name","content":"echo0d-notes"}],["meta",{"property":"og:title","content":"Rust"}],["meta",{"property":"og:description","content":"Rust 安装 https://blog.csdn.net/qq_41879343/article/details/104802548 官方安装教程：https://doc.rust-lang.org/nightly/book/ch01-01-installation.html 需要有代理 国内安装： 编译遇到如下问题： 解决方案https://blo..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-11T02:11:10.000Z"}],["meta",{"property":"article:author","content":"echo0d"}],["meta",{"property":"article:tag","content":"Rust"}],["meta",{"property":"article:modified_time","content":"2025-04-11T02:11:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"Rust\\",\\"description\\":\\"Rust 安装 https://blog.csdn.net/qq_41879343/article/details/104802548 官方安装教程：https://doc.rust-lang.org/nightly/book/ch01-01-installation.html 需要有代理 国内安装： 编译遇到如下问题： 解决方案https://blo...\\"}"]]},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]}],"git":{"createdTime":1734516754000,"updatedTime":1744337470000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":3}]},"readingTime":{"minutes":1.07,"words":320},"filePathRelative":"develop/Rust/README.md","localizedDate":"2024年12月18日","excerpt":"","autoDesc":true}');export{i as comp,u as data};
