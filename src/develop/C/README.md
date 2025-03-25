---
category: C
tag: C
---

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

注意，`-std` 后面需要用 `=` 连接参数，而不是像上面的 `-o` 一样用空格，并且 `=` 前后也不能有多余的空格。


VSCode 写 C 的配置

`tasks.json`
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            //这里构建build任务
            "label": "build",
            "type": "shell",
            "command": "gcc",
            "args": [
                //此处为编译选项
                "${file}",//该(单文件编译)
                //"${workspaceFolder}\\*.c",//(多文件编译)
                "-o",
                //承接上述,把源代码编译为对应exe文件,
                "${workspaceFolder}\\bin\\${fileBasenameNoExtension}.exe",//(单文件编译)
                //"${workspaceFolder}\\${workspaceRootFolderName}.exe",//(多文件编译)
                "-g",
                "-Wall",//获取警告
                "-static-libgcc",
                "-fexec-charset=GBK",//按GBK编码
                "-std=c11"//选择C标准,这里按照你需要的换
            ],
            "group": {
                //把该任务放在build组中
                "kind": "build",
                "isDefault": true
            },
            "presentation": {
                //配置build任务的终端相关
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "new"//为了方便每次都重新开启一个终端
            },
            "problemMatcher": "$gcc"
        },
        {
            //这里配置run任务
            "label": "run",
            "type": "shell",
            "dependsOn": "build",
            "command": "${workspaceFolder}\\bin\\${fileBasenameNoExtension}.exe",//(单文件编译)
            //"command":"${workspaceFolder}\\${workspaceRootFolderName}.exe",//(多文件编译)
            //这里command与前面build中的编译输出对应
            "group": {
                //这里把run任务放在test组中,方便我们使用快捷键来执行程序
                //请人为修改"设置","键盘快捷方式"中的"运行测试任务"为"你喜欢的键位"
                //推荐为"ALT+某个字母键",使用该键来运行程序
                "kind": "test",
                "isDefault": true
            },
            "presentation": {
                //同理配置终端
                "echo": true,
                "reveal": "always",
                "focus": true,
                "panel": "new"
            }
        }
    ]
}
```

`launch.json`
```json
{
    "version": "0.2.0",
    "configurations": [
        { //‘调试(Debug)
            "name": "Debug",
            "type": "cppdbg",
            // cppdbg对应cpptools提供的调试功能；只能是cppdbg
            "request": "launch",
            //这里program指编译好的exe可执行文件的路径,与tasks中要对应
            "program": "${workspaceFolder}\\bin\\${fileBasenameNoExtension}.exe", //(单文件调试)
            //"program": "${workspaceFolder}\\${workspaceRootFolderName}.exe", //(多文件调试)
            "args": [],
            "stopAtEntry": false, // 这里改为true作用等同于在main处打断点
            "cwd": "${fileDirname}", // 调试程序时的工作目录,即为源代码所在目录,不用改
            "environment": [],
            "externalConsole": false, // 改为true时为使用cmd终端,推荐使用vscode内部终端
            "internalConsoleOptions": "neverOpen", // 设为true为调试时聚焦调试控制台,新手用不到
            "MIMode": "gdb",
            "miDebuggerPath": "D:\\MinGW\\bin\\gdb.exe",
            "preLaunchTask": "build" // 调试开始前执行的任务(任务依赖),与tasks.json的label相对应
        }
    ]
}
```

