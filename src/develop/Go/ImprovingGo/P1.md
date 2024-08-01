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

