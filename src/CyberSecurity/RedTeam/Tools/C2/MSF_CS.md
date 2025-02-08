---
category: 网络安全
tags:
  - 工具
star: "1"
---

# CS和MSF相互弹shell

### MSF 2 CS

CS先正常起一个监听：

![image-20230614175634459](img/MSF_CS/image-20230614175634459.png)

MSF配置;

![image-20230614173501998](img/MSF_CS/image-20230614173501998.png)

run完CS就接到了

![image-20230614175804223](img/MSF_CS/image-20230614175804223.png)



### CS 2 MSF

先msf监听，4.8版本为例，只支持http

![image-20230614174733555](img/MSF_CS/image-20230614174733555.png)

然后CS如下：

![image-20230614174346203](img/MSF_CS/image-20230614174346203.png)

![image-20230614174232752](img/MSF_CS/image-20230614174232752.png)

![image-20230614174641725](img/MSF_CS/image-20230614174641725.png)

然后msf接到了

![image-20230614174847095](img/MSF_CS/image-20230614174847095.png)
