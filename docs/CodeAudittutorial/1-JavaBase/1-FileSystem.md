# Java代码审计-文件系统

## 1、Java文件系统

在Java语言中对文件的任何操作最终都是通过`JNI`调用`C语言`函数实现的。Java SE中内置了两类文件系统：`java.io`和`java.nio`，`java.nio`的实现是`sun.nio`。

Java为了能够实现跨操作系统对文件进行操作抽象了一个叫做文件系统的对象:`java.io.FileSystem`，不同的操作系统有不一样的文件系统,例如`Windows`和`Unix`就是两种不一样的文件系统： `java.io.UnixFileSystem`、`java.io.WinNTFileSystem`，不同的操作系统只需要实现起抽象出来的文件操作方法即可实现跨平台的文件操作

`FileSystem`类的对象表示Java程序中的文件系统。`FileSystem`对象用于执行两个任务：

- Java程序和文件系统之间的接口。
- 一个工厂，它用于创建许多类型的文件系统相关对象和服务。

## 2、Java读写文件的方式举例

### 2.1 FileWriter和FileReader

> 对文件内容按字符读取

这种方式可以修改27行`new char[]`的长度，读取特定长度的字符。

```java
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

/**
 * @author : echo0d
 * @date : 2023/10/5 12:46
 * @Description :
 */
public class FileWriterTest {
    public static void main(String[] args) throws IOException {
        String dir = "D:\\a.txt";
        File file = new File(dir);
//如果文件不存在，创建文件
        if (!file.exists())
            file.createNewFile();
//创建FileWriter对象
        FileWriter fileWriter = new FileWriter(file);
//向文件中写入内容
        fileWriter.write("the first way to write and read");
        fileWriter.flush();
        fileWriter.close();

//创建FileReader对象，读取文件中的内容
        FileReader fileReader = new FileReader(file);
        //  char[] ch = new char[100]; 此处可以修改长度为想要读取的长度
        char[] ch = new char[(int) file.length()];
        fileReader.read(ch);
        for(char c:ch) {
            System.out.print(c);
        }
        System.out.println();
        fileReader.close();
    }
}
```

### 2.2 BuffredReader和BufferedWriter

> 对文件内容进行整行读取

通过修改下面25行`int readLine`，即可修改想要读取的行数。

```java
import java.io.*;

/**
 * @author : echo0d
 * @date : 2023/10/5 13:30
 * @Description :
 */
public class BuffredReaderTest {
    public static void main(String[] args) throws IOException {
        String dir = "D:\\b.txt";
        File file = new File(dir);
//如果文件不存在，创建文件
        if (!file.exists())
            file.createNewFile();
//创建BufferedWriter对象并向文件写入内容
        BufferedWriter bw = new BufferedWriter(new FileWriter(file));
//向文件中写入内容
        bw.write("line1: the second way to write and read\n");
        bw.write("line2: the second way to write and read\n");
        bw.flush();
        bw.close();
//创建BufferedReader读取文件内容
        BufferedReader br = new BufferedReader(new FileReader(file));
        int i = 0;
        int readLine = 2;
        String line;
        while ((line=br.readLine())!=null) {
            i++;
            if(i <= readLine)
            {
                System.out.println(line);
            }
        }
        br.close();
    }
}

```

### 2.3 FileInputStream和FileOutputStream

> 以字节的形式写入文件，读取文件时先读取字节数组，再将字节数组转换为字符串形式

```java
import java.io.*;

/**
 * @author : echo0d
 * @date : 2023/10/5 13:52
 * @Description :
 */
public class FileInputStreamTest {
    public static void main(String[] args) throws IOException {
        String dir = "D:\\c.txt";
        File file = new File(dir);
        //如果文件不存在，创建文件
        if (!file.exists())
            file.createNewFile();
        //创建FileOutputStream对象，写入内容
        FileOutputStream fos = new FileOutputStream(file);
        //向文件中写入内容
        fos.write("the third way to write and read".getBytes());
        fos.close();

        //创建FileInputStream对象，读取文件内容
        FileInputStream fis = new FileInputStream(file);
        // 定义每次输入流读取到的字节数对象
        int a = 0;
        // 定义缓冲区大小
        byte[] bytes = new byte[1024];
        // 创建二进制输出流对象
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        // 循环读取文件内容
        while ((a = fis.read(bytes)) != -1) {
            // 截取缓冲区数组中的内容，(bytes, 0, a)其中的0表示从bytes数组的
            // 下标0开始截取，a表示输入流read到的字节数。
            out.write(bytes, 0, a);
        }
        System.out.println(out.toString());
        fis.close();
    }
}
```

### 2.4 RandomAccessFile



```java
import java.io.*;

/**
 * @author : echo0d
 * @date : 2023/10/5 14:11
 * @Description :
 */
public class RandomAccessFileTest {
    public static void main(String[] args) throws IOException {
        RandomAccessFileTest randomAccessFileTest = new RandomAccessFileTest();
        randomAccessFileTest.FileWrite();
        randomAccessFileTest.FileRead();
    }

    public void FileWrite() throws IOException {
        File file = new File("D:\\d.txt");
        // 定义待写入文件内容
        String content = "the fourth way to write and read";
        // 创建RandomAccessFile对象,rw表示以读写模式打开文件，一共有:r(只读)、rw(读写)、
        // rws(读写内容同步)、rwd(读写内容或元数据同步)四种模式。
        RandomAccessFile raf = new RandomAccessFile(file, "rw");
        // 写入内容二进制到文件
        raf.write(content.getBytes());
        raf.close();
    }
    public void FileRead() throws IOException {
        File file  = new File("D://d.txt");
        RandomAccessFile raf = new RandomAccessFile(file, "r");
        // 定义每次输入流读取到的字节数对象
        int a = 0;
        // 定义缓冲区大小
        byte[] bytes = new byte[1024];
        // 创建二进制输出流对象
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        // 循环读取文件内容
        while ((a = raf.read(bytes)) != -1) {
            // 截取缓冲区数组中的内容，(bytes, 0, a)其中的0表示从bytes数组的
            // 下标0开始截取，a表示输入流read到的字节数。
            out.write(bytes, 0, a);
        }
        System.out.println(out.toString());
    }
}

```

### 2.5 FileSystemProvider

> `java.nio.file.Files`是通过调用`FileSystemProvider`实现的文件操作

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author : echo0d
 * @date : 2023/10/5 14:29
 * @Description :
 */
public class FileSystemProviderTest {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("D:\\e.txt");
        // 定义待写入文件内容
        String content = "the fifth way to write and read";
        // 写入内容二进制到文件
        Files.write(path, content.getBytes());
        // 开始读文件
        byte[] bytes = Files.readAllBytes(path);
        System.out.println(new String(bytes));
    }
}

```

