---
category: 网络安全
tags:
  - 工具
star: "1"
---

# CS 和 MSF 相互弹 shell

<!-- more -->

### MSF 2 CS

CS 先正常起一个监听：

![image-20230614175634459](img/MSF_CS/image-20230614175634459.png)

MSF 配置;

![image-20230614173501998](img/MSF_CS/image-20230614173501998.png)

run 完 CS 就接到了

![image-20230614175804223](img/MSF_CS/image-20230614175804223.png)

### CS 2 MSF

先 msf 监听，4.8 版本为例，只支持 http

![image-20230614174733555](img/MSF_CS/image-20230614174733555.png)

然后 CS 如下：

![image-20230614174346203](img/MSF_CS/image-20230614174346203.png)

![image-20230614174232752](img/MSF_CS/image-20230614174232752.png)

![image-20230614174641725](img/MSF_CS/image-20230614174641725.png)

然后 msf 接到了

![image-20230614174847095](img/MSF_CS/image-20230614174847095.png)
