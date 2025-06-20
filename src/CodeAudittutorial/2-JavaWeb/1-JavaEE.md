---
category: 代码审计
tag: Java
---

# 1-JavaWeb 审计基础-Java EE 分层模型

<!-- more -->

> Java EE 可以说是一个框架，也可以说是一种规范。
>
> Java 平台有 3 个主要版本，分别是 Java SE（Java Platform Standard Edition，Java 平台标准版）、Java EE（Java Platform Enterprise Edition，Java 平台企业版）和 Java ME（Java Platform Micro Edition，Java 平台微型版）。
>
> Java EE 是 Sun 公司为企业级应用推出的标准平台，用来开发 B/S 架构软件，是 Java 应用最广泛的版本。Java EE 也称为 Java 2 Platform 或 Enterprise Edition（J2EE），2018 年 3 月更名为 Jakarta EE。

Web 开发诞生之初都是静态的 HTML 页面，后来随着需求大量增长和技术快速发展，逐渐出现了数据库和动态页面，但是没有分层概念。当时的开发者在开发项目时，会把所有的代码都写在页面上，包括数据库连接代码、事务控制代码以及各种校验和逻辑控制代码等。如果项目规模巨大，一个文件可能有上万行代码。如果开发人员需要修改业务功能或者定位 Bug，会有非常大的麻烦，可维护性差。随着时间的推移，Java EE 分层模型应运而生。

## 1、Java EE 的核心技术

> 此处只记录部分

JDBC（Java Database Connectivity，Java 数据库连接）：在 Java 语言中用来规范客户端程序如何访问数据库的应用程序接口，提供了诸如查询和更新数据库中数据的方法。

JNDI（Java Naming and Directory Interface，Java 命名和目录接口）： Java 的一个目录服务应用程序界面（API），它提供了一个目录系统，并将服务名称与对象关联起来，从而使开发人员在开发过程中可以用名称来访问对象。

企业级 JavaBean（Enterprise JavaBean，EJB）：一个用来构筑企业级应用的、在服务器端可被管理的组件。

RMI（Remote Method Invocation，远程方法调用）：Java 的一组拥护开发分布式应用程序的 API，它大大增强了 Java 开发分布式应用的能力。

Servlet（Server Applet）：使用 Java 编写的服务器端程序。狭义的 Servlet 是指 Java 语言实现的一个接口，广义的 Servlet 是指任何实现该 Servlet 接口的类。其主要功能在于交互式地浏览和修改数据，生成动态 Web 内容。

JSP（JavaServer Pages）：由 Sun 公司主导并创建的一种动态网页技术标准。JSP 部署于网络服务器上，可以响应客户端发送的请求，并根据请求内容动态生成 HTML、XML 或其他格式文档的 Web 网页，然后返回给请求者。

XML（eXtensible Markup Language，可扩展标记语言）：是被设计用于传输和存储数据的语言。

Java 消息服务（Java Message Service，JMS）是一个 Java 平台中关于面向消息中间件（MOM）的 API，用于在两个应用程序之间或分布式系统中发送消息，进行异步通信。

## 2、Java EE 分层模型

Java EE 应用的分层模型主要分为以下 5 层。

1. **Domain Object**（领域对象）层：本层由一系列 POJO（Plain Old Java Object，普通的、传统的 Java 对象）组成，这些对象是该系统的 Domain Object，通常包含各自所需实现的业务逻辑方法。
2. **DAO**（Data Access Object，数据访问对象）层：本层由一系列 DAO 组件组成，这些 DAO 实现了对数据库的创建、查询、更新和删除等操作。
3. **Service**（业务逻辑）层：本层由一系列的业务逻辑对象组成，这些业务逻辑对象实现了系统所需要的业务逻辑方法。
4. **Controller**（控制器）层：本层由一系列控制器组成，这些控制器用于拦截用户的请求，并调用业务逻辑组件的业务逻辑方法去处理用户请求，然后根据处理结果向不同的 View 组件转发。
5. **View**（表现）层：本层由一系列的页面及视图组件组成，负责收集用户请求，并显示处理后的结果。

如图，首先由数据库给 Domain Object 层提供持久化服务，然后由 Domain Object 层去封装 DAO 层，DAO 层为业务逻辑层提供数据访问服务，接着业务逻辑层为控制器层提供逻辑支持，最终在表现层显示结果。

![img](./img/1-JavaEE/epub_40869976_113.jpeg)

分层模型 Java EE 分层模型的应用，使得项目易于维护，管理简化，并且适应大规模和复杂的应用需求以及不断变化的业务需求。此外，分层模型还能有效提高系统并发处理能力。
