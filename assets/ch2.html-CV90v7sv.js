import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,b as a,o}from"./app-CV56mcHb.js";const s="/DailyNotes/assets/image-20240320220720825-CD6AXD2q.png",p="/DailyNotes/assets/image-20240323122637144-DHF6a_dh.png",i="/DailyNotes/assets/image-20240323124302842-CDGN8QTf.png",c="/DailyNotes/assets/image-20240323175325426-Cg-VhEjl.png",r="/DailyNotes/assets/image-20240323180618198-D0p0JWpv.png",l="/DailyNotes/assets/image-20240323180830536-2xFG16ZJ.png",u="/DailyNotes/assets/image-20240324214859220-Xy2ze0K7.png",g="/DailyNotes/assets/image-20240324221637025-C1DnXdWB.png",d="/DailyNotes/assets/image-20240325113004910-whUD0PoK.png",f="/DailyNotes/assets/image-20240328161105801-DbA5YiBI.png",m="/DailyNotes/assets/image-20240328161418959-LAlJkRis.png",h="/DailyNotes/assets/image-20240328161707443-BbDDf3Oz.png",k="/DailyNotes/assets/1712474443260-DNw4pEua.png",q="/DailyNotes/assets/1712474628866-BeT_WMjs.png",v={};function C(x,n){return o(),t("div",null,n[0]||(n[0]=[a(`<h1 id="_02-程序结构" tabindex="-1"><a class="header-anchor" href="#_02-程序结构"><span>02. 程序结构</span></a></h1><h2 id="_2-1-命名" tabindex="-1"><a class="header-anchor" href="#_2-1-命名"><span>2.1. 命名</span></a></h2><h3 id="关键字" tabindex="-1"><a class="header-anchor" href="#关键字"><span>关键字</span></a></h3><p>Go语言中类似if和switch的关键字有25个；关键字不能用于自定义名字，只能在特定语法结构中使用。</p><pre><code>break      default       func     interface   select
case       defer         go       map         struct
chan       else          goto     package     switch
const      fallthrough   if       range       type
continue   for           import   return      var
</code></pre><p>此外，还有大约30多个预定义的名字，比如int和true等，主要对应内建的常量、类型和函数。</p><pre><code>内建常量: true false iota nil

内建类型: int int8 int16 int32 int64
          uint uint8 uint16 uint32 uint64 uintptr
          float32 float64 complex128 complex64
          bool byte rune string error

内建函数: make len cap new append copy close delete
          complex real imag
          panic recover
</code></pre><p>这些内部预先定义的名字并不是关键字，你可以在定义中重新使用它们。在一些特殊的场景中重新定义它们也是有意义的，但是也要注意避免过度而引起语义混乱。</p><h3 id="命名规则" tabindex="-1"><a class="header-anchor" href="#命名规则"><span>命名规则</span></a></h3><p>Go语言中的函数名、变量名、常量名、类型名、语句标号和包名等所有的命名，都遵循如下命名规则：</p><ul><li>一个名字必须以一个字母（Unicode字母）或下划线开头，后面可以跟任意数量的字母、数字或下划线。</li><li>大写字母和小写字母是不同的：heapSort和Heapsort是两个不同的名字。</li><li>如果一个名字是在函数内部定义，那么它就只在函数内部有效。如果是在函数外部定义，那么将在当前包的所有文件中都可以访问。</li><li>名字的开头字母的大小写决定了名字在包外的可见性。如果一个名字是大写字母开头的，那么它将是导出的，也就是说可以被外部的包访问，例如fmt包的Printf函数就是导出的，可以在fmt包外部访问。</li><li>包本身的名字一般总是用小写字母。</li><li>名字的长度没有逻辑限制，但是Go语言的风格是尽量使用短小的名字，对于局部变量尤其是这样；你会经常看到i之类的短名字，而不是冗长的theLoopIndex命名。通常来说，如果一个名字的作用域比较大，生命周期也比较长，那么用长的名字将会更有意义。</li><li>在习惯上，Go语言程序员推荐使用 <strong>驼峰式</strong> 命名，当名字由几个单词组成时优先使用大小写分隔，而不是优先用下划线分隔。</li><li>像ASCII和HTML这样的缩略词则避免使用大小写混合的写法，它们可能被称为htmlEscape、HTMLEscape或escapeHTML，但不会是escapeHtml。</li></ul><h2 id="_2-2-声明" tabindex="-1"><a class="header-anchor" href="#_2-2-声明"><span>2.2. 声明</span></a></h2><p>声明语句定义了程序的各种实体对象以及部分或全部的属性。Go语言主要有四种类型的声明语句：var、const、type和func，分别对应变量、常量、类型和函数实体对象的声明。</p><p>一个Go语言编写的程序对应一个或多个以.go为文件后缀名的源文件。</p><ul><li>每个源文件中以包的声明语句开始，说明该源文件是属于哪个包</li><li>包声明语句之后是import语句导入依赖的其它包</li><li>然后是包一级的类型、变量、常量、函数的声明语句，包一级的各种类型的声明语句的顺序无关紧要（译注：函数内部的名字则必须先声明之后才能使用）。</li></ul><h3 id="变量-常量声明" tabindex="-1"><a class="header-anchor" href="#变量-常量声明"><span>变量&amp;常量声明</span></a></h3><p>例如，下面的例子中声明了一个常量、一个函数和两个变量：</p><p><em>gopl.io/ch2/boiling</em></p><pre><code class="language-Go">// Boiling prints the boiling point of water.
package main

import &quot;fmt&quot;

const boilingF = 212.0

func main() {
    var f = boilingF
    var c = (f - 32) * 5 / 9
    fmt.Printf(&quot;boiling point = %g°F or %g°C\\n&quot;, f, c)
    // Output:
    // boiling point = 212°F or 100°C
}
</code></pre><p>其中常量boilingF是在包一级范围声明语句声明的，然后f和c两个变量是在main函数内部声明的声明语句声明的。在包一级声明语句声明的名字可在整个包对应的每个源文件中访问，而不是仅仅在其声明语句所在的源文件中访问。相比之下，局部声明的名字就只能在函数内部很小的范围被访问。</p><h3 id="函数声明" tabindex="-1"><a class="header-anchor" href="#函数声明"><span>函数声明</span></a></h3><ul><li>一个函数的声明由一个函数名字、参数列表（由函数的调用者提供参数变量的具体值）、一个可选的返回值列表和包含函数定义的函数体组成。</li><li>如果函数没有返回值，那么返回值列表是省略的。</li><li>执行函数从函数的第一个语句开始，依次顺序执行直到遇到return返回语句，如果没有返回语句则是执行到函数末尾，然后返回到函数调用者。</li></ul><p>在这个例子中，main函数就调用了两次fToC函数，分别使用在局部定义的两个常量作为调用函数的参数。</p><p><em>gopl.io/ch2/ftoc</em></p><pre><code class="language-Go">// Ftoc prints two Fahrenheit-to-Celsius conversions.
package main

import &quot;fmt&quot;

func main() {
    const freezingF, boilingF = 32.0, 212.0
    fmt.Printf(&quot;%g°F = %g°C\\n&quot;, freezingF, fToC(freezingF)) // &quot;32°F = 0°C&quot;
    fmt.Printf(&quot;%g°F = %g°C\\n&quot;, boilingF, fToC(boilingF))   // &quot;212°F = 100°C&quot;
}

func fToC(f float64) float64 {
    return (f - 32) * 5 / 9
}
</code></pre><h2 id="_2-3-变量" tabindex="-1"><a class="header-anchor" href="#_2-3-变量"><span>2.3. 变量</span></a></h2><h3 id="var声明语句" tabindex="-1"><a class="header-anchor" href="#var声明语句"><span>var声明语句</span></a></h3><p>var声明语句可以创建一个特定类型的变量，然后给变量附加一个名字，并且设置变量的初始值。变量声明的一般语法如下：</p><pre><code class="language-Go">var 变量名字 类型 = 表达式
</code></pre><p>其中 <code>类型</code>或 <code>= 表达式</code>两个部分可以省略其中的一个。</p><ul><li>如果省略的是类型信息，那么将根据初始化表达式来推导变量的类型信息。</li><li>如果初始化表达式被省略，那么将用零值初始化该变量。</li></ul><h3 id="零值" tabindex="-1"><a class="header-anchor" href="#零值"><span>零值</span></a></h3><p>数值类型变量对应的零值是0，布尔类型变量对应的零值是false，字符串类型对应的零值是空字符串，接口或引用类型（包括slice、指针、map、chan和函数）变量对应的零值是nil。数组或结构体等聚合类型对应的零值是每个元素或字段都是对应该类型的零值。</p><p>零值初始化机制可以确保每个声明的变量总是有一个良好定义的值，因此在Go语言中不存在未初始化的变量。这个特性可以简化很多代码，而且可以在没有增加额外工作的前提下确保边界条件下的合理行为。例如：</p><pre><code class="language-Go">var s string
fmt.Println(s) // &quot;&quot;
</code></pre><p>这段代码将打印一个空字符串，而不是导致错误或产生不可预知的行为。Go语言程序员应该让一些聚合类型的零值也具有意义，这样可以保证不管任何类型的变量总是有一个合理有效的零值状态。</p><p>也可以在一个声明语句中同时声明一组变量，或用一组初始化表达式声明并初始化一组变量。如果省略每个变量的类型，将可以声明多个类型不同的变量（类型由初始化表达式推导）：</p><pre><code class="language-Go">var i, j, k int                 // int, int, int
var b, f, s = true, 2.3, &quot;four&quot; // bool, float64, string
</code></pre><p>初始化表达式可以是字面量或任意的表达式。</p><p>在包级别声明的变量会在main入口函数执行前完成初始化（§2.6.2），局部变量将在声明语句被执行到的时候完成初始化。</p><p>一组变量也可以通过调用一个函数，由函数返回的多个返回值初始化：</p><pre><code class="language-Go">var f, err = os.Open(name) // os.Open returns a file and an error
</code></pre><h3 id="_2-3-1-简短变量声明" tabindex="-1"><a class="header-anchor" href="#_2-3-1-简短变量声明"><span>2.3.1. 简短变量声明</span></a></h3><p>在函数内部，有一种称为简短变量声明语句的形式可用于声明和初始化局部变量。它以 <code>名字 := 表达式</code>形式声明变量，变量的类型根据表达式来自动推导。下面是lissajous函数中的三个简短变量声明语句（§1.4）：</p><pre><code class="language-Go">anim := gif.GIF{LoopCount: nframes}
freq := rand.Float64() * 3.0
t := 0.0
</code></pre><p>因为简洁和灵活的特点，简短变量声明被广泛用于大部分的局部变量的声明和初始化。</p><p>var形式的声明语句往往是用于需要显式指定变量类型的地方，或者因为变量稍后会被重新赋值而初始值无关紧要的地方。</p><pre><code class="language-Go">i := 100                  // an int
var boiling float64 = 100 // a float64
var names []string
var err error
var p Point
</code></pre><p>和var形式声明语句一样，简短变量声明语句也可以用来声明和初始化一组变量：</p><pre><code class="language-Go">i, j := 0, 1
</code></pre><p>但是这种同时声明多个变量的方式应该限制只在可以提高代码可读性的地方使用，比如for语句的循环的初始化语句部分。</p><blockquote><p>请记住 <code>:=</code>是一个变量声明语句，而 <code>=</code>是一个变量赋值操作。</p><p>也不要混淆多个变量的声明和元组的多重赋值（§2.4.1），后者是将右边各个表达式的值赋值给左边对应位置的各个变量：</p></blockquote><pre><code class="language-Go">i, j = j, i // 交换 i 和 j 的值
</code></pre><p>和普通var形式的变量声明语句一样，简短变量声明语句也可以用函数的返回值来声明和初始化变量，像下面的os.Open函数调用将返回两个值：</p><pre><code class="language-Go">f, err := os.Open(name)
if err != nil {
    return err
}
// ...use f...
f.Close()
</code></pre><p>这里有一个比较微妙的地方：简短变量声明左边的变量可能并不是全部都是刚刚声明的。</p><blockquote><p>如果有一些已经在相同的词法域声明过了（§2.7），那么简短变量声明语句对这些已经声明过的变量就只有赋值行为了。</p></blockquote><p>在下面的代码中，第一个语句声明了in和err两个变量。在第二个语句只声明了out一个变量，然后对已经声明的err进行了赋值操作。</p><pre><code class="language-Go">in, err := os.Open(infile)
// ...
out, err := os.Create(outfile)
</code></pre><blockquote><p>简短变量声明语句中必须至少要声明一个新的变量</p></blockquote><p>下面的代码将不能编译通过：</p><pre><code class="language-Go">f, err := os.Open(infile)
// ...
f, err := os.Create(outfile) // compile error: no new variables
</code></pre><p>解决的方法是第二个简短变量声明语句改用普通的多重赋值语句。</p><blockquote><p>简短变量声明语句只有对已经在同级词法域声明过的变量才和赋值操作语句等价，如果变量是在外部词法域声明的，那么简短变量声明语句将会在当前词法域重新声明一个新的变量。</p></blockquote><h3 id="_2-3-2-指针" tabindex="-1"><a class="header-anchor" href="#_2-3-2-指针"><span>2.3.2. 指针</span></a></h3><p>一个变量对应一个保存了变量对应类型值的内存空间。一个指针的值是另一个变量的地址，一个指针对应变量在内存中的存储位置。并不是每一个值都会有一个内存地址，但是对于每一个变量必然有对应的内存地址。通过指针，我们可以直接读或更新对应变量的值，而不需要知道该变量的名字（如果变量有名字的话）。</p><ul><li>如果用 <code>var x int</code>声明语句声明一个x变量，那么 <code>&amp;x</code>表达式（取x变量的内存地址）将产生一个指向该整数变量的指针，指针对应的数据类型是 <code>*int</code>，指针被称之为“指向int类型的指针”。</li><li>如果指针名字为p，那么可以说“p指针指向变量x”，或者说“p指针保存了x变量的内存地址”。</li><li><code>*p</code>表达式对应p指针指向的变量的值。一般 <code>*p</code>表达式读取指针指向的变量的值，这里为int类型</li><li>因为 <code>*p</code>对应一个变量，所以该表达式也可以出现在赋值语句的左边，表示更新指针所指向的变量的值。</li></ul><pre><code class="language-Go">x := 1
p := &amp;x         // p, of type *int, points to x
fmt.Println(*p) // &quot;1&quot;
*p = 2          // equivalent to x = 2
fmt.Println(x)  // &quot;2&quot;
</code></pre><p>对于聚合类型每个成员（比如结构体的每个字段）、或者是数组的每个元素，都是<strong>对应一个变量，因此可以被取地址。</strong></p><p><strong>变量有时候被称为可寻址的值</strong>。即使变量由表达式临时生成，那么表达式也必须能接受 <code>&amp;</code>取地址操作。</p><p>任何类型的指针的零值都是nil。如果p指向某个有效变量，那么 <code>p != nil</code>测试为真。指针之间也是可以进行相等测试的，只有当它们指向同一个变量或全部是nil时才相等。</p><pre><code class="language-Go">var x, y int
fmt.Println(&amp;x == &amp;x, &amp;x == &amp;y, &amp;x == nil) // &quot;true false false&quot;
</code></pre><p>在Go语言中，返回函数中局部变量的地址也是安全的。例如下面的代码，调用f函数时创建局部变量v，在局部变量地址被返回之后依然有效，因为指针p依然引用这个变量。</p><pre><code class="language-Go">var p = f()

func f() *int {
    v := 1
    return &amp;v
}
</code></pre><p>每次调用f函数都将返回不同的结果：</p><pre><code class="language-Go">fmt.Println(f() == f()) // &quot;false&quot;
</code></pre><figure><img src="`+s+`" alt="image-20240320220720825" tabindex="0" loading="lazy"><figcaption>image-20240320220720825</figcaption></figure><p>因为指针包含了一个变量的地址，因此如果将指针作为参数调用函数，那将可以在函数中通过该指针来更新变量的值。例如下面</p><pre><code class="language-Go">func incr(p *int) int {
    *p++ // 非常重要：只是增加p指向的变量的值，并不改变p指针！！！
    return *p
}

v := 1
incr(&amp;v)              // side effect: v is now 2
fmt.Println(incr(&amp;v)) // &quot;3&quot; (and v is 3)
</code></pre><figure><img src="`+p+`" alt="image-20240323122637144" tabindex="0" loading="lazy"><figcaption>image-20240323122637144</figcaption></figure><p>每次我们对一个变量取地址，或者复制指针，我们都是为原变量创建了新的别名。例如，<code>*p</code>就是变量v的别名。</p><p>指针特别有价值的地方在于我们可以不用名字而访问一个变量，但是这是一把双刃剑：要找到一个变量的所有访问者并不容易，我们必须知道变量全部的别名（译注：这是Go语言的垃圾回收器所做的工作）。</p><p>不仅仅是指针会创建别名，很多其他引用类型也会创建别名，例如slice、map和chan，甚至结构体、数组和接口都会创建所引用变量的别名。</p><p>指针是实现标准库中flag包的关键技术，它使用命令行参数来设置对应变量的值，而这些对应命令行标志参数的变量可能会零散分布在整个程序中。为了说明这一点，在早些的echo版本中，就包含了两个可选的命令行参数：<code>-n</code>用于忽略行尾的换行符，<code>-s sep</code>用于指定分隔字符（默认是空格）。</p><pre><code class="language-go"><span class="token comment">// Echo4 prints its command-line arguments.</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;flag&quot;</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;strings&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> n <span class="token operator">=</span> flag<span class="token punctuation">.</span><span class="token function">Bool</span><span class="token punctuation">(</span><span class="token string">&quot;n&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">&quot;omit trailing newline&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> sep <span class="token operator">=</span> flag<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">&quot;s&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;separator&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>flag<span class="token punctuation">.</span><span class="token function">Args</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">*</span>sep<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token operator">!</span><span class="token operator">*</span>n <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><p>调用 <code>flag.Bool</code>函数会创建一个新的对应布尔型标志参数的变量。它有三个属性：第一个是命令行标志参数的名字“n”，然后是该标志参数的默认值（这里是false），最后是该标志参数对应的描述信息。如果用户在命令行输入了一个无效的标志参数，或者输入 <code>-h</code>或 <code>-help</code>参数，那么将打印所有标志参数的名字、默认值和描述信息。</p><p>调用 <code>flag.String</code>函数将创建一个对应字符串类型的标志参数变量，同样包含命令行标志参数对应的参数名、默认值、和描述信息。程序中的 <code>sep</code>和 <code>n</code>变量分别是指向对应命令行标志参数变量的指针，因此必须用 <code>*sep</code>和 <code>*n</code>形式的指针语法间接引用它们。</p><p>当程序运行时，必须在使用标志参数对应的变量之前先调用 <code>flag.Parse</code>函数，用于更新每个标志参数对应变量的值（之前是默认值）。对于非标志参数的普通命令行参数可以通过调用 <code>flag.Args()</code>函数来访问，返回值对应一个字符串类型的slice。如果在flag.Parse函数解析命令行参数时遇到错误，默认将打印相关的提示信息，然后调用os.Exit(2)终止程序。</p><figure><img src="`+i+`" alt="image-20240323124302842" tabindex="0" loading="lazy"><figcaption>image-20240323124302842</figcaption></figure><h3 id="_2-3-3-new函数" tabindex="-1"><a class="header-anchor" href="#_2-3-3-new函数"><span>2.3.3. new函数</span></a></h3><p>另一个创建变量的方法是调用内建的 <code>new</code>函数。表达式 <code>new(T)</code>将创建一个 <code>T</code>类型的匿名变量，初始化为 <code>T</code>类型的零值，然后返回变量地址，返回的指针类型为 <code>*T</code>。</p><p>用new创建变量和普通变量声明语句方式创建变量没有什么区别，除了不需要声明一个临时变量的名字外，我们还可以在表达式中使用new(T)。</p><pre><code class="language-go">p <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>   <span class="token comment">// p, *int 类型, 指向匿名的 int 变量</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span> <span class="token comment">// &quot;0&quot;</span>
<span class="token operator">*</span>p <span class="token operator">=</span> <span class="token number">2</span>          <span class="token comment">// 设置 int 匿名变量的值为 2</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span> <span class="token comment">// &quot;2&quot;</span>
</code></pre><p>下面的两个newInt函数有着相同的行为：</p><pre><code class="language-Go">func newInt() *int {
    return new(int)
}

func newInt() *int {
    var dummy int
    return &amp;dummy
}
</code></pre><p>每次调用new函数都是返回一个新的变量的地址，因此下面两个地址是不同的：</p><pre><code class="language-Go">p := new(int)
q := new(int)
fmt.Println(p == q) // &quot;false&quot;
</code></pre><p>当然也可能有特殊情况：如果两个类型都是空的，也就是说类型的大小是0，例如 <code>struct{}</code>和 <code>[0]int</code>，有可能有相同的地址（依赖具体的语言实现）</p><p>new函数使用通常相对比较少，因为对于结构体来说，直接用字面量语法创建新变量的方法会更灵活（§4.4.1）。</p><p>由于new只是一个预定义的函数，它并不是一个关键字，因此我们可以将new名字重新定义为别的类型。例如下面的例子：</p><pre><code class="language-Go">func delta(old, new int) int { return new - old }
</code></pre><p>由于new被定义为int类型的变量名，因此在delta函数内部是无法使用内置的new函数的。</p><h3 id="_2-3-4-变量的生命周期" tabindex="-1"><a class="header-anchor" href="#_2-3-4-变量的生命周期"><span>2.3.4. 变量的生命周期</span></a></h3><ul><li>对于在包一级声明的变量来说，它们的生命周期和整个程序的运行周期是一致的。</li><li>局部变量的生命周期则是动态的：每次从创建一个新变量的声明语句开始，直到该变量不再被引用为止，然后变量的存储空间可能被回收。函数的参数变量和返回值变量都是局部变量。它们在函数每次被调用的时候创建。</li></ul><p>那么Go语言的自动垃圾收集器是如何知道一个变量是何时可以被回收的呢？基本的实现思路是：</p><ul><li>从每个包级的变量和每个当前运行函数的每一个局部变量开始，通过指针或引用的访问路径遍历，是否可以找到该变量。如果不存在这样的访问路径，那么说明该变量是不可达的，也就是说它是否存在并不会影响程序后续的计算结果。</li><li>因为一个变量的有效周期只取决于是否可达，因此一个循环迭代内部的局部变量的生命周期可能超出其局部作用域。同时，局部变量可能在函数返回之后依然存在。</li></ul><p>编译器会自动选择在栈上还是在堆上分配局部变量的存储空间：</p><pre><code class="language-Go">var global *int

func f() {
    var x int
    x = 1
    global = &amp;x
}

func g() {
    y := new(int)
    *y = 1
}
</code></pre><ul><li>f函数里的x变量必须在堆上分配，因为它在函数退出后依然可以通过包一级的global变量找到，虽然它是在函数内部定义的；用Go语言的术语说，这个x局部变量从函数f中逃逸了。</li><li>相反，当g函数返回时，变量 <code>*y</code>将是不可达的，也就是说可以马上被回收的。因此，<code>*y</code>并没有从函数g中逃逸，编译器可以选择在栈上分配 <code>*y</code>的存储空间（译注：也可以选择在堆上分配，然后由Go语言的GC回收这个变量的内存空间），虽然这里用的是new方式。</li><li>要记住的是，逃逸的变量需要额外分配内存，同时对性能的优化可能会产生细微的影响。</li></ul><h2 id="_2-4-赋值" tabindex="-1"><a class="header-anchor" href="#_2-4-赋值"><span>2.4. 赋值</span></a></h2><p>使用赋值语句可以更新一个变量的值，最简单的赋值语句是将要被赋值的变量放在=的左边，新值的表达式放在=的右边。</p><pre><code class="language-Go">x = 1                       // 命名变量的赋值
*p = true                   // 通过指针间接赋值
person.name = &quot;bob&quot;         // 结构体字段赋值
count[x] = count[x] * scale // 数组、slice或map的元素赋值
</code></pre><p>特定的二元算术运算符和赋值语句的复合操作有一个简洁形式，例如上面最后的语句可以重写为：</p><pre><code class="language-Go">count[x] *= scale
</code></pre><p>这样可以省去对变量表达式的重复计算。</p><p>数值变量也可以支持 <code>++</code>递增和 <code>--</code>递减语句（译注：自增和自减是语句，而不是表达式，因此 <code>x = i++</code>之类的表达式是错误的）：</p><pre><code class="language-Go">v := 1
v++    // 等价方式 v = v + 1；v 变成 2
v--    // 等价方式 v = v - 1；v 变成 1
</code></pre><h3 id="_2-4-1-元组赋值" tabindex="-1"><a class="header-anchor" href="#_2-4-1-元组赋值"><span>2.4.1. 元组赋值</span></a></h3><p>元组赋值是另一种形式的赋值语句，它允许同时更新多个变量的值。在赋值之前，赋值语句右边的所有表达式将会先进行求值，然后再统一更新左边对应变量的值。这对于处理有些同时出现在元组赋值语句左右两边的变量很有帮助，例如我们可以这样交换两个变量的值：</p><pre><code class="language-Go">x, y = y, x

a[i], a[j] = a[j], a[i]
</code></pre><p>或者是计算两个整数值的的最大公约数（GCD）（译注：GCD不是那个敏感字，而是greatest common divisor的缩写，欧几里德的GCD是最早的非平凡算法）：</p><pre><code class="language-Go">func gcd(x, y int) int {
    for y != 0 {
        x, y = y, x%y
    }
    return x
}
</code></pre><p>或者是计算斐波纳契数列（Fibonacci）的第N个数：</p><pre><code class="language-Go">func fib(n int) int {
    x, y := 0, 1
    for i := 0; i &lt; n; i++ {
        x, y = y, x+y
    }
    return x
}
</code></pre><p>元组赋值也可以使一系列琐碎赋值更加紧凑（译注: 特别是在for循环的初始化部分），</p><pre><code class="language-Go">i, j, k = 2, 3, 5
</code></pre><p>但如果表达式太复杂的话，应该尽量避免过度使用元组赋值；因为每个变量单独赋值语句的写法可读性会更好。</p><h4 id="多个返回值" tabindex="-1"><a class="header-anchor" href="#多个返回值"><span>多个返回值</span></a></h4><p>有些表达式会产生多个值，比如调用一个有多个返回值的函数。当这样一个函数调用出现在元组赋值右边的表达式中时（译注：右边不能再有其它表达式），左边变量的数目必须和右边一致。</p><pre><code class="language-Go">f, err = os.Open(&quot;foo.txt&quot;) // function call returns two values
</code></pre><p>通常，这类函数会用额外的返回值来表达某种错误类型，例如os.Open是用额外的返回值返回一个error类型的错误，还有一些是用来返回布尔值，通常被称为ok。在稍后我们将看到的三个操作都是类似的用法。如果map查找（§4.3）、类型断言（§7.10）或通道接收（§8.4.2）出现在赋值语句的右边，它们都可能会产生两个结果，有一个额外的布尔结果表示操作是否成功：</p><pre><code class="language-Go">v, ok = m[key]             // map lookup
v, ok = x.(T)              // type assertion
v, ok = &lt;-ch               // channel receive
</code></pre><p>译注：map查找（§4.3）、类型断言（§7.10）或通道接收（§8.4.2）出现在赋值语句的右边时，并不一定是产生两个结果，也可能只产生一个结果。对于只产生一个结果的情形，map查找失败时会返回零值，类型断言失败时会发生运行时panic异常，通道接收失败时会返回零值（阻塞不算是失败）。例如下面的例子：</p><pre><code class="language-Go">v = m[key]                // map查找，失败时返回零值
v = x.(T)                 // type断言，失败时panic异常
v = &lt;-ch                  // 管道接收，失败时返回零值（阻塞不算是失败）

_, ok = m[key]            // map返回2个值
_, ok = mm[&quot;&quot;], false     // map返回1个值
_ = mm[&quot;&quot;]                // map返回1个值
</code></pre><p>和变量声明一样，我们可以用下划线空白标识符 <code>_</code>来丢弃不需要的值。</p><pre><code class="language-Go">_, err = io.Copy(dst, src) // 丢弃字节数
_, ok = x.(T)              // 只检测类型，忽略具体值
</code></pre><h3 id="_2-4-2-可赋值性" tabindex="-1"><a class="header-anchor" href="#_2-4-2-可赋值性"><span>2.4.2. 可赋值性</span></a></h3><p>隐式的赋值：</p><ul><li>函数调用会隐式地将调用参数的值赋值给函数的参数变量</li><li>一个返回语句会隐式地将返回操作的值赋值给结果变量</li><li>一个复合类型的字面量（§4.2）也会产生赋值行为。例如下面的语句：</li></ul><pre><code class="language-Go">medals := []string{&quot;gold&quot;, &quot;silver&quot;, &quot;bronze&quot;}
</code></pre><p>隐式地对slice的每个元素进行赋值操作，类似这样写的行为：</p><pre><code class="language-Go">medals[0] = &quot;gold&quot;
medals[1] = &quot;silver&quot;
medals[2] = &quot;bronze&quot;
</code></pre><p>map和chan的元素，虽然不是普通的变量，但是也有类似的隐式赋值行为。</p><p>不管是隐式还是显式地赋值，在赋值语句左边的变量和右边最终的值必须有相同的数据类型。更直白地说，只有右边的值对于左边的变量是可赋值的，赋值语句才是允许的。</p><p>除一些特殊情况外，可赋值的规则：类型必须完全匹配，nil可以赋值给任何指针或引用类型的变量。常量（§3.6）则有更灵活的赋值规则，因为这样可以避免不必要的显式的类型转换。</p><p>对于任何类型的值的相等比较（==<code>或</code>!=），第二个值必须是对第一个值类型对应的变量是可赋值的，反之亦然。</p><h2 id="_2-5-类型" tabindex="-1"><a class="header-anchor" href="#_2-5-类型"><span>2.5. 类型</span></a></h2><p>一个类型声明语句创建了一个新的类型名称，和现有类型具有相同的底层结构。新命名的类型提供了一个方法，用来分隔不同概念的类型，这样即使它们底层类型相同也是不兼容的。</p><pre><code class="language-Go">type 类型名字 底层类型
</code></pre><p>类型声明语句一般出现在包一级，因此如果新创建的类型名字的首字符大写，则在包外部也可以使用。</p><p>我们将不同温度单位分别定义为不同的类型：</p><pre><code class="language-Go">// Package tempconv performs Celsius and Fahrenheit temperature computations.
package tempconv

import &quot;fmt&quot;

type Celsius float64    // 摄氏温度
type Fahrenheit float64 // 华氏温度

const (
    AbsoluteZeroC Celsius = -273.15 // 绝对零度
    FreezingC     Celsius = 0       // 结冰点温度
    BoilingC      Celsius = 100     // 沸水温度
)

func CToF(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }

func FToC(f Fahrenheit) Celsius { return Celsius((f - 32) * 5 / 9) }
</code></pre><p>我们在这个包声明了两种类型：Celsius和Fahrenheit分别对应不同的温度单位。它们虽然有着相同的底层类型float64，但是它们是不同的数据类型，因此它们不可以被相互比较或混在一个表达式运算。</p><p>Celsius(t)和Fahrenheit(t)是类型转换操作，它们并不是函数调用。类型转换不会改变值本身，但是会使它们的语义发生变化。另一方面，CToF和FToC两个函数则是对不同温度单位下的温度进行换算，它们会返回不同的值。</p><p>对于每一个类型T，都有一个对应的类型转换操作 <code>T(x)</code>，用于将x转为T类型（译注：如果T是指针类型，可能会需要用小括弧包装T，比如 <code>(*int)(0)</code>）。只有当两个类型的底层基础类型相同时，才允许这种转型操作，或者是两者都是指向相同底层结构的指针类型，这些转换只改变类型而不会影响值本身。</p><p>数值类型之间的转型也是允许的，并且在字符串和一些特定类型的slice之间也是可以转换的，在下一章我们会看到这样的例子。这类转换可能改变值的表现。例如，将一个浮点数转为整数将丢弃小数部分，将一个字符串转为 <code>[]byte</code>类型的slice将拷贝一个字符串数据的副本。在任何情况下，运行时不会发生转换失败的错误（译注: 错误只会发生在编译阶段）。</p><p>底层数据类型决定了内部结构和表达方式，也决定是否可以像底层类型一样对内置运算符的支持。这意味着，Celsius和Fahrenheit类型的算术运算行为和底层的float64类型是一样的，正如我们所期望的那样。</p><pre><code class="language-Go">fmt.Printf(&quot;%g\\n&quot;, BoilingC-FreezingC) // &quot;100&quot; °C
boilingF := CToF(BoilingC)
fmt.Printf(&quot;%g\\n&quot;, boilingF-CToF(FreezingC)) // &quot;180&quot; °F
fmt.Printf(&quot;%g\\n&quot;, boilingF-FreezingC)       // compile error: type mismatch
</code></pre><figure><img src="`+c+`" alt="image-20240323175325426" tabindex="0" loading="lazy"><figcaption>image-20240323175325426</figcaption></figure><p>比较运算符 <code>==</code>和 <code>&lt;</code>也可以用来比较一个命名类型的变量和另一个有相同类型的变量，或有着相同底层类型的未命名类型的值之间做比较。但是如果两个值有着不同的类型，则不能直接进行比较：</p><pre><code class="language-Go">var c Celsius
var f Fahrenheit
fmt.Println(c == 0)          // &quot;true&quot;
fmt.Println(f &gt;= 0)          // &quot;true&quot;
fmt.Println(c == f)          // compile error: type mismatch
fmt.Println(c == Celsius(f)) // &quot;true&quot;!
</code></pre><p>注意最后那个语句。尽管看起来像函数调用，但是Celsius(f)是类型转换操作，它并不会改变值，仅仅是改变值的类型而已。测试为真的原因是因为c和f都是零值。</p><figure><img src="`+r+`" alt="image-20240323180618198" tabindex="0" loading="lazy"><figcaption>image-20240323180618198</figcaption></figure><p>命名类型还可以为该类型的值定义新的行为。这些行为表示为一组关联到该类型的函数集合，我们称为类型的方法集。</p><p>下面的声明语句，Celsius类型的参数c出现在了函数名的前面，表示声明的是Celsius类型的一个名叫String的方法，该方法返回该类型对象c带着°C温度单位的字符串：</p><pre><code class="language-Go">func (c Celsius) String() string { return fmt.Sprintf(&quot;%g°C&quot;, c) }
</code></pre><p>许多类型都会定义一个String方法，因为当使用fmt包的打印方法时，将会优先使用该类型对应的String方法返回的结果打印，我们将在7.1节讲述。</p><pre><code class="language-Go">c := FToC(212.0)
fmt.Println(c.String()) // &quot;100°C&quot;
fmt.Printf(&quot;%v\\n&quot;, c)   // &quot;100°C&quot;; no need to call String explicitly
fmt.Printf(&quot;%s\\n&quot;, c)   // &quot;100°C&quot;
fmt.Println(c)          // &quot;100°C&quot;
fmt.Printf(&quot;%g\\n&quot;, c)   // &quot;100&quot;; does not call String
fmt.Println(float64(c)) // &quot;100&quot;; does not call String
</code></pre><figure><img src="`+l+`" alt="image-20240323180830536" tabindex="0" loading="lazy"><figcaption>image-20240323180830536</figcaption></figure><h2 id="_2-6-包和文件" tabindex="-1"><a class="header-anchor" href="#_2-6-包和文件"><span>2.6. 包和文件</span></a></h2><p>Go语言中的包和其他语言的库或模块的概念类似，目的都是为了支持模块化、封装、单独编译和代码重用。一个包的源代码保存在一个或多个以.go为文件后缀名的源文件中，通常一个包所在目录路径的后缀是包的导入路径；例如包 <code>gopl.io/ch1/helloworld</code>对应的目录路径是 <code>$GOPATH/src/gopl.io/ch1/helloworld</code>。</p><p>每个包都对应一个独立的名字空间。例如，在image包中的Decode函数和在unicode/utf16包中的 Decode函数是不同的。要在外部引用该函数，必须显式使用image.Decode或utf16.Decode形式访问。</p><p>包还可以让我们通过控制哪些名字是外部可见的来隐藏内部实现信息。在Go语言中，一个简单的规则是：如果一个名字是大写字母开头的，那么该名字是导出的（译注：因为汉字不区分大小写，因此汉字开头的名字是没有导出的）。</p><p>包代码存储在两个源文件中，用来演示如何在一个源文件声明然后在其他的源文件访问：</p><p>我们把变量的声明、对应的常量，还有方法都放到tempconv.go源文件中：</p><p><em>gopl.io/ch2/tempconv</em></p><pre><code class="language-Go">// Package tempconv performs Celsius and Fahrenheit conversions.
package tempconv

import &quot;fmt&quot;

type Celsius float64
type Fahrenheit float64

const (
    AbsoluteZeroC Celsius = -273.15
    FreezingC     Celsius = 0
    BoilingC      Celsius = 100
)

func (c Celsius) String() string    { return fmt.Sprintf(&quot;%g°C&quot;, c) }
func (f Fahrenheit) String() string { return fmt.Sprintf(&quot;%g°F&quot;, f) }
</code></pre><p>转换函数则放在另一个conv.go源文件中：</p><pre><code class="language-Go">package tempconv

// CToF converts a Celsius temperature to Fahrenheit.
func CToF(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }

// FToC converts a Fahrenheit temperature to Celsius.
func FToC(f Fahrenheit) Celsius { return Celsius((f - 32) * 5 / 9) }
</code></pre><p>每个源文件都是以包的声明语句开始，用来指明包的名字。当包被导入的时候，包内的成员将通过类似tempconv.CToF的形式访问。而包级别的名字，例如在一个文件声明的类型和常量，在同一个包的其他源文件也是可以直接访问的，就好像所有代码都在一个文件一样。要注意的是tempconv.go源文件导入了fmt包，但是conv.go源文件并没有，因为这个源文件中的代码并没有用到fmt包。</p><p>因为包级别的常量名都是以大写字母开头，它们可以像tempconv.AbsoluteZeroC这样被外部代码访问：</p><pre><code class="language-Go">fmt.Printf(&quot;Brrrr! %v\\n&quot;, tempconv.AbsoluteZeroC) // &quot;Brrrr! -273.15°C&quot;
</code></pre><p>要将摄氏温度转换为华氏温度，需要先用import语句导入gopl.io/ch2/tempconv包，然后就可以使用下面的代码进行转换了：</p><pre><code class="language-Go">fmt.Println(tempconv.CToF(tempconv.BoilingC)) // &quot;212°F&quot;
</code></pre><p>在每个源文件的包声明前的注释是包注释（§10.7.4）。通常，包注释的第一句应该先是包的功能概要说明。一个包通常只有一个源文件有包注释（译注：如果有多个包注释，目前的文档工具会根据源文件名的先后顺序将它们链接为一个包注释）。如果包注释很大，通常会放到一个独立的doc.go文件中。</p><h3 id="练习-2-1" tabindex="-1"><a class="header-anchor" href="#练习-2-1"><span>练习 2.1</span></a></h3><p>向tempconv包添加类型、常量和函数用来处理Kelvin绝对温度的转换，Kelvin 绝对零度是−273.15°C，Kelvin绝对温度1K和摄氏度1°C的单位间隔是一样的。</p><pre><code class="language-go"><span class="token comment">// Package tempconv performs Celsius and Fahrenheit conversions.</span>
<span class="token keyword">package</span> tempconv

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Celsius <span class="token builtin">float64</span>
<span class="token keyword">type</span> Fahrenheit <span class="token builtin">float64</span>
<span class="token keyword">type</span> Kelvin <span class="token builtin">float64</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	AbsoluteZeroC Celsius <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">273.15</span>
	FreezingC     Celsius <span class="token operator">=</span> <span class="token number">0</span>
	BoilingC      Celsius <span class="token operator">=</span> <span class="token number">100</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c Celsius<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>    <span class="token punctuation">{</span> <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%g°C&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>f Fahrenheit<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%g°F&quot;</span><span class="token punctuation">,</span> f<span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>k Kelvin<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>     <span class="token punctuation">{</span> <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%gK&quot;</span><span class="token punctuation">,</span> k<span class="token punctuation">)</span> <span class="token punctuation">}</span>
</code></pre><p>conv.go</p><pre><code class="language-Go">package tempconv

// CToF converts a Celsius temperature to Fahrenheit.
func CToF(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }

// FToC converts a Fahrenheit temperature to Celsius.
func FToC(f Fahrenheit) Celsius { return Celsius((f - 32) * 5 / 9) }

func KToC(k Kelvin) Celsius { return Celsius(k - 273.15) }

</code></pre><figure><img src="`+u+`" alt="image-20240324214859220" tabindex="0" loading="lazy"><figcaption>image-20240324214859220</figcaption></figure><h3 id="_2-6-1-导入包" tabindex="-1"><a class="header-anchor" href="#_2-6-1-导入包"><span>2.6.1. 导入包</span></a></h3><p>在Go语言程序中，每个包都有一个全局唯一的导入路径。导入语句中类似&quot;gopl.io/ch2/tempconv&quot;的字符串对应包的导入路径。Go语言的规范并没有定义这些字符串的具体含义或包来自哪里，它们是由构建工具来解释的。当使用Go语言自带的go工具箱时（第十章），一个导入路径代表一个目录中的一个或多个Go源文件。</p><p>除了包的导入路径，每个包还有一个包名，包名一般是短小的名字（并不要求包名是唯一的），包名在包的声明处指定。按照惯例，一个包的名字和包的导入路径的最后一个字段相同，例如 ch2/pkg/tempconv包的名字一般是tempconv。</p><pre><code class="language-Go">// Cf converts its numeric argument to Celsius and Fahrenheit.
package main

import (
    &quot;fmt&quot;
    &quot;os&quot;
    &quot;strconv&quot;

    &quot;ch2/pkg/tempconv&quot;
)

func main() {
    for _, arg := range os.Args[1:] {
        t, err := strconv.ParseFloat(arg, 64)
        if err != nil {
            fmt.Fprintf(os.Stderr, &quot;cf: %v\\n&quot;, err)
            os.Exit(1)
        }
        f := tempconv.Fahrenheit(t)
        c := tempconv.Celsius(t)
        fmt.Printf(&quot;%s = %s, %s = %s\\n&quot;,
            f, tempconv.FToC(f), c, tempconv.CToF(c))
    }
}

</code></pre><figure><img src="`+g+`" alt="image-20240324221637025" tabindex="0" loading="lazy"><figcaption>image-20240324221637025</figcaption></figure><p>导入语句将导入的包绑定到一个短小的名字，然后通过该短小的名字就可以引用包中导出的全部内容。上面的导入声明将允许我们以tempconv.CToF的形式来访问ch2/pkg/tempconv包中的内容。</p><p>如果导入了一个包，但是又没有使用该包将被当作一个编译错误处理。我们可以使用golang.org/x/tools/cmd/goimports导入工具，它可以根据需要自动添加或删除导入的包；许多编辑器都可以集成goimports工具，然后在保存文件的时候自动运行。类似的还有gofmt工具，可以用来格式化Go源文件。</p><h3 id="练习-2-2" tabindex="-1"><a class="header-anchor" href="#练习-2-2"><span>练习 2.2</span></a></h3><p>写一个通用的单位转换程序，用类似cf程序的方式从命令行读取参数，如果缺省的话则是从标准输入读取参数，然后做类似Celsius和Fahrenheit的单位转换，长度单位可以对应英尺和米，重量单位可以对应磅和公斤等。</p><pre><code class="language-GO">package unitconv

import &quot;fmt&quot;

type Feet float64
type Metre float64

type Celsius float64
type Fahrenheit float64
type Kelvin float64

type Pound float64
type Kilogram float64

// 许多类型都会定义一个String方法，因为当使用fmt包的打印方法时，将会优先使用该类型对应的String方法返回的结果打印，我们将在7.1节讲述。
func (f Feet) String() string  { return fmt.Sprintf(&quot;%g英尺&quot;, f) }
func (m Metre) String() string { return fmt.Sprintf(&quot;%g米&quot;, m) }

func (c Celsius) String() string    { return fmt.Sprintf(&quot;%g°C&quot;, c) }
func (f Fahrenheit) String() string { return fmt.Sprintf(&quot;%g°F&quot;, f) }
func (k Kelvin) String() string     { return fmt.Sprintf(&quot;%gK&quot;, k) }

func (p Pound) String() string    { return fmt.Sprintf(&quot;%g磅&quot;, p) }
func (k Kilogram) String() string { return fmt.Sprintf(&quot;%g公斤&quot;, k) }


</code></pre><p>conv.go</p><pre><code class="language-GO">package unitconv

// Feet to Metre
// Metre to Feet

// CToF converts a Celsius temperature to Fahrenheit.
func CToF(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }

// FToC converts a Fahrenheit temperature to Celsius.
func FToC(f Fahrenheit) Celsius { return Celsius((f - 32) * 5 / 9) }

func KToC(k Kelvin) Celsius { return Celsius(k - 273.15) }
func CToK(c Celsius) Kelvin { return Kelvin(c + 273.15) }
func FToM(f Feet) Metre     { return Metre(f * 0.3048) }

func MToF(m Metre) Feet { return Feet(m * 3.28084) }

func PToK(p Pound) Kilogram { return Kilogram(p * 0.453592) }

func KToP(k Kilogram) Pound { return Pound(k * 2.20462) }

</code></pre><p>main.go</p><pre><code class="language-GO">// Cf converts its numeric argument to Celsius and Fahrenheit.
package main

import (
	&quot;ch2/pkg/unitconv&quot;
	&quot;fmt&quot;
	&quot;os&quot;
	&quot;strconv&quot;
)

func main() {
	for _, arg := range os.Args[1:] {
		t, err := strconv.ParseFloat(arg, 64)
		if err != nil {
			fmt.Fprintf(os.Stderr, &quot;cf: %v\\n&quot;, err)
			os.Exit(1)
		}
        // 练习2.2
		f := unitconv.Fahrenheit(t)
		c := unitconv.Celsius(t)
		fmt.Printf(&quot;%s = %s, %s = %s\\n&quot;, f, tempconv.FToC(f), c, tempconv.CToF(c))
		fe := unitconv.Feet(t)
		m := unitconv.Metre(t)
		fmt.Printf(&quot;%s = %s, %s = %s\\n&quot;, fe, unitconv.FToM(fe), m, unitconv.MToF(m))
		p := unitconv.Pound(t)
		k := unitconv.Kilogram(t)
		fmt.Printf(&quot;%s = %s, %s = %s\\n&quot;, p, unitconv.PToK(p), k, unitconv.KToP(k))
	}
}

</code></pre><figure><img src="`+d+`" alt="image-20240325113004910" tabindex="0" loading="lazy"><figcaption>image-20240325113004910</figcaption></figure><h3 id="_2-6-2-包的初始化" tabindex="-1"><a class="header-anchor" href="#_2-6-2-包的初始化"><span>2.6.2. 包的初始化</span></a></h3><p>包的初始化首先是解决包级变量的依赖顺序，然后按照包级变量声明出现的顺序依次初始化：</p><pre><code class="language-Go">var a = b + c // a 第三个初始化, 为 3
var b = f()   // b 第二个初始化, 为 2, 通过调用 f (依赖c)
var c = 1     // c 第一个初始化, 为 1

func f() int { return c + 1 }
</code></pre><p>如果包中含有多个.go源文件，它们将按照发给编译器的顺序进行初始化，Go语言的构建工具首先会将.go文件根据文件名排序，然后依次调用编译器编译。</p><p>对于在包级别声明的变量，如果有初始化表达式则用表达式初始化，还有一些没有初始化表达式的，例如某些表格数据初始化并不是一个简单的赋值过程。在这种情况下，我们可以用一个特殊的init初始化函数来简化初始化工作。每个文件都可以包含多个init初始化函数</p><pre><code class="language-Go">func init() { /* ... */ }
</code></pre><p>这样的init初始化函数除了不能被调用或引用外，其他行为和普通函数类似。在每个文件中的init初始化函数，在程序开始执行时按照它们声明的顺序被自动调用。</p><p>每个包在解决依赖的前提下，以导入声明的顺序初始化，每个包只会被初始化一次。因此，如果一个p包导入了q包，那么在p包初始化的时候可以认为q包必然已经初始化过了。初始化工作是自下而上进行的，main包最后被初始化。以这种方式，可以确保在main函数执行之前，所有依赖的包都已经完成初始化工作了。</p><p>下面的代码定义了一个PopCount函数，用于返回一个数字中含二进制1bit的个数。它使用init初始化函数来生成辅助表格pc，pc表格用于处理每个8bit宽度的数字含二进制的1bit的bit个数，这样的话在处理64bit宽度的数字时就没有必要循环64次，只需要8次查表就可以了。（这并不是最快的统计1bit数目的算法，但是它可以方便演示init函数的用法，并且演示了如何预生成辅助表格，这是编程中常用的技术）。</p><pre><code class="language-Go">package popcount

// pc[i] is the population count of i.
var pc [256]byte

func init() {
    for i := range pc {
        pc[i] = pc[i/2] + byte(i&amp;1)
    }
}

// PopCount returns the population count (number of set bits) of x.
func PopCount(x uint64) int {
    return int(pc[byte(x&gt;&gt;(0*8))] +
        pc[byte(x&gt;&gt;(1*8))] +
        pc[byte(x&gt;&gt;(2*8))] +
        pc[byte(x&gt;&gt;(3*8))] +
        pc[byte(x&gt;&gt;(4*8))] +
        pc[byte(x&gt;&gt;(5*8))] +
        pc[byte(x&gt;&gt;(6*8))] +
        pc[byte(x&gt;&gt;(7*8))])
}
</code></pre><p>译注：对于pc这类需要复杂处理的初始化，可以通过将初始化逻辑包装为一个匿名函数处理，像下面这样：</p><pre><code class="language-Go">// pc[i] is the population count of i.
var pc [256]byte = func() (pc [256]byte) {
    for i := range pc {
        pc[i] = pc[i/2] + byte(i&amp;1)
    }
    return
}()
</code></pre><p>要注意的是在init函数中，range循环只使用了索引，省略了没有用到的值部分。循环也可以这样写：</p><pre><code class="language-Go">for i, _ := range pc {
</code></pre><h3 id="练习-2-3" tabindex="-1"><a class="header-anchor" href="#练习-2-3"><span>练习 2.3</span></a></h3><p>重写PopCount函数，用一个循环代替单一的表达式。比较两个版本的性能。（11.4节将展示如何系统地比较两个不同实现的性能。）</p><pre><code class="language-Go">// LPopCount 把上面那个函数用for循环改一下
func LPopCount(x uint64) int {
	start := time.Now().UnixNano()
	count := 0
	for i := 0; i &lt; 8; i++ {
		count += int(pc[byte(x&gt;&gt;(i*8))])
	}
	end := time.Now().UnixNano()
	fmt.Printf(&quot;LPopCount cost %v\\n&quot;, end-start)
	return count
}
</code></pre><h3 id="练习-2-4" tabindex="-1"><a class="header-anchor" href="#练习-2-4"><span>练习 2.4</span></a></h3><p>用移位算法重写PopCount函数，每次测试最右边的1bit，然后统计总数。比较和查表算法的性能差异。</p><pre><code class="language-Go">// SPopCount 移1位然后&amp;00000000....1，得1就说明最后一位是1
func SPopCount(x uint64) int {
	start := time.Now()
	count := 0

	for i := x; i &gt; 0; i = i &gt;&gt; 1 {
		count += int(i &amp; 1)
	}

	fmt.Printf(&quot;SPopCount cost %v\\n&quot;, time.Since(start))
	return count
}
</code></pre><h3 id="练习-2-5" tabindex="-1"><a class="header-anchor" href="#练习-2-5"><span>练习 2.5</span></a></h3><p>表达式 <code>x&amp;(x-1)</code>用于将x的最低的一个非零的bit位清零。使用这个算法重写PopCount函数，然后比较性能。</p><pre><code class="language-Go">// CPopCount x&amp;(x-1)将x的最低的一个非零的bit位清零，这样能跳过0的匹配，速度应该快，但是没看出来
func CPopCount(x uint64) int {
	start := time.Now()
	count := 0
	for i := x; i &gt; 0; i = i &amp; (i - 1) {
		count++
	}

	fmt.Printf(&quot;CPopCount cost %v\\n&quot;, time.Since(start).Milliseconds())
	return count
}
</code></pre><h2 id="_2-7-作用域" tabindex="-1"><a class="header-anchor" href="#_2-7-作用域"><span>2.7. 作用域</span></a></h2><p><strong>声明语句的作用域是指源代码中可以有效使用这个名字的范围。</strong></p><p>不要将作用域和生命周期混为一谈：</p><ul><li>声明语句的作用域对应的是一个源代码的文本区域；它是一个编译时的属性。</li><li>一个变量的生命周期是指程序运行时变量存在的有效时间段，在此时间区域内它可以被程序的其他部分引用；是一个运行时的概念。</li></ul><p>**句法块：**是由花括弧所包含的一系列语句，就像函数体或循环体花括弧包裹的内容一样。句法块内部声明的名字是无法被外部块访问的。这个块决定了内部声明的名字的作用域范围。</p><p>**词法块：**这些声明在代码中并未显式地使用花括号包裹起来，我们称之为词法块。对全局的源代码来说，存在一个整体的词法块，称为全局词法块；对于每个包，每个for、if和switch语句，也都有对应词法块；每个switch或select的分支也有独立的词法块；当然也包括显式书写的词法块（花括弧包含的语句）。</p><p><strong>声明语句对应的词法域决定了作用域范围的大小。</strong></p><ul><li>对于内置的类型、函数和常量，比如int、len和true等是在全局作用域的，因此可以在整个程序中直接使用。任何在函数外部（也就是包级语法域）声明的名字可以在同一个包的任何源文件中访问的。</li><li>对于导入的包，例如tempconv导入的fmt包，则是对应源文件级的作用域，因此只能在当前的文件中访问导入的fmt包，<strong>当前包的其它源文件无法访问在当前源文件导入的包。</strong></li><li>许多声明语句，比如tempconv.CToF函数中的变量c，则是局部作用域的，它只能在函数内部（甚至只能是局部的某些部分）访问。</li><li>控制流标号，就是break、continue或goto语句后面跟着的那种标号，则是函数级的作用域。</li></ul><blockquote><p>一个程序可能包含多个同名的声明，只要它们在不同的词法域就没有关系。</p></blockquote><p>你可以声明一个局部变量，和包级的变量同名。或者是像2.3.3节的例子那样，你可以将一个函数参数的名字声明为new，虽然内置的new是全局作用域的。</p><p>当编译器遇到一个名字引用时，它会对其定义进行查找，查找过程从最内层的词法域向全局的作用域进行。</p><ul><li>如果查找失败，则报告“未声明的名字”这样的错误。</li><li>如果该名字在内部和外部的块分别声明过，则内部块的声明首先被找到。在这种情况下，内部声明屏蔽了外部同名的声明，让外部的声明的名字无法被访问</li></ul><pre><code class="language-go"><span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> g <span class="token operator">=</span> <span class="token string">&quot;g&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	f <span class="token operator">:=</span> <span class="token string">&quot;f&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token comment">// &quot;f&quot;; 函数内部的var f覆盖了包级别的func f</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span> <span class="token comment">// &quot;g&quot;; 包级别的var g</span>
	<span class="token comment">//fmt.Println(h) 	// # command-line-arguments  .\\test1.go:13:14: undefined: h</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="词法域" tabindex="-1"><a class="header-anchor" href="#词法域"><span>词法域</span></a></h3><p>在函数中词法域可以深度嵌套，因此内部的一个声明可能屏蔽外部的声明。还有许多语法块是if或for等控制流语句构造的。下面的代码有三个不同的变量x，因为它们是定义在不同的词法域（这个例子只是为了演示作用域规则，但不是好的编程风格）。</p><pre><code class="language-Go">func main() {
	x := &quot;hello!&quot;
	for i := 0; i &lt; len(x); i++ {
		x := x[i]
		if x != &#39;!&#39; {
			x := x + &#39;A&#39; - &#39;a&#39;
			fmt.Printf(&quot;%c&quot;, x) // &quot;HELLO&quot; (one letter per iteration)
		}
	}
}
</code></pre><p>上面的for语句创建了两个词法域：花括弧包含的是显式的部分，是for的循环体部分词法域，另外一个隐式的部分则是循环的初始化部分，比如用于迭代变量i的初始化。隐式的词法域部分的作用域还包含条件测试部分和循环后的迭代部分（<code>i++</code>），当然也包含循环体词法域。</p><blockquote><p>可以点一下变量 同样出现阴影的就是同一个x，vscode和goland都可以</p><p>虽然但是，其实靠感觉是能知道作用域的</p></blockquote><h3 id="for循环词法域" tabindex="-1"><a class="header-anchor" href="#for循环词法域"><span>for循环词法域</span></a></h3><p>下面的例子同样有三个不同的x变量，每个声明在不同的词法域，一个在函数体词法域，一个在for隐式的初始化词法域，一个在for循环体词法域；只有两个块是显式创建的：</p><pre><code class="language-Go">func main() {
    x := &quot;hello&quot;
    for _, x := range x {
        x := x + &#39;A&#39; - &#39;a&#39;
        fmt.Printf(&quot;%c&quot;, x) // &quot;HELLO&quot; (one letter per iteration)
    }
}
</code></pre><h3 id="if和switch词法域" tabindex="-1"><a class="header-anchor" href="#if和switch词法域"><span>if和switch词法域</span></a></h3><p>和for循环类似，if和switch语句也会在条件部分创建隐式词法域，还有它们对应的执行体词法域。下面的if-else测试链演示了x和y的有效作用域范围：</p><pre><code class="language-go"><span class="token keyword">if</span> x <span class="token operator">:=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> x <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> y <span class="token operator">:=</span> <span class="token function">g</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> x <span class="token operator">==</span> y <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token comment">// compile error: x and y are not visible here</span>

</code></pre><p>第二个if语句嵌套在第一个内部，因此第一个if语句条件初始化词法域声明的变量在第二个if中也可以访问。switch语句的每个分支也有类似的词法域规则：条件部分为一个隐式词法域，然后是每个分支的词法域。</p><h3 id="声明顺序" tabindex="-1"><a class="header-anchor" href="#声明顺序"><span>声明顺序</span></a></h3><p>在包级别，声明的顺序并不会影响作用域范围，因此一个先声明的可以引用它自身或者是引用后面的一个声明，这可以让我们定义一些相互嵌套或递归的类型或函数。但是如果一个变量或常量递归引用了自身，则会产生编译错误。</p><p>在这个程序中：</p><pre><code class="language-Go">if f, err := os.Open(fname); err != nil { // compile error: unused: f
    return err
}
f.ReadByte() // compile error: undefined f
f.Close()    // compile error: undefined f
</code></pre><p>变量f的作用域只在if语句内，因此后面的语句将无法引入它，这将导致编译错误。你可能会收到一个局部变量f没有声明的错误提示，具体错误信息依赖编译器的实现。</p><blockquote><p>通常需要在if之前声明变量，这样可以确保后面的语句依然可以访问变量：</p></blockquote><pre><code class="language-Go">f, err := os.Open(fname)
if err != nil {
    return err
}
f.ReadByte()
f.Close()
</code></pre><p>你可能会考虑通过将ReadByte和Close移动到if的else块来解决这个问题：</p><pre><code class="language-Go">if f, err := os.Open(fname); err != nil {
    return err
} else {
    // f and err are visible here too
    f.ReadByte()
    f.Close()
}
</code></pre><p>但这不是Go语言推荐的做法，Go语言的习惯是在if中处理错误然后直接返回，这样可以确保正常执行的语句不需要代码缩进。</p><h3 id="短变量声明语句的作用域" tabindex="-1"><a class="header-anchor" href="#短变量声明语句的作用域"><span>短变量声明语句的作用域</span></a></h3><p>下面的程序，它的目的是获取当前的工作目录然后保存到一个包级的变量中。这本来可以通过直接调用os.Getwd完成，但是将这个从主逻辑中分离出来可能会更好，特别是在需要处理错误的时候。函数log.Fatalf用于打印日志信息，然后调用os.Exit(1)终止程序。</p><pre><code class="language-Go">var cwd string

func init() {
    cwd, err := os.Getwd() // compile error: unused: cwd
    if err != nil {
        log.Fatalf(&quot;os.Getwd failed: %v&quot;, err)
    }
}
</code></pre><figure><img src="`+f+`" alt="image-20240328161105801" tabindex="0" loading="lazy"><figcaption>image-20240328161105801</figcaption></figure><p>虽然cwd在外部已经声明过，但是 <code>:=</code>语句还是将cwd和err重新声明为新的局部变量。因为内部声明的cwd将屏蔽外部的声明，因此上面的代码并不会正确更新包级声明的cwd变量。</p><p>由于当前的编译器会检测到局部声明的cwd并没有使用，然后报告这可能是一个错误，但是这种检测并不可靠。因为一些小的代码变更，例如增加一个局部cwd的打印语句，就可能导致这种检测失效。</p><pre><code class="language-Go">var cwd string

func init() {
    cwd, err := os.Getwd()
    if err != nil {
        log.Fatalf(&quot;os.Getwd failed: %v&quot;, err)
    }
    log.Printf(&quot;Working directory = %s&quot;, cwd)
}
</code></pre><figure><img src="`+m+`" alt="image-20240328161418959" tabindex="0" loading="lazy"><figcaption>image-20240328161418959</figcaption></figure><p>全局的cwd变量依然是没有被正确初始化的，而且看似正常的日志输出更是让这个BUG更加隐晦。</p><p>有许多方式可以避免出现类似潜在的问题。最直接的方法是通过单独声明err变量，来避免使用 <code>:=</code>的简短声明方式：</p><pre><code class="language-Go">var cwd string

func init() {
	var err error
	cwd, err = os.Getwd()
	if err != nil {
		log.Fatalf(&quot;os.Getwd failed: %v&quot;, err)
	}
}
func main() {
	log.Printf(&quot;Working directory = %s&quot;, cwd)
}

</code></pre><figure><img src="`+h+'" alt="image-20240328161707443" tabindex="0" loading="lazy"><figcaption>image-20240328161707443</figcaption></figure><p>#TODO: c:\\为啥要小写</p><blockquote><p>使用Example_xxx的形式进行测试的时候发现，路径中的c:\\必须小写才能验证通过，但是写进一个正常的函数里，输出就是大写的C</p></blockquote><figure><img src="'+k+'" alt="1712474443260" tabindex="0" loading="lazy"><figcaption>1712474443260</figcaption></figure><p>下图为使用fmt.Printf和log.Printf的输出</p><figure><img src="'+q+'" alt="1712474628866" tabindex="0" loading="lazy"><figcaption>1712474628866</figcaption></figure>',281)]))}const F=e(v,[["render",C],["__file","ch2.html.vue"]]),_=JSON.parse('{"path":"/develop/Go/gopl/ch2.html","title":"02. 程序结构","lang":"zh-CN","frontmatter":{"category":"Go","tag":"Go","description":"02. 程序结构 2.1. 命名 关键字 Go语言中类似if和switch的关键字有25个；关键字不能用于自定义名字，只能在特定语法结构中使用。 此外，还有大约30多个预定义的名字，比如int和true等，主要对应内建的常量、类型和函数。 这些内部预先定义的名字并不是关键字，你可以在定义中重新使用它们。在一些特殊的场景中重新定义它们也是有意义的，但是也...","head":[["meta",{"property":"og:url","content":"https://echo0d.github.io/DailyNotes/develop/Go/gopl/ch2.html"}],["meta",{"property":"og:site_name","content":"echo0d-notes"}],["meta",{"property":"og:title","content":"02. 程序结构"}],["meta",{"property":"og:description","content":"02. 程序结构 2.1. 命名 关键字 Go语言中类似if和switch的关键字有25个；关键字不能用于自定义名字，只能在特定语法结构中使用。 此外，还有大约30多个预定义的名字，比如int和true等，主要对应内建的常量、类型和函数。 这些内部预先定义的名字并不是关键字，你可以在定义中重新使用它们。在一些特殊的场景中重新定义它们也是有意义的，但是也..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-10T05:36:24.000Z"}],["meta",{"property":"article:author","content":"echo0d"}],["meta",{"property":"article:tag","content":"Go"}],["meta",{"property":"article:modified_time","content":"2025-01-10T05:36:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"02. 程序结构\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-01-10T05:36:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"echo0d\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":2,"title":"2.1. 命名","slug":"_2-1-命名","link":"#_2-1-命名","children":[{"level":3,"title":"关键字","slug":"关键字","link":"#关键字","children":[]},{"level":3,"title":"命名规则","slug":"命名规则","link":"#命名规则","children":[]}]},{"level":2,"title":"2.2. 声明","slug":"_2-2-声明","link":"#_2-2-声明","children":[{"level":3,"title":"变量&常量声明","slug":"变量-常量声明","link":"#变量-常量声明","children":[]},{"level":3,"title":"函数声明","slug":"函数声明","link":"#函数声明","children":[]}]},{"level":2,"title":"2.3. 变量","slug":"_2-3-变量","link":"#_2-3-变量","children":[{"level":3,"title":"var声明语句","slug":"var声明语句","link":"#var声明语句","children":[]},{"level":3,"title":"零值","slug":"零值","link":"#零值","children":[]},{"level":3,"title":"2.3.1. 简短变量声明","slug":"_2-3-1-简短变量声明","link":"#_2-3-1-简短变量声明","children":[]},{"level":3,"title":"2.3.2. 指针","slug":"_2-3-2-指针","link":"#_2-3-2-指针","children":[]},{"level":3,"title":"2.3.3. new函数","slug":"_2-3-3-new函数","link":"#_2-3-3-new函数","children":[]},{"level":3,"title":"2.3.4. 变量的生命周期","slug":"_2-3-4-变量的生命周期","link":"#_2-3-4-变量的生命周期","children":[]}]},{"level":2,"title":"2.4. 赋值","slug":"_2-4-赋值","link":"#_2-4-赋值","children":[{"level":3,"title":"2.4.1. 元组赋值","slug":"_2-4-1-元组赋值","link":"#_2-4-1-元组赋值","children":[]},{"level":3,"title":"2.4.2. 可赋值性","slug":"_2-4-2-可赋值性","link":"#_2-4-2-可赋值性","children":[]}]},{"level":2,"title":"2.5. 类型","slug":"_2-5-类型","link":"#_2-5-类型","children":[]},{"level":2,"title":"2.6. 包和文件","slug":"_2-6-包和文件","link":"#_2-6-包和文件","children":[{"level":3,"title":"练习 2.1","slug":"练习-2-1","link":"#练习-2-1","children":[]},{"level":3,"title":"2.6.1. 导入包","slug":"_2-6-1-导入包","link":"#_2-6-1-导入包","children":[]},{"level":3,"title":"练习 2.2","slug":"练习-2-2","link":"#练习-2-2","children":[]},{"level":3,"title":"2.6.2. 包的初始化","slug":"_2-6-2-包的初始化","link":"#_2-6-2-包的初始化","children":[]},{"level":3,"title":"练习 2.3","slug":"练习-2-3","link":"#练习-2-3","children":[]},{"level":3,"title":"练习 2.4","slug":"练习-2-4","link":"#练习-2-4","children":[]},{"level":3,"title":"练习 2.5","slug":"练习-2-5","link":"#练习-2-5","children":[]}]},{"level":2,"title":"2.7. 作用域","slug":"_2-7-作用域","link":"#_2-7-作用域","children":[{"level":3,"title":"词法域","slug":"词法域","link":"#词法域","children":[]},{"level":3,"title":"for循环词法域","slug":"for循环词法域","link":"#for循环词法域","children":[]},{"level":3,"title":"if和switch词法域","slug":"if和switch词法域","link":"#if和switch词法域","children":[]},{"level":3,"title":"声明顺序","slug":"声明顺序","link":"#声明顺序","children":[]},{"level":3,"title":"短变量声明语句的作用域","slug":"短变量声明语句的作用域","link":"#短变量声明语句的作用域","children":[]}]}],"git":{"createdTime":1722415943000,"updatedTime":1736487384000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":2}]},"readingTime":{"minutes":43.35,"words":13004},"filePathRelative":"develop/Go/gopl/ch2.md","localizedDate":"2024年7月31日","excerpt":"\\n<h2>2.1. 命名</h2>\\n<h3>关键字</h3>\\n<p>Go语言中类似if和switch的关键字有25个；关键字不能用于自定义名字，只能在特定语法结构中使用。</p>\\n<pre><code>break      default       func     interface   select\\ncase       defer         go       map         struct\\nchan       else          goto     package     switch\\nconst      fallthrough   if       range       type\\ncontinue   for           import   return      var\\n</code></pre>","autoDesc":true}');export{F as comp,_ as data};
