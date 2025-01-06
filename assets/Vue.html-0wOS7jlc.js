import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as s,o as i}from"./app-Btk8SoLK.js";const t={};function l(o,e){return i(),a("div",null,e[0]||(e[0]=[s(`<h1 id="vue3" tabindex="-1"><a class="header-anchor" href="#vue3"><span>Vue3</span></a></h1><h2 id="_1-简介-环境配置" tabindex="-1"><a class="header-anchor" href="#_1-简介-环境配置"><span>1. 简介&amp;环境配置</span></a></h2><p>特点和优势</p><ul><li><strong>响应式数据绑定</strong>：Vue.js 提供强大的响应式数据绑定系统，确保数据的变化能够自动反映到视图层，减少了开发者手动操作 DOM 的需要。</li><li><strong>组件化</strong>：Vue.js 提倡将应用分解为小的、可复用的组件，增强了代码的组织性、可维护性和重用性。</li><li><strong>灵活性和渐进性</strong>：Vue.js 是一个渐进式框架，可以按需引入其特性（如 Vue Router 和 Vuex），适应不同规模的项目。</li><li>.... 后面不想抄了</li></ul><p>使用之间要安装nodejs、npm</p><h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目"><span>创建项目</span></a></h2><ul><li><code>npm create</code> ：用于执行项目模板的命令，它会创建一个新的项目，并从给定的模板中初始化。</li><li><code>vite@latest</code> ：vite 是创建 Vue 3 项目的工具，<code>@latest</code> 是指定使用最新版的 Vite，确保你创建的项目是基于最新版本的 Vite。如果没有 <code>@latest</code>，<code>npm</code> 会尝试使用当前安装的版本。</li><li><code>&lt;project-name&gt;</code>：新创建项目的文件夹名称。命令会创建一个文件夹，并将模板代码放入其中。例如，运行 <code>npm create vite@latest my-vue-app --template vue</code> 会在当前目录下创建一个名为 <code>my-vue-app</code> 的文件夹，并将 Vue 项目的模板文件放入其中。</li><li><code>--template vue</code>：<code>--template vue</code> 指定了要使用的模板类型。Vite 支持多种模板，<code>vue</code> 是专门为 Vue 3 提供的模板。还有其他模板，如 <code>vanilla</code>、<code>react</code>、<code>svelte</code> 等。</li></ul><h3 id="npm-create" tabindex="-1"><a class="header-anchor" href="#npm-create"><span>npm create</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 最新稳定版</span>
$ <span class="token function">npm</span> init vue@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这一指令将会安装并执行 create-vue，它是 Vue 官方的项目脚手架工具。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> init vue@latest
Need to <span class="token function">install</span> the following packages:
  create-vue@3.6.1
Ok to proceed? <span class="token punctuation">(</span>y<span class="token punctuation">)</span> y

Vue.js - The Progressive JavaScript Framework

<span class="token comment"># 这里需要进行一些配置，项目名输入 vue3-test，其他默认回车即可</span>
-<span class="token operator">&gt;</span> Project name: … vue3-test
-<span class="token operator">&gt;</span> Add TypeScript? … No / Yes
-<span class="token operator">&gt;</span> Add JSX Support? … No / Yes
-<span class="token operator">&gt;</span> Add Vue Router <span class="token keyword">for</span> Single Page Application development? … No / Yes
-<span class="token operator">&gt;</span> Add Pinia <span class="token keyword">for</span> state management? … No / Yes
-<span class="token operator">&gt;</span> Add Vitest <span class="token keyword">for</span> Unit Testing? … No / Yes
-<span class="token operator">&gt;</span> Add an End-to-End Testing Solution? › No
-<span class="token operator">&gt;</span> Add ESLint <span class="token keyword">for</span> code quality? … No / Yes

Scaffolding project <span class="token keyword">in</span> vue3-test<span class="token punctuation">..</span>.

Done. Now run:

  <span class="token builtin class-name">cd</span> runoob-vue3-test
  <span class="token function">npm</span> <span class="token function">install</span>
  <span class="token function">npm</span> run dev

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vite" tabindex="-1"><a class="header-anchor" href="#vite"><span>vite</span></a></h3><p><code>vite</code>创建vue项目时：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> create vite@latest scan-pro -- <span class="token parameter variable">--template</span> vue
Need to <span class="token function">install</span> the following packages:
Need to <span class="token function">install</span> the following packages:
  create-vite@6.1.1
  <span class="token comment"># 这里按照提示选择javascript或typescript</span>
√ Select a variant: » JavaScript

Scaffolding project <span class="token keyword">in</span> E:<span class="token punctuation">\\</span>scan-pro<span class="token punctuation">..</span>.

Done. Now run:

  <span class="token builtin class-name">cd</span> scan-pro
  <span class="token function">npm</span> <span class="token function">install</span>
  <span class="token function">npm</span> run dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vue-ui" tabindex="-1"><a class="header-anchor" href="#vue-ui"><span>vue ui</span></a></h3><blockquote><p>下面是抄的菜鸟教程</p></blockquote><p>除了使用 vue create 命令创建项目，我们还可以使用可视化创建工具来创建项目。</p><p>运行命令：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ vue ui
-<span class="token operator">&gt;</span>  Starting GUI<span class="token punctuation">..</span>.
-<span class="token operator">&gt;</span>  Ready on http://localhost:8000
<span class="token punctuation">..</span>.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行以上命令，会在浏览器弹出一个项目管理的界面：</p><figure><img src="https://www.runoob.com/wp-content/uploads/2021/12/6C6FBF13-54BF-4DBC-8019-6442A51C03F3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们可以点击<strong>创建</strong>选项来创建一个项目，选择底部&quot;在此创建项目&quot;，页面上方也可以选择路径：</p><figure><img src="https://www.runoob.com/wp-content/uploads/2021/12/E13FFC51-7F39-4510-83DC-948772041083.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后输入我们的项目名称，选择包管理工具为 npm，然后点击下一步：</p><figure><img src="https://www.runoob.com/wp-content/uploads/2021/12/33B0E553-7AD4-4A5A-AF5C-20305C0F5793.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>配置选择默认即可:</p><figure><img src="https://www.runoob.com/wp-content/uploads/2021/12/69A83D7A-C7FB-478B-8DA0-40BF673F160F.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>接下来就等待完成安装，安装完成管理界面如下：</p><figure><img src="https://www.runoob.com/wp-content/uploads/2021/12/4AE552A2-2AE4-4B23-AECA-90CE7D29C047-scaled.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,29)]))}const p=n(t,[["render",l],["__file","Vue.html.vue"]]),r=JSON.parse('{"path":"/develop/FrontEnd/Vue.html","title":"Vue3","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"1. 简介&环境配置","slug":"_1-简介-环境配置","link":"#_1-简介-环境配置","children":[]},{"level":2,"title":"创建项目","slug":"创建项目","link":"#创建项目","children":[{"level":3,"title":"npm create","slug":"npm-create","link":"#npm-create","children":[]},{"level":3,"title":"vite","slug":"vite","link":"#vite","children":[]},{"level":3,"title":"vue ui","slug":"vue-ui","link":"#vue-ui","children":[]}]}],"git":{"createdTime":1736157182000,"updatedTime":1736157182000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":1}]},"readingTime":{"minutes":2.69,"words":807},"filePathRelative":"develop/FrontEnd/Vue.md","localizedDate":"2025年1月6日","excerpt":"\\n<h2>1. 简介&amp;环境配置</h2>\\n<p>特点和优势</p>\\n<ul>\\n<li><strong>响应式数据绑定</strong>：Vue.js 提供强大的响应式数据绑定系统，确保数据的变化能够自动反映到视图层，减少了开发者手动操作 DOM 的需要。</li>\\n<li><strong>组件化</strong>：Vue.js 提倡将应用分解为小的、可复用的组件，增强了代码的组织性、可维护性和重用性。</li>\\n<li><strong>灵活性和渐进性</strong>：Vue.js 是一个渐进式框架，可以按需引入其特性（如 Vue Router 和 Vuex），适应不同规模的项目。</li>\\n<li>.... 后面不想抄了</li>\\n</ul>"}');export{p as comp,r as data};
