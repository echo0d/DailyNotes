# Java Hook 方法整理

在 Java 中，Hook 技术主要用于在不修改原始代码的情况下，对程序的执行流程进行拦截和增强。根据 Hook 生效的时机，可以将其分为 **静态 Hook (编译期/加载期)** 和 **动态 Hook (运行期)**。

## 1. 静态 Hook (Static Hook)

静态 Hook 指在程序运行之前（编译阶段）或类加载阶段（Load Time）修改字节码。

### 1.1 AspectJ (编译时织入 - Compile-Time Weaving)

AspectJ 是最成熟的 AOP 框架，它可以在编译阶段将切面代码直接织入到目标类的 `.class` 文件中。

*   **原理**：使用 `ajc` 编译器代替 `javac`，在编译时修改字节码。
*   **优点**：
    *   运行效率高（无运行时代理开销）。
    *   功能最强（可 Hook 构造函数、静态方法、final 方法、私有方法）。
*   **缺点**：需要特定的编译工具链支持，配置相对复杂。
*   **示例**：
    ```java
    public aspect LogAspect {
        // 定义切点：所有 Service 结尾类的所有方法
        pointcut serviceMethods(): execution(* *..*Service.*(..));

        // 前置通知
        before(): serviceMethods() {
            System.out.println("Before method execution");
        }
    }
    ```

### 1.2 Java Agent (Premain - 加载时织入)

利用 JVM 的 `Instrumentation` API，在类加载（Class Loading）阶段修改字节码。

*   **原理**：
    1.  编写一个包含 `premain` 方法的 Agent Jar。
    2.  启动应用时添加参数 `-javaagent:myagent.jar`。
    3.  JVM 启动时加载 Agent，调用 `premain`。
    4.  Agent 注册 `ClassFileTransformer`。
    5.  当类被加载时，Transformer 拦截字节码并进行修改（使用 ASM, Javassist, ByteBuddy 等库）。
*   **示例**：
    ```java
    public static void premain(String agentArgs, Instrumentation inst) {
        inst.addTransformer(new MyClassFileTransformer());
    }
    ```
*   **场景**：全链路监控（SkyWalking, Pinpoint）、全局日志埋点。

---

## 2. 动态 Hook (Runtime Hook)

动态 Hook 指在程序运行过程中，动态地创建代理对象或修改已加载的类。

### 2.1 动态代理 (Dynamic Proxy)

JDK 自带的动态代理机制，基于接口实现。

*   **原理**：利用 `java.lang.reflect.Proxy` 在内存中生成一个实现了目标接口的新类。
*   **限制**：**只能代理接口**，无法代理未实现接口的类。
*   **示例**：
    ```java
    Service proxy = (Service) Proxy.newProxyInstance(loader, interfaces, handler);
    ```

### 2.2 CGLIB / ByteBuddy (子类代理)

通过生成目标类的子类来实现代理。

*   **原理**：在运行时动态生成目标类的子类，并重写非 `final` 方法，在子类中插入拦截逻辑。
*   **优点**：无需接口，可代理普通类。
*   **限制**：**无法代理 final 类或 final 方法**。
*   **场景**：Spring AOP (无接口时默认使用 CGLIB)。
*   **示例 (CGLIB)**：
    ```java
    Enhancer enhancer = new Enhancer();
    enhancer.setSuperclass(TargetClass.class);
    enhancer.setCallback((MethodInterceptor) (obj, method, args, proxy) -> {
        System.out.println("Before " + method.getName());
        Object result = proxy.invokeSuper(obj, args); // 注意调用 invokeSuper
        System.out.println("After " + method.getName());
        return result;
    });
    TargetClass proxy = (TargetClass) enhancer.create();
    ```

### 2.3 Java Agent (Agentmain - 运行时重定义)

利用 JVM 的 Attach 机制，在 JVM 运行时动态注入 Agent。

*   **原理**：
    1.  通过 `VirtualMachine.attach(pid)` 连接到目标 JVM 进程。
    2.  加载 Agent Jar，触发 `agentmain` 方法。
    3.  获取 `Instrumentation` 实例。
    4.  调用 `inst.retransformClasses(targetClass)` 触发类的重定义。
*   **能力**：可以在不重启应用的情况下修改类逻辑（热部署）。
*   **限制**：运行时修改字节码有严格限制（如不能新增/删除字段或方法，只能修改方法体）。
*   **场景**：Arthas (在线诊断), JRebel (热部署)。
*   **示例**：
    ```java
    // Agentmain 入口
    public static void agentmain(String agentArgs, Instrumentation inst) {
        inst.addTransformer(new MyClassFileTransformer(), true);
        try {
            // 触发已加载类的重转换
            inst.retransformClasses(TargetClass.class);
        } catch (UnmodifiableClassException e) {
            e.printStackTrace();
        }
    }

    // Attach 客户端代码 (通常在另一个进程运行)
    public static void main(String[] args) throws Exception {
        String pid = "12345"; // 目标 JVM 进程 ID
        VirtualMachine vm = VirtualMachine.attach(pid);
        vm.loadAgent("/path/to/agent.jar");
        vm.detach();
    }
    ```

### 2.4 Native Hook (JNI / JVMTI)

跳出 JVM 层面，直接在操作系统或 Native 层面进行 Hook。

*   **原理**：使用 JNI 调用 C/C++ 代码，利用操作系统的 Hook 技术（如 PLT Hook, Inline Hook）或 JVMTI (JVM Tool Interface) 事件回调。
*   **场景**：
    *   JVM 自身性能分析（Profiler）。
    *   深度调试。
    *   系统级调用监控。

---

### 总结对比

| 类别 | 技术方案 | 生效时机 | 核心特点 | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **静态 Hook** | **AspectJ (CTW)** | 编译期 | 修改 .class 文件，性能最高，无限制 | 复杂切面，高性能要求 |
| **静态 Hook** | **Java Agent (Premain)** | 类加载期 | 修改字节码，无侵入 | APM 监控，字节码增强 |
| **动态 Hook** | **JDK 动态代理** | 运行时 | 基于接口，生成代理对象 | RPC, 简单 AOP |
| **动态 Hook** | **CGLIB/ByteBuddy** | 运行时 | 基于子类，生成代理对象 | Spring AOP |
| **动态 Hook** | **Java Agent (Attach)** | 运行时 | 重定义已加载的类 (Retransform) | 在线诊断 (Arthas)，热修复 |
