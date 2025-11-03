# 日常开发笔记

## 2025/10/21 - MyBatis-Plus JSON字段查询返回null问题

### 问题
使用 MyBatis-Plus 查询时，实体类中配置了 TypeHandler 的 JSON 字段始终返回 null，但新增/编辑操作正常。

### 原因
- MyBatis-Plus 默认不为实体类生成 ResultMap
- 没有 ResultMap 时，字段上的 `typeHandler` 配置在查询时不生效
- SQL 日志显示该字段被识别为 `<<BLOB>>` 类型

### 解决方法
在实体类的 `@TableName` 注解中添加 `autoResultMap = true`：

```java
@TableName(value = "table_name", autoResultMap = true)
public class Entity {
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> jsonField;
}
```

### 关键点
- `autoResultMap = true` 让 MyBatis-Plus 自动生成 ResultMap
- 生成的 ResultMap 会正确应用字段上的 typeHandler 配置
- 写入时 typeHandler 默认生效，但查询时需要 ResultMap 支持



## 2025/10/21 - Spring的@Transactional注解

`@Transactional` 是 Spring 框架提供的声明式事务管理注解，用于控制数据库事务的行为。

### 主要作用
- 自动管理事务的开启、提交和回滚
- 确保方法内的数据库操作要么全部成功，要么全部失败（原子性）

### 常用属性

#### 1. `rollbackFor`
指定哪些异常会触发事务回滚：
```java
@Transactional(rollbackFor = Exception.class)  // 所有 Exception 都回滚
```

#### 2. `propagation`
事务传播行为：
- `REQUIRED`（默认）：如果当前存在事务，则加入；否则创建新事务
- `REQUIRES_NEW`：总是创建新事务，挂起当前事务
- `NESTED`：嵌套事务，支持部分回滚

#### 3. `isolation`
事务隔离级别：
- `READ_UNCOMMITTED`：最低隔离级别，可能脏读
- `READ_COMMITTED`：防止脏读
- `REPEATABLE_READ`（MySQL默认）：防止脏读和不可重复读
- `SERIALIZABLE`：最高隔离级别，完全串行化

#### 4. `readOnly`
标记为只读事务（优化性能）：
```java
@Transactional(readOnly = true)
```

#### 5. `timeout`
事务超时时间（秒）：
```java
@Transactional(timeout = 30)
```

### 使用位置
- **类级别**：对该类的所有 public 方法生效
- **方法级别**：仅对该方法生效（会覆盖类级别配置）

### 注意事项
1. **只对 public 方法生效**
2. **自调用失效**：同一个类内部方法调用不会触发事务（因为没有走代理）
3. **异常类型**：只写 `@Transactional` 不加任何参数，默认只对 `RuntimeException` 和 `Error` 回滚，checked 异常不会回滚（需要指定 `rollbackFor`）





## 2025/10/21 - 分页表格跨页选择数据丢失问题

### 问题
在使用 Ant Design Vue 的表格组件实现多选功能时，发现每次翻页后，之前页面中已选择的数据会被清空，无法实现跨页面的多选保持。

### 问题
Ant Design Vue 的 `<a-table>` 组件在数据源（`dataSource`）发生变化时，默认会重置 `selectedRowKeys`。当用户翻页时，虽然视觉上看起来是同一个表格，但实际上表格的 `dataSource` 已经更新为新的数据，这会触发组件的内部重置逻辑，导致之前的选择状态丢失。

### 解决方案

#### 1. 启用跨页选择保持
在表格的 `:row-selection` 配置中添加 `preserveSelectedRowKeys: true`：

```vue
<a-table
  :columns="columns"
  :data-source="dataList"
  :row-selection="{
    selectedRowKeys: selectedKeys,
    onChange: handleSelectionChange,
    preserveSelectedRowKeys: true  // 关键配置：保持选中的 key
  }"
  :pagination="paginationConfig"
/>
```

#### 2. 使用数组展开避免引用问题
在选择变化的回调函数中，使用数组展开运算符创建新数组，而不是直接引用：

```javascript
// ❌ 错误写法 - 直接引用
const handleSelectionChange = (keys) => {
  formData.value.selectedIds = keys
}

// ✅ 正确写法 - 创建新数组
const handleSelectionChange = (keys) => {
  formData.value.selectedIds = [...keys]
}
```

#### 3. 初始化数组避免 undefined 错误
在表单打开或初始化时，确保选中的数组字段被初始化为空数组：

```javascript
const openForm = () => {
  formData.value = {
    selectedIds: [], // 初始化为空数组，避免 undefined
    // ...其他字段
  }
}
```

### 完整示例

```vue
<template>
  <a-table
    :columns="columns"
    :data-source="dataList"
    :row-selection="{
      selectedRowKeys: formData.selectedIds,
      onChange: handleSelectionChange,
      preserveSelectedRowKeys: true
    }"
    :pagination="{
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total,
      showSizeChanger: true,
      showTotal: (total) => `共 ${total} 条`
    }"
    @change="handleTableChange"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const formData = ref({
  selectedIds: []
})

const dataList = ref([])
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

// 选择变化处理
const handleSelectionChange = (selectedRowKeys) => {
  formData.value.selectedIds = [...selectedRowKeys]
}

// 分页变化处理
const handleTableChange = (paginationInfo) => {
  pagination.value.current = paginationInfo.current
  pagination.value.pageSize = paginationInfo.pageSize
  loadData()
}

// 加载数据
const loadData = async () => {
  const response = await api.getData({
    current: pagination.value.current,
    size: pagination.value.pageSize
  })
  dataList.value = response.data.records
  pagination.value.total = response.data.total
}
</script>
```

### 关键要点

1. **preserveSelectedRowKeys**: 这是核心配置，告诉 Ant Design 在数据源变化时保持已选择的 key
2. **数组展开**: 使用 `[...array]` 创建新数组引用，确保 Vue 的响应式系统能正确追踪变化
3. **初始化**: 确保数组字段初始化为空数组而不是 undefined，避免运行时错误
4. **rowKey**: 确保表格数据有唯一的 key 字段（默认是 `key`，也可以通过 `:row-key` 指定）

### 适用场景

- 需要跨页面选择多条记录的场景
- 批量操作功能（如批量删除、批量导出等）
- 复杂表单中的关联数据选择



## Spring 异步方法不生效问题排查笔记

### 问题

在使用 Spring 的 `@Async` 注解实现异步方法时，发现方法并未真正异步执行。通过日志观察，异步方法与调用方法的线程名称相同，都在 HTTP 请求线程中执行，而不是在独立的异步线程池中运行。

**现象：**
- 调用方法日志线程：`[http-nio-82-exec-2]`
- 异步方法日志线程：`[http-nio-82-exec-2]` （期望应该是 `[task-1]` 等异步线程）
- HTTP 请求阻塞等待任务完成，导致超时错误

### 原因

Spring 的 `@Async` 注解基于 AOP 代理实现，存在以下限制条件：

#### 1. 缺少启用注解
Spring Boot 应用需要在配置类或启动类上添加 `@EnableAsync` 注解来启用异步功能。

#### 2. 方法修饰符限制
**Spring AOP 无法代理 private 方法**，因为：
- Spring 使用 CGLIB 或 JDK 动态代理
- **代理只能拦截 public 方法**
- private 方法无法被子类覆盖，AOP 切面无法介入

#### 3. 自调用问题
在同一个类内部直接调用异步方法（`this.asyncMethod()`）会绕过代理，导致 `@Async` 失效。

### 解决方案

#### 步骤 1：启用异步支持

在 Spring Boot 启动类添加 `@EnableAsync` 注解：

```java
@SpringBootApplication
@EnableAsync  // 启用异步功能
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

#### 步骤 2：修改方法访问修饰符

将异步方法的访问修饰符从 `private` 改为 `public`：

```java
// ❌ 错误：private 方法，AOP 无法代理
@Async
private void processAsync() {
    // 异步逻辑
}

// ✅ 正确：public 方法，AOP 可以代理
@Async
public void processAsync() {
    // 异步逻辑
}
```

#### 步骤 3：验证异步执行

通过日志确认异步方法在独立线程中执行：

```java
public void callMethod() {
    log.info("调用方法，线程：{}", Thread.currentThread().getName());
    // 输出：调用方法，线程：http-nio-82-exec-2
    
    asyncMethod();
    log.info("已提交异步任务");
}

@Async
public void asyncMethod() {
    log.info("异步方法执行，线程：{}", Thread.currentThread().getName());
    // 输出：异步方法执行，线程：task-1
}
```

### 异步方法写法

#### 1. 自定义线程池

默认情况下，Spring 使用 `SimpleAsyncTaskExecutor`，建议自定义线程池：

```java
@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {
    
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-task-");
        executor.initialize();
        return executor;
    }
}
```

#### 2. 异常处理

异步方法的异常不会传播到调用方，需要自定义异常处理器：

```java
@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {
    
    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (ex, method, params) -> {
            log.error("异步方法执行异常 - 方法: {}, 参数: {}", 
                method.getName(), Arrays.toString(params), ex);
        };
    }
}
```

#### 3. 返回值处理

异步方法可以返回 `Future`、`CompletableFuture` 或 `ListenableFuture`：

```java
@Async
public CompletableFuture<String> asyncMethodWithReturn() {
    // 执行异步任务
    String result = doSomething();
    return CompletableFuture.completedFuture(result);
}
```





## 2025/11/03 - Knife4j 文档页面空白问题排查与解决

### 问题

访问 `http://localhost:82/doc.html` 页面显示空白，无法加载 API 文档界面。

1. 初步检查配置

- ✅ Knife4j 依赖已正确引入
- ✅ `application.properties` 中 Knife4j 配置正确
- ✅ `GlobalConfigure.java` 中静态资源映射配置正确
- ✅ API 接口 `/v3/api-docs` 可以正常访问（需要 Basic 认证）

2. 查看调试日志

启用调试模式后，发现关键日志：
```log
DEBUG o.s.w.s.s.s.WebSocketHandlerMapping : Mapped to WebSocketHttpRequestHandler
DEBUG o.s.w.s.s.s.WebSocketHttpRequestHandler : GET /doc.html
DEBUG o.s.w.s.s.s.HandshakeInterceptorChain : returns false from beforeHandshake
DEBUG o.s.web.servlet.DispatcherServlet : Completed 200 OK
```

**关键发现**：`/doc.html` 请求被错误地映射到了 WebSocket 处理器，而不是静态资源处理器。

### 原因

在 `WebSocketConfig.java` 中，WebSocket 处理器使用了过于宽泛的路径模式：

```java
registry.addHandler(new WsServerNodeHandler(), "/*")
```

#### 为什么会拦截 HTTP 请求？

1. Spring MVC 的请求处理流程中，`WebSocketHandlerMapping` 优先级较高
2. `"/*"` 模式会匹配所有单层路径，包括：
   - `/doc.html`
   - `/favicon.ico`
   - `/index.html`
   - 等等
3. 当 WebSocket 处理器匹配上请求后，会检查是否是 WebSocket 握手请求
4. 如果不是握手请求，拦截器返回 false，请求直接结束（返回 200 但无内容）
5. 静态资源处理器无法处理该请求，导致页面空白

### 解决方案

#### 修改 WebSocketConfig.java

**位置**：`snowy-plugin/snowy-plugin-attack/src/main/java/vip/xiaonuo/attack/modular/config/WebSocketConfig.java`

**修改前**：
```java
@Override
public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(shellWebSocketHandler, "/ws/shell/{sessionId}")
            .setAllowedOrigins("*");

    registry.addHandler(new WsServerNodeHandler(), "/*")  // ❌ 错误：拦截所有路径
            .addInterceptors(new WsHandshakeInterceptor())
            .setAllowedOrigins("*");
}
```

**修改后**：
```java
@Override
public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

    registry.addHandler(new WsServerNodeHandler(), "/ws/**")  // ✅ 正确：只拦截 /ws 开头的路径
            .addInterceptors(new WsHandshakeInterceptor())
            .setAllowedOrigins("*");
}
```

### 经验总结

#### 1. WebSocket 路径配置要谨慎
- ❌ 避免使用 `"/*"` 或 `"/**"` 等宽泛模式
- ✅ 使用明确的路径前缀，如 `"/ws/**"`

#### 2. 请求映射优先级
Spring MVC 中不同类型的 Handler Mapping 优先级：
1. `WebSocketHandlerMapping` - 优先级较高
2. `RequestMappingHandlerMapping` - 处理 @RequestMapping
3. `SimpleUrlHandlerMapping` - 处理静态资源

#### 3. 调试技巧
启用 Spring Web 调试日志可以快速定位路由问题：
```properties
logging.level.org.springframework.web=DEBUG
logging.level.org.springframework.web.servlet.resource=TRACE
```

#### 4. Ant 路径模式说明
- `"/"` - 只匹配根路径
- `"/*"` - 匹配单层路径（如 `/doc.html`）
- `"/**"` - 匹配多层路径（如 `/api/user/info`）
- `"/ws/**"` - 只匹配 `/ws` 开头的所有路径

