# 7. 接口

## 7.1. 接口是合约

Go 语言中的接口是一种抽象类型，它定义了一组方法。任何类型只要实现了接口定义的所有方法，就称之为实现了该接口。接口可以用于定义行为的规范，从而实现代码的解耦和复用。

**接口是合约**的意思是指，接口定义了一组方法的规范，就像一份合约一样，规定了某些类型必须遵守的行为。任何类型只要实现了接口定义的所有方法，就相当于签署了这份合约，承诺会遵守约定的行为。

在 Go 语言中，接口（interface）是一种类型，用于定义方法集合。通过接口，你可以定义一组方法的契约，并使不同的类型实现这些方法，从而实现多态性。

下面是一个使用接口的简单示例：

```go
package main

import "fmt"

// 定义一个接口
type Shape interface {
    Area() float64
}

// 定义一个矩形类型
type Rectangle struct {
    Width  float64
    Height float64
}

// 实现接口方法
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

// 定义一个圆形类型
type Circle struct {
    Radius float64
}

// 实现接口方法
func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}

func main() {
    // 创建矩形对象
    rectangle := Rectangle{Width: 4, Height: 5}
    // 创建圆形对象
    circle := Circle{Radius: 3}

    // 使用接口调用方法
    shapes := []Shape{rectangle, circle}
    for _, shape := range shapes {
        fmt.Println("Area:", shape.Area())
    }
}
```

在上述示例中，我们定义了一个 `Shape` 接口，它包含一个 `Area()` 方法。然后，我们创建了两个类型 `Rectangle` 和 `Circle`，它们分别实现了 `Shape` 接口的 `Area()` 方法。

在 `main` 函数中，我们创建了一个包含 `Shape` 接口的切片 `shapes`，并将 `rectangle` 和 `circle` 对象添加到切片中。然后，通过使用接口调用 `Area()` 方法，我们可以对不同的类型进行多态性操作，而无需关注具体的类型。

运行该代码将输出矩形和圆形的面积。

请注意，接口在 Go 语言中还有其他用途，如类型断言和空接口等。上述示例只是接口的一个基本用法示例。根据实际需求，你可以在代码中使用接口来达到更灵活和抽象的目的。



接口在 Go 中有多个用途：

1. **多态**：接口允许不同的类型通过共享相同的行为来进行替换。
2. **解耦**：接口提供了一种方式来定义函数和方法应该使用的抽象类型，而不必关心具体的实现类型。
3. **扩展性**：通过接口，可以轻松地为现有的类型添加新的行为，而不需要修改原有类型的定义。

### 练习 7.1

使用来自ByteCounter的思路，实现一个针对单词和行数的计数器。你会发现bufio.ScanWords非常的有用。

```go
// 练习 7.1： 使用来自ByteCounter的思路，实现一个针对单词和行数的计数器。你会发现bufio.ScanWords非常的有用。

package main

import (
	"bufio"
	"bytes"
	"fmt"
)

type WordCounter int
type LineCounter int

func (c *WordCounter) Write(p []byte) (int, error) {
	var sc = bufio.NewScanner(bytes.NewReader(p))
	sc.Split(bufio.ScanWords)
	for sc.Scan() {
		*c++
	}
	return int(*c), sc.Err()
}

func (c *LineCounter) Write(p []byte) (int, error) {
	var sc = bufio.NewScanner(bytes.NewReader(p))
	sc.Split(bufio.ScanLines)
	for sc.Scan() {
		*c++
	}
	return int(*c), sc.Err()
}

func main() {
	str := "hello world\nfoo bar\nbaz\n"
	var wc WordCounter
	wc.Write([]byte(str))
	fmt.Println("Word count:", wc)
	var lc LineCounter
	lc.Write([]byte(str))
	fmt.Println("Line count:", lc)

}

```



### 练习 7.2

写一个带有如下函数签名的函数CountingWriter，传入一个io.Writer接口类型，返回一个把原来的Writer封装在里面的新的Writer类型和一个表示新的写入字节数的int64类型指针。

```go
func CountingWriter(w io.Writer) (io.Writer, *int64)
```



```go
type countWriter struct {
	w io.Writer
	c *int64
}

func (c countWriter) Write(p []byte) (n int, err error) {
	var sc = bufio.NewScanner(bytes.NewReader(p))
	sc.Split(bufio.ScanWords)
	for sc.Scan() {
		n++
		*c.c++
	}
	return int(n), nil
}

func CountingWriter(w io.Writer) (io.Writer, *int64) {
	var c int64
	return &countWriter{w, &c}, &c
}
```



### 练习 7.3

*为在gopl.io/ch4/treesort（§4.4）中的*tree类型实现一个String方法去展示tree类型的值序列。

```go
type tree struct {
	value       int
	left, right *tree
}

func (tree *tree) String() string {
	var values []int
	values = appendValues(values, tree)
	return fmt.Sprint(values)
}

// Sort sorts values in place.
func Sort(values []int) *tree {
	var root *tree
	for _, v := range values {
		root = add(root, v)
	}
	appendValues(values[:0], root)
	return root
}

// appendValues appends the elements of t to values in order
// and returns the resulting slice.
func appendValues(values []int, t *tree) []int {
	if t != nil {
		values = appendValues(values, t.left)
		values = append(values, t.value)
		values = appendValues(values, t.right)
	}
	return values
}

func add(t *tree, value int) *tree {
	if t == nil {
		// Equivalent to return &tree{value: value}.
		t = new(tree)
		t.value = value
		return t
	}
	if value < t.value {
		t.left = add(t.left, value)
	} else {
		t.right = add(t.right, value)
	}
	return t
}

func main() {
	var m = []int{1, 4, 7, 9, 3, 5, 7, 2, 4}
	t := Sort(m)
	fmt.Println(m)
	fmt.Println(t.String())
	fmt.Println(t)

}
```







## 7.2. 接口类型



接口类型具体描述了一系列方法的集合，一个实现了这些方法的具体类型是这个接口类型的实例。

io.Writer类型是用得最广泛的接口之一，因为它提供了所有类型的写入bytes的抽象，包括文件类型，内存缓冲区，网络链接，HTTP客户端，压缩工具，哈希等等。io包中定义了很多其它有用的接口类型。Reader可以代表任意可以读取bytes的类型，Closer可以是任意可以关闭的值，例如一个文件或是网络链接。（到现在你可能注意到了很多Go语言中单方法接口的命名习惯）

```go
package io
type Reader interface {
    Read(p []byte) (n int, err error)
}
type Closer interface {
    Close() error
}
```

再往下看，我们发现有些新的接口类型通过组合已有的接口来定义。下面是两个例子：

```go
type ReadWriter interface {
    Reader
    Writer
}
type ReadWriteCloser interface {
    Reader
    Writer
    Closer
}
```

上面用到的语法和结构内嵌相似，我们可以用这种方式以一个简写命名一个接口，而不用声明它所有的方法。这种方式称为接口内嵌。尽管略失简洁，我们可以像下面这样，不使用内嵌来声明io.ReadWriter接口。

```go
type ReadWriter interface {
    Read(p []byte) (n int, err error)
    Write(p []byte) (n int, err error)
}
```

或者甚至使用一种混合的风格：

```go
type ReadWriter interface {
    Read(p []byte) (n int, err error)
    Writer
}
```

上面3种定义方式都是一样的效果。方法顺序的变化也没有影响，唯一重要的就是这个集合里面的方法。

### 练习 7.4

strings.NewReader函数通过读取一个string参数返回一个满足io.Reader接口类型的值（和其它值）。实现一个简单版本的NewReader，用它来构造一个接收字符串输入的HTML解析器（§5.2）

```go
```



**练习 7.5：** io包里面的LimitReader函数接收一个io.Reader接口类型的r和字节数n，并且返回另一个从r中读取字节但是当读完n个字节后就表示读到文件结束的Reader。实现这个LimitReader函数：

```go
func LimitReader(r io.Reader, n int64) io.Reader
```
