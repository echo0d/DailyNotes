import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as n,e as a}from"./app-JMTxgcCT.js";const d="/DailyNotes/assets/image-20240320220720825-g-gFw9qm.png",l={},s=a(`<h1 id="_2-程序结构" tabindex="-1"><a class="header-anchor" href="#_2-程序结构" aria-hidden="true">#</a> 2. 程序结构</h1><h2 id="_2-1-命名" tabindex="-1"><a class="header-anchor" href="#_2-1-命名" aria-hidden="true">#</a> 2.1. 命名</h2><h3 id="关键字" tabindex="-1"><a class="header-anchor" href="#关键字" aria-hidden="true">#</a> 关键字</h3><p>Go语言中类似if和switch的关键字有25个；关键字不能用于自定义名字，只能在特定语法结构中使用。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>break      default       func     interface   select
case       defer         go       map         struct
chan       else          goto     package     switch
const      fallthrough   if       range       type
continue   for           import   return      var
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，还有大约30多个预定义的名字，比如int和true等，主要对应内建的常量、类型和函数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>内建常量: true false iota nil

内建类型: int int8 int16 int32 int64
          uint uint8 uint16 uint32 uint64 uintptr
          float32 float64 complex128 complex64
          bool byte rune string error

内建函数: make len cap new append copy close delete
          complex real imag
          panic recover
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些内部预先定义的名字并不是关键字，你可以在定义中重新使用它们。在一些特殊的场景中重新定义它们也是有意义的，但是也要注意避免过度而引起语义混乱。</p><h3 id="命名规则" tabindex="-1"><a class="header-anchor" href="#命名规则" aria-hidden="true">#</a> 命名规则</h3><p>Go语言中的函数名、变量名、常量名、类型名、语句标号和包名等所有的命名，都遵循如下命名规则：</p><ul><li><p>一个名字必须以一个字母（Unicode字母）或下划线开头，后面可以跟任意数量的字母、数字或下划线。</p></li><li><p>大写字母和小写字母是不同的：heapSort和Heapsort是两个不同的名字。</p></li><li><p>如果一个名字是在函数内部定义，那么它就只在函数内部有效。如果是在函数外部定义，那么将在当前包的所有文件中都可以访问。</p></li><li><p>名字的开头字母的大小写决定了名字在包外的可见性。如果一个名字是大写字母开头的，那么它将是导出的，也就是说可以被外部的包访问，例如fmt包的Printf函数就是导出的，可以在fmt包外部访问。</p></li><li><p>包本身的名字一般总是用小写字母。</p></li><li><p>名字的长度没有逻辑限制，但是Go语言的风格是尽量使用短小的名字，对于局部变量尤其是这样；你会经常看到i之类的短名字，而不是冗长的theLoopIndex命名。通常来说，如果一个名字的作用域比较大，生命周期也比较长，那么用长的名字将会更有意义。</p></li><li><p>在习惯上，Go语言程序员推荐使用 <strong>驼峰式</strong> 命名，当名字由几个单词组成时优先使用大小写分隔，而不是优先用下划线分隔。</p></li><li><p>像ASCII和HTML这样的缩略词则避免使用大小写混合的写法，它们可能被称为htmlEscape、HTMLEscape或escapeHTML，但不会是escapeHtml。</p></li></ul><h2 id="_2-2-声明" tabindex="-1"><a class="header-anchor" href="#_2-2-声明" aria-hidden="true">#</a> 2.2. 声明</h2><p>声明语句定义了程序的各种实体对象以及部分或全部的属性。Go语言主要有四种类型的声明语句：var、const、type和func，分别对应变量、常量、类型和函数实体对象的声明。</p><p>一个Go语言编写的程序对应一个或多个以.go为文件后缀名的源文件。</p><ul><li>每个源文件中以包的声明语句开始，说明该源文件是属于哪个包</li><li>包声明语句之后是import语句导入依赖的其它包</li><li>然后是包一级的类型、变量、常量、函数的声明语句，包一级的各种类型的声明语句的顺序无关紧要（译注：函数内部的名字则必须先声明之后才能使用）。</li></ul><h3 id="变量-常量声明" tabindex="-1"><a class="header-anchor" href="#变量-常量声明" aria-hidden="true">#</a> 变量&amp;常量声明</h3><p>例如，下面的例子中声明了一个常量、一个函数和两个变量：</p><p><em>gopl.io/ch2/boiling</em></p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>// Boiling prints the boiling point of water.
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中常量boilingF是在包一级范围声明语句声明的，然后f和c两个变量是在main函数内部声明的声明语句声明的。在包一级声明语句声明的名字可在整个包对应的每个源文件中访问，而不是仅仅在其声明语句所在的源文件中访问。相比之下，局部声明的名字就只能在函数内部很小的范围被访问。</p><h3 id="函数声明" tabindex="-1"><a class="header-anchor" href="#函数声明" aria-hidden="true">#</a> 函数声明</h3><ul><li>一个函数的声明由一个函数名字、参数列表（由函数的调用者提供参数变量的具体值）、一个可选的返回值列表和包含函数定义的函数体组成。</li><li>如果函数没有返回值，那么返回值列表是省略的。</li><li>执行函数从函数的第一个语句开始，依次顺序执行直到遇到return返回语句，如果没有返回语句则是执行到函数末尾，然后返回到函数调用者。</li></ul><p>在这个例子中，main函数就调用了两次fToC函数，分别使用在局部定义的两个常量作为调用函数的参数。</p><p><em>gopl.io/ch2/ftoc</em></p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>// Ftoc prints two Fahrenheit-to-Celsius conversions.
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-3-变量" tabindex="-1"><a class="header-anchor" href="#_2-3-变量" aria-hidden="true">#</a> 2.3. 变量</h2><h3 id="var声明语句" tabindex="-1"><a class="header-anchor" href="#var声明语句" aria-hidden="true">#</a> var声明语句</h3><p>var声明语句可以创建一个特定类型的变量，然后给变量附加一个名字，并且设置变量的初始值。变量声明的一般语法如下：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>var 变量名字 类型 = 表达式
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中<code>类型</code>或<code>= 表达式</code>两个部分可以省略其中的一个。</p><ul><li>如果省略的是类型信息，那么将根据初始化表达式来推导变量的类型信息。</li><li>如果初始化表达式被省略，那么将用零值初始化该变量。</li></ul><h3 id="零值" tabindex="-1"><a class="header-anchor" href="#零值" aria-hidden="true">#</a> 零值</h3><p>数值类型变量对应的零值是0，布尔类型变量对应的零值是false，字符串类型对应的零值是空字符串，接口或引用类型（包括slice、指针、map、chan和函数）变量对应的零值是nil。数组或结构体等聚合类型对应的零值是每个元素或字段都是对应该类型的零值。</p><p>零值初始化机制可以确保每个声明的变量总是有一个良好定义的值，因此在Go语言中不存在未初始化的变量。这个特性可以简化很多代码，而且可以在没有增加额外工作的前提下确保边界条件下的合理行为。例如：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>var s string
fmt.Println(s) // &quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码将打印一个空字符串，而不是导致错误或产生不可预知的行为。Go语言程序员应该让一些聚合类型的零值也具有意义，这样可以保证不管任何类型的变量总是有一个合理有效的零值状态。</p><p>也可以在一个声明语句中同时声明一组变量，或用一组初始化表达式声明并初始化一组变量。如果省略每个变量的类型，将可以声明多个类型不同的变量（类型由初始化表达式推导）：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>var i, j, k int                 // int, int, int
var b, f, s = true, 2.3, &quot;four&quot; // bool, float64, string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化表达式可以是字面量或任意的表达式。</p><p>在包级别声明的变量会在main入口函数执行前完成初始化（§2.6.2），局部变量将在声明语句被执行到的时候完成初始化。</p><p>一组变量也可以通过调用一个函数，由函数返回的多个返回值初始化：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>var f, err = os.Open(name) // os.Open returns a file and an error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3-1-简短变量声明" tabindex="-1"><a class="header-anchor" href="#_2-3-1-简短变量声明" aria-hidden="true">#</a> 2.3.1. 简短变量声明</h3><p>在函数内部，有一种称为简短变量声明语句的形式可用于声明和初始化局部变量。它以<code>名字 := 表达式</code>形式声明变量，变量的类型根据表达式来自动推导。下面是lissajous函数中的三个简短变量声明语句（§1.4）：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>anim := gif.GIF{LoopCount: nframes}
freq := rand.Float64() * 3.0
t := 0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为简洁和灵活的特点，简短变量声明被广泛用于大部分的局部变量的声明和初始化。</p><p>var形式的声明语句往往是用于需要显式指定变量类型的地方，或者因为变量稍后会被重新赋值而初始值无关紧要的地方。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>i := 100                  // an int
var boiling float64 = 100 // a float64
var names []string
var err error
var p Point
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和var形式声明语句一样，简短变量声明语句也可以用来声明和初始化一组变量：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>i, j := 0, 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是这种同时声明多个变量的方式应该限制只在可以提高代码可读性的地方使用，比如for语句的循环的初始化语句部分。</p><blockquote><p>请记住<code>:=</code>是一个变量声明语句，而<code>=</code>是一个变量赋值操作。</p><p>也不要混淆多个变量的声明和元组的多重赋值（§2.4.1），后者是将右边各个表达式的值赋值给左边对应位置的各个变量：</p></blockquote><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>i, j = j, i // 交换 i 和 j 的值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>和普通var形式的变量声明语句一样，简短变量声明语句也可以用函数的返回值来声明和初始化变量，像下面的os.Open函数调用将返回两个值：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>f, err := os.Open(name)
if err != nil {
    return err
}
// ...use f...
f.Close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有一个比较微妙的地方：简短变量声明左边的变量可能并不是全部都是刚刚声明的。</p><blockquote><p>如果有一些已经在相同的词法域声明过了（§2.7），那么简短变量声明语句对这些已经声明过的变量就只有赋值行为了。</p></blockquote><p>在下面的代码中，第一个语句声明了in和err两个变量。在第二个语句只声明了out一个变量，然后对已经声明的err进行了赋值操作。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>in, err := os.Open(infile)
// ...
out, err := os.Create(outfile)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>简短变量声明语句中必须至少要声明一个新的变量</p></blockquote><p>下面的代码将不能编译通过：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>f, err := os.Open(infile)
// ...
f, err := os.Create(outfile) // compile error: no new variables
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决的方法是第二个简短变量声明语句改用普通的多重赋值语句。</p><blockquote><p>简短变量声明语句只有对已经在同级词法域声明过的变量才和赋值操作语句等价，如果变量是在外部词法域声明的，那么简短变量声明语句将会在当前词法域重新声明一个新的变量。</p></blockquote><h3 id="_2-3-2-指针" tabindex="-1"><a class="header-anchor" href="#_2-3-2-指针" aria-hidden="true">#</a> 2.3.2. 指针</h3><p>一个变量对应一个保存了变量对应类型值的内存空间。一个指针的值是另一个变量的地址，一个指针对应变量在内存中的存储位置。并不是每一个值都会有一个内存地址，但是对于每一个变量必然有对应的内存地址。通过指针，我们可以直接读或更新对应变量的值，而不需要知道该变量的名字（如果变量有名字的话）。</p><ul><li>如果用<code>var x int</code>声明语句声明一个x变量，那么<code>&amp;x</code>表达式（取x变量的内存地址）将产生一个指向该整数变量的指针，指针对应的数据类型是<code>*int</code>，指针被称之为“指向int类型的指针”。</li><li>如果指针名字为p，那么可以说“p指针指向变量x”，或者说“p指针保存了x变量的内存地址”。</li><li><code>*p</code>表达式对应p指针指向的变量的值。一般<code>*p</code>表达式读取指针指向的变量的值，这里为int类型</li><li>因为<code>*p</code>对应一个变量，所以该表达式也可以出现在赋值语句的左边，表示更新指针所指向的变量的值。</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>x := 1
p := &amp;x         // p, of type *int, points to x
fmt.Println(*p) // &quot;1&quot;
*p = 2          // equivalent to x = 2
fmt.Println(x)  // &quot;2&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于聚合类型每个成员（比如结构体的每个字段）、或者是数组的每个元素，都是<strong>对应一个变量，因此可以被取地址。</strong></p><p><strong>变量有时候被称为可寻址的值</strong>。即使变量由表达式临时生成，那么表达式也必须能接受<code>&amp;</code>取地址操作。</p><p>任何类型的指针的零值都是nil。如果p指向某个有效变量，那么<code>p != nil</code>测试为真。指针之间也是可以进行相等测试的，只有当它们指向同一个变量或全部是nil时才相等。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>var x, y int
fmt.Println(&amp;x == &amp;x, &amp;x == &amp;y, &amp;x == nil) // &quot;true false false&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在Go语言中，返回函数中局部变量的地址也是安全的。例如下面的代码，调用f函数时创建局部变量v，在局部变量地址被返回之后依然有效，因为指针p依然引用这个变量。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>var p = f()

func f() *int {
    v := 1
    return &amp;v
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每次调用f函数都将返回不同的结果：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>fmt.Println(f() == f()) // &quot;false&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+d+`" alt="image-20240320220720825" tabindex="0" loading="lazy"><figcaption>image-20240320220720825</figcaption></figure><p>因为指针包含了一个变量的地址，因此如果将指针作为参数调用函数，那将可以在函数中通过该指针来更新变量的值。例如下面</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func incr(p *int) int {
    *p++ // 非常重要：只是增加p指向的变量的值，并不改变p指针！！！
    return *p
}

v := 1
incr(&amp;v)              // side effect: v is now 2
fmt.Println(incr(&amp;v)) // &quot;3&quot; (and v is 3)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,79),r=[s];function o(c,v){return i(),n("div",null,r)}const p=e(l,[["render",o],["__file","ch2.html.vue"]]);export{p as default};
