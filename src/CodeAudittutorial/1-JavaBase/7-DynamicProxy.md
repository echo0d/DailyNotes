---
category: 代码审计
tag: Java
---

# 7-Java 代码审计基础-动态代理

<!-- more -->

代理是 Java 中的一种设计模式，主要用于提供对目标对象另外的访问方式，即通过代理对象访问目标对象。这样，就可以在目标对象实现的基础上，加强额外的功能操作，实现扩展目标对象的功能。代理模式的关键点在于代理对象和目标对象，代理对象是对目标对象的扩展，并且代理对象会调用目标对象。Java 代理的方式有 3 种：静态代理、动态代理和 CGLib 代理。

## 1、静态代理

所谓静态代理，顾名思义，当确定代理对象和被代理对象后，就无法再去代理另一个对象。同理，在 Java 静态代理中，如果我们想要实现另一个代理，就需要重新写一个代理对象，其原理如图

![img](./img/7-DynamicProxy/epub_40869976_146.jpeg)

总而言之，在静态代理中，代理类和被代理类实现了同样的接口，代理类同时持有被代理类的引用。当我们需要调用被代理类的方法时，可以通过调用代理类的方法实现，静态代理的实现：

![img](./img/7-DynamicProxy/epub_40869976_147.jpeg)

## 2、动态代理

**静态代理的优势**：允许开发人员在不修改已有代码的前提下完成一些增强功能的需求。

**静态代理的缺点**：

1. 静态代理的使用会由于代理对象要实现与目标对象一致的接口，从而产生过多的代理类，造成冗余；
2. 大量使用静态代理会使项目不易维护，一旦接口增加方法，目标对象与代理对象就要进行修改。

**动态代理的优势**：可以很方便地对代理类的函数进行统一的处理，而不用修改每个代理类中的方法。

实际上，Java 中的“动态”也就意味着使用了反射，因此动态代理其实是基于反射机制的一种代理模式。

**动态代理与静态代理的区别**：通过动态代理可以实现多个需求。动态代理其实是通过实现接口的方式来实现代理，具体来说，动态代理是通过`Proxy`类创建代理对象，然后将接口方法“代理”给`InvocationHandler` 接口完成的。

![img](./img/7-DynamicProxy/epub_40869976_148.jpeg)

动态代理的关键有两个，即上文中提到的`Proxy `类以及`InvocationHandler`接口。

### 2.1、Proxy 类

在 JDK 中，Java 提供了`Java.lang.reflect.InvocationHandler`接口和`Java.lang. reflect.Proxy`类，这两个类相互配合，其中 Proxy 类是入口。`Proxy`类是用来创建一个代理对象的类，它提供了很多方法。

`static Invocation Handler get Invocation Handler (Object proxy) `：该方法主要用于获取指定代理对象所关联的调用程序。

`static Class<?> getProxyClass (ClassLoader loader, Class<?>... interfaces) `：该方法主要用于返回指定接口的代理类。

`static Object newProxyInstance (ClassLoader loader, Class<?>[] interfaces, Invocation Handler h)`：该方法主要返回一个指定接口的代理类实例，该接口可以将方法调用指派到指定的调用处理程序。

`static boolean isProxyClass (Class<?> cl)`：当且仅当指定的类通过 `getProxyClass` 方法或 `newProxyInstance `方法动态生成为代理类时，返回 `true`。该方法的可靠性对于使用它做出安全决策而言非常重要，所以它的实现不应仅测试相关的类是否可以扩展 Proxy。

在上述方法中，**最常用的是`newProxyInstance`方法**，该方法的作用是创建一个代理类对象，它接收 3 个参数：`loader`、`interfaces`以及`h`，各个参数含义如下：

`loader`：这是一个`ClassLoader`对象，定义了由哪个`ClassLoader`对象对生成的代理类进行加载。

`interfaces`：这是代理类要实现的接口列表，表示用户将要给代理对象提供的接口信息。如果提供了这样一个接口对象数组，就是声明代理类实现了这些接口，代理类即可调用接口中声明的所有方法。

`h`：这是指派方法调用的调用处理程序，是一个`InvocationHandler`对象，表示当动态代理对象调用方法时会关联到哪一个`InvocationHandler`对象上，并最终由其调用。

### 2.2、InvocationHandler 接口

`Java.lang.reflect InvocationHandler`，主要方法为`Object invoke（Object proxy, Method method,Object[] args）`，该方法定义了代理对象调用方法时希望执行的动作，用于集中处理在动态代理类对象上的方法调用。`Invoke` 有 3 个参数：`proxy`、`method`、`args`，各个参数含义如下。

`proxy`：在其上调用方法的代理实例。

`method`：对应于在代理实例上调用的接口方法的 Method 实例。 Method 对象的声明类将是在其中声明方法的接口，该接口可以是代理类赖以继承方法的代理接口的超接口。

`args`：包含传入代理实例上方法调用的参数值的对象数组，如果接口方法不使用参数，则为 null。基本类型的参数被包装在适当基本包装器类（如`Java.lang.Integer`或`Java.lang.Boolean`）的实例中。

**这里没咋看懂，后面再说吧。**
