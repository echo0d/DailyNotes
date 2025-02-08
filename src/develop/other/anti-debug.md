---
category: 开发
tags:
  - 反调试
sticky: "1"
star: "1"
---

# 反调试
反调试技术用于检测和防止调试器附加到程序上，以保护程序免受逆向工程和调试。以下是几种编程语言中的常见反调试方法：

## Java
### 检查JVM启动参数

检查启动参数中是否包含调试相关选项。

### 检查调试器线程

检查是否存在与调试相关的线程。

### 检查程序是否运行在IDE环境中

检查当前项目中是否有`.vscode`、`.idea`等文件夹

以上三种方式的实现：
```java

import java.lang.management.ManagementFactory;

import util.SelfDelete;

public class DebugStatus {

    public static void main(String[] args) throws Exception {
        // 检查是否在调试状态
        if (isDebuggerAttached() || isRunningInIDE()) {
            System.err.println("禁止调试！");
            SelfDelete.selfDelete();
            System.exit(0);
        } else {
            System.out.println("正常运行");
        }
    }

    /**
     * 检查程序是否处于调试状态
     */
    private static boolean isDebuggerAttached() {
        // 方法1：检查JVM启动参数中是否包含调试相关选项
        for (String arg : ManagementFactory.getRuntimeMXBean().getInputArguments()) {
            if (arg.contains("-agentlib:jdwp") || arg.contains("-Xdebug")) {
                return true;
            }
        }

        // 方法2：检查是否存在调试器线程
        for (Thread thread : Thread.getAllStackTraces().keySet()) {
            if (thread.getName().contains("JDB")
                    || thread.getName().contains("Debug")
                    || thread.getName().contains("Debugger")) {
                return true;
            }
        }
        return false;
    }

    /**
     * 检查程序是否运行在IDE环境中
     */
    private static boolean isRunningInIDE() {
        String classPath = System.getProperty("java.class.path");

        // 检查常见IDE的特定文件或目录
        boolean isInIDE = classPath.contains("idea") // IntelliJ IDEA
                || classPath.contains("eclipse") // Eclipse
                || classPath.contains("netbeans") // NetBeans
                || classPath.contains("vscode"); // VSCode

        // 检查IDE特定的文件或目录
        isInIDE = isInIDE || new java.io.File(".idea").exists() // IntelliJ IDEA
                || new java.io.File(".project").exists() // Eclipse
                || new java.io.File("nbproject").exists() // NetBeans
                || new java.io.File(".vscode").exists(); // VSCode

        return isInIDE;
    }

}

```

### debug symbol

去掉 Class 文件行号 LineNumberTable 属性。
IDEA 等 IDE 对于 Java 的调试，主要是通过行号作为下断点的条件。 如果去掉 Class 文件行号（LineNumberTable）这一属性，则 无法使用 IDE 调试。只能通过 Jdb 并通过方法断点来调试。

* **使用 `javac` 编译时去掉调试信息**
```shell
javac -g:none YourClass.java
```

* **使用 ASM 库修改字节码**

如果你需要在编译后去掉现有的 Class 文件中的行号信息，可以使用 ASM 库来修改字节码。以下是一个示例代码，展示如何使用 ASM 库去掉 Class 文件中的行号信息：

添加 ASM 库依赖（如果使用 Maven）：
```xml
<dependency>
    <groupId>org.ow2.asm</groupId>
    <artifactId>asm</artifactId>
    <version>9.2</version>
</dependency>

```

使用 ASM 库去掉行号信息：
```java
import org.objectweb.asm.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class RemoveLineNumber {
    public static void main(String[] args) throws IOException {
        if (args.length != 2) {
            System.out.println("Usage: RemoveLineNumber <input class file> <output class file>");
            return;
        }

        File inputFile = new File(args[0]);
        File outputFile = new File(args[1]);

        FileInputStream fis = new FileInputStream(inputFile);
        ClassReader classReader = new ClassReader(fis);
        ClassWriter classWriter = new ClassWriter(classReader, 0);
        ClassVisitor classVisitor = new ClassVisitor(Opcodes.ASM9, classWriter) {
            @Override
            public MethodVisitor visitMethod(int access, String name, String descriptor, String signature, String[] exceptions) {
                MethodVisitor mv = super.visitMethod(access, name, descriptor, signature, exceptions);
                return new MethodVisitor(Opcodes.ASM9, mv) {
                    @Override
                    public void visitLineNumber(int line, Label start) {
                        // Do not call super.visitLineNumber to remove line number info
                    }
                };
            }
        };
        classReader.accept(classVisitor, 0);
        fis.close();

        FileOutputStream fos = new FileOutputStream(outputFile);
        fos.write(classWriter.toByteArray());
        fos.close();
    }
}
```

编译并运行 `RemoveLineNumber` 类：
```shell
javac -cp asm-9.2.jar RemoveLineNumber.java

java -cp .:asm-9.2.jar RemoveLineNumber InputClass.class OutputClass.class
```

这样，`OutputClass.class` 文件将不包含行号信息，无法在 IDE 中使用行号断点进行调试。


## C/C++

1. **检查调试标志**：使用`IsDebuggerPresent`函数检查调试器是否附加。
2. **检查调试寄存器**：检查调试寄存器是否被设置。

```cpp
#include <windows.h>

bool isDebuggerAttached() {
    return IsDebuggerPresent();
}
```



## Python

1. **检查调试器模块**：检查是否加载了调试器模块。
2. **检查调试器端口**：检查调试器使用的端口是否被占用。

```python
import sys

def is_debugger_attached():
    return any('pydevd' in arg for arg in sys.argv)
```



## JavaScript (Node.js)

1. **检查调试标志**：检查进程启动参数中是否包含调试标志。
2. **检查调试端口**：检查调试端口是否被占用。

```js
function isDebuggerAttached() {
    return process.execArgv.some(arg => arg.includes('--inspect') || arg.includes('--debug'));
}
```

## C

1. **检查调试标志**：使用`Debugger.IsAttached`属性检查调试器是否附加。
2. **检查调试器端口**：检查调试器使用的端口是否被占用。

```csharp
using System.Diagnostics;

public class DebugStatus {
    public static bool IsDebuggerAttached() {
        return Debugger.IsAttached;
    }
}
```

