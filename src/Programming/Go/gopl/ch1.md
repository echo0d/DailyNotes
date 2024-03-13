# 1、入门

## 1.1 Hello, World

### GOPROXY设置

windows下载安装包，直接默认安装。此处版本go1.15.15

```
PS C:\Users\echo0d\Desktop\gopl.io-master\ch1\helloworld> go env
set GO111MODULE=on
set GOARCH=amd64                                  
set GOBIN=                                        
set GOCACHE=C:\Users\echo0d\AppData\Local\go-build
set GOENV=C:\Users\echo0d\AppData\Roaming\go\env  
set GOEXE=.exe                                    
set GOFLAGS=
set GOHOSTARCH=amd64
set GOHOSTOS=windows
set GOINSECURE=
set GOMODCACHE=C:\Users\echo0d\go\pkg\mod
set GONOPROXY=
set GONOSUMDB=
set GOOS=windows
set GOPATH=C:\Users\echo0d\go
set GOPRIVATE=
set GOPROXY=https://proxy.golang.org,direct
set GOROOT=C:\Program Files\Go
set GOSUMDB=sum.golang.org
set GOTMPDIR=
set GOTOOLDIR=C:\Program Files\Go\pkg\tool\windows_amd64
set GCCGO=gccgo
set AR=ar
set GOMOD=C:\Users\echo0d\Desktop\gopl.io-master\go.mod
set CGO_CFLAGS=-g -O2
set CGO_CPPFLAGS=
set CGO_CXXFLAGS=-g -O2
set CGO_FFLAGS=-g -O2
set CGO_LDFLAGS=-g -O2
set PKG_CONFIG=pkg-config
set GOGCCFLAGS=-m64 -mthreads -fno-caret-diagnostics -Qunused-arguments -fmessage-length=0 -fdebug-prefix-map=C:\Users\echo0d\AppData\Local\Temp\go-build967739482=/tmp/go-build -gno-record-gcc-switches
```

编译程序会报错

```
PS C:\Users\echo0d\Desktop\gopl.io-master\ch1\helloworld> go run main.go
go: golang.org/x/net@v0.0.0-20210929193557-e81a3d93ecf6: Get "https://proxy.golang.org/golang.org/x/net/@v/v0.0.0-20210929193557-e81a3d93ecf6.mod": dial tcp [2404:6800:4003:c04::8d]:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
```

原因：从 `Go 1.11` 版本开始，官方支持了 `go module` 包依赖管理工具。还新增了 `GOPROXY` 环境变量。

如果设置了该变量，下载源代码时将会通过这个环境变量设置的代理地址，而不再是以前的直接从代码库下载。也就是这个变量

```
set GOPROXY=https://proxy.golang.org,direct
```

把他修改，powershell执行，https://goproxy.io这个项目看起来非常不错

```powershell
# 启用 Go Modules 功能
$env:GO111MODULE="on"
# 配置 GOPROXY 环境变量
$env:GOPROXY="https://goproxy.io"
```


如果使用的 Go 版本>=1.13, 你可以通过设置 GOPRIVATE 环境变量来控制哪些私有仓库和依赖(公司内部仓库)不通过 proxy 来拉取，直接走本地，设置如下：

```powershell
# 配置 GOPROXY 环境变量
$env:GOPROXY = "https://goproxy.io,direct"
# 设置不走 proxy 的私有仓库或组，多个用逗号相隔（可选）
$env:GOPRIVATE = "git.mycompany.com,github.com/my/private"
```

除此之外还有

七牛云：https://goproxy.cn

aliyun：https://mirrors.aliyun.com/goproxy/

> 后面感觉go1.15版本有点低，改成 go1.21.8

### Hello, World

初始化，新建一个文件夹，例如ch2

```cmd
cd ch2
go mod init ch2
# 生成一个go.mod文件，内容如下
module ch2
go 1.22.1

```

示例代码*gopl.io/ch1/helloworld*

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, 世界")
}
```

> Go语言的函数名首字母一定要大写，上面如果写成fmt.println就不对

![image-20240313224312928](./img/ch1/image-20240313224312928.png)

Go是一门编译型语言，Go语言提供的工具都通过一个单独的命令`go`调用，`go`命令有一系列子命令。最简单的一个子命令就是run。这个命令编译一个或多个以.go结尾的源文件，链接库文件，并运行最终生成的可执行文件。

```
$ go run helloworld.go
```

这个命令会输出：

```
Hello, 世界
```

Go语言原生支持Unicode，它可以处理全世界任何语言的文本。

单独编译这个程序，保存编译结果以备将来之用。可以用build子命令：

```
$ go build helloworld.go
```

这个命令生成一个名为helloworld的可执行的二进制文件，Windows系统下生成的可执行文件是helloworld.exe，增加了.exe后缀名

```
.\helloworld.exe
Hello, 世界
```

### package/import

* Go代码结构

Go语言的代码通过`包（package）`组织，包类似于其它语言里的库（libraries）或者模块（modules）。一个包由位于`单个目录`下的一个或多个.go源代码文件组成

> 也就是说，一个文件夹下的go文件应该属于同一个包

`main`包比较特殊。它定义了一个独立可执行的程序，而不是一个库。在`main`里的`main` 函数也很特殊，它是整个程序执行时的入口（译注：C系语言差不多都这样）。

每个源文件都以一条`package`声明语句开始，例子里的`package main`，表示该文件属于哪个包，紧跟着一系列导入（`import`）的包，**`import` 声明必须跟在文件的 `package` 声明之后**。

> :warning: 必须恰当导入需要的包，**缺少了必要的包或者导入了不需要的包，程序都无法编译通过**。这项严格要求避免了程序开发过程中引入未使用的包:exclamation:

之后是这个文件里的其他程序语句，是组成程序的函数、变量、常量、类型的声明语句（分别由关键字 `func`、`var`、`const`、`type` 定义）。

* Go 语言不需要在语句或者声明的末尾添加分号，除非一行上有多条语句。编译器会主动把特定符号后的换行符转换为分号

  例子，函数的左括号 `{` 必须和 `func` 函数声明在同一行上，且位于末尾，不能独占一行，而在表达式 `x+y` 中，可在 `+` 后换行，不能在 `+` 前换行（译注：以+结尾的话不会被插入分号分隔符，但是以 x 结尾的话则会被分号分隔符，从而导致编译错误）。

* Go 语言在代码格式上采取了很强硬的态度。`gofmt`工具把代码格式化为标准格式

  很多文本编辑器都可以配置为保存文件时自动执行 `gofmt`，这样你的源代码总会被恰当地格式化。还有个相关的工具：`goimports`，可以根据代码需要，自动地添加或删除 `import` 声明。这个工具并没有包含在标准的分发包中，可以用下面的命令安装：

  ```shell
  go install golang.org/x/tools/cmd/goimports@latest
  ```

## 1.2 命令行参数

示例代码

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	var s, sep string
	// var 声明定义了两个 string 类型的变量 s 和 sep。变量会在声明时直接初始化。
	// 如果变量没有显式初始化，则被隐式地赋予其类型的零值，数值类型是0，字符串类型是空字符串""

	for i := 1; i < len(os.Args); i++ {
		s += sep + os.Args[i]
		// 对 string 类型，+ 运算符连接字符串
		// 等价于：s=s+sep+os.Args[i]。
		sep = " "
	}
	fmt.Println(s)
}

```

### 切片

* 程序的命令行参数可从 `os` 包的 `Args` 变量获取；`os` 包外部使用 `os.Args` 访问该变量。`os.Args` 变量是一个字符串（string）的`切片（slice）`。

* `os.Args` 的第一个元素：`os.Args[0]`，是命令本身的名字；其它的元素则是程序启动时传给它的参数。

* `s[m:n]` 形式的切片表达式，产生从第 `m` 个元素到第 `n-1` 个元素的切片，如果省略切片表达式的索引，会默认传入 `0` 或 `len(s)`。（区间索引时，Go 语言里也采用左闭右开形式）`os.Args[1:len(os.Args)]` 切片，可以简写成 `os.Args[1:]`

> 注释语句以 `//` 开头。

### s+=  i++

上面`s += sep + os.Args[i]`等价于：`s=s+sep+os.Args[i]`。看起来和其他语言一样的，但是

> 自增语句 `i++` 给 `i` 加 `1`；这和 `i+=1` 以及 `i=i+1` 都是等价的。对应的还有 `i--` 给 `i` 减 `1`。它们是语句，而不像 C 系的其它语言那样是表达式。所以 `j=i++` 非法，而且 `++` 和 `--` 都只能放在变量名后面，因此 `--i` 也非法。

### for循环

Go 语言只有 `for` 循环这一种循环语句。`for` 循环有多种形式，

**for循环1**

其中一种如下所示：

```go
for initialization; condition; post {
    // zero or more statements
}
```

`for` 循环三个部分不需括号包围。大括号强制要求，左大括号必须和 *`post`* 语句在同一行。

* `initialization` 语句是可选的，在循环开始前执行。`initalization`如果存在，必须是一条 *简单语句*（simple statement），即，短变量声明、自增语句、赋值语句或函数调用。
* `condition` 是一个布尔表达式（boolean expression），其值在每次循环迭代开始时计算。如果为 `true` 则执行循环体语句。
* `post` 语句在循环体执行结束后执行，之后再次对 `condition` 求值。`condition` 值为 `false` 时，循环结束。

for 循环的这三个部分**每个都可以省略**，如果省略 `initialization` 和 `post`，分号也可以省略：

```go
// a traditional "while" loop
for condition {
    // ...
}
```

如果连 `condition` 也省略了，像下面这样：

```go
// a traditional infinite loop
for {
    // ...
}
```

这就变成一个无限循环，尽管如此，还可以用其他方式终止循环，如一条 `break` 或 `return` 语句。

**for循环2**

在某种数据类型的区间（range）上遍历，如字符串或切片。例如

```go
// Echo2 prints its command-line arguments.
package main

import (
    "fmt"
    "os"
)

func main() {
    s, sep := "", ""
    for _, arg := range os.Args[1:] {
        s += sep + arg
        sep = " "
    }
    fmt.Println(s)
}
```

### 空标识符

上面for循环2中，每次循环迭代，`range` 产生一对值（索引以及在该索引处的元素值）。这个例子不需要索引，一种思路是把索引赋值给一个临时变量（如 `temp`）然后忽略它的值，但 Go 语言不允许使用无用的局部变量（local variables），因为这会导致编译错误。

Go 语言中这种情况的解决方法是用 `空标识符（blank identifier）`，即 `_`（下划线）。空标识符可用于在任何语法需要变量名但程序逻辑不需要的时候。

### 声明&初始化

使用一条短变量声明来声明并初始化 `s` 和 `seps`

```go
s, sep := "", ""
```

声明一个变量有好几种方式，下面这些都等价：实践中一般使用前两种形式中的某个，初始值重要的话就显式地指定变量的值，否则指定类型使用隐式初始化。

```go
s := ""
var s string
var s = ""
var s string = ""
```

第一种形式，是一条短变量声明，最简洁，但只能用在函数内部，而不能用于包变量。

第二种形式依赖于字符串的默认初始化零值机制，被初始化为 `""`。

第三种形式用得很少，除非同时声明多个变量。

第四种形式显式地标明变量的类型，当变量类型与初值类型相同时，类型冗余，但如果两者类型不同，变量类型就必须了。

### `strings` 包的 `Join` 函数

*gopl.io/ch1/echo3*

```go
func main() {
    fmt.Println(strings.Join(os.Args[1:], " "))
}
```

最后，如果不关心输出格式，只想看看输出值，或许只是为了调试，可以用 `Println` 为我们格式化输出。

```go
fmt.Println(os.Args[1:])
```

这条语句的输出结果跟 `strings.Join` 得到的结果很像，只是被放到了一对方括号里。切片都会被打印成这种格式。

![image-20240313224440655](./img/ch1/image-20240313224440655.png)

### 练习题

**练习1.2** 

修改 `echo` 程序，使其打印每个参数的索引和值，每个一行。

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	s, sep := "", ""
	for _, arg := range os.Args[1:] {
		s += sep + arg
		sep = " "
	}
	fmt.Println("只输出值")
	fmt.Println(s)

	fmt.Println("输出值和索引1：index, arg := range os.Args[1:]")
	for index, arg := range os.Args[1:] {
		fmt.Println("参数", index, "是", arg)
	}
	fmt.Println("输出值和索引2：index, arg := range os.Args")
	for index, arg := range os.Args {
		fmt.Println("参数", index, "是", arg)
	}
}

```

![image-20240313230441488](./img/ch1/image-20240313230441488.png)

**练习 1.3：** 做实验测量潜在低效的版本和使用了 `strings.Join` 的版本的运行时间差异。

```go
package main

import (
	"fmt"
	"os"
	"strings"
	"time"
)

// !+
func main() {
	now1 := time.Now()
	s, sep := "", ""
	for _, arg := range os.Args[1:] {
		s += sep + arg
		sep = " "
	}
	fmt.Println(s)
	end1 := time.Now()
	fmt.Println("for range运行时间", end1.Sub(now1))
	now2 := time.Now()
	fmt.Println(strings.Join(os.Args[1:], " "))
	end2 := time.Now()
	fmt.Println("strings.Join运行时间", end2.Sub(now2))
	now3 := time.Now()
	fmt.Println(os.Args[1:])
	end3 := time.Now()
	fmt.Println("Println(os.Args[1:])运行时间", end3.Sub(now3))
}

```

![image-20240313231229410](./img/ch1/image-20240313231229410.png)

## 1.3 查找重复的行

