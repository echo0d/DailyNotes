import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as d,o as p}from"./app-Bkx5eYAF.js";const n={};function t(l,e){return p(),c("div",null,[...e[0]||(e[0]=[d(`<h1 id="_10-c语言-内存管理" tabindex="-1"><a class="header-anchor" href="#_10-c语言-内存管理"><span>10. C语言-内存管理</span></a></h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介"><span>1 简介</span></a></h2><p>C 语言的内存管理，分成两部分。一部分是系统管理的，另一部分是用户手动管理的。</p><p>系统管理的内存，主要是函数内部的变量（局部变量）。这部分变量在函数运行时进入内存，函数运行结束后自动从内存卸载。这些变量存放的区域称为”栈“（stack），”栈“所在的内存是系统自动管理的。</p><p>用户手动管理的内存，主要是程序运行的整个过程中都存在的变量（全局变量），这些变量需要用户手动从内存释放。如果使用后忘记释放，它就一直占用内存，直到程序退出，这种情况称为”内存泄漏“（memory leak）。这些变量所在的内存称为”堆“（heap），”堆“所在的内存是用户手动管理的。</p><h2 id="_2-void-指针" tabindex="-1"><a class="header-anchor" href="#_2-void-指针"><span>2 void 指针</span></a></h2><p>前面章节已经说过了，每一块内存都有地址，通过指针变量可以获取指定地址的内存块。指针变量必须有类型，否则编译器无法知道，如何解读内存块保存的二进制数据。但是，向系统请求内存的时候，有时不确定会有什么样的数据写入内存，需要先获得内存块，稍后再确定写入的数据类型。</p><p>为了满足这种需求，C 语言提供了一种不定类型的指针，叫做 void 指针。它只有内存块的地址信息，没有类型信息，等到使用该块内存的时候，再向编译器补充说明，里面的数据类型是什么。</p><p>另一方面，void 指针等同于无类型指针，可以指向任意类型的数据，但是不能解读数据。void 指针与其他所有类型指针之间是互相转换关系，任一类型的指针都可以转为 void 指针，而 void 指针也可以转为任一类型的指针。</p><pre><code>int x = 10;

void* p = &amp;x; // 整数指针转为 void 指针
int* q = p; // void 指针转为整数指针
</code></pre><p>上面示例演示了，整数指针和 void 指针如何互相转换。<code>&amp;x</code>是一个整数指针，<code>p</code>是 void 指针，赋值时<code>&amp;x</code>的地址会自动解释为 void 类型。同样的，<code>p</code>再赋值给整数指针<code>q</code>时，<code>p</code>的地址会自动解释为整数指针。</p><p>注意，由于不知道 void 指针指向什么类型的值，所以不能用<code>*</code>运算符取出它指向的值。</p><pre><code>char a = &#39;X&#39;;
void* p = &amp;a;

printf(&quot;%c\\n&quot;, *p); // 报错
</code></pre><p>上面示例中，<code>p</code>是一个 void 指针，所以这时无法用<code>*p</code>取出指针指向的值。</p><p>void 指针的重要之处在于，很多内存相关函数的返回值就是 void 指针，只给出内存块的地址信息，所以放在最前面进行介绍。</p><h2 id="_3-malloc" tabindex="-1"><a class="header-anchor" href="#_3-malloc"><span>3 malloc()</span></a></h2><p><code>malloc()</code>函数用于分配内存，该函数向系统要求一段内存，系统就在“堆”里面分配一段连续的内存块给它。它的原型定义在头文件<code>stdlib.h</code>。</p><pre><code>void* malloc(size_t size)
</code></pre><p>它接受一个非负整数作为参数，表示所要分配的内存字节数，返回一个 void 指针，指向分配好的内存块。这是非常合理的，因为<code>malloc()</code>函数不知道，将要存储在该块内存的数据是什么类型，所以只能返回一个无类型的 void 指针。</p><p>可以使用<code>malloc()</code>为任意类型的数据分配内存，常见的做法是先使用<code>sizeof()</code>函数，算出某种数据类型所需的字节长度，然后再将这个长度传给<code>malloc()</code>。</p><pre><code>int* p = malloc(sizeof(int));

*p = 12;
printf(&quot;%d\\n&quot;, *p); // 12
</code></pre><p>上面示例中，先为整数类型分配一段内存，然后将整数<code>12</code>放入这段内存里面。这个例子其实不需要使用<code>malloc()</code>，因为 C 语言会自动为整数（本例是<code>12</code>）提供内存。</p><p>有时候为了增加代码的可读性，可以对<code>malloc()</code>返回的指针进行一次强制类型转换。</p><pre><code>int* p = (int*) malloc(sizeof(int));
</code></pre><p>上面代码将<code>malloc()</code>返回的 void 指针，强制转换成了整数指针。</p><p>由于<code>sizeof()</code>的参数可以是变量，所以上面的例子也可以写成下面这样。</p><pre><code>int* p = (int*) malloc(sizeof(*p));
</code></pre><p><code>malloc()</code>分配内存有可能分配失败，这时返回常量<code>NULL</code>。<code>NULL</code>的值为0，是一个无法读写的内存地址，可以理解成一个不指向任何地方的指针。它在包括<code>stdlib.h</code>等多个头文件里面都有定义，所以只要可以使用<code>malloc()</code>，就可以使用<code>NULL</code>。由于存在分配失败的可能，所以最好在使用<code>malloc()</code>之后检查一下，是否分配成功。</p><pre><code>int* p = malloc(sizeof(int));

if (p == NULL) {
  // 内存分配失败
}

// or
if (!p) {
  //...
}
</code></pre><p>上面示例中，通过判断返回的指针<code>p</code>是否为<code>NULL</code>，确定<code>malloc()</code>是否分配成功。</p><p><code>malloc()</code>最常用的场合，就是为数组和自定义数据结构分配内存。</p><pre><code>int* p = (int*) malloc(sizeof(int) * 10);

for (int i = 0; i &lt; 10; i++)
  p[i] = i * 5;
</code></pre><p>上面示例中，<code>p</code>是一个整数指针，指向一段可以放置10个整数的内存，所以可以用作数组。</p><p><code>malloc()</code>用来创建数组，有一个好处，就是它可以创建动态数组，即根据成员数量的不同，而创建长度不同的数组。</p><pre><code>int* p = (int*) malloc(n * sizeof(int));
</code></pre><p>上面示例中，<code>malloc()</code>可以根据变量<code>n</code>的不同，动态为数组分配不同的大小。</p><p>注意，<code>malloc()</code>不会对所分配的内存进行初始化，里面还保存着原来的值。如果没有初始化，就使用这段内存，可能从里面读到以前的值。程序员要自己负责初始化，比如，字符串初始化可以使用<code>strcpy()</code>函数。</p><pre><code>char* p = malloc(4);
strcpy(p, &quot;abc&quot;);
</code></pre><p>上面示例中，字符指针<code>p</code>指向一段4个字节的内存，<code>strcpy()</code>将字符串“abc”拷贝放入这段内存，完成了这段内存的初始化。</p><h2 id="_4-free" tabindex="-1"><a class="header-anchor" href="#_4-free"><span>4 free()</span></a></h2><p><code>free()</code>用于释放<code>malloc()</code>函数分配的内存，将这块内存还给系统以便重新使用，否则这个内存块会一直占用到程序运行结束。该函数的原型定义在头文件<code>stdlib.h</code>里面。</p><pre><code>void free(void* block)
</code></pre><p>上面代码中，<code>free()</code>的参数是<code>malloc()</code>返回的内存地址。下面就是用法实例。</p><pre><code>int* p = (int*) malloc(sizeof(int));

*p = 12;
free(p);
</code></pre><p>注意，分配的内存块一旦释放，就不应该再次操作已经释放的地址，也不应该再次使用<code>free()</code>对该地址释放第二次。</p><p>一个很常见的错误是，在函数内部分配了内存，但是函数调用结束时，没有使用<code>free()</code>释放内存。</p><pre><code>void gobble(double arr[], int n) {
  double* temp = (double*) malloc(n * sizeof(double));
  // ...
}
</code></pre><p>上面示例中，函数<code>gobble()</code>内部分配了内存，但是没有写<code>free(temp)</code>。这会造成函数运行结束后，占用的内存块依然保留，如果多次调用<code>gobble()</code>，就会留下多个内存块。并且，由于指针<code>temp</code>已经消失了，也无法访问这些内存块，再次使用。</p><h2 id="_5-calloc" tabindex="-1"><a class="header-anchor" href="#_5-calloc"><span>5 calloc()</span></a></h2><p><code>calloc()</code>函数的作用与<code>malloc()</code>相似，也是分配内存块。该函数的原型定义在头文件<code>stdlib.h</code>。</p><p>两者的区别主要有两点：</p><p>（1）<code>calloc()</code>接受两个参数，第一个参数是某种数据类型的值的数量，第二个是该数据类型的单位字节长度。</p><pre><code>void* calloc(size_t n, size_t size);
</code></pre><p><code>calloc()</code>的返回值也是一个 void 指针。分配失败时，返回 NULL。</p><p>（2）<code>calloc()</code>会将所分配的内存全部初始化为<code>0</code>。<code>malloc()</code>不会对内存进行初始化，如果想要初始化为<code>0</code>，还要额外调用<code>memset()</code>函数。</p><pre><code>int* p = calloc(10, sizeof(int));

// 等同于
int* p = malloc(sizeof(int) * 10);
memset(p, 0, sizeof(int) * 10);
</code></pre><p>上面示例中，<code>calloc()</code>相当于<code>malloc() + memset()</code>。</p><p><code>calloc()</code>分配的内存块，也要使用<code>free()</code>释放。</p><h2 id="_6-realloc" tabindex="-1"><a class="header-anchor" href="#_6-realloc"><span>6 realloc()</span></a></h2><p><code>realloc()</code>函数用于修改已经分配的内存块的大小，可以放大也可以缩小，返回一个指向新的内存块的指针。如果分配不成功，返回 NULL。该函数的原型定义在头文件<code>stdlib.h</code>。</p><pre><code>void* realloc(void* block, size_t size)
</code></pre><p>它接受两个参数。</p><ul><li><code>block</code>：已经分配好的内存块指针（由<code>malloc()</code>或<code>calloc()</code>或<code>realloc()</code>产生）。</li><li><code>size</code>：该内存块的新大小，单位为字节。</li></ul><p><code>realloc()</code>可能返回一个全新的地址（数据也会自动复制过去），也可能返回跟原来一样的地址。<code>realloc()</code>优先在原有内存块上进行缩减，尽量不移动数据，所以通常是返回原先的地址。如果新内存块小于原来的大小，则丢弃超出的部分；如果大于原来的大小，则不对新增的部分进行初始化（程序员可以自动调用<code>memset()</code>）。</p><p>下面是一个例子，<code>b</code>是数组指针，<code>realloc()</code>动态调整它的大小。</p><pre><code>int* b;

b = malloc(sizeof(int) * 10);
b = realloc(b, sizeof(int) * 2000);
</code></pre><p>上面示例中，指针<code>b</code>原来指向10个成员的整数数组，使用<code>realloc()</code>调整为2000个成员的数组。这就是手动分配数组内存的好处，可以在运行时随时调整数组的长度。</p><p><code>realloc()</code>的第一个参数可以是 NULL，这时就相当于新建一个指针。</p><pre><code>char* p = realloc(NULL, 3490);
// 等同于
char* p = malloc(3490);
</code></pre><p>如果<code>realloc()</code>的第二个参数是<code>0</code>，就会释放掉内存块。</p><p>由于有分配失败的可能，所以调用<code>realloc()</code>以后，最好检查一下它的返回值是否为 NULL。分配失败时，原有内存块中的数据不会发生改变。</p><pre><code>float* new_p = realloc(p, sizeof(*p * 40));

if (new_p == NULL) {
  printf(&quot;Error reallocing\\n&quot;);
  return 1;
}
</code></pre><p>注意，<code>realloc()</code>不会对内存块进行初始化。</p><h2 id="_7-restrict-说明符" tabindex="-1"><a class="header-anchor" href="#_7-restrict-说明符"><span>7 restrict 说明符</span></a></h2><p>声明指针变量时，可以使用<code>restrict</code>说明符，告诉编译器，该块内存区域只有当前指针一种访问方式，其他指针不能读写该块内存。这种指针称为“受限指针”（restrict pointer）。</p><pre><code>int* restrict p;
p = malloc(sizeof(int));
</code></pre><p>上面示例中，声明指针变量<code>p</code>时，加入了<code>restrict</code>说明符，使得<code>p</code>变成了受限指针。后面，当<code>p</code>指向<code>malloc()</code>函数返回的一块内存区域，就意味着，该区域只有通过<code>p</code>来访问，不存在其他访问方式。</p><pre><code>int* restrict p;
p = malloc(sizeof(int));

int* q = p;
*q = 0; // 未定义行为
</code></pre><p>上面示例中，另一个指针<code>q</code>与受限指针<code>p</code>指向同一块内存，现在该内存有<code>p</code>和<code>q</code>两种访问方式。这就违反了对编译器的承诺，后面通过<code>*q</code>对该内存区域赋值，会导致未定义行为。</p><h2 id="_8-memcpy" tabindex="-1"><a class="header-anchor" href="#_8-memcpy"><span>8 memcpy()</span></a></h2><p><code>memcpy()</code>用于将一块内存拷贝到另一块内存。该函数的原型定义在头文件<code>string.h</code>。</p><pre><code>void* memcpy(
  void* restrict dest, 
  void* restrict source, 
  size_t n
);
</code></pre><p>上面代码中，<code>dest</code>是目标地址，<code>source</code>是源地址，第三个参数<code>n</code>是要拷贝的字节数<code>n</code>。如果要拷贝10个 double 类型的数组成员，<code>n</code>就等于<code>10 * sizeof(double)</code>，而不是<code>10</code>。该函数会将从<code>source</code>开始的<code>n</code>个字节，拷贝到<code>dest</code>。</p><p><code>dest</code>和<code>source</code>都是 void 指针，表示这里不限制指针类型，各种类型的内存数据都可以拷贝。两者都有 restrict 关键字，表示这两个内存块不应该有互相重叠的区域。</p><p><code>memcpy()</code>的返回值是第一个参数，即目标地址的指针。</p><p>因为<code>memcpy()</code>只是将一段内存的值，复制到另一段内存，所以不需要知道内存里面的数据是什么类型。下面是复制字符串的例子。</p><pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void) {
  char s[] = &quot;Goats!&quot;;
  char t[100];

  memcpy(t, s, sizeof(s));  // 拷贝7个字节，包括终止符

  printf(&quot;%s\\n&quot;, t);  // &quot;Goats!&quot;

  return 0;
}
</code></pre><p>上面示例中，字符串<code>s</code>所在的内存，被拷贝到字符数组<code>t</code>所在的内存。</p><p><code>memcpy()</code>可以取代<code>strcpy()</code>进行字符串拷贝，而且是更好的方法，不仅更安全，速度也更快，它不检查字符串尾部的<code>\\0</code>字符。</p><pre><code>char* s = &quot;hello world&quot;;

size_t len = strlen(s) + 1;
char *c = malloc(len);

if (c) {
  // strcpy() 的写法
  strcpy(c, s);

  // memcpy() 的写法
  memcpy(c, s, len);
}
</code></pre><p>上面示例中，两种写法的效果完全一样，但是<code>memcpy()</code>的写法要好于<code>strcpy()</code>。</p><p>使用 void 指针，也可以自定义一个复制内存的函数。</p><pre><code>void* my_memcpy(void* dest, void* src, int byte_count) {
  char* s = src;
  char* d = dest;

  while (byte_count--) {
    *d++ = *s++;
  }

  return dest;

}
</code></pre><p>上面示例中，不管传入的<code>dest</code>和<code>src</code>是什么类型的指针，将它们重新定义成一字节的 Char 指针，这样就可以逐字节进行复制。<code>*d++ = *s++</code>语句相当于先执行<code>*d = *s</code>（源字节的值复制给目标字节），然后各自移动到下一个字节。最后，返回复制后的<code>dest</code>指针，便于后续使用。</p><h2 id="_9-memmove" tabindex="-1"><a class="header-anchor" href="#_9-memmove"><span>9 memmove()</span></a></h2><p><code>memmove()</code>函数用于将一段内存数据复制到另一段内存。它跟<code>memcpy()</code>的主要区别是，它允许目标区域与源区域有重叠。如果发生重叠，源区域的内容会被更改；如果没有重叠，它与<code>memcpy()</code>行为相同。</p><p>该函数的原型定义在头文件<code>string.h</code>。</p><pre><code>void* memmove(
  void* dest, 
  void* source, 
  size_t n
);
</code></pre><p>上面代码中，<code>dest</code>是目标地址，<code>source</code>是源地址，<code>n</code>是要移动的字节数。<code>dest</code>和<code>source</code>都是 void 指针，表示可以移动任何类型的内存数据，两个内存区域可以有重叠。</p><p><code>memmove()</code>返回值是第一个参数，即目标地址的指针。</p><pre><code>int a[100];
// ...

memmove(&amp;a[0], &amp;a[1], 99 * sizeof(int));
</code></pre><p>上面示例中，从数组成员<code>a[1]</code>开始的99个成员，都向前移动一个位置。</p><p>下面是另一个例子。</p><pre><code>char x[] = &quot;Home Sweet Home&quot;;

// 输出 Sweet Home Home
printf(&quot;%s\\n&quot;, (char *) memmove(x, &amp;x[5], 10));
</code></pre><p>上面示例中，从字符串<code>x</code>的5号位置开始的10个字节，就是“Sweet Home”，<code>memmove()</code>将其前移到0号位置，所以<code>x</code>就变成了“Sweet Home Home”。</p><h2 id="_10-memcmp" tabindex="-1"><a class="header-anchor" href="#_10-memcmp"><span>10 memcmp()</span></a></h2><p><code>memcmp()</code>函数用来比较两个内存区域。它的原型定义在<code>string.h</code>。</p><pre><code>int memcmp(
  const void* s1,
  const void* s2,
  size_t n
);
</code></pre><p>它接受三个参数，前两个参数是用来比较的指针，第三个参数指定比较的字节数。</p><p>它的返回值是一个整数。两块内存区域的每个字节以字符形式解读，按照字典顺序进行比较，如果两者相同，返回<code>0</code>；如果<code>s1</code>大于<code>s2</code>，返回大于0的整数；如果<code>s1</code>小于<code>s2</code>，返回小于0的整数。</p><pre><code>char* s1 = &quot;abc&quot;;
char* s2 = &quot;acd&quot;;
int r = memcmp(s1, s2, 3); // 小于 0
</code></pre><p>上面示例比较<code>s1</code>和<code>s2</code>的前三个字节，由于<code>s1</code>小于<code>s2</code>，所以<code>r</code>是一个小于0的整数，一般为-1。</p><p>下面是另一个例子。</p><pre><code>char s1[] = {&#39;b&#39;, &#39;i&#39;, &#39;g&#39;, &#39;\\0&#39;, &#39;c&#39;, &#39;a&#39;, &#39;r&#39;};
char s2[] = {&#39;b&#39;, &#39;i&#39;, &#39;g&#39;, &#39;\\0&#39;, &#39;c&#39;, &#39;a&#39;, &#39;t&#39;};

if (memcmp(s1, s2, 3) == 0) // true
if (memcmp(s1, s2, 4) == 0) // true
if (memcmp(s1, s2, 7) == 0) // false
</code></pre><p>上面示例展示了，<code>memcmp()</code>可以比较内部带有字符串终止符<code>\\0</code>的内存区域。</p>`,115)])])}const i=o(n,[["render",t]]),m=JSON.parse('{"path":"/develop/C/10_memory.html","title":"10. C语言-内存管理","lang":"zh-CN","frontmatter":{"tags":["C"],"category":"C","description":"10. C语言-内存管理 1 简介 C 语言的内存管理，分成两部分。一部分是系统管理的，另一部分是用户手动管理的。 系统管理的内存，主要是函数内部的变量（局部变量）。这部分变量在函数运行时进入内存，函数运行结束后自动从内存卸载。这些变量存放的区域称为”栈“（stack），”栈“所在的内存是系统自动管理的。 用户手动管理的内存，主要是程序运行的整个过程中...","head":[["meta",{"property":"og:url","content":"https://echo0d.github.io/DailyNotes/develop/C/10_memory.html"}],["meta",{"property":"og:site_name","content":"echo0d-notes"}],["meta",{"property":"og:title","content":"10. C语言-内存管理"}],["meta",{"property":"og:description","content":"10. C语言-内存管理 1 简介 C 语言的内存管理，分成两部分。一部分是系统管理的，另一部分是用户手动管理的。 系统管理的内存，主要是函数内部的变量（局部变量）。这部分变量在函数运行时进入内存，函数运行结束后自动从内存卸载。这些变量存放的区域称为”栈“（stack），”栈“所在的内存是系统自动管理的。 用户手动管理的内存，主要是程序运行的整个过程中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-11T02:11:10.000Z"}],["meta",{"property":"article:author","content":"echo0d"}],["meta",{"property":"article:tag","content":"C"}],["meta",{"property":"article:modified_time","content":"2025-04-11T02:11:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"10. C语言-内存管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-11T02:11:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"echo0d\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":2,"title":"1 简介","slug":"_1-简介","link":"#_1-简介","children":[]},{"level":2,"title":"2 void 指针","slug":"_2-void-指针","link":"#_2-void-指针","children":[]},{"level":2,"title":"3 malloc()","slug":"_3-malloc","link":"#_3-malloc","children":[]},{"level":2,"title":"4 free()","slug":"_4-free","link":"#_4-free","children":[]},{"level":2,"title":"5 calloc()","slug":"_5-calloc","link":"#_5-calloc","children":[]},{"level":2,"title":"6 realloc()","slug":"_6-realloc","link":"#_6-realloc","children":[]},{"level":2,"title":"7 restrict 说明符","slug":"_7-restrict-说明符","link":"#_7-restrict-说明符","children":[]},{"level":2,"title":"8 memcpy()","slug":"_8-memcpy","link":"#_8-memcpy","children":[]},{"level":2,"title":"9 memmove()","slug":"_9-memmove","link":"#_9-memmove","children":[]},{"level":2,"title":"10 memcmp()","slug":"_10-memcmp","link":"#_10-memcmp","children":[]}],"git":{"createdTime":1742895879000,"updatedTime":1744337470000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":2}]},"readingTime":{"minutes":12.91,"words":3873},"filePathRelative":"develop/C/10_memory.md","localizedDate":"2025年3月25日","excerpt":"","autoDesc":true}');export{i as comp,m as data};
