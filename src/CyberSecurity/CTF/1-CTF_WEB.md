# CTF-WEB

## 1. PHP md5 相等绕过

要求字符串不同，但MD5相同
![image.png](img/1-CTF_WEB/1723443073686-5b063869-00fe-4b1e-9c56-7725ef648760.png)
解题参考
[PHP md5 相等绕过 - Ainsliaea - 博客园 (cnblogs.com)](https://www.cnblogs.com/ainsliaea/p/15126218.html)
**方法1：**
处理hash字符串时，PHP会将每一个以 0E开头的哈希值解释为0，同时后面都是数字，不能包含其他字符的字符串，md5 值会相等（`==` 的结果为 True，但 `===` 的结果为 False）。那么PHP会认为它们相同
![](img/1-CTF_WEB/1723443990504-3cbbfbb8-44db-483b-91d1-f250f3732497.jpeg)
**方法2：**
使用数组绕过，在 PHP5 和 PHP7 中，当两个 md5 进行比较时，若参数是不同的数组，那么 `==` 和 `===` 比较的结果均为 True
![](img/1-CTF_WEB/1723444019927-4af6822b-4053-477d-a114-a7028a5e6a4f.jpeg)
**方法3：**
利用 fastcoll 进行 md5 碰撞，生成两个字面值不同但 md5 相同的文件。[HashClash (tue.nl)](https://www.win.tue.nl/hashclash/)

