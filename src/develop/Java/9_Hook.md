# Java Hook 方法整理

在 Java 中，Hook 技术主要用于在不修改原始代码的情况下，对程序的执行流程进行拦截和增强。根据 Hook 生效的时机，可以将其分为 **静态 Hook (编译期/加载期)** 和 **动态 Hook (运行期)**。

## 1. 静态 Hook (Static Hook)

静态 Hook 指在程序运行之前（编译阶段）或类加载阶段（Load Time）修改字节码。

### 1.1 AspectJ (编译时织入 - Compile-Time Weaving)

AspectJ 是最成熟的 AOP 框架，它可以在编译阶段将切面代码直接织入到目标类的 `.class` 文件中。

- **原理**：使用 `ajc` 编译器代替 `javac`，在编译时修改字节码。
- **优点**：
  - 运行效率高（无运行时代理开销）。
  - 功能最强（可 Hook 构造函数、静态方法、final 方法、私有方法）。
- **缺点**：需要特定的编译工具链支持，配置相对复杂。
- **完整示例**：

  ```java
  // 目标业务类
  public class UserService {
      public void createUser(String username) {
          System.out.println("创建用户: " + username);
      }

      public void deleteUser(String username) {
          System.out.println("删除用户: " + username);
      }
  }

  // AspectJ 切面定义
  public aspect LogAspect {
      // 定义切点：所有 Service 结尾类的所有方法
      pointcut serviceMethods(): execution(* *..*Service.*(..));

      // 前置通知：方法执行前
      before(): serviceMethods() {
          System.out.println("[AspectJ] Before method: " + thisJoinPoint.getSignature());
      }

      // 后置通知：方法执行后
      after(): serviceMethods() {
          System.out.println("[AspectJ] After method: " + thisJoinPoint.getSignature());
      }

      // 环绕通知：完全控制方法执行
      Object around(): serviceMethods() {
          long start = System.currentTimeMillis();
          Object result = proceed(); // 执行原方法
          long end = System.currentTimeMillis();
          System.out.println("[AspectJ] Method cost: " + (end - start) + "ms");
          return result;
      }
  }

  // 主程序测试
  public class Main {
      public static void main(String[] args) {
          UserService service = new UserService();
          service.createUser("Alice");
          // 输出：
          // [AspectJ] Before method: void UserService.createUser(String)
          // 创建用户: Alice
          // [AspectJ] After method: void UserService.createUser(String)
          // [AspectJ] Method cost: 5ms
      }
  }
  ```

  **编译配置 (pom.xml)**：

  ```xml
  <plugin>
      <groupId>org.codehaus.mojo</groupId>
      <artifactId>aspectj-maven-plugin</artifactId>
      <version>1.14.0</version>
      <configuration>
          <complianceLevel>1.8</complianceLevel>
      </configuration>
      <executions>
          <execution>
              <goals>
                  <goal>compile</goal>
              </goals>
          </execution>
      </executions>
  </plugin>
  ```

### 1.2 Java Agent (Premain - 加载时织入)

利用 JVM 的 `Instrumentation` API，在类加载（Class Loading）阶段修改字节码。

- **原理**：

  1. 编写一个包含 `premain` 方法的 Agent Jar。
  2. 启动应用时添加参数 `-javaagent:myagent.jar`。
  3. JVM 启动时加载 Agent，调用 `premain`。
  4. Agent 注册 `ClassFileTransformer`。
  5. 当类被加载时，Transformer 拦截字节码并进行修改（使用 ASM, Javassist, ByteBuddy 等库）。

- **完整示例**：

  ```java
  // 1. Agent 入口类
  import java.lang.instrument.Instrumentation;

  public class MyAgent {
      public static void premain(String agentArgs, Instrumentation inst) {
          System.out.println("[Agent] 开始加载 Agent, 参数: " + agentArgs);
          inst.addTransformer(new MyClassFileTransformer());
      }
  }

  // 2. 字节码转换器 (使用 Javassist)
  import java.lang.instrument.ClassFileTransformer;
  import java.security.ProtectionDomain;
  import javassist.*;

  public class MyClassFileTransformer implements ClassFileTransformer {
      @Override
      public byte[] transform(ClassLoader loader, String className,
                            Class<?> classBeingRedefined,
                            ProtectionDomain protectionDomain,
                            byte[] classfileBuffer) {
          // 只处理目标类
          if (!"com/example/UserService".equals(className)) {
              return null; // 返回 null 表示不修改
          }

          try {
              System.out.println("[Agent] 开始修改类: " + className);
              ClassPool pool = ClassPool.getDefault();
              CtClass ctClass = pool.get(className.replace("/", "."));

              // 获取所有方法
              for (CtMethod method : ctClass.getDeclaredMethods()) {
                  // 在方法前后插入日志代码
                  method.insertBefore("System.out.println(\"[Hook] 进入方法: " + method.getName() + "\");");
                  method.insertAfter("System.out.println(\"[Hook] 退出方法: " + method.getName() + "\");");
              }

              byte[] byteCode = ctClass.toBytecode();
              ctClass.detach();
              return byteCode;
          } catch (Exception e) {
              e.printStackTrace();
              return null;
          }
      }
  }

  // 3. 目标业务类
  package com.example;

  public class UserService {
      public void createUser(String name) {
          System.out.println("创建用户: " + name);
      }
  }

  // 4. 测试主程序
  package com.example;

  public class Main {
      public static void main(String[] args) {
          UserService service = new UserService();
          service.createUser("Alice");
          // 输出：
          // [Hook] 进入方法: createUser
          // 创建用户: Alice
          // [Hook] 退出方法: createUser
      }
  }
  ```

  **MANIFEST.MF 配置**：

  ```text
  Manifest-Version: 1.0
  Premain-Class: MyAgent
  Can-Retransform-Classes: true
  Can-Redefine-Classes: true
  ```

  **启动命令**：

  ```bash
  java -javaagent:myagent.jar -jar myapp.jar
  ```

- **场景**：全链路监控（SkyWalking, Pinpoint）、全局日志埋点、性能分析。

---

## 2. 动态 Hook (Runtime Hook)

动态 Hook 指在程序运行过程中，动态地创建代理对象或修改已加载的类。

### 2.1 动态代理 (Dynamic Proxy)

JDK 自带的动态代理机制，基于接口实现。

- **原理**：利用 `java.lang.reflect.Proxy` 在内存中生成一个实现了目标接口的新类。
- **限制**：**只能代理接口**，无法代理未实现接口的类。
- **完整示例**：

  ```java
  import java.lang.reflect.*;

  // 1. 定义接口
  interface UserService {
      void createUser(String name);
      String getUser(int id);
  }

  // 2. 实现类
  class UserServiceImpl implements UserService {
      @Override
      public void createUser(String name) {
          System.out.println("创建用户: " + name);
      }

      @Override
      public String getUser(int id) {
          System.out.println("查询用户 ID: " + id);
          return "User-" + id;
      }
  }

  // 3. 动态代理处理器
  class LogInvocationHandler implements InvocationHandler {
      private final Object target;

      public LogInvocationHandler(Object target) {
          this.target = target;
      }

      @Override
      public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
          // 方法执行前
          System.out.println("[Proxy] 调用方法: " + method.getName());
          System.out.println("[Proxy] 参数: " + Arrays.toString(args));

          long start = System.currentTimeMillis();

          // 执行原方法
          Object result = method.invoke(target, args);

          long end = System.currentTimeMillis();

          // 方法执行后
          System.out.println("[Proxy] 返回值: " + result);
          System.out.println("[Proxy] 耗时: " + (end - start) + "ms");

          return result;
      }
  }

  // 4. 测试类
  public class DynamicProxyDemo {
      public static void main(String[] args) {
          // 创建真实对象
          UserService realService = new UserServiceImpl();

          // 创建代理对象
          UserService proxyService = (UserService) Proxy.newProxyInstance(
              UserService.class.getClassLoader(),
              new Class[]{UserService.class},
              new LogInvocationHandler(realService)
          );

          // 通过代理对象调用方法
          proxyService.createUser("Alice");
          System.out.println("---");
          String user = proxyService.getUser(123);

          // 输出：
          // [Proxy] 调用方法: createUser
          // [Proxy] 参数: [Alice]
          // 创建用户: Alice
          // [Proxy] 返回值: null
          // [Proxy] 耗时: 2ms
          // ---
          // [Proxy] 调用方法: getUser
          // [Proxy] 参数: [123]
          // 查询用户 ID: 123
          // [Proxy] 返回值: User-123
          // [Proxy] 耗时: 1ms
      }
  }
  ```

### 2.2 CGLIB / ByteBuddy (子类代理)

通过生成目标类的子类来实现代理。

- **原理**：在运行时动态生成目标类的子类，并重写非 `final` 方法，在子类中插入拦截逻辑。
- **优点**：无需接口，可代理普通类。
- **限制**：**无法代理 final 类或 final 方法**。
- **场景**：Spring AOP（无接口时默认使用 CGLIB）。

#### CGLIB 完整示例

```java
import net.sf.cglib.proxy.*;
import java.lang.reflect.Method;
import java.util.Arrays;

// 1. 目标类（无需实现接口）
class UserService {
    public void createUser(String name) {
        System.out.println("创建用户: " + name);
    }

    public String getUser(int id) {
        System.out.println("查询用户 ID: " + id);
        return "User-" + id;
    }
}

// 2. 方法拦截器
class LogMethodInterceptor implements MethodInterceptor {
    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        // 方法执行前
        System.out.println("[CGLIB] 调用方法: " + method.getName());
        System.out.println("[CGLIB] 参数: " + Arrays.toString(args));

        long start = System.currentTimeMillis();

        // 执行原方法（注意：使用 invokeSuper 而不是 invoke）
        Object result = proxy.invokeSuper(obj, args);

        long end = System.currentTimeMillis();

        // 方法执行后
        System.out.println("[CGLIB] 返回值: " + result);
        System.out.println("[CGLIB] 耗时: " + (end - start) + "ms");

        return result;
    }
}

// 3. 测试类
public class CglibProxyDemo {
    public static void main(String[] args) {
        // 创建 CGLIB 增强器
        Enhancer enhancer = new Enhancer();

        // 设置父类（被代理类）
        enhancer.setSuperclass(UserService.class);

        // 设置回调拦截器
        enhancer.setCallback(new LogMethodInterceptor());

        // 创建代理对象
        UserService proxy = (UserService) enhancer.create();

        // 调用代理对象的方法
        proxy.createUser("Bob");
        System.out.println("---");
        String user = proxy.getUser(456);

        // 输出：
        // [CGLIB] 调用方法: createUser
        // [CGLIB] 参数: [Bob]
        // 创建用户: Bob
        // [CGLIB] 返回值: null
        // [CGLIB] 耗时: 3ms
        // ---
        // [CGLIB] 调用方法: getUser
        // [CGLIB] 参数: [456]
        // 查询用户 ID: 456
        // [CGLIB] 返回值: User-456
        // [CGLIB] 耗时: 1ms
    }
}
```

**Maven 依赖**：

```xml
<dependency>
    <groupId>cglib</groupId>
    <artifactId>cglib</artifactId>
    <version>3.3.0</version>
</dependency>
```

### 2.3 Java Agent (Agentmain - 运行时重定义)

利用 JVM 的 Attach 机制，在 JVM 运行时动态注入 Agent。

- **原理**：
  1. 通过 `VirtualMachine.attach(pid)` 连接到目标 JVM 进程。
  2. 加载 Agent Jar，触发 `agentmain` 方法。
  3. 获取 `Instrumentation` 实例。
  4. 调用 `inst.retransformClasses(targetClass)` 触发类的重定义。
- **能力**：可以在不重启应用的情况下修改类逻辑（热部署）。
- **限制**：运行时修改字节码有严格限制（如不能新增/删除字段或方法，只能修改方法体）。
- **场景**：Arthas（在线诊断），JRebel（热部署）。

- **完整示例**：

  ```java
  // ========== 项目 1: Agent Jar ==========

  // 1. Agent 入口类
  import java.lang.instrument.*;
  import javassist.*;

  public class RuntimeAgent {
      public static void agentmain(String agentArgs, Instrumentation inst) {
          System.out.println("[Agent] 运行时 Agent 已加载, 参数: " + agentArgs);

          // 注册转换器（第二个参数 true 表示支持重转换）
          inst.addTransformer(new RuntimeTransformer(), true);

          try {
              // 找到目标类并触发重转换
              Class<?>[] loadedClasses = inst.getAllLoadedClasses();
              for (Class<?> clazz : loadedClasses) {
                  if (clazz.getName().equals("com.example.UserService")) {
                      System.out.println("[Agent] 找到目标类，开始重转换: " + clazz.getName());
                      inst.retransformClasses(clazz);
                  }
              }
          } catch (UnmodifiableClassException e) {
              e.printStackTrace();
          }
      }
  }

  // 2. 字节码转换器
  class RuntimeTransformer implements ClassFileTransformer {
      @Override
      public byte[] transform(ClassLoader loader, String className,
                            Class<?> classBeingRedefined,
                            ProtectionDomain protectionDomain,
                            byte[] classfileBuffer) {
          if (!"com/example/UserService".equals(className)) {
              return null;
          }

          try {
              System.out.println("[Agent] 正在修改类: " + className);
              ClassPool pool = ClassPool.getDefault();
              CtClass ctClass = pool.get(className.replace("/", "."));

              // 修改 createUser 方法
              CtMethod method = ctClass.getDeclaredMethod("createUser");
              method.insertBefore("System.out.println(\"[热修复] 方法被增强!\");");

              byte[] byteCode = ctClass.toBytecode();
              ctClass.detach();
              return byteCode;
          } catch (Exception e) {
              e.printStackTrace();
              return null;
          }
      }
  }

  // MANIFEST.MF 配置
  /*
  Manifest-Version: 1.0
  Agent-Class: RuntimeAgent
  Can-Retransform-Classes: true
  Can-Redefine-Classes: true
  */

  // ========== 项目 2: 目标应用 ==========

  package com.example;

  public class UserService {
      public void createUser(String name) {
          System.out.println("创建用户: " + name);
      }
  }

  public class TargetApp {
      public static void main(String[] args) throws Exception {
          UserService service = new UserService();

          // 每隔 3 秒调用一次
          while (true) {
              service.createUser("Alice");
              Thread.sleep(3000);
          }
      }
  }

  // ========== 项目 3: Attach 客户端 ==========

  import com.sun.tools.attach.*;
  import java.io.IOException;
  import java.util.List;

  public class AttachClient {
      public static void main(String[] args) throws Exception {
          // 列出所有 JVM 进程
          List<VirtualMachineDescriptor> vms = VirtualMachine.list();
          System.out.println("当前运行的 JVM 进程:");
          for (VirtualMachineDescriptor vm : vms) {
              System.out.println("PID: " + vm.id() + ", Name: " + vm.displayName());
          }

          // 指定目标进程 ID
          String targetPid = "12345"; // 替换为实际的 PID

          System.out.println("\n正在 Attach 到进程: " + targetPid);
          VirtualMachine vm = VirtualMachine.attach(targetPid);

          // 加载 Agent Jar
          vm.loadAgent("/path/to/runtime-agent.jar", "param1=value1");

          System.out.println("Agent 已成功注入!");
          vm.detach();
      }
  }

  // Maven 依赖 (tools.jar)
  /*
  <dependency>
      <groupId>com.sun</groupId>
      <artifactId>tools</artifactId>
      <version>1.8</version>
      <scope>system</scope>
      <systemPath>${java.home}/../lib/tools.jar</systemPath>
  </dependency>
  */
  ```

  **使用步骤**：

  1. 启动目标应用 `TargetApp`，记录其进程 PID。
  2. 运行 `AttachClient`，将 Agent 动态注入到目标进程。
  3. 观察目标应用输出，方法已被增强，无需重启。

### 2.4 Native Hook (JNI / JVMTI)

跳出 JVM 层面，直接在操作系统或 Native 层面进行 Hook。

- **原理**：使用 JNI 调用 C/C++ 代码，利用操作系统的 Hook 技术（如 PLT Hook, Inline Hook）或 JVMTI (JVM Tool Interface) 事件回调。
- **场景**：
  - JVM 自身性能分析（Profiler）。
  - 深度调试。
  - 系统级调用监控。

---

### 总结对比

| 类别          | 技术方案                 | 生效时机 | 核心特点                           | 适用场景                  |
| :------------ | :----------------------- | :------- | :--------------------------------- | :------------------------ |
| **静态 Hook** | **AspectJ (CTW)**        | 编译期   | 修改 .class 文件，性能最高，无限制 | 复杂切面，高性能要求      |
| **静态 Hook** | **Java Agent (Premain)** | 类加载期 | 修改字节码，无侵入                 | APM 监控，字节码增强      |
| **动态 Hook** | **JDK 动态代理**         | 运行时   | 基于接口，生成代理对象             | RPC, 简单 AOP             |
| **动态 Hook** | **CGLIB/ByteBuddy**      | 运行时   | 基于子类，生成代理对象             | Spring AOP                |
| **动态 Hook** | **Java Agent (Attach)**  | 运行时   | 重定义已加载的类 (Retransform)     | 在线诊断 (Arthas)，热修复 |
