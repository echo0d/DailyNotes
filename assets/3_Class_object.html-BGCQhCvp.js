import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as p,o as t}from"./app-BLgHyi2a.js";const o={};function e(c,n){return t(),a("div",null,[...n[0]||(n[0]=[p(`<h1 id="_03-c-类与对象-class-object" tabindex="-1"><a class="header-anchor" href="#_03-c-类与对象-class-object"><span>03. C++ 类与对象(Class &amp;&amp;object)</span></a></h1><h2 id="_1-类成员函数-访问修饰符" tabindex="-1"><a class="header-anchor" href="#_1-类成员函数-访问修饰符"><span>1 类成员函数&amp;访问修饰符</span></a></h2><h3 id="_1-1-类成员函数" tabindex="-1"><a class="header-anchor" href="#_1-1-类成员函数"><span>1.1 类成员函数</span></a></h3><p>类的成员函数是指那些把定义和原型写在类定义内部的函数，就像类定义中的其他变量一样。类成员函数是类的一个成员，它可以操作类的任意对象，可以访问对象中的所有成员。</p><p>成员函数可以定义在类定义内部，或者单独使用<strong>范围解析运算符 ::</strong> 来定义。在类定义中定义的成员函数把函数声明为<strong>内联</strong>的，即便没有使用 inline 标识符。所以您可以按照如下方式定义 <strong>getVolume()</strong> 函数：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Box</span>
<span class="token punctuation">{</span>
   <span class="token keyword">public</span><span class="token operator">:</span>
      <span class="token keyword">double</span> length<span class="token punctuation">;</span>      <span class="token comment">// 长度</span>
      <span class="token keyword">double</span> breadth<span class="token punctuation">;</span>     <span class="token comment">// 宽度</span>
      <span class="token keyword">double</span> height<span class="token punctuation">;</span>      <span class="token comment">// 高度</span>
   
      <span class="token keyword">double</span> <span class="token function">getVolume</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         <span class="token keyword">return</span> length <span class="token operator">*</span> breadth <span class="token operator">*</span> height<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>您也可以在类的外部使用<strong>范围解析运算符 <code>::</code></strong> 定义该函数，如下所示：</p><pre><code class="language-cpp"><span class="token keyword">double</span> <span class="token class-name">Box</span><span class="token double-colon punctuation">::</span><span class="token function">getVolume</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> length <span class="token operator">*</span> breadth <span class="token operator">*</span> height<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>在这里，需要强调一点，在 :: 运算符之前必须使用类名。调用成员函数是在对象上使用点运算符（<strong>.</strong>），这样它就能操作与该对象相关的数据，如下所示：</p><pre><code class="language-cpp">Box myBox<span class="token punctuation">;</span> <span class="token comment">// 创建一个对象 </span>
myBox<span class="token punctuation">.</span><span class="token function">getVolume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 调用该对象的成员函数</span>
</code></pre><h3 id="_1-2-类访问修饰符" tabindex="-1"><a class="header-anchor" href="#_1-2-类访问修饰符"><span>1.2 类访问修饰符</span></a></h3><p>C++提供了三种主要的访问修饰符，用于控制类成员（变量和函数）的访问权限：</p><ol><li>Public</li></ol><ul><li>可以在类的内部和外部直接访问</li><li>类的对象可以直接访问public成员</li><li>在您的代码中，<code>length</code> 是public成员，因此可以直接通过 <code>box.length = 10.0</code> 来访问</li></ul><ol start="2"><li>Private</li></ol><ul><li>只能在类的内部访问，外部无法直接访问</li><li>在您的代码中，<code>width</code> 是private成员，无法通过 <code>box.width = 10.0</code> 直接访问</li><li>必须通过public方法如 <code>setWidth()</code> 和 <code>getWidth()</code> 来间接访问</li></ul><ol start="3"><li>Protected</li></ol><ul><li>在您的代码中没有使用，但它是C++的第三种访问修饰符</li><li>类似于private，但允许派生类 (子类) 访问</li><li>对于类的对象和外部函数仍然是不可见的</li></ul><h2 id="_2-友元" tabindex="-1"><a class="header-anchor" href="#_2-友元"><span>2 友元</span></a></h2><p>C++中的友元是一种允许非成员函数或其他类访问类的私有和保护成员的机制。友元打破了类的封装性，但在特定情况下非常有用。</p><p>友元主要有以下几种类型：</p><ol><li><p><strong>友元函数</strong> - 允许普通函数访问类的私有成员：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Box</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">double</span> length<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// 声明一个友元函数</span>
    <span class="token keyword">friend</span> <span class="token keyword">void</span> <span class="token function">printLength</span><span class="token punctuation">(</span>Box box<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 友元函数实现，可以直接访问Box的私有成员</span>
<span class="token keyword">void</span> <span class="token function">printLength</span><span class="token punctuation">(</span>Box box<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Length: &quot;</span> <span class="token operator">&lt;&lt;</span> box<span class="token punctuation">.</span>length <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></li><li><p><strong>友元类</strong> - 允许另一个类访问当前类的所有私有和保护成员：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">BoxManager</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">updateBox</span><span class="token punctuation">(</span>Box<span class="token operator">&amp;</span> box<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 可以直接访问Box的私有成员</span>
        box<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">10.0</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Box</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">double</span> length<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// 声明BoxManager为友元类</span>
    <span class="token keyword">friend</span> <span class="token keyword">class</span> <span class="token class-name">BoxManager</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></li><li><p><strong>友元成员函数</strong> - 允许另一个类的特定成员函数访问当前类的私有成员：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Box</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">double</span> length<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// 仅声明特定的成员函数为友元</span>
    <span class="token keyword">friend</span> <span class="token keyword">void</span> <span class="token class-name">BoxManager</span><span class="token double-colon punctuation">::</span><span class="token function">resize</span><span class="token punctuation">(</span>Box<span class="token operator">&amp;</span> box<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></li></ol><p>友元的应用场景：</p><ul><li>运算符重载（特别是二元运算符）</li><li>需要高效访问两个紧密相关类的私有数据</li><li>需要从外部函数访问类的内部状态进行测试或调试</li></ul><p>需要注意的是：</p><ul><li>友元关系不是相互的，A是B的友元并不意味着B是A的友元</li><li>友元关系不能被继承</li><li>过度使用友元会破坏封装性，增加代码的耦合度</li></ul><p>友元在平衡封装性和灵活性之间提供了一种有用的机制，但应谨慎使用，以免破坏面向对象的设计原则。</p><pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Box</span>
<span class="token punctuation">{</span>
    <span class="token keyword">double</span> width<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">friend</span> <span class="token keyword">void</span> <span class="token function">printWidth</span><span class="token punctuation">(</span>Box box<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">friend</span> <span class="token keyword">class</span> <span class="token class-name">BigBox</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">setWidth</span><span class="token punctuation">(</span><span class="token keyword">double</span> wid<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">BigBox</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span> <span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">Print</span><span class="token punctuation">(</span><span class="token keyword">int</span> width<span class="token punctuation">,</span> Box <span class="token operator">&amp;</span>box<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// BigBox是Box的友元类，它可以直接访问Box类的任何成员</span>
        box<span class="token punctuation">.</span><span class="token function">setWidth</span><span class="token punctuation">(</span>width<span class="token punctuation">)</span><span class="token punctuation">;</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Width of box : &quot;</span> <span class="token operator">&lt;&lt;</span> box<span class="token punctuation">.</span>width <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 成员函数定义</span>
<span class="token keyword">void</span> <span class="token class-name">Box</span><span class="token double-colon punctuation">::</span><span class="token function">setWidth</span><span class="token punctuation">(</span><span class="token keyword">double</span> wid<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    width <span class="token operator">=</span> wid<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 请注意：printWidth() 不是任何类的成员函数</span>
<span class="token keyword">void</span> <span class="token function">printWidth</span><span class="token punctuation">(</span>Box box<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/* 因为 printWidth() 是 Box 的友元，它可以直接访问该类的任何成员 */</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Width of box : &quot;</span> <span class="token operator">&lt;&lt;</span> box<span class="token punctuation">.</span>width <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 程序的主函数</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Box box<span class="token punctuation">;</span>
    BigBox big<span class="token punctuation">;</span>

    <span class="token comment">// 使用成员函数设置宽度</span>
    box<span class="token punctuation">.</span><span class="token function">setWidth</span><span class="token punctuation">(</span><span class="token number">10.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 使用友元函数输出宽度</span>
    <span class="token function">printWidth</span><span class="token punctuation">(</span>box<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 使用友元类中的方法设置宽度</span>
    big<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> box<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">getchar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="_3-构造与析构" tabindex="-1"><a class="header-anchor" href="#_3-构造与析构"><span>3 构造与析构</span></a></h2><p>在C++中，构造函数和析构函数是类中特殊的成员函数，它们在对象的生命周期中扮演着关键角色。</p><p>构造函数在对象创建时自动调用，负责初始化对象的数据成员。它与类同名，没有返回类型，可以有多个版本（重载）。构造函数的主要作用是确保对象在创建时处于有效状态。例如，如果要为Date类添加构造函数，可以这样写：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Date</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// 默认构造函数</span>
    <span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">year</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">month</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">day</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    
    <span class="token comment">// 带参数的构造函数</span>
    <span class="token function">Date</span><span class="token punctuation">(</span><span class="token keyword">int</span> y<span class="token punctuation">,</span> <span class="token keyword">int</span> m<span class="token punctuation">,</span> <span class="token keyword">int</span> d<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">year</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">month</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">day</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    
    <span class="token comment">// 其他成员...</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> year<span class="token punctuation">;</span>
    <span class="token keyword">int</span> month<span class="token punctuation">;</span>
    <span class="token keyword">int</span> day<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>构造函数使用初始化列表（冒号后面的部分）是初始化成员的推荐方式，它比在函数体内赋值更高效。有了构造函数后，创建对象变得更加简洁：</p><pre><code class="language-cpp">Date today<span class="token punctuation">;</span>           <span class="token comment">// 使用默认构造函数，日期为2000-1-1</span>
Date <span class="token function">birthday</span><span class="token punctuation">(</span><span class="token number">1990</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 使用带参数构造函数</span>
</code></pre><p>与构造函数相对的是析构函数，它在对象销毁时自动调用。析构函数名称是类名前加波浪号 (~)，没有参数，没有返回类型，且每个类只能有一个析构函数。析构函数主要用于释放对象占用的资源，如动态内存、打开的文件或数据库连接等。</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Date</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// 构造函数</span>
    <span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">year</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">month</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">day</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Date object created&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 析构函数</span>
    <span class="token operator">~</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Date object destroyed&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 其他成员...</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>当对象生命周期结束时（如局部对象离开作用域，或动态分配的对象被delete），析构函数自动调用。在Date类中可能不需要特别的清理工作，因为它只包含基本类型的成员，但对于管理资源的类，析构函数至关重要。</p><p>构造函数和析构函数共同构成了C++的RAII (资源获取即初始化) 机制，使资源管理变得自动化和安全。例如，处理动态内存的类可能在构造函数中分配内存，在析构函数中释放内存，这样可以防止内存泄漏。</p><p>当类没有显式定义构造函数时，编译器会生成一个默认构造函数，但它可能不会初始化成员变量（基本类型成员将包含垃圾值）。同样，如果没有定义析构函数，编译器也会生成一个默认版本。但对于管理资源的类，您几乎总是需要自己定义这些特殊函数。</p><p>在实际开发中，合理设计构造和析构函数是编写健壮C++类的基础，它们确保对象的创建和销毁过程安全、可预测，并符合资源管理的最佳实践。</p><h2 id="_4-多文件编程" tabindex="-1"><a class="header-anchor" href="#_4-多文件编程"><span>4 多文件编程</span></a></h2><p>C++的多文件编程是组织和管理大型项目的重要技术，它允许我们将程序分散到多个文件中，增强代码的可读性、可维护性和可复用性。</p><p>在多文件编程中，通常将类的声明和实现分开：类的声明（类定义）放在头文件 (. H或. Hpp) 中，而类的实现（成员函数定义）放在源文件 (. Cpp) 中。这种分离有助于隐藏实现细节，只向用户展示接口。</p><p>以Date类为例，我们可以将其拆分为多文件形式：</p><p>首先创建一个头文件 <code>Date.h</code>：</p><pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">DATE_H  </span><span class="token comment">// 防止头文件重复包含</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">DATE_H</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">Date</span>
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

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">// DATE_H</span></span>
</code></pre><p>然后创建实现文件 <code>Date.cpp</code>：</p><pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;Date.h&quot;</span>  <span class="token comment">// 包含自己的头文件</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

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
</code></pre><p>最后，创建主程序文件 <code>main.cpp</code>：</p><pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;Date.h&quot;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Date d<span class="token punctuation">;</span>
    d<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    d<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>d<span class="token punctuation">.</span><span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;leap year&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;not leap year&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>多文件编程的优势包括：</p><ol><li>提高代码的可维护性，一个文件专注于一个功能模块</li><li>实现信息隐藏，用户只需关注头文件中的接口</li><li>加速编译过程，修改一个文件只需重新编译该文件</li><li>方便多人协作开发，不同人员可以负责不同的文件</li><li>促进代码复用，通过头文件可以在多个项目中使用相同的类</li></ol><p>编译多文件程序时，需要将所有源文件一起编译，或分别编译后链接：</p><pre><code>g++ -o program main.cpp Date.cpp
</code></pre><p>或者：</p><pre><code>g++ -c main.cpp
g++ -c Date.cpp
g++ -o program main.o Date.o
</code></pre><p>在多文件编程中，头文件保护（如 <code>#ifndef</code> 和 <code>#define</code> 指令）非常重要，可以防止头文件被重复包含导致的编译错误。另外，头文件中应该只包含必要的声明，避免包含太多实现细节。</p><h2 id="_5-拷贝构造-copy-contructor" tabindex="-1"><a class="header-anchor" href="#_5-拷贝构造-copy-contructor"><span>5 拷贝构造(Copy contructor)</span></a></h2><p>C++中的拷贝构造函数是一种特殊的构造函数，它用于创建一个对象的副本。当我们需要基于已有对象创建新对象时，拷贝构造函数会被调用。</p><p>拷贝构造函数的特点是它接受同类型的常量引用作为参数。对于Date类，一个拷贝构造函数可以这样定义：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Date</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// 现有成员函数</span>
    <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">bool</span> <span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 拷贝构造函数</span>
    <span class="token function">Date</span><span class="token punctuation">(</span><span class="token keyword">const</span> Date<span class="token operator">&amp;</span> other<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token operator">-&gt;</span>year <span class="token operator">=</span> other<span class="token punctuation">.</span>year<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token operator">-&gt;</span>month <span class="token operator">=</span> other<span class="token punctuation">.</span>month<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token operator">-&gt;</span>day <span class="token operator">=</span> other<span class="token punctuation">.</span>day<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> year<span class="token punctuation">;</span>
    <span class="token keyword">int</span> month<span class="token punctuation">;</span>
    <span class="token keyword">int</span> day<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>拷贝构造函数会在以下情况被自动调用：</p><ol><li><p>用一个对象初始化另一个同类对象：</p><pre><code class="language-cpp">Date original<span class="token punctuation">;</span>
original<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Date copy <span class="token operator">=</span> original<span class="token punctuation">;</span>  <span class="token comment">// 调用拷贝构造函数</span>
</code></pre></li><li><p>将对象作为参数按值传递给函数：</p><pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token function">displayDate</span><span class="token punctuation">(</span>Date d<span class="token punctuation">)</span> <span class="token punctuation">{</span> d<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

Date original<span class="token punctuation">;</span>
<span class="token function">displayDate</span><span class="token punctuation">(</span>original<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// original被拷贝</span>
</code></pre></li><li><p>函数返回对象（按值返回）：</p><pre><code class="language-cpp">Date <span class="token function">getToday</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Date d<span class="token punctuation">;</span>
    d<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> d<span class="token punctuation">;</span>  <span class="token comment">// 返回时可能调用拷贝构造</span>
<span class="token punctuation">}</span>
</code></pre></li></ol><p>如果您没有定义拷贝构造函数，编译器会生成一个默认的拷贝构造函数，它会执行成员的逐个拷贝（浅拷贝）。对于像Date这样只包含基本类型的简单类，默认拷贝构造通常就足够了。</p><p>但当类包含指针成员或管理动态资源时，默认的浅拷贝可能导致问题，因为多个对象会指向同一块内存。这时需要自定义拷贝构造函数来执行深拷贝，确保每个对象拥有自己的资源副本。</p><p>拷贝构造是C++中实现对象复制的重要机制，与赋值运算符重载一起，构成了类的复制控制功能。在需要精确控制对象复制行为的场合，正确实现拷贝构造函数是必不可少的。</p><p>如果类管理动态分配的资源（如指针成员），则必须实现深拷贝以避免多个对象共享同一资源导致的问题。例如：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">StringHolder</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// 构造函数</span>
    <span class="token function">StringHolder</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            length <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
            data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>length <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token function">strcpy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> str<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">&#39;\\0&#39;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 拷贝构造函数（深拷贝）</span>
    <span class="token function">StringHolder</span><span class="token punctuation">(</span><span class="token keyword">const</span> StringHolder<span class="token operator">&amp;</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        length <span class="token operator">=</span> other<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>length <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>  <span class="token comment">// 为新对象分配独立内存</span>
        <span class="token function">strcpy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> other<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 复制内容</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 析构函数释放内存</span>
    <span class="token operator">~</span><span class="token function">StringHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">char</span><span class="token operator">*</span> data<span class="token punctuation">;</span>
    size_t length<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>这个例子中的拷贝构造函数执行了深拷贝，确保每个对象拥有自己独立的内存空间，避免了资源共享带来的问题。</p><h2 id="_6-内联函数" tabindex="-1"><a class="header-anchor" href="#_6-内联函数"><span>6 内联函数</span></a></h2><p>C++ <strong>内联函数</strong>是通常与类一起使用。如果一个函数是内联的，那么在编译时，编译器会把该函数的代码副本放置在每个调用该函数的地方。</p><p>如果想把一个函数定义为内联函数，则需要在函数名前面放置关键字 <strong>inline</strong>，在调用函数之前需要对函数进行定义。</p><p>在类定义中的定义的函数都是内联函数，即使没有使用 <strong>inline</strong> 说明符。</p><p>只有当函数只有 10 行甚至更少时才将其定义为内联函数.</p><pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
 
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token keyword">inline</span> <span class="token keyword">int</span> <span class="token function">Max</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token punctuation">(</span>x <span class="token operator">&gt;</span> y<span class="token punctuation">)</span><span class="token operator">?</span> x <span class="token operator">:</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 程序的主函数</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span> <span class="token punctuation">)</span>
<span class="token punctuation">{</span>

   cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Max (20,10): &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">Max</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
   cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Max (0,200): &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">Max</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
   cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Max (100,1010): &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">Max</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">1010</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
   <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><h2 id="_7-const-static" tabindex="-1"><a class="header-anchor" href="#_7-const-static"><span>7 const &amp; static</span></a></h2><h3 id="_7-1-const-修饰符" tabindex="-1"><a class="header-anchor" href="#_7-1-const-修饰符"><span>7.1 const 修饰符</span></a></h3><p>在<code>Date</code>类中，可以使用<code>const</code>修饰不修改对象状态的成员函数，表明这些函数不会改变对象的数据成员：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Date</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 不是const，因为修改了对象的状态</span>
    <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>  <span class="token comment">// 可以是const，因为只是读取数据</span>
    <span class="token keyword">bool</span> <span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>  <span class="token comment">// 可以是const，因为只是读取并计算</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> year<span class="token punctuation">;</span>
    <span class="token keyword">int</span> month<span class="token punctuation">;</span>
    <span class="token keyword">int</span> day<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p><code>const</code>成员函数的实现也需要相应的修饰：</p><pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
<span class="token punctuation">{</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;year month day&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    cout <span class="token operator">&lt;&lt;</span> year <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">&lt;&lt;</span> month <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">&lt;&lt;</span> day <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">bool</span> <span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>year <span class="token operator">%</span> <span class="token number">4</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> year <span class="token operator">%</span> <span class="token number">100</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">||</span> year <span class="token operator">%</span> <span class="token number">400</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>使用<code>const</code>成员函数的好处包括：</p><ol><li>明确表示函数不会修改对象的状态</li><li>允许对常量对象调用该函数</li><li>编译器会检查确保函数不会修改任何成员变量</li></ol><p>在代码中使用常量对象时，只能调用<code>const</code>成员函数：</p><pre><code class="language-cpp"><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">const</span> Date fixedDate <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">2024</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  <span class="token comment">// 创建常量对象</span>
    <span class="token comment">// fixedDate.init();  // 错误！不能对常量对象调用非const成员函数</span>
    fixedDate<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 正确，可以调用const成员函数</span>
    
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fixedDate<span class="token punctuation">.</span><span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;leap year&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;not leap year&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
        
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p><code>const</code>还可以用于函数参数和返回值，特别是在传递对象引用时：</p><pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token function">displayDate</span><span class="token punctuation">(</span><span class="token keyword">const</span> Date<span class="token operator">&amp;</span> date<span class="token punctuation">)</span>  <span class="token comment">// 使用const引用避免复制并防止修改</span>
<span class="token punctuation">{</span>
    date<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Date<span class="token operator">&amp;</span> <span class="token function">getEarlierDate</span><span class="token punctuation">(</span><span class="token keyword">const</span> Date<span class="token operator">&amp;</span> date1<span class="token punctuation">,</span> <span class="token keyword">const</span> Date<span class="token operator">&amp;</span> date2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 比较逻辑...</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>条件<span class="token punctuation">)</span>
        <span class="token keyword">return</span> date1<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token keyword">return</span> date2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>对于 <code>Date</code> 类，建议对不修改对象状态的函数都添加 <code>const</code> 修饰符，这样可以增强代码的安全性和清晰度。</p><h3 id="_7-2-static-修饰符" tabindex="-1"><a class="header-anchor" href="#_7-2-static-修饰符"><span>7.2 static 修饰符</span></a></h3><p>C++中的 <code>static</code> 修饰符用于类成员（变量和函数）时，表示该成员属于类本身，而不是类的实例。静态成员在所有对象间共享，只有一个副本存在于内存中，无论创建了多少个对象。</p><p>静态成员变量必须在类外进行初始化，通常在某个源文件（.cpp文件）中定义。对于<code>Date</code>类，可以添加一些静态成员的例子：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Date</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">bool</span> <span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 静态成员函数，判断给定年份是否闰年</span>
    <span class="token keyword">static</span> <span class="token keyword">bool</span> <span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token keyword">int</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 返回已创建的Date对象总数</span>
    <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> year<span class="token punctuation">;</span>
    <span class="token keyword">int</span> month<span class="token punctuation">;</span>
    <span class="token keyword">int</span> day<span class="token punctuation">;</span>
    
    <span class="token comment">// 静态成员变量，记录创建的对象数量</span>
    <span class="token keyword">static</span> <span class="token keyword">int</span> count<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 在类外初始化静态成员变量</span>
<span class="token keyword">int</span> Date<span class="token double-colon punctuation">::</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">// 静态成员函数的实现</span>
<span class="token keyword">bool</span> <span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token keyword">int</span> y<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>y <span class="token operator">%</span> <span class="token number">4</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> y <span class="token operator">%</span> <span class="token number">100</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">||</span> y <span class="token operator">%</span> <span class="token number">400</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> count<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>然后在构造函数中增加计数器：</p><pre><code class="language-cpp"><span class="token comment">// 构造函数</span>
<span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    year <span class="token operator">=</span> <span class="token number">2000</span><span class="token punctuation">;</span>
    month <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    day <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    count<span class="token operator">++</span><span class="token punctuation">;</span>  <span class="token comment">// 增加对象计数</span>
<span class="token punctuation">}</span>

<span class="token comment">// 析构函数</span>
<span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token operator">~</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    count<span class="token operator">--</span><span class="token punctuation">;</span>  <span class="token comment">// 减少对象计数</span>
<span class="token punctuation">}</span>
</code></pre><p>静态成员有以下特点：</p><ol><li>静态成员变量属于整个类，所有对象共享一个副本</li><li>静态成员函数不能访问非静态成员，因为它们不与任何对象关联</li><li>静态成员可以通过类名直接访问，无需创建对象</li></ol><p>使用静态成员的示例：</p><pre><code class="language-cpp"><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 通过类名调用静态函数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token number">2024</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;2024 is a leap year&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    
    Date d1<span class="token punctuation">;</span>
    Date d2<span class="token punctuation">;</span>
    
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Number of Date objects: &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>  <span class="token comment">// 输出2</span>
    
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>  <span class="token comment">// 对象销毁时，count减为0</span>
<span class="token punctuation">}</span>
</code></pre><p>静态成员的常见用途包括：</p><ol><li>记录类的实例数量</li><li>实现单例模式（确保一个类只有一个实例）</li><li>提供不需要对象状态的工具函数</li><li>在对象之间共享数据</li></ol><p>添加静态成员可以增强 <code>Date</code> 类的功能性和实用性，特别是当需要跟踪或共享与日期相关的通用信息时。</p><h4 id="_7-2-1-举例" tabindex="-1"><a class="header-anchor" href="#_7-2-1-举例"><span>7.2.1 举例</span></a></h4><p><strong>静态函数实现</strong></p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Point</span><span class="token punctuation">(</span><span class="token keyword">double</span> x<span class="token punctuation">,</span> <span class="token keyword">double</span> y<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">x</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">y</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">distance</span><span class="token punctuation">(</span><span class="token keyword">const</span> Point<span class="token operator">&amp;</span> point1<span class="token punctuation">,</span> <span class="token keyword">const</span> Point<span class="token operator">&amp;</span> point2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token function">pow</span><span class="token punctuation">(</span>point1<span class="token punctuation">.</span>x <span class="token operator">-</span> point2<span class="token punctuation">.</span>x<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">pow</span><span class="token punctuation">(</span>point1<span class="token punctuation">.</span>y <span class="token operator">-</span> point2<span class="token punctuation">.</span>y<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><p>调用方式：</p><pre><code class="language-cpp">Point <span class="token function">p1</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Point <span class="token function">p2</span><span class="token punctuation">(</span><span class="token number">4.0</span><span class="token punctuation">,</span> <span class="token number">6.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> dist <span class="token operator">=</span> <span class="token class-name">Point</span><span class="token double-colon punctuation">::</span><span class="token function">distance</span><span class="token punctuation">(</span>p1<span class="token punctuation">,</span> p2<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><p><strong>非静态函数实现</strong></p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Point</span><span class="token punctuation">(</span><span class="token keyword">double</span> x<span class="token punctuation">,</span> <span class="token keyword">double</span> y<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">x</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">y</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">double</span> <span class="token function">distance</span><span class="token punctuation">(</span><span class="token keyword">const</span> Point<span class="token operator">&amp;</span> other<span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token function">pow</span><span class="token punctuation">(</span>x <span class="token operator">-</span> other<span class="token punctuation">.</span>x<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">pow</span><span class="token punctuation">(</span>y <span class="token operator">-</span> other<span class="token punctuation">.</span>y<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><p>调用方式：</p><pre><code class="language-cpp">Point <span class="token function">p1</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Point <span class="token function">p2</span><span class="token punctuation">(</span><span class="token number">4.0</span><span class="token punctuation">,</span> <span class="token number">6.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> dist <span class="token operator">=</span> p1<span class="token punctuation">.</span><span class="token function">distance</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p><strong>1. 非静态函数需要依赖对象实例</strong></p><ul><li><p><strong>当前实现（<code>static</code>）</strong>：</p><ul><li><code>distance</code> 是一个静态成员函数，与具体的 <code>Point</code> 对象无关。</li><li>调用时可以直接通过类名调用，例如：<code>Point::distance(point1, point2)</code>。</li><li>静态函数不能访问类的非静态成员变量（如 <code>x</code> 和 <code>y</code>），因为它不依赖于任何对象实例。</li></ul></li><li><p><strong>如果去掉 <code>static</code></strong>：</p><ul><li><code>distance</code> 将变成一个非静态成员函数，必须通过某个 <code>Point</code> 对象调用。</li><li>例如：<code>point1.distance(point2)</code>，此时 <code>distance</code> 函数的第一个参数隐式绑定到调用它的对象 <code>point1</code>。</li></ul></li></ul><p><strong>2. 函数签名的变化</strong></p><ul><li><strong>当前签名（静态函数）</strong>：</li></ul><pre><code class="language-cpp">  <span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">distance</span><span class="token punctuation">(</span><span class="token keyword">const</span> Point<span class="token operator">&amp;</span> point1<span class="token punctuation">,</span> <span class="token keyword">const</span> Point<span class="token operator">&amp;</span> point2<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
</code></pre><ul><li><p>需要显式传入两个 <code>Point</code> 对象作为参数。</p></li><li><p><strong>去掉 <code>static</code> 后的签名</strong>：</p></li></ul><pre><code class="language-cpp">  <span class="token keyword">double</span> <span class="token function">distance</span><span class="token punctuation">(</span><span class="token keyword">const</span> Point<span class="token operator">&amp;</span> other<span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>
  
</code></pre><ul><li>只需要传入一个 <code>Point</code> 对象作为参数，另一个 <code>Point</code> 对象是调用该函数的对象（<code>this</code> 指针）。</li></ul><p><strong>3. 使用方式的变化</strong></p><p><strong>当前（静态函数）</strong></p><p>调用方式：</p><pre><code class="language-cpp">Point <span class="token function">point1</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Point <span class="token function">point2</span><span class="token punctuation">(</span><span class="token number">4.0</span><span class="token punctuation">,</span> <span class="token number">6.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> dist <span class="token operator">=</span> <span class="token class-name">Point</span><span class="token double-colon punctuation">::</span><span class="token function">distance</span><span class="token punctuation">(</span>point1<span class="token punctuation">,</span> point2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 通过类名调用</span>

</code></pre><p><strong>去掉 <code>static</code> 后（非静态函数）</strong></p><p>调用方式：</p><pre><code class="language-cpp">Point <span class="token function">point1</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Point <span class="token function">point2</span><span class="token punctuation">(</span><span class="token number">4.0</span><span class="token punctuation">,</span> <span class="token number">6.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> dist <span class="token operator">=</span> point1<span class="token punctuation">.</span><span class="token function">distance</span><span class="token punctuation">(</span>point2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 通过对象调用</span>

</code></pre><p><strong>4. 设计上的影响</strong></p><ul><li><p><strong>静态函数的优点</strong>：</p><ul><li>逻辑上更清晰：<code>distance</code> 函数的功能是计算两点之间的距离，与某个具体的 <code>Point</code> 对象无关，因此设计为静态函数更符合直觉。</li><li>更灵活：可以直接通过类名调用，而不需要依赖某个对象实例。</li></ul></li><li><p><strong>非静态函数的优点</strong>：</p><ul><li>如果 <code>distance</code> 函数的逻辑需要频繁使用调用对象的成员变量（如 <code>x</code> 和 <code>y</code>），设计为非静态函数可能更方便。</li><li>例如，调用 <code>point1.distance(point2)</code> 时，<code>point1</code> 的坐标可以直接通过 <code>this</code> 指针访问。</li></ul></li></ul><p><strong>5. 性能上的影响</strong></p><ul><li><p><strong>静态函数</strong>：</p><ul><li>不需要传递隐式的 <code>this</code> 指针，调用开销略低。</li><li>更适合与类的实例无关的功能。</li></ul></li><li><p><strong>非静态函数</strong>：</p><ul><li>需要传递隐式的 <code>this</code> 指针，调用开销略高。</li><li>适合需要访问调用对象的成员变量的功能。</li></ul></li></ul><p><strong>6. 结论</strong></p><ul><li><p><strong>保留 <code>static</code></strong>：</p><ul><li>如果 <code>distance</code> 函数的逻辑与具体的 <code>Point</code> 对象无关（如当前实现），设计为静态函数更合理。</li><li>适合计算两点之间的距离这种独立于对象的功能。</li></ul></li><li><p><strong>去掉 <code>static</code></strong>：</p><ul><li>如果希望通过调用对象直接计算与另一个点的距离，设计为非静态函数更方便。</li><li>适合需要频繁访问调用对象的成员变量的功能。</li></ul></li></ul><p>在上面的场景中，<code>distance</code> 函数的逻辑与具体的 <code>Point</code> 对象无关，因此保留 <code>static</code> 是更好的选择。</p><h3 id="_7-3-static-const-成员" tabindex="-1"><a class="header-anchor" href="#_7-3-static-const-成员"><span>7.3 <code>static const</code> 成员</span></a></h3><p><code>static const</code> 成员是C++类中的特殊成员，它们结合了静态成员的共享性和常量成员的不可修改性。这种成员在所有对象间共享，并且在程序执行期间其值不会改变。</p><p>对于<code>Date</code>类，可以添加一些<code>static const</code>成员来表示与日期相关的常量：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Date</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">bool</span> <span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 静态常量成员，表示月份数</span>
    <span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token keyword">int</span> MONTHS_IN_YEAR <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 静态常量数组必须在类外定义</span>
    <span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token keyword">int</span> DAYS_IN_MONTH<span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 获取某月的天数</span>
    <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getDaysInMonth</span><span class="token punctuation">(</span><span class="token keyword">int</span> month<span class="token punctuation">,</span> <span class="token keyword">bool</span> isLeap<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> year<span class="token punctuation">;</span>
    <span class="token keyword">int</span> month<span class="token punctuation">;</span>
    <span class="token keyword">int</span> day<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 在类外定义静态常量数组</span>
<span class="token keyword">const</span> <span class="token keyword">int</span> Date<span class="token double-colon punctuation">::</span>DAYS_IN_MONTH<span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 静态方法实现</span>
<span class="token keyword">int</span> <span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">getDaysInMonth</span><span class="token punctuation">(</span><span class="token keyword">int</span> month<span class="token punctuation">,</span> <span class="token keyword">bool</span> isLeap<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>month <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> month <span class="token operator">&gt;</span> MONTHS_IN_YEAR<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>  <span class="token comment">// 无效月份</span>
        
    <span class="token keyword">if</span> <span class="token punctuation">(</span>month <span class="token operator">==</span> <span class="token number">2</span> <span class="token operator">&amp;&amp;</span> isLeap<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token number">29</span><span class="token punctuation">;</span>  <span class="token comment">// 闰年2月</span>
        
    <span class="token keyword">return</span> DAYS_IN_MONTH<span class="token punctuation">[</span>month<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p><code>static const</code>成员的特点：</p><ol><li>整型和枚举类型的<code>static const</code>成员可以直接在类内初始化</li><li>其他类型的<code>static const</code>成员（如数组）必须在类外定义</li><li>这些成员可以通过类名直接访问，不需要创建对象</li><li>它们在编译时确定值，可以用在需要编译时常量的场合</li></ol><p>使用这些静态常量的例子：</p><pre><code class="language-cpp"><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 通过类名访问静态常量</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Months in a year: &quot;</span> <span class="token operator">&lt;&lt;</span> Date<span class="token double-colon punctuation">::</span>MONTHS_IN_YEAR <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    
    <span class="token comment">// 使用静态方法</span>
    <span class="token keyword">int</span> daysInFeb2024 <span class="token operator">=</span> <span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">getDaysInMonth</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">Date</span><span class="token double-colon punctuation">::</span><span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token number">2024</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Days in February 2024: &quot;</span> <span class="token operator">&lt;&lt;</span> daysInFeb2024 <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    
    Date d<span class="token punctuation">;</span>
    d<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    d<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 检查日期是否有效</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>d<span class="token punctuation">.</span>month <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> d<span class="token punctuation">.</span>month <span class="token operator">&lt;=</span> Date<span class="token double-colon punctuation">::</span>MONTHS_IN_YEAR<span class="token punctuation">)</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Valid month&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
        
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p><code>static const</code>成员的常见用途：</p><ol><li>定义类相关的常量，如最大值、最小值、默认值等</li><li>替代#define宏定义，提供类型安全和作用域控制</li><li>实现编译时常量，可用于数组大小、case标签等需要编译时常量的场合</li></ol><p>添加这些静态常量可以使 <code>Date</code> 类更加完善，并提高代码的可读性和可维护性。</p><p>C++中的指向类成员的指针是一种特殊的指针类型，它允许我们访问类的成员函数和数据成员。这种指针与普通指针不同，因为它需要与对象实例结合使用才能访问实际成员。</p><h2 id="_8-指针" tabindex="-1"><a class="header-anchor" href="#_8-指针"><span>8 指针</span></a></h2><h3 id="_8-1-this-指针" tabindex="-1"><a class="header-anchor" href="#_8-1-this-指针"><span>8.1 This 指针</span></a></h3><p>C++中的this指针是一个特殊的隐式指针，它指向调用成员函数的当前对象。每个非静态成员函数都包含一个this指针，无需定义就可以在函数内部使用。</p><pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
 
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>
 
<span class="token keyword">class</span> <span class="token class-name">Box</span>
<span class="token punctuation">{</span>
   <span class="token keyword">public</span><span class="token operator">:</span>
      <span class="token comment">// 构造函数定义</span>
      <span class="token function">Box</span><span class="token punctuation">(</span><span class="token keyword">double</span> l<span class="token operator">=</span><span class="token number">2.0</span><span class="token punctuation">,</span> <span class="token keyword">double</span> b<span class="token operator">=</span><span class="token number">2.0</span><span class="token punctuation">,</span> <span class="token keyword">double</span> h<span class="token operator">=</span><span class="token number">2.0</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         cout <span class="token operator">&lt;&lt;</span><span class="token string">&quot;调用构造函数。&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
         length <span class="token operator">=</span> l<span class="token punctuation">;</span>
         breadth <span class="token operator">=</span> b<span class="token punctuation">;</span>
         height <span class="token operator">=</span> h<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">double</span> <span class="token function">Volume</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         <span class="token keyword">return</span> length <span class="token operator">*</span> breadth <span class="token operator">*</span> height<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span>Box box<span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token operator">-&gt;</span><span class="token function">Volume</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> box<span class="token punctuation">.</span><span class="token function">Volume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token keyword">private</span><span class="token operator">:</span>
      <span class="token keyword">double</span> length<span class="token punctuation">;</span>     <span class="token comment">// 宽度</span>
      <span class="token keyword">double</span> breadth<span class="token punctuation">;</span>    <span class="token comment">// 长度</span>
      <span class="token keyword">double</span> height<span class="token punctuation">;</span>     <span class="token comment">// 高度</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
 
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   Box <span class="token function">Box1</span><span class="token punctuation">(</span><span class="token number">3.3</span><span class="token punctuation">,</span> <span class="token number">1.2</span><span class="token punctuation">,</span> <span class="token number">1.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 声明 box1</span>
   Box <span class="token function">Box2</span><span class="token punctuation">(</span><span class="token number">8.5</span><span class="token punctuation">,</span> <span class="token number">6.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 声明 box2</span>
 
   <span class="token keyword">if</span><span class="token punctuation">(</span>Box1<span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>Box2<span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Box2 的体积比 Box1 小&quot;</span> <span class="token operator">&lt;&lt;</span>endl<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">else</span>
   <span class="token punctuation">{</span>
      cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Box2 的体积大于或等于 Box1&quot;</span> <span class="token operator">&lt;&lt;</span>endl<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><p><strong>this指针的主要用途：</strong></p><ul><li><p>区分成员变量和同名参数：</p><pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token function">setLength</span><span class="token punctuation">(</span><span class="token keyword">double</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token operator">-&gt;</span>length <span class="token operator">=</span> length<span class="token punctuation">;</span> <span class="token comment">// this-&gt;length是成员变量，length是参数</span>
<span class="token punctuation">}</span>
</code></pre></li><li><p>返回对象自身以支持链式调用：</p><pre><code class="language-cpp">Box<span class="token operator">&amp;</span> <span class="token function">setDimensions</span><span class="token punctuation">(</span><span class="token keyword">double</span> l<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    length <span class="token operator">=</span> l<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token comment">// 返回当前对象的引用</span>
<span class="token punctuation">}</span>
<span class="token comment">// 使用方式: Box1.setDimensions(5.0).setWidth(3.0);</span>
</code></pre></li><li><p>在成员函数中引用当前对象：</p><pre><code class="language-cpp"><span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span>Box box<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token operator">-&gt;</span><span class="token function">Volume</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> box<span class="token punctuation">.</span><span class="token function">Volume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></li></ul><p>在您的代码中，<code>compare</code> 方法使用this指针调用当前Box对象的Volume () 方法，并与参数box对象的Volume () 进行比较：</p><pre><code class="language-cpp"><span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span>Box box<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token operator">-&gt;</span><span class="token function">Volume</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> box<span class="token punctuation">.</span><span class="token function">Volume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>虽然可以简写为 <code>Volume() &gt; box.Volume()</code>，但使用this-&gt;可以让代码更加明确，表示调用的是当前对象的方法。</p><p>注意，静态成员函数不含this指针，因为它们不属于特定对象，而this指针本身不能被修改。</p><h3 id="_8-2-指向类的指针" tabindex="-1"><a class="header-anchor" href="#_8-2-指向类的指针"><span>8.2 指向类的指针</span></a></h3><p>一个指向 C++ 类的指针与指向结构的指针类似，访问指向类的指针的成员，需要使用成员访问运算符 <strong>-&gt;</strong>，就像访问指向结构的指针一样。与所有的指针一样，您必须在使用指针之前，对指针进行初始化。</p><p>在 C++ 中，指向类的指针指向一个类的对象，与普通的指针相似，指向类的指针可以用于访问对象的成员变量和成员函数。</p><pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">int</span> data<span class="token punctuation">;</span>

    <span class="token keyword">void</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Data: &quot;</span> <span class="token operator">&lt;&lt;</span> data <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建类对象</span>
    MyClass obj<span class="token punctuation">;</span>
    obj<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>

    <span class="token comment">// 声明和初始化指向类的指针</span>
    MyClass <span class="token operator">*</span>ptr <span class="token operator">=</span> <span class="token operator">&amp;</span>obj<span class="token punctuation">;</span>

    <span class="token comment">// 通过指针访问成员变量</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Data via pointer: &quot;</span> <span class="token operator">&lt;&lt;</span> ptr<span class="token operator">-&gt;</span>data <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

    <span class="token comment">// 通过指针调用成员函数</span>
    ptr<span class="token operator">-&gt;</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="_8-3-指向成员函数的指针" tabindex="-1"><a class="header-anchor" href="#_8-3-指向成员函数的指针"><span>8.3 指向成员函数的指针</span></a></h3><p>指向成员函数的指针语法如下：</p><pre><code class="language-cpp">返回类型 <span class="token punctuation">(</span>类名<span class="token double-colon punctuation">::</span><span class="token operator">*</span>指针名<span class="token punctuation">)</span><span class="token punctuation">(</span>参数列表<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>对于Date类，可以定义指向各个成员函数的指针：</p><pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token punctuation">(</span>Date<span class="token double-colon punctuation">::</span><span class="token operator">*</span>initPtr<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token operator">&amp;</span>Date<span class="token double-colon punctuation">::</span>init<span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token punctuation">(</span>Date<span class="token double-colon punctuation">::</span><span class="token operator">*</span>printPtr<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token operator">&amp;</span>Date<span class="token double-colon punctuation">::</span>print<span class="token punctuation">;</span>
<span class="token keyword">bool</span> <span class="token punctuation">(</span>Date<span class="token double-colon punctuation">::</span><span class="token operator">*</span>isLeapYearPtr<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token operator">&amp;</span>Date<span class="token double-colon punctuation">::</span>isLeapYear<span class="token punctuation">;</span>
</code></pre><p>要使用这些指针，需要一个类的实例以及特殊的调用语法：</p><pre><code class="language-cpp">Date d<span class="token punctuation">;</span>
<span class="token punctuation">(</span>d<span class="token punctuation">.</span><span class="token operator">*</span>initPtr<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 调用d.init()</span>
<span class="token punctuation">(</span>d<span class="token punctuation">.</span><span class="token operator">*</span>printPtr<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 调用d.print()</span>
<span class="token keyword">bool</span> leap <span class="token operator">=</span> <span class="token punctuation">(</span>d<span class="token punctuation">.</span><span class="token operator">*</span>isLeapYearPtr<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 调用d.isLeapYear()</span>
</code></pre><p>如果使用指向对象的指针，语法略有不同：</p><pre><code class="language-cpp">Date<span class="token operator">*</span> pd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>pd<span class="token operator">-&gt;</span><span class="token operator">*</span>initPtr<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 通过对象指针调用init()</span>
<span class="token punctuation">(</span>pd<span class="token operator">-&gt;</span><span class="token operator">*</span>printPtr<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 通过对象指针调用print()</span>
<span class="token keyword">delete</span> pd<span class="token punctuation">;</span>
</code></pre><h3 id="_8-4-指向数据成员的指针" tabindex="-1"><a class="header-anchor" href="#_8-4-指向数据成员的指针"><span>8.4 指向数据成员的指针</span></a></h3><p>指向数据成员的指针语法如下：</p><pre><code class="language-cpp">类型 类名<span class="token double-colon punctuation">::</span><span class="token operator">*</span>指针名<span class="token punctuation">;</span>
</code></pre><p>对于Date类的数据成员，可以定义：</p><pre><code class="language-cpp"><span class="token keyword">int</span> Date<span class="token double-colon punctuation">::</span><span class="token operator">*</span>yearPtr <span class="token operator">=</span> <span class="token operator">&amp;</span>Date<span class="token double-colon punctuation">::</span>year<span class="token punctuation">;</span>
<span class="token keyword">int</span> Date<span class="token double-colon punctuation">::</span><span class="token operator">*</span>monthPtr <span class="token operator">=</span> <span class="token operator">&amp;</span>Date<span class="token double-colon punctuation">::</span>month<span class="token punctuation">;</span>
<span class="token keyword">int</span> Date<span class="token double-colon punctuation">::</span><span class="token operator">*</span>dayPtr <span class="token operator">=</span> <span class="token operator">&amp;</span>Date<span class="token double-colon punctuation">::</span>day<span class="token punctuation">;</span>
</code></pre><p>要访问这些成员，同样需要一个类的实例：</p><pre><code class="language-cpp">Date d<span class="token punctuation">;</span>
d<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Year: &quot;</span> <span class="token operator">&lt;&lt;</span> d<span class="token punctuation">.</span><span class="token operator">*</span>yearPtr <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>  <span class="token comment">// 访问d.year</span>
cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Month: &quot;</span> <span class="token operator">&lt;&lt;</span> d<span class="token punctuation">.</span><span class="token operator">*</span>monthPtr <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span> <span class="token comment">// 访问d.month</span>
</code></pre><p>对于指向对象的指针：</p><pre><code class="language-cpp">Date<span class="token operator">*</span> pd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pd<span class="token operator">-&gt;</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Day: &quot;</span> <span class="token operator">&lt;&lt;</span> pd<span class="token operator">-&gt;</span><span class="token operator">*</span>dayPtr <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>  <span class="token comment">// 访问pd-&gt;day</span>
<span class="token keyword">delete</span> pd<span class="token punctuation">;</span>
</code></pre><h3 id="_8-5-总结" tabindex="-1"><a class="header-anchor" href="#_8-5-总结"><span>8.5 总结</span></a></h3><p>C++中的指针可以指向类、成员函数和数据成员，它们提供了灵活的编程方式。</p><p><strong>指向类的指针</strong></p><p>指向类对象的指针存储类对象的内存地址，使用方式如下：</p><pre><code class="language-cpp">Box<span class="token operator">*</span> boxPtr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Box</span><span class="token punctuation">(</span><span class="token number">3.0</span><span class="token punctuation">,</span> <span class="token number">4.0</span><span class="token punctuation">,</span> <span class="token number">5.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 创建指向堆上Box对象的指针</span>
Box <span class="token function">box</span><span class="token punctuation">(</span><span class="token number">2.0</span><span class="token punctuation">,</span> <span class="token number">3.0</span><span class="token punctuation">,</span> <span class="token number">4.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Box<span class="token operator">*</span> boxPtr2 <span class="token operator">=</span> <span class="token operator">&amp;</span>box<span class="token punctuation">;</span>  <span class="token comment">// 指向栈上已存在对象的指针</span>

<span class="token comment">// 访问成员和方法</span>
<span class="token keyword">double</span> vol <span class="token operator">=</span> boxPtr<span class="token operator">-&gt;</span><span class="token function">Volume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 使用箭头操作符</span>
boxPtr<span class="token operator">-&gt;</span>length <span class="token operator">=</span> <span class="token number">6.0</span><span class="token punctuation">;</span>  <span class="token comment">// 如果length是public的话</span>
</code></pre><p><strong>指向成员函数的指针</strong></p><p>这类指针可以指向类的特定成员函数：</p><pre><code class="language-cpp"><span class="token comment">// 声明一个指向Box类的double(void)类型成员函数的指针</span>
<span class="token keyword">double</span> <span class="token punctuation">(</span>Box<span class="token double-colon punctuation">::</span><span class="token operator">*</span>ptrToMember<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token operator">&amp;</span>Box<span class="token double-colon punctuation">::</span>Volume<span class="token punctuation">;</span>

<span class="token comment">// 使用成员函数指针</span>
Box <span class="token function">box1</span><span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">,</span> <span class="token number">3.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> volume <span class="token operator">=</span> <span class="token punctuation">(</span>box1<span class="token punctuation">.</span><span class="token operator">*</span>ptrToMember<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 对象调用</span>

Box<span class="token operator">*</span> boxPtr <span class="token operator">=</span> <span class="token operator">&amp;</span>box1<span class="token punctuation">;</span>
volume <span class="token operator">=</span> <span class="token punctuation">(</span>boxPtr<span class="token operator">-&gt;</span><span class="token operator">*</span>ptrToMember<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 指针调用</span>
</code></pre><p><strong>指向数据成员的指针</strong></p><p>这类指针指向类的数据成员：</p><pre><code class="language-cpp"><span class="token comment">// 声明一个指向Box类double类型成员的指针</span>
<span class="token comment">// 注意：这里只能指向public成员，无法指向private成员</span>
<span class="token keyword">double</span> Box<span class="token double-colon punctuation">::</span><span class="token operator">*</span>pData <span class="token operator">=</span> <span class="token operator">&amp;</span>Box<span class="token double-colon punctuation">::</span>length<span class="token punctuation">;</span>  <span class="token comment">// 假设length是public</span>

<span class="token comment">// 使用数据成员指针</span>
Box <span class="token function">box1</span><span class="token punctuation">(</span><span class="token number">5.0</span><span class="token punctuation">,</span> <span class="token number">6.0</span><span class="token punctuation">,</span> <span class="token number">7.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> len <span class="token operator">=</span> box1<span class="token punctuation">.</span><span class="token operator">*</span>pData<span class="token punctuation">;</span>  <span class="token comment">// 通过对象访问</span>

Box<span class="token operator">*</span> boxPtr <span class="token operator">=</span> <span class="token operator">&amp;</span>box1<span class="token punctuation">;</span>
len <span class="token operator">=</span> boxPtr<span class="token operator">-&gt;</span><span class="token operator">*</span>pData<span class="token punctuation">;</span>  <span class="token comment">// 通过指针访问</span>
</code></pre><h2 id="_9-赋值运算符重载" tabindex="-1"><a class="header-anchor" href="#_9-赋值运算符重载"><span>9 赋值运算符重载</span></a></h2><p>赋值运算符重载是C++中一项重要的特性，它允许我们自定义对象之间的赋值行为。当一个对象被赋值给同类型的另一个已存在的对象时，赋值运算符会被调用。</p><p>对于Date类，赋值运算符可以这样实现：</p><pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Date</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">bool</span> <span class="token function">isLeapYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 赋值运算符重载</span>
    Date<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Date<span class="token operator">&amp;</span> other<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 检查自赋值</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">!=</span> <span class="token operator">&amp;</span>other<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            year <span class="token operator">=</span> other<span class="token punctuation">.</span>year<span class="token punctuation">;</span>
            month <span class="token operator">=</span> other<span class="token punctuation">.</span>month<span class="token punctuation">;</span>
            day <span class="token operator">=</span> other<span class="token punctuation">.</span>day<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>  <span class="token comment">// 返回当前对象的引用</span>
    <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> year<span class="token punctuation">;</span>
    <span class="token keyword">int</span> month<span class="token punctuation">;</span>
    <span class="token keyword">int</span> day<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>赋值运算符重载的几个关键点：</p><ol><li>返回类型是 <code>Date&amp;</code>（类的引用），这允许连续赋值操作（如 <code>a = b = c</code>）</li><li>参数通常是常量引用（<code>const Date&amp;</code>），以避免不必要的复制</li><li>应检查自赋值情况（<code>this != &amp;other</code>），防止自赋值导致的问题</li><li>返回 <code>*this</code>，即当前对象的引用</li></ol><p>赋值运算符与拷贝构造函数的区别：</p><ul><li>拷贝构造函数用于初始化新对象</li><li>赋值运算符用于已存在对象之间的赋值</li></ul><p>使用示例：</p><pre><code class="language-cpp"><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Date d1<span class="token punctuation">;</span>
    d1<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 用户输入第一个日期</span>
    
    Date d2<span class="token punctuation">;</span>
    <span class="token comment">// 使用赋值运算符将d1赋值给d2</span>
    d2 <span class="token operator">=</span> d1<span class="token punctuation">;</span>
    
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;d2 after assignment:&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    d2<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>对于只包含基本类型成员的简单类（如Date类），编译器生成的默认赋值运算符通常就足够了。但如果类管理动态资源（如指针成员），就需要自定义赋值运算符来执行深拷贝，避免多个对象共享同一资源导致的问题。</p><p>例如，对于管理动态内存的类：</p><pre><code class="language-cpp">StringHolder<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> StringHolder<span class="token operator">&amp;</span> other<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">!=</span> <span class="token operator">&amp;</span>other<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 释放当前资源</span>
        <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data<span class="token punctuation">;</span>
        
        <span class="token comment">// 分配新内存并复制数据</span>
        length <span class="token operator">=</span> other<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>length <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token function">strcpy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> other<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>赋值运算符重载是C++中实现类资源管理的重要机制，与拷贝构造函数、移动构造函数一起构成了C++的复制控制功能。</p><h2 id="_10-栈和堆上的对象" tabindex="-1"><a class="header-anchor" href="#_10-栈和堆上的对象"><span>10 栈和堆上的对象</span></a></h2><h3 id="_10-1-堆栈上的对象" tabindex="-1"><a class="header-anchor" href="#_10-1-堆栈上的对象"><span>10.1 堆栈上的对象</span></a></h3><p>C++中的对象可以在栈 (stack) 或堆 (heap) 上创建，这两种内存区域有着不同的生命周期和管理方式。此外，我们还可以创建对象数组，即多个相同类型对象的集合。</p><p>在栈上创建对象通常使用直接声明的方式，这种对象会在其作用域结束时自动销毁：</p><pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token function">someFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Date today<span class="token punctuation">;</span>           <span class="token comment">// 在栈上创建Date对象</span>
    today<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    today<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 函数结束时，today自动销毁</span>
<span class="token punctuation">}</span>
</code></pre><p>堆上的对象是通过 <code>new</code> 运算符动态分配的，必须使用 <code>delete</code> 手动释放，否则会导致内存泄漏：</p><pre><code class="language-cpp"><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Date<span class="token operator">*</span> pDate <span class="token operator">=</span> <span class="token keyword">new</span> Date<span class="token punctuation">;</span>  <span class="token comment">// 在堆上创建Date对象</span>
    pDate<span class="token operator">-&gt;</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    pDate<span class="token operator">-&gt;</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 使用完毕后必须手动释放</span>
    <span class="token keyword">delete</span> pDate<span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>对象数组可以在栈上或堆上创建：</p><p>栈上的对象数组：</p><pre><code class="language-cpp"><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Date dates<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>  <span class="token comment">// 创建包含3个Date对象的数组</span>
    
    <span class="token comment">// 初始化和使用数组中的对象</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dates<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dates<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 数组在函数结束时自动销毁</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>堆上的对象数组：</p><pre><code class="language-cpp"><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Date<span class="token operator">*</span> dateArray <span class="token operator">=</span> <span class="token keyword">new</span> Date<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>  <span class="token comment">// 在堆上创建5个Date对象的数组</span>
    
    <span class="token comment">// 初始化和使用数组中的对象</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dateArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dateArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 必须使用delete[]释放数组</span>
    <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dateArray<span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>栈上对象和堆上对象的主要区别：</p><ol><li>内存管理：栈对象自动管理，堆对象需手动释放</li><li>生命周期：栈对象的生命周期限于创建它的作用域，堆对象的生命周期由程序员控制</li><li>大小限制：栈的大小通常较小且固定，堆的大小通常较大且可动态增长</li><li>创建速度：栈上分配内存通常比堆上分配更快</li></ol><p>在实际编程中，对于生命周期明确且大小固定的小对象，通常优先使用栈；而对于生命周期不确定、大小可变或很大的对象，则使用堆。现代C++还推荐使用智能指针（如 <code>std::unique_ptr</code> 和 <code>std::shared_ptr</code>）来管理堆上的对象，以避免内存泄漏问题。</p><h3 id="_10-2-栈上对象的引用" tabindex="-1"><a class="header-anchor" href="#_10-2-栈上对象的引用"><span>10.2 栈上对象的引用</span></a></h3><p>在C++中，从函数返回在函数内部（栈上）创建的对象有两种方式：返回对象本身或返回对象的引用。这两种方式有着根本的区别，特别是在内存安全方面。</p><p>返回栈上对象本身是安全的，因为会创建对象的副本：</p><pre><code class="language-cpp">Date <span class="token function">getDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Date localDate<span class="token punctuation">;</span>  <span class="token comment">// 在函数栈上创建对象</span>
    localDate<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> localDate<span class="token punctuation">;</span>  <span class="token comment">// 返回对象的副本</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Date d <span class="token operator">=</span> <span class="token function">getDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 安全，d接收了localDate的副本</span>
    d<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>当函数返回localDate时，会调用拷贝构造函数创建该对象的副本，然后返回这个副本。当函数结束时，localDate被销毁，但返回的副本仍然有效。</p><p>而返回栈上对象的引用是危险的，会导致悬空引用：</p><pre><code class="language-cpp">Date<span class="token operator">&amp;</span> <span class="token function">getBadDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Date localDate<span class="token punctuation">;</span>  <span class="token comment">// 在函数栈上创建对象</span>
    localDate<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> localDate<span class="token punctuation">;</span>  <span class="token comment">// 危险！返回即将销毁对象的引用</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Date<span class="token operator">&amp;</span> d <span class="token operator">=</span> <span class="token function">getBadDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 危险！d引用了已销毁的对象</span>
    d<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 未定义行为，可能崩溃或输出垃圾值</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>在上面的例子中，当getBadDate () 函数结束时，localDate对象被销毁，但d仍然引用这个已经不存在的对象。尝试使用d会导致未定义行为。</p><p>正确的做法是，如果要返回引用，应该返回堆上分配的对象的引用，或返回传入的对象的引用，或返回类的静态成员的引用：</p><pre><code class="language-cpp"><span class="token comment">// 返回堆上对象的引用（但调用者需要负责删除）</span>
Date<span class="token operator">&amp;</span> <span class="token function">getHeapDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Date<span class="token operator">*</span> pDate <span class="token operator">=</span> <span class="token keyword">new</span> Date<span class="token punctuation">;</span>
    pDate<span class="token operator">-&gt;</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">*</span>pDate<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 返回传入对象的引用</span>
Date<span class="token operator">&amp;</span> <span class="token function">modifyDate</span><span class="token punctuation">(</span>Date<span class="token operator">&amp;</span> d<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 修改d</span>
    <span class="token keyword">return</span> d<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 返回静态成员的引用</span>
Date<span class="token operator">&amp;</span> <span class="token function">getDefaultDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> Date defaultDate<span class="token punctuation">;</span>  <span class="token comment">// 静态对象，不会随函数返回而销毁</span>
    defaultDate<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> defaultDate<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>总之，永远不要返回函数内部栈上创建的局部对象的引用，这是导致程序错误的常见原因。</p><h2 id="_11-作业" tabindex="-1"><a class="header-anchor" href="#_11-作业"><span>11 作业</span></a></h2><p>设计一个圆类，输入圆的半径和圆柱的高，依次输出圆周长、圆面积、圆球表面积、圆柱体积（以空格分隔，π取 3.14）。</p><pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">circle</span>
<span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token comment">/* data */</span>
    <span class="token keyword">float</span> radius<span class="token punctuation">;</span> <span class="token comment">//圆的半径</span>
    <span class="token keyword">float</span> high<span class="token punctuation">;</span> <span class="token comment">//圆的高</span>
    <span class="token keyword">float</span> area<span class="token punctuation">;</span> <span class="token comment">//圆的面积</span>
    <span class="token keyword">float</span> circumference<span class="token punctuation">;</span> <span class="token comment">//圆的周长</span>
    <span class="token keyword">float</span> volume<span class="token punctuation">;</span> <span class="token comment">//圆的体积</span>
    <span class="token keyword">float</span> surface<span class="token punctuation">;</span> <span class="token comment">//圆的表面积</span>
    <span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token keyword">float</span> PI<span class="token punctuation">;</span> <span class="token comment">// 静态常量 圆周率</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">circle</span><span class="token punctuation">(</span><span class="token keyword">float</span> r <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">float</span> h <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//构造函数</span>
    <span class="token operator">~</span><span class="token function">circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 计算圆周长</span>
    <span class="token keyword">float</span> <span class="token function">calculateCircumference</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 计算圆面积</span>
    <span class="token keyword">float</span> <span class="token function">calculateArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 计算圆球表面积</span>
    <span class="token keyword">float</span> <span class="token function">calculateSphereArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 计算圆柱体积</span>
    <span class="token keyword">float</span> <span class="token function">calculateCylinderVolume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 在类外初始化静态常量</span>
<span class="token keyword">const</span> <span class="token keyword">float</span> circle<span class="token double-colon punctuation">::</span>PI <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span>

circle<span class="token double-colon punctuation">::</span><span class="token function">circle</span><span class="token punctuation">(</span><span class="token keyword">float</span> r<span class="token punctuation">,</span> <span class="token keyword">float</span> h<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    radius <span class="token operator">=</span> r<span class="token punctuation">;</span>
    high <span class="token operator">=</span> h<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">circle</span><span class="token double-colon punctuation">::</span><span class="token operator">~</span><span class="token function">circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">float</span> circle<span class="token double-colon punctuation">::</span><span class="token function">calculateCircumference</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    circumference <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> PI <span class="token operator">*</span> radius<span class="token punctuation">;</span>
    <span class="token keyword">return</span> circumference<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">float</span> circle<span class="token double-colon punctuation">::</span><span class="token function">calculateArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    area <span class="token operator">=</span> PI <span class="token operator">*</span> radius <span class="token operator">*</span> radius<span class="token punctuation">;</span>
    <span class="token keyword">return</span> area<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">float</span> circle<span class="token double-colon punctuation">::</span><span class="token function">calculateSphereArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    surface <span class="token operator">=</span> <span class="token number">4</span> <span class="token operator">*</span> PI <span class="token operator">*</span> radius <span class="token operator">*</span> radius<span class="token punctuation">;</span>
    <span class="token keyword">return</span> surface<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">float</span> circle<span class="token double-colon punctuation">::</span><span class="token function">calculateCylinderVolume</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    volume <span class="token operator">=</span> PI <span class="token operator">*</span> radius <span class="token operator">*</span> radius <span class="token operator">*</span> high<span class="token punctuation">;</span>
    <span class="token keyword">return</span> volume<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">float</span> radius<span class="token punctuation">,</span> high<span class="token punctuation">;</span>

    <span class="token comment">// 输入半径和高</span>
    std<span class="token double-colon punctuation">::</span>cin <span class="token operator">&gt;&gt;</span> radius <span class="token operator">&gt;&gt;</span> high<span class="token punctuation">;</span>

    <span class="token comment">// 创建circle对象并设置值</span>
    circle <span class="token function">c</span><span class="token punctuation">(</span>radius<span class="token punctuation">,</span> high<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 计算并输出结果，以空格分隔</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> c<span class="token punctuation">.</span><span class="token function">calculateCircumference</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; &quot;</span>
        <span class="token operator">&lt;&lt;</span> c<span class="token punctuation">.</span><span class="token function">calculateArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; &quot;</span>
        <span class="token operator">&lt;&lt;</span> c<span class="token punctuation">.</span><span class="token function">calculateSphereArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; &quot;</span>
        <span class="token operator">&lt;&lt;</span> c<span class="token punctuation">.</span><span class="token function">calculateCylinderVolume</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><p>1)定义一个 Point 类，其属性包括点的坐标，提供计算两点之间距离的方法；2)定义一个圆形类， a.其属性包括圆心和半径； b.创建两个圆形对象，提示用户输入圆心坐标和半径，判断两个圆是否相交，并输出结果。</p><p><strong>Point.h</strong></p><pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">pragma</span> <span class="token expression">once</span></span>
<span class="token keyword">class</span> <span class="token class-name">Point</span>
<span class="token punctuation">{</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">double</span> x<span class="token punctuation">;</span>
	<span class="token keyword">double</span> y<span class="token punctuation">;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Point</span><span class="token punctuation">(</span><span class="token keyword">double</span> x<span class="token punctuation">,</span> <span class="token keyword">double</span> y<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">x</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">y</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">distance</span><span class="token punctuation">(</span><span class="token keyword">const</span> Point<span class="token operator">&amp;</span> point1<span class="token punctuation">,</span> <span class="token keyword">const</span> Point<span class="token operator">&amp;</span> point2<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token function">pow</span><span class="token punctuation">(</span>point1<span class="token punctuation">.</span>x <span class="token operator">-</span> point2<span class="token punctuation">.</span>x<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">pow</span><span class="token punctuation">(</span>point1<span class="token punctuation">.</span>y <span class="token operator">-</span> point2<span class="token punctuation">.</span>y<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


</code></pre><p><strong>Circle.h</strong></p><pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">pragma</span> <span class="token expression">once  </span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;Point.h&quot;</span>  </span>
<span class="token keyword">class</span> <span class="token class-name">Circle</span>  
<span class="token punctuation">{</span>  
<span class="token keyword">private</span><span class="token operator">:</span>  
Point center<span class="token punctuation">;</span> <span class="token comment">// 圆心  </span>
<span class="token keyword">double</span> radius<span class="token punctuation">;</span> <span class="token comment">// 半径  </span>

<span class="token keyword">public</span><span class="token operator">:</span>  
<span class="token comment">// 构造函数  </span>
<span class="token function">Circle</span><span class="token punctuation">(</span><span class="token keyword">const</span> Point<span class="token operator">&amp;</span> center<span class="token punctuation">,</span> <span class="token keyword">double</span> radius<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">center</span><span class="token punctuation">(</span>center<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">radius</span><span class="token punctuation">(</span>radius<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 获取圆心  </span>
<span class="token keyword">const</span> Point<span class="token operator">&amp;</span> <span class="token function">getCenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> center<span class="token punctuation">;</span> <span class="token punctuation">}</span>  

<span class="token comment">// 获取半径  </span>
<span class="token keyword">double</span> <span class="token function">getRadius</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> radius<span class="token punctuation">;</span> <span class="token punctuation">}</span>  

<span class="token comment">// 判断两个圆是否相交  </span>
<span class="token keyword">static</span> <span class="token keyword">bool</span> <span class="token function">isIntersecting</span><span class="token punctuation">(</span><span class="token keyword">const</span> Circle<span class="token operator">&amp;</span> circle1<span class="token punctuation">,</span> <span class="token keyword">const</span> Circle<span class="token operator">&amp;</span> circle2<span class="token punctuation">)</span> <span class="token punctuation">{</span>  
	<span class="token keyword">double</span> distance <span class="token operator">=</span> <span class="token class-name">Point</span><span class="token double-colon punctuation">::</span><span class="token function">distance</span><span class="token punctuation">(</span>circle1<span class="token punctuation">.</span><span class="token function">getCenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> circle2<span class="token punctuation">.</span><span class="token function">getCenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
	<span class="token keyword">return</span> distance <span class="token operator">&lt;=</span> <span class="token punctuation">(</span>circle1<span class="token punctuation">.</span><span class="token function">getRadius</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> circle2<span class="token punctuation">.</span><span class="token function">getRadius</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><p><strong>GeometryUtils.cpp</strong></p><pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;Circle.h&quot;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 提示用户输入第一个圆的圆心坐标和半径</span>
    <span class="token keyword">double</span> x1<span class="token punctuation">,</span> y1<span class="token punctuation">,</span> r1<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Enter the center (x, y) and radius of the first circle: &quot;</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cin <span class="token operator">&gt;&gt;</span> x1 <span class="token operator">&gt;&gt;</span> y1 <span class="token operator">&gt;&gt;</span> r1<span class="token punctuation">;</span>

    <span class="token comment">// 提示用户输入第二个圆的圆心坐标和半径</span>
    <span class="token keyword">double</span> x2<span class="token punctuation">,</span> y2<span class="token punctuation">,</span> r2<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Enter the center (x, y) and radius of the second circle: &quot;</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cin <span class="token operator">&gt;&gt;</span> x2 <span class="token operator">&gt;&gt;</span> y2 <span class="token operator">&gt;&gt;</span> r2<span class="token punctuation">;</span>

    <span class="token comment">// 创建两个圆形对象</span>
    Circle <span class="token function">circle1</span><span class="token punctuation">(</span><span class="token function">Point</span><span class="token punctuation">(</span>x1<span class="token punctuation">,</span> y1<span class="token punctuation">)</span><span class="token punctuation">,</span> r1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Circle <span class="token function">circle2</span><span class="token punctuation">(</span><span class="token function">Point</span><span class="token punctuation">(</span>x2<span class="token punctuation">,</span> y2<span class="token punctuation">)</span><span class="token punctuation">,</span> r2<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 判断两个圆是否相交</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Circle</span><span class="token double-colon punctuation">::</span><span class="token function">isIntersecting</span><span class="token punctuation">(</span>circle1<span class="token punctuation">,</span> circle2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;The two circles intersect.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;The two circles do not intersect.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>`,237)])])}const k=s(o,[["render",e]]),i=JSON.parse('{"path":"/develop/CPP/3_Class_object.html","title":"03. C++ 类与对象(Class &&object)","lang":"zh-CN","frontmatter":{"category":"C++","tags":["Cpp"],"description":"03. C++ 类与对象(Class &&object) 1 类成员函数&访问修饰符 1.1 类成员函数 类的成员函数是指那些把定义和原型写在类定义内部的函数，就像类定义中的其他变量一样。类成员函数是类的一个成员，它可以操作类的任意对象，可以访问对象中的所有成员。 成员函数可以定义在类定义内部，或者单独使用范围解析运算符 :: 来定义。在类定义中定义的...","head":[["meta",{"property":"og:url","content":"https://echo0d.github.io/DailyNotes/develop/CPP/3_Class_object.html"}],["meta",{"property":"og:site_name","content":"echo0d-notes"}],["meta",{"property":"og:title","content":"03. C++ 类与对象(Class &&object)"}],["meta",{"property":"og:description","content":"03. C++ 类与对象(Class &&object) 1 类成员函数&访问修饰符 1.1 类成员函数 类的成员函数是指那些把定义和原型写在类定义内部的函数，就像类定义中的其他变量一样。类成员函数是类的一个成员，它可以操作类的任意对象，可以访问对象中的所有成员。 成员函数可以定义在类定义内部，或者单独使用范围解析运算符 :: 来定义。在类定义中定义的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-15T03:35:09.000Z"}],["meta",{"property":"article:author","content":"echo0d"}],["meta",{"property":"article:tag","content":"Cpp"}],["meta",{"property":"article:modified_time","content":"2025-04-15T03:35:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"03. C++ 类与对象(Class &&object)\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-15T03:35:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"echo0d\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":2,"title":"1 类成员函数&访问修饰符","slug":"_1-类成员函数-访问修饰符","link":"#_1-类成员函数-访问修饰符","children":[{"level":3,"title":"1.1 类成员函数","slug":"_1-1-类成员函数","link":"#_1-1-类成员函数","children":[]},{"level":3,"title":"1.2 类访问修饰符","slug":"_1-2-类访问修饰符","link":"#_1-2-类访问修饰符","children":[]}]},{"level":2,"title":"2 友元","slug":"_2-友元","link":"#_2-友元","children":[]},{"level":2,"title":"3 构造与析构","slug":"_3-构造与析构","link":"#_3-构造与析构","children":[]},{"level":2,"title":"4 多文件编程","slug":"_4-多文件编程","link":"#_4-多文件编程","children":[]},{"level":2,"title":"5 拷贝构造(Copy contructor)","slug":"_5-拷贝构造-copy-contructor","link":"#_5-拷贝构造-copy-contructor","children":[]},{"level":2,"title":"6 内联函数","slug":"_6-内联函数","link":"#_6-内联函数","children":[]},{"level":2,"title":"7 const & static","slug":"_7-const-static","link":"#_7-const-static","children":[{"level":3,"title":"7.1 const 修饰符","slug":"_7-1-const-修饰符","link":"#_7-1-const-修饰符","children":[]},{"level":3,"title":"7.2 static 修饰符","slug":"_7-2-static-修饰符","link":"#_7-2-static-修饰符","children":[]},{"level":3,"title":"7.3 static const 成员","slug":"_7-3-static-const-成员","link":"#_7-3-static-const-成员","children":[]}]},{"level":2,"title":"8 指针","slug":"_8-指针","link":"#_8-指针","children":[{"level":3,"title":"8.1 This 指针","slug":"_8-1-this-指针","link":"#_8-1-this-指针","children":[]},{"level":3,"title":"8.2 指向类的指针","slug":"_8-2-指向类的指针","link":"#_8-2-指向类的指针","children":[]},{"level":3,"title":"8.3 指向成员函数的指针","slug":"_8-3-指向成员函数的指针","link":"#_8-3-指向成员函数的指针","children":[]},{"level":3,"title":"8.4 指向数据成员的指针","slug":"_8-4-指向数据成员的指针","link":"#_8-4-指向数据成员的指针","children":[]},{"level":3,"title":"8.5 总结","slug":"_8-5-总结","link":"#_8-5-总结","children":[]}]},{"level":2,"title":"9 赋值运算符重载","slug":"_9-赋值运算符重载","link":"#_9-赋值运算符重载","children":[]},{"level":2,"title":"10 栈和堆上的对象","slug":"_10-栈和堆上的对象","link":"#_10-栈和堆上的对象","children":[{"level":3,"title":"10.1 堆栈上的对象","slug":"_10-1-堆栈上的对象","link":"#_10-1-堆栈上的对象","children":[]},{"level":3,"title":"10.2 栈上对象的引用","slug":"_10-2-栈上对象的引用","link":"#_10-2-栈上对象的引用","children":[]}]},{"level":2,"title":"11 作业","slug":"_11-作业","link":"#_11-作业","children":[]}],"git":{"createdTime":1744625071000,"updatedTime":1744688109000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":4}]},"readingTime":{"minutes":30.34,"words":9103},"filePathRelative":"develop/CPP/3_Class&object.md","localizedDate":"2025年4月14日","excerpt":"","autoDesc":true}');export{k as comp,i as data};
