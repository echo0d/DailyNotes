# C 语言

> [C 语言教程 - 网道](https://wangdoc.com/clang/)

C 语言是一种编译型语言，源码都是文本文件，本身无法执行。必须通过编译器，生成二进制的可执行文件，才能执行。编译器将代码从文本翻译成二进制指令的过程，就称为编译阶段，又称为“编译时”（compile time），跟运行阶段（又称为“运行时”）相区分。

目前，最常见的 C 语言编译器是自由软件基金会推出的 GCC 编译器，它可以免费使用。Linux 和 Mac 系统可以直接安装 GCC，Windows 系统可以安装 MinGW。线编译器举例：

- CodingGround: https://tutorialspoint.com/compile_c_online.php
- OnlineGDB: https://onlinegdb.com/online_c_compiler



## Hello World 示例

C 语言的源代码文件，通常以后缀名`.c`结尾。下面是一个简单的 C 程序`hello.c`。它就是一个普通的文本文件，任何文本编译器都能用来写。

```c
#include <stdio.h>

int main(void) {
  printf("Hello World\n");
  return 0;
}
```

上面这个程序的唯一作用，就是在屏幕上面显示“Hello World”。

这里不讲解这些代码是什么意思，只是作为一个例子，让大家看看 C 代码应该怎么编译和运行。假设你已经安装好了 GCC 编译器，可以打开命令行，执行下面的命令。

```shell
$ gcc hello.c
```

上面命令使用`gcc`编译器，将源文件`hello.c`编译成二进制代码。注意，`$`是命令行提示符，你真正需要输入的是`$`后面的部分。

运行这个命令以后，默认会在当前目录下生成一个编译产物文件`a.out`（assembler output 的缩写，Windows 平台为`a.exe`）。执行该文件，就会在屏幕上输出`Hello World`。

```shell
$ ./a.out
Hello World
```

GCC 的`-o`参数（output 的缩写）可以指定编译产物的文件名。

```shell
$ gcc -o hello hello.c
```

上面命令的`-o hello`指定，编译产物的文件名为`hello`（取代默认的`a.out`）。编译后就会生成一个名叫`hello`的可执行文件，相当于为`a.out`指定了名称。执行该文件，也会得到同样的结果。

```shell
$ ./hello
Hello World
```

GCC 的`-std=`参数（standard 的缩写）还可以指定按照哪个 C 语言的标准进行编译。

```shell
$ gcc -std=c99 hello.c
```

上面命令指定按照 C99 标准进行编译。

注意，`-std`后面需要用`=`连接参数，而不是像上面的`-o`一样用空格，并且`=`前后也不能有多余的空格。