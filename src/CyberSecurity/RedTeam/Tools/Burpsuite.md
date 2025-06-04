---
category: 网络安全
tag:
  - Burpsuite
  - 工具
---

# BurpSuite 使用手册

<!-- more -->

### BurpSuite 是什么

> 直接使用 请从[3. Proxy](#3. Proxy)部分开始阅读

BurpSuite 是一款使用 Java 编写的，用于 Web 安全审计与扫描套件。它集成了诸多实用的小工具以完成 http 请求的转发/修改/扫描等，同时这些小工具之间还可以互相协作，在 BurpSuite 这个框架下进行各种强大的，可订制的攻击/扫描方案。安全人员可以借用它进行半自动的网络安全审计，开发人员也可以使用它的扫描工具进行网站压力测试与攻击测试，以检测 Web 应用的安全问题。

![image-20230718152751741](img/Burpsuite/image-20230718152751741.png)

> 功能完整程度：企业版>专业版>社区版

[Burp Suite - Application Security Testing Software - PortSwigger](https://portswigger.net/burp)官网点击下载即可。

截至 23.07.18，最新版本为 2023.7.2。

可以下载的类型如下：

![image-20230718154203941](img/Burpsuite/image-20230718154203941.png)

直接下载 jar 包，`java -jar` 运行，比较简单。

社区版只能用一个临时项目，也就是每次关掉后，里面的报文等内容会消失，所以使用社区版 burp 不要随意关掉。

![image-20230802105950398](img/Burpsuite/image-20230802105950398.png)

可以使用默认的配置，也可以自己上传配置文件。

![image-20230802110247590](img/Burpsuite/image-20230802110247590.png)

### BurpSuite 各模块

#### 01. Dashboard

![image-20230718155206940](img/Burpsuite/image-20230718155206940.png)

#### 02. Target

显示目标目录结构的的一个功能

![image-20230803112724332](img/Burpsuite/image-20230803112724332.png)

burp 的 Repuest 部分和 Response 部分可以查看不同的格式，例如在 Request 部分点击 Hex 可以查看十六进制的形式

![image-20230803112824096](img/Burpsuite/image-20230803112824096.png)

Response 部分还可以查看渲染结果，例如

![image-20230803113010306](img/Burpsuite/image-20230803113010306.png)

最右侧一列可以选择展开或折叠

![image-20230803132506259](img/Burpsuite/image-20230803132506259.png)

#### 03. Proxy

点击`Open browser`即可打开浏览器

![image-20230802134450701](img/Burpsuite/image-20230802134450701.png)

若不想使用 burp 自带的浏览器，可以在常用的浏览器上配置代理，指定 burp 监听的端口，就可以让浏览器发出的流量经过 burpsuite。

![image-20230802134922158](img/Burpsuite/image-20230802134922158.png)

edge 浏览器设置如下：

![image-20230802135223464](img/Burpsuite/image-20230802135223464.png)

火狐浏览器步骤：

![image-20230802135627683](img/Burpsuite/image-20230802135627683.png)

![image-20230802135807931](img/Burpsuite/image-20230802135807931.png)

Proxy 模块最主要的功能是拦截请求包，如下：

![image-20230802140203325](img/Burpsuite/image-20230802140203325.png)

拦截到后还可以点击 Action(或者在报文处右键)，选择将该报文发送给 burp 的其他模块进一步处理，点击最下面的两个选项可以查看该部分的具体使用文档。

![屏幕截图 2023-08-02 144112](img/Burpsuite/屏幕截图 2023-08-02 144112.png)

HTTP History 部分可以看到浏览器发出的所有 HTTP 报文及其响应情况，点击还可以查看请求与响应的具体内容。

![image-20230802144812581](img/Burpsuite/image-20230802144812581.png)

**WebSockets History**

#### 04. Intruder

该模块只要用于发送一些只有固定部分需要修改的数据包，例如暴力破解一些网站的密码，只需要修改请求包中的密码字段，然后通过响应的不同来判断该密码是否正确。

下面介绍暴力破解用户名和密码的简单步骤：

- 将登录时截获的报文右键`send to intruder`

![image-20230803101543594](img/Burpsuite/image-20230803101543594.png)

- 选中爆破时需要遍历的部分，点击右侧的`Add §`即可确定好 payload 的位置。（选中后点击右侧`Clear §`r 即可清除）

![image-20230803102029759](img/Burpsuite/image-20230803102029759.png)

也可以选择`Auto §`，这种方式或给等号后面的参数都加上通配符，但一般不太能准确满足要求。

![image-20230803102318473](img/Burpsuite/image-20230803102318473.png)

点击右下角的`Clear`可以清除所有该报文的所有内容 谨慎尝试。

![image-20230803102622826](img/Burpsuite/image-20230803102622826.png)

- 选择`Attck type`，选中**username**和**password**的位置为 payload 的位置后，需要选择攻击类型，

![image-20230803103015934](img/Burpsuite/image-20230803103015934.png)

**Burpsuite 支持的 4 种攻击类型区别：**

`Sniper`: 一次只能替换 1 个 payload

`Battering ram`: 可以同时替换 2 个 payload，但是每个 payload 同时替换成字典里面的同一个值

`Pitchfork`: 可以同时替换 n 个 payload（取决于自己设置几个）。第 1 个字典的值替换第 1 个 payload，第 2 个字典的值替换第 2 个 payload，两个字典里的值一一对应。

`Cluster bomb`: 可以同时替换 n 个 payload（取决于自己设置几个）。但是会将第 1 个字典的每个 payload 依次与第 2 个字典的所有 payload 进行匹配

由于我们需要同时确定用户名和密码，所以此时选择攻击类型为`Cluster bomb`

- 在`playloads`部分添加两个字典，分别匹配上面的用户名和密码，即`§`符号中间的内容。`Payload sets`部分，先对第一个 payload 配置，`Payload type`选择`Simple list`，在下面`Load`对应的用户名字典

  ![image-20230803110548254](img/Burpsuite/image-20230803110548254.png)

选择字典还可以选择`Payload type`为`Runtime file`，在下面选择对应的字典，以配置**password**的字典为例，对第二个 payload 的位置进行配置：

![image-20230803105558048](img/Burpsuite/image-20230803105558048.png)

除此之外还可以选择多种 payload 的形式，比如数字、日期等：

![image-20230803105734091](img/Burpsuite/image-20230803105734091.png)

另外，当需要对字典中的 payload 进一步处理时，可以

![image-20230803110253230](img/Burpsuite/image-20230803110253230.png)

例如编解码、添加前缀后缀、计算 hash、substring 等。

- 配置并发，此时并发线程默认为 10，如果需要更改可以在下方`Create new resource pool`处新建

  ![image-20230803110656508](img/Burpsuite/image-20230803110656508.png)

![image-20230803111024234](img/Burpsuite/image-20230803111024234.png)

后面的 settings 部分可以对爆破过程做进一步配置，例如

![image-20230803111301692](img/Burpsuite/image-20230803111301692.png)

点击`Start Attack`，结果如下：会出现一 success 列，显示数据包中出现了几次 success 字符串。可以通过它来判断登录是否成功。

![image-20230803111506985](img/Burpsuite/image-20230803111506985.png)

判断登录成功的方法除了上面的添加匹配条件的方式，还可以通过响应包的长度来判断，因为登录成功与失败的响应一定是不同的。

点击 Length，就会按照你好响应的长度排序，此时发现有一长度与其他不同的报文。点击报文后可以看到具体内容，发现响应确实是 login success

![image-20230803111902449](img/Burpsuite/image-20230803111902449.png)

#### 05. Repeater

这个模块比较常用，在这里可以修改请求报文的内容，讲报文`Send to repeater`后，即可修改后点击`Send`重新发送。

同时还支持对该报文进行各种编码：

![image-20230803131756488](img/Burpsuite/image-20230803131756488.png)

还可以修改 hex，如下，选中某个字节后，点击`Insert ** ` 会在该字节前面插入，`Delete **`可以删除选中的字节。

![image-20230803132057841](img/Burpsuite/image-20230803132057841.png)

#### 06. Sequencer

序列器模块用于检测参数的随机性，例如密码或者令牌是否可预测，以此判断关键数据是否可以被伪造。此功能同样需要设置代理并获取目标域名，然后关闭代理拦截。然后将需要检测序列的目标域名发送给 sequencer 模块。序列检测就是将获得的网站提取 cookie 信息等，然后将发送大量的请求，以得出序列健壮性

#### 07. Decoder

这个模块支持多种编解码：

![image-20230803150021179](img/Burpsuite/image-20230803150021179.png)

可以嵌套的编码或解码，如下，先 base64 编码--url 编码--url 解码--base64 解码。

![image-20230803145816937](img/Burpsuite/image-20230803145816937.png)

#### 08. Comparer

选择两个报文`Send to comparer` ，点击`Words`或`Bytes`可以从两个维度比较报文的区别

![image-20230803152304367](img/Burpsuite/image-20230803152304367.png)

Words 对比结果

![image-20230803152513470](img/Burpsuite/image-20230803152513470.png)

Bytes 对比结果

![image-20230803152628553](img/Burpsuite/image-20230803152628553.png)

#### 09. Logger

这个模块记录了所有经过 burpsuite 的所有 http 流量，最多 100MB。可以在右上角的`Logging:On`开启或关闭。

![image-20230803153233401](img/Burpsuite/image-20230803153233401.png)

#### 10. Organizer

> v2023.7.2 新增模块

个人感觉可以把需要保留的报文发送到这个模块，可以标记颜色、状态、添加 Notes 等

![image-20230803153646917](img/Burpsuite/image-20230803153646917.png)

状态部分可选：

![image-20230803153716254](img/Burpsuite/image-20230803153716254.png)

Highlight 部分可选：

![image-20230803153747391](img/Burpsuite/image-20230803153747391.png)

#### 11. Extensions

![image-20230803155656787](img/Burpsuite/image-20230803155656787.png)

![image-20230803160120794](img/Burpsuite/image-20230803160120794.png)还可以在`BAPP Store`下载安装

![image-20230803160153182](img/Burpsuite/image-20230803160153182.png)

利用`APIs`可以自己开发 burp 扩展

![image-20230803160723133](img/Burpsuite/image-20230803160723133.png)

#### 12. Setting

![image-20230803160822207](img/Burpsuite/image-20230803160822207.png)
