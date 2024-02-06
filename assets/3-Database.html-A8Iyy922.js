import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e as t}from"./app-gRR5m0jy.js";const e="/DailyNotes/assets/image-20231231132427138-ktYwUJQO.png",i="/DailyNotes/assets/image-20240108213703085-KefpS1Ht.png",l={},p=t(`<h1 id="java代码审计-数据库" tabindex="-1"><a class="header-anchor" href="#java代码审计-数据库" aria-hidden="true">#</a> Java代码审计-数据库</h1><p>执行sql语句的几种方式：JDBC、Hibernate、Mybatis，三者区别如下：</p><ul><li>jdbc是较底层的持久化操作方式，而hibernate和mybatis都是在jdbc的基础上进行了封装使其更加方便程序运对持久层的操作。</li><li>jdbc就是先创建connection连接数据库，然后创建statement对象，通过statement对象执行sql语句，得到resultSet对象，通过对resultSet对象的遍历操作来获取数据并手动转为javaBean，最后关闭resultSet、statement、connection释放资源；hibernate是将数据库中的数据表映射为持久层的java对象，对sql语句修改和优化困难；mybatis将sql语句的输入参数和输出参数映射为java对象，sql语句修改和优化方便；</li><li>若进行底层编程，且对性能要求极高的话，应采用jdbc方式；若对数据库进行完整性控制的话建议使用hibernate；若灵活使用sql语句的话建议使</li></ul><h2 id="_1、jdbc" tabindex="-1"><a class="header-anchor" href="#_1、jdbc" aria-hidden="true">#</a> 1、JDBC</h2><p>JDBC(Java Database Connectivity)，是Java连接数据库操作的原生接口。JDBC是所有框架操作数据库所必须的，是数据库的统一接口标准。</p><h3 id="_1-1-一般步骤" tabindex="-1"><a class="header-anchor" href="#_1-1-一般步骤" aria-hidden="true">#</a> 1.1 一般步骤</h3><ol><li>使用JDBC编程需要链接数据库，注册驱动和数据库信息。</li><li>操作Connection，打开Statement对象。</li><li>通过Statement执行SQL语句，返回结果放到ResultSet对象。</li><li>使用ResultSet读取数据。</li><li>关闭数据库相关的资源。</li></ol><p>数据库：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CREATE DATABASE IF NOT EXISTS CodeAudit;
use CodeAudit;
CREATE TABLE users (
  ID INT,
  name VARCHAR(50),
  phone VARCHAR(20)
);
INSERT INTO users (ID, name, phone) VALUES
(1, &#39;John Doe&#39;, &#39;123-456-7890&#39;),
(2, &#39;Jane Smith&#39;, &#39;987-654-3210&#39;),
(3, &#39;Alice Johnson&#39;, &#39;555-123-4567&#39;),
(4, &#39;Bob Thompson&#39;, &#39;888-999-0000&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先添加pom依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
            &lt;version&gt;5.1.47&lt;/version&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后按照上面的步骤</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> : echo0d
 * <span class="token keyword">@date</span> : 2023/12/31 11:41
 * @Description :
 */</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JDBCTestMain</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">JDBC_DRIVER</span> <span class="token operator">=</span> <span class="token string">&quot;com.mysql.jdbc.Driver&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DB_URL</span> <span class="token operator">=</span> <span class="token string">&quot;jdbc:mysql://localhost/CodeAudit&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">USER</span> <span class="token operator">=</span> <span class="token string">&quot;root&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PASS</span> <span class="token operator">=</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">Statement</span> statement <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token constant">JDBC_DRIVER</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//注册驱动，Class.forName(&quot;数据库驱动的类名&quot;)。</span>
<span class="token comment">//            Driver driver = new com.mysql.jdbc.Driver(); //实例化com.mysql.jdbc.Driver，类加载即会执行静态代码块</span>
<span class="token comment">//            DriverManager.registerDriver(new com.mysql.jdbc.Driver()); //使用 \`DriverManager\` 类的 \`registerDriver\` 方法来实例化驱动程序：</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Connecting to database...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            connection <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token constant">DB_URL</span><span class="token punctuation">,</span> <span class="token constant">USER</span><span class="token punctuation">,</span> <span class="token constant">PASS</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//获取连接，DriverManager.getConnection(xxx)。</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Creating statement...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            statement <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//操作Connection，打开Statement对象。</span>
            <span class="token class-name">String</span> sql<span class="token punctuation">;</span>
            sql <span class="token operator">=</span> <span class="token string">&quot;SELECT * from users&quot;</span><span class="token punctuation">;</span>
            resultSet <span class="token operator">=</span> statement<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//通过Statement执行SQL语句，返回结果放到ResultSet对象。</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 下面使用ResultSet读取数据。</span>
                <span class="token keyword">int</span> <span class="token class-name">PKey</span> <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> name <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> phone <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;phone&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;PKey: &quot;</span> <span class="token operator">+</span> <span class="token class-name">PKey</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;, name: &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;, phone: &quot;</span> <span class="token operator">+</span> phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> se<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            se<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 关闭数据库相关的资源</span>
            <span class="token function">close</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">close</span><span class="token punctuation">(</span>statement<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">close</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token class-name">AutoCloseable</span> autoCloseable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>autoCloseable <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                autoCloseable<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上图代码里面有一个<code>Class.forName(&quot;com.mysql.jdbc.Driver&quot;)</code>实际上会触发类加载，<code>com.mysql.jdbc.Driver</code>类将会被初始化，所以<code>static静态语句块</code>中的代码也将会被执行，如下图源码：</p><figure><img src="`+e+`" alt="image-20231231132427138" tabindex="0" loading="lazy"><figcaption>image-20231231132427138</figcaption></figure><p>其实也可以换个方法触发类加载，即实例化<code>com.mysql.cj.jdbc.Driver</code>或<code>com.mysql.jdbc.Driver</code>类加载即会执行静态代码块，如上面代码中注释掉的部分。</p><blockquote><p>如果反射某个类又不想初始化类方法有两种途径：</p><ol><li>使用<code>Class.forName(&quot;xxxx&quot;, false, loader)</code>方法，将第二个参数传入false。</li><li>ClassLoader.load(&quot;xxxx&quot;);</li></ol></blockquote><p><strong>删掉Class.forName()反射会发现依旧正常执行不报错：</strong></p><p>这里利用了Java的一大特性:<code>Java SPI(Service Provider Interface)</code>，因为<code>DriverManager</code>在初始化的时候会调用<code>java.util.ServiceLoader</code>类提供的SPI机制，Java会自动扫描jar包中的<code>META-INF/services</code>目录下的文件，并且还会自动的<code>Class.forName(文件中定义的类)</code>，这也就解释了为什么不需要<code>Class.forName</code>也能够成功连接数据库的原因了</p><h3 id="_1-2-数据源" tabindex="-1"><a class="header-anchor" href="#_1-2-数据源" aria-hidden="true">#</a> 1.2 数据源</h3><p>虽然可以直接使用 JDBC 驱动程序来创建和管理数据库连接，但使用数据源（DataSource）提供了更好的连接管理和资源控制的机制。以下是 JDBC 使用 DataSource 的一些好处：</p><ol><li>连接池管理：数据源提供了连接池的功能，可以在应用程序启动时创建一组数据库连接并放入连接池中。这样，在需要连接数据库时，可以从连接池中获取连接，而不是每次都创建新的连接和断开连接。连接池可以有效地管理和重用连接，提高性能和响应速度。</li><li>连接参数配置：数据源允许你将连接参数配置在一个地方，而不是在每个数据库连接的地方单独设置。这样可以简化代码，并提供一种集中管理连接参数的方式，方便进行统一的配置和修改。</li><li>连接错误处理：数据源可以处理连接错误和异常情况，例如网络中断、数据库崩溃等。当连接发生错误时，数据源可以自动处理连接的关闭和重新建立，确保应用程序的稳定性和可靠性。</li><li>并发控制：数据源可以提供并发控制机制，以限制同时使用的数据库连接数。这样可以避免过多的连接导致数据库性能下降，并提供一种资源控制的方式，确保数据库连接的合理使用。</li><li>支持事务管理：数据源可以与事务管理器（如 JavaEE 中的 JTA）集成，提供对事务的支持。它可以管理连接的事务性，包括事务的开始、提交和回滚，确保数据的一致性和完整性</li></ol><blockquote><p>以上来自chatGPT</p></blockquote><p>常见的数据源有：<code>DBCP</code>、<code>C3P0</code>、<code>Druid</code>、<code>Mybatis DataSource</code>，他们都实现于<code>javax.sql.DataSource</code>接口。</p><p>如下为druid数据源的一个例子: pom.xml</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">&quot;</span></span>
         <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">&quot;</span></span>
         <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">&gt;</span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>Database<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.source</span><span class="token punctuation">&gt;</span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.source</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.target</span><span class="token punctuation">&gt;</span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.target</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project.build.sourceEncoding</span><span class="token punctuation">&gt;</span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project.build.sourceEncoding</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.5.2.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>relativePath</span><span class="token punctuation">/&gt;</span></span> <span class="token comment">&lt;!-- lookup parent from repository --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-thymeleaf<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>druid<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0.19<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后是配置文件application.properties</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 数据源配置
spring.thymeleaf.cache=false
spring.datasource.url=jdbc:mysql://localhost:3306/CodeAudit?useUnicode=true&amp;characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.jdbc.Driver

# Druid 连接池配置
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.initial-size=5
spring.datasource.min-idle=5
spring.datasource.max-active=20
spring.datasource.max-wait=60000
spring.datasource.time-between-eviction-runs-millis=60000
spring.datasource.min-evictable-idle-time-millis=300000
spring.datasource.validation-query=SELECT 1
spring.datasource.test-while-idle=true
spring.datasource.test-on-borrow=false
spring.datasource.test-on-return=false
spring.datasource.pool-prepared-statements=true
spring.datasource.max-pool-prepared-statement-per-connection-size=20
spring.datasource.filters=stat,wall,log4j
spring.datasource.connection-properties=druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000

# 其他应用配置...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>此处配置文件如果没写这么多，可以在后面代码注释掉的地方进行数据源的配置</p></blockquote><p>spring的启动函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.echo0d;

/**
 * @author : echo0d
 * @date : 2023/12/31 14:07
 * @Description :
 */
import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
//    @Autowired
//    private Environment env;
//
//    //destroy-method=&quot;close&quot;的作用是当数据库连接不使用的时候,就把该连接重新放到数据池中,方便下次使用调用.
//    @Bean(destroyMethod =  &quot;close&quot;)
//    public DataSource dataSource() {
//        DruidDataSource dataSource = new DruidDataSource();
//        dataSource.setUrl(env.getProperty(&quot;spring.datasource.url&quot;));
//        dataSource.setUsername(env.getProperty(&quot;spring.datasource.username&quot;));//用户名
//        dataSource.setPassword(env.getProperty(&quot;spring.datasource.password&quot;));//密码
//        dataSource.setDriverClassName(env.getProperty(&quot;spring.datasource.driver-class-name&quot;));
//        dataSource.setInitialSize(2);//初始化时建立物理连接的个数。初始化发生在显示调用init方法，或者第一次getConnection时
//        dataSource.setMaxActive(20);//最大连接池数量
//        dataSource.setMinIdle(0);//最小连接池数量
//        dataSource.setMaxWait(60000);//获取连接时最大等待时间，单位毫秒。配置了maxWait之后，缺省启用公平锁，并发效率会有所下降，如果需要可以通过配置useUnfairLock属性为true使用非公平锁。
//        dataSource.setValidationQuery(&quot;SELECT 1&quot;);//用来检测连接是否有效的sql，要求是一个查询语句，常用select &#39;x&#39;。如果validationQuery为null，testOnBorrow、testOnReturn、testWhileIdle都不会其作用。
//        dataSource.setTestOnBorrow(false);//申请连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能。
//        dataSource.setTestWhileIdle(true);//建议配置为true，不影响性能，并且保证安全性。申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。
//        dataSource.setPoolPreparedStatements(false);//是否缓存preparedStatement，也就是PSCache。PSCache对支持游标的数据库性能提升巨大，比如说oracle。在mysql下建议关闭。
//        return dataSource;
//    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、mybatis" tabindex="-1"><a class="header-anchor" href="#_2、mybatis" aria-hidden="true">#</a> 2、Mybatis</h2><p>JDBC缺点：</p><ul><li>数据库连接的频繁创建、释放浪费资源进而影响系统性能。</li><li>sql代码写在 Java文件当中，如果在开发过程中我们改动某个sql，就需要去修改Java代码，改完之后还需要重新编译。</li><li>对结果集的解析也是硬编码，sql变化会导致解析结果的代码也跟着变化，系统不易维护</li></ul><h3 id="_2-1-一般步骤" tabindex="-1"><a class="header-anchor" href="#_2-1-一般步骤" aria-hidden="true">#</a> 2.1 一般步骤</h3><p>先建表</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CREATE TABLE \`user\` (
\`id\` int(11) NOT NULL auto_increment,
\`username\` varchar(32) NOT NULL COMMENT &#39;用户名称&#39;,
\`birthday\` datetime default NULL COMMENT &#39;生日&#39;,
\`sex\` char(1) default NULL COMMENT &#39;性别&#39;,
\`address\` varchar(256) default NULL COMMENT &#39;地址&#39;,
PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
insert into \`user\`(\`id\`,\`username\`,\`birthday\`,\`sex\`,\`address\`) values (1,&#39;老王&#39;,&#39;2018-02-27
17:47:08&#39;,&#39;男&#39;,&#39;北京&#39;),(2,&#39;熊大&#39;,&#39;2018-03-02 15:09:37&#39;,&#39;女&#39;,&#39;上海&#39;),(3,&#39;熊二&#39;,&#39;2018-03-04
11:34:34&#39;,&#39;女&#39;,&#39;深圳&#39;),(4,&#39;光头强&#39;,&#39;2018-03-04 12:04:06&#39;,&#39;男&#39;,&#39;广州&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整体项目结构如下</p><figure><img src="`+i+`" alt="image-20240108213703085" tabindex="0" loading="lazy"><figcaption>image-20240108213703085</figcaption></figure><p>添加maven依赖</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!--mybatis核心包--&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.4.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!--mysql驱动包--&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>5.1.6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- 单元测试 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>4.10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写User的实体类</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.echo0d.entity;
import java.util.Date;

public class User  {
    private Integer id;
    private String username;
    private Date birthday;
    private String sex;
    private String address;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public Date getBirthday() {
        return birthday;
    }
    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
    public String getSex() {
        return sex;
    }
    public void setSex(String sex) {
        this.sex = sex;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    @Override
    public String toString() {
        return &quot;User{&quot; +
                &quot;id=&quot; + id +
                &quot;, username=&#39;&quot; + username + &#39;\\&#39;&#39; +
                &quot;, birthday=&quot; + birthday +
                &quot;, sex=&#39;&quot; + sex + &#39;\\&#39;&#39; +
                &quot;, address=&#39;&quot; + address + &#39;\\&#39;&#39; +
                &#39;}&#39;;
    }
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写UserDao的接口和方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.echo0d.dao;
import com.echo0d.entity.User;
import java.util.List;
/**
 * 查询用户,两个方法对应两个sql语句，在UserMapper.xml文件中配置sql
 */
public interface UserDao {
    public List&lt;User&gt; findAll();

    User find();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在resources目录下，创建mapper文件夹。编写UserDao.xml的配置文件，导入约束文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;!DOCTYPE mapper
        PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot;
        &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;
&lt;mapper namespace=&quot;com.echo0d.dao.UserDao&quot;&gt;
    &lt;select id=&quot;find&quot; resultType=&quot;com.echo0d.entity.User&quot;&gt;
        select * from user where id = 1
    &lt;/select&gt;


    &lt;select id =&quot;findAll&quot; resultType=&quot;com.echo0d.entity.User&quot;&gt;
        select * from user
    &lt;/select&gt;
&lt;/mapper&gt;
&lt;!-- 1. mapper namespace=&quot;com.echo0d.dao.UserDao&quot;，叫名称空间，表明以后查找UserDao接口中的findAll的方法。--&gt;
&lt;!-- 2. select id=&quot;findAll&quot;中的id属性编写的UserDao接口中的方法的名称，固定的。--&gt;
&lt;!-- 3. resultType=&quot;com.echo0d.entity.User&quot;表明的是find和findAll方法的返回值类型--&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在resources文件夹下创建mybatis的配置文件，这个文件后面需要在使用mybatis时候引入，例如下面的测试类中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;configuration&gt;
    &lt;environments default=&quot;mysql&quot;&gt;
        &lt;environment id=&quot;mysql&quot;&gt;
            &lt;!--配置事务的类型，使用本地事务策略--&gt;
            &lt;transactionManager type=&quot;JDBC&quot;&gt;&lt;/transactionManager&gt;
            &lt;!--是否使用连接池 POOLED表示使用链接池，UNPOOLED表示不使用连接池--&gt;
            &lt;dataSource type=&quot;POOLED&quot;&gt;
                &lt;property name=&quot;driver&quot; value=&quot;com.mysql.jdbc.Driver&quot;/&gt;
                &lt;property name=&quot;url&quot; value=&quot;jdbc:mysql://localhost:3306/codeaudit&quot;/&gt;
                &lt;property name=&quot;username&quot; value=&quot;root&quot;/&gt;
                &lt;property name=&quot;password&quot; value=&quot;123456&quot;/&gt;
            &lt;/dataSource&gt;
        &lt;/environment&gt;
    &lt;/environments&gt;
    &lt;mappers&gt;
&lt;!--        此处填入mapper的配置文件--&gt;
        &lt;mapper resource=&quot;mapper/UserMapper.xml&quot;&gt;&lt;/mapper&gt;
    &lt;/mappers&gt;
&lt;/configuration&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>：一定要完成两个绑定</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>（1）Mapper 接口与 Mapper 映射文件的绑定，在 Mapper 映射文件中的 &lt;mapper&gt; 标签中的 namespace 中必须指定 Mapper 接口的全类名

（2）Mapper 映射文件中的增删改查标签的 id 必须指定 Mapper 接口中的方法名；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类MyBatisTest.java</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * @author : echo0d
 * @date : 2024/1/8 21:14
 * @Description :
 */
package com.echo0d.test;

import com.echo0d.dao.UserDao;
import com.echo0d.entity.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MyBatisTest {

    private InputStream in = null;
    private SqlSession session = null;
    private UserDao mapper = null;

    @Before  //前置通知, 在方法执行之前执行
    public void init() throws IOException {
        //加载主配置文件，目的是为了构建SqlSessionFactory对象
        in = Resources.getResourceAsStream(&quot;mybatisConfig.xml&quot;);
        //创建SqlSessionFactory对象
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        //通过SqlSessionFactory工厂对象创建SqlSesssion对象
        session = factory.openSession();
        //通过Session创建UserDao接口代理对象
        mapper = session.getMapper(UserDao.class);
    }

    @After  //@After: 后置通知, 在方法执行之后执行 。
    public void destroy() throws IOException {
        //释放资源
        session.close();
        in.close();
    }

    @Test
    public void find(){
        User user = mapper.find();
        System.out.println(user);
    }
    @Test
    public void findAll(){
        List&lt;User&gt; users = mapper.findAll();
        for(User user:users){
            System.out.println(user.toString());
        }
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据全局配置文件得到 sqlSessionFactory；</p><p>使用sqlSession工程，获取到 sqlSession 对象使用他来执行增删改查，一个 sqlSession 就是代表和数据库的一次会话，用完关闭；</p><p>使用 SQL 的唯一标识来告诉 MyBatis 执行那个 SQL，SQL都在保存在 SQL 映射文件中；</p>`,56),c=[p];function o(u,d){return s(),a("div",null,c)}const m=n(l,[["render",o],["__file","3-Database.html.vue"]]);export{m as default};
