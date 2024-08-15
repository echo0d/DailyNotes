# Java常见漏洞

## 命令执行

Java中实现命令执行的方式：

* 反射
* `Runtime.getRuntime.exec`
* `ProcessBuilder`
* `groovy_shell`

代码审计时，查找可用于命令执行的相关关键字如`groovy`、`Runtime.getRuntime.exec`、`ProcessBuilder  `、`Class.forName`等，找到对应的地址后跟踪方法调用栈，最后找他的入口点即客户端传参获取地点进行分析

**示例代码1：使用 `Runtime.getRuntime().exec()`**

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class CommandExecutor {
    public static void main(String[] args) {
        try {
            Process process = Runtime.getRuntime().exec("calc");
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

**示例代码2：使用 `ProcessBuilder`**

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ProcessBuilderDemo {
    public static void main(String[] args) {
        try {
            ProcessBuilder builder = new ProcessBuilder("ipconfig");
            Process process = builder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

**示例代码3：使用`GroovyShell`**

```java
import groovy.lang.GroovyShell;

public class groovyShellDemo {
    public static void main(String[] args) {
        GroovyShell shell = new GroovyShell();
        String cmd = "\"whoami\".execute().text";
        System.out.println(shell.evaluate(cmd));
    }
}

```

类似的还有很多，还可以远程加载脚本，参考[Groovy命令执行指南 - Atomovo - 博客园 (cnblogs.com)](https://www.cnblogs.com/yyhuni/p/18012041)

**示例代码4：反射调用之一**

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.Class;
import java.lang.reflect.*;
public class reflectDemo {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Class<?> c = Class.forName("java.lang.Runtime");//获取类
        Method m1 =  c.getMethod("getRuntime");//获取getRuntime方法，用于创建对象
        Method m2 = c.getMethod("exec",String.class);//获取exec方法，用于执行命令
        Object obj =  m1.invoke(null,null);//创建对象
        Process process = (Process) m2.invoke(obj,"whoami");//反射调用
        // 下面可以不要，直接m2.invoke(obj,"whoami"); 只是没回显
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

```

## 反序列化

在Java中反序列化漏洞之所以比较严重的原因之一是：Java存在大量的公用库，例如Apache Commons Collections。WebLogic、WebSphere、JBoss、Jenkins、OpenNMS这些应用的反序列化漏洞能够得以利用，便是依靠了Apache Commons Collections。当然反序列漏洞的根源并不在于公共库，而是在于Java程序没有对反序列化生成的对象的类型做限制。

代码审计时，首先查找用于解析的类库（xml、yml、json等），追踪方法调用栈然后考虑参数是否可控：

* `XMLDecoder.readObject` 

* `Yaml.load`
* `XStream.fromXML `
*  `ObjectMapper.readValue`
* `JSON.parseObject`

当参数可控时，查找应用的Class Path中是否包含Apache Commons Collections等危险库（ysoserial所支持的其他库亦可）。同时满足了这些条件后，我们便可直接通过ysoserial生成所需的命令执行的反序列化语句。  

利用链通常分为三部分，触发点、中继点、执行点。

* 触发点

  * 触发点比较简单，主要是`readObj`

* 中继点，这里不太懂，管他呢 我也挖不出来~

  * 动态代理，相关知识可参考[Java动态代理](https://juejin.im/post/5ad3e6b36fb9a028ba1fee6a)。要实现动态代理需要有三个类：

    * 委托类，委托类就是处理业务逻辑的类，动态代理的目的就是在委托类中的代码运行时插入其他的操作，如日志打印。此外，委托类必须实现某个接口。

    * 中介类，中介类是对`InvocationHandler`接口的实现，它持有一个委托类对象的引用，在代理类调用相关方法时，会劫持到中介类的`invoke`方法中，在插入操作后，通过反射调用委托类的方法。

    * 代理类，代理类通过`Proxy.newProxyInstance`来创建，返回类型是委托类所实现的接口的类型。其他类会调用代理类来获取相应的功能，委托类是透明的。

* **执行点**

  反序列化利用链的挖掘比较困难的点是反序列化执行点，有了反序列化执行点，一般情况下都可以挖掘出不止一条的利用连。常见执行命令的方式：

  * 反射利用`Runtime.getRuntime().exec`或`java.lang.ProcessBuilder`执行
  * JNDI远程调用
  * Templates执行字节码
  * EL表达式
  * 其他可执行命令的接口

## 文件相关

文件上传、下载、删除

关键字：

* JDK原始的`java.io.FileInputStream`类
* JDK原始的`java.io.RandomAccessFile`类
* Apache Commons IO提供的`org.apache.commons.io.FileUtils`类
* JDK1.7新增的基于NIO非阻塞异步读取文件的`java.nio.channels.AsynchronousFileChannel`类。
* JDK1.7新增的基于NIO读取文件的`java.nio.file.Files`类。常用方法如:`Files.readAllBytes`、`Files.readAllLines`
* `FileInputStream`
* `FileOutputStream`
* `File`
* `FileUtils`
* `IOUtils`
* `BufferedReader`
* `ServletFileUpload`
* `MultipartFile`
* `CommonsMultipartFile`
* `PrintWriter`
* `ZipInputStream`
* `ZipEntry.getSize`
* `Delete`
* `deleteFile`
* `fileName`
* `filePath`

找到对应的地址后跟踪方法调用栈，最后找他的入口点即客户端传参获取地点进行分析

## 表达式注入

Spring为解析SpEL提供了两套不同的接口，分别是`SimpleEvaluationContext`及`StandardEvaluationContext`。`SimpleEvaluationContext`仅支持SpEL语法的子集，抛弃了Java类型引用、构造函数及beam引用相对较为安全。而`StandardEvaluationContext`则包含了SpEL的所有功能，并且在不指定
`EvaluationContext`的情况下，将默认采用`StandardEvaluationContext`。
漏洞成因：很大一部分开发人员未对用户输入进行处理就直接通过解析引擎对SpEL继续解析。一旦用户能够控制解析的SpEL语句，便可通过反射的方式构造代码执行的SpEL语句，从而达到RCE的目的。

**SpEL表达式的用法**

1. 注解（无法外部传入）

   ```java
   @value("#{表达式}")
   public String arg;
   ```

2. xml

   ```xml
   <bean id="Bean1" class="com.test.xxx">
   	<property name="arg" value="#{表达式}">
   </bean>
   ```

   前面两种情况通常也是写死在代码中的，但是也有已知的利用场景，就是利用反序列化让程序加载我们事先构造好的恶意xml文件，如jackson的CVE-2017-17485、weblogic的CVE-2019-2725等。

3. 在代码中处理外部传入的表达式

   这部分是关注的重点。

   ```java
   @RequestMapping("/spel")
   public String spel(@RequestParam(name = "spel") String spel) {
       ExpressionParser expressionParser = new SpelExpressionParser();
       Expression expression = expressionParser.parseExpression(spel);
       Object object = expression.getValue();
       return object.toString();
   }
   ```

**漏洞可以利用的前置条件有三个：**

1. 传入的表达式没过滤
2. 表达式解析之后调用了`getValue/setValue`方法
3. 使用`StandardEvaluationContext`（默认）作为上下文对象

**想要执行命令，spel表达式有如下两种：**

* 使用`T(Type)`表示`Type`类的实例,`Type`为全限定名称,如`T(com.test.Bean1)`。但是`java.lang`例外,该包下的类可以不指定包名。得到类实例后会访问类静态方法与字段。

  ```java
  T(java.lang.Runtime).getRuntime().exec("whoami")
  ```

* 直接通过java语法实例化对象、调用方法

  ```java
  new ProcessBuilder("whoami").start()
  
  //可以利用反射来绕过一些过滤
  #{''.getClass().forName('java.la'+'ng.Ru'+'ntime').getMethod('ex'+'ec',''.getClass()).invoke(''.getClass().forName('java.la'+'ng.Ru'+'ntime').getMethod('getRu'+'ntime').invoke(null),'calc')}
  ```

**审计技巧：**

全局查找关键字

* `org.springframework.expression`
* `parseExpression`
* `getValue`
* `getValueType`
* `value="#{*}`

## SQL注入

**执行sql语句的几种方式**

1. JDBC
2. Hibernate  
3. Mybatis

**审计技巧**

* 使用`statement`对象带入数据库中查询
* `+`、`append`直接拼接（**没有预编译**）
* `like`、`order by`等无法使用**预编译**的语句

* `$()`拼接参数
* 常用的sql查询关键字，如`Select`,`insert`,`update`,`delete`
* `%`、`in`等

找到对应的地址后跟踪方法调用栈，最后找客户端传参获取地点进行分析

## SSRF

SSRF漏洞形成的原因大部分是因为服务端提供了可以从其他服务器获取资源的功能，然而并没有对用户的输入以及发起请求的url进行过滤&限制，从而导致了ssrf的漏洞。  

**常见漏洞情况**

* 抓取用户输入图片的地址并且本地化存储
* 从远程服务器请求资源
* 对外发起网络请求  

**利用方式**

* 利用file协议读取文件内容（仅限使用URLConnection或URL发起的请求）
* 利用http 进行内网web服务端口探测
* 利用http 进行内网非web服务端口探测(如果将异常抛出来的情况下)
* 利用http进行NTLM-relay攻击(仅限 HttpURLConnection 或者二次包装 HttpURLConnection 并未复写AuthenticationInfo方法的对象)  **不懂**

**审计技巧**

* 全局查找`URLConnection`、`HttpURLConnection`、`HttpClient`、`Request`、`okhttp`、`OkHttpClient`、`Request.Get`、`Request.post`、`URL.openStream`、`ImageIO`等能够发起远程请求的类及函数，找到对应地址后打断点跟踪引用其的方法调用栈，从客户端传参开始，判断是否可控，及可控情况

* SSRF漏洞**URL**中常出现url、f、file、page等**参数**。

## XXE

**解析XML的几种方式**

* XMLReader  
* SAXBuilder  
* SAXReader  
* SAXParserFactory  
* Digester  
* DocumentBuilderFactory  

**审计技巧**

- `Documentbuilder`
- `DocumentBuilderFactory`

- `SAXReader`

- `SAXParser`

- `SAXParserFactory`

- `SAXBuilder`

- `TransformerFactory`

- `reqXml`

- `getInputStream`

- `XMLReaderFactory`

- `.newInstance`

- `SchemaFactory`
- `SAXTransformerFactory`

- `javax.xml.bind`
- `XMLReader`

- `XmlUtils.get`

- `Validator`

找到对应的地址后跟踪方法调用栈，最后找他的入口点即客户端传参获取地点进行分析

xxe的防御比较简单，禁用外部实体即可。

## XSS

不想写了