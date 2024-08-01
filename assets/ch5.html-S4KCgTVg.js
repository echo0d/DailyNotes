import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as i,e}from"./app-Tto4u9UZ.js";const a="/DailyNotes/assets/1714383289597-b8d4cdf7-f5a3-49d2-8dd8-652490885b88-Odj_dT_N.png",t="/DailyNotes/assets/1714442560647-cbfe178e-6257-4d03-97d4-e029c6da023d-kwPEAa6C.png",l="/DailyNotes/assets/1714443651003-976fdbac-2e4a-43e8-8353-2d85c01a6952-xhpULx3O.png",d="/DailyNotes/assets/1714444173757-c513c000-88fe-4f7b-888a-17259191a862-L874tiBz.png",r="/DailyNotes/assets/1714459827460-45563e29-cc6b-4ab7-8dff-8a09f4922f4a-FeFmKpGf.png",u="/DailyNotes/assets/1714462376419-a66dbfc9-1ccf-4a46-bd1e-c4e321db2231-EbVkA2Hb.png",c="/DailyNotes/assets/1714468666342-34d43878-7ef2-48f5-8c13-e42a0fce67f7-ZGmzv4Wi.png",o={},v=e(`<h1 id="_05-函数" tabindex="-1"><a class="header-anchor" href="#_05-函数" aria-hidden="true">#</a> 05. 函数</h1><h2 id="_5-1-函数声明" tabindex="-1"><a class="header-anchor" href="#_5-1-函数声明" aria-hidden="true">#</a> 5.1. 函数声明</h2><p>函数声明包括函数名、形式参数列表、返回值列表（可省略）以及函数体。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> func name(parameter-list) (result-list) {
     body
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>形式参数列表描述了函数的参数名以及参数类型。这些参数作为局部变量，其值由参数调用者提供。</li><li>返回值列表描述了函数返回值的变量名以及类型。如果函数返回一个无名变量或者没有返回值，返回值列表的括号是可以省略的。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> func hypot(x, y float64) float64 {
     return math.Sqrt(x*x + y*y)
 }
 fmt.Println(hypot(3,4)) // &quot;5&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>x和y是形参名，3和4是调用时的传入的实参，函数返回了一个float64类型的值。</li><li>每一次函数调用都必须<strong>按照声明顺序</strong>为所有参数提供实参（参数值）</li><li>返回值也可以像形式参数一样被命名。在这种情况下，每个返回值被声明成一个局部变量，并根据该返回值的类型，将其初始化为该类型的零值。</li><li>如果一个函数在声明时，包含返回值列表，该函数必须以 return语句结尾，除非函数明显无法运行到结尾处。例如函数在结尾时调用了panic异常或函数中存在无限循环。</li></ul><p>如果一组形参或返回值有相同的类型，我们不必为每个形参都写出参数类型。下面2个声明是等价的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> func f(i, j, k int, s, t string)                 { /* ... */ }
 func f(i int, j int, k int,  s string, t string) { /* ... */ }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>实参通过值的方式传递，因此函数的形参是实参的拷贝。对形参进行修改不会影响实参。但是，如果实参包括引用类型，如指针，slice(切片)、map、function、channel等类型，实参可能会由于函数的间接引用被修改。 你可能会偶尔遇到没有函数体的函数声明，这表示该函数不是以Go实现的。这样的声明定义了函数签名。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> package math
 
 func Sin(x float64) float //implemented in assembly language
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-2-递归" tabindex="-1"><a class="header-anchor" href="#_5-2-递归" aria-hidden="true">#</a> 5.2. 递归</h2><p>函数可以是递归的，这意味着函数可以直接或间接的调用自身。 如下main函数解析HTML标准输入，通过递归函数visit获得links（链接），并打印出这些links；visit 函数是一个递归函数，它遍历 html.Node 的每个子节点，并将找到的每个链接添加到 links 切片中。它首先检查节点是否为 <code>&lt;a&gt;</code>，并提取其 href 属性值，将其添加到 links 切片中。然后，它递归地为当前节点的每个子节点调用自身。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> // Findlinks1 prints the links in an HTML document read from standard input.
 package main
 
 import (
     &quot;fmt&quot;
     &quot;os&quot;
 
     &quot;golang.org/x/net/html&quot;
 )
 
 func main() {
     doc, err := html.Parse(os.Stdin)
     if err != nil {
         fmt.Fprintf(os.Stderr, &quot;findlinks1: %v\\n&quot;, err)
         os.Exit(1)
     }
     for _, link := range visit(nil, doc) {
         fmt.Println(link)
     }
 }
 
 // visit appends to links each link found in n and returns the result.
 func visit(links []string, n *html.Node) []string {
     if n.Type == html.ElementNode &amp;&amp; n.Data == &quot;a&quot; {
         for _, a := range n.Attr {
             if a.Key == &quot;href&quot; {
                 links = append(links, a.Val)
             }
         }
     }
     for c := n.FirstChild; c != nil; c = c.NextSibling {
         links = visit(links, c)
     }
     return links
 }
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+a+`" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>在函数outline中，我们通过递归的方式遍历整个HTML结点树，并输出树的结构。当outline调用自身时，被调用者接收的是stack的拷贝。被调用者对stack的元素追加操作，这个过程并不会修改调用方的stack。因此当函数返回时，调用方的stack与其调用自身之前完全一致。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> package main
 
 import (
     &quot;fmt&quot;
     &quot;golang.org/x/net/html&quot;
     &quot;os&quot;
 )
 
 func main() {
     doc, err := html.Parse(os.Stdin)
     if err != nil {
         fmt.Fprintf(os.Stderr, &quot;outline: %v\\n&quot;, err)
         os.Exit(1)
     }
     outline(nil, doc)
 }
 
 // outline 通过递归的方式遍历整个HTML结点树，并输出树的结构。
 
 func outline(stack []string, n *html.Node) {
     if n.Type == html.ElementNode {
         stack = append(stack, n.Data) // push tag
         fmt.Println(stack)
     }
     for c := n.FirstChild; c != nil; c = c.NextSibling {
         outline(stack, c)
     }
 }
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+t+`" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>大部分编程语言使用固定大小的函数调用栈，常见的大小从64KB到2MB不等。固定大小栈会限制递归的深度，当你用递归处理大量数据时，需要避免栈溢出；除此之外，还会导致安全性问题。与此相反，Go语言使用可变栈，栈的大小按需增加（初始时很小）。这使得我们使用递归时不必考虑溢出和安全问题。</p><h3 id="练习-5" tabindex="-1"><a class="header-anchor" href="#练习-5" aria-hidden="true">#</a> 练习 5.</h3><p>修改findlinks代码中遍历n.FirstChild链表的部分，将循环调用visit，改成递归调用。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> package main
 
 import (
     &quot;fmt&quot;
     &quot;os&quot;
 
     &quot;golang.org/x/net/html&quot;
 )
 
 func main() {
     doc, err := html.Parse(os.Stdin)
     if err != nil {
         fmt.Fprintf(os.Stderr, &quot;findlinks1: %v\\n&quot;, err)
         os.Exit(1)
     }
     for _, link := range visit(nil, doc) {
         fmt.Println(link)
     }
 }
 
 func visit(links []string, n *html.Node) []string {
     if n.Type == html.ElementNode &amp;&amp; n.Data == &quot;a&quot; {
         for _, a := range n.Attr {
             if a.Key == &quot;href&quot; {
                 links = append(links, a.Val)
             }
         }
     }
     // 原本的for循环单独拿出来，改成一个递归函数
     return visitRecursion(links, n.FirstChild)
 
 }
 
 // visitRecursion 递归函数visitRecursion，用于遍历所有子节点
 func visitRecursion(links []string, c *html.Node) []string {
     if c == nil {
         return links
     }
     links = visit(links, c)
     c = c.NextSibling
     return visitRecursion(links, c)
 }
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+l+`" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="练习-5-2" tabindex="-1"><a class="header-anchor" href="#练习-5-2" aria-hidden="true">#</a> 练习 5.2</h3><p>编写函数，记录在HTML树中出现的同名元素的次数。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code> <span class="token keyword">package</span> main
 
 <span class="token keyword">import</span> <span class="token punctuation">(</span>
     <span class="token string">&quot;fmt&quot;</span>
     <span class="token string">&quot;golang.org/x/net/html&quot;</span>
     <span class="token string">&quot;os&quot;</span>
 <span class="token punctuation">)</span>
 
 <span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     doc<span class="token punctuation">,</span> err <span class="token operator">:=</span> html<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdin<span class="token punctuation">)</span>
     <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
         fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stderr<span class="token punctuation">,</span> <span class="token string">&quot;outline: %v\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
         os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
     <span class="token punctuation">}</span>
     counts <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
     <span class="token function">count</span><span class="token punctuation">(</span>counts<span class="token punctuation">,</span> doc<span class="token punctuation">)</span>
     <span class="token keyword">for</span> tag<span class="token punctuation">,</span> count <span class="token operator">:=</span> <span class="token keyword">range</span> counts <span class="token punctuation">{</span>
         fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s\\t%d\\n&quot;</span><span class="token punctuation">,</span> tag<span class="token punctuation">,</span> count<span class="token punctuation">)</span>
     <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
 
 <span class="token comment">// outline 通过递归的方式遍历整个HTML结点树，并输出树的结构。</span>
 <span class="token keyword">func</span> <span class="token function">count</span><span class="token punctuation">(</span>counts <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> n <span class="token operator">*</span>html<span class="token punctuation">.</span>Node<span class="token punctuation">)</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token punctuation">{</span>
     <span class="token keyword">if</span> n<span class="token punctuation">.</span>Type <span class="token operator">==</span> html<span class="token punctuation">.</span>ElementNode <span class="token punctuation">{</span>
         counts<span class="token punctuation">[</span>n<span class="token punctuation">.</span>Data<span class="token punctuation">]</span><span class="token operator">++</span>
     <span class="token punctuation">}</span>
     <span class="token keyword">for</span> c <span class="token operator">:=</span> n<span class="token punctuation">.</span>FirstChild<span class="token punctuation">;</span> c <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">;</span> c <span class="token operator">=</span> c<span class="token punctuation">.</span>NextSibling <span class="token punctuation">{</span>
         <span class="token function">count</span><span class="token punctuation">(</span>counts<span class="token punctuation">,</span> c<span class="token punctuation">)</span>
     <span class="token punctuation">}</span>
     <span class="token keyword">return</span> counts
 <span class="token punctuation">}</span>
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+d+`" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="练习-5-3" tabindex="-1"><a class="header-anchor" href="#练习-5-3" aria-hidden="true">#</a> 练习 5.3</h3><p>编写函数输出所有text结点的内容。注意不要访问<code>&lt;script&gt;</code>和<code>&lt;style&gt;</code>元素，因为这些元素对浏览者是不可见的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package main

import (
	&quot;fmt&quot;
	&quot;os&quot;

	&quot;golang.org/x/net/html&quot;
)

func main() {
	doc, err := html.Parse(os.Stdin)
	if err != nil {
		fmt.Fprintf(os.Stderr, &quot;findlinks1: %v\\n&quot;, err)
		os.Exit(1)
	}
	getTextContent(doc)
}

func getTextContent(n *html.Node) {
	if n.Type == html.ElementNode {
		if n.Data == &quot;script&quot; || n.Data == &quot;style&quot; {
			return
		}
	}
	if n.Type == html.TextNode {
		fmt.Println(n.Data)
	}
	for c := n.FirstChild; c != nil; c = c.NextSibling {
		getTextContent(c)
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="练习-5-4" tabindex="-1"><a class="header-anchor" href="#练习-5-4" aria-hidden="true">#</a> 练习 5.4</h3><p>扩展visit函数，使其能够处理其他类型的结点，如images、scripts和style sheets。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import (&quot;golang.org/x/net/html&quot;)

var linkMap = map[string]string{
	&quot;a&quot;:      &quot;href&quot;, // a标签href属性
	&quot;img&quot;:    &quot;src&quot;,  // img标签src属性
	&quot;script&quot;: &quot;src&quot;,  // script标签src属性
	&quot;link&quot;:   &quot;href&quot;, // link标签href属性
}

func main() {
	filePath := &quot;golang.org.html&quot;
	file, err := os.Open(filePath)
	if err != nil {
		// 处理打开文件时的错误
		fmt.Println(&quot;无法打开文件:&quot;, err)
		return
	}
	defer file.Close()

	doc, err := html.Parse(file)
	//doc, err := html.Parse(os.Stdin)
	if err != nil {
		fmt.Fprintf(os.Stderr, &quot;findlinks1: %v\\n&quot;, err)
		os.Exit(1)
	}
	for _, link := range visit(nil, doc) {
		fmt.Println(link)
	}
}

func visit(links []string, n *html.Node) []string {
	if n.Type == html.ElementNode &amp;&amp; linkMap[n.Data] != &quot;&quot; {
		for _, a := range n.Attr {
			if a.Key == linkMap[n.Data] {
				links = append(links, a.Val)
			}
		}
	}
	for c := n.FirstChild; c != nil; c = c.NextSibling {
		links = visit(links, c)
	}
	return links
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-3-多返回值" tabindex="-1"><a class="header-anchor" href="#_5-3-多返回值" aria-hidden="true">#</a> 5.3. 多返回值</h2><p>下面的程序是findlinks的改进版本。因此findlinks声明了2个返回值：链接列表和错误信息。有4处return语句，每一处return都返回了一组值。前三处return，将http和html包中的错误信息传递给findlinks的调用者。第一处return直接返回错误信息，其他两处通过fmt.Errorf（§7.8）输出详细的错误信息。如果findlinks成功结束，最后的return语句将一组解析获得的连接返回给用户。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package main

import (
	&quot;fmt&quot;
	&quot;golang.org/x/net/html&quot;
	&quot;net/http&quot;
	&quot;os&quot;
)

func main() {
	for _, url := range os.Args[1:] {
		links, err := findLinks(url)
		if err != nil {
			fmt.Fprintf(os.Stderr, &quot;findlinks2: %v\\n&quot;, err)
			continue
		}
		for _, link := range links {
			fmt.Println(link)
		}
	}
}

// findLinks performs an HTTP GET request for url, parses the
// response as HTML, and extracts and returns the links.
func findLinks(url string) ([]string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode != http.StatusOK {
		resp.Body.Close()
		return nil, fmt.Errorf(&quot;getting %s: %s&quot;, url, resp.Status)
	}
	doc, err := html.Parse(resp.Body)
	resp.Body.Close()
	if err != nil {
		return nil, fmt.Errorf(&quot;parsing %s as HTML: %v&quot;, url, err)
	}
	return visit(nil, doc), nil
}

func visit(links []string, n *html.Node) []string {
	if n.Type == html.ElementNode &amp;&amp; n.Data == &quot;a&quot; {
		for _, a := range n.Attr {
			if a.Key == &quot;href&quot; {
				links = append(links, a.Val)
			}
		}
	}
	for c := n.FirstChild; c != nil; c = c.NextSibling {
		links = visit(links, c)
	}
	return links
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>在findlinks中，我们必须确保resp.Body被关闭，释放网络资源。虽然Go的垃圾回收机制会回收不被使用的内存，但是这不包括操作系统层面的资源，比如打开的文件、网络连接。因此我们必须显式的释放这些资源。</p></blockquote><p>调用多返回值函数时，返回给调用者的是一组值，调用者必须显式的将这些值分配给变量:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>links, err := findLinks(url)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果某个值不被使用，可以将其分配给blank identifier:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>links, _ := findLinks(url) // errors ignored
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一个函数内部可以将另一个有多返回值的函数调用作为返回值(<code>return findLinks(url)</code>)：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func findLinksLog(url string) ([]string, error) {
    log.Printf(&quot;findLinks %s&quot;, url)
    return findLinks(url)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你调用接受多参数的函数时，可以将一个返回多参数的函数调用作为该函数的参数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>log.Println(findLinks(url))
links, err := findLinks(url)
log.Println(links, err)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果一个函数所有的返回值都有显式的变量名，那么该函数的return语句可以省略操作数。这称之为bare return。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// CountWordsAndImages does an HTTP GET request for the HTML
// document url and returns the number of words and images in it.
func CountWordsAndImages(url string) (words, images int, err error) {
    resp, err := http.Get(url)
    if err != nil {
        return
    }
    doc, err := html.Parse(resp.Body)
    resp.Body.Close()
    if err != nil {
        err = fmt.Errorf(&quot;parsing HTML: %s&quot;, err)
        return
    }
    words, images = countWordsAndImages(doc)
    return
}
func countWordsAndImages(n *html.Node) (words, images int) { /* ... */ }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照返回值列表的次序，返回所有的返回值，在上面的例子中，每一个return语句等价于：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>return words, images, err
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="练习-5-5" tabindex="-1"><a class="header-anchor" href="#练习-5-5" aria-hidden="true">#</a> 练习 5.5</h3><p>实现countWordsAndImages。（参考练习4.9如何分词）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package main

import (
	&quot;fmt&quot;
	&quot;golang.org/x/net/html&quot;
	&quot;net/http&quot;
	&quot;os&quot;
	&quot;strings&quot;
)

func main() {
	for _, url := range os.Args[1:] {
		words, images, err := CountWordsAndImages(url)
		if err != nil {
			fmt.Fprintf(os.Stderr, &quot;findlinks2: %v\\n&quot;, err)
			continue
		}
		fmt.Println(words)
		fmt.Println(images)
	}

}

// CountWordsAndImages 函数执行一个HTTP GET请求获取HTML文档的URL，并返回其中的单词和图片数量。
func CountWordsAndImages(url string) (words, images int, err error) {
	resp, err := http.Get(url)
	if err != nil {
		return
	}
	doc, err := html.Parse(resp.Body)
	resp.Body.Close()
	if err != nil {
		err = fmt.Errorf(&quot;parsing HTML: %s&quot;, err)
		return
	}
	words, images = countWordsAndImages(doc)
	return
}

// countWordsAndImages 函数递归遍历HTML的节点，统计words和images个数
func countWordsAndImages(n *html.Node) (words, images int) {
	if n.Type == html.TextNode {
		//scanner := bufio.NewScanner(strings.NewReader(n.Data))
		//scanner.Split(bufio.ScanWords)
		//for scanner.Scan() {
		//	words++
		//}
		words += len(strings.Fields(n.Data))
	}
	if n.Type == html.ElementNode &amp;&amp; n.Data == &quot;img&quot; {
		images++
	}
	for c := n.FirstChild; c != nil; c = c.NextSibling {
		ws, is := countWordsAndImages(c)
		words += ws
		images += is
	}
	return words, images
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+r+`" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="练习-5-6" tabindex="-1"><a class="header-anchor" href="#练习-5-6" aria-hidden="true">#</a> 练习 5.6</h3><p>修改 ch3/surface（3.2）中的corner函数，将返回值命名，并使用bare return。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 在函数头的返回值部分写好变量名，就可以在函数体里不写变量名，直接return
func corner(i, j int) (sx, sy float64) {
	// Find Point (x, y) at corner of cell(i, j)
	x := xyrange * (float64(i)/cells - 0.5)
	y := xyrange * (float64(j)/cells - 0.5)

	// compute surface height z
	z := f(x, y)

	// project (x,y,z) isometrically onto 2-D SVG canvas (sx, sy)
	sx = width/2 + (x-y)*cos30*xyscale
	sy = height/2 + (x+y)*sin30*xyscale - z*zscale
	return
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-4-错误" tabindex="-1"><a class="header-anchor" href="#_5-4-错误" aria-hidden="true">#</a> 5.4. 错误</h2><p>在Go中有一部分函数总是能成功的运行。比如strings.Contains和strconv.FormatBool函数，对各种可能的输入都做了良好的处理，使得运行时几乎不会失败； 还有一部分函数只要输入的参数满足一定条件，也能保证运行成功。比如time.Date函数，该函数将年月日等参数构造成time.Time对象，除非最后一个参数（时区）是nil。这种情况下会引发panic异常。panic是来自被调用函数的信号，表示发生了某个已知的bug。一个良好的程序永远不应该发生panic异常。</p><h3 id="go的error" tabindex="-1"><a class="header-anchor" href="#go的error" aria-hidden="true">#</a> GO的error</h3><p>在Go的错误处理中，错误是软件包API和应用程序用户界面的一个重要组成部分，程序运行失败被认为是几个预期的结果之一。对于那些将运行失败看作是预期结果的函数，它们会返回一个额外的返回值（通常是最后一个）来传递错误信息。</p><ul><li>如果导致失败的原因只有一个，额外的返回值可以是一个布尔值，通常被命名为ok。比如，cache.Lookup失败的唯一原因是key不存在，那么代码可以按照下面的方式组织：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>value, ok := cache.Lookup(key)
if !ok {
    // ...cache[key] does not exist…
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>导致失败的原因不止一种，额外的返回值不再是简单的布尔类型，而是error类型。</li><li>内置的error是接口类型。error类型可能是nil或者non-nil。nil意味着函数运行成功，non-nil表示失败。对于non-nil的error类型，我们可以通过调用error的Error函数或者输出函数获得字符串类型的错误信息。</li><li>在Go中，函数运行失败时会返回错误信息，这些错误信息被认为是一种预期的值而非异常（exception），这使得Go有别于那些将函数运行失败看作是异常的语言。</li></ul><h3 id="_5-4-1-错误处理策略" tabindex="-1"><a class="header-anchor" href="#_5-4-1-错误处理策略" aria-hidden="true">#</a> 5.4.1. 错误处理策略</h3><p>错误处理的常用的五种方式：</p><p>传播错误：函数中某个子程序的失败，会变成该函数的失败。</p><p>如果findLinks对http.Get的调用失败，findLinks会直接将这个HTTP错误返回给调用者：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>resp, err := http.Get(url)
if err != nil{
    return nil, err
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当对html.Parse的调用失败时，findLinks不会直接返回html.Parse的错误，因为缺少html parser、发生错误的url。因此findLinks构造了一个新的错误信息，既包含了这两项，也包括了底层的解析出错的信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>doc, err := html.Parse(resp.Body)
resp.Body.Close()
if err != nil {
    return nil, fmt.Errorf(&quot;parsing %s as HTML: %v&quot;, url,err)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>fmt.Errorf</code>函数使用<code>fmt.Sprintf</code>格式化错误信息并返回。我们使用该函数添加额外的前缀上下文信息到原始错误信息。（由于错误信息经常是以链式组合在一起的，所以错误信息中应避免大写和换行符。最终的错误信息可能很长，可以通过类似grep的工具处理错误信息）</p><p>重新尝试失败：如果错误的发生是偶然性的，或由不可预知的问题导致的。可以重新尝试失败的操作。</p><p>在重试时，我们需要限制重试的时间间隔或重试的次数，防止无限制的重试。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func WaitForServer(url string) error {
    const timeout = 1 * time.Minute
    deadline := time.Now().Add(timeout)
    for tries := 0; time.Now().Before(deadline); tries++ {
        _, err := http.Head(url)
        if err == nil {
            return nil // success
        }
        log.Printf(&quot;server not responding (%s);retrying…&quot;, err)
        time.Sleep(time.Second &lt;&lt; uint(tries)) // exponential back-off
    }
    return fmt.Errorf(&quot;server %s failed to respond after %s&quot;, url, timeout)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+u+`" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>输出错误信息并结束程序</p><p>需要注意的是，这种策略只应在main中执行。对库函数而言，应仅向上传播错误，除非该错误意味着程序内部包含不一致性，即遇到了bug，才能在库函数中结束程序。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// (In function main.)
if err := WaitForServer(url); err != nil {
    fmt.Fprintf(os.Stderr, &quot;Site is down: %v\\n&quot;, err)
    os.Exit(1)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用log.Fatalf可以更简洁的代码达到与上文相同的效果。log中的所有函数，都默认会在错误信息之前输出时间信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if err := WaitForServer(url); err != nil {
    log.Fatalf(&quot;Site is down: %v\\n&quot;, err)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以设置log的前缀信息屏蔽时间信息，一般而言，前缀信息会被设置成命令名。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>log.SetPrefix(&quot;wait: &quot;)
log.SetFlags(0)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>只输出错误信息不中断程序</li></ol><p>我们可以通过log包提供函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if err := Ping(); err != nil {
    log.Printf(&quot;ping failed: %v; networking disabled&quot;,err)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者标准错误流输出错误信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if err := Ping(); err != nil {
    fmt.Fprintf(os.Stderr, &quot;ping failed: %v; networking disabled\\n&quot;, err)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>log包中的所有函数会为没有换行符的字符串增加换行符。</p><p>直接忽略掉错误</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dir, err := ioutil.TempDir(&quot;&quot;, &quot;scratch&quot;)
if err != nil {
    return fmt.Errorf(&quot;failed to create temp dir: %v&quot;,err)
}
// ...use temp dir…
os.RemoveAll(dir) // ignore errors; $TMPDIR is cleaned periodically
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管<code>os.RemoveAll</code>会失败，但上面的例子并没有做错误处理。这是因为操作系统会定期的清理临时目录。</p><blockquote><p>我们通常将处理失败的逻辑代码放在处理成功的代码之前。首先是一系列的初始检查，防止错误发生，之后是函数的实际逻辑。</p></blockquote><h3 id="_5-4-2-文件结尾错误-eof" tabindex="-1"><a class="header-anchor" href="#_5-4-2-文件结尾错误-eof" aria-hidden="true">#</a> 5.4.2. 文件结尾错误（EOF）</h3><p>例子：从文件中读取n个字节。如果n等于文件的长度，读取过程的任何错误都表示失败。如果n小于文件的长度，调用者会重复的读取固定大小的数据直到文件结束。这会导致调用者必须分别处理由文件结束引起的各种错误。基于这样的原因，io包保证任何由文件结束引起的读取失败都返回同一个错误——io.EOF，该错误在io包中定义：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io

import &quot;errors&quot;

// EOF is the error returned by Read when no more input is available.
var EOF = errors.New(&quot;EOF&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用者只需通过简单的比较，就可以检测出这个错误。下面的例子展示了如何从标准输入中读取字符，以及判断文件结束。（4.3的chartcount程序展示了更加复杂的代码）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>in := bufio.NewReader(os.Stdin)
for {
    r, _, err := in.ReadRune()
    if err == io.EOF {
        break // finished reading
    }
    if err != nil {
        return fmt.Errorf(&quot;read failed:%v&quot;, err)
    }
    // ...use r…
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为文件结束这种错误不需要更多的描述，所以io.EOF有固定的错误信息——“EOF”。对于其他错误，我们可能需要在错误信息中描述错误的类型和数量，这使得我们不能像io.EOF一样采用固定的错误信息。</p><h2 id="_5-5-函数值" tabindex="-1"><a class="header-anchor" href="#_5-5-函数值" aria-hidden="true">#</a> 5.5. 函数值</h2><p>函数像其他值一样，拥有类型，可以被赋值给其他变量，传递给函数，从函数返回。对函数值（function value）的调用类似函数调用。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    func square(n int) int { return n * n }
    func negative(n int) int { return -n }
    func product(m, n int) int { return m * n }

    f := square
    fmt.Println(f(3)) // &quot;9&quot;

    f = negative
    fmt.Println(f(3))     // &quot;-3&quot;
    fmt.Printf(&quot;%T\\n&quot;, f) // &quot;func(int) int&quot;

    f = product // compile error: can&#39;t assign func(int, int) int to func(int) int
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数类型的零值是nil。调用值为nil的函数值会引起panic错误：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var f func(int) int
f(3) // 此处f的值为nil, 会引起panic错误
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>函数值可以与nil比较：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var f func(int) int
if f != nil {
    f(3)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是函数值之间是不可比较的，也不能用函数值作为map的key。 函数值使得我们不仅仅可以通过数据来参数化函数，亦可通过行为。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    func add1(r rune) rune { return r + 1 }

    fmt.Println(strings.Map(add1, &quot;HAL-9000&quot;)) // &quot;IBM.:111&quot;
    fmt.Println(strings.Map(add1, &quot;VMS&quot;))      // &quot;WNT&quot;
    fmt.Println(strings.Map(add1, &quot;Admix&quot;))    // &quot;Benjy&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.2节的findLinks函数使用了辅助函数visit，遍历和操作了HTML页面的所有结点。使用函数值，我们可以将遍历结点的逻辑和操作结点的逻辑分离，使得我们可以复用遍历的逻辑，从而对结点进行不同的操作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> package main
 
 import (
     &quot;fmt&quot;
     &quot;golang.org/x/net/html&quot;
     &quot;os&quot;
 )
 
 func main() {
     doc, err := html.Parse(os.Stdin)
     if err != nil {
         fmt.Fprintf(os.Stderr, &quot;outline: %v\\n&quot;, err)
         os.Exit(1)
     }
     forEachNode(doc, startElement, endElement)
 
 }
 
 // forEachNode针对每个结点x，都会调用pre(x)和post(x)。
 // pre和post都是可选的。
 // 遍历孩子结点之前，pre被调用
 // 遍历孩子结点之后，post被调用
 func forEachNode(n *html.Node, pre, post func(n *html.Node)) {
     if pre != nil {
         pre(n)
     }
     for c := n.FirstChild; c != nil; c = c.NextSibling {
         forEachNode(c, pre, post)
     }
     if post != nil {
         post(n)
     }
 }
 
 var depth int
 
 func startElement(n *html.Node) {
     if n.Type == html.ElementNode {
         // 利用fmt.Printf控制输出的缩进。
         // 每次输出会先填充depth*2数量的空格，再输出&quot;&quot;，最后再输出HTML标签。
         fmt.Printf(&quot;%*s&lt;%s&gt;\\n&quot;, depth*2, &quot;&quot;, n.Data)
         depth++
     }
 }
 func endElement(n *html.Node) {
     if n.Type == html.ElementNode {
         depth--
         fmt.Printf(&quot;%*s&lt;/%s&gt;\\n&quot;, depth*2, &quot;&quot;, n.Data)
     }
 }
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数接收2个函数作为参数，分别在结点的孩子被访问前和访问后调用。这样的设计给调用者更大的灵活性。</p><figure><img src="`+c+`" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="练习-5-7" tabindex="-1"><a class="header-anchor" href="#练习-5-7" aria-hidden="true">#</a> 练习 5.7</h3><p>完善startElement和endElement函数，使其成为通用的HTML输出器。要求：输出注释结点，文本结点以及每个元素的属性（<code>&lt; a href=...&gt;</code>）。使用简略格式输出没有孩子结点的元素（即用<code>&lt;img/&gt;</code>代替<code>&lt;img&gt;&lt;/img&gt;</code>）。编写测试，验证程序输出的格式正确。（详见11章）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> package main
 
 import (
     &quot;fmt&quot;
     &quot;golang.org/x/net/html&quot;
     &quot;net/http&quot;
     &quot;os&quot;
     &quot;regexp&quot;
 )
 
 func main() {
     for _, url := range os.Args[1:] {
         doc, err := getDoc(url)
         if err != nil {
             fmt.Fprintf(os.Stderr, &quot;err: %v\\n&quot;, err)
             os.Exit(1)
         }
         forEachNode(doc, startElement, endElement)
     }
 }
 func getDoc(url string) (*html.Node, error) {
     resp, err := http.Get(url)
     if err != nil {
         return nil, err
     }
     doc, err := html.Parse(resp.Body)
     resp.Body.Close()
     if err != nil {
         return nil, fmt.Errorf(&quot;parsing HTML: %s&quot;, err)
     }
     return doc, nil
 }
 
 // forEachNode针对每个结点x，都会调用pre(x)和post(x)。
 // pre和post都是可选的。
 // 遍历孩子结点之前，pre被调用
 // 遍历孩子结点之后，post被调用
 func forEachNode(n *html.Node, pre, post func(n *html.Node)) {
     if pre != nil {
         pre(n)
     }
     for c := n.FirstChild; c != nil; c = c.NextSibling {
         forEachNode(c, pre, post)
     }
     if post != nil {
         post(n)
     }
 }
 
 var depth int
 
 func startElement(n *html.Node) {
     if n.Type == html.ElementNode {
         attrs := &quot;&quot;
         for _, a := range n.Attr {
             attrs += fmt.Sprintf(&quot;%s=\\&quot;%s\\&quot; &quot;, a.Key, a.Val)
         }
         if n.FirstChild == nil {
             fmt.Printf(&quot;%*s&lt;%s %s\\\\&gt;\\n&quot;, depth*2, &quot;&quot;, n.Data, attrs)
         } else {
             fmt.Printf(&quot;%*s&lt;%s %s&gt;\\n&quot;, depth*2, &quot;&quot;, n.Data, attrs)
         }
         depth++
     }
     // html.CommentNode 注释节点
     if n.Type == html.CommentNode {
         fmt.Printf(&quot;%*s//%s\\n&quot;, depth*2, &quot;&quot;, n.Data)
     }
     // html.TextNode文本节点
     if n.Type == html.TextNode {
         // 删除字符串中空白字符
         nData := regexp.MustCompile(\`[\\n\\s]+\`).ReplaceAllString(n.Data, &quot;&quot;)
         if nData != &quot;&quot; {
             fmt.Printf(&quot;%*s%s\\n&quot;, depth*2, &quot;&quot;, nData)
         }
     }
 }
 
 func endElement(n *html.Node) {
     if n.Type == html.ElementNode {
         depth--
         if n.FirstChild != nil {
             fmt.Printf(&quot;%*s&lt;/%s&gt;\\n&quot;, depth*2, &quot;&quot;, n.Data)
         }
     }
 }
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="练习-5-8" tabindex="-1"><a class="header-anchor" href="#练习-5-8" aria-hidden="true">#</a> 练习 5.8</h3><p>修改pre和post函数，使其返回布尔类型的返回值。返回false时，中止forEachNoded的遍历。使用修改后的代码编写ElementByID函数，根据用户输入的id查找第一个拥有该id元素的HTML元素，查找成功后，停止遍历。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> package main
 
 import (
     &quot;fmt&quot;
     &quot;net/http&quot;
     &quot;os&quot;
 
     &quot;golang.org/x/net/html&quot;
 )
 
 func main() {
     url := os.Args[1]
     targetID := os.Args[2]
     if url == &quot;&quot; || targetID == &quot;&quot; {
         fmt.Fprintf(os.Stderr, &quot;need params url and targetId&quot;)
     }
     doc, err := getDoc(url)
     if err != nil {
         fmt.Fprintf(os.Stderr, &quot;err: %v\\n&quot;, err)
         os.Exit(1)
     }
     foundNode := elementByID(doc, targetID)
     fmt.Printf(&quot;foundNode: %s%s\\n&quot;, foundNode.Data, foundNode.Attr)
 }
 func getDoc(url string) (*html.Node, error) {
     resp, err := http.Get(url)
     if err != nil {
         return nil, err
     }
     doc, err := html.Parse(resp.Body)
     resp.Body.Close()
     if err != nil {
         return nil, fmt.Errorf(&quot;parsing HTML: %s&quot;, err)
     }
     return doc, nil
 }
 
 var foundNode *html.Node
 
 func elementByID(doc *html.Node, id string) *html.Node {
     forEachNode(doc, id, findID, nil)
     return foundNode
 }
 
 func forEachNode(n *html.Node, id string, pre, post func(n *html.Node, id string) bool) {
     if pre != nil {
         goOn := pre(n, id)
         if !goOn {
             return
         }
     }
     for c := n.FirstChild; c != nil; c = c.NextSibling {
         forEachNode(c, id, pre, post)
     }
     if post != nil {
         post(n, id)
     }
 }
 
 func findID(n *html.Node, id string) bool {
     if n.Type == html.ElementNode {
         for _, a := range n.Attr {
             if a.Key == &quot;id&quot; &amp;&amp; a.Val == id {
                 foundNode = n
                 return false
             }
         }
     }
     return true
 }
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="练习-5-9" tabindex="-1"><a class="header-anchor" href="#练习-5-9" aria-hidden="true">#</a> 练习 5.9</h3><p>编写函数expand，将s中的&quot;foo&quot;替换为f(&quot;foo&quot;)的返回值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> func expand(s string, f func(string) string) string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> input <span class="token operator">:=</span> <span class="token keyword">range</span> os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;expand: &quot;</span><span class="token punctuation">,</span> <span class="token function">expand</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> allAdd1<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">expand</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">,</span> f <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token comment">// strings.Replace() ，下面的n表示替换前n个，n&lt;0表示替换数量不限制</span>
	ret <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">&quot;foo&quot;</span><span class="token punctuation">,</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> ret
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">add1</span><span class="token punctuation">(</span>r <span class="token builtin">rune</span><span class="token punctuation">)</span> <span class="token builtin">rune</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> r <span class="token operator">+</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">allAdd1</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> strings<span class="token punctuation">.</span><span class="token function">Map</span><span class="token punctuation">(</span>add1<span class="token punctuation">,</span> s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-6-匿名函数" tabindex="-1"><a class="header-anchor" href="#_5-6-匿名函数" aria-hidden="true">#</a> 5.6. 匿名函数</h2><p>函数字面量允许我们在使用函数时，再定义它。通过这种技巧，我们可以改写之前对strings.Map的调用：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>strings<span class="token punctuation">.</span><span class="token function">Map</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>r <span class="token builtin">rune</span><span class="token punctuation">)</span> <span class="token builtin">rune</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> r <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;HAL-9000&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>更为重要的是，通过这种方式定义的函数可以访问完整的词法环境（lexical environment），这意味着在函数中定义的内部函数可以引用该函数的变量，如下例所示：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// squares返回一个匿名函数。</span>
<span class="token comment">// 该匿名函数每次被调用时都会返回下一个数的平方。</span>
<span class="token keyword">func</span> <span class="token function">squares</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> x <span class="token builtin">int</span>
    <span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
        x<span class="token operator">++</span>
        <span class="token keyword">return</span> x <span class="token operator">*</span> x
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    f <span class="token operator">:=</span> <span class="token function">squares</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// &quot;1&quot;</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// &quot;4&quot;</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// &quot;9&quot;</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// &quot;16&quot;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习5.10</strong></p><p>重写topoSort函数，用map代替切片并移除对key的排序代码。验证结果的正确性（结果不唯一）。</p><p><strong>练习5.11：</strong> 现在线性代数的老师把微积分设为了前置课程。完善topSort，使其能检测有向图中的环。</p><p><strong>练习5.12：</strong> ch5/outline2（5.5节）的startElement和endElement共用了全局变量depth，将它们修改为匿名函数，使其共享outline中的局部变量。</p><p><strong>练习5.13：</strong> 修改crawl，使其能保存发现的页面，必要时，可以创建目录来保存这些页面。只保存来自原始域名下的页面。假设初始页面在golang.org下，就不要保存vimeo.com下的页面。</p><p><strong>练习5.14：</strong> 使用breadthFirst遍历其他数据结构。比如，topoSort例子中的课程依赖关系（有向图）、个人计算机的文件层次结构（树）；你所在城市的公交或地铁线路（无向图）。</p><h3 id="_5-6-1-警告-捕获迭代变量" tabindex="-1"><a class="header-anchor" href="#_5-6-1-警告-捕获迭代变量" aria-hidden="true">#</a> 5.6.1. 警告：捕获迭代变量</h3><p>考虑这样一个问题：你被要求首先创建一些目录，再将目录删除。在下面的例子中我们用函数值来完成删除操作。下面的示例代码需要引入os包。为了使代码简单，我们忽略了所有的异常处理。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>var rmdirs []func()
for _, d := range tempDirs() {
    dir := d // NOTE: necessary!
    os.MkdirAll(dir, 0755) // creates parent directories too
    rmdirs = append(rmdirs, func() {
        os.RemoveAll(dir)
    })
}
// ...do some work…
for _, rmdir := range rmdirs {
    rmdir() // clean up
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可能会感到困惑，为什么要在循环体中用循环变量d赋值一个新的局部变量，而不是像下面的代码一样直接使用循环变量dir。需要注意，下面的代码是错误的。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> rmdirs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> dir <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token function">tempDirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    os<span class="token punctuation">.</span><span class="token function">MkdirAll</span><span class="token punctuation">(</span>dir<span class="token punctuation">,</span> <span class="token number">0755</span><span class="token punctuation">)</span>
    rmdirs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>rmdirs<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        os<span class="token punctuation">.</span><span class="token function">RemoveAll</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span> <span class="token comment">// NOTE: incorrect!</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题的原因在于循环变量的作用域。在上面的程序中，for循环语句引入了新的词法块，循环变量dir在这个词法块中被声明。在该循环中生成的所有函数值都共享相同的循环变量。需要注意，函数值中记录的是循环变量的内存地址，而不是循环变量某一时刻的值。以dir为例，后续的迭代会不断更新dir的值，当删除操作执行时，for循环已完成，dir中存储的值等于最后一次迭代的值。这意味着，每次对os.RemoveAll的调用删除的都是相同的目录。</p><h2 id="_5-7-可变参数" tabindex="-1"><a class="header-anchor" href="#_5-7-可变参数" aria-hidden="true">#</a> 5.7. 可变参数</h2><p>在声明可变参数函数时，需要在参数列表的最后一个参数类型之前加上省略符号“...”，这表示该函数会接收任意数量的该类型参数。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func sum(vals ...int) int {
    total := 0
    for _, val := range vals {
        total += val
    }
    return total
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sum函数返回任意个int型参数的和。在函数体中，vals被看作是类型为[] int的切片。sum可以接收任意数量的int型参数：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>fmt.Println(sum())           // &quot;0&quot;
fmt.Println(sum(3))          // &quot;3&quot;
fmt.Println(sum(1, 2, 3, 4)) // &quot;10&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，调用者隐式的创建一个数组，并将原始参数复制到数组中，再把数组的一个切片作为参数传给被调用函数。如果原始参数已经是切片类型，我们该如何传递给sum？只需在最后一个参数后加上省略符。下面的代码功能与上个例子中最后一条语句相同。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>values := []int{1, 2, 3, 4}
fmt.Println(sum(values...)) // &quot;10&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然在可变参数函数内部，...int 型参数的行为看起来很像切片类型，但实际上，可变参数函数和以切片作为参数的函数是不同的。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func f(...int) {}
func g([]int) {}
fmt.Printf(&quot;%T\\n&quot;, f) // &quot;func(...int)&quot;
fmt.Printf(&quot;%T\\n&quot;, g) // &quot;func([]int)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可变参数函数经常被用于格式化字符串。下面的errorf函数构造了一个以行号开头的，经过格式化的错误信息。函数名的后缀f是一种通用的命名规范，代表该可变参数函数可以接收Printf风格的格式化字符串。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func errorf(linenum int, format string, args ...interface{}) {
    fmt.Fprintf(os.Stderr, &quot;Line %d: &quot;, linenum)
    fmt.Fprintf(os.Stderr, format, args...)
    fmt.Fprintln(os.Stderr)
}
linenum, name := 12, &quot;count&quot;
errorf(linenum, &quot;undefined: %s&quot;, name) // &quot;Line 12: undefined: count&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>interface{}表示函数的最后一个参数可以接收任意类型，我们会在第7章详细介绍。</p><h3 id="练习5-15" tabindex="-1"><a class="header-anchor" href="#练习5-15" aria-hidden="true">#</a> 练习5.15</h3><p>编写类似sum的可变参数函数max和min。考虑不传参时，max和min该如何处理，再编写至少接收1个参数的版本。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	maxNum<span class="token punctuation">,</span> minNum<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> <span class="token function">MinMax</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>minNum<span class="token punctuation">,</span> maxNum<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">MinMax</span><span class="token punctuation">(</span>nums <span class="token operator">...</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>max <span class="token builtin">int</span><span class="token punctuation">,</span> min <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;err: 参数个数为0&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token comment">// 初始化最小值为最大整数</span>
	min <span class="token operator">=</span> math<span class="token punctuation">.</span>MaxInt
	<span class="token comment">// 遍历所有参数，求最大值和最小值</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> num <span class="token operator">:=</span> <span class="token keyword">range</span> nums <span class="token punctuation">{</span>
		<span class="token keyword">if</span> num <span class="token operator">&gt;</span> max <span class="token punctuation">{</span>
			max <span class="token operator">=</span> num
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> num <span class="token operator">&lt;</span> min <span class="token punctuation">{</span>
			min <span class="token operator">=</span> num
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> max<span class="token punctuation">,</span> min<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="练习5-16" tabindex="-1"><a class="header-anchor" href="#练习5-16" aria-hidden="true">#</a> 练习5.16</h3><p>编写多参数版本的strings.Join。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>
<span class="token keyword">func</span> <span class="token function">Join</span><span class="token punctuation">(</span>strs <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>strsJoin <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>strs<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;err: 参数个数为0&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> str <span class="token operator">:=</span> <span class="token keyword">range</span> strs <span class="token punctuation">{</span>
		strsJoin <span class="token operator">=</span> strsJoin <span class="token operator">+</span> str
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> strsJoin<span class="token punctuation">,</span> err
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="练习5-17" tabindex="-1"><a class="header-anchor" href="#练习5-17" aria-hidden="true">#</a> 练习5.17</h3><p>编写多参数版本的ElementsByTagName，函数接收一个HTML结点树以及任意数量的标签名，返回与这些标签名匹配的所有元素。下面给出了2个例子：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func ElementsByTagName(doc *html.Node, name...string) []*html.Node
images := ElementsByTagName(doc, &quot;img&quot;)
headings := ElementsByTagName(doc, &quot;h1&quot;, &quot;h2&quot;, &quot;h3&quot;, &quot;h4&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没写 感觉太麻烦</p><h2 id="_5-8-deferred函数" tabindex="-1"><a class="header-anchor" href="#_5-8-deferred函数" aria-hidden="true">#</a> 5.8. Deferred函数</h2><p>下面的例子获取HTML页面并输出页面的标题。title函数会检查服务器返回的Content-Type字段，如果发现页面不是HTML，将终止函数运行，返回错误。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>package main

import (
	&quot;fmt&quot;
	&quot;golang.org/x/net/html&quot;
	&quot;net/http&quot;
	&quot;strings&quot;
)

func main() {
	err := title(&quot;https://golang.org/doc/gopher/frontpage.png&quot;)
	if err != nil {
		fmt.Println(err)
	}

}

func title(url string) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	// Check Content-Type is HTML (e.g., &quot;text/html;charset=utf-8&quot;).
	ct := resp.Header.Get(&quot;Content-Type&quot;)
	if ct != &quot;text/html&quot; &amp;&amp; !strings.HasPrefix(ct, &quot;text/html;&quot;) {
		resp.Body.Close()
		return fmt.Errorf(&quot;%s has type %s, not text/html&quot;, url, ct)
	}
	doc, err := html.Parse(resp.Body)
	resp.Body.Close()
	if err != nil {
		return fmt.Errorf(&quot;parsing %s as HTML: %v&quot;, url, err)
	}
	visitNode := func(n *html.Node) {
		if n.Type == html.ElementNode &amp;&amp; n.Data == &quot;title&quot; &amp;&amp; n.FirstChild != nil {
			fmt.Println(n.FirstChild.Data)
		}
	}
	forEachNode(doc, visitNode, nil)
	return nil
}
func forEachNode(n *html.Node, pre, post func(n *html.Node)) {
	if pre != nil {
		pre(n)
	}
	for c := n.FirstChild; c != nil; c = c.NextSibling {
		forEachNode(c, pre, post)
	}
	if post != nil {
		post(n)
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面展示了运行效果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ go build gopl.io/ch5/title1
$ ./title1 http://gopl.io
The Go Programming Language
$ ./title1 https://golang.org/doc/effective_go.html
Effective Go - The Go Programming Language
$ ./title1 https://golang.org/doc/gopher/frontpage.png
title1: https://golang.org/doc/gopher/frontpage.png has type image/png, not text/html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>resp.Body.close</code>调用了多次，这是为了确保title在所有执行路径下（即使函数运行失败）都关闭了网络连接。随着函数变得复杂，需要处理的错误也变多，维护清理逻辑变得越来越困难。而Go语言独有的defer机制可以让事情变得简单。</p>`,166),p=[v];function m(b,g){return s(),i("div",null,p)}const h=n(o,[["render",m],["__file","ch5.html.vue"]]);export{h as default};
