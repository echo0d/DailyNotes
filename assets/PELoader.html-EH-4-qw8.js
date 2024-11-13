import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as d,c as a,a as A,b as e,d as i,e as s}from"./app-hrVaqSbE.js";const r={},o=A("h1",{id:"通过-net实现内存加载pe文件",tabindex:"-1"},[A("a",{class:"header-anchor",href:"#通过-net实现内存加载pe文件","aria-hidden":"true"},"#"),e(" 通过.NET实现内存加载PE文件")],-1),c=A("h2",{id:"_1-从内存加载-net程序集-assembly-load",tabindex:"-1"},[A("a",{class:"header-anchor",href:"#_1-从内存加载-net程序集-assembly-load","aria-hidden":"true"},"#"),e(" 1. 从内存加载.NET程序集(Assembly.Load)")],-1),u=A("p",null,[e("使用C#从内存中加载.NET程序集，直接用"),A("code",null,"Assembly.Load"),e("就行了。")],-1),m={href:"https://learn.microsoft.com/en-us/dotnet/api/system.reflection.assembly.load?view=netframework-4.5",target:"_blank",rel:"noopener noreferrer"},v=s(`<h3 id="_1-1-三种load的区别" tabindex="-1"><a class="header-anchor" href="#_1-1-三种load的区别" aria-hidden="true">#</a> 1.1. 三种Load的区别</h3><p><strong><code>Assembly.Load()</code>、<code>Assembly.LoadFrom()</code>和<code>Assembly.LoadFile()</code></strong></p><ul><li><p><code>Assembly.Load()</code>是从String或AssemblyName类型加载程序集，可以读取字符串形式的程序集，也就是说，文件不需要写入硬盘</p></li><li><p><code>Assembly.LoadFrom()</code>从指定文件中加载程序集，同时会加载目标程序集所引用和依赖的其他程序集，例如：<code>Assembly.LoadFrom(&quot;a.dll&quot;)</code>，如果a.dll中引用了b.dll，那么会同时加载a.dll和b.dll</p></li><li><p><code>Assembly.LoadFile()</code>也是从指定文件中加载程序集，但不会加载目标程序集所引用和依赖的其他程序集，例如：<code>Assembly.LoadFile(&quot;a.dll&quot;)</code>，如果a.dll中引用了b.dll，那么不会加载b.dll</p></li></ul><h3 id="_1-2-assembly-load-的实现示例" tabindex="-1"><a class="header-anchor" href="#_1-2-assembly-load-的实现示例" aria-hidden="true">#</a> 1.2. Assembly.Load()的实现示例</h3><h4 id="_1-编写测试程序" tabindex="-1"><a class="header-anchor" href="#_1-编写测试程序" aria-hidden="true">#</a> (1) 编写测试程序</h4><p>测试程序的代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>using System;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>生成testcalc.exe</p><h4 id="_2-测试的-exe作base64编码" tabindex="-1"><a class="header-anchor" href="#_2-测试的-exe作base64编码" aria-hidden="true">#</a> (2) 测试的.exe作base64编码</h4><p>代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>using System;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-还原-exe的内容" tabindex="-1"><a class="header-anchor" href="#_3-还原-exe的内容" aria-hidden="true">#</a> (3) 还原.exe的内容</h4><div class="language-C# line-numbers-mode" data-ext="C#"><pre class="language-C#"><code>using System;
using System.Reflection;
namespace TestApplication
{
    public class Program
    {
        public static void Main()
        {

            string base64str = &quot;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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==&quot;;
            byte[] buffer = Convert.FromBase64String(base64str);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-使用assembly-load-加载程序集并调用方法" tabindex="-1"><a class="header-anchor" href="#_4-使用assembly-load-加载程序集并调用方法" aria-hidden="true">#</a> (4) 使用Assembly.Load()加载程序集并调用方法</h4><p>代码如下：</p><div class="language-C# line-numbers-mode" data-ext="C#"><pre class="language-C#"><code>using System;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不需要指定需要调用的方法，调用main函数即可：</p><div class="language-C# line-numbers-mode" data-ext="C#"><pre class="language-C#"><code>using System;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-从内存加载-net程序集-execute-assembly" tabindex="-1"><a class="header-anchor" href="#_2-从内存加载-net程序集-execute-assembly" aria-hidden="true">#</a> 2. 从内存加载.NET程序集(execute-assembly)</h2><p>当不是用C#编写代码，但还是想要实现上面的操作时，例如Cobalt Strike 3.11中，加入了一个名为”execute-assembly”的命令，能够从内存中加载.NET程序集。<code>execute-assembly</code>功能的实现，必须使用一些来自.NET Framework的核心接口来执行.NET程序集口</p><h3 id="_2-1-基础知识" tabindex="-1"><a class="header-anchor" href="#_2-1-基础知识" aria-hidden="true">#</a> 2.1. 基础知识</h3><p>CLR全称Common Language Runtime（公共语言运行库），是一个可由多种编程语言使用的运行环境</p><p>CLR是.NET Framework的主要执行引擎，作用之一是监视程序的运行：</p><ul><li>在CLR监视之下运行的程序属于”托管的”(managed)代码</li><li>不在CLR之下、直接在裸机上运行的应用或者组件属于”非托管的”(unmanaged)的代码</li></ul><p><strong>Hosting</strong> (Unmanaged API Reference) 用于将.NET 程序集加载到任意程序中的API（https://docs.microsoft.com/en-us/dotnet/framework/unmanaged-api/ ）本次主要关注两种方式，按照.net版本区分：</p><ul><li><p><strong>ICorRuntimeHost Interface</strong>：https://docs.microsoft.com/en-us/dotnet/framework/unmanaged-api/hosting/icorruntimehost-interface</p><p>支持v1.0.3705, v1.1.4322, v2.0.50727和v4.0.30319</p></li><li><p><strong>ICLRRuntimeHost Interface</strong>：https://docs.microsoft.com/en-us/dotnet/framework/unmanaged-api/hosting/iclrruntimehost-interface</p><p>支持v2.0.50727和v4.0.30319，在.NET Framework 2.0中，ICLRRuntimeHost用于取代ICorRuntimeHost，在实际程序开发中，很少会考虑.NET Framework 1.0，所以两个接口都可以使用</p></li></ul><h4 id="重要接口描述" tabindex="-1"><a class="header-anchor" href="#重要接口描述" aria-hidden="true">#</a> 重要接口描述</h4><p><code>ICLRRuntimeHost</code>、<code>ICLRRuntimeInfo</code> 以及<code>ICLRMetaHost</code> ，以下是这三个接口的简要描述</p>`,30),b={href:"https://learn.microsoft.com/en-us/dotnet/framework/unmanaged-api/hosting/iclrruntimehost-interface",target:"_blank",rel:"noopener noreferrer"},p=s(`<ul><li><strong>ICLRMetaHost</strong>: 这个接口用于在托管代码中获取关于加载的CLR（Common Language Runtime，.NET Framework的核心组件）的信息。基本上，它提供了一个入口点，允许我们枚举加载到进程中的所有CLR版本，并为特定版本的CLR获取<code>ICLRRuntimeInfo</code>接口。</li><li><strong>ICLRRuntimeInfo</strong>: 一旦你有了表示特定CLR版本的<code>ICLRRuntimeInfo</code>接口，你可以用它来获取CLR运行时的其他接口，例如<code>ICLRRuntimeHost</code>。这个接口还允许你判断这个特定版本的CLR是否已经被加载到进程中。</li><li><strong>ICLRRuntimeHost</strong>: 这是执行.NET程序集所必需的主要接口。通过这个接口，你可以启动托管代码的执行环境，加载.NET程序集，并执行它。具体来说，它的<code>ExecuteInDefaultAppDomain</code>方法可以用来加载和执行.NET程序集。</li></ul><p>综上所述，要在非托管代码（如C++）中执行.NET程序集，你需要首先使用<code>ICLRMetaHost</code>来确定哪个CLR版本已加载或可用。然后，你可以使用<code>ICLRRuntimeInfo</code>来为这个CLR版本获取<code>ICLRRuntimeHost</code>。最后，使用<code>ICLRRuntimeHost</code>来加载和执行.NET程序集。</p><h3 id="_2-2-基础实现方法-非内存加载" tabindex="-1"><a class="header-anchor" href="#_2-2-基础实现方法-非内存加载" aria-hidden="true">#</a> 2.2. 基础实现方法（非内存加载）</h3><h4 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h4><p><strong>(1) 将CLR加载到进程中</strong></p><ol><li><p>调用<code>CLRCreateInstance</code>函数以获取<code>ICLRMetaHost</code>或<code>ICLRMetaHostPolicy</code>接口</p></li><li><p>获取有效的<code>ICLRRuntimeInfo</code>指针（三种方式任选）：</p></li></ol><ul><li>调用<code>ICLRMetaHost::EnumerateInstalledRuntimes</code></li><li>调用<code>ICLRMetaHost::GetRuntime</code></li><li>调用<code>ICLRMetaHostPolicy::GetRequestedRuntime</code>方法</li></ul><ol start="3"><li>使用<code>ICorRuntimeHost</code>或者<code>ICLRRuntimeHost</code>，二者都是调用<code>ICLRRuntimeInfo::GetInterface</code>方法，但是参数不同</li></ol><p><code>ICorRuntimeHost</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>支持v1.0.3705, v1.1.4322, v2.0.50727和v4.0.30319
指定CLSID_CorRuntimeHost为rclsid参数
指定IID_ICorRuntimeHost为RIID参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ICLRRuntimeHost</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>支持v2.0.50727和v4.0.30319
指定CLSID_CLRRuntimeHost为rclsid参数
指定IID_ICLRRuntimeHost为RIID参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>(2) 加载.NET程序集并调用静态方法</strong></p><p>在代码实现上，使用<code>ICLRRuntimeHost</code>会比使用<code>ICorRuntimeHost</code>简单的多</p><p><strong>(3) 清理CLR</strong></p><p>释放步骤1中的指针</p><h4 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例" aria-hidden="true">#</a> 代码示例</h4><p>下面使用<code>ICLRMetaHost::GetRuntime</code>获取有效的<code>ICLRRuntimeInfo</code>指针，使用<code>ICLRRuntimeHost</code>从文件加载.NET程序集并调用静态方法</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &quot;stdafx.h&quot;
#include &lt;metahost.h&gt;
#include &lt;windows.h&gt;
#pragma comment(lib, &quot;MSCorEE.lib&quot;)

HRESULT RuntimeHost_GetRuntime_ICLRRuntimeInfo(PCWSTR pszVersion, PCWSTR pszAssemblyName, PCWSTR pszClassName, PCWSTR pszMethodName, PCWSTR pszArgName)
{
	// Call the ICLRMetaHost::GetRuntime to get a valid ICLRRuntimeInfo.
	// Call the ICLRRuntimeInfo:GetInterface method.
	HRESULT hr;
	ICLRMetaHost *pMetaHost = NULL;
	ICLRRuntimeInfo *pRuntimeInfo = NULL;
	ICLRRuntimeHost *pClrRuntimeHost = NULL;
	DWORD dwLengthRet;
	// 
	// Load and start the .NET runtime.
	// 
	wprintf(L&quot;Load and start the .NET runtime %s \\n&quot;, pszVersion);
	hr = CLRCreateInstance(CLSID_CLRMetaHost, IID_PPV_ARGS(&amp;pMetaHost));
	if (FAILED(hr))
	{
		wprintf(L&quot;[!]CLRCreateInstance failed w/hr 0x%08lx\\n&quot;, hr);
		goto Cleanup;
	}
	// Get the ICLRRuntimeInfo corresponding to a particular CLR version. It 
	// supersedes CorBindToRuntimeEx with STARTUP_LOADER_SAFEMODE.
	hr = pMetaHost-&gt;GetRuntime(pszVersion, IID_PPV_ARGS(&amp;pRuntimeInfo));
	if (FAILED(hr))
	{
		wprintf(L&quot;[!]ICLRMetaHost::GetRuntime failed w/hr 0x%08lx\\n&quot;, hr);
		goto Cleanup;
	}
	// Check if the specified runtime can be loaded into the process. This 
	// method will take into account other runtimes that may already be 
	// loaded into the process and set pbLoadable to TRUE if this runtime can 
	// be loaded in an in-process side-by-side fashion. 
	BOOL fLoadable;
	hr = pRuntimeInfo-&gt;IsLoadable(&amp;fLoadable);
	if (FAILED(hr))
	{
		wprintf(L&quot;[!]ICLRRuntimeInfo::IsLoadable failed w/hr 0x%08lx\\n&quot;, hr);
		goto Cleanup;
	}
	if (!fLoadable)
	{
		wprintf(L&quot;[!].NET runtime %s cannot be loaded\\n&quot;, pszVersion);
		goto Cleanup;
	}
	// Load the CLR into the current process and return a runtime interface 
	// pointer. ICorRuntimeHost and ICLRRuntimeHost are the two CLR hosting  
	// interfaces supported by CLR 4.0. Here we demo the ICLRRuntimeHost 
	// interface that was provided in .NET v2.0 to support CLR 2.0 new 
	// features. ICLRRuntimeHost does not support loading the .NET v1.x 
	// runtimes.
	hr = pRuntimeInfo-&gt;GetInterface(CLSID_CLRRuntimeHost, IID_PPV_ARGS(&amp;pClrRuntimeHost));
	if (FAILED(hr))
	{
		wprintf(L&quot;[!]ICLRRuntimeInfo::GetInterface failed w/hr 0x%08lx\\n&quot;, hr);
		goto Cleanup;
	}
	// Start the CLR.
	hr = pClrRuntimeHost-&gt;Start();
	if (FAILED(hr))
	{
		wprintf(L&quot;[!]CLR failed to start w/hr 0x%08lx\\n&quot;, hr);
		goto Cleanup;
	}
	// 
	// Load the NET assembly and call the static method.
	// 
	wprintf(L&quot;[+]Load the assembly %s\\n&quot;, pszAssemblyName);
	// The invoked method of ExecuteInDefaultAppDomain must have the 
	// following signature: static int pwzMethodName (String pwzArgument)
	// where pwzMethodName represents the name of the invoked method, and 
	// pwzArgument represents the string value passed as a parameter to that 
	// method. If the HRESULT return value of ExecuteInDefaultAppDomain is 
	// set to S_OK, pReturnValue is set to the integer value returned by the 
	// invoked method. Otherwise, pReturnValue is not set.
	hr = pClrRuntimeHost-&gt;ExecuteInDefaultAppDomain(pszAssemblyName, pszClassName, pszMethodName, pszArgName, &amp;dwLengthRet);
	if (FAILED(hr))
	{
		wprintf(L&quot;[!]Failed to call %s w/hr 0x%08lx\\n&quot;, pszMethodName, hr);
		goto Cleanup;
	}
	// Print the call result of the static method.
	wprintf(L&quot;[+]Call %s.%s(\\&quot;%s\\&quot;) =&gt; %d\\n&quot;, pszClassName, pszMethodName, pszArgName, dwLengthRet);

Cleanup:
	if (pMetaHost)
	{
		pMetaHost-&gt;Release();
		pMetaHost = NULL;
	}
	if (pRuntimeInfo)
	{
		pRuntimeInfo-&gt;Release();
		pRuntimeInfo = NULL;
	}
	if (pClrRuntimeHost)
	{
		// Please note that after a call to Stop, the CLR cannot be 
		// reinitialized into the same process. This step is usually not 
		// necessary. You can leave the .NET runtime loaded in your process.
		//wprintf(L&quot;Stop the .NET runtime\\n&quot;);
		//pClrRuntimeHost-&gt;Stop();
		pClrRuntimeHost-&gt;Release();
		pClrRuntimeHost = NULL;
	}
	return hr;
}

int main()
{
	RuntimeHost_GetRuntime_ICLRRuntimeInfo(L&quot;v4.0.30319&quot;, L&quot;ClassLibrary1.dll&quot;, L&quot;ClassLibrary1.Class1&quot;, L&quot;TestMethod&quot;, L&quot;argstring&quot;);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码将会加载同级目录下.Net4.0开发的ClassLibrary1.dll，类名为Class1，方法为TestMethod，传入的参数为argstring</p><p>ClassLibrary1.dll的代码如下：</p><div class="language-C# line-numbers-mode" data-ext="C#"><pre class="language-C#"><code>using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary1
{
    public class Class1
    {
        public static int TestMethod(string str)
        {
            System.Diagnostics.Process p = new System.Diagnostics.Process();
            p.StartInfo.FileName = &quot;c:\\\\windows\\\\system32\\\\calc.exe&quot;;
            p.Start();
            return 0;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-execute-assembly实现方法" tabindex="-1"><a class="header-anchor" href="#_2-3-execute-assembly实现方法" aria-hidden="true">#</a> 2.3. execute-assembly实现方法</h3><h4 id="_1-从内存中读取shellcode并加载-net程序集" tabindex="-1"><a class="header-anchor" href="#_1-从内存中读取shellcode并加载-net程序集" aria-hidden="true">#</a> 1. 从内存中读取shellcode并加载.NET程序集</h4><ul><li>调用<code>ICLRMetaHost::EnumerateInstalledRuntimes</code>, <code>ICLRMetaHost::GetRuntime</code>或者<code>ICLRMetaHostPolicy::GetRequestedRuntime</code>方法以获取有效的<code>ICLRRuntimeInfo</code>指针</li><li>使用<code>ICorRuntimeHost</code>接口</li><li>使用<code>Load_3(…)</code>从内存中读取并加载.NET程序集</li><li>调用静态方法</li></ul><h4 id="_2-从硬盘读取并加载-net程序集" tabindex="-1"><a class="header-anchor" href="#_2-从硬盘读取并加载-net程序集" aria-hidden="true">#</a> 2. 从硬盘读取并加载.NET程序集</h4><ul><li>调用<code>ICLRMetaHost::EnumerateInstalledRuntimes</code>,<code> ICLRMetaHost::GetRuntime</code>或者<code>ICLRMetaHostPolicy::GetRequestedRuntime</code>方法以获取有效的<code>ICLRRuntimeInfo</code>指针</li><li>使用<code>ICorRuntimeHost</code>(使用<code>Load_2(…)</code>)或者I<code>CLRRuntimeHost</code>接口</li><li>加载.NET程序集并调用静态方法</li></ul><p>第一种利用思路要优于第二种，完整的利用过程如下：</p><ol><li>创建一个正常的进程</li><li>通过Dll反射向进程注入dll</li><li>dll实现从内存中读取shellcode并加载最终的.NET程序集</li></ol><p>优点如下：</p><ul><li>整个过程在内存执行，不写入文件系统</li><li>Payload以dll形式存在，不会产生可疑的进程</li><li>最终的Payload为C#程序，现有的Powershell利用脚本转换为C#代码很方便</li></ul><h2 id="_3-通过-net实现内存加载pe文件" tabindex="-1"><a class="header-anchor" href="#_3-通过-net实现内存加载pe文件" aria-hidden="true">#</a> 3. 通过.NET实现内存加载PE文件</h2>`,32);function h(g,R){const n=l("ExternalLinkIcon");return d(),a("div",null,[o,c,u,A("p",null,[A("a",m,[e("Assembly.Load Method (System.Reflection) | Microsoft Learn"),i(n)])]),v,A("p",null,[A("a",b,[e("ICLRRuntimeHost Interface - .NET Framework | Microsoft Learn"),i(n)])]),p])}const L=t(r,[["render",h],["__file","PELoader.html.vue"]]);export{L as default};
