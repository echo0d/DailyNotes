import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as e,e as a}from"./app-Twu8vQvY.js";const s="/DailyNotes/assets/image-20240422173219723--_tWNNFY.png",d="/DailyNotes/assets/image-20240422175054597-6twupMa1.png",l={},t=a(`<h1 id="_4-复合数据类型" tabindex="-1"><a class="header-anchor" href="#_4-复合数据类型" aria-hidden="true">#</a> 4. 复合数据类型</h1><ul><li>主要讨论四种类型——数组、slice、map和结构体</li><li>演示如何使用结构体来解码和编码到对应JSON格式的数据，并且通过结合使用模板来生成HTML页面。</li></ul><p>数组和结构体是聚合类型，它们的值由许多元素或成员字段的值组成。</p><p>数组是由同构的元素组成——每个数组元素都是完全相同的类型——结构体则是由异构的元素组成的。数组和结构体都是有固定内存大小的数据结构。相比之下，slice和map则是动态的数据结构，它们将根据需要动态增长。</p><h2 id="_4-1-数组" tabindex="-1"><a class="header-anchor" href="#_4-1-数组" aria-hidden="true">#</a> 4.1. 数组</h2><ul><li>数组是一个由固定长度的特定类型元素组成的序列，一个数组可以由零个或多个元素组成。</li><li>数组的每个元素可以通过索引下标来访问，索引下标的范围是从0开始到数组长度减1的位置。</li><li>内置的len函数将返回数组中元素的个数。</li></ul><p>因为数组的长度是固定的，因此在Go语言中很少直接使用数组。和数组对应的类型是Slice（切片），它是可以增长和收缩的动态序列，slice功能也更灵活，但是要理解slice工作原理的话需要先理解数组。</p><h3 id="数组定义" tabindex="-1"><a class="header-anchor" href="#数组定义" aria-hidden="true">#</a> 数组定义</h3><p>默认情况下，数组的每个元素都被初始化为元素类型对应的零值，对于数字类型来说就是0。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>var a [3]int             // array of 3 integers
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以使用数组字面值语法用一组值来初始化数组：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>	var q [3]int = [3]int{1, 2, 3}
	var r [3]int = [3]int{1, 2}
	fmt.Println(q[1]) // &quot;2&quot;
	fmt.Println(r[2]) // &quot;0&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在数组的长度位置出现的是“...”省略号，则表示数组的长度是根据初始化值的个数来计算。因此，上面q数组的定义可以简化为</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>q := [...]int{1, 2, 3}
fmt.Printf(&quot;%T\\n&quot;, q) // &quot;[3]int&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数组长度" tabindex="-1"><a class="header-anchor" href="#数组长度" aria-hidden="true">#</a> 数组长度</h3><p>数组的长度是数组类型的一个组成部分，因此[3]int和[4]int是两种不同的数组类型。数组的长度必须是常量表达式，因为数组的长度需要在编译阶段确定。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>q := [3]int{1, 2, 3}
q = [4]int{1, 2, 3, 4} // compile error: cannot assign [4]int to [3]int
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数组-键值对" tabindex="-1"><a class="header-anchor" href="#数组-键值对" aria-hidden="true">#</a> 数组-键值对</h3><p>上面的形式是直接提供顺序初始化值序列，但是也可以指定一个索引和对应值列表的方式初始化，就像下面这样：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>type Currency int

const (
    USD Currency = iota // 美元
    EUR                 // 欧元
    GBP                 // 英镑
    RMB                 // 人民币
)

symbol := [...]string{USD: &quot;$&quot;, EUR: &quot;€&quot;, GBP: &quot;￡&quot;, RMB: &quot;￥&quot;}

fmt.Println(RMB, symbol[RMB]) // &quot;3 ￥&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种形式的数组字面值形式中，初始化索引的顺序是无关紧要的，而且没用到的索引可以省略，和前面提到的规则一样，未指定初始值的元素将用零值初始化。例如，</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>r := [...]int{99: -1}
// 定义了一个含有100个元素的数组r，最后一个元素被初始化为-1，其它元素都是用0初始化。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+s+`" alt="image-20240422173219723" tabindex="0" loading="lazy"><figcaption>image-20240422173219723</figcaption></figure><h3 id="数组比较" tabindex="-1"><a class="header-anchor" href="#数组比较" aria-hidden="true">#</a> 数组比较</h3><p>只有数组的数据类型完全相同，两个数组才能比较；可以直接通过==比较运算符来比较两个数组，只有当两个数组的所有元素都是相等的时候数组才是相等的。不相等比较运算符!=遵循同样的规则。</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>a := [2]int{1, 2}
b := [...]int{1, 2}
c := [2]int{1, 3}
fmt.Println(a == b, a == c, b == c) // &quot;true false false&quot;
d := [3]int{1, 2}
fmt.Println(a == d) // compile error: cannot compare [2]int == [3]int
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为一个真实的例子，crypto/sha256包的Sum256函数对一个任意的字节slice类型的数据生成一个对应的消息摘要。消息摘要有256bit大小，因此对应[32]byte数组类型。如果两个消息摘要是相同的，那么可以认为两个消息本身也是相同（译注：理论上有HASH码碰撞的情况，但是实际应用可以基本忽略）；如果消息摘要不同，那么消息本身必然也是不同的。下面的例子用SHA256算法分别生成“x”和“X”两个信息的摘要：</p><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>import &quot;crypto/sha256&quot;

func main() {
    c1 := sha256.Sum256([]byte(&quot;x&quot;))
    c2 := sha256.Sum256([]byte(&quot;X&quot;))
    fmt.Printf(&quot;%x\\n%x\\n%t\\n%T\\n&quot;, c1, c2, c1 == c2, c1)
    // Output:
    // 2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881
    // 4b68ab3847feda7d6c62c1fbcbeebfa35eab7351ed5e78f4ddadea5df64b8015
    // false
    // [32]uint8
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果写成这样</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v\\n%v\\n%v\\n%T\\n&quot;</span><span class="token punctuation">,</span> c1<span class="token punctuation">,</span> c2<span class="token punctuation">,</span> c1 <span class="token operator">==</span> c2<span class="token punctuation">,</span> c1<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将会输出如下，所以能够看出，c1 c2本身是一个十进制数组。</p><figure><img src="`+d+'" alt="image-20240422175054597" tabindex="0" loading="lazy"><figcaption>image-20240422175054597</figcaption></figure><p>上面例子中，两个消息虽然只有一个字符的差异，但是生成的消息摘要则几乎有一半的bit位是不相同的。</p>',33),r=[t];function c(u,o){return i(),e("div",null,r)}const b=n(l,[["render",c],["__file","ch4.html.vue"]]);export{b as default};
