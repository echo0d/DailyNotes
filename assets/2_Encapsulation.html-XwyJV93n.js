import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as t,o as p}from"./app-BLgHyi2a.js";const o={};function e(c,n){return p(),a("div",null,[...n[0]||(n[0]=[t(`<h1 id="_02-c-封装-encapsulation" tabindex="-1"><a class="header-anchor" href="#_02-c-封装-encapsulation"><span>02. C++ 封装(Encapsulation)</span></a></h1><h2 id="_1-struct" tabindex="-1"><a class="header-anchor" href="#_1-struct"><span>1 struct</span></a></h2><p>C++中的结构体 (struct) 是一种自定义数据类型，允许将不同类型的数据组合在一起。以下是结构体的主要内容：</p><p>基本定义和使用：</p><pre><code class="language-cpp"><span class="token keyword">struct</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token comment">// 成员变量</span>
    string name<span class="token punctuation">;</span>
    <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    
    <span class="token comment">// 成员函数</span>
    <span class="token keyword">void</span> <span class="token function">printInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Name: &quot;</span> <span class="token operator">&lt;&lt;</span> name <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;, Age: &quot;</span> <span class="token operator">&lt;&lt;</span> age <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 使用结构体</span>
Person p1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;Tom&quot;</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
p1<span class="token punctuation">.</span><span class="token function">printInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>与class的区别：</p><ul><li>Struct默认成员是public，class默认是private</li><li>Struct更适合用于简单的数据组织</li><li>功能上完全相同，都支持成员函数、继承等特性</li></ul><p>嵌套结构体：</p><pre><code class="language-cpp"><span class="token keyword">struct</span> <span class="token class-name">Address</span> <span class="token punctuation">{</span>
    string street<span class="token punctuation">;</span>
    string city<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    string name<span class="token punctuation">;</span>
    Address addr<span class="token punctuation">;</span>    <span class="token comment">// 结构体嵌套</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>常见用法：</p><pre><code class="language-cpp"><span class="token comment">// 结构体数组</span>
Person team<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 结构体指针</span>
Person<span class="token operator">*</span> p <span class="token operator">=</span> <span class="token keyword">new</span> Person<span class="token punctuation">;</span>
p<span class="token operator">-&gt;</span>name <span class="token operator">=</span> <span class="token string">&quot;Tom&quot;</span><span class="token punctuation">;</span>    <span class="token comment">// 使用-&gt;访问成员</span>

<span class="token comment">// 位域结构体</span>
<span class="token keyword">struct</span> <span class="token class-name">Flags</span> <span class="token punctuation">{</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> flag1 <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>    <span class="token comment">// 只占1位</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> flag2 <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">;</span>    <span class="token comment">// 占2位</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p><strong>注意事项：</strong></p><ol><li>内存对齐问题</li></ol><p>结构体成员在内存中不是简单连续排列的，而是按照对齐规则存储：</p><pre><code class="language-cpp"><span class="token keyword">struct</span> <span class="token class-name">Example</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> a<span class="token punctuation">;</span>     <span class="token comment">// 1字节</span>
    <span class="token keyword">int</span> b<span class="token punctuation">;</span>      <span class="token comment">// 4字节</span>
    <span class="token keyword">char</span> c<span class="token punctuation">;</span>     <span class="token comment">// 1字节</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>上面的结构体大小通常不是6字节，而是12字节，因为：</p><ul><li><code>a</code> 占1字节，但为了让 <code>b</code> 在4的倍数地址上，会填充3字节</li><li><code>b</code> 占4字节</li><li><code>c</code> 占1字节，可能再填充3字节以对齐整个结构体</li></ul><p>这会影响：</p><ul><li>结构体大小 (<code>sizeof</code>) 可能大于各成员大小之和</li><li>内存布局不是直观的连续排列</li><li>不同编译器可能有不同的对齐方式</li></ul><ol start="2"><li>大结构体传参时用引用</li></ol><p>当结构体包含大量数据时，传值会导致整个结构体被复制：</p><pre><code class="language-cpp"><span class="token comment">// 低效 - 复制整个结构体</span>
<span class="token keyword">void</span> <span class="token function">processData</span><span class="token punctuation">(</span>BigStruct data<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/*...*/</span> <span class="token punctuation">}</span>

<span class="token comment">// 高效 - 只传递引用</span>
<span class="token keyword">void</span> <span class="token function">processData</span><span class="token punctuation">(</span><span class="token keyword">const</span> BigStruct<span class="token operator">&amp;</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/*...*/</span> <span class="token punctuation">}</span>
</code></pre><p>使用引用可以：</p><ul><li>避免不必要的内存复制</li><li>提高性能</li><li>减少栈空间使用</li></ul><ol start="3"><li>包含指针成员时注意深浅拷贝</li></ol><p>当结构体含有指针成员时：</p><pre><code class="language-cpp"><span class="token keyword">struct</span> <span class="token class-name">Document</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span><span class="token operator">*</span> text<span class="token punctuation">;</span>
    <span class="token keyword">int</span> length<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>默认的复制操作只会复制指针值，而不是指针指向的内容。这会导致：</p><ul><li>两个结构体实例指向同一块内存</li><li>当一个实例释放内存时，另一个实例的指针变为悬空指针</li><li>需要自定义复制构造函数和赋值运算符实现深拷贝</li></ul><ol start="4"><li>初始化方式灵活</li></ol><p>C++提供多种初始化结构体的方式：</p><pre><code class="language-cpp"><span class="token keyword">struct</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
    <span class="token function">Point</span><span class="token punctuation">(</span><span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">x</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">y</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 使用构造函数</span>
Point <span class="token function">p1</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使用花括号列表(C++11)</span>
Point p2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
Point p3<span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 成员逐个赋值</span>
Point p4<span class="token punctuation">;</span>
p4<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
p4<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
</code></pre><p>选择适合场景的初始化方式可以使代码更清晰、更容易维护。</p><h2 id="_2-类-class" tabindex="-1"><a class="header-anchor" href="#_2-类-class"><span>2 类 (Class)</span></a></h2><p>类是C++中实现面向对象编程的核心机制，它是一种用户自定义的数据类型，将数据和操作数据的函数封装在一起。类定义了一种对象的模板，指定了该类型的对象所包含的数据和可执行的操作。</p><p>类的基本结构：</p><pre><code class="language-cpp"><span class="token keyword">class</span> 类名 <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// 公有成员（可被外部访问）</span>
    <span class="token comment">// 成员函数和数据</span>
    
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token comment">// 私有成员（只能被类内部访问）</span>
    <span class="token comment">// 成员函数和数据</span>
    
<span class="token keyword">protected</span><span class="token operator">:</span>
    <span class="token comment">// 保护成员（只能被类内部和派生类访问）</span>
    <span class="token comment">// 成员函数和数据</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><h2 id="_3-封装-encapsulation" tabindex="-1"><a class="header-anchor" href="#_3-封装-encapsulation"><span>3 封装 (Encapsulation)</span></a></h2><p>封装是面向对象编程的三大特性之一（另外两个是继承和多态），它指的是：</p><ol><li><strong>将数据和操作数据的函数绑定在一起</strong>，形成一个不可分割的整体</li><li><strong>隐藏对象的内部实现细节</strong>，只向外界提供有限的访问接口</li><li><strong>保护数据免受外部干扰和不合理操作</strong></li></ol><h3 id="_3-1-封装的实现方式" tabindex="-1"><a class="header-anchor" href="#_3-1-封装的实现方式"><span>3.1 封装的实现方式</span></a></h3><p>在您的代码示例中，<code>Date</code> 类展示了封装的基本实现：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Date</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">bool</span> <span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> year<span class="token punctuation">;</span>
    <span class="token keyword">int</span> month<span class="token punctuation">;</span>
    <span class="token keyword">int</span> day<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;year,month,day:&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    cin <span class="token operator">&gt;&gt;</span> year <span class="token operator">&gt;&gt;</span> month <span class="token operator">&gt;&gt;</span> day<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;year month day&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    cout <span class="token operator">&lt;&lt;</span> year <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">&lt;&lt;</span> month <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">&lt;&lt;</span> day <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">bool</span> <span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>year <span class="token operator">%</span> <span class="token number">4</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> year <span class="token operator">%</span> <span class="token number">100</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">||</span> year <span class="token operator">%</span> <span class="token number">400</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><ol><li><strong>数据隐藏</strong>：<code>year</code>、<code>month</code> 和 <code>day</code> 被声明为私有成员，外部代码不能直接读写这些变量</li><li><strong>通过接口访问</strong>：通过公有方法 <code>init()</code>、<code>print()</code> 和 <code>isLeapYear()</code> 提供对私有数据的访问和操作</li></ol><h3 id="_3-2-封装的优势" tabindex="-1"><a class="header-anchor" href="#_3-2-封装的优势"><span>3.2 封装的优势</span></a></h3><ol><li><strong>信息隐藏</strong>：隐藏实现细节，减少模块间耦合</li><li><strong>提高安全性</strong>：防止外部代码意外修改对象内部状态</li><li><strong>控制访问</strong>：可以实现对数据的验证和限制</li><li><strong>提高可维护性</strong>：可以修改类的内部实现而不影响使用该类的代码</li></ol><h3 id="_3-3-使用范例分析" tabindex="-1"><a class="header-anchor" href="#_3-3-使用范例分析"><span>3.3 使用范例分析</span></a></h3><p>在您的 <code>Date</code> 类中：</p><ul><li><code>init()</code> 方法控制日期的初始化（虽然没有验证有效性）</li><li><code>print()</code> 提供了日期的显示方式</li><li><code>isLeapYear()</code> 提供了基于内部数据的功能</li></ul><p>客户端代码只需关注这些公开方法，而不需要了解内部实现：</p><pre><code class="language-cpp"><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Date d<span class="token punctuation">;</span>         <span class="token comment">// 创建一个Date对象</span>
    d<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 通过公有方法初始化</span>
    d<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 通过公有方法显示</span>
    <span class="token comment">// 使用功能而不关心内部实现</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>d<span class="token punctuation">.</span><span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;leap year&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;not leap year&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>封装使得代码更模块化、更安全，且更易于理解和维护，是面向对象编程的关键原则之一。</p>`,52)])])}const i=s(o,[["render",e]]),k=JSON.parse('{"path":"/develop/CPP/2_Encapsulation.html","title":"02. C++ 封装(Encapsulation)","lang":"zh-CN","frontmatter":{"category":"C++","tags":["Cpp"],"description":"02. C++ 封装(Encapsulation) 1 struct C++中的结构体 (struct) 是一种自定义数据类型，允许将不同类型的数据组合在一起。以下是结构体的主要内容： 基本定义和使用： 与class的区别： Struct默认成员是public，class默认是private Struct更适合用于简单的数据组织 功能上完全相同，都支持...","head":[["meta",{"property":"og:url","content":"https://echo0d.github.io/DailyNotes/develop/CPP/2_Encapsulation.html"}],["meta",{"property":"og:site_name","content":"echo0d-notes"}],["meta",{"property":"og:title","content":"02. C++ 封装(Encapsulation)"}],["meta",{"property":"og:description","content":"02. C++ 封装(Encapsulation) 1 struct C++中的结构体 (struct) 是一种自定义数据类型，允许将不同类型的数据组合在一起。以下是结构体的主要内容： 基本定义和使用： 与class的区别： Struct默认成员是public，class默认是private Struct更适合用于简单的数据组织 功能上完全相同，都支持..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-15T03:35:09.000Z"}],["meta",{"property":"article:author","content":"echo0d"}],["meta",{"property":"article:tag","content":"Cpp"}],["meta",{"property":"article:modified_time","content":"2025-04-15T03:35:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"02. C++ 封装(Encapsulation)\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-15T03:35:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"echo0d\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":2,"title":"1 struct","slug":"_1-struct","link":"#_1-struct","children":[]},{"level":2,"title":"2 类 (Class)","slug":"_2-类-class","link":"#_2-类-class","children":[]},{"level":2,"title":"3 封装 (Encapsulation)","slug":"_3-封装-encapsulation","link":"#_3-封装-encapsulation","children":[{"level":3,"title":"3.1 封装的实现方式","slug":"_3-1-封装的实现方式","link":"#_3-1-封装的实现方式","children":[]},{"level":3,"title":"3.2 封装的优势","slug":"_3-2-封装的优势","link":"#_3-2-封装的优势","children":[]},{"level":3,"title":"3.3 使用范例分析","slug":"_3-3-使用范例分析","link":"#_3-3-使用范例分析","children":[]}]}],"git":{"createdTime":1744625071000,"updatedTime":1744688109000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":2}]},"readingTime":{"minutes":4.72,"words":1417},"filePathRelative":"develop/CPP/2_Encapsulation.md","localizedDate":"2025年4月14日","excerpt":"","autoDesc":true}');export{i as comp,k as data};
