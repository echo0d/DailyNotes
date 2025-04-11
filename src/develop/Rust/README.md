---
category: Rust
tags:
  - Rust
article: false
---

# Rust

## 安装

> https://blog.csdn.net/qq_41879343/article/details/104802548

官方安装教程：https://doc.rust-lang.org/nightly/book/ch01-01-installation.html 需要有代理

国内安装：

```shell
# 第一步：加入中国科技大学网络镜像代理
# 注意以上命令，仅仅在本次终端生效，切换终端，仍然需要再次执行一次
export RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
export RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup

# 第二步：执行脚本命令，完成rust安装
curl https://sh.rustup.rs -sSf | sh
# 在安装的时候，会让你选择安装路径，我们输入 1 （默认安装）回车
# 安装成功之后，会提示：Rust is installed now. Great!

# 第三步：执行重新加载环境变量，使rustup命令生效
source $HOME/.cargo/env
rustc -V 或 rustup -v 
# 有提示相关说明，则生效

# 第四步：配置包管理镜像代理。
# 在$HOME/.cargo目录下创建一个名为config的文本文件，其内容为：
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"

# 第五步：安装RSL，RLS（Rust Language Server）是官方提供的一个标准化的编辑器增强工具
rustup self update #更新rustup到最新
rustup component add rls rust-analysis rust-src

# 第六步：安装编译GCC工具链
sudo apt-get install build-essential


```

编译遇到如下问题：

```
error[E0554]: `#![feature]` may not be used on the stable release channel
```

解决方案https://blog.51cto.com/u_15127689/4298646