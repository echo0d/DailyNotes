---
category: Go
tag: Go
---

# 1. 基础收尾

## 1.1. 项目结构

在 Go 语言中，经典的项目结构通常遵循一种约定俗成的布局，这有助于使项目更具可读性和易维护性。以下是一个经典的 Go 项目结构示例：

```
project-root/
|-- cmd/
|   |-- main.go
|
|-- internal/
|   |-- pkg1/
|   |   |-- ...
|   |
|   |-- pkg2/
|   |   |-- ...
|   |
|   |-- ...
|
|-- pkg/
|   |-- pkg3/
|   |   |-- ...
|   |
|   |-- pkg4/
|   |   |-- ...
|   |
|   |-- ...
|
|-- api/
|   |-- http/
|   |   |-- ...
|   |
|   |-- grpc/
|   |   |-- ...
|   |
|   |-- ...
|
|-- configs/
|   |-- config.go
|
|-- deployments/
|   |-- docker/
|   |   |-- Dockerfile
|   |
|   |-- kubernetes/
|   |   |-- ...
|   |
|   |-- ...
|
|-- docs/
|   |-- ...
|
|-- pkg/
|   |-- ...
|
|-- scripts/
|   |-- ...
|
|-- test/
|   |-- ...
|
|-- .gitignore
|-- go.mod
|-- go.sum
|-- README.md
```

- **cmd/**: 包含应用程序的入口点，每个可执行程序应该有一个对应的文件夹。
- **internal/**: 包含项目私有的代码，不希望被外部代码引用。
- **pkg/**: 包含项目的可重用代码包，可以被其他项目引用。
- **api/**: 包含项目的 API 定义，例如 HTTP 和 gRPC 的端点。
- **configs/**: 包含项目的配置文件。
- **deployments/**: 包含部署相关的文件，例如 Dockerfile 和 Kubernetes 配置。
- **docs/**: 包含项目文档和说明。
- **scripts/**: 包含项目的脚本文件。
- **test/**: 包含项目的测试代码。
- **.gitignore**: Git 忽略文件列表。
- **go.mod** 和 **go.sum**: Go modules 文件，用于管理项目依赖。
- **README.md**: 项目的说明文件。

这种结构有助于组织和管理代码，同时也提供了清晰的分层结构和可扩展性。项目结构可能会因项目规模和需求而有所不同，但上述示例代表了一个通用的 Go 项目结构。

## 1.2. defer函数

在 Go 语言中，`defer` 语句用于延迟（defer）函数的执行直到包含 `defer` 语句的函数执行完毕。`defer` 语句允许在函数执行的任何时候注册一个函数调用，该函数会在函数执行完毕时被调用。这种机制通常用于确保资源在函数执行完毕后得到正确释放，以及在函数返回之前执行清理操作。

defer的运行机制决定了无论函数是执行到函数体末尾正常返回，还是在函数体中的某个错误处理分支显式调用return返回，或函数体内部出现panic，已经注册了的deferred函数都会被调度执行。

### **基本语法**

```
func someFunction() {
    defer fmt.Println("This will be executed last")
    
    // Other function logic
}
```

### **示例用途**

**资源释放**：`defer` 经常用于关闭文件、释放锁、关闭数据库连接等操作，确保资源得到正确释放。

```go
func readFile(filename string) {
    file, err := os.Open(filename)
    if err != nil {
        return
    }
    defer file.Close() // 在函数返回前关闭文件
    // 读取文件内容
}
```

**跟踪执行**：`defer` 可以用于跟踪函数的执行情况。

```go
func printStartAndEnd() {
    defer fmt.Println("Function end")
    fmt.Println("Function start")
}
```

**处理错误**：`defer` 可以用于处理错误，确保清理操作在函数返回时执行。

```go
func cleanup() {
    if err := recover(); err != nil {
        // 处理错误
    }
}

func someFunction() {
    defer cleanup()
    // 可能引发 panic 的代码
}
```

`defer` 语句按照后进先出（LIFO）的顺序执行，即最后注册的函数最先执行。这使得 `defer` 在 Go 中成为一个强大而简洁的工具，用于确保资源管理和代码执行顺序的可靠性。

以下是一个示例，展示了一个函数内有多个 `defer` 语句的情况：

```go
package main

import "fmt"

func main() {
    fmt.Println("Start")

    // 第一个 defer，注册的函数将在 main 函数执行结束后执行
    defer fmt.Println("Deferred statement 1")
 	
    fmt.Println("Middle")
    
    // 第二个 defer
    defer func() {
        fmt.Println("Deferred statement 2")
    }()

    fmt.Println("End")
}
```

在这个示例中，`main` 函数内有两个 `defer` 语句，它们分别注册了两个匿名函数。当 `main` 函数执行时，它们会按照 LIFO 的顺序执行。因此，输出顺序将是：

1. `Start`
2. `End`
3. `Middle`
4. `Deferred statement 2`
5. `Deferred statement 1`

### 哪些函数可以defer

Go语言中除了有自定义的函数或方法，还有内置函数。下面是Go语言内置函数的完整列表：

```
append cap close complex copy delete imag len
make new panic print println real recover
```

内置函数是否都能作为deferred函数呢？

append、cap、len、make、new等内置函数是不可以直接作为deferred函数的，而close、copy、delete、print、recover等可以。

对于那些不能直接作为deferred函数的内置函数，我们可以使用一个包裹它的匿名函数来间接满足要求。以append为例：

```go
defer func() {
    _ = append(sl, 11)
}()
```

但这么做有什么实际意义需要开发者自己把握。

## 1.3. receiver参数

Go语言虽然不支持经典的面向对象语法元素，比如类、对象、继承等，Go语言中的方法在声明形式上仅仅多了一个参数，Go称之为receiver参数。receiver参数是方法与类型之间的纽带。Go方法的一般声明形式如下：

```go
func (receiver T/*T) MethodName(参数列表) (返回值列表) {
    // 方法体
}
```

上面方法声明中的T称为receiver的基类型。通过receiver，上述方法被绑定到类型T上。换句话说，上述方法是类型T的一个方法，我们可以通过类型T或*T的实例调用该方法，如下面的伪代码所示：

```go
var t T
t.MethodName(参数列表)

var pt *T = &t
pt.MethodName(参数列表)
```

Go方法具有如下特点。

1）方法名的首字母是否大写决定了该方法是不是导出方法。

2）方法定义要与类型定义放在同一个包内。由此我们可以推出：不能为原生类型（如int、float64、map等）添加方法，只能为自定义类型定义方法（示例代码如下）。

```go
// 错误的做法
func (i int) String() string { // 编译器错误：cannot define new methods on non- local type int
    return fmt.Sprintf("%d", i)
}

// 正确的做法
type MyInt int

func (i MyInt) String() string {
    return fmt.Sprintf("%d", int(i))
}
```

3）每个方法只能有一个receiver参数，不支持多receiver参数列表或变长receiver参数。一个方法只能绑定一个基类型，Go语言不支持同时绑定多个类型的方法。

4）receiver参数的基类型本身不能是指针类型或接口类型，下面的示例展示了这点：

```go
type MyInt *int
func (r MyInt) String() string { // 编译器错误：invalid receiver type MyInt (MyInt  is a pointer type)
    return fmt.Sprintf("%d", *(*int)(r))
}

type MyReader io.Reader
func (r MyReader) Read(p []byte) (int, error) { // 编译器错误：invalid receiver  type MyReader (MyReader is an  interface type)
    return r.Read(p)
}
```

## 1.4. 变长参数函数

在Go语言中，可以使用变长参数函数（variadic functions）来处理可变数量的参数。变长参数函数可以接受任意数量的参数，这些参数被打包成一个切片（slice）传递给函数。这种特性非常有用，特别是当函数需要处理数量不确定的参数时。

下面是一个简单的示例，展示了如何在Go语言中使用变长参数函数：


```go
package main

import "fmt"

// 变长参数函数
func sum(nums ...int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}

func main() {
    // 调用变长参数函数
    fmt.Println(sum(1, 2, 3)) // 输出: 6
    fmt.Println(sum(1, 2, 3, 4, 5)) // 输出: 15

    // 也可以传递切片作为参数
    numbers := []int{1, 2, 3, 4, 5}
    fmt.Println(sum(numbers...)) // 输出: 15
}
```

在上面的示例中，sum函数是一个变长参数函数，它接受任意数量的int类型参数，并返回它们的总和。在main函数中，我们演示了如何调用sum函数并传递不同数量的参数或切片作为参数。

关键点：

在函数参数列表中，使用`...`语法指定一个参数是变长参数。
变长参数在函数内部以切片的形式表示。
可以传递不定数量的参数给变长参数函数。
也可以传递切片给变长参数函数，使用`...`操作符来展开切片。



使用变长参数函数时最容易出现的一个问题是实参与形参不匹配，比如下面这个例子：

```go
// chapter4/sources/variadic_function_2.go

func dump(args ...interface{}) {
    for _, v := range args {
        fmt.Println(v)
    }
}

func main() {
    s := []string{"Tony", "John", "Jim"}
    dump(s...)
}
```

运行这段代码：

```
$ go run variadic_function_2.go
./variadic_function_2.go:14:6: cannot use s (type []string) as type []interface {} in argument to dump
```

我们看到，编译器给出了“类型不匹配”的错误。dump函数的变长参数类型为`...interface{}`，因此匹配该形参的要么是`interface{}`类型的变量，要么为`t...`（t类型为`[]interface{}`）。在例子中给dump传入的实参为`s...`，但s的类型为`[]string`，并非`[]interface{}`，导致不匹配。

这里要注意的是，虽然`string`类型变量可以直接赋值给`interface{}`类型变量，但是`[]string`类型变量并不能直接赋值给`[]interface{}`类型变量。要消除编译错误，我们仅需将变量s的类型换为`[]interface{}`，见下面的代码：

```go

func main() {
    s := []interface{}{"Tony", "John", "Jim"}
    dump(s...)
}

$ go run variadic_function_2.go
Tony
John
Jim
```

不过有个例外，那就是Go内置的append函数，它支持通过下面的方式将字符串附加到一个字节切片后面：

```go
// chapter4/sources/variadic_function_3.go

func main() {
    b := []byte{}
    b = append(b, "hello"...)
    fmt.Println(string(b))
}

$ go run variadic_function_3.go
hello
```

string类型本是不满足类型要求的（append本需要`[]byte...`），这算是Go编译器的一个优化，编译器自动将`string`隐式转换为了`[]byte`。

## 1.5. 模拟函数重载

在Go语言中并不支持像一些其他语言（如C++、Java）中那样的函数重载，也就是不能有多个同名函数但参数列表不同的情况。但是可以模拟函数重载的效果。

* 如果要重载的函数的参数都是相同类型的，仅参数的个数是变化的，那么变长参数函数可以轻松对应；

* 如果参数类型不同且个数可变，那么我们还要结合`interface{}`类型的特性。一个例子：

  ```go
  
  func concat(sep string, args ...interface{}) string {
      var result string
      for i, v := range args {
          if i != 0 {
              result += sep
          }
          switch v.(type) {
          case int, int8, int16, int32, int64,
              uint, uint8, uint16, uint32, uint64:
              result += fmt.Sprintf("%d", v)
          case string:
              result += fmt.Sprintf("%s", v)
          case []int:
              ints := v.([]int)
              for i, v := range ints {
                  if i != 0 {
                      result += sep
                  }
                  result += fmt.Sprintf("%d", v)
              }
          case []string:
              strs := v.([]string)
              result += strings.Join(strs, sep)
          default:
              fmt.Printf("the argument type [%T] is not supported", v)
              return ""
          }
      }
      return result
  }
  
  func main() {
      println(concat("-", 1, 2))
      println(concat("-", "hello", "gopher"))
      println(concat("-", "hello", 1, uint32(2),
          []int{11, 12, 13}, 17,
          []string{"robot", "ai", "ml"},
          "hacker", 33))
  }
  ```

  在上面这个例子中，我们定义了一个concat函数，该函数支持接受任意数量的整型、字符串、整型切片、字符串切片参数，并将输入的参数通过分隔符（sep）连接在一起。看main函数中对concat的调用，是不是有一种调用重载函数的感觉。

## 1.6. 功能选项

在Go语言中，功能选项（Options）模式是一种常见的设计模式，用于在函数或方法中传递可变数量的配置选项。这种模式在标准库和许多第三方库中被广泛应用，可以使函数的参数更加灵活和可扩展。实现功能选项的一般方法：

* 定义选项类型：通常是一个函数类型，它接受并修改某个配置选项。
* 定义主要函数：主要函数接受一个或多个选项类型的参数，并根据这些选项进行操作。
  例子：

```go
package main

import "fmt"

// 选项类型
type Options struct {
    Option1 string
    Option2 int
}

type Option func(*Options)

// 主要函数，接受选项参数
func ProcessOptions(opts ...Option) {
    options := &Options{}

    // 应用所有选项
    for _, opt := range opts {
        opt(options)
    }

    // 在这里使用选项进行操作
    fmt.Println("Option1:", options.Option1)
    fmt.Println("Option2:", options.Option2)
}

// 选项函数，用于设置 Option1
func WithOption1(val string) Option {
    return func(o *Options) {
        o.Option1 = val
    }
}

// 选项函数，用于设置 Option2
func WithOption2(val int) Option {
    return func(o *Options) {
        o.Option2 = val
    }
}

func main() {
    // 使用功能选项模式调用函数
    ProcessOptions(WithOption1("Hello"), WithOption2(42))
}
```

在这个例子中，`Options`结构体定义了需要配置的选项，`Option`是一个函数类型，用于修改这些选项。`WithOption1`和`WithOption2`是两个选项函数，分别用于设置`Option1`和`Option2`。`ProcessOptions`函数是主要函数，接受一个或多个选项参数，并根据这些选项进行操作。

通过使用功能选项模式，可以灵活地向函数传递各种不同的配置选项，并根据需要调整函数的行为。这种模式在Go语言中经常用于简化函数接口，提高代码的可读性和可维护性。

## 1.7. Go常见的并发模式

在语言层面，Go针对CSP模型提供了三种并发原语。

* goroutine：对应CSP模型中的P，封装了数据的处理逻辑，是Go运行时调度的基本执行单元。
* channel：对应CSP模型中的输入/输出原语，用于goroutine之间的通信和同步。
* select：用于应对多路输入/输出，可以让goroutine同时协调处理多个channel操作。

### 创建模式

Go语言使用go关键字+函数/方法创建goroutine：

```go
go fmt.Println("I am a goroutine")
 
// $GOROOT/src/net/http/server.go
c := srv.newConn(rw)
go c.serve(connCtx)
```

但在稍复杂一些的并发程序中，需要考虑通过CSP模型输入/输出原语的承载体channel，在goroutine之间建立联系。为了满足这一需求，我们通常使用下面的方式来创建goroutine：

```go
type T struct {...}

func spawn(f func()) chan T {
    c := make(chan T)
    go func() {
        // 使用channel变量c(通过闭包方式)与调用spawn的goroutine通信
        ...
        f()
        ...
    }()
    
    return c
}

func main() {
    c := spawn(func(){})
    // 使用channel变量c与新创建的goroutine通信
}
```

以上方式在内部创建一个goroutine并返回一个channel类型变量的函数，这是Go中最常见的goroutine创建模式。

spawn函数创建的新goroutine与调用spawn函数的goroutine之间通过一个channel建立起了联系：两个goroutine可以通过这个channel进行通信。spawn函数的实现得益于channel作为Go语言一等公民（first-class citizen）的存在：channel可以像变量一样被初始化、传递和赋值。上面例子中的spawn只返回了一个channel变量，大家可以根据需要自行定义返回的channel个数和用途。

### 退出模式

goroutine的使用代价很低，Go官方推荐多使用goroutine。在多数情况下，我们无须考虑对goroutine的退出进行控制：goroutine的执行函数返回，即意味着goroutine退出。但一些常驻的后台服务程序可能会对goroutine有着优雅退出的要求，在这里我们就分类说明一下goroutine的几种退出模式。

#### （1）分离模式

这里借鉴了一些线程模型中的术语，比如分离（detached）模式。分离模式是使用最为广泛的goroutine退出模式。对于分离的goroutine，创建它的goroutine不需要关心它的退出，这类goroutine在启动后即与其创建者彻底分离，其生命周期与其执行的主函数相关，函数返回即goroutine退出。这类goroutine有两个常见用途。

1）一次性任务：顾名思义，新创建的goroutine用来执行一个简单的任务，执行后即退出。

2）常驻后台执行一些特定任务，如监视（monitor）、观察（watch）等。其实现通常采用`for {...}`或`for { select{...} }`代码段形式，并多以定时器（timer）或事件（event）驱动执行。

#### （2）join模式

在线程模型中，父线程可以通过`pthread_join`来等待子线程结束并获取子线程的结束状态。在Go中，我们有时候也有类似的需求：goroutine的创建者需要等待新goroutine结束。笔者为这样的goroutine退出模式起名为“join模式”。

① 等待一个goroutine退出

我们从一个简单的场景开始，先来看看如何等待一个goroutine结束。下面是模拟该场景的一段示例代码：

```go
// chapter6/sources/go-concurrency-pattern-1.go
func worker(args ...interface{}) {
    if len(args) == 0 {
        return
    }
    interval, ok := args[0].(int)
    if !ok {
        return
    }
    
    time.Sleep(time.Second * (time.Duration(interval)))
}

func spawn(f func(args ...interface{}), args ...interface{}) chan struct{} {
    c := make(chan struct{})
    go func() {
        f(args...)
        c <- struct{}{}
    }()
    return c
}

func main() {
     done := spawn(worker, 5)
     println("spawn a worker goroutine")
     <-done
     println("worker done")
}
```

在上面的代码中，spawn函数使用典型的goroutine创建模式创建了一个goroutine，main goroutine作为创建者通过spawn函数返回的channel与新goroutine建立联系，这个channel的用途就是在两个goroutine之间建立退出事件的“信号”通信机制。main goroutine在创建完新goroutine后便在该channel上阻塞等待，直到新goroutine退出前向该channel发送了一个信号。运行该示例：

```bash
$ go run go-concurrency-pattern-1.go
spawn a worker goroutine
worker done
```

② 获取goroutine的退出状态

如果新goroutine的创建者不仅要等待goroutine的退出，还要精准获取其结束状态，同样可以通过自定义类型的channel来实现这一场景需求。下面是基于上面的代码改造后的示例：

```go
// chapter6/sources/go-concurrency-pattern-2.go

var OK = errors.New("ok")

func worker(args ...interface{}) error {
    if len(args) == 0 {
        return errors.New("invalid args")
    }
    interval, ok := args[0].(int)
    if !ok {
        return errors.New("invalid interval arg")
    }
    
    time.Sleep(time.Second * (time.Duration(interval)))
    return OK
}

func spawn(f func(args ...interface{}) error, args ...interface{}) chan error {
    c := make(chan error)
    go func() {
        c <- f(args...)
    }()
    return c
}

func main() {
    done := spawn(worker, 5)
    println("spawn worker1")
    err := <-done
    fmt.Println("worker1 done:", err)
    done = spawn(worker)
    println("spawn worker2")
    err = <-done
    fmt.Println("worker2 done:", err)
}
```

我们将channel中承载的类型由`struct{}`改为了error，这样channel承载的信息就不只是一个信号了，还携带了有价值的信息：新goroutine的结束状态。运行上述示例：

```bash
$go run go-concurrency-pattern-2.go
spawn worker1
worker1 done: ok
spawn worker2
worker2 done: invalid args
```

③ 等待多个goroutine退出

在有些场景中，goroutine的创建者可能会创建不止一个goroutine，并且需要等待全部新goroutine退出。可以通过Go语言提供的`sync.WaitGroup`实现等待多个goroutine退出的模式：

```go
// chapter6/sources/go-concurrency-pattern-3.go
func worker(args ...interface{}) {
    if len(args) == 0 {
        return
    }
    
    interval, ok := args[0].(int)
    if !ok {
        return
    }
    
    time.Sleep(time.Second * (time.Duration(interval)))
}

func spawnGroup(n int, f func(args ...interface{}), args ...interface{}) chan struct{} {
    c := make(chan struct{})
    var wg sync.WaitGroup
    
    for i := 0; i < n; i++ {
        wg.Add(1)
        go func(i int) {
            name := fmt.Sprintf("worker-%d:", i)
            f(args...)
            println(name, "done")
            wg.Done() // worker done!
        }(i)
    }
    
    go func() {
        wg.Wait()
        c <- struct{}{}
    }()
    
    return c
}

func main() {
    done := spawnGroup(5, worker, 3)
    println("spawn a group of workers")
    <-done
    println("group workers done")
}
```

我们看到，通过`sync.WaitGroup`，`spawnGroup`每创建一个goroutine都会调用`wg.Add(1)`，新创建的goroutine会在退出前调用`wg.Done`。在`spawnGroup`中还创建了一个用于监视的goroutine，该goroutine调用`sync.WaitGroup`的Wait方法来等待所有goroutine退出。在所有新创建的goroutine退出后，Wait方法返回，该监视goroutine会向`done`这个channel写入一个信号，这时`main` goroutine才会从阻塞在`done` channel上的状态中恢复，继续往下执行。

```bash
$go run go-concurrency-pattern-3.go 
spawn a group of workers
worker-2: done
worker-1: done
worker-0: done
worker-4: done
worker-3: done
group workers done
```

④ 支持超时机制的等待

有时候，我们不想无限阻塞等待所有新创建goroutine的退出，而是仅等待一段合理的时间。如果在这段时间内goroutine没有退出，则创建者会继续向下执行或主动退出。下面的示例代码在等待多个goroutine退出的例子之上增加了超时机制：

```go
// chapter6/sources/go-concurrency-pattern-4.go
func main() {
    done := spawnGroup(5, worker, 30)
    println("spawn a group of workers")
    
    timer := time.NewTimer(time.Second * 5)
    defer timer.Stop()
    select {
    case <-timer.C:
        println("wait group workers exit timeout!")
    case <-done:
        println("group workers done")
    }
}
```

在上述代码中，我们通过一个定时器（`time.Timer`）设置了超时等待时间，并通过select原语同时监听`timer.C`和`done`这两个channel，哪个先返回数据就执行哪个case分支。

```bash
$ go run go-concurrency-pattern-4.go
spawn a group of workers
wait group workers exit timeout!
```

#### （3）notify-and-wait模式

在前面的几个场景中，goroutine的创建者都是在被动地等待着新goroutine的退出。但很多时候，goroutine创建者需要主动通知那些新goroutine退出，尤其是当main goroutine作为创建者时。main goroutine退出意味着Go程序的终止，而粗暴地直接让main goroutine退出的方式可能会导致业务数据损坏、不完整或丢失。我们可以通过notify-and-wait（通知并等待）模式来满足这一场景的要求。虽然这一模式也不能完全避免损失，但是它给了各个goroutine一个挽救数据的机会，从而尽可能减少损失。

① 通知并等待一个goroutine退出

```go
// chapter6/sources/go-concurrency-pattern-5.go
func worker(j int) {
    time.Sleep(time.Second * (time.Duration(j)))
}

func spawn(f func(int)) chan string {
    quit := make(chan string)
    go func() {
        var job chan int // 模拟job channel
        for {
            select {
            case j := <-job:
                f(j)
            case <-quit:
                quit <- "ok"
            }
        }
    }()
    return quit
}

func main() {
    quit := spawn(worker)
    println("spawn a worker goroutine")
    
    time.Sleep(5 * time.Second)
    
    // 通知新创建的goroutine退出
    println("notify the worker to exit...")
    quit <- "exit"
    
    timer := time.NewTimer(time.Second * 10)
    defer timer.Stop()
    select {
    case status := <-quit:
        println("worker done:", status)
    case <-timer.C:
        println("wait worker exit timeout")
    }
}
```

在上述示例代码中，使用创建模式创建goroutine的spawn函数返回的channel的作用发生了变化，从原先的只是用于新goroutine发送退出信号给创建者，变成了一个双向的数据通道：既承载创建者发送给新goroutine的退出信号，也承载新goroutine返回给创建者的退出状态。

```bash
$go run go-concurrency-pattern-5.go 
spawn a worker goroutine
notify the worker to exit...
worker done: ok
```

② 通知并等待多个goroutine退出

Go语言的channel有一个特性是，当使用close函数关闭channel时，所有阻塞到该channel上的goroutine都会得到通知。我们就利用这一特性实现满足这一场景的模式：

```go
// chapter6/sources/go-concurrency-pattern-6.go
func worker(j int) {
    time.Sleep(time.Second * (time.Duration(j)))
}

func spawnGroup(n int, f func(int)) chan struct{} {
    quit := make(chan struct{})
    job := make(chan int)
    var wg sync.WaitGroup
    
    for i := 0; i < n; i++ {
        wg.Add(1)
        go func(i int) {
            defer wg.Done() // 保证wg.Done在goroutine退出前被执行
            name := fmt.Sprintf("worker-%d:", i)
            for {
                j, ok := <-job
                if !ok {
                    println(name, "done")
                    return
                }
                // 执行这个job
                worker(j)
            }
        }(i)
    }
    
    go func() {
        <-quit
        close(job) // 广播给所有新goroutine
        wg.Wait()
        quit <- struct{}{}
    }()
    
    return quit
}

func main() {
    quit := spawnGroup(5, worker)
    println("spawn a group of workers")
    
    time.Sleep(5 * time.Second)
    // 通知 worker goroutine 组退出
    println("notify the worker group to exit...")
    quit <- struct{}{}
    
    timer := time.NewTimer(time.Second * 5)
    defer timer.Stop()
    select {
    case <-timer.C:
        println("wait group workers exit timeout!")
    case <-quit:
        println("group workers done")
    }
}
```

此时各个worker goroutine监听job channel，当创建者关闭job channel时，通过“comma ok”模式获取的ok值为false，也就表明该channel已经被关闭，于是worker goroutine执行退出逻辑（退出前`wg.Done()`被执行）。

```bash
$go run go-concurrency-pattern-6.go
spawn a group of workers
notify the worker group to exit...
worker-3: done
worker-0: done
worker-4: done
worker-2: done
worker-1: done
group workers done
```

### 管道模式

```go
// chapter6/sources/go-concurrency-pattern-8.go
func newNumGenerator(start, count int) <-chan int {
    c := make(chan int)
    go func() {
        for i := start; i < start+count; i++ {
            c <- i
        }
        close(c)
    }()
    return c
}

func filterOdd(in int) (int, bool) {
    if in%2 != 0 {
      return 0, false
    }
    return in, true
}

func square(in int) (int, bool) {
    return in * in, true
}

func spawn(f func(int) (int, bool), in <-chan int) <-chan int {
    out := make(chan int)
    
    go func() {
        for v := range in {
            r, ok := f(v)
            if ok {
                out <- r
            }
        }
        close(out)
    }()
    
    return out
}

func main() {
    in := newNumGenerator(1, 20)
    out := spawn(square, spawn(filterOdd, in))
    
    for v := range out {
        println(v)
    }
}
```

## 1.8. 有缓和无缓channel

> 这里全部来自chatGPT

### 特点

在Go语言中，channel（通道）是用于在 Go 协程之间进行通信和同步的重要机制。Channel 可以是有缓冲的（buffered）或无缓冲的（unbuffered），它们有不同的特性和适用场景。

无缓冲 channel：

- 无缓冲 channel 在发送数据和接收数据时是同步的，发送操作和接收操作是阻塞的。
- 当一个数据被发送到无缓冲 channel 时，发送方会阻塞直到有其他 Go 协程从该 channel 接收数据。
- 同样，当数据被接收时，接收方会阻塞直到有其他 Go 协程向 channel 发送数据。

```go
ch := make(chan int) // 创建一个无缓冲 channel
```

有缓冲 channel：

- 有缓冲 channel 具有一定的容量，允许在 channel 中存储一定数量的数据项。
- 当往一个有缓冲 channel 发送数据时，如果 channel 还未满，发送操作是非阻塞的；当 channel 满时发送操作会阻塞。
- 同样，当从一个有缓冲 channel 接收数据时，如果 channel 中有数据，接收操作是非阻塞的；当 channel 空时接收操作会阻塞。

```go
ch := make(chan int, 5) // 创建一个容量为 5 的有缓冲 channel
```

### 使用场景

**无缓冲 channel ：**

1. 同步数据传递：在两个 Go 协程之间进行数据传递，确保数据的顺序性和同步性。

   ```go
   ch := make(chan int)
   go func() {
       data := 42
       ch <- data // 将数据发送到无缓冲 channel
   }()
   result := <-ch // 接收从 channel 发来的数据
   ```

2. 信号量：控制并发操作的数量，确保在特定时刻只有有限数量的并发操作在执行。

   ```go
   sem := make(chan struct{}, 5) // 限制同时执行的并发操作数量为 5
   for i := 0; i < 10; i++ {
       go func(id int) {
           sem <- struct{}{} // 获取信号量
           defer func() { <-sem }() // 释放信号量
           // 执行并发操作
       }(i)
   }
   ```

**有缓冲 channel ：**

1. 生产者-消费者模型：用于在生产者和消费者之间进行解耦，提高程序的吞吐量。

   ```go
   ch := make(chan int, 10) // 有缓冲 channel，缓冲区大小为 10
   go func() {
       for i := 0; i < 10; i++ {
           ch <- i // 生产数据
       }
       close(ch)
   }()
   go func() {
       for item := range ch {
           // 消费数据
       }
   }()
   ```

2. **异步结果处理**：用于异步处理任务的结果，减少因为发送或接收操作阻塞而导致的性能问题。

   ```go
   resultCh := make(chan int, 1) // 有缓冲 channel，用于接收异步操作的结果
   go func() {
       // 异步操作
       resultCh <- 42 // 发送结果到 channel
   }()
   result := <-resultCh // 接收异步操作的结果
   ```

这些场景只是使用无缓冲和有缓冲 channel 的一部分示例。根据具体的需求，合理选择适当类型的 channel 可以提高程序的效率和可维护性，同时确保并发操作的正确性。

## 1.9. cgo-Go调用C代码

在 Go 语言中，CGO 是 Go 语言提供的一种特性，用于在 Go 代码中调用 C 语言代码。通过 CGO，可以很方便地在 Go 代码中集成现有的 C 代码库，或者利用 C 语言的性能优势来编写高性能的代码片段。

使用 CGO 的一般流程包括以下步骤：

1. **编写 C 代码**：首先需要编写需要调用的 C 代码，可以是一个简单的 C 函数或者一个 C 语言库。
2. **创建 C 头文件**：为了在 Go 代码中调用 C 函数，需要创建一个 C 头文件，用于声明 C 函数的原型。
3. **在 Go 代码中使用 CGO**：在 Go 代码中通过 `import "C"` 来引入 CGO，然后通过 `// #cgo` 指令告诉编译器去链接 C 代码。
4. **调用 C 函数**：在 Go 代码中就可以像调用普通 Go 函数一样调用 C 函数，通过 CGO 技术实现 Go 与 C 语言的互操作。

以下是一个更详细的示例，展示如何使用 CGO 在 Go 中调用一个简单的 C 函数来实现字符串加密和解密功能。

**1. 编写 C 代码**

首先，我们编写两个简单的 C 函数，一个用于加密字符串，另一个用于解密字符串。

```c
// encrypt.c
#include <stdio.h>

void encrypt(char* str) {
    while (*str) {
        *str = *str ^ 31;
        str++;
    }
}

// decrypt.c
#include <stdio.h>

void decrypt(char* str) {
    while (*str) {
        *str = *str ^ 31;
        str++;
    }
}
```

**2. 创建 C 头文件 `crypto.h`**

创建一个头文件 `crypto.h`，用于声明 C 函数的原型。

```c
// crypto.h
void encrypt(char* str);
void decrypt(char* str);
```

**3. 编写 Go 代码**

接下来，我们编写 Go 代码，通过 CGO 调用上述的 C 函数来加密和解密字符串。

```go
package main

/*
#cgo CFLAGS: -g -Wall
#cgo LDFLAGS: -lm
#include "crypto.h"
*/
import "C"
import "fmt"

func main() {
    message := "Hello, world!"

    // Encrypt the message
    cMessage := C.CString(message)
    defer C.free(unsafe.Pointer(cMessage))
    C.encrypt(cMessage)
    fmt.Printf("Encrypted message: %s\n", C.GoString(cMessage))

    // Decrypt the message
    C.decrypt(cMessage)
    fmt.Printf("Decrypted message: %s\n", C.GoString(cMessage))
}
```

在这个示例中，Go 代码通过 `import "C"` 引入 CGO，然后使用 `// #cgo` 指令来指定编译选项。在 `main` 函数中，我们首先将 Go 字符串转换为 C 字符串，然后调用 C 函数来加密和解密字符串，最后将结果打印出来。

**4. 构建和运行程序**

在包含以上文件的目录中，可以通过以下命令构建和运行这个示例程序：

```bash
go build -o crypto
./crypto
```

程序应该输出以下内容：

```
Encrypted message: LQYYX;#rNXVX
Decrypted message: Hello, world!
```



