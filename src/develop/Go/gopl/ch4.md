---
category: Go
tag: Go
---

# 04. GO语言-复合数据类型

* 主要讨论四种类型——数组、slice、map和结构体
* 演示如何使用结构体来解码和编码到对应JSON格式的数据，并且通过结合使用模板来生成HTML页面。

数组和结构体是聚合类型，它们的值由许多元素或成员字段的值组成。

数组是由同构的元素组成——每个数组元素都是完全相同的类型——结构体则是由异构的元素组成的。数组和结构体都是有固定内存大小的数据结构。相比之下，slice和map则是动态的数据结构，它们将根据需要动态增长。

## 4.1. 数组

* 数组是一个由固定长度的特定类型元素组成的序列，一个数组可以由零个或多个元素组成。
* 数组的每个元素可以通过索引下标来访问，索引下标的范围是从0开始到数组长度减1的位置。
* 内置的len函数将返回数组中元素的个数。

因为数组的长度是固定的，因此在Go语言中很少直接使用数组。和数组对应的类型是Slice（切片），它是可以增长和收缩的动态序列，slice功能也更灵活，但是要理解slice工作原理的话需要先理解数组。

### 数组定义

默认情况下，数组的每个元素都被初始化为元素类型对应的零值，对于数字类型来说就是0。

```Go
var a [3]int             // array of 3 integers
fmt.Println(a[0])        // print the first element
fmt.Println(a[len(a)-1]) // print the last element, a[2]

// Print the indices and elements.
for i, v := range a {
    fmt.Printf("%d %d\n", i, v)
}

// Print the elements only.
for _, v := range a {
    fmt.Printf("%d\n", v)
}
```

我们也可以使用数组字面值语法用一组值来初始化数组：

```Go
	var q [3]int = [3]int{1, 2, 3}
	var r [3]int = [3]int{1, 2}
	fmt.Println(q[1]) // "2"
	fmt.Println(r[2]) // "0"
```

如果在数组的长度位置出现的是“...”省略号，则表示数组的长度是根据初始化值的个数来计算。因此，上面q数组的定义可以简化为

```Go
q := [...]int{1, 2, 3}
fmt.Printf("%T\n", q) // "[3]int"
```

### 数组长度

数组的长度是数组类型的一个组成部分，因此[3]int和[4]int是两种不同的数组类型。数组的长度必须是常量表达式，因为数组的长度需要在编译阶段确定。

```Go
q := [3]int{1, 2, 3}
q = [4]int{1, 2, 3, 4} // compile error: cannot assign [4]int to [3]int
```

### 数组-键值对

上面的形式是直接提供顺序初始化值序列，但是也可以指定一个索引和对应值列表的方式初始化，就像下面这样：

```Go
type Currency int

const (
    USD Currency = iota // 美元
    EUR                 // 欧元
    GBP                 // 英镑
    RMB                 // 人民币
)

symbol := [...]string{USD: "$", EUR: "€", GBP: "￡", RMB: "￥"}

fmt.Println(RMB, symbol[RMB]) // "3 ￥"
```

在这种形式的数组字面值形式中，初始化索引的顺序是无关紧要的，而且没用到的索引可以省略，和前面提到的规则一样，未指定初始值的元素将用零值初始化。例如，

```Go
r := [...]int{99: -1}
// 定义了一个含有100个元素的数组r，最后一个元素被初始化为-1，其它元素都是用0初始化。
```

![image-20240422173219723](./img/ch4/image-20240422173219723.png)

### 数组比较

只有数组的数据类型完全相同，两个数组才能比较；可以直接通过==比较运算符来比较两个数组，只有当两个数组的所有元素都是相等的时候数组才是相等的。不相等比较运算符!=遵循同样的规则。

```Go
a := [2]int{1, 2}
b := [...]int{1, 2}
c := [2]int{1, 3}
fmt.Println(a == b, a == c, b == c) // "true false false"
d := [3]int{1, 2}
fmt.Println(a == d) // compile error: cannot compare [2]int == [3]int
```

下面的例子用SHA256算法分别生成“x”和“X”两个信息的摘要：

```Go
import "crypto/sha256"

func main() {
    c1 := sha256.Sum256([]byte("x"))
    c2 := sha256.Sum256([]byte("X"))
    // Printf函数的%x以十六进制 %t打印布尔型数据，%T用于显示一个值对应的数据类型。
    fmt.Printf("%x\n%x\n%t\n%T\n", c1, c2, c1 == c2, c1)
    // Output:
    // 2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881
    // 4b68ab3847feda7d6c62c1fbcbeebfa35eab7351ed5e78f4ddadea5df64b8015
    // false
    // [32]uint8
}
```

如果写成这样

```go
fmt.Printf("%v\n%v\n%v\n%T\n", c1, c2, c1 == c2, c1)
```

将会输出如下，所以能够看出，c1 c2本身是一个十进制数组。

![image-20240422175054597](./img/ch4/image-20240422175054597.png)

上面例子中，两个消息虽然只有一个字符的差异，但是生成的消息摘要则几乎有一半的bit位是不相同的。

### 练习 4.1

编写一个函数，计算两个SHA256哈希码中不同bit的数目。（参考2.6.2节的PopCount函数。)

```go

// NOTE: 练习 4.1： 编写一个函数，计算两个SHA256哈希码中不同bit的数目。

type SHA256 [32]byte

func main() {
	md1, md2 := SHA256{14: 252, 31: 8}, SHA256{31: 5}
	bitDiff(&md1, &md2)
}

func bitDiff(md1, md2 *SHA256) int {
	diffCnt := 0
	fmt.Println("  sha1  \t  sha2 ")
	for i := range md1 {
		b1 := md1[i]
		b2 := md2[i]
		for i := 0; i < 8; i++ {
			// NOTE: get last bit of a byte
			lb1, lb2 := (b1>>i)&1, (b2>>i)&1
			if (lb1 ^ lb2) == 1 {
				diffCnt++
			}
		}
		fmt.Printf("%08b\t%08b\n", b1, b2)
	}
	fmt.Printf("bit diff count: %d\n", diffCnt)
	return diffCnt
}

```

### 练习 4.2

 编写一个程序，默认情况下打印标准输入的SHA256编码，并支持通过命令行flag定制，输出SHA384或SHA512哈希算法。flag包：[flag package - flag - Go Packages](https://pkg.go.dev/flag)

```go
package main

import (
	"crypto/sha256"
	"crypto/sha512"
	"flag"
	"fmt"
	"os"
)

// NOTE: 练习 4.2： 编写一个程序，默认情况下打印标准输入的SHA256编码，并支持通过命令行flag定制，输出SHA384或SHA512哈希算法。
func main() {
	var shaType string
	// 命令参数shaType，默认SHA256
	flag.StringVar(&shaType, "shaType", "SHA256", "SHA256（default）or SHA384 or SHA512")
	flag.Parse()
	for _, s := range flag.Args() {
		resultStr := ""
		switch shaType {
		case "SHA256":
			c := sha256.Sum256([]byte(s))
			resultStr = fmt.Sprintf("%x", c)
		case "SHA384":
			c := sha512.Sum384([]byte(s))
			resultStr = fmt.Sprintf("%x", c)
		case "SHA512":
			c := sha512.Sum512([]byte(s))
			resultStr = fmt.Sprintf("%x", c)
		default:
			fmt.Printf("Hash Type %s 不支持，SHA256（default）or SHA384 or SHA512\n", shaType)
			os.Exit(1)
		}
		fmt.Printf("str:%s\tshaType:%s\t sha:%s\n", s, shaType, resultStr)
	}
}

```

## 4.2. Slice

#### Slice结构

数组是一个由固定长度的特定类型元素组成的序列，而Slice（切片）代表变长的序列，序列中每个元素都有相同的类型。slice类型一般写作`[]T`，其中T代表slice中元素的类型。

一个slice由三个部分构成：指针、长度和容量。指针指向第一个slice元素对应的底层数组元素的地址；长度对应slice中元素的数目，长度不能超过容量；容量一般是从slice的开始位置到底层数据的结尾位置。内置的len和cap函数分别返回slice的长度和容量。

#### 切片操作

数组这样定义

```Go
months := [...]string{1: "January", /* ... */, 12: "December"}
```

一月份是months[1]，十二月份是months[12]。这里声明数组时直接跳过第0个元素，第0个元素会被自动初始化为空字符串。

slice的切片操作`s[i:j]`，其中`0 ≤ i≤ j≤ cap(s)`，表示创建一个新的slice，引用s的从第i个元素开始到第j-1个元素的子序列。新的slice将只有j-i个元素。如果i位置的索引被省略的话将使用0代替，如果j位置的索引被省略的话将使用len(s)代替。例如

* months[1:13]切片操作将引用全部有效的月份，和months[1:]操作等价；
* months[:]切片操作则是引用整个数组。

```go
Q2 := months[4:7]
summer := months[6:9]
fmt.Println(Q2)     // ["April" "May" "June"]
fmt.Println(summer) // ["June" "July" "August"]

// 两个slice都包含了六月份
for _, s := range summer {
    for _, q := range Q2 {
        if s == q {
            fmt.Printf("%s appears in both\n", s)
        }
    }
}
```

字符串的切片操作和`[]byte`字节类型切片的切片操作是类似的，都写作`x[m:n]`，`x[m:n]`切片操作对于字符串则生成一个新字符串，如果x是`[]byte`的话则生成一个新的`[]byte`。

#### slice异常

如果切片操作超出cap(s)的上限将导致一个panic异常，但是超出len(s)则是意味着扩展了slice，因为新slice的长度会变大：

```go
fmt.Println(summer[:20]) // panic: out of range

endlessSummer := summer[:5] // extend a slice (within capacity)
fmt.Println(endlessSummer)  // "[June July August September October]"
```


#### slice反转

> slice值包含指向第一个slice元素的指针，因此向函数传递slice将允许在函数内部修改底层数组的元素。换句话说，复制一个slice只是对底层的数组创建了一个新的slice别名（§2.3.2）。

下面的reverse函数在原内存空间将`[]int`类型的slice反转，而且它可以用于任意长度的slice。一种将slice元素循环向左旋转n个元素的方法是三次调用reverse反转函数如果是向右循环旋转，则将第三个函数调用移到第一个调用位置就可以了。）

```go

// reverse reverses a slice of ints in place.
func reverse(s []int) {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}
func main() {
	// 反转
	a := [...]int{0, 1, 2, 3, 4, 5}
	reverse(a[:])
	fmt.Println(a) // "[5 4 3 2 1 0]"
	// 将slice元素循环向左旋转n个元素
	s := []int{0, 1, 2, 3, 4, 5}
	// Rotate s left by two positions.
	reverse(s[:2])
	reverse(s[2:])
	reverse(s)
	fmt.Println(s) // "[2 3 4 5 0 1]"
}

```

#### slice和数组

**初始化差异：**slice和数组的字面值语法很类似，它们都是用花括弧包含一系列的初始化元素，但是slice并没有指明序列的长度，这会隐式地创建一个合适大小的数组，然后slice的指针指向底层的数组。

**字面值初始化：**和数组字面值一样，slice的字面值也可以按顺序指定初始化值序列，或者是通过索引和元素值指定，或者用两种风格的混合语法初始化。

#### slice比较

**比较上的差异：**和数组不同的是，slice之间不能比较，不能使用==操作符来判断两个slice是否含有全部相等元素。标准库提供了`bytes.Equal`函数来判断两个`[]byte`型slice是否相等，其他类型的slice必须自己展开每个元素进行比较：

```go
func equal(x, y []string) bool {
    if len(x) != len(y) {
        return false
    }
    for i := range x {
        if x[i] != y[i] {
            return false
        }
    }
    return true
}

```

![image-20240424220922040](./img/ch4/image-20240424220922040.png)

slice唯一合法的比较操作是和nil比较，例如：

```Go
if summer == nil { /* ... */ }
```

一个零值的slice等于nil。一个nil值的slice并没有底层数组。一个nil值的slice的长度和容量都是0，但是也有非nil值的slice的长度和容量也是0的，例如`[]int{}`或`make([]int, 3)[3:]`。与任意类型的nil值一样，我们可以用`[]int(nil)`类型转换表达式来生成一个对应类型slice的nil值。

```go
var s []int    // len(s) == 0, s == nil
s = nil        // len(s) == 0, s == nil
s = []int(nil) // len(s) == 0, s == nil
s = []int{}    // len(s) == 0, s != nil

```

如果你需要测试一个slice是否是空的，使用`len(s) == 0`来判断，而不应该用`s == nil`来判断。

#### make函数

内置的make函数创建一个指定元素类型、长度和容量的slice。容量部分可以省略，在这种情况下，容量将等于长度。

```Go
make([]T, len)
make([]T, len, cap) // same as make([]T, cap)[:len]
```

在底层，make创建了一个匿名的数组变量，然后返回一个slice；只有通过返回的slice才能引用底层匿名的数组变量。在第一种语句中，slice是整个数组的view。在第二个语句中，slice只引用了底层数组的前len个元素，但是容量将包含整个的数组。额外的元素是留给未来的增长用的。

### 4.2.1. append函数

内置的append函数用于向slice追加元素：

```Go
var runes []rune
for _, r := range "Hello, 世界" {
    runes = append(runes, r)
}
fmt.Printf("%q\n", runes) // "['H' 'e' 'l' 'l' 'o' ',' ' ' '世' '界']"
```

在循环中使用append函数构建一个由九个rune字符构成的slice，当然对应这个特殊的问题我们可以通过Go语言内置的`[]rune("Hello, 世界")`转换操作完成。

```go
func appendInt(x []int, y int) []int {
    var z []int
    zlen := len(x) + 1
    if zlen <= cap(x) {
        // There is room to grow.  Extend the slice.
        z = x[:zlen]
    } else {
        // There is insufficient space.  Allocate a new array.
        // Grow by doubling, for amortized linear complexity.
        zcap := zlen
        if zcap < 2*len(x) {
            zcap = 2 * len(x)
        }
        z = make([]int, zlen, zcap)
        copy(z, x) // a built-in function; see text
    }
    z[len(x)] = y
    return z
}
```

每次调用appendInt函数，必须先检测slice底层数组是否有足够的容量来保存新添加的元素。如果有足够空间的话，直接扩展slice（依然在原有的底层数组之上），将新添加的y元素复制到新扩展的空间，并返回slice。因此，输入的x和输出的z共享相同的底层数组。如果没有足够的增长空间的话，appendInt函数则会先分配一个足够大的slice用于保存新的结果，先将输入的x复制到新的空间，然后添加y元素。结果z和输入的x引用的将是不同的底层数组。

![image-20240425175118604](./img/ch4/image-20240425175118604.png)

内置的append函数可能使用比appendInt更复杂的内存扩展策略，并不知道append调用是否导致了内存的重新分配，也不能确认在原先的slice上的操作是否会影响到新的slice。通常是将append返回的结果直接赋值给输入的slice变量：

```go
runes = append(runes, r)
```

更新slice变量不仅对调用append函数是必要的，实际上对应任何可能导致长度、容量或底层数组变化的操作都是必要的。要正确地使用slice，需要记住尽管底层数组的元素是间接访问的，但是slice对应结构体本身的指针、长度和容量部分是直接访问的。要更新这些信息需要像上面例子那样一个显式的赋值操作。从这个角度看，slice并不是一个纯粹的引用类型，它实际上是一个类似下面结构体的聚合类型：

```go
type IntSlice struct {
    ptr      *int
    len, cap int
}
```

置的append函数可以追加多个元素，甚至追加一个slice：

```go
var x []int
x = append(x, 1)
x = append(x, 2, 3)
x = append(x, 4, 5, 6)
x = append(x, x...) // append the slice x
fmt.Println(x)      // "[1 2 3 4 5 6 1 2 3 4 5 6]"

```

### 4.2.2. Slice内存技巧

给定一个字符串列表，下面的nonempty函数将在原有slice内存空间之上返回不包含空字符串的列表：

```go
// Nonempty is an example of an in-place slice algorithm.
package main

import "fmt"

func nonempty(strings []string) []string {
	i := 0
	for _, s := range strings {
		if s != "" {
			strings[i] = s
			i++
		}
	}
	return strings[:i]
}
```

输入的slice和输出的slice共享一个底层数组。这可以避免分配另一个数组，不过原来的数据将可能会被覆盖，正如下面两个打印语句看到的那样：

```go
data := []string{"one", "", "three"}
fmt.Printf("%q\n", nonempty(data)) // ["one" "three"]
fmt.Printf("%q\n", data)           // ["one" "three" "three"]
```


因此我们通常会这样使用nonempty函数：`data = nonempty(data)`。

nonempty函数也可以使用append函数实现：

```go
func nonempty2(strings []string) []string {
	// NOTE: strings[:0]表示一个原始数组strings的切片，但切片长度是0，容量是数组的cap
	out := strings[:0] // zero-length slice of original
	for _, s := range strings {
		if s != "" {
			out = append(out, s)
		}
	}
	return out
}
```

一个slice可以用来模拟一个stack。最初给定的空slice对应一个空的stack，然后可以使用append函数将新的值压入stack：

```Go
stack = append(stack, v) // push v
```

stack的顶部位置对应slice的最后一个元素：

```Go
top := stack[len(stack)-1] // top of stack
```

通过收缩stack可以弹出栈顶的元素

```Go
stack = stack[:len(stack)-1] // pop
```

要删除slice中间的某个元素并保存原有的元素顺序，可以通过内置的copy函数将后面的子slice向前依次移动一位完成：

```Go
func remove(slice []int, i int) []int {
    copy(slice[i:], slice[i+1:])
    return slice[:len(slice)-1]
}

func main() {
    s := []int{5, 6, 7, 8, 9}
    fmt.Println(remove(s, 2)) // "[5 6 8 9]"
}
```

如果删除元素后不用保持原来顺序的话，我们可以简单的用最后一个元素覆盖被删除的元素：

```Go
func remove(slice []int, i int) []int {
    slice[i] = slice[len(slice)-1]
    return slice[:len(slice)-1]
}

func main() {
    s := []int{5, 6, 7, 8, 9}
    fmt.Println(remove(s, 2)) // "[5 6 9 8]
}
```

### 练习 4.3

 重写reverse函数，使用数组指针代替slice。

```go
func main() {
	a := [...]int{0, 1, 2, 3, 4, 5}
	reverse(&a)
	fmt.Println(a)
}
func reverse(s *[6]int) {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}
```

### 练习 4.4

编写一个rotate函数，通过一次循环完成旋转。

```go
func main() {
	s := []int{0, 1, 2, 3, 4, 5}
	fmt.Println(rotate(s, 4))
}

func rotate(s []int, rotateTimes int) []int {
	//var result []int
	result := s
	for i := 0; i < rotateTimes; i++ {
		result = result[1:]
		result = append(result, result[0])
		//s = result
	}
	return result
}
```



### 练习 4.5

写一个函数在原地完成消除[]string中相邻重复的字符串的操作。

```go

func main() {
	s := []string{"c", "a", "a", "a", "i"}
	fmt.Println(uniqueSlice(s))
}

func uniqueSlice(strSlice []string) []string {
	tempStr := ""
	for i := 0; i < len(strSlice); i++ {
		if tempStr == strSlice[i] {
			strSlice = append(strSlice[:i], strSlice[i+1:]...)
			// 重复的话，长度要减一了
			i--
		}
		tempStr = strSlice[i]
	}
	return strSlice
}
```



### 练习 4.6

编写一个函数，原地将一个UTF-8编码的[]byte类型的slice中相邻的空格（参考unicode.IsSpace）替换成一个空格返回

```go

func main() {
	rs := []rune{'H', 'e', 'l', 'l', 'o', ' ', ' ', ' ', '世', '界'}
	fmt.Println("input string:\t", string(rs))
	bs := []byte(string(rs))
	fmt.Println("output string:\t", string(uniqueSpaceSlice(bs)))
}

func uniqueSpaceSlice(bs []byte) []byte {
	fmt.Println("input []bytes:\t", bs)
	for i := 0; i < len(bs); i++ {
		if unicode.IsSpace(rune(bs[i])) {
			bs = append(bs[:i], bs[i+1:]...)
			// 如果是空格就删掉，删掉以后就会长度变短，i要减1
			i--
		}
	}
	fmt.Println("output []bytes:\t", bs)
	return bs
}

```



### 练习 4.7

修改reverse函数用于原地反转UTF-8编码的[]byte。是否可以不用分配额外的内存？

```go
func main() {
	s := []byte("Hello 世界")

	fmt.Println(string(reverse(s)))
}
func reverse(bs []byte) []byte {
	// 先把byte数组转成rune数组
	runes := []rune(string(bs))
	// 然后正常些，和原本的reverse函数一样
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return []byte(string(runes))
}

```





## 4.3. map

在Go语言中，一个map就是一个哈希表的引用。map类型可以写为`map[K]V`，其中K和V分别对应key和value。map中所有的key都有相同的类型，所有的value也有着相同的类型，但是key和value之间可以是不同的数据类型。K对应的key必须是支持==比较运算符的数据类型，所以map可以通过测试key是否相等来判断是否已经存在。虽然浮点数类型也是支持相等运算符比较的，但key尽量不用浮点数，可能出现的NaN和任何浮点数都不相等。

### 操作map

内置的make函数可以创建一个map：

```Go
ages := make(map[string]int) // mapping from strings to ints
```

我们也可以用map字面值的语法创建map，同时还可以指定一些最初的key/value：

```Go
ages := map[string]int{
    "alice":   31,
    "charlie": 34,
}
```

这相当于

```Go
ages := make(map[string]int)
ages["alice"] = 31
ages["charlie"] = 34
```

因此，另一种创建空的map的表达式是`map[string]int{}`。

使用内置的delete函数可以删除元素：

```Go
delete(ages, "alice") // remove element ages["alice"]
```

即使这些元素不在map中也没有关系，如果一个查找失败将返回value类型对应的零值，例如

```Go
func main() {
	//ages := make(map[string]int)
	ages := map[string]int{
		"alice":   31,
		"charlie": 34,
	}
	agesBob := ages["bob"]
	fmt.Println(agesBob) // 0
	ages["bob"] = ages["bob"] + 1
	fmt.Println(ages["bob"]) // 1
	fmt.Println(ages)        // map[alice:31 bob:1 charlie:34]
}
```

![image-20240426180246893](./img/ch4/image-20240426180246893.png)

简短赋值语法也可以用在map上：

```Go
ages["bob"] += 1
ages["bob"]++
```

但是map中的元素并不是一个变量，因此我们不能对map的元素进行取址操作：

```Go
_ = &ages["bob"] // compile error: cannot take address of map element
```

禁止对map元素取址的原因是map可能随着元素数量的增长而重新分配更大的内存空间，从而可能导致之前的地址无效。
