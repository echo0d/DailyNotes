# Vue3

## 1. 简介&环境配置

特点和优势
- **响应式数据绑定**：Vue.js 提供强大的响应式数据绑定系统，确保数据的变化能够自动反映到视图层，减少了开发者手动操作 DOM 的需要。
- **组件化**：Vue.js 提倡将应用分解为小的、可复用的组件，增强了代码的组织性、可维护性和重用性。
- **灵活性和渐进性**：Vue.js 是一个渐进式框架，可以按需引入其特性（如 Vue Router 和 Vuex），适应不同规模的项目。
- .... 后面不想抄了

使用之间要安装nodejs、npm

## 创建项目
- `npm create` ：用于执行项目模板的命令，它会创建一个新的项目，并从给定的模板中初始化。
- `vite@latest` ：vite 是创建 Vue 3 项目的工具，`@latest` 是指定使用最新版的 Vite，确保你创建的项目是基于最新版本的 Vite。如果没有 `@latest`，`npm` 会尝试使用当前安装的版本。
- `<project-name>`：新创建项目的文件夹名称。命令会创建一个文件夹，并将模板代码放入其中。例如，运行 `npm create vite@latest my-vue-app --template vue` 会在当前目录下创建一个名为 `my-vue-app` 的文件夹，并将 Vue 项目的模板文件放入其中。
- `--template vue`：`--template vue` 指定了要使用的模板类型。Vite 支持多种模板，`vue` 是专门为 Vue 3 提供的模板。还有其他模板，如 `vanilla`、`react`、`svelte` 等。

### npm create

```shell
# 最新稳定版
$ npm init vue@latest
```
这一指令将会安装并执行 create-vue，它是 Vue 官方的项目脚手架工具。
```shell
$ npm init vue@latest
Need to install the following packages:
  create-vue@3.6.1
Ok to proceed? (y) y

Vue.js - The Progressive JavaScript Framework

# 这里需要进行一些配置，项目名输入 vue3-test，其他默认回车即可
-> Project name: … vue3-test
-> Add TypeScript? … No / Yes
-> Add JSX Support? … No / Yes
-> Add Vue Router for Single Page Application development? … No / Yes
-> Add Pinia for state management? … No / Yes
-> Add Vitest for Unit Testing? … No / Yes
-> Add an End-to-End Testing Solution? › No
-> Add ESLint for code quality? … No / Yes

Scaffolding project in vue3-test...

Done. Now run:

  cd runoob-vue3-test
  npm install
  npm run dev

```

### vite
`vite`创建vue项目时：
```shell
npm create vite@latest scan-pro -- --template vue
Need to install the following packages:
Need to install the following packages:
  create-vite@6.1.1
  # 这里按照提示选择javascript或typescript
√ Select a variant: » JavaScript

Scaffolding project in E:\scan-pro...

Done. Now run:

  cd scan-pro
  npm install
  npm run dev
```
### vue ui
> 下面是抄的菜鸟教程

除了使用 vue create 命令创建项目，我们还可以使用可视化创建工具来创建项目。

运行命令：
```shell
$ vue ui
->  Starting GUI...
->  Ready on http://localhost:8000
...

```

执行以上命令，会在浏览器弹出一个项目管理的界面：

![](https://www.runoob.com/wp-content/uploads/2021/12/6C6FBF13-54BF-4DBC-8019-6442A51C03F3.jpg)

我们可以点击**创建**选项来创建一个项目，选择底部"在此创建项目"，页面上方也可以选择路径：

![](https://www.runoob.com/wp-content/uploads/2021/12/E13FFC51-7F39-4510-83DC-948772041083.jpeg)

然后输入我们的项目名称，选择包管理工具为 npm，然后点击下一步：

![](https://www.runoob.com/wp-content/uploads/2021/12/33B0E553-7AD4-4A5A-AF5C-20305C0F5793.jpeg)

配置选择默认即可:

![](https://www.runoob.com/wp-content/uploads/2021/12/69A83D7A-C7FB-478B-8DA0-40BF673F160F.jpeg)

接下来就等待完成安装，安装完成管理界面如下：

![](https://www.runoob.com/wp-content/uploads/2021/12/4AE552A2-2AE4-4B23-AECA-90CE7D29C047-scaled.jpeg)
