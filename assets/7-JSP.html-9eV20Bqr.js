import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as t,o as e}from"./app-ClR9AqGF.js";const p="/DailyNotes/assets/image-20240813172037246-DZa0BJlN.png",o="/DailyNotes/assets/image-20240813172146967-CtPW01CJ.png",c="/DailyNotes/assets/image-20240813172712144-FNtRrAIg.png",l={};function u(i,n){return e(),a("div",null,[...n[0]||(n[0]=[t(`<h1 id="_7-javaweb-审计基础-jsp" tabindex="-1"><a class="header-anchor" href="#_7-javaweb-审计基础-jsp"><span>7-JavaWeb 审计基础-JSP</span></a></h1><h2 id="_1-jsp" tabindex="-1"><a class="header-anchor" href="#_1-jsp"><span>1. JSP</span></a></h2><p>JSP（全称：Java Server Pages）：Java 服务端页面。是一种动态的网页技术，其中既可以定义 HTML、JS、CSS 等静态内容，还可以定义 Java 代码的动态内容，也就是 <code>JSP = HTML + Java</code>。如下就是 jsp 代码</p><pre><code class="language-plaintext"> &lt;html&gt;
     &lt;head&gt;
         &lt;title&gt;Title&lt;/title&gt;
     &lt;/head&gt;
     &lt;body&gt;
         &lt;h1&gt;JSP,Hello World&lt;/h1&gt;
         &lt;%
             System.out.println(&quot;hello,jsp~&quot;);
         %&gt;
     &lt;/body&gt;
 &lt;/html&gt;
</code></pre><p>JSP 就是一个页面本质上就是一个 Servlet</p><h3 id="jsp-访问流程" tabindex="-1"><a class="header-anchor" href="#jsp-访问流程"><span><strong>JSP 访问流程</strong></span></a></h3><ul><li>浏览器第一次访问 <code>hello.jsp</code> 页面</li><li><code>tomcat</code> 会将 <code>hello.jsp</code> 转换为名为 <code>hello_jsp.java</code> 的一个 <code>Servlet</code></li><li><code>tomcat</code> 再将转换的 <code>servlet</code> 编译成字节码文件 <code>hello_jsp.class</code></li><li><code>tomcat</code> 会执行该字节码文件，向外提供服务</li></ul><p>此处用了 smart tomcat 运行的项目，我们可以找到<code>.SmartTomcat\\jsp\\jsp\\work\\Catalina\\localhost\\ROOT\\org\\apache\\jsp</code>目录，而这个目录下就能看到转换后的 <code>servlet</code>打开 <code>hello_jsp.java</code> 文件，可以看到有一个名为 <code>_jspService()</code> 的方法，该方法就是每次访问 <code>jsp</code> 时自动执行的方法，和 <code>servlet</code> 中的 <code>service</code> 方法一样 ，并且在 <code>_jspService()</code> 方法中可以看到往浏览器写标签的代码：</p><p>以前我们自己写 <code>servlet</code> 时，这部分代码是由我们自己来写，现在有了 <code>jsp</code> 后，由 tomcat 完成这部分功能。</p><p>在 <code>hello.jsp</code> 中书写</p><pre><code class="language-plaintext"> &lt;%=&quot;hello&quot;%&gt;
 &lt;%=i%&gt;
</code></pre><p>查看转换的 <code>hello_jsp.java</code> 文件，该脚本的内容被放在了 <code>out.print()</code> 中，作为参数</p><figure><img src="`+p+`" alt="image-20240813172037246" tabindex="0" loading="lazy"><figcaption>image-20240813172037246</figcaption></figure><p>在 <code>hello.jsp</code> 中书写</p><pre><code class="language-plaintext"> &lt;%!
     void  show(){}
     String name = &quot;zhangsan&quot;;
 %&gt;
</code></pre><p>通过浏览器访问 <code>hello.jsp</code> 后，查看转换的 <code>hello_jsp.java</code> 文件，该脚本的内容被放在了成员位置</p><figure><img src="`+o+`" alt="image-20240813172146967" tabindex="0" loading="lazy"><figcaption>image-20240813172146967</figcaption></figure><h2 id="_2-el-表达式" tabindex="-1"><a class="header-anchor" href="#_2-el-表达式"><span>2. EL 表达式</span></a></h2><p>EL（全称 Expression Language ）表达式语言，用于简化 JSP 页面内的 Java 代码。EL 表达式的主要作用是 获取数据。其实就是从域对象中获取数据，然后将数据展示在页面上，如：<code>\${brands} </code>就是获取域中存储的 key 为 brands 的数据。</p><h3 id="代码演示" tabindex="-1"><a class="header-anchor" href="#代码演示"><span>代码演示</span></a></h3><ul><li><p>定义 servlet，在 servlet 中封装一些数据并存储到 request 域对象中并转发到 <code>el-demo.jsp</code> 页面。</p><pre><code class="language-java"><span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span><span class="token string">&quot;/demo1&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ServletDemo1</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//1. 准备数据</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Users</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Users</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;uName01&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;man&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;123456&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Users</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;uName02&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;woman&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;123456789&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Users</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;uName03&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;man&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;123456&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//2. 存储到request域中</span>
        request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;Users&quot;</span><span class="token punctuation">,</span><span class="token class-name">Users</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//3. 转发</span>
        request<span class="token punctuation">.</span><span class="token function">getRequestDispatcher</span><span class="token punctuation">(</span><span class="token string">&quot;/el-demo.jsp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doPost</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">doGet</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></li><li><p>在 <code>el-demo.jsp</code> 中通过 EL 表达式 获取数据</p><pre><code class="language-jsp">&lt;%@ page contentType=&quot;text/html;charset=UTF-8&quot; language=&quot;java&quot; %&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    \${Users}
&lt;/body&gt;
&lt;/html&gt;
</code></pre></li><li><p>在浏览器的地址栏输入 <code>demo1</code>这个 servlet ，页面效果如下：</p><figure><img src="`+c+`" alt="image-20240813172712144" tabindex="0" loading="lazy"><figcaption>image-20240813172712144</figcaption></figure></li></ul><h3 id="域对象" tabindex="-1"><a class="header-anchor" href="#域对象"><span>域对象</span></a></h3><p>JavaWeb 中有四大域对象，分别是：</p><ul><li><p>page：</p><p>有效范围 pageContext：只在一个页面中保存属性，跳转后无效</p><p>作用：代表 jsp 中</p></li><li><p>request：</p><p>作用：提供对请求数据的访问，提供用于加入特定请求数据访问</p><p>有效范围：只在当前请求中保存，服务器跳转有效，客户端跳转无效</p><p>主要用于处理用户的提交信息</p></li><li><p>session：</p><p>作用：用于保存客户端与服务端之间的数据</p><p>有效范围：在一次会话中有效，无论何种跳转都有效。</p></li><li><p>application：</p><p>有效范围：整个项目，项目关闭、重启数据会丢失，如果项目不关闭，所有用户访问该项目的所有页面都可以获取 application</p></li></ul><h2 id="_3-jstl-标签" tabindex="-1"><a class="header-anchor" href="#_3-jstl-标签"><span>3. JSTL 标签</span></a></h2><p>JSP 标准标签库(Jsp Standarded Tag Library) ，使用标签取代 JSP 页面上的 Java 代码。如下代码就是 JSTL 标签</p><pre><code class="language-jsp">&lt;c:if test=&quot;\${flag == 1}&quot;&gt;
    男
&lt;/c:if&gt;
&lt;c:if test=&quot;\${flag == 2}&quot;&gt;
    女
&lt;/c:if&gt;
</code></pre><p>上面代码看起来是不是比 JSP 中嵌套 Java 代码看起来舒服好了。而且前端工程师对标签是特别敏感的，他们看到这段代码是能看懂的。</p><p>JSTL 提供了很多标签，如下图</p><table><thead><tr><th>标签</th><th>描述</th></tr></thead><tbody><tr><td>&lt;c:out&gt;</td><td>用于在 JSP 中显示数据，就像&lt;%= ... &gt;</td></tr><tr><td>&lt;c:set&gt;</td><td>用于保存数据</td></tr><tr><td>&lt;c:remove&gt;</td><td>用于删除数据</td></tr><tr><td>&lt;c:catch&gt;</td><td>用来处理产生错误的异常状况，并且将错误信息储存起来</td></tr><tr><td>&lt;c:if&gt;</td><td>与我们在一般程序中用的 if 一样</td></tr><tr><td>&lt;c:choose&gt;</td><td>本身只当做&lt;c:when&gt;和&lt;c:otherwise&gt;的父标签</td></tr><tr><td>&lt;c:when&gt;</td><td>&lt;c:choose&gt;的子标签，用来判断条件是否成立</td></tr><tr><td>&lt;c:otherwise&gt;</td><td>&lt;c:choose&gt;的子标签，接在&lt;c:when&gt;标签后，当&lt;c:when&gt;标签判断为 false 时被执行</td></tr><tr><td>&lt;c:import&gt;</td><td>检索一个绝对或相对 URL，然后将其内容暴露给页面</td></tr><tr><td>&lt;c:forEach&gt;</td><td>基础迭代标签，接受多种集合类型</td></tr><tr><td>&lt;c:forToken&gt;</td><td>根据指定的分隔符来分隔内容并迭代输出</td></tr><tr><td>&lt;c:param&gt;</td><td>用来给包含或重定向的页面传递参数</td></tr><tr><td>&lt;c:redirect&gt;</td><td>重定向至一个新的 URL.</td></tr><tr><td>&lt;c:url&gt;</td><td>使用可选的查询参数来创造一个 URL</td></tr></tbody></table><h3 id="jstl-使用流程" tabindex="-1"><a class="header-anchor" href="#jstl-使用流程"><span>JSTL 使用流程</span></a></h3><ul><li><p>添加 maven 依赖</p><pre><code class="language-xml"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>jstl<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>jstl<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>taglibs<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>standard<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.1.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre></li><li><p>在 JSP 页面上引入 JSTL 标签库</p><pre><code class="language-jsp">&lt;%@ taglib prefix=&quot;c&quot; uri=&quot;http://java.sun.com/jsp/jstl/core&quot; %&gt;
</code></pre></li><li><p>使用标签</p></li></ul><h3 id="if-标签" tabindex="-1"><a class="header-anchor" href="#if-标签"><span>if 标签</span></a></h3><p><code>&lt;c:if&gt;</code>：相当于 if 判断</p><ul><li>属性：test，用于定义条件表达式</li></ul><pre><code class="language-jsp">&lt;c:if test=&quot;\${flag == 1}&quot;&gt;
    男
&lt;/c:if&gt;
&lt;c:if test=&quot;\${flag == 2}&quot;&gt;
    女
&lt;/c:if&gt;
</code></pre><p><strong>代码演示：</strong></p><ul><li><p>定义一个 <code>servlet</code> ，在该 <code>servlet</code> 中向 request 域对象中添加 键是 <code>status</code> ，值为 <code>1</code> 的数据</p><pre><code class="language-java"><span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span><span class="token string">&quot;/demo2&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ServletDemo2</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//1. 存储数据到request域中</span>
        request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//2. 转发到 jstl-if.jsp</span>
        数据request<span class="token punctuation">.</span><span class="token function">getRequestDispatcher</span><span class="token punctuation">(</span><span class="token string">&quot;/jstl-if.jsp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doPost</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">doGet</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></li><li><p>定义 <code>jstl-if.jsp</code> 页面，在该页面使用 <code>&lt;c:if&gt;</code> 标签</p><pre><code class="language-jsp">&lt;%@ page contentType=&quot;text/html;charset=UTF-8&quot; language=&quot;java&quot; %&gt;
&lt;%@ taglib prefix=&quot;c&quot; uri=&quot;http://java.sun.com/jsp/jstl/core&quot; %&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;%--
        c:if：来完成逻辑判断，替换java  if else
    --%&gt;
    &lt;c:if test=&quot;\${status ==1}&quot;&gt;
        启用
    &lt;/c:if&gt;

    &lt;c:if test=&quot;\${status ==0}&quot;&gt;
        禁用
    &lt;/c:if&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre></li></ul><h3 id="foreach-标签" tabindex="-1"><a class="header-anchor" href="#foreach-标签"><span>forEach 标签</span></a></h3><p><code>&lt;c:forEach&gt;</code>：相当于 for 循环。java 中有增强 for 循环和普通 for 循环，JSTL 中的 <code>&lt;c:forEach&gt;</code> 也有两种用法</p><p><strong>用法一</strong></p><p>类似于 Java 中的增强 for 循环。涉及到的 <code>&lt;c:forEach&gt;</code> 中的属性如下</p><ul><li>items：被遍历的容器</li><li>var：遍历产生的临时变量</li><li>varStatus：遍历状态对象</li></ul><p>如下代码，是从域对象中获取名为 brands 数据，该数据是一个集合；遍历遍历，并给该集合中的每一个元素起名为 <code>brand</code>，是 Brand 对象。在循环里面使用 EL 表达式获取每一个 Brand 对象的属性值</p><pre><code class="language-jsp">&lt;c:forEach items=&quot;\${Users}&quot; var=&quot;User&quot;&gt;
    &lt;tr&quot;&gt;
        &lt;td&gt;\${User.userName}&lt;/td&gt;
        &lt;td&gt;\${brand.sex}&lt;/td&gt;
        &lt;td&gt;\${brand.phoneNumber}&lt;/td&gt;
    &lt;/tr&gt;
&lt;/c:forEach&gt;
</code></pre><p>代码演示：</p><ul><li><p>新建<code>JSTLForeachServletDemo</code> servlet:</p><pre><code class="language-java"><span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span><span class="token string">&quot;/demo3&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JSTLForeachServletDemo</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//1. 准备数据</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Users</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Users</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;uName01&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;man&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;123456&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Users</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;uName02&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;woman&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;123456789&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Users</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;uName03&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;man&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;123456&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//2. 存储到request域中</span>
        request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;Users&quot;</span><span class="token punctuation">,</span><span class="token class-name">Users</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//3. 转发</span>
        request<span class="token punctuation">.</span><span class="token function">getRequestDispatcher</span><span class="token punctuation">(</span><span class="token string">&quot;/jstl-foreach.jsp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doPost</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">doGet</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></li><li><p>定义名为 <code>jstl-foreach.jsp</code> 页面，内容如下：</p><pre><code class="language-jsp">&lt;%@ page contentType=&quot;text/html;charset=UTF-8&quot; language=&quot;java&quot; %&gt;
&lt;%@ taglib prefix=&quot;c&quot; uri=&quot;http://java.sun.com/jsp/jstl/core&quot; %&gt;

&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;hr&gt;
&lt;table border=&quot;1&quot; cellspacing=&quot;0&quot; width=&quot;800&quot;&gt;
    &lt;tr&gt;
        &lt;th&gt;姓名&lt;/th&gt;
        &lt;th&gt;性别&lt;/th&gt;
        &lt;th&gt;手机号&lt;/th&gt;

    &lt;/tr&gt;
    &lt;c:forEach items=&quot;\${Users}&quot; var=&quot;User&quot;&gt;
        &lt;tr&gt;
            &lt;td&gt;\${User.userName}&lt;/td&gt;
            &lt;td&gt;\${User.sex}&lt;/td&gt;
            &lt;td&gt;\${User.phoneNumber}&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/c:forEach&gt;
&lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre></li></ul><p>效果：</p><p><strong>用法二</strong></p><p>类似于 Java 中的普通 for 循环。涉及到的 <code>&lt;c:forEach&gt;</code> 中的属性如下</p><ul><li>begin：开始数</li><li>end：结束数</li><li>step：步长</li></ul><p>实例代码：</p><p>从 0 循环到 10，变量名是 <code>i</code> ，每次自增 1</p><pre><code class="language-jsp">&lt;c:forEach begin=&quot;0&quot; end=&quot;10&quot; step=&quot;1&quot; var=&quot;i&quot;&gt;
    \${i}
&lt;/c:forEach&gt;
</code></pre><p>效果：</p>`,55)])])}const d=s(l,[["render",u]]),g=JSON.parse('{"path":"/CodeAudittutorial/2-JavaWeb/7-JSP.html","title":"7-JavaWeb 审计基础-JSP","lang":"zh-CN","frontmatter":{"category":"代码审计","tag":"Java","description":"7-JavaWeb 审计基础-JSP 1. JSP JSP（全称：Java Server Pages）：Java 服务端页面。是一种动态的网页技术，其中既可以定义 HTML、JS、CSS 等静态内容，还可以定义 Java 代码的动态内容，也就是 JSP = HTML + Java。如下就是 jsp 代码 JSP 就是一个页面本质上就是一个 Servle...","head":[["meta",{"property":"og:url","content":"https://echo0d.github.io/DailyNotes/CodeAudittutorial/2-JavaWeb/7-JSP.html"}],["meta",{"property":"og:site_name","content":"echo0d-notes"}],["meta",{"property":"og:title","content":"7-JavaWeb 审计基础-JSP"}],["meta",{"property":"og:description","content":"7-JavaWeb 审计基础-JSP 1. JSP JSP（全称：Java Server Pages）：Java 服务端页面。是一种动态的网页技术，其中既可以定义 HTML、JS、CSS 等静态内容，还可以定义 Java 代码的动态内容，也就是 JSP = HTML + Java。如下就是 jsp 代码 JSP 就是一个页面本质上就是一个 Servle..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-06-04T09:27:16.000Z"}],["meta",{"property":"article:author","content":"echo0d"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:modified_time","content":"2025-06-04T09:27:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"7-JavaWeb 审计基础-JSP\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-06-04T09:27:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"echo0d\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":2,"title":"1. JSP","slug":"_1-jsp","link":"#_1-jsp","children":[{"level":3,"title":"JSP 访问流程","slug":"jsp-访问流程","link":"#jsp-访问流程","children":[]}]},{"level":2,"title":"2. EL 表达式","slug":"_2-el-表达式","link":"#_2-el-表达式","children":[{"level":3,"title":"代码演示","slug":"代码演示","link":"#代码演示","children":[]},{"level":3,"title":"域对象","slug":"域对象","link":"#域对象","children":[]}]},{"level":2,"title":"3. JSTL 标签","slug":"_3-jstl-标签","link":"#_3-jstl-标签","children":[{"level":3,"title":"JSTL 使用流程","slug":"jstl-使用流程","link":"#jstl-使用流程","children":[]},{"level":3,"title":"if 标签","slug":"if-标签","link":"#if-标签","children":[]},{"level":3,"title":"forEach 标签","slug":"foreach-标签","link":"#foreach-标签","children":[]}]}],"git":{"createdTime":1703388937000,"updatedTime":1749029236000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":6}]},"readingTime":{"minutes":6.38,"words":1915},"filePathRelative":"CodeAudittutorial/2-JavaWeb/7-JSP.md","localizedDate":"2023年12月24日","excerpt":"\\n","autoDesc":true}');export{d as comp,g as data};
