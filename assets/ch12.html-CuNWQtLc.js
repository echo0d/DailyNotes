import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as e,o as t}from"./app-Byeqk-xU.js";const o="/DailyNotes/assets/image-20240731112258817-B9d_TR8H.png",c="/DailyNotes/assets/image-20240731135850186-7Xll9j1g.png",i="/DailyNotes/assets/image-20240731161711817-J-MrnIVa.png",p="/DailyNotes/assets/image-20240731164211191-9wCy7Y82.png",l={};function u(d,n){return t(),a("div",null,n[0]||(n[0]=[e(`<h1 id="_12-反射" tabindex="-1"><a class="header-anchor" href="#_12-反射"><span>12. 反射</span></a></h1><h2 id="_12-1-为何需要反射" tabindex="-1"><a class="header-anchor" href="#_12-1-为何需要反射"><span>12.1. 为何需要反射?</span></a></h2><p>在 Go 语言中，反射（reflection）是一种强大的机制，允许程序在运行时检查类型信息、操作变量、调用方法等。Go 的反射包 <code>reflect</code> 提供了一组功能，让程序能够动态地检查和操作变量、结构体、接口等信息。</p><p>以下是一些常见情况下使用反射的例子和原因：</p><ol><li><strong>通用编程</strong>：反射允许编写通用代码，能够在运行时处理<strong>不同类型的数据结构，而不需要提前知道其类型。</strong></li><li><strong>序列化和反序列化</strong>：通过反射，可以动态地将结构体转换为 JSON、XML 等格式，或者将这些格式转换回结构体。</li><li><strong>动态调用方法</strong>：反射允许程序在运行时调用结构体的方法，而不需要提前知道这些方法的名称。</li><li><strong>类型检查和类型断言</strong>：反射可以用于检查变量的类型，并进行类型断言，特别在处理接口时非常有用。</li><li><strong>代码生成</strong>：某些情况下，反射可以用于生成代码，例如在 ORM（对象关系映射）库中动态创建数据库查询语句。</li></ol><p>一个格式化的函数，我们首先用switch类型分支来测试输入参数是否实现了String方法，如果是的话就调用该方法。然后继续增加类型测试分支，检查这个值的动态类型是否是string、int、bool等基础类型，并在每种情况下执行相应的格式化操作。</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Sprint</span><span class="token punctuation">(</span>x <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">type</span> stringer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
        <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">switch</span> x <span class="token operator">:=</span> x<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> stringer<span class="token punctuation">:</span>
        <span class="token keyword">return</span> x<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token builtin">string</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> x
    <span class="token keyword">case</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
    <span class="token comment">// ...similar cases for int16, uint32, and so on...</span>
    <span class="token keyword">case</span> <span class="token builtin">bool</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> x <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;true&quot;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">&quot;false&quot;</span>
    <span class="token keyword">default</span><span class="token punctuation">:</span>
        <span class="token comment">// array, chan, func, map, pointer, slice, struct</span>
        <span class="token keyword">return</span> <span class="token string">&quot;???&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我们如何处理其它类似<code>[]float64</code>、<code>map[string][]string</code>等类型呢？我们当然可以添加更多的测试分支，但是这些组合类型的数目基本是无穷的。还有如何处理类似<code>url.Values</code>这样的具名类型呢？即使类型分支可以识别出底层的基础类型是<code>map[string][]string</code>，但是它并不匹配<code>url.Values</code>类型，因为它们是两种不同的类型，而且<code>switch</code>类型分支也不可能包含每个类似<code>url.Values</code>的类型，这会导致对这些库的依赖。</p><p>没有办法来检查未知类型的表示方式，我们被卡住了。这就是我们需要反射的原因。</p><h2 id="_12-2-reflect-type-和-reflect-value" tabindex="-1"><a class="header-anchor" href="#_12-2-reflect-type-和-reflect-value"><span>12.2. <code>reflect.Type</code> 和 <code>reflect.Value</code></span></a></h2><p>反射是由 reflect 包提供的。它定义了两个重要的类型，Type 和 Value。</p><h3 id="reflect-type" tabindex="-1"><a class="header-anchor" href="#reflect-type"><span><code>reflect.Type</code></span></a></h3><p>一个 Type 表示一个Go类型。它是一个接口，有许多方法来区分类型以及检查它们的组成部分，例如一个结构体的成员或一个函数的参数等。唯一能反映 <code>reflect.Type</code> 实现的是接口的类型描述信息（§7.5），也正是这个实体标识了接口值的动态类型。</p><p>回忆一下<code>interface{} </code>类型，就是<strong>空接口</strong>，它是一个不包含任何方法的接口。空接口可以表示任意类型，因为它不限制其实现类型。空接口在 Go 中被广泛应用，因为它提供了一种在不知道具体类型的情况下存储值的方法。</p><p>以下是一些空接口的特点和用途：</p><ol><li><strong>表示任意类型</strong>：空接口可以接受任何类型的值，因为它不包含任何方法，所以任何类型都满足空接口的要求。</li><li><strong>类型断言</strong>：使用类型断言可以将空接口中的值转换为具体类型。这使得在运行时能够处理不同类型的数据。</li><li><strong>通用容器</strong>：空接口可以用作通用的容器，用于存储不同类型的值，类似于 C# 或 Java 中的 <code>Object</code> 类型。</li></ol><p>示例代码：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> any <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 定义一个空接口</span>

    any <span class="token operator">=</span> <span class="token number">42</span> <span class="token comment">// 可以存储任何类型的值</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>any<span class="token punctuation">)</span> <span class="token comment">// 输出: 42</span>

    any <span class="token operator">=</span> <span class="token string">&quot;Hello, Go!&quot;</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>any<span class="token punctuation">)</span> <span class="token comment">// 输出: Hello, Go!</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数<code>reflect.TypeOf</code> 接受任意的 <code>interface{} </code>类型，并以<code>reflect.Type</code>形式返回其动态类型：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>t := reflect.TypeOf(3)  // a reflect.Type
fmt.Println(t.String()) // &quot;int&quot;
fmt.Println(t)          // &quot;int&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>TypeOf(3) </code>调用将值 3 传给 <code>interface{}</code> 参数。回到 7.5节 的将一个具体的值转为接口类型会有一个隐式的接口转换操作，它会创建一个包含两个信息的接口值：操作数的动态类型（这里是 int）和它的动态的值（这里是 3）。</p><p>因为 <code>reflect.TypeOf</code> 返回的是一个动态类型的接口值，它总是返回具体的类型。因此，下面的代码将打印 <code>&quot;*os.File&quot; </code>而不是 <code>&quot;io.Writer&quot;</code>。稍后，我们将看到能够表达接口类型的<code> reflect.Type</code>。</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>var w io.Writer = os.Stdout
fmt.Println(reflect.TypeOf(w)) // &quot;*os.File&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>要注意的是 <code>reflect.Type</code> 接口是满足 <code>fmt.Stringer</code> 接口的。因为打印一个接口的动态类型对于调试和日志是有帮助的，<code> fmt.Printf</code> 提供了一个缩写 %T 参数，内部使用<code>reflect.TypeOf</code>来输出：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>fmt.Printf(&quot;%T\\n&quot;, 3) // &quot;int&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="reflect-value" tabindex="-1"><a class="header-anchor" href="#reflect-value"><span><code>reflect.Value</code></span></a></h3><p><code>reflect</code> 包中另一个重要的类型是 Value。一个 <code>reflect.Value</code> 可以装载任意类型的值。函数<code> reflect.ValueOf</code> 接受任意的 <code>interface{}</code> 类型，并返回一个装载着其动态值的 <code>reflect.Value</code>。和 <code>reflect.TypeOf</code> 类似，<code>reflect.ValueOf</code> 返回的结果也是具体的类型，但是 <code>reflect.Value</code> 也可以持有一个接口值。</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>v := reflect.ValueOf(3) // a reflect.Value
fmt.Println(v)          // &quot;3&quot;
fmt.Printf(&quot;%v\\n&quot;, v)   // &quot;3&quot;
fmt.Println(v.String()) // NOTE: &quot;&lt;int Value&gt;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和 <code>reflect.Type</code> 类似，<code>reflect.Value</code> 也满足 <code>fmt.Stringer</code> 接口，但是除非<code> Value</code> 持有的是字符串，否则 <code>String</code> 方法只返回其类型。而使用 <code>fmt</code> 包的<code> %v</code> 标志参数会对<code> reflect.Values</code> 特殊处理。</p><p>对 Value 调用 Type 方法将返回具体类型所对应的 <code>reflect.Type</code>：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>t := v.Type()           // a reflect.Type
fmt.Println(t.String()) // &quot;int&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>reflect.ValueOf</code> 的逆操作是 <code>reflect.Value.Interface</code> 方法。它返回一个 <code>interface{}</code> 类型，装载着与 <code>reflect.Value</code> 相同的具体值：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>v := reflect.ValueOf(3) // a reflect.Value
x := v.Interface()      // an interface{}
i := x.(int)            // an int
fmt.Printf(&quot;%d\\n&quot;, i)   // &quot;3&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>reflect.Value</code> 和 <code>interface{}</code> 都能装载任意的值。所不同的是，一个空的接口隐藏了值内部的表示方式和所有方法，因此只有我们知道具体的动态类型才能使用类型断言来访问内部的值（就像上面那样），内部值我们没法访问。相比之下，一个 Value 则有很多方法来检查其内容，无论它的具体类型是什么。</p><h3 id="kind-方法" tabindex="-1"><a class="header-anchor" href="#kind-方法"><span>Kind 方法</span></a></h3><p>让我们再次尝试实现格式化函数 <code>format.Any</code>。我们使用 <code>reflect.Value</code> 的 <code>Kind</code> 方法来替代之前的类型 <code>switch</code>。虽然还是有无穷多的类型，但是它们的 kinds 类型却是有限的：Bool、String 和 所有数字类型的基础类型；Array 和 Struct 对应的聚合类型；Chan、Func、Ptr、Slice 和 Map 对应的引用类型；interface 类型；还有表示空值的 Invalid 类型。（空的 <code>reflect.Value</code> 的 <code>kind</code> 即为 Invalid。）</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>package format

import (
    &quot;reflect&quot;
    &quot;strconv&quot;
)

// Any formats any value as a string.
func Any(value interface{}) string {
    return formatAtom(reflect.ValueOf(value))
}

// formatAtom formats a value without inspecting its internal structure.
func formatAtom(v reflect.Value) string {
    switch v.Kind() {
    case reflect.Invalid:
        return &quot;invalid&quot;
    case reflect.Int, reflect.Int8, reflect.Int16,
        reflect.Int32, reflect.Int64:
        return strconv.FormatInt(v.Int(), 10)
    case reflect.Uint, reflect.Uint8, reflect.Uint16,
        reflect.Uint32, reflect.Uint64, reflect.Uintptr:
        return strconv.FormatUint(v.Uint(), 10)
    // ...floating-point and complex cases omitted for brevity...
    case reflect.Bool:
        return strconv.FormatBool(v.Bool())
    case reflect.String:
        return strconv.Quote(v.String())
    case reflect.Chan, reflect.Func, reflect.Ptr, reflect.Slice, reflect.Map:
        return v.Type().String() + &quot; 0x&quot; +
            strconv.FormatUint(uint64(v.Pointer()), 16)
    default: // reflect.Array, reflect.Struct, reflect.Interface
        return v.Type().String() + &quot; value&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到目前为止，我们的函数将每个值视作一个不可分割没有内部结构的物品，因此它叫 <code>formatAtom</code>。对于聚合类型（结构体和数组）和接口，只是打印值的类型，对于引用类型（channels、functions、pointers、slices 和 maps），打印类型和十六进制的引用地址。虽然还不够理想，但是依然是一个重大的进步，并且 Kind 只关心底层表示，<code>format.Any</code> 也支持具名类型。例如：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>var x int64 = 1
var d time.Duration = 1 * time.Nanosecond
fmt.Println(format.Any(x))                  // &quot;1&quot;
fmt.Println(format.Any(d))                  // &quot;1&quot;
fmt.Println(format.Any([]int64{x}))         // &quot;[]int64 0x8202b87b0&quot;
fmt.Println(format.Any([]time.Duration{d})) // &quot;[]time.Duration 0x8202b87e0&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+o+`" alt="image-20240731112258817" tabindex="0" loading="lazy"><figcaption>image-20240731112258817</figcaption></figure><h2 id="_12-3-display-一个递归的值打印器" tabindex="-1"><a class="header-anchor" href="#_12-3-display-一个递归的值打印器"><span>12.3. Display，一个递归的值打印器</span></a></h2><p>接下来，让我们看看如何改善聚合数据类型的显示。构建一个用于调试用的Display函数：给定任意一个复杂类型 x，打印这个值对应的完整结构，同时标记每个元素的发现路径。</p><p>应该尽量避免在一个包的API中暴露涉及反射的接口。我们将定义一个未导出的display函数用于递归处理工作，导出的是Display函数，它只是display函数简单的包装以接受<code>interface{}</code>类型的参数：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>func Display(name string, x interface{}) {
    fmt.Printf(&quot;Display %s (%T):\\n&quot;, name, x)
    display(name, reflect.ValueOf(x))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在display函数中，我们使用了前面定义的打印基础类型——基本类型、函数和chan等——元素值的<code>formatAtom</code>函数，但是我们会使用<code>reflect.Value</code>的方法来递归显示复杂类型的每一个成员。在递归下降过程中，path字符串，从最开始传入的起始值（这里是“e”），将逐步增长来表示是如何达到当前值（例如“<code>e.args[0].value</code>”）的。</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> format

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Display</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> x <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Display %s (%T):\\n&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> x<span class="token punctuation">)</span>
	<span class="token function">display</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">display</span><span class="token punctuation">(</span>path <span class="token builtin">string</span><span class="token punctuation">,</span> v reflect<span class="token punctuation">.</span>Value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> v<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> reflect<span class="token punctuation">.</span>Invalid<span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s = invalid\\n&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span>
	<span class="token keyword">case</span> reflect<span class="token punctuation">.</span>Slice<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span>Array<span class="token punctuation">:</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> v<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token function">display</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%s[%d]&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Index</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token keyword">case</span> reflect<span class="token punctuation">.</span>Struct<span class="token punctuation">:</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> v<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			fieldPath <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%s.%s&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
			<span class="token function">display</span><span class="token punctuation">(</span>fieldPath<span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token keyword">case</span> reflect<span class="token punctuation">.</span>Map<span class="token punctuation">:</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> key <span class="token operator">:=</span> <span class="token keyword">range</span> v<span class="token punctuation">.</span><span class="token function">MapKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token function">display</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%s[%s]&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span>
				<span class="token function">formatAtom</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">MapIndex</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token keyword">case</span> reflect<span class="token punctuation">.</span>Ptr<span class="token punctuation">:</span>
		<span class="token keyword">if</span> v<span class="token punctuation">.</span><span class="token function">IsNil</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s = nil\\n&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token function">display</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;(*%s)&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token keyword">case</span> reflect<span class="token punctuation">.</span>Interface<span class="token punctuation">:</span>
		<span class="token keyword">if</span> v<span class="token punctuation">.</span><span class="token function">IsNil</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s = nil\\n&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s.type = %s\\n&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token function">display</span><span class="token punctuation">(</span>path<span class="token operator">+</span><span class="token string">&quot;.value&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span> <span class="token comment">// basic types, channels, funcs</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s = %s\\n&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> <span class="token function">formatAtom</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们针对不同类型分别讨论。</p><p><strong>Slice和数组：</strong> 两种的处理逻辑是一样的。Len方法返回slice或数组值中的元素个数，<code>Index(i)</code>获得索引i对应的元素，返回的也是一个<code>reflect.Value</code>；如果索引i超出范围的话将导致panic异常，这与数组或slice类型内建的<code>len(a</code>)和<code>a[i]</code>操作类似。display针对序列中的每个元素递归调用自身处理，我们通过在递归处理时向path附加<code>[i]</code>来表示访问路径。</p><p>虽然<code>reflect.Value</code>类型带有很多方法，但是只有少数的方法能对任意值都安全调用。例如，Index方法只能对Slice、数组或字符串类型的值调用，如果对其它类型调用则会导致panic异常。</p><p><strong>结构体：</strong> <code>NumField</code>方法报告结构体中成员的数量，<code>Field(i)</code>以<code>reflect.Value</code>类型返回第i个成员的值。成员列表也包括通过匿名字段提升上来的成员。为了在<code>path</code>添加<code>“.f”</code>来表示成员路径，我们必须获得结构体对应的<code>reflect.Type</code>类型信息，然后访问结构体第i个成员的名字。</p><p><strong>Maps:</strong> <code>MapKeys</code>方法返回一个<code>reflect.Value</code>类型的slice，每一个元素对应<code>map</code>的一个<code>key</code>。和往常一样，遍历map时顺序是随机的。<code>MapIndex(key)</code>返回<code>map</code>中<code>key</code>对应的<code>value</code>。我们向<code>path</code>添加<code>[key]</code>来表示访问路径。（我们这里有一个未完成的工作。其实<code>map</code>的<code>key</code>的类型并不局限于<code>formatAtom</code>能完美处理的类型；数组、结构体和接口都可以作为<code>map</code>的<code>key</code>。针对这种类型，完善<code>key</code>的显示信息是练习12.1的任务。）</p><p><strong>指针：</strong><code> Elem</code>方法返回指针指向的变量，依然是<code>reflect.Value</code>类型。即使指针是<code>nil</code>，这个操作也是安全的，在这种情况下指针是<code>Invalid</code>类型，但是我们可以用<code>IsNil</code>方法来显式地测试一个空指针，这样我们可以打印更合适的信息。我们在path前面添加<code>*</code>，并用括弧包含以避免歧义。</p><p><strong>接口：</strong> 再一次，我们使用<code>IsNil</code>方法来测试接口是否是nil，如果不是，我们可以调用<code>v.Elem()</code>来获取接口对应的动态值，并且打印对应的类型和值。</p><p>现在我们的Display函数总算完工了，让我们看看它的表现吧。下面的Movie类型是在4.5节的电影类型上演变来的：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>type Movie struct {
    Title, Subtitle string
    Year            int
    Color           bool
    Actor           map[string]string
    Oscars          []string
    Sequel          *string
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们声明一个该类型的变量，然后看看Display函数如何显示它：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>strangelove := Movie{
    Title:    &quot;Dr. Strangelove&quot;,
    Subtitle: &quot;How I Learned to Stop Worrying and Love the Bomb&quot;,
    Year:     1964,
    Color:    false,
    Actor: map[string]string{
        &quot;Dr. Strangelove&quot;:            &quot;Peter Sellers&quot;,
        &quot;Grp. Capt. Lionel Mandrake&quot;: &quot;Peter Sellers&quot;,
        &quot;Pres. Merkin Muffley&quot;:       &quot;Peter Sellers&quot;,
        &quot;Gen. Buck Turgidson&quot;:        &quot;George C. Scott&quot;,
        &quot;Brig. Gen. Jack D. Ripper&quot;:  &quot;Sterling Hayden&quot;,
        \`Maj. T.J. &quot;King&quot; Kong\`:      &quot;Slim Pickens&quot;,
    },

    Oscars: []string{
        &quot;Best Actor (Nomin.)&quot;,
        &quot;Best Adapted Screenplay (Nomin.)&quot;,
        &quot;Best Director (Nomin.)&quot;,
        &quot;Best Picture (Nomin.)&quot;,
    },
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+c+`" alt="image-20240731135850186" tabindex="0" loading="lazy"><figcaption>image-20240731135850186</figcaption></figure><p>观察下面两个例子的区别：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>var i interface{} = 3

Display(&quot;i&quot;, i)
// Output:
// Display i (int):
// i = 3

Display(&quot;&amp;i&quot;, &amp;i)
// Output:
// Display &amp;i (*interface {}):
// (*&amp;i).type = int
// (*&amp;i).value = 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在第一个例子中，<code>Display</code>函数调用<code>reflect.ValueOf(i)</code>，它返回一个<code>Int</code>类型的值。正如我们在12.2节中提到的，<code>reflect.ValueOf</code>总是返回一个具体类型的 <code>Value</code>，因为它是从一个接口值提取的内容。</p><p>在第二个例子中，<code>Display</code>函数调用的是<code>reflect.ValueOf(&amp;i)</code>，它返回一个指向i的指针，对应<code>Ptr</code>类型。在<code>switch</code>的<code>Ptr</code>分支中，对这个值调用 <code>Elem</code> 方法，返回一个<code>Value</code>来表示变量<code>i</code>本身，对应<code>Interface</code>类型。像这样一个间接获得的<code>Value</code>，可能代表任意类型的值，包括接口类型。<code>display</code>函数递归调用自身，这次它分别打印了这个接口的动态类型和值。</p><p><strong>练习 12.1：</strong> 扩展Display函数，使它可以显示包含以结构体或数组作为<code>map</code>的<code>key</code>类型的值。</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">case</span> reflect<span class="token punctuation">.</span>Map<span class="token punctuation">:</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> key <span class="token operator">:=</span> <span class="token keyword">range</span> v<span class="token punctuation">.</span><span class="token function">MapKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// XXX: 咱也不道对不对</span>
			<span class="token keyword">if</span> key<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> reflect<span class="token punctuation">.</span>Struct <span class="token punctuation">{</span>
				<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> v<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
					fieldPath <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%s.%s&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
					<span class="token function">display</span><span class="token punctuation">(</span>fieldPath<span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
				<span class="token function">display</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%s[%s]&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> <span class="token function">formatAtom</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">MapIndex</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 12.2：</strong> 增强display函数的稳健性，通过记录边界的步数来确保在超出一定限制后放弃递归。（在13.3节，我们会看到另一种探测数据结构是否存在环的技术。）</p><h2 id="_12-4-示例-编码为s表达式" tabindex="-1"><a class="header-anchor" href="#_12-4-示例-编码为s表达式"><span>12.4. 示例: 编码为S表达式</span></a></h2><p>这节先不看了，似乎没啥意思</p><h2 id="_12-5-通过reflect-value修改值" tabindex="-1"><a class="header-anchor" href="#_12-5-通过reflect-value修改值"><span>12.5. 通过reflect.Value修改值</span></a></h2><p>回想一下，Go语言中类似<code>x</code>、<code>x.f[1]</code>和<code>*p</code>形式的表达式都可以表示变量，但是其它如<code>x + 1</code>和<code>f(2)</code>则不是变量。一个变量就是一个可寻址的内存空间，里面存储了一个值，并且存储的值可以通过内存地址来更新。</p><p>对于<code>reflect.Values</code>也有类似的区别。有一些<code>reflect.Values</code>是可取地址的；其它一些则不可以。考虑以下的声明语句：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>x := 2                   // value   type    variable?
a := reflect.ValueOf(2)  // 2       int     no
b := reflect.ValueOf(x)  // 2       int     no
c := reflect.ValueOf(&amp;x) // &amp;x      *int    no
d := c.Elem()            // 2       int     yes (x)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>a</code>对应的变量不可取地址。因为a中的值仅仅是整数2的拷贝副本。<code>b</code>中的值也同样不可取地址。<code>c</code>中的值还是不可取地址，它只是一个指针<code>&amp;x</code>的拷贝。实际上，所有通过<code>reflect.ValueOf(x)</code>返回的<code>reflect.Value</code>都是不可取地址的。但是对于<code>d</code>，它是<code>c</code>的解引用方式生成的，指向另一个变量，因此是可取地址的。我们可以通过调用<code>reflect.ValueOf(&amp;x).Elem()</code>，来获取任意变量<code>x</code>对应的可取地址的<code>Value</code>。</p><p>我们可以通过调用<code>reflect.Value</code>的<code>CanAddr</code>方法来判断其是否可以被取地址：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>fmt.Println(a.CanAddr()) // &quot;false&quot;
fmt.Println(b.CanAddr()) // &quot;false&quot;
fmt.Println(c.CanAddr()) // &quot;false&quot;
fmt.Println(d.CanAddr()) // &quot;true&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每当我们通过指针间接地获取的<code>reflect.Value</code>都是可取地址的，即使开始的是一个不可取地址的<code>Value</code>。在反射机制中，所有关于是否支持取地址的规则都是类似的。以此类推，<code>reflect.ValueOf(e).Index(i)</code>对应的值也是可取地址的，即使原始的<code>reflect.ValueOf(e)</code>不支持也没有关系。</p><p>要从变量对应的可取地址的<code>reflect.Value</code>来访问变量需要三个步骤。第一步是调用<code>Addr()</code>方法，它返回一个<code>Value</code>，里面保存了指向变量的指针。然后是在<code>Value</code>上调用<code>Interface()</code>方法，也就是返回一个<code>interface{}</code>，里面包含指向变量的指针。最后，如果我们知道变量的类型，我们可以使用类型的断言机制将得到的<code>interface{}</code>类型的接口强制转为普通的类型指针。这样我们就可以通过这个普通指针来更新变量了：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>x := 2
d := reflect.ValueOf(&amp;x).Elem()   // d refers to the variable x
px := d.Addr().Interface().(*int) // px := &amp;x
*px = 3                           // x = 3
fmt.Println(x)                    // &quot;3&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，不使用指针，而是通过调用可取地址的<code>reflect.Value</code>的<code>reflect.Value.Set</code>方法来更新对应的值：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>d.Set(reflect.ValueOf(4))
fmt.Println(x) // &quot;4&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Set</code>方法将在运行时执行和编译时进行类似的可赋值性约束的检查。以上代码，变量和值都是int类型，但是如果变量是int64类型，那么程序将抛出一个panic异常，所以关键问题是要确保改类型的变量可以接受对应的值：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>d.Set(reflect.ValueOf(int64(5))) // panic: int64 is not assignable to int
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，对一个不可取地址的<code>reflect.Value</code>调用Set方法也会导致panic异常：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>x := 2
b := reflect.ValueOf(x)
b.Set(reflect.ValueOf(3)) // panic: Set using unaddressable value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有很多用于基本数据类型的Set方法：<code>SetInt</code>、<code>SetUint</code>、<code>SetString</code>和<code>SetFloat</code>等。</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>d := reflect.ValueOf(&amp;x).Elem()
d.SetInt(3)
fmt.Println(x) // &quot;3&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从某种程度上说，这些Set方法总是尽可能地完成任务。以<code>SetInt</code>为例，只要变量是某种类型的有符号整数就可以工作，即使是一些命名的类型、甚至只要底层数据类型是有符号整数就可以，而且如果对于变量类型值太大的话会被自动截断。但需要谨慎的是：对于一个引用<code>interface{}</code>类型的<code>reflect.Value</code>调用<code>SetInt</code>会导致panic异常，即使那个<code>interface{}</code>变量对于整数类型也不行。</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>x := 1
rx := reflect.ValueOf(&amp;x).Elem()
rx.SetInt(2)                     // OK, x = 2
rx.Set(reflect.ValueOf(3))       // OK, x = 3
rx.SetString(&quot;hello&quot;)            // panic: string is not assignable to int
rx.Set(reflect.ValueOf(&quot;hello&quot;)) // panic: string is not assignable to int

var y interface{}
ry := reflect.ValueOf(&amp;y).Elem()
ry.SetInt(2)                     // panic: SetInt called on interface Value
ry.Set(reflect.ValueOf(3))       // OK, y = int(3)
ry.SetString(&quot;hello&quot;)            // panic: SetString called on interface Value
ry.Set(reflect.ValueOf(&quot;hello&quot;)) // OK, y = &quot;hello&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们用<code>Display</code>显示<code>os.Stdout</code>结构时，我们发现反射可以越过Go语言的导出规则的限制读取结构体中未导出的成员，比如在类Unix系统上<code>os.File</code>结构体中的<code>fd int</code>成员。然而，利用反射机制并不能修改这些未导出的成员：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>stdout := reflect.ValueOf(os.Stdout).Elem() // *os.Stdout, an os.File var
fmt.Println(stdout.Type())                  // &quot;os.File&quot;
fd := stdout.FieldByName(&quot;fd&quot;)
fmt.Println(fd.Int()) // &quot;1&quot;
fd.SetInt(2)          // panic: unexported field
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个可取地址的<code>reflect.Value</code>会记录一个结构体成员是否是未导出成员，如果是的话则拒绝修改操作。因此，<code>CanAddr</code>方法并不能正确反映一个变量是否是可以被修改的。</p><p>相关的方法<code>CanSet</code>是用于检查对应的<code>reflect.Value</code>是否是可取地址并可被修改的：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>fmt.Println(fd.CanAddr(), fd.CanSet()) // &quot;true false&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>可取地址不一定能被修改，能被修改一定可取地址</p></blockquote><h2 id="_12-7-获取结构体字段标签" tabindex="-1"><a class="header-anchor" href="#_12-7-获取结构体字段标签"><span>12.7. 获取结构体字段标签</span></a></h2><p>对于一个web服务，大部分HTTP处理函数要做的第一件事情就是展开请求中的参数到本地变量中。我们定义了一个工具函数，叫<code>params.Unpack</code>，通过使用结构体成员标签机制来让HTTP处理函数解析请求参数更方便。</p><p>下面的search函数是一个HTTP请求处理函数。它定义了一个匿名结构体类型的变量，用结构体的每个成员表示HTTP请求的参数。其中结构体成员标签指明了对于请求参数的名字，为了减少URL的长度这些参数名通常都是神秘的缩略词。Unpack将请求参数填充到合适的结构体成员中，这样我们可以方便地通过合适的类型类来访问这些参数。</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>// search implements the /search URL endpoint.
func search(resp http.ResponseWriter, req *http.Request) {
    var data struct {
        Labels     []string \`http:&quot;l&quot;\`
        MaxResults int      \`http:&quot;max&quot;\`
        Exact      bool     \`http:&quot;x&quot;\`
    }
    data.MaxResults = 10 // set default
    if err := params.Unpack(req, &amp;data); err != nil {
        http.Error(resp, err.Error(), http.StatusBadRequest) // 400
        return
    }

    // ...rest of handler...
    fmt.Fprintf(resp, &quot;Search: %+v\\n&quot;, data)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的Unpack函数主要完成三件事情。第一，它调用<code>req.ParseForm()</code>来解析HTTP请求。然后，<code>req.Form</code>将包含所有的请求参数，不管HTTP客户端使用的是GET还是POST请求方法。</p><p>下一步，Unpack函数将构建每个结构体成员有效参数名字到成员变量的映射。如果结构体成员有成员标签的话，有效参数名字可能和实际的成员名字不相同。<code>reflect.Type</code>的<code>Field</code>方法将返回一个<code>reflect.StructField</code>，里面含有每个成员的名字、类型和可选的成员标签等信息。其中成员标签信息对应<code>reflect.StructTag</code>类型的字符串，并且提供了Get方法用于解析和根据特定key提取的子串，例如这里的http:&quot;...&quot;形式的子串。</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token comment">// Unpack populates the fields of the struct pointed to by ptr</span>
<span class="token comment">// from the HTTP request parameters in req.</span>
<span class="token keyword">func</span> <span class="token function">Unpack</span><span class="token punctuation">(</span>req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> ptr <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> err <span class="token operator">:=</span> req<span class="token punctuation">.</span><span class="token function">ParseForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> err
    <span class="token punctuation">}</span>

    <span class="token comment">// Build map of fields keyed by effective name.</span>
    fields <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Value<span class="token punctuation">)</span>
    v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>ptr<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// the struct variable</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> v<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        fieldInfo <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment">// a reflect.StructField</span>
        tag <span class="token operator">:=</span> fieldInfo<span class="token punctuation">.</span>Tag           <span class="token comment">// a reflect.StructTag</span>
        name <span class="token operator">:=</span> tag<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> name <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
            name <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span>fieldInfo<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        fields<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> v<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Update struct field for each parameter in the request.</span>
    <span class="token keyword">for</span> name<span class="token punctuation">,</span> values <span class="token operator">:=</span> <span class="token keyword">range</span> req<span class="token punctuation">.</span>Form <span class="token punctuation">{</span>
        f <span class="token operator">:=</span> fields<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
        <span class="token keyword">if</span> <span class="token operator">!</span>f<span class="token punctuation">.</span><span class="token function">IsValid</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">continue</span> <span class="token comment">// ignore unrecognized HTTP parameters</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> values <span class="token punctuation">{</span>
            <span class="token keyword">if</span> f<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> reflect<span class="token punctuation">.</span>Slice <span class="token punctuation">{</span>
                elem <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">populate</span><span class="token punctuation">(</span>elem<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;%s: %v&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                f<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>reflect<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> elem<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">populate</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;%s: %v&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，Unpack遍历HTTP请求的name/valu参数键值对，更新相应的结构体成员。。如果同一个名字的参数可能出现多次，并且对应的结构体成员是一个slice，那么就将所有的参数添加到slice中。对应的成员值将被覆盖，只有最后一次出现的参数值才是起作用的。</p><p>populate函数用请求的字符串类型参数值来填充单一的成员v（或者是slice类型成员中的单一的元素）。</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">populate</span><span class="token punctuation">(</span>v reflect<span class="token punctuation">.</span>Value<span class="token punctuation">,</span> value <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> v<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> reflect<span class="token punctuation">.</span>String<span class="token punctuation">:</span>
        v<span class="token punctuation">.</span><span class="token function">SetString</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>

    <span class="token keyword">case</span> reflect<span class="token punctuation">.</span>Int<span class="token punctuation">:</span>
        i<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseInt</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> err
        <span class="token punctuation">}</span>
        v<span class="token punctuation">.</span><span class="token function">SetInt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>

    <span class="token keyword">case</span> reflect<span class="token punctuation">.</span>Bool<span class="token punctuation">:</span>
        b<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseBool</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> err
        <span class="token punctuation">}</span>
        v<span class="token punctuation">.</span><span class="token function">SetBool</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>

    <span class="token keyword">default</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;unsupported kind %s&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+i+`" alt="image-20240731161711817" tabindex="0" loading="lazy"><figcaption>image-20240731161711817</figcaption></figure><h2 id="_12-8-显示一个类型的方法集" tabindex="-1"><a class="header-anchor" href="#_12-8-显示一个类型的方法集"><span>12.8. 显示一个类型的方法集</span></a></h2><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>// Print prints the method set of the value x.
func Print(x interface{}) {
    v := reflect.ValueOf(x)
    t := v.Type()
    fmt.Printf(&quot;type %s\\n&quot;, t)

    for i := 0; i &lt; v.NumMethod(); i++ {
        methType := v.Method(i).Type()
        fmt.Printf(&quot;func (%s) %s%s\\n&quot;, t, t.Method(i).Name,
            strings.TrimPrefix(methType.String(), &quot;func&quot;))
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>reflect.Type</code>和<code>reflect.Value</code>都提供了一个Method方法。每次<code>t.Method(i)</code>调用将一个<code>reflect.Method</code>的实例，对应一个用于描述一个方法的名称和类型的结构体。每次<code>v.Method(i)</code>方法调用都返回一个<code>reflect.Value</code>以表示对应的值（§6.4），也就是一个方法是绑到它的接收者的。使用<code>reflect.Value.Call</code>方法（我们这里没有演示），将可以调用一个<code>Func</code>类型的Value，但是这个例子中只用到了它的类型。</p><p>这是属于<code>time.Duration</code>和<code>*strings.Replacer</code>两个类型的方法：</p><div class="language-Go line-numbers-mode" data-ext="Go" data-title="Go"><pre class="language-Go"><code>methods.Print(time.Hour)
// Output:
// type time.Duration
// func (time.Duration) Hours() float64
// func (time.Duration) Minutes() float64
// func (time.Duration) Nanoseconds() int64
// func (time.Duration) Seconds() float64
// func (time.Duration) String() string

methods.Print(new(strings.Replacer))
// Output:
// type *strings.Replacer
// func (*strings.Replacer) Replace(string) string
// func (*strings.Replacer) WriteString(io.Writer, string) (int, error)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+p+'" alt="image-20240731164211191" tabindex="0" loading="lazy"><figcaption>image-20240731164211191</figcaption></figure>',110)]))}const k=s(l,[["render",u],["__file","ch12.html.vue"]]),m=JSON.parse('{"path":"/develop/Go/gopl/ch12.html","title":"12. 反射","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"12.1. 为何需要反射?","slug":"_12-1-为何需要反射","link":"#_12-1-为何需要反射","children":[]},{"level":2,"title":"12.2. reflect.Type 和 reflect.Value","slug":"_12-2-reflect-type-和-reflect-value","link":"#_12-2-reflect-type-和-reflect-value","children":[{"level":3,"title":"reflect.Type","slug":"reflect-type","link":"#reflect-type","children":[]},{"level":3,"title":"reflect.Value","slug":"reflect-value","link":"#reflect-value","children":[]},{"level":3,"title":"Kind 方法","slug":"kind-方法","link":"#kind-方法","children":[]}]},{"level":2,"title":"12.3. Display，一个递归的值打印器","slug":"_12-3-display-一个递归的值打印器","link":"#_12-3-display-一个递归的值打印器","children":[]},{"level":2,"title":"12.4. 示例: 编码为S表达式","slug":"_12-4-示例-编码为s表达式","link":"#_12-4-示例-编码为s表达式","children":[]},{"level":2,"title":"12.5. 通过reflect.Value修改值","slug":"_12-5-通过reflect-value修改值","link":"#_12-5-通过reflect-value修改值","children":[]},{"level":2,"title":"12.7. 获取结构体字段标签","slug":"_12-7-获取结构体字段标签","link":"#_12-7-获取结构体字段标签","children":[]},{"level":2,"title":"12.8. 显示一个类型的方法集","slug":"_12-8-显示一个类型的方法集","link":"#_12-8-显示一个类型的方法集","children":[]}],"git":{"createdTime":1722415943000,"updatedTime":1725442128000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":2}]},"readingTime":{"minutes":20.01,"words":6002},"filePathRelative":"develop/Go/gopl/ch12.md","localizedDate":"2024年7月31日","excerpt":"\\n<h2>12.1. 为何需要反射?</h2>\\n<p>在 Go 语言中，反射（reflection）是一种强大的机制，允许程序在运行时检查类型信息、操作变量、调用方法等。Go 的反射包 <code>reflect</code> 提供了一组功能，让程序能够动态地检查和操作变量、结构体、接口等信息。</p>\\n<p>以下是一些常见情况下使用反射的例子和原因：</p>\\n<ol>\\n<li><strong>通用编程</strong>：反射允许编写通用代码，能够在运行时处理<strong>不同类型的数据结构，而不需要提前知道其类型。</strong></li>\\n<li><strong>序列化和反序列化</strong>：通过反射，可以动态地将结构体转换为 JSON、XML 等格式，或者将这些格式转换回结构体。</li>\\n<li><strong>动态调用方法</strong>：反射允许程序在运行时调用结构体的方法，而不需要提前知道这些方法的名称。</li>\\n<li><strong>类型检查和类型断言</strong>：反射可以用于检查变量的类型，并进行类型断言，特别在处理接口时非常有用。</li>\\n<li><strong>代码生成</strong>：某些情况下，反射可以用于生成代码，例如在 ORM（对象关系映射）库中动态创建数据库查询语句。</li>\\n</ol>"}');export{k as comp,m as data};
