---
article: false
tags:
  - 持久化
---
# 2. Windows权限维持

### 权限维持--sc create 服务

有些程序由于代码格式的原因，无法注册为服务，在某些版本的windows上（win10试过不可以）可以尝试一下

```shell
sc Create 服务名称 binPath= "cmd /c start 路径" type= own type= interact start= auto
sc Create 服务名称 binPath= "Rundll32.exe DLL路径 执行函数 参数" type= own type= interact start= auto
```



### 后台运行 waitfor 命令

waitfor 命令是 Windows 系统中的一个命令行工具，用于等待指定的时间或等待特定事件发生。然而，`waitfor` 命令本身并不支持后台运行，它会阻塞当前命令行窗口，直到满足指定的条件。
使用启动器（Wrapper）脚本：
创建一个批处理脚本（例如 `waitfor_background.bat`），在其中调用 `waitfor` 命令，然后使用 `start` 命令来在后台运行该脚本。示例：

```bat
@echo off
start "" cmd /c waitfor 某个条件

```

这将在新窗口中启动命令行并在后台运行 `waitfor` 命令。
