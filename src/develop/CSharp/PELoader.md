# 通过.NET实现内存加载PE文件

## 1. 从内存加载.NET程序集(Assembly.Load)

使用C#从内存中加载.NET程序集，直接用`Assembly.Load`就行了。

[Assembly.Load Method (System.Reflection) | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.assembly.load?view=netframework-4.5)

### 1.1. 三种Load的区别

**`Assembly.Load()`、`Assembly.LoadFrom()`和`Assembly.LoadFile()`**

* `Assembly.Load()`是从String或AssemblyName类型加载程序集，可以读取字符串形式的程序集，也就是说，文件不需要写入硬盘

* `Assembly.LoadFrom()`从指定文件中加载程序集，同时会加载目标程序集所引用和依赖的其他程序集，例如：`Assembly.LoadFrom("a.dll")`，如果a.dll中引用了b.dll，那么会同时加载a.dll和b.dll

* `Assembly.LoadFile()`也是从指定文件中加载程序集，但不会加载目标程序集所引用和依赖的其他程序集，例如：`Assembly.LoadFile("a.dll")`，如果a.dll中引用了b.dll，那么不会加载b.dll

### 1.2. Assembly.Load()的实现示例

#### (1) 编写测试程序

测试程序的代码如下：

```
using System;
namespace TestApplication
{
	public class Program
	{
    		public static void Main()
    		{
        		Console.WriteLine("Main");
    		}
	}
	public class aaa
	{
    		public static void bbb()
    		{
        		System.Diagnostics.Process p = new System.Diagnostics.Process();
        		p.StartInfo.FileName = "c:\\windows\\system32\\calc.exe";
        		p.Start();
    		}
	}
}
```

使用csc.exe进行编译：

```
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe /out:testcalc.exe test.cs
```

生成testcalc.exe

#### (2) 测试的.exe作base64编码

代码如下：

```
using System;
using System.Reflection;
namespace TestApplication
{
    public class Program
    {
        public static void Main()
        {

            byte[] buffer = System.IO.File.ReadAllBytes("testcalc.exe");
            string base64str = Convert.ToBase64String(buffer);
            Console.WriteLine(base64str);
        }
    }
}
```

#### (3) 还原.exe的内容

```C#
using System;
using System.Reflection;
namespace TestApplication
{
    public class Program
    {
        public static void Main()
        {

            string base64str = "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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
            byte[] buffer = Convert.FromBase64String(base64str);

```



#### (4) 使用Assembly.Load()加载程序集并调用方法

代码如下：

```C#
using System;
using System.Reflection;
namespace TestApplication
{
    public class Program
    {
        public static void Main()
        {

            string base64str = "egrdersg";//这里省略一下
            byte[] buffer = Convert.FromBase64String(base64str);

            Assembly assembly = Assembly.Load(buffer);          
            Type type = assembly.GetType("TestApplication.aaa");
            MethodInfo method = type.GetMethod("bbb");
            Object obj = assembly.CreateInstance(method.Name);            
            method.Invoke(obj, null);
        }
    }
}
```

如果不需要指定需要调用的方法，调用main函数即可：

```C#
using System;
using System.Reflection;
namespace TestApplication
{
    public class Program
    {
        public static void Main()
        {

            string base64str = "xxxxxx"; //此处省略一万字
            byte[] buffer = Convert.FromBase64String(base64str);

            Assembly assembly = Assembly.Load(buffer);
            MethodInfo method = assembly.EntryPoint;
            // 想要指定参数
            object[] parameters = new[] {"-a","-b"};
            method.Invoke(null, parameters);
        }
    }
}
```



## 2. 从内存加载.NET程序集(execute-assembly)

当不是用C#编写代码，但还是想要实现上面的操作时，例如Cobalt Strike 3.11中，加入了一个名为”execute-assembly”的命令，能够从内存中加载.NET程序集。`execute-assembly`功能的实现，必须使用一些来自.NET Framework的核心接口来执行.NET程序集口



### 2.1. 基础知识

CLR全称Common Language Runtime（公共语言运行库），是一个可由多种编程语言使用的运行环境

CLR是.NET Framework的主要执行引擎，作用之一是监视程序的运行：

- 在CLR监视之下运行的程序属于”托管的”(managed)代码
- 不在CLR之下、直接在裸机上运行的应用或者组件属于”非托管的”(unmanaged)的代码

**Hosting** (Unmanaged API Reference) 用于将.NET 程序集加载到任意程序中的API（https://docs.microsoft.com/en-us/dotnet/framework/unmanaged-api/ ）本次主要关注两种方式，按照.net版本区分：

- **ICorRuntimeHost Interface**：https://docs.microsoft.com/en-us/dotnet/framework/unmanaged-api/hosting/icorruntimehost-interface

  支持v1.0.3705, v1.1.4322, v2.0.50727和v4.0.30319

- **ICLRRuntimeHost Interface**：https://docs.microsoft.com/en-us/dotnet/framework/unmanaged-api/hosting/iclrruntimehost-interface

  支持v2.0.50727和v4.0.30319，在.NET Framework 2.0中，ICLRRuntimeHost用于取代ICorRuntimeHost，在实际程序开发中，很少会考虑.NET Framework 1.0，所以两个接口都可以使用

#### 重要接口描述

`ICLRRuntimeHost`、`ICLRRuntimeInfo` 以及`ICLRMetaHost` ，以下是这三个接口的简要描述

[ICLRRuntimeHost Interface - .NET Framework | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/framework/unmanaged-api/hosting/iclrruntimehost-interface)

- **ICLRMetaHost**: 这个接口用于在托管代码中获取关于加载的CLR（Common Language Runtime，.NET Framework的核心组件）的信息。基本上，它提供了一个入口点，允许我们枚举加载到进程中的所有CLR版本，并为特定版本的CLR获取`ICLRRuntimeInfo`接口。
- **ICLRRuntimeInfo**: 一旦你有了表示特定CLR版本的`ICLRRuntimeInfo`接口，你可以用它来获取CLR运行时的其他接口，例如`ICLRRuntimeHost`。这个接口还允许你判断这个特定版本的CLR是否已经被加载到进程中。
- **ICLRRuntimeHost**: 这是执行.NET程序集所必需的主要接口。通过这个接口，你可以启动托管代码的执行环境，加载.NET程序集，并执行它。具体来说，它的`ExecuteInDefaultAppDomain`方法可以用来加载和执行.NET程序集。

综上所述，要在非托管代码（如C++）中执行.NET程序集，你需要首先使用`ICLRMetaHost`来确定哪个CLR版本已加载或可用。然后，你可以使用`ICLRRuntimeInfo`来为这个CLR版本获取`ICLRRuntimeHost`。最后，使用`ICLRRuntimeHost`来加载和执行.NET程序集。

### 2.2. 基础实现方法（非内存加载）

#### 步骤

**(1) 将CLR加载到进程中**

1) 调用`CLRCreateInstance`函数以获取`ICLRMetaHost`或`ICLRMetaHostPolicy`接口

2) 获取有效的`ICLRRuntimeInfo`指针（三种方式任选）：

* 调用`ICLRMetaHost::EnumerateInstalledRuntimes`
* 调用`ICLRMetaHost::GetRuntime`
* 调用`ICLRMetaHostPolicy::GetRequestedRuntime`方法

3) 使用`ICorRuntimeHost`或者`ICLRRuntimeHost`，二者都是调用`ICLRRuntimeInfo::GetInterface`方法，但是参数不同

`ICorRuntimeHost`

```
支持v1.0.3705, v1.1.4322, v2.0.50727和v4.0.30319
指定CLSID_CorRuntimeHost为rclsid参数
指定IID_ICorRuntimeHost为RIID参数
```

`ICLRRuntimeHost`

```
支持v2.0.50727和v4.0.30319
指定CLSID_CLRRuntimeHost为rclsid参数
指定IID_ICLRRuntimeHost为RIID参数
```



**(2) 加载.NET程序集并调用静态方法**

在代码实现上，使用`ICLRRuntimeHost`会比使用`ICorRuntimeHost`简单的多

**(3) 清理CLR**

释放步骤1中的指针

#### 代码示例

下面使用`ICLRMetaHost::GetRuntime`获取有效的`ICLRRuntimeInfo`指针，使用`ICLRRuntimeHost`从文件加载.NET程序集并调用静态方法

```C++
#include "stdafx.h"
#include <metahost.h>
#include <windows.h>
#pragma comment(lib, "MSCorEE.lib")

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
	wprintf(L"Load and start the .NET runtime %s \n", pszVersion);
	hr = CLRCreateInstance(CLSID_CLRMetaHost, IID_PPV_ARGS(&pMetaHost));
	if (FAILED(hr))
	{
		wprintf(L"[!]CLRCreateInstance failed w/hr 0x%08lx\n", hr);
		goto Cleanup;
	}
	// Get the ICLRRuntimeInfo corresponding to a particular CLR version. It 
	// supersedes CorBindToRuntimeEx with STARTUP_LOADER_SAFEMODE.
	hr = pMetaHost->GetRuntime(pszVersion, IID_PPV_ARGS(&pRuntimeInfo));
	if (FAILED(hr))
	{
		wprintf(L"[!]ICLRMetaHost::GetRuntime failed w/hr 0x%08lx\n", hr);
		goto Cleanup;
	}
	// Check if the specified runtime can be loaded into the process. This 
	// method will take into account other runtimes that may already be 
	// loaded into the process and set pbLoadable to TRUE if this runtime can 
	// be loaded in an in-process side-by-side fashion. 
	BOOL fLoadable;
	hr = pRuntimeInfo->IsLoadable(&fLoadable);
	if (FAILED(hr))
	{
		wprintf(L"[!]ICLRRuntimeInfo::IsLoadable failed w/hr 0x%08lx\n", hr);
		goto Cleanup;
	}
	if (!fLoadable)
	{
		wprintf(L"[!].NET runtime %s cannot be loaded\n", pszVersion);
		goto Cleanup;
	}
	// Load the CLR into the current process and return a runtime interface 
	// pointer. ICorRuntimeHost and ICLRRuntimeHost are the two CLR hosting  
	// interfaces supported by CLR 4.0. Here we demo the ICLRRuntimeHost 
	// interface that was provided in .NET v2.0 to support CLR 2.0 new 
	// features. ICLRRuntimeHost does not support loading the .NET v1.x 
	// runtimes.
	hr = pRuntimeInfo->GetInterface(CLSID_CLRRuntimeHost, IID_PPV_ARGS(&pClrRuntimeHost));
	if (FAILED(hr))
	{
		wprintf(L"[!]ICLRRuntimeInfo::GetInterface failed w/hr 0x%08lx\n", hr);
		goto Cleanup;
	}
	// Start the CLR.
	hr = pClrRuntimeHost->Start();
	if (FAILED(hr))
	{
		wprintf(L"[!]CLR failed to start w/hr 0x%08lx\n", hr);
		goto Cleanup;
	}
	// 
	// Load the NET assembly and call the static method.
	// 
	wprintf(L"[+]Load the assembly %s\n", pszAssemblyName);
	// The invoked method of ExecuteInDefaultAppDomain must have the 
	// following signature: static int pwzMethodName (String pwzArgument)
	// where pwzMethodName represents the name of the invoked method, and 
	// pwzArgument represents the string value passed as a parameter to that 
	// method. If the HRESULT return value of ExecuteInDefaultAppDomain is 
	// set to S_OK, pReturnValue is set to the integer value returned by the 
	// invoked method. Otherwise, pReturnValue is not set.
	hr = pClrRuntimeHost->ExecuteInDefaultAppDomain(pszAssemblyName, pszClassName, pszMethodName, pszArgName, &dwLengthRet);
	if (FAILED(hr))
	{
		wprintf(L"[!]Failed to call %s w/hr 0x%08lx\n", pszMethodName, hr);
		goto Cleanup;
	}
	// Print the call result of the static method.
	wprintf(L"[+]Call %s.%s(\"%s\") => %d\n", pszClassName, pszMethodName, pszArgName, dwLengthRet);

Cleanup:
	if (pMetaHost)
	{
		pMetaHost->Release();
		pMetaHost = NULL;
	}
	if (pRuntimeInfo)
	{
		pRuntimeInfo->Release();
		pRuntimeInfo = NULL;
	}
	if (pClrRuntimeHost)
	{
		// Please note that after a call to Stop, the CLR cannot be 
		// reinitialized into the same process. This step is usually not 
		// necessary. You can leave the .NET runtime loaded in your process.
		//wprintf(L"Stop the .NET runtime\n");
		//pClrRuntimeHost->Stop();
		pClrRuntimeHost->Release();
		pClrRuntimeHost = NULL;
	}
	return hr;
}

int main()
{
	RuntimeHost_GetRuntime_ICLRRuntimeInfo(L"v4.0.30319", L"ClassLibrary1.dll", L"ClassLibrary1.Class1", L"TestMethod", L"argstring");
	return 0;
}
```

代码将会加载同级目录下.Net4.0开发的ClassLibrary1.dll，类名为Class1，方法为TestMethod，传入的参数为argstring

ClassLibrary1.dll的代码如下：

```C#
using System;
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
            p.StartInfo.FileName = "c:\\windows\\system32\\calc.exe";
            p.Start();
            return 0;
        }
    }
}
```

### 2.3. execute-assembly实现方法

#### 1. 从内存中读取shellcode并加载.NET程序集

- 调用`ICLRMetaHost::EnumerateInstalledRuntimes`, `ICLRMetaHost::GetRuntime`或者`ICLRMetaHostPolicy::GetRequestedRuntime`方法以获取有效的`ICLRRuntimeInfo`指针
- 使用`ICorRuntimeHost`接口
- 使用`Load_3(…)`从内存中读取并加载.NET程序集
- 调用静态方法

#### 2. 从硬盘读取并加载.NET程序集

- 调用`ICLRMetaHost::EnumerateInstalledRuntimes`,` ICLRMetaHost::GetRuntime`或者`ICLRMetaHostPolicy::GetRequestedRuntime`方法以获取有效的`ICLRRuntimeInfo`指针
- 使用`ICorRuntimeHost`(使用`Load_2(…)`)或者I`CLRRuntimeHost`接口
- 加载.NET程序集并调用静态方法

第一种利用思路要优于第二种，完整的利用过程如下：

1. 创建一个正常的进程
2. 通过Dll反射向进程注入dll
3. dll实现从内存中读取shellcode并加载最终的.NET程序集

优点如下：

- 整个过程在内存执行，不写入文件系统
- Payload以dll形式存在，不会产生可疑的进程
- 最终的Payload为C#程序，现有的Powershell利用脚本转换为C#代码很方便



## 3. 通过.NET实现内存加载PE文件