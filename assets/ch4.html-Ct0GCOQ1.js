import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,b as s,a,d as t,e as c,r as u,o as l}from"./app-BDHo8HdU.js";const i="/DailyNotes/assets/image-20240422173219723-D7-1Y00V.png",k="/DailyNotes/assets/image-20240422175054597-Dq3C6kxr.png",r="/DailyNotes/assets/image-20240424220922040-B4ZTIfjn.png",d="/DailyNotes/assets/image-20240425175118604-1igeGMbZ.png",m="/DailyNotes/assets/image-20240426180246893-0jrVYcm-.png",g={},f={href:"https://pkg.go.dev/flag",target:"_blank",rel:"noopener noreferrer"};function b(h,n){const p=u("ExternalLinkIcon");return l(),e("div",null,[n[2]||(n[2]=s(`<h1 id="_04-go语言-复合数据类型" tabindex="-1"><a class="header-anchor" href="#_04-go语言-复合数据类型"><span>04. GO语言-复合数据类型</span></a></h1><ul><li>主要讨论四种类型——数组、slice、map和结构体</li><li>演示如何使用结构体来解码和编码到对应JSON格式的数据，并且通过结合使用模板来生成HTML页面。</li></ul><p>数组和结构体是聚合类型，它们的值由许多元素或成员字段的值组成。</p><p>数组是由同构的元素组成——每个数组元素都是完全相同的类型——结构体则是由异构的元素组成的。数组和结构体都是有固定内存大小的数据结构。相比之下，slice和map则是动态的数据结构，它们将根据需要动态增长。</p><h2 id="_4-1-数组" tabindex="-1"><a class="header-anchor" href="#_4-1-数组"><span>4.1. 数组</span></a></h2><ul><li>数组是一个由固定长度的特定类型元素组成的序列，一个数组可以由零个或多个元素组成。</li><li>数组的每个元素可以通过索引下标来访问，索引下标的范围是从0开始到数组长度减1的位置。</li><li>内置的len函数将返回数组中元素的个数。</li></ul><p>因为数组的长度是固定的，因此在Go语言中很少直接使用数组。和数组对应的类型是Slice（切片），它是可以增长和收缩的动态序列，slice功能也更灵活，但是要理解slice工作原理的话需要先理解数组。</p><h3 id="数组定义" tabindex="-1"><a class="header-anchor" href="#数组定义"><span>数组定义</span></a></h3><p>默认情况下，数组的每个元素都被初始化为元素类型对应的零值，对于数字类型来说就是0。</p><pre><code class="language-Go">var a [3]int             // array of 3 integers
fmt.Println(a[0])        // print the first element
fmt.Println(a[len(a)-1]) // print the last element, a[2]

// Print the indices and elements.
for i, v := range a {
    fmt.Printf(&quot;%d %d\\n&quot;, i, v)
}

// Print the elements only.
for _, v := range a {
    fmt.Printf(&quot;%d\\n&quot;, v)
}
</code></pre><p>我们也可以使用数组字面值语法用一组值来初始化数组：</p><pre><code class="language-Go">	var q [3]int = [3]int{1, 2, 3}
	var r [3]int = [3]int{1, 2}
	fmt.Println(q[1]) // &quot;2&quot;
	fmt.Println(r[2]) // &quot;0&quot;
</code></pre><p>如果在数组的长度位置出现的是“...”省略号，则表示数组的长度是根据初始化值的个数来计算。因此，上面q数组的定义可以简化为</p><pre><code class="language-Go">q := [...]int{1, 2, 3}
fmt.Printf(&quot;%T\\n&quot;, q) // &quot;[3]int&quot;
</code></pre><h3 id="数组长度" tabindex="-1"><a class="header-anchor" href="#数组长度"><span>数组长度</span></a></h3><p>数组的长度是数组类型的一个组成部分，因此[3]int和[4]int是两种不同的数组类型。数组的长度必须是常量表达式，因为数组的长度需要在编译阶段确定。</p><pre><code class="language-Go">q := [3]int{1, 2, 3}
q = [4]int{1, 2, 3, 4} // compile error: cannot assign [4]int to [3]int
</code></pre><h3 id="数组-键值对" tabindex="-1"><a class="header-anchor" href="#数组-键值对"><span>数组-键值对</span></a></h3><p>上面的形式是直接提供顺序初始化值序列，但是也可以指定一个索引和对应值列表的方式初始化，就像下面这样：</p><pre><code class="language-Go">type Currency int

const (
    USD Currency = iota // 美元
    EUR                 // 欧元
    GBP                 // 英镑
    RMB                 // 人民币
)

symbol := [...]string{USD: &quot;$&quot;, EUR: &quot;€&quot;, GBP: &quot;￡&quot;, RMB: &quot;￥&quot;}

fmt.Println(RMB, symbol[RMB]) // &quot;3 ￥&quot;
</code></pre><p>在这种形式的数组字面值形式中，初始化索引的顺序是无关紧要的，而且没用到的索引可以省略，和前面提到的规则一样，未指定初始值的元素将用零值初始化。例如，</p><pre><code class="language-Go">r := [...]int{99: -1}
// 定义了一个含有100个元素的数组r，最后一个元素被初始化为-1，其它元素都是用0初始化。
</code></pre><figure><img src="`+i+`" alt="image-20240422173219723" tabindex="0" loading="lazy"><figcaption>image-20240422173219723</figcaption></figure><h3 id="数组比较" tabindex="-1"><a class="header-anchor" href="#数组比较"><span>数组比较</span></a></h3><p>只有数组的数据类型完全相同，两个数组才能比较；可以直接通过==比较运算符来比较两个数组，只有当两个数组的所有元素都是相等的时候数组才是相等的。不相等比较运算符!=遵循同样的规则。</p><pre><code class="language-Go">a := [2]int{1, 2}
b := [...]int{1, 2}
c := [2]int{1, 3}
fmt.Println(a == b, a == c, b == c) // &quot;true false false&quot;
d := [3]int{1, 2}
fmt.Println(a == d) // compile error: cannot compare [2]int == [3]int
</code></pre><p>下面的例子用SHA256算法分别生成“x”和“X”两个信息的摘要：</p><pre><code class="language-Go">import &quot;crypto/sha256&quot;

func main() {
    c1 := sha256.Sum256([]byte(&quot;x&quot;))
    c2 := sha256.Sum256([]byte(&quot;X&quot;))
    // Printf函数的%x以十六进制 %t打印布尔型数据，%T用于显示一个值对应的数据类型。
    fmt.Printf(&quot;%x\\n%x\\n%t\\n%T\\n&quot;, c1, c2, c1 == c2, c1)
    // Output:
    // 2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881
    // 4b68ab3847feda7d6c62c1fbcbeebfa35eab7351ed5e78f4ddadea5df64b8015
    // false
    // [32]uint8
}
</code></pre><p>如果写成这样</p><pre><code class="language-go">fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v\\n%v\\n%v\\n%T\\n&quot;</span><span class="token punctuation">,</span> c1<span class="token punctuation">,</span> c2<span class="token punctuation">,</span> c1 <span class="token operator">==</span> c2<span class="token punctuation">,</span> c1<span class="token punctuation">)</span>
</code></pre><p>将会输出如下，所以能够看出，c1 c2本身是一个十进制数组。</p><figure><img src="`+k+`" alt="image-20240422175054597" tabindex="0" loading="lazy"><figcaption>image-20240422175054597</figcaption></figure><p>上面例子中，两个消息虽然只有一个字符的差异，但是生成的消息摘要则几乎有一半的bit位是不相同的。</p><h3 id="练习-4-1" tabindex="-1"><a class="header-anchor" href="#练习-4-1"><span>练习 4.1</span></a></h3><p>编写一个函数，计算两个SHA256哈希码中不同bit的数目。（参考2.6.2节的PopCount函数。)</p><pre><code class="language-go">
<span class="token comment">// NOTE: 练习 4.1： 编写一个函数，计算两个SHA256哈希码中不同bit的数目。</span>

<span class="token keyword">type</span> SHA256 <span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">]</span><span class="token builtin">byte</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	md1<span class="token punctuation">,</span> md2 <span class="token operator">:=</span> SHA256<span class="token punctuation">{</span><span class="token number">14</span><span class="token punctuation">:</span> <span class="token number">252</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">:</span> <span class="token number">8</span><span class="token punctuation">}</span><span class="token punctuation">,</span> SHA256<span class="token punctuation">{</span><span class="token number">31</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">}</span>
	<span class="token function">bitDiff</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>md1<span class="token punctuation">,</span> <span class="token operator">&amp;</span>md2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">bitDiff</span><span class="token punctuation">(</span>md1<span class="token punctuation">,</span> md2 <span class="token operator">*</span>SHA256<span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	diffCnt <span class="token operator">:=</span> <span class="token number">0</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;  sha1  \\t  sha2 &quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> md1 <span class="token punctuation">{</span>
		b1 <span class="token operator">:=</span> md1<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
		b2 <span class="token operator">:=</span> md2<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">8</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token comment">// NOTE: get last bit of a byte</span>
			lb1<span class="token punctuation">,</span> lb2 <span class="token operator">:=</span> <span class="token punctuation">(</span>b1<span class="token operator">&gt;&gt;</span>i<span class="token punctuation">)</span><span class="token operator">&amp;</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>b2<span class="token operator">&gt;&gt;</span>i<span class="token punctuation">)</span><span class="token operator">&amp;</span><span class="token number">1</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>lb1 <span class="token operator">^</span> lb2<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
				diffCnt<span class="token operator">++</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%08b\\t%08b\\n&quot;</span><span class="token punctuation">,</span> b1<span class="token punctuation">,</span> b2<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;bit diff count: %d\\n&quot;</span><span class="token punctuation">,</span> diffCnt<span class="token punctuation">)</span>
	<span class="token keyword">return</span> diffCnt
<span class="token punctuation">}</span>

</code></pre><h3 id="练习-4-2" tabindex="-1"><a class="header-anchor" href="#练习-4-2"><span>练习 4.2</span></a></h3>`,37)),a("p",null,[n[1]||(n[1]=t("编写一个程序，默认情况下打印标准输入的SHA256编码，并支持通过命令行flag定制，输出SHA384或SHA512哈希算法。flag包：",-1)),a("a",f,[n[0]||(n[0]=t("flag package - flag - Go Packages",-1)),c(p)])]),n[3]||(n[3]=s(`<pre><code class="language-go"><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;crypto/sha256&quot;</span>
	<span class="token string">&quot;crypto/sha512&quot;</span>
	<span class="token string">&quot;flag&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// NOTE: 练习 4.2： 编写一个程序，默认情况下打印标准输入的SHA256编码，并支持通过命令行flag定制，输出SHA384或SHA512哈希算法。</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> shaType <span class="token builtin">string</span>
	<span class="token comment">// 命令参数shaType，默认SHA256</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>shaType<span class="token punctuation">,</span> <span class="token string">&quot;shaType&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;SHA256&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;SHA256（default）or SHA384 or SHA512&quot;</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token keyword">range</span> flag<span class="token punctuation">.</span><span class="token function">Args</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		resultStr <span class="token operator">:=</span> <span class="token string">&quot;&quot;</span>
		<span class="token keyword">switch</span> shaType <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token string">&quot;SHA256&quot;</span><span class="token punctuation">:</span>
			c <span class="token operator">:=</span> sha256<span class="token punctuation">.</span><span class="token function">Sum256</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
			resultStr <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%x&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span>
		<span class="token keyword">case</span> <span class="token string">&quot;SHA384&quot;</span><span class="token punctuation">:</span>
			c <span class="token operator">:=</span> sha512<span class="token punctuation">.</span><span class="token function">Sum384</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
			resultStr <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%x&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span>
		<span class="token keyword">case</span> <span class="token string">&quot;SHA512&quot;</span><span class="token punctuation">:</span>
			c <span class="token operator">:=</span> sha512<span class="token punctuation">.</span><span class="token function">Sum512</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
			resultStr <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%x&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span>
		<span class="token keyword">default</span><span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hash Type %s 不支持，SHA256（default）or SHA384 or SHA512\\n&quot;</span><span class="token punctuation">,</span> shaType<span class="token punctuation">)</span>
			os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;str:%s\\tshaType:%s\\t sha:%s\\n&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">,</span> shaType<span class="token punctuation">,</span> resultStr<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><h2 id="_4-2-slice" tabindex="-1"><a class="header-anchor" href="#_4-2-slice"><span>4.2. Slice</span></a></h2><h4 id="slice结构" tabindex="-1"><a class="header-anchor" href="#slice结构"><span>Slice结构</span></a></h4><p>数组是一个由固定长度的特定类型元素组成的序列，而Slice（切片）代表变长的序列，序列中每个元素都有相同的类型。slice类型一般写作<code>[]T</code>，其中T代表slice中元素的类型。</p><p>一个slice由三个部分构成：指针、长度和容量。指针指向第一个slice元素对应的底层数组元素的地址；长度对应slice中元素的数目，长度不能超过容量；容量一般是从slice的开始位置到底层数据的结尾位置。内置的len和cap函数分别返回slice的长度和容量。</p><h4 id="切片操作" tabindex="-1"><a class="header-anchor" href="#切片操作"><span>切片操作</span></a></h4><p>数组这样定义</p><pre><code class="language-Go">months := [...]string{1: &quot;January&quot;, /* ... */, 12: &quot;December&quot;}
</code></pre><p>一月份是months[1]，十二月份是months[12]。这里声明数组时直接跳过第0个元素，第0个元素会被自动初始化为空字符串。</p><p>slice的切片操作<code>s[i:j]</code>，其中<code>0 ≤ i≤ j≤ cap(s)</code>，表示创建一个新的slice，引用s的从第i个元素开始到第j-1个元素的子序列。新的slice将只有j-i个元素。如果i位置的索引被省略的话将使用0代替，如果j位置的索引被省略的话将使用len(s)代替。例如</p><ul><li>months[1:13]切片操作将引用全部有效的月份，和months[1:]操作等价；</li><li>months[:]切片操作则是引用整个数组。</li></ul><pre><code class="language-go">Q2 <span class="token operator">:=</span> months<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">:</span><span class="token number">7</span><span class="token punctuation">]</span>
summer <span class="token operator">:=</span> months<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">:</span><span class="token number">9</span><span class="token punctuation">]</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>Q2<span class="token punctuation">)</span>     <span class="token comment">// [&quot;April&quot; &quot;May&quot; &quot;June&quot;]</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>summer<span class="token punctuation">)</span> <span class="token comment">// [&quot;June&quot; &quot;July&quot; &quot;August&quot;]</span>

<span class="token comment">// 两个slice都包含了六月份</span>
<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token keyword">range</span> summer <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> q <span class="token operator">:=</span> <span class="token keyword">range</span> Q2 <span class="token punctuation">{</span>
        <span class="token keyword">if</span> s <span class="token operator">==</span> q <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s appears in both\\n&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>字符串的切片操作和<code>[]byte</code>字节类型切片的切片操作是类似的，都写作<code>x[m:n]</code>，<code>x[m:n]</code>切片操作对于字符串则生成一个新字符串，如果x是<code>[]byte</code>的话则生成一个新的<code>[]byte</code>。</p><h4 id="slice异常" tabindex="-1"><a class="header-anchor" href="#slice异常"><span>slice异常</span></a></h4><p>如果切片操作超出cap(s)的上限将导致一个panic异常，但是超出len(s)则是意味着扩展了slice，因为新slice的长度会变大：</p><pre><code class="language-go">fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>summer<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">20</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// panic: out of range</span>

endlessSummer <span class="token operator">:=</span> summer<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token comment">// extend a slice (within capacity)</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>endlessSummer<span class="token punctuation">)</span>  <span class="token comment">// &quot;[June July August September October]&quot;</span>
</code></pre><h4 id="slice反转" tabindex="-1"><a class="header-anchor" href="#slice反转"><span>slice反转</span></a></h4><blockquote><p>slice值包含指向第一个slice元素的指针，因此向函数传递slice将允许在函数内部修改底层数组的元素。换句话说，复制一个slice只是对底层的数组创建了一个新的slice别名（§2.3.2）。</p></blockquote><p>下面的reverse函数在原内存空间将<code>[]int</code>类型的slice反转，而且它可以用于任意长度的slice。一种将slice元素循环向左旋转n个元素的方法是三次调用reverse反转函数如果是向右循环旋转，则将第三个函数调用移到第一个调用位置就可以了。）</p><pre><code class="language-go">
<span class="token comment">// reverse reverses a slice of ints in place.</span>
<span class="token keyword">func</span> <span class="token function">reverse</span><span class="token punctuation">(</span>s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> j<span class="token punctuation">;</span> i<span class="token punctuation">,</span> j <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> j<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		s<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> s<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> s<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 反转</span>
	a <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>
	<span class="token function">reverse</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">// &quot;[5 4 3 2 1 0]&quot;</span>
	<span class="token comment">// 将slice元素循环向左旋转n个元素</span>
	s <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>
	<span class="token comment">// Rotate s left by two positions.</span>
	<span class="token function">reverse</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token function">reverse</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token function">reverse</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token comment">// &quot;[2 3 4 5 0 1]&quot;</span>
<span class="token punctuation">}</span>

</code></pre><h4 id="slice和数组" tabindex="-1"><a class="header-anchor" href="#slice和数组"><span>slice和数组</span></a></h4><p>**初始化差异：**slice和数组的字面值语法很类似，它们都是用花括弧包含一系列的初始化元素，但是slice并没有指明序列的长度，这会隐式地创建一个合适大小的数组，然后slice的指针指向底层的数组。</p><p>**字面值初始化：**和数组字面值一样，slice的字面值也可以按顺序指定初始化值序列，或者是通过索引和元素值指定，或者用两种风格的混合语法初始化。</p><h4 id="slice比较" tabindex="-1"><a class="header-anchor" href="#slice比较"><span>slice比较</span></a></h4><p>**比较上的差异：**和数组不同的是，slice之间不能比较，不能使用==操作符来判断两个slice是否含有全部相等元素。标准库提供了<code>bytes.Equal</code>函数来判断两个<code>[]byte</code>型slice是否相等，其他类型的slice必须自己展开每个元素进行比较：</p><pre><code class="language-go"><span class="token keyword">func</span> <span class="token function">equal</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">len</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> x <span class="token punctuation">{</span>
        <span class="token keyword">if</span> x<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> y<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

</code></pre><figure><img src="`+r+`" alt="image-20240424220922040" tabindex="0" loading="lazy"><figcaption>image-20240424220922040</figcaption></figure><p>slice唯一合法的比较操作是和nil比较，例如：</p><pre><code class="language-Go">if summer == nil { /* ... */ }
</code></pre><p>一个零值的slice等于nil。一个nil值的slice并没有底层数组。一个nil值的slice的长度和容量都是0，但是也有非nil值的slice的长度和容量也是0的，例如<code>[]int{}</code>或<code>make([]int, 3)[3:]</code>。与任意类型的nil值一样，我们可以用<code>[]int(nil)</code>类型转换表达式来生成一个对应类型slice的nil值。</p><pre><code class="language-go"><span class="token keyword">var</span> s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>    <span class="token comment">// len(s) == 0, s == nil</span>
s <span class="token operator">=</span> <span class="token boolean">nil</span>        <span class="token comment">// len(s) == 0, s == nil</span>
s <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">int</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span> <span class="token comment">// len(s) == 0, s == nil</span>
s <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>    <span class="token comment">// len(s) == 0, s != nil</span>

</code></pre><p>如果你需要测试一个slice是否是空的，使用<code>len(s) == 0</code>来判断，而不应该用<code>s == nil</code>来判断。</p><h4 id="make函数" tabindex="-1"><a class="header-anchor" href="#make函数"><span>make函数</span></a></h4><p>内置的make函数创建一个指定元素类型、长度和容量的slice。容量部分可以省略，在这种情况下，容量将等于长度。</p><pre><code class="language-Go">make([]T, len)
make([]T, len, cap) // same as make([]T, cap)[:len]
</code></pre><p>在底层，make创建了一个匿名的数组变量，然后返回一个slice；只有通过返回的slice才能引用底层匿名的数组变量。在第一种语句中，slice是整个数组的view。在第二个语句中，slice只引用了底层数组的前len个元素，但是容量将包含整个的数组。额外的元素是留给未来的增长用的。</p><h3 id="_4-2-1-append函数" tabindex="-1"><a class="header-anchor" href="#_4-2-1-append函数"><span>4.2.1. append函数</span></a></h3><p>内置的append函数用于向slice追加元素：</p><pre><code class="language-Go">var runes []rune
for _, r := range &quot;Hello, 世界&quot; {
    runes = append(runes, r)
}
fmt.Printf(&quot;%q\\n&quot;, runes) // &quot;[&#39;H&#39; &#39;e&#39; &#39;l&#39; &#39;l&#39; &#39;o&#39; &#39;,&#39; &#39; &#39; &#39;世&#39; &#39;界&#39;]&quot;
</code></pre><p>在循环中使用append函数构建一个由九个rune字符构成的slice，当然对应这个特殊的问题我们可以通过Go语言内置的<code>[]rune(&quot;Hello, 世界&quot;)</code>转换操作完成。</p><pre><code class="language-go"><span class="token keyword">func</span> <span class="token function">appendInt</span><span class="token punctuation">(</span>x <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> z <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
    zlen <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token keyword">if</span> zlen <span class="token operator">&lt;=</span> <span class="token function">cap</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// There is room to grow.  Extend the slice.</span>
        z <span class="token operator">=</span> x<span class="token punctuation">[</span><span class="token punctuation">:</span>zlen<span class="token punctuation">]</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// There is insufficient space.  Allocate a new array.</span>
        <span class="token comment">// Grow by doubling, for amortized linear complexity.</span>
        zcap <span class="token operator">:=</span> zlen
        <span class="token keyword">if</span> zcap <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token operator">*</span><span class="token function">len</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            zcap <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> <span class="token function">len</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        z <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> zlen<span class="token punctuation">,</span> zcap<span class="token punctuation">)</span>
        <span class="token function">copy</span><span class="token punctuation">(</span>z<span class="token punctuation">,</span> x<span class="token punctuation">)</span> <span class="token comment">// a built-in function; see text</span>
    <span class="token punctuation">}</span>
    z<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> y
    <span class="token keyword">return</span> z
<span class="token punctuation">}</span>
</code></pre><p>每次调用appendInt函数，必须先检测slice底层数组是否有足够的容量来保存新添加的元素。如果有足够空间的话，直接扩展slice（依然在原有的底层数组之上），将新添加的y元素复制到新扩展的空间，并返回slice。因此，输入的x和输出的z共享相同的底层数组。如果没有足够的增长空间的话，appendInt函数则会先分配一个足够大的slice用于保存新的结果，先将输入的x复制到新的空间，然后添加y元素。结果z和输入的x引用的将是不同的底层数组。</p><figure><img src="`+d+`" alt="image-20240425175118604" tabindex="0" loading="lazy"><figcaption>image-20240425175118604</figcaption></figure><p>内置的append函数可能使用比appendInt更复杂的内存扩展策略，并不知道append调用是否导致了内存的重新分配，也不能确认在原先的slice上的操作是否会影响到新的slice。通常是将append返回的结果直接赋值给输入的slice变量：</p><pre><code class="language-go">runes <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>runes<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
</code></pre><p>更新slice变量不仅对调用append函数是必要的，实际上对应任何可能导致长度、容量或底层数组变化的操作都是必要的。要正确地使用slice，需要记住尽管底层数组的元素是间接访问的，但是slice对应结构体本身的指针、长度和容量部分是直接访问的。要更新这些信息需要像上面例子那样一个显式的赋值操作。从这个角度看，slice并不是一个纯粹的引用类型，它实际上是一个类似下面结构体的聚合类型：</p><pre><code class="language-go"><span class="token keyword">type</span> IntSlice <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ptr      <span class="token operator">*</span><span class="token builtin">int</span>
    <span class="token builtin">len</span><span class="token punctuation">,</span> <span class="token builtin">cap</span> <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><p>置的append函数可以追加多个元素，甚至追加一个slice：</p><pre><code class="language-go"><span class="token keyword">var</span> x <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
x <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
x <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
x <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>
x <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> x<span class="token operator">...</span><span class="token punctuation">)</span> <span class="token comment">// append the slice x</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>      <span class="token comment">// &quot;[1 2 3 4 5 6 1 2 3 4 5 6]&quot;</span>

</code></pre><h3 id="_4-2-2-slice内存技巧" tabindex="-1"><a class="header-anchor" href="#_4-2-2-slice内存技巧"><span>4.2.2. Slice内存技巧</span></a></h3><p>给定一个字符串列表，下面的nonempty函数将在原有slice内存空间之上返回不包含空字符串的列表：</p><pre><code class="language-go"><span class="token comment">// Nonempty is an example of an in-place slice algorithm.</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">nonempty</span><span class="token punctuation">(</span>strings <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
	i <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token keyword">range</span> strings <span class="token punctuation">{</span>
		<span class="token keyword">if</span> s <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
			strings<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> s
			i<span class="token operator">++</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> strings<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><p>输入的slice和输出的slice共享一个底层数组。这可以避免分配另一个数组，不过原来的数据将可能会被覆盖，正如下面两个打印语句看到的那样：</p><pre><code class="language-go">data <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">nonempty</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// [&quot;one&quot; &quot;three&quot;]</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>           <span class="token comment">// [&quot;one&quot; &quot;three&quot; &quot;three&quot;]</span>
</code></pre><p>因此我们通常会这样使用nonempty函数：<code>data = nonempty(data)</code>。</p><p>nonempty函数也可以使用append函数实现：</p><pre><code class="language-go"><span class="token keyword">func</span> <span class="token function">nonempty2</span><span class="token punctuation">(</span>strings <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token comment">// NOTE: strings[:0]表示一个原始数组strings的切片，但切片长度是0，容量是数组的cap</span>
	out <span class="token operator">:=</span> strings<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// zero-length slice of original</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token keyword">range</span> strings <span class="token punctuation">{</span>
		<span class="token keyword">if</span> s <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
			out <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> s<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> out
<span class="token punctuation">}</span>
</code></pre><p>一个slice可以用来模拟一个stack。最初给定的空slice对应一个空的stack，然后可以使用append函数将新的值压入stack：</p><pre><code class="language-Go">stack = append(stack, v) // push v
</code></pre><p>stack的顶部位置对应slice的最后一个元素：</p><pre><code class="language-Go">top := stack[len(stack)-1] // top of stack
</code></pre><p>通过收缩stack可以弹出栈顶的元素</p><pre><code class="language-Go">stack = stack[:len(stack)-1] // pop
</code></pre><p>要删除slice中间的某个元素并保存原有的元素顺序，可以通过内置的copy函数将后面的子slice向前依次移动一位完成：</p><pre><code class="language-Go">func remove(slice []int, i int) []int {
    copy(slice[i:], slice[i+1:])
    return slice[:len(slice)-1]
}

func main() {
    s := []int{5, 6, 7, 8, 9}
    fmt.Println(remove(s, 2)) // &quot;[5 6 8 9]&quot;
}
</code></pre><p>如果删除元素后不用保持原来顺序的话，我们可以简单的用最后一个元素覆盖被删除的元素：</p><pre><code class="language-Go">func remove(slice []int, i int) []int {
    slice[i] = slice[len(slice)-1]
    return slice[:len(slice)-1]
}

func main() {
    s := []int{5, 6, 7, 8, 9}
    fmt.Println(remove(s, 2)) // &quot;[5 6 9 8]
}
</code></pre><h3 id="练习-4-3" tabindex="-1"><a class="header-anchor" href="#练习-4-3"><span>练习 4.3</span></a></h3><p>重写reverse函数，使用数组指针代替slice。</p><pre><code class="language-go"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>
	<span class="token function">reverse</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">reverse</span><span class="token punctuation">(</span>s <span class="token operator">*</span><span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> j<span class="token punctuation">;</span> i<span class="token punctuation">,</span> j <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> j<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		s<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> s<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> s<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="练习-4-4" tabindex="-1"><a class="header-anchor" href="#练习-4-4"><span>练习 4.4</span></a></h3><p>编写一个rotate函数，通过一次循环完成旋转。</p><pre><code class="language-go"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">rotate</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">rotate</span><span class="token punctuation">(</span>s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> rotateTimes <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token comment">//var result []int</span>
	result <span class="token operator">:=</span> s
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> rotateTimes<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		result <span class="token operator">=</span> result<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
		result <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> result<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
		<span class="token comment">//s = result</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> result
<span class="token punctuation">}</span>
</code></pre><h3 id="练习-4-5" tabindex="-1"><a class="header-anchor" href="#练习-4-5"><span>练习 4.5</span></a></h3><p>写一个函数在原地完成消除[]string中相邻重复的字符串的操作。</p><pre><code class="language-go">
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;i&quot;</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">uniqueSlice</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">uniqueSlice</span><span class="token punctuation">(</span>strSlice <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
	tempStr <span class="token operator">:=</span> <span class="token string">&quot;&quot;</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>strSlice<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> tempStr <span class="token operator">==</span> strSlice<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token punctuation">{</span>
			strSlice <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>strSlice<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> strSlice<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token operator">...</span><span class="token punctuation">)</span>
			<span class="token comment">// 重复的话，长度要减一了</span>
			i<span class="token operator">--</span>
		<span class="token punctuation">}</span>
		tempStr <span class="token operator">=</span> strSlice<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> strSlice
<span class="token punctuation">}</span>
</code></pre><h3 id="练习-4-6" tabindex="-1"><a class="header-anchor" href="#练习-4-6"><span>练习 4.6</span></a></h3><p>编写一个函数，原地将一个UTF-8编码的[]byte类型的slice中相邻的空格（参考unicode.IsSpace）替换成一个空格返回</p><pre><code class="language-go">
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	rs <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">rune</span><span class="token punctuation">{</span><span class="token char">&#39;H&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;e&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;o&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39; &#39;</span><span class="token punctuation">,</span> <span class="token char">&#39; &#39;</span><span class="token punctuation">,</span> <span class="token char">&#39; &#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;世&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;界&#39;</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;input string:\\t&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>rs<span class="token punctuation">)</span><span class="token punctuation">)</span>
	bs <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>rs<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;output string:\\t&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span><span class="token function">uniqueSpaceSlice</span><span class="token punctuation">(</span>bs<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">uniqueSpaceSlice</span><span class="token punctuation">(</span>bs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;input []bytes:\\t&quot;</span><span class="token punctuation">,</span> bs<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>bs<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> unicode<span class="token punctuation">.</span><span class="token function">IsSpace</span><span class="token punctuation">(</span><span class="token function">rune</span><span class="token punctuation">(</span>bs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			bs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>bs<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> bs<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token operator">...</span><span class="token punctuation">)</span>
			<span class="token comment">// 如果是空格就删掉，删掉以后就会长度变短，i要减1</span>
			i<span class="token operator">--</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;output []bytes:\\t&quot;</span><span class="token punctuation">,</span> bs<span class="token punctuation">)</span>
	<span class="token keyword">return</span> bs
<span class="token punctuation">}</span>

</code></pre><h3 id="练习-4-7" tabindex="-1"><a class="header-anchor" href="#练习-4-7"><span>练习 4.7</span></a></h3><p>修改reverse函数用于原地反转UTF-8编码的[]byte。是否可以不用分配额外的内存？</p><pre><code class="language-go"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;Hello 世界&quot;</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token function">reverse</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">reverse</span><span class="token punctuation">(</span>bs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span> <span class="token punctuation">{</span>
	<span class="token comment">// 先把byte数组转成rune数组</span>
	runes <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>bs<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// 然后正常些，和原本的reverse函数一样</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>runes<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> j<span class="token punctuation">;</span> i<span class="token punctuation">,</span> j <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> j<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		runes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> runes<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> runes<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> runes<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>runes<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><h2 id="_4-3-map" tabindex="-1"><a class="header-anchor" href="#_4-3-map"><span>4.3. map</span></a></h2><p>在Go语言中，一个map就是一个哈希表的引用。map类型可以写为<code>map[K]V</code>，其中K和V分别对应key和value。map中所有的key都有相同的类型，所有的value也有着相同的类型，但是key和value之间可以是不同的数据类型。K对应的key必须是支持==比较运算符的数据类型，所以map可以通过测试key是否相等来判断是否已经存在。虽然浮点数类型也是支持相等运算符比较的，但key尽量不用浮点数，可能出现的NaN和任何浮点数都不相等。</p><h3 id="操作map" tabindex="-1"><a class="header-anchor" href="#操作map"><span>操作map</span></a></h3><p>内置的make函数可以创建一个map：</p><pre><code class="language-Go">ages := make(map[string]int) // mapping from strings to ints
</code></pre><p>我们也可以用map字面值的语法创建map，同时还可以指定一些最初的key/value：</p><pre><code class="language-Go">ages := map[string]int{
    &quot;alice&quot;:   31,
    &quot;charlie&quot;: 34,
}
</code></pre><p>这相当于</p><pre><code class="language-Go">ages := make(map[string]int)
ages[&quot;alice&quot;] = 31
ages[&quot;charlie&quot;] = 34
</code></pre><p>因此，另一种创建空的map的表达式是<code>map[string]int{}</code>。</p><p>使用内置的delete函数可以删除元素：</p><pre><code class="language-Go">delete(ages, &quot;alice&quot;) // remove element ages[&quot;alice&quot;]
</code></pre><p>即使这些元素不在map中也没有关系，如果一个查找失败将返回value类型对应的零值，例如</p><pre><code class="language-Go">func main() {
	//ages := make(map[string]int)
	ages := map[string]int{
		&quot;alice&quot;:   31,
		&quot;charlie&quot;: 34,
	}
	agesBob := ages[&quot;bob&quot;]
	fmt.Println(agesBob) // 0
	ages[&quot;bob&quot;] = ages[&quot;bob&quot;] + 1
	fmt.Println(ages[&quot;bob&quot;]) // 1
	fmt.Println(ages)        // map[alice:31 bob:1 charlie:34]
}
</code></pre><figure><img src="`+m+`" alt="image-20240426180246893" tabindex="0" loading="lazy"><figcaption>image-20240426180246893</figcaption></figure><p>简短赋值语法也可以用在map上：</p><pre><code class="language-Go">ages[&quot;bob&quot;] += 1
ages[&quot;bob&quot;]++
</code></pre><p>但是map中的元素并不是一个变量，因此我们不能对map的元素进行取址操作：</p><pre><code class="language-Go">_ = &amp;ages[&quot;bob&quot;] // compile error: cannot take address of map element
</code></pre><p>禁止对map元素取址的原因是map可能随着元素数量的增长而重新分配更大的内存空间，从而可能导致之前的地址无效。</p>`,102))])}const w=o(g,[["render",b]]),x=JSON.parse('{"path":"/develop/Go/gopl/ch4.html","title":"04. GO语言-复合数据类型","lang":"zh-CN","frontmatter":{"category":"Go","tag":"Go","description":"04. GO语言-复合数据类型 主要讨论四种类型——数组、slice、map和结构体 演示如何使用结构体来解码和编码到对应JSON格式的数据，并且通过结合使用模板来生成HTML页面。 数组和结构体是聚合类型，它们的值由许多元素或成员字段的值组成。 数组是由同构的元素组成——每个数组元素都是完全相同的类型——结构体则是由异构的元素组成的。数组和结构体都是...","head":[["meta",{"property":"og:url","content":"https://echo0d.github.io/DailyNotes/develop/Go/gopl/ch4.html"}],["meta",{"property":"og:site_name","content":"echo0d-notes"}],["meta",{"property":"og:title","content":"04. GO语言-复合数据类型"}],["meta",{"property":"og:description","content":"04. GO语言-复合数据类型 主要讨论四种类型——数组、slice、map和结构体 演示如何使用结构体来解码和编码到对应JSON格式的数据，并且通过结合使用模板来生成HTML页面。 数组和结构体是聚合类型，它们的值由许多元素或成员字段的值组成。 数组是由同构的元素组成——每个数组元素都是完全相同的类型——结构体则是由异构的元素组成的。数组和结构体都是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-11T02:11:10.000Z"}],["meta",{"property":"article:author","content":"echo0d"}],["meta",{"property":"article:tag","content":"Go"}],["meta",{"property":"article:modified_time","content":"2025-04-11T02:11:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"04. GO语言-复合数据类型\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-11T02:11:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"echo0d\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":2,"title":"4.1. 数组","slug":"_4-1-数组","link":"#_4-1-数组","children":[{"level":3,"title":"数组定义","slug":"数组定义","link":"#数组定义","children":[]},{"level":3,"title":"数组长度","slug":"数组长度","link":"#数组长度","children":[]},{"level":3,"title":"数组-键值对","slug":"数组-键值对","link":"#数组-键值对","children":[]},{"level":3,"title":"数组比较","slug":"数组比较","link":"#数组比较","children":[]},{"level":3,"title":"练习 4.1","slug":"练习-4-1","link":"#练习-4-1","children":[]},{"level":3,"title":"练习 4.2","slug":"练习-4-2","link":"#练习-4-2","children":[]}]},{"level":2,"title":"4.2. Slice","slug":"_4-2-slice","link":"#_4-2-slice","children":[{"level":3,"title":"4.2.1. append函数","slug":"_4-2-1-append函数","link":"#_4-2-1-append函数","children":[]},{"level":3,"title":"4.2.2. Slice内存技巧","slug":"_4-2-2-slice内存技巧","link":"#_4-2-2-slice内存技巧","children":[]},{"level":3,"title":"练习 4.3","slug":"练习-4-3","link":"#练习-4-3","children":[]},{"level":3,"title":"练习 4.4","slug":"练习-4-4","link":"#练习-4-4","children":[]},{"level":3,"title":"练习 4.5","slug":"练习-4-5","link":"#练习-4-5","children":[]},{"level":3,"title":"练习 4.6","slug":"练习-4-6","link":"#练习-4-6","children":[]},{"level":3,"title":"练习 4.7","slug":"练习-4-7","link":"#练习-4-7","children":[]}]},{"level":2,"title":"4.3. map","slug":"_4-3-map","link":"#_4-3-map","children":[{"level":3,"title":"操作map","slug":"操作map","link":"#操作map","children":[]}]}],"git":{"createdTime":1722415943000,"updatedTime":1744337470000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":3}]},"readingTime":{"minutes":17.13,"words":5138},"filePathRelative":"develop/Go/gopl/ch4.md","localizedDate":"2024年7月31日","excerpt":"","autoDesc":true}');export{w as comp,x as data};
