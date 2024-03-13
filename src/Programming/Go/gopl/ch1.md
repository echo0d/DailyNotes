# 1-入门

## 1、Go基础

### 1.1 GOPROXY设置

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

### 1.2 Hello, World

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

Go是一门编译型语言，Go语言的工具链将源代码及其依赖转换成计算机的机器指令（译注：静态编译）。Go语言提供的工具都通过一个单独的命令`go`调用，`go`命令有一系列子命令。最简单的一个子命令就是run。这个命令编译一个或多个以.go结尾的源文件，链接库文件，并运行最终生成的可执行文件。

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

### 1.3 package

Go语言的代码通过**包**（package）组织，包类似于其它语言里的库（libraries）或者模块（modules）。一个包由位于**单个目录**下的一个或多个.go源代码文件组成，目录定义包的作用。

每个源文件都以一条`package`声明语句开始，这个例子里就是`package main`，表示该文件属于哪个包，紧跟着一系列导入（`import`）的包，之后是存储在这个文件里的程序语句。

`main`包比较特殊。它定义了一个独立可执行的程序，而不是一个库。在`main`里的`main` *函数* 也很特殊，它是整个程序执行时的入口（译注：C系语言差不多都这样）。

> 必须恰当导入需要的包，缺少了必要的包或者导入了不需要的包，程序都无法编译通过。这项严格要求避免了程序开发过程中引入未使用的包（Go语言编译过程没有警告信息，争议特性之一）。