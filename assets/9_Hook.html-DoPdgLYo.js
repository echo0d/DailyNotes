import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as t,o as p}from"./app-ClR9AqGF.js";const o={};function e(c,n){return p(),a("div",null,[...n[0]||(n[0]=[t(`<h1 id="java-hook-方法整理" tabindex="-1"><a class="header-anchor" href="#java-hook-方法整理"><span>Java Hook 方法整理</span></a></h1><p>在 Java 中，Hook 技术主要用于在不修改原始代码的情况下，对程序的执行流程进行拦截和增强。根据 Hook 生效的时机，可以将其分为 <strong>静态 Hook (编译期/加载期)</strong> 和 <strong>动态 Hook (运行期)</strong>。</p><h2 id="_1-静态-hook-static-hook" tabindex="-1"><a class="header-anchor" href="#_1-静态-hook-static-hook"><span>1. 静态 Hook (Static Hook)</span></a></h2><p>静态 Hook 指在程序运行之前（编译阶段）或类加载阶段（Load Time）修改字节码。</p><h3 id="_1-1-aspectj-编译时织入-compile-time-weaving" tabindex="-1"><a class="header-anchor" href="#_1-1-aspectj-编译时织入-compile-time-weaving"><span>1.1 AspectJ (编译时织入 - Compile-Time Weaving)</span></a></h3><p>AspectJ 是最成熟的 AOP 框架，它可以在编译阶段将切面代码直接织入到目标类的 <code>.class</code> 文件中。</p><ul><li><p><strong>原理</strong>：使用 <code>ajc</code> 编译器代替 <code>javac</code>，在编译时修改字节码。</p></li><li><p><strong>优点</strong>：</p><ul><li>运行效率高（无运行时代理开销）。</li><li>功能最强（可 Hook 构造函数、静态方法、final 方法、私有方法）。</li></ul></li><li><p><strong>缺点</strong>：需要特定的编译工具链支持，配置相对复杂。</p></li><li><p><strong>完整示例</strong>：</p><pre><code class="language-java"><span class="token comment">// 目标业务类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;创建用户: &quot;</span> <span class="token operator">+</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deleteUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;删除用户: &quot;</span> <span class="token operator">+</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// AspectJ 切面定义</span>
<span class="token keyword">public</span> aspect <span class="token class-name">LogAspect</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义切点：所有 Service 结尾类的所有方法</span>
    pointcut <span class="token function">serviceMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token function">execution</span><span class="token punctuation">(</span><span class="token operator">*</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token punctuation">.</span>*<span class="token class-name">Service</span><span class="token punctuation">.</span>*<span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 前置通知：方法执行前</span>
    <span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token function">serviceMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[AspectJ] Before method: &quot;</span> <span class="token operator">+</span> thisJoinPoint<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 后置通知：方法执行后</span>
    <span class="token function">after</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token function">serviceMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[AspectJ] After method: &quot;</span> <span class="token operator">+</span> thisJoinPoint<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 环绕通知：完全控制方法执行</span>
    <span class="token class-name">Object</span> <span class="token function">around</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token function">serviceMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> start <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> result <span class="token operator">=</span> <span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 执行原方法</span>
        <span class="token keyword">long</span> end <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[AspectJ] Method cost: &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>end <span class="token operator">-</span> start<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;ms&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 主程序测试</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">UserService</span> service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        service<span class="token punctuation">.</span><span class="token function">createUser</span><span class="token punctuation">(</span><span class="token string">&quot;Alice&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 输出：</span>
        <span class="token comment">// [AspectJ] Before method: void UserService.createUser(String)</span>
        <span class="token comment">// 创建用户: Alice</span>
        <span class="token comment">// [AspectJ] After method: void UserService.createUser(String)</span>
        <span class="token comment">// [AspectJ] Method cost: 5ms</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>编译配置 (pom.xml)</strong>：</p><pre><code class="language-xml"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.codehaus.mojo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>aspectj-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.14.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>complianceLevel</span><span class="token punctuation">&gt;</span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>complianceLevel</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>compile<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>
</code></pre></li></ul><h3 id="_1-2-java-agent-premain-加载时织入" tabindex="-1"><a class="header-anchor" href="#_1-2-java-agent-premain-加载时织入"><span>1.2 Java Agent (Premain - 加载时织入)</span></a></h3><p>利用 JVM 的 <code>Instrumentation</code> API，在类加载（Class Loading）阶段修改字节码。</p><ul><li><p><strong>原理</strong>：</p><ol><li>编写一个包含 <code>premain</code> 方法的 Agent Jar。</li><li>启动应用时添加参数 <code>-javaagent:myagent.jar</code>。</li><li>JVM 启动时加载 Agent，调用 <code>premain</code>。</li><li>Agent 注册 <code>ClassFileTransformer</code>。</li><li>当类被加载时，Transformer 拦截字节码并进行修改（使用 ASM, Javassist, ByteBuddy 等库）。</li></ol></li><li><p><strong>完整示例</strong>：</p><pre><code class="language-java"><span class="token comment">// 1. Agent 入口类</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">Instrumentation</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyAgent</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">premain</span><span class="token punctuation">(</span><span class="token class-name">String</span> agentArgs<span class="token punctuation">,</span> <span class="token class-name">Instrumentation</span> inst<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[Agent] 开始加载 Agent, 参数: &quot;</span> <span class="token operator">+</span> agentArgs<span class="token punctuation">)</span><span class="token punctuation">;</span>
        inst<span class="token punctuation">.</span><span class="token function">addTransformer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyClassFileTransformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 2. 字节码转换器 (使用 Javassist)</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token class-name">ClassFileTransformer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>security<span class="token punctuation">.</span></span><span class="token class-name">ProtectionDomain</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javassist<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClassFileTransformer</span> <span class="token keyword">implements</span> <span class="token class-name">ClassFileTransformer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">transform</span><span class="token punctuation">(</span><span class="token class-name">ClassLoader</span> loader<span class="token punctuation">,</span> <span class="token class-name">String</span> className<span class="token punctuation">,</span>
                          <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> classBeingRedefined<span class="token punctuation">,</span>
                          <span class="token class-name">ProtectionDomain</span> protectionDomain<span class="token punctuation">,</span>
                          <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> classfileBuffer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 只处理目标类</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token string">&quot;com/example/UserService&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>className<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// 返回 null 表示不修改</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[Agent] 开始修改类: &quot;</span> <span class="token operator">+</span> className<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ClassPool</span> pool <span class="token operator">=</span> <span class="token class-name">ClassPool</span><span class="token punctuation">.</span><span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">CtClass</span> ctClass <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>className<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 获取所有方法</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CtMethod</span> method <span class="token operator">:</span> ctClass<span class="token punctuation">.</span><span class="token function">getDeclaredMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 在方法前后插入日志代码</span>
                method<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span><span class="token string">&quot;System.out.println(\\&quot;[Hook] 进入方法: &quot;</span> <span class="token operator">+</span> method<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\&quot;);&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                method<span class="token punctuation">.</span><span class="token function">insertAfter</span><span class="token punctuation">(</span><span class="token string">&quot;System.out.println(\\&quot;[Hook] 退出方法: &quot;</span> <span class="token operator">+</span> method<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\&quot;);&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteCode <span class="token operator">=</span> ctClass<span class="token punctuation">.</span><span class="token function">toBytecode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ctClass<span class="token punctuation">.</span><span class="token function">detach</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> byteCode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 3. 目标业务类</span>
<span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;创建用户: &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 4. 测试主程序</span>
<span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">UserService</span> service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        service<span class="token punctuation">.</span><span class="token function">createUser</span><span class="token punctuation">(</span><span class="token string">&quot;Alice&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 输出：</span>
        <span class="token comment">// [Hook] 进入方法: createUser</span>
        <span class="token comment">// 创建用户: Alice</span>
        <span class="token comment">// [Hook] 退出方法: createUser</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>MANIFEST.MF 配置</strong>：</p><pre><code class="language-text">Manifest-Version: 1.0
Premain-Class: MyAgent
Can-Retransform-Classes: true
Can-Redefine-Classes: true
</code></pre><p><strong>启动命令</strong>：</p><pre><code class="language-bash"><span class="token function">java</span> <span class="token parameter variable">-javaagent:myagent.jar</span> <span class="token parameter variable">-jar</span> myapp.jar
</code></pre></li><li><p><strong>场景</strong>：全链路监控（SkyWalking, Pinpoint）、全局日志埋点、性能分析。</p></li></ul><hr><h2 id="_2-动态-hook-runtime-hook" tabindex="-1"><a class="header-anchor" href="#_2-动态-hook-runtime-hook"><span>2. 动态 Hook (Runtime Hook)</span></a></h2><p>动态 Hook 指在程序运行过程中，动态地创建代理对象或修改已加载的类。</p><h3 id="_2-1-动态代理-dynamic-proxy" tabindex="-1"><a class="header-anchor" href="#_2-1-动态代理-dynamic-proxy"><span>2.1 动态代理 (Dynamic Proxy)</span></a></h3><p>JDK 自带的动态代理机制，基于接口实现。</p><ul><li><p><strong>原理</strong>：利用 <code>java.lang.reflect.Proxy</code> 在内存中生成一个实现了目标接口的新类。</p></li><li><p><strong>限制</strong>：<strong>只能代理接口</strong>，无法代理未实现接口的类。</p></li><li><p><strong>完整示例</strong>：</p><pre><code class="language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token comment">// 1. 定义接口</span>
<span class="token keyword">interface</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 2. 实现类</span>
<span class="token keyword">class</span> <span class="token class-name">UserServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;创建用户: &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;查询用户 ID: &quot;</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">&quot;User-&quot;</span> <span class="token operator">+</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 3. 动态代理处理器</span>
<span class="token keyword">class</span> <span class="token class-name">LogInvocationHandler</span> <span class="token keyword">implements</span> <span class="token class-name">InvocationHandler</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> target<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">LogInvocationHandler</span><span class="token punctuation">(</span><span class="token class-name">Object</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>target <span class="token operator">=</span> target<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">Object</span> proxy<span class="token punctuation">,</span> <span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token comment">// 方法执行前</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[Proxy] 调用方法: &quot;</span> <span class="token operator">+</span> method<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[Proxy] 参数: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">long</span> start <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 执行原方法</span>
        <span class="token class-name">Object</span> result <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">long</span> end <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 方法执行后</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[Proxy] 返回值: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[Proxy] 耗时: &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>end <span class="token operator">-</span> start<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;ms&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 4. 测试类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DynamicProxyDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建真实对象</span>
        <span class="token class-name">UserService</span> realService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserServiceImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建代理对象</span>
        <span class="token class-name">UserService</span> proxyService <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">UserService</span><span class="token punctuation">)</span> <span class="token class-name">Proxy</span><span class="token punctuation">.</span><span class="token function">newProxyInstance</span><span class="token punctuation">(</span>
            <span class="token class-name">UserService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token keyword">new</span> <span class="token class-name">Class</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token class-name">UserService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token keyword">new</span> <span class="token class-name">LogInvocationHandler</span><span class="token punctuation">(</span>realService<span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 通过代理对象调用方法</span>
        proxyService<span class="token punctuation">.</span><span class="token function">createUser</span><span class="token punctuation">(</span><span class="token string">&quot;Alice&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;---&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> user <span class="token operator">=</span> proxyService<span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 输出：</span>
        <span class="token comment">// [Proxy] 调用方法: createUser</span>
        <span class="token comment">// [Proxy] 参数: [Alice]</span>
        <span class="token comment">// 创建用户: Alice</span>
        <span class="token comment">// [Proxy] 返回值: null</span>
        <span class="token comment">// [Proxy] 耗时: 2ms</span>
        <span class="token comment">// ---</span>
        <span class="token comment">// [Proxy] 调用方法: getUser</span>
        <span class="token comment">// [Proxy] 参数: [123]</span>
        <span class="token comment">// 查询用户 ID: 123</span>
        <span class="token comment">// [Proxy] 返回值: User-123</span>
        <span class="token comment">// [Proxy] 耗时: 1ms</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></li></ul><h3 id="_2-2-cglib-bytebuddy-子类代理" tabindex="-1"><a class="header-anchor" href="#_2-2-cglib-bytebuddy-子类代理"><span>2.2 CGLIB / ByteBuddy (子类代理)</span></a></h3><p>通过生成目标类的子类来实现代理。</p><ul><li><strong>原理</strong>：在运行时动态生成目标类的子类，并重写非 <code>final</code> 方法，在子类中插入拦截逻辑。</li><li><strong>优点</strong>：无需接口，可代理普通类。</li><li><strong>限制</strong>：<strong>无法代理 final 类或 final 方法</strong>。</li><li><strong>场景</strong>：Spring AOP（无接口时默认使用 CGLIB）。</li></ul><h4 id="cglib-完整示例" tabindex="-1"><a class="header-anchor" href="#cglib-完整示例"><span>CGLIB 完整示例</span></a></h4><pre><code class="language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">net<span class="token punctuation">.</span>sf<span class="token punctuation">.</span>cglib<span class="token punctuation">.</span>proxy<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span><span class="token class-name">Method</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Arrays</span></span><span class="token punctuation">;</span>

<span class="token comment">// 1. 目标类（无需实现接口）</span>
<span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;创建用户: &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;查询用户 ID: &quot;</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">&quot;User-&quot;</span> <span class="token operator">+</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 2. 方法拦截器</span>
<span class="token keyword">class</span> <span class="token class-name">LogMethodInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">MethodInterceptor</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">intercept</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">,</span> <span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">,</span> <span class="token class-name">MethodProxy</span> proxy<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token comment">// 方法执行前</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[CGLIB] 调用方法: &quot;</span> <span class="token operator">+</span> method<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[CGLIB] 参数: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">long</span> start <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 执行原方法（注意：使用 invokeSuper 而不是 invoke）</span>
        <span class="token class-name">Object</span> result <span class="token operator">=</span> proxy<span class="token punctuation">.</span><span class="token function">invokeSuper</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">long</span> end <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 方法执行后</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[CGLIB] 返回值: &quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[CGLIB] 耗时: &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>end <span class="token operator">-</span> start<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;ms&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 3. 测试类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CglibProxyDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建 CGLIB 增强器</span>
        <span class="token class-name">Enhancer</span> enhancer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Enhancer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置父类（被代理类）</span>
        enhancer<span class="token punctuation">.</span><span class="token function">setSuperclass</span><span class="token punctuation">(</span><span class="token class-name">UserService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置回调拦截器</span>
        enhancer<span class="token punctuation">.</span><span class="token function">setCallback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LogMethodInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建代理对象</span>
        <span class="token class-name">UserService</span> proxy <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">UserService</span><span class="token punctuation">)</span> enhancer<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 调用代理对象的方法</span>
        proxy<span class="token punctuation">.</span><span class="token function">createUser</span><span class="token punctuation">(</span><span class="token string">&quot;Bob&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;---&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> user <span class="token operator">=</span> proxy<span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token number">456</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 输出：</span>
        <span class="token comment">// [CGLIB] 调用方法: createUser</span>
        <span class="token comment">// [CGLIB] 参数: [Bob]</span>
        <span class="token comment">// 创建用户: Bob</span>
        <span class="token comment">// [CGLIB] 返回值: null</span>
        <span class="token comment">// [CGLIB] 耗时: 3ms</span>
        <span class="token comment">// ---</span>
        <span class="token comment">// [CGLIB] 调用方法: getUser</span>
        <span class="token comment">// [CGLIB] 参数: [456]</span>
        <span class="token comment">// 查询用户 ID: 456</span>
        <span class="token comment">// [CGLIB] 返回值: User-456</span>
        <span class="token comment">// [CGLIB] 耗时: 1ms</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>Maven 依赖</strong>：</p><pre><code class="language-xml"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>cglib<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>cglib<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.3.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><h3 id="_2-3-java-agent-agentmain-运行时重定义" tabindex="-1"><a class="header-anchor" href="#_2-3-java-agent-agentmain-运行时重定义"><span>2.3 Java Agent (Agentmain - 运行时重定义)</span></a></h3><p>利用 JVM 的 Attach 机制，在 JVM 运行时动态注入 Agent。</p><ul><li><p><strong>原理</strong>：</p><ol><li>通过 <code>VirtualMachine.attach(pid)</code> 连接到目标 JVM 进程。</li><li>加载 Agent Jar，触发 <code>agentmain</code> 方法。</li><li>获取 <code>Instrumentation</code> 实例。</li><li>调用 <code>inst.retransformClasses(targetClass)</code> 触发类的重定义。</li></ol></li><li><p><strong>能力</strong>：可以在不重启应用的情况下修改类逻辑（热部署）。</p></li><li><p><strong>限制</strong>：运行时修改字节码有严格限制（如不能新增/删除字段或方法，只能修改方法体）。</p></li><li><p><strong>场景</strong>：Arthas（在线诊断），JRebel（热部署）。</p></li><li><p><strong>完整示例</strong>：</p><pre><code class="language-java"><span class="token comment">// ========== 项目 1: Agent Jar ==========</span>

<span class="token comment">// 1. Agent 入口类</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>instrument<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javassist<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RuntimeAgent</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">agentmain</span><span class="token punctuation">(</span><span class="token class-name">String</span> agentArgs<span class="token punctuation">,</span> <span class="token class-name">Instrumentation</span> inst<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[Agent] 运行时 Agent 已加载, 参数: &quot;</span> <span class="token operator">+</span> agentArgs<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 注册转换器（第二个参数 true 表示支持重转换）</span>
        inst<span class="token punctuation">.</span><span class="token function">addTransformer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RuntimeTransformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 找到目标类并触发重转换</span>
            <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> loadedClasses <span class="token operator">=</span> inst<span class="token punctuation">.</span><span class="token function">getAllLoadedClasses</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> clazz <span class="token operator">:</span> loadedClasses<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>clazz<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;com.example.UserService&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[Agent] 找到目标类，开始重转换: &quot;</span> <span class="token operator">+</span> clazz<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    inst<span class="token punctuation">.</span><span class="token function">retransformClasses</span><span class="token punctuation">(</span>clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UnmodifiableClassException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 2. 字节码转换器</span>
<span class="token keyword">class</span> <span class="token class-name">RuntimeTransformer</span> <span class="token keyword">implements</span> <span class="token class-name">ClassFileTransformer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">transform</span><span class="token punctuation">(</span><span class="token class-name">ClassLoader</span> loader<span class="token punctuation">,</span> <span class="token class-name">String</span> className<span class="token punctuation">,</span>
                          <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> classBeingRedefined<span class="token punctuation">,</span>
                          <span class="token class-name">ProtectionDomain</span> protectionDomain<span class="token punctuation">,</span>
                          <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> classfileBuffer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token string">&quot;com/example/UserService&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>className<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;[Agent] 正在修改类: &quot;</span> <span class="token operator">+</span> className<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ClassPool</span> pool <span class="token operator">=</span> <span class="token class-name">ClassPool</span><span class="token punctuation">.</span><span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">CtClass</span> ctClass <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>className<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 修改 createUser 方法</span>
            <span class="token class-name">CtMethod</span> method <span class="token operator">=</span> ctClass<span class="token punctuation">.</span><span class="token function">getDeclaredMethod</span><span class="token punctuation">(</span><span class="token string">&quot;createUser&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            method<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span><span class="token string">&quot;System.out.println(\\&quot;[热修复] 方法被增强!\\&quot;);&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> byteCode <span class="token operator">=</span> ctClass<span class="token punctuation">.</span><span class="token function">toBytecode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ctClass<span class="token punctuation">.</span><span class="token function">detach</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> byteCode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// MANIFEST.MF 配置</span>
<span class="token comment">/*
Manifest-Version: 1.0
Agent-Class: RuntimeAgent
Can-Retransform-Classes: true
Can-Redefine-Classes: true
*/</span>

<span class="token comment">// ========== 项目 2: 目标应用 ==========</span>

<span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;创建用户: &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TargetApp</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">UserService</span> service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 每隔 3 秒调用一次</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            service<span class="token punctuation">.</span><span class="token function">createUser</span><span class="token punctuation">(</span><span class="token string">&quot;Alice&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// ========== 项目 3: Attach 客户端 ==========</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>sun<span class="token punctuation">.</span>tools<span class="token punctuation">.</span>attach<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AttachClient</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 列出所有 JVM 进程</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">VirtualMachineDescriptor</span><span class="token punctuation">&gt;</span></span> vms <span class="token operator">=</span> <span class="token class-name">VirtualMachine</span><span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;当前运行的 JVM 进程:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">VirtualMachineDescriptor</span> vm <span class="token operator">:</span> vms<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;PID: &quot;</span> <span class="token operator">+</span> vm<span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;, Name: &quot;</span> <span class="token operator">+</span> vm<span class="token punctuation">.</span><span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 指定目标进程 ID</span>
        <span class="token class-name">String</span> targetPid <span class="token operator">=</span> <span class="token string">&quot;12345&quot;</span><span class="token punctuation">;</span> <span class="token comment">// 替换为实际的 PID</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n正在 Attach 到进程: &quot;</span> <span class="token operator">+</span> targetPid<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">VirtualMachine</span> vm <span class="token operator">=</span> <span class="token class-name">VirtualMachine</span><span class="token punctuation">.</span><span class="token function">attach</span><span class="token punctuation">(</span>targetPid<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 加载 Agent Jar</span>
        vm<span class="token punctuation">.</span><span class="token function">loadAgent</span><span class="token punctuation">(</span><span class="token string">&quot;/path/to/runtime-agent.jar&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;param1=value1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Agent 已成功注入!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        vm<span class="token punctuation">.</span><span class="token function">detach</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Maven 依赖 (tools.jar)</span>
<span class="token comment">/*
&lt;dependency&gt;
    &lt;groupId&gt;com.sun&lt;/groupId&gt;
    &lt;artifactId&gt;tools&lt;/artifactId&gt;
    &lt;version&gt;1.8&lt;/version&gt;
    &lt;scope&gt;system&lt;/scope&gt;
    &lt;systemPath&gt;\${java.home}/../lib/tools.jar&lt;/systemPath&gt;
&lt;/dependency&gt;
*/</span>
</code></pre><p><strong>使用步骤</strong>：</p><ol><li>启动目标应用 <code>TargetApp</code>，记录其进程 PID。</li><li>运行 <code>AttachClient</code>，将 Agent 动态注入到目标进程。</li><li>观察目标应用输出，方法已被增强，无需重启。</li></ol></li></ul><h3 id="_2-4-native-hook-jni-jvmti" tabindex="-1"><a class="header-anchor" href="#_2-4-native-hook-jni-jvmti"><span>2.4 Native Hook (JNI / JVMTI)</span></a></h3><p>跳出 JVM 层面，直接在操作系统或 Native 层面进行 Hook。</p><ul><li><strong>原理</strong>：使用 JNI 调用 C/C++ 代码，利用操作系统的 Hook 技术（如 PLT Hook, Inline Hook）或 JVMTI (JVM Tool Interface) 事件回调。</li><li><strong>场景</strong>： <ul><li>JVM 自身性能分析（Profiler）。</li><li>深度调试。</li><li>系统级调用监控。</li></ul></li></ul><hr><h3 id="总结对比" tabindex="-1"><a class="header-anchor" href="#总结对比"><span>总结对比</span></a></h3><table><thead><tr><th style="text-align:left;">类别</th><th style="text-align:left;">技术方案</th><th style="text-align:left;">生效时机</th><th style="text-align:left;">核心特点</th><th style="text-align:left;">适用场景</th></tr></thead><tbody><tr><td style="text-align:left;"><strong>静态 Hook</strong></td><td style="text-align:left;"><strong>AspectJ (CTW)</strong></td><td style="text-align:left;">编译期</td><td style="text-align:left;">修改 .class 文件，性能最高，无限制</td><td style="text-align:left;">复杂切面，高性能要求</td></tr><tr><td style="text-align:left;"><strong>静态 Hook</strong></td><td style="text-align:left;"><strong>Java Agent (Premain)</strong></td><td style="text-align:left;">类加载期</td><td style="text-align:left;">修改字节码，无侵入</td><td style="text-align:left;">APM 监控，字节码增强</td></tr><tr><td style="text-align:left;"><strong>动态 Hook</strong></td><td style="text-align:left;"><strong>JDK 动态代理</strong></td><td style="text-align:left;">运行时</td><td style="text-align:left;">基于接口，生成代理对象</td><td style="text-align:left;">RPC, 简单 AOP</td></tr><tr><td style="text-align:left;"><strong>动态 Hook</strong></td><td style="text-align:left;"><strong>CGLIB/ByteBuddy</strong></td><td style="text-align:left;">运行时</td><td style="text-align:left;">基于子类，生成代理对象</td><td style="text-align:left;">Spring AOP</td></tr><tr><td style="text-align:left;"><strong>动态 Hook</strong></td><td style="text-align:left;"><strong>Java Agent (Attach)</strong></td><td style="text-align:left;">运行时</td><td style="text-align:left;">重定义已加载的类 (Retransform)</td><td style="text-align:left;">在线诊断 (Arthas)，热修复</td></tr></tbody></table>`,32)])])}const k=s(o,[["render",e]]),i=JSON.parse('{"path":"/develop/Java/9_Hook.html","title":"Java Hook 方法整理","lang":"zh-CN","frontmatter":{"description":"Java Hook 方法整理 在 Java 中，Hook 技术主要用于在不修改原始代码的情况下，对程序的执行流程进行拦截和增强。根据 Hook 生效的时机，可以将其分为 静态 Hook (编译期/加载期) 和 动态 Hook (运行期)。 1. 静态 Hook (Static Hook) 静态 Hook 指在程序运行之前（编译阶段）或类加载阶段（Loa...","head":[["meta",{"property":"og:url","content":"https://echo0d.github.io/DailyNotes/develop/Java/9_Hook.html"}],["meta",{"property":"og:site_name","content":"echo0d-notes"}],["meta",{"property":"og:title","content":"Java Hook 方法整理"}],["meta",{"property":"og:description","content":"Java Hook 方法整理 在 Java 中，Hook 技术主要用于在不修改原始代码的情况下，对程序的执行流程进行拦截和增强。根据 Hook 生效的时机，可以将其分为 静态 Hook (编译期/加载期) 和 动态 Hook (运行期)。 1. 静态 Hook (Static Hook) 静态 Hook 指在程序运行之前（编译阶段）或类加载阶段（Loa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-11-24T09:42:16.000Z"}],["meta",{"property":"article:author","content":"echo0d"}],["meta",{"property":"article:modified_time","content":"2025-11-24T09:42:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java Hook 方法整理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-11-24T09:42:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"echo0d\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":2,"title":"1. 静态 Hook (Static Hook)","slug":"_1-静态-hook-static-hook","link":"#_1-静态-hook-static-hook","children":[{"level":3,"title":"1.1 AspectJ (编译时织入 - Compile-Time Weaving)","slug":"_1-1-aspectj-编译时织入-compile-time-weaving","link":"#_1-1-aspectj-编译时织入-compile-time-weaving","children":[]},{"level":3,"title":"1.2 Java Agent (Premain - 加载时织入)","slug":"_1-2-java-agent-premain-加载时织入","link":"#_1-2-java-agent-premain-加载时织入","children":[]}]},{"level":2,"title":"2. 动态 Hook (Runtime Hook)","slug":"_2-动态-hook-runtime-hook","link":"#_2-动态-hook-runtime-hook","children":[{"level":3,"title":"2.1 动态代理 (Dynamic Proxy)","slug":"_2-1-动态代理-dynamic-proxy","link":"#_2-1-动态代理-dynamic-proxy","children":[]},{"level":3,"title":"2.2 CGLIB / ByteBuddy (子类代理)","slug":"_2-2-cglib-bytebuddy-子类代理","link":"#_2-2-cglib-bytebuddy-子类代理","children":[]},{"level":3,"title":"2.3 Java Agent (Agentmain - 运行时重定义)","slug":"_2-3-java-agent-agentmain-运行时重定义","link":"#_2-3-java-agent-agentmain-运行时重定义","children":[]},{"level":3,"title":"2.4 Native Hook (JNI / JVMTI)","slug":"_2-4-native-hook-jni-jvmti","link":"#_2-4-native-hook-jni-jvmti","children":[]},{"level":3,"title":"总结对比","slug":"总结对比","link":"#总结对比","children":[]}]}],"git":{"createdTime":1759203108000,"updatedTime":1763977336000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":3}]},"readingTime":{"minutes":8.03,"words":2408},"filePathRelative":"develop/Java/9_Hook.md","localizedDate":"2025年9月30日","excerpt":"","autoDesc":true}');export{k as comp,i as data};
