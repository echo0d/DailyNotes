---
category: Java
tag: Java
---

# 6-Java学习-注解

## 使用注解

什么是注解（Annotation）？注解是放在Java源码的类、方法、字段、参数前的一种特殊“注释”：

```java
// this is a component:
@Resource("hello")
public class Hello {
    @Inject
    int n;

    @PostConstruct
    public void hello(@Param String name) {
        System.out.println(name);
    }

    @Override
    public String toString() {
        return "Hello";
    }
}
```

注释会被编译器直接忽略，注解则可以被编译器打包进入class文件，因此，注解是一种用作标注的“元数据”。

### 注解的作用

从JVM的角度看，注解本身对代码逻辑没有任何影响，如何使用注解完全由工具决定。

Java的注解可以分为三类：

第一类是由编译器使用的注解，例如：

- `@Override`：让编译器检查该方法是否正确地实现了覆写；
- `@SuppressWarnings`：告诉编译器忽略此处代码产生的警告。

这类注解不会被编译进入`.class`文件，它们在编译后就被编译器扔掉了。

第二类是由工具处理`.class`文件使用的注解，比如有些工具会在加载class的时候，对class做动态修改，实现一些特殊的功能。这类注解会被编译进入`.class`文件，但加载结束后并不会存在于内存中。这类注解只被一些底层库使用，一般我们不必自己处理。

第三类是在程序运行期能够读取的注解，它们在加载后一直存在于JVM中，这也是最常用的注解。例如，一个配置了`@PostConstruct`的方法会在调用构造方法后自动被调用（这是Java代码读取该注解实现的功能，JVM并不会识别该注解）。

定义一个注解时，还可以定义配置参数。配置参数可以包括：

- 所有基本类型；
- String；
- 枚举类型；
- 基本类型、String、Class以及枚举的数组。

因为配置参数必须是常量，所以，上述限制保证了注解在定义时就已经确定了每个参数的值。

注解的配置参数可以有默认值，缺少某个配置参数时将使用默认值。

此外，大部分注解会有一个名为`value`的配置参数，对此参数赋值，可以只写常量，相当于省略了value参数。

如果只写注解，相当于全部使用默认值。

举个栗子，对以下代码：

```java
public class Hello {
    @Check(min=0, max=100, value=55)
    public int n;

    @Check(value=99)
    public int p;

    @Check(99) // @Check(value=99)
    public int x;

    @Check
    public int y;
}
```

`@Check`就是一个注解。第一个`@Check(min=0, max=100, value=55)`明确定义了三个参数，第二个`@Check(value=99)`只定义了一个`value`参数，它实际上和`@Check(99)`是完全一样的。最后一个`@Check`表示所有参数都使用默认值。

## 定义注解

Java语言使用`@interface`语法来定义注解（`Annotation`），它的格式如下：

```java
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```

注解的参数类似无参数方法，可以用`default`设定一个默认值（强烈推荐）。最常用的参数应当命名为`value`。

### 元注解

有一些注解可以修饰其他注解，这些注解就称为元注解（meta annotation）。Java标准库已经定义了一些元注解，我们只需要使用元注解，通常不需要自己去编写元注解。

#### @Target

最常用的元注解是`@Target`。使用`@Target`可以定义`Annotation`能够被应用于源码的哪些位置：

- 类或接口：`ElementType.TYPE`；
- 字段：`ElementType.FIELD`；
- 方法：`ElementType.METHOD`；
- 构造方法：`ElementType.CONSTRUCTOR`；
- 方法参数：`ElementType.PARAMETER`。

例如，定义注解`@Report`可用在方法上，我们必须添加一个`@Target(ElementType.METHOD)`：

```java
@Target(ElementType.METHOD)
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```

定义注解`@Report`可用在方法或字段上，可以把`@Target`注解参数变为数组`{ ElementType.METHOD, ElementType.FIELD }`：

```java
@Target({
    ElementType.METHOD,
    ElementType.FIELD
})
public @interface Report {
    ...
}
```

实际上`@Target`定义的`value`是`ElementType[]`数组，只有一个元素时，可以省略数组的写法。

#### @Retention

另一个重要的元注解`@Retention`定义了`Annotation`的生命周期：

- 仅编译期：`RetentionPolicy.SOURCE`；
- 仅class文件：`RetentionPolicy.CLASS`；
- 运行期：`RetentionPolicy.RUNTIME`。

如果`@Retention`不存在，则该`Annotation`默认为`CLASS`。因为通常我们自定义的`Annotation`都是`RUNTIME`，所以，务必要加上`@Retention(RetentionPolicy.RUNTIME)`这个元注解：

```java
@Retention(RetentionPolicy.RUNTIME)
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```

#### @Repeatable

使用`@Repeatable`这个元注解可以定义`Annotation`是否可重复。这个注解应用不是特别广泛。

```java
@Repeatable(Reports.class)
@Target(ElementType.TYPE)
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}

@Target(ElementType.TYPE)
public @interface Reports {
    Report[] value();
}
```

经过`@Repeatable`修饰后，在某个类型声明处，就可以添加多个`@Report`注解：

```java
@Report(type=1, level="debug")
@Report(type=2, level="warning")
public class Hello {
}
```

#### @Inherited

使用`@Inherited`定义子类是否可继承父类定义的`Annotation`。`@Inherited`仅针对`@Target(ElementType.TYPE)`类型的`annotation`有效，并且仅针对`class`的继承，对`interface`的继承无效：

```java
@Inherited
@Target(ElementType.TYPE)
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```

在使用的时候，如果一个类用到了`@Report`：

```java
@Report(type=1)
public class Person {
}
```

则它的子类默认也定义了该注解：

```java
public class Student extends Person {
}
```

### 如何定义Annotation

我们总结一下定义`Annotation`的步骤：

第一步，用`@interface`定义注解：

```java
public @interface Report {
}
```

第二步，添加参数、默认值：

```java
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```

把最常用的参数定义为`value()`，推荐所有参数都尽量设置默认值。

第三步，用元注解配置注解：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```

其中，必须设置`@Target`和`@Retention`，`@Retention`一般设置为`RUNTIME`，因为我们自定义的注解通常要求在运行期读取。一般情况下，不必写`@Inherited`和`@Repeatable`。

## 处理注解

Java的注解本身对代码逻辑没有任何影响。根据`@Retention`的配置：

- `SOURCE`类型的注解在编译期就被丢掉了；
- `CLASS`类型的注解仅保存在class文件中，它们不会被加载进JVM；
- `RUNTIME`类型的注解会被加载进JVM，并且在运行期可以被程序读取。

如何使用注解完全由工具决定。`SOURCE`类型的注解主要由编译器使用，因此我们一般只使用，不编写。`CLASS`类型的注解主要由底层工具库使用，涉及到class的加载，一般我们很少用到。只有`RUNTIME`类型的注解不但要使用，还经常需要编写。

因此，我们只讨论如何读取`RUNTIME`类型的注解。

因为注解定义后也是一种`class`，所有的注解都继承自`java.lang.annotation.Annotation`，因此，读取注解，需要使用反射API。

Java提供的使用反射API读取`Annotation`的方法包括：

判断某个注解是否存在于`Class`、`Field`、`Method`或`Constructor`：

- Class.isAnnotationPresent(Class)
- Field.isAnnotationPresent(Class)
- Method.isAnnotationPresent(Class)
- Constructor.isAnnotationPresent(Class)

例如：

```java
// 判断@Report是否存在于Person类:
Person.class.isAnnotationPresent(Report.class);
```

使用反射API读取Annotation：

- Class.getAnnotation(Class)
- Field.getAnnotation(Class)
- Method.getAnnotation(Class)
- Constructor.getAnnotation(Class)

例如：

```java
// 获取Person定义的@Report注解:
Report report = Person.class.getAnnotation(Report.class);
int type = report.type();
String level = report.level();
```

使用反射API读取`Annotation`有两种方法。方法一是先判断`Annotation`是否存在，如果存在，就直接读取：

```java
Class cls = Person.class;
if (cls.isAnnotationPresent(Report.class)) {
    Report report = cls.getAnnotation(Report.class);
    ...
}
```

第二种方法是直接读取`Annotation`，如果`Annotation`不存在，将返回`null`：

```java
Class cls = Person.class;
Report report = cls.getAnnotation(Report.class);
if (report != null) {
   ...
}
```

读取方法、字段和构造方法的`Annotation`和Class类似。但要读取方法参数的`Annotation`就比较麻烦一点，因为方法参数本身可以看成一个数组，而每个参数又可以定义多个注解，所以，一次获取方法参数的所有注解就必须用一个二维数组来表示。例如，对于以下方法定义的注解：

```java
public void hello(@NotNull @Range(max=5) String name, @NotNull String prefix) {
}
```

要读取方法参数的注解，我们先用反射获取`Method`实例，然后读取方法参数的所有注解：

```java
// 获取Method实例:
Method m = ...
// 获取所有参数的Annotation:
Annotation[][] annos = m.getParameterAnnotations();
// 第一个参数（索引为0）的所有Annotation:
Annotation[] annosOfName = annos[0];
for (Annotation anno : annosOfName) {
    if (anno instanceof Range r) { // @Range注解
        r.max();
    }
    if (anno instanceof NotNull n) { // @NotNull注解
        //
    }
}
```

### 注解的实际应用

注解如何使用，完全由程序自己决定。例如，JUnit是一个测试框架，它会自动运行所有标记为`@Test`的方法。

我们来看一个`@Range`注解，我们希望用它来定义一个`String`字段的规则：字段长度满足`@Range`的参数定义：

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Range {
    int min() default 0;
    int max() default 255;
}
```

在某个JavaBean中，我们可以使用该注解：

```java
public class Person {
    @Range(min=1, max=20)
    public String name;

    @Range(max=10)
    public String city;
}
```

但是，定义了注解，本身对程序逻辑没有任何影响。我们必须自己编写代码来使用注解。这里，我们编写一个`Person`实例的检查方法，它可以检查`Person`实例的`String`字段长度是否满足`@Range`的定义：

```java
void check(Person person) throws IllegalArgumentException, ReflectiveOperationException {
    // 遍历所有Field:
    for (Field field : person.getClass().getFields()) {
        // 获取Field定义的@Range:
        Range range = field.getAnnotation(Range.class);
        // 如果@Range存在:
        if (range != null) {
            // 获取Field的值:
            Object value = field.get(person);
            // 如果值是String:
            if (value instanceof String s) {
                // 判断值是否满足@Range的min/max:
                if (s.length() < range.min() || s.length() > range.max()) {
                    throw new IllegalArgumentException("Invalid field: " + field.getName());
                }
            }
        }
    }
}
```

这样一来,我们通过`@Range`注解,配合`check()`方法,就可以完成`Person`实例的检查。注意检查逻辑完全是我们自己编写的,JVM不会自动给注解添加任何额外的逻辑。

## 常用Java注解

### JDK内置注解

#### @Override

用于标注方法是对父类方法的重写,编译器会检查该方法是否确实重写了父类方法。

```java
public class Child extends Parent {
    @Override
    public void method() {
        // 重写父类方法
    }
}
```

#### @Deprecated

标记已过时的类、方法或字段,提示开发者不应继续使用。

```java
public class Example {
    @Deprecated
    public void oldMethod() {
        // 已过时的方法
    }
}
```

#### @SuppressWarnings

告诉编译器忽略特定的警告信息。

```java
@SuppressWarnings("unchecked")
public void method() {
    List list = new ArrayList();
    list.add("item");
}
```

常用参数:

- `unchecked`: 未检查的转换
- `deprecation`: 使用了已过时的类或方法
- `rawtypes`: 使用了原始类型
- `unused`: 未使用的变量
- `all`: 所有警告

#### @SafeVarargs

用于抑制可变参数方法的堆污染警告(Java 7+)。

```java
@SafeVarargs
public final <T> void method(T... args) {
    // 处理可变参数
}
```

#### @FunctionalInterface

标记一个接口为函数式接口,确保接口只有一个抽象方法(Java 8+)。

```java
@FunctionalInterface
public interface MyFunction {
    void execute();
}
```

### JSR注解

#### @Resource

Java EE规范,用于依赖注入,按名称注入。

```java
@Resource(name = "userService")
private UserService userService;
```

#### @PostConstruct

标记在依赖注入完成后需要执行的初始化方法。

```java
@PostConstruct
public void init() {
    // 初始化逻辑
}
```

#### @PreDestroy

标记在Bean销毁前需要执行的清理方法。

```java
@PreDestroy
public void cleanup() {
    // 清理逻辑
}
```

### 验证注解 (javax.validation)

#### @NotNull

验证字段不能为null。

```java
public class User {
    @NotNull(message = "用户名不能为空")
    private String username;
}
```

#### @NotEmpty

验证字符串、集合或数组不能为空。

```java
@NotEmpty(message = "邮箱不能为空")
private String email;
```

#### @NotBlank

验证字符串不能为null且去除空格后长度大于0。

```java
@NotBlank(message = "密码不能为空")
private String password;
```

#### @Size

验证字符串、集合或数组的大小。

```java
@Size(min = 6, max = 20, message = "密码长度必须在6-20之间")
private String password;
```

#### @Min / @Max

验证数值的最小值/最大值。

```java
@Min(value = 18, message = "年龄必须大于等于18")
@Max(value = 100, message = "年龄必须小于等于100")
private Integer age;
```

#### @Email

验证邮箱格式。

```java
@Email(message = "邮箱格式不正确")
private String email;
```

#### @Pattern

验证字符串是否匹配正则表达式。

```java
@Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
private String phone;
```

## 常用Spring注解

### 核心容器注解

#### @Component

通用的组件注解,标记一个类为Spring管理的Bean。

```java
@Component
public class MyComponent {
    // 组件逻辑
}
```

#### @Service

标记服务层组件,是`@Component`的特化。

```java
@Service
public class UserService {
    // 业务逻辑
}
```

#### @Repository

标记数据访问层组件,是`@Component`的特化,提供数据访问异常转换。

```java
@Repository
public class UserRepository {
    // 数据访问逻辑
}
```

#### @Controller

标记控制层组件,是`@Component`的特化,用于Spring MVC。

```java
@Controller
public class UserController {
    // 控制器逻辑
}
```

#### @RestController

组合注解,等同于`@Controller + @ResponseBody`。

```java
@RestController
@RequestMapping("/api")
public class UserRestController {
    // RESTful API
}
```

### 依赖注入注解

#### @Autowired

自动按类型注入依赖。

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
}
```

#### @Qualifier

配合`@Autowired`使用,按名称注入依赖。

```java
@Autowired
@Qualifier("mysqlUserRepository")
private UserRepository userRepository;
```

#### @Primary

当有多个相同类型的Bean时,标记首选的Bean。

```java
@Primary
@Repository
public class MysqlUserRepository implements UserRepository {
    // 实现
}
```

#### @Value

注入配置属性值。

```java
@Value("${app.name}")
private String appName;

@Value("#{systemProperties['user.name']}")
private String userName;
```

### 配置注解

#### @Configuration

标记配置类,相当于XML配置文件。

```java
@Configuration
public class AppConfig {
    @Bean
    public UserService userService() {
        return new UserService();
    }
}
```

#### @Bean

在配置类中定义Bean。

```java
@Configuration
public class AppConfig {
    @Bean(name = "userService", initMethod = "init", destroyMethod = "cleanup")
    public UserService userService() {
        return new UserService();
    }
}
```

#### @ComponentScan

配置组件扫描路径。

```java
@Configuration
@ComponentScan(basePackages = "com.example.app")
public class AppConfig {
}
```

#### @PropertySource

加载properties配置文件。

```java
@Configuration
@PropertySource("classpath:application.properties")
public class AppConfig {
}
```

#### @Import

导入其他配置类。

```java
@Configuration
@Import({DatabaseConfig.class, SecurityConfig.class})
public class AppConfig {
}
```

### 条件注解

#### @Conditional

根据条件决定是否创建Bean。

```java
@Bean
@Conditional(MyCondition.class)
public MyService myService() {
    return new MyService();
}
```

#### @ConditionalOnProperty

根据配置属性决定是否创建Bean。

```java
@Bean
@ConditionalOnProperty(name = "feature.enabled", havingValue = "true")
public FeatureService featureService() {
    return new FeatureService();
}
```

#### @ConditionalOnClass

当类路径中存在指定类时创建Bean。

```java
@Bean
@ConditionalOnClass(RedisTemplate.class)
public RedisService redisService() {
    return new RedisService();
}
```

### Spring MVC注解

#### @RequestMapping

映射HTTP请求到处理方法。

```java
@RequestMapping(value = "/users", method = RequestMethod.GET)
public List<User> getUsers() {
    return userService.findAll();
}
```

#### @GetMapping / @PostMapping / @PutMapping / @DeleteMapping

HTTP方法的快捷注解。

```java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    return userService.findById(id);
}

@PostMapping("/users")
public User createUser(@RequestBody User user) {
    return userService.save(user);
}

@PutMapping("/users/{id}")
public User updateUser(@PathVariable Long id, @RequestBody User user) {
    return userService.update(id, user);
}

@DeleteMapping("/users/{id}")
public void deleteUser(@PathVariable Long id) {
    userService.delete(id);
}
```

#### @PathVariable

绑定URL路径变量。

```java
@GetMapping("/users/{id}")
public User getUser(@PathVariable("id") Long userId) {
    return userService.findById(userId);
}
```

#### @RequestParam

绑定请求参数。

```java
@GetMapping("/users")
public List<User> searchUsers(
    @RequestParam(value = "name", required = false) String name,
    @RequestParam(value = "age", defaultValue = "0") int age) {
    return userService.search(name, age);
}
```

#### @RequestBody

绑定请求体到对象。

```java
@PostMapping("/users")
public User createUser(@RequestBody User user) {
    return userService.save(user);
}
```

#### @ResponseBody

将返回值直接写入HTTP响应体。

```java
@RequestMapping("/user")
@ResponseBody
public User getUser() {
    return new User();
}
```

#### @ResponseStatus

设置响应状态码。

```java
@PostMapping("/users")
@ResponseStatus(HttpStatus.CREATED)
public User createUser(@RequestBody User user) {
    return userService.save(user);
}
```

### AOP注解

#### @Aspect

标记切面类。

```java
@Aspect
@Component
public class LogAspect {
    // 切面逻辑
}
```

#### @Before

前置通知,在目标方法执行前执行。

```java
@Before("execution(* com.example.service.*.*(..))")
public void beforeAdvice(JoinPoint joinPoint) {
    System.out.println("方法执行前: " + joinPoint.getSignature().getName());
}
```

#### @After

后置通知,在目标方法执行后执行(无论是否抛出异常)。

```java
@After("execution(* com.example.service.*.*(..))")
public void afterAdvice(JoinPoint joinPoint) {
    System.out.println("方法执行后: " + joinPoint.getSignature().getName());
}
```

#### @AfterReturning

返回通知,在目标方法正常返回后执行。

```java
@AfterReturning(pointcut = "execution(* com.example.service.*.*(..))", 
                returning = "result")
public void afterReturningAdvice(JoinPoint joinPoint, Object result) {
    System.out.println("方法返回值: " + result);
}
```

#### @AfterThrowing

异常通知,在目标方法抛出异常后执行。

```java
@AfterThrowing(pointcut = "execution(* com.example.service.*.*(..))", 
               throwing = "ex")
public void afterThrowingAdvice(JoinPoint joinPoint, Exception ex) {
    System.out.println("方法抛出异常: " + ex.getMessage());
}
```

#### @Around

环绕通知,可以在目标方法执行前后执行自定义逻辑。

```java
@Around("execution(* com.example.service.*.*(..))")
public Object aroundAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
    System.out.println("方法执行前");
    Object result = joinPoint.proceed();
    System.out.println("方法执行后");
    return result;
}
```

### 事务注解

#### @Transactional

声明式事务管理。

```java
@Service
public class UserService {
    @Transactional(
        propagation = Propagation.REQUIRED,
        isolation = Isolation.DEFAULT,
        timeout = 30,
        rollbackFor = Exception.class
    )
    public void createUser(User user) {
        userRepository.save(user);
    }
}
```

常用属性:

- `propagation`: 事务传播行为
- `isolation`: 事务隔离级别
- `timeout`: 超时时间
- `readOnly`: 是否只读
- `rollbackFor`: 指定回滚的异常类型
- `noRollbackFor`: 指定不回滚的异常类型

### Spring Boot注解

#### @SpringBootApplication

组合注解,包含`@Configuration`、`@EnableAutoConfiguration`和`@ComponentScan`。

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

#### @EnableAutoConfiguration

启用Spring Boot自动配置。

```java
@Configuration
@EnableAutoConfiguration
public class AppConfig {
}
```

#### @ConfigurationProperties

绑定配置文件属性到Java对象。

```java
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private String version;
    // getters and setters
}
```

#### @EnableScheduling

启用定时任务支持。

```java
@Configuration
@EnableScheduling
public class ScheduleConfig {
}
```

#### @Scheduled

定义定时任务。

```java
@Component
public class ScheduledTasks {
    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        System.out.println("当前时间: " + new Date());
    }
    
    @Scheduled(cron = "0 0 1 * * ?")
    public void cronTask() {
        System.out.println("每天凌晨1点执行");
    }
}
```

#### @Async

标记异步执行的方法。

```java
@Service
public class AsyncService {
    @Async
    public CompletableFuture<String> asyncMethod() {
        // 异步执行的逻辑
        return CompletableFuture.completedFuture("完成");
    }
}
```

### 缓存注解

#### @EnableCaching

启用缓存支持。

```java
@Configuration
@EnableCaching
public class CacheConfig {
}
```

#### @Cacheable

缓存方法返回结果。

```java
@Cacheable(value = "users", key = "#id")
public User getUserById(Long id) {
    return userRepository.findById(id);
}
```

#### @CachePut

更新缓存。

```java
@CachePut(value = "users", key = "#user.id")
public User updateUser(User user) {
    return userRepository.save(user);
}
```

#### @CacheEvict

清除缓存。

```java
@CacheEvict(value = "users", key = "#id")
public void deleteUser(Long id) {
    userRepository.deleteById(id);
}

@CacheEvict(value = "users", allEntries = true)
public void deleteAllUsers() {
    userRepository.deleteAll();
}
```

### 测试注解

#### @SpringBootTest

用于Spring Boot集成测试。

```java
@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;
    
    @Test
    public void testFindUser() {
        User user = userService.findById(1L);
        assertNotNull(user);
    }
}
```

#### @WebMvcTest

用于Spring MVC控制器测试。

```java
@WebMvcTest(UserController.class)
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    public void testGetUser() throws Exception {
        mockMvc.perform(get("/users/1"))
            .andExpect(status().isOk());
    }
}
```

#### @MockBean

创建和注入Mock对象。

```java
@SpringBootTest
public class UserServiceTest {
    @MockBean
    private UserRepository userRepository;
    
    @Autowired
    private UserService userService;
}
```
