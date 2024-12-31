# 前端模块化

## 1. 模块化的理解

### 1.1. 什么是模块化

* 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
* 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信
* 模块化开发的好处
  * 避免命名冲突
  * 更好地分离, 降低了耦合
  * 提高代码的复用性
  * 提高代码的可维护性

### 1.2. 模块化的演进

* 全局函数模式
  
  * 将不同的功能封装成不同的全局函数
  * 问题: 污染全局命名空间, 容易引起命名冲突，而且模块成员之间看不出直接关系

```js
function m1() {
  //...
}

function m2() {
  //...
}
```

* namespace模式
  
  * 将不同的功能封装不同的对象中
  * 作用：减少了全局变量，解决命名冲突
  * 问题: 数据不安全(外部可以直接修改模块内部的数据)

```js
let myModule = {
  data: 'www.baidu.com',
  foo() {
    console.log(`foo() ${this.data}`)
  },
  bar() {
    console.log(`bar() ${this.data}`)
  }
}
myModule.data = 'other data' //能直接修改模块内部的数据
myModule.foo() // foo() other data
```

* IIFE模式
  
  * 使用立即执行函数表达式(IIFE)创建一个独立作用域
  * IIFE中封装不同的模块功能
  * 问题: 模块成员之间看不出直接关系

```html
// index.html文件
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
    myModule.foo()
    myModule.bar()
    console.log(myModule.data) //undefined 不能访问模块内部数据
    myModule.data = 'xxxx' //不是修改的模块内部的data
    myModule.foo() //没有改变
</script>
```

```js
// module.js
(function (window) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露函数
    console.log(`foo() ${data}`)
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露模块
  window.myModule = { foo, bar }
})(window)
```

* IIFE模式增强

这就是现代模块实现的基石

```js
// module.js文件
(function(window, $) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
    $('body').css('background', 'red')
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar }
})(window, jQuery)
```

```html
 // index.html文件
  <!-- 引入的js必须有一定顺序 -->
  <script type="text/javascript" src="jquery-1.10.1.js"></script>
  <script type="text/javascript" src="module.js"></script>
  <script type="text/javascript">
    myModule.foo()
  </script>
```

上例子通过jquery方法将页面的背景颜色改成红色，所以必须先引入jQuery库，就把这个库当作参数传入。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

### 1.3. 引入多个`<script>`后出现出现问题
* 请求过多

    首先我们要依赖多个模块，那样就会发送多个请求，导致请求过多

* 依赖模糊

    我们不知道他们的具体依赖关系是什么，也就是说很容易因为不了解他们之间的依赖关系导致加载先后顺序出错。

* 难以维护

    以上两种原因就导致了很难维护，很可能出现牵一发而动全身的情况导致项目出现严重的问题。
模块化固然有多个好处，然而一个页面需要引入多个js文件，就会出现以上这些问题。而这些问题可以通过模块化规范来解决，下面介绍开发中最流行的commonjs, AMD, ES6, CMD规范。

## 2. 模块化规范

### 2.1. CommonJS（CJS）
* **概述**

    Node 应用由模块组成，采用 CommonJS 模块规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。

* **特点**

  * 所有代码都运行在模块作用域，不会污染全局作用域。
  * 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
  * 模块加载的顺序，按照其在代码中出现的顺序。

* **基本语法**

  * 暴露模块：`module.exports = value` 或 `exports.xxx = value`
  * 引入模块：`require(xxx)`，如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径

CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

```js
// example.js
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
```

上面代码通过module.exports输出两个方法：x和addX。其他文件加载这个模块，就可以使用这两个方法。加载该模块的写法如下。

```js
var example = require('./example.js');
console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

require方法用于加载模块。

* **模块加载机制**

CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。这点与ES6模块化有重大差异（下文会介绍），请看下面这个例子：

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

上面代码输出内部变量counter和改写这个变量的内部方法incCounter。

```js
// main.js
var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;

console.log(counter);  // 3
incCounter();
console.log(counter); // 3
```

上面代码说明，counter输出以后，lib.js模块内部的变化就影响不到counter了。这是因为counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

#### `module.exports`和`exports`

我们在看 node 代码时，应该会发现，关于接口导出，有的地方使用`module.exports`，而有的地方使用`exports`，这两个有什么区别呢?

CommonJS 规范仅定义了`exports`，但`exports`存在一些问题（下面会说到），所以`module.exports`被创造了出来，它被称为 CommonJS2 。
每一个文件都是一个模块，每个模块都有一个`module`对象，这个`module`对象的`exports`属性用来导出接口，外部模块导入当前模块时，使用的也是`module`对象，这些都是 node 基于 CommonJS2 规范做的处理。

```javascript
// a.js
var s = 'i am ronffy'
module.exports = s;
console.log(module);
```

执行`node a.js`，看看打印的`module`对象：

```javascript
{
  exports: 'i am ronffy',
  id: '.',                                // 模块id
  filename: '/Users/apple/Desktop/a.js',  // 文件路径名称
  loaded: false,                          // 模块是否加载完成
  parent: null,                           // 父级模块
  children: [],                           // 子级模块
  paths: [ /* ... */ ],                   // 执行 node a.js 后 node 搜索模块的路径
}
```

其他模块导入该模块时：

```javascript
// b.js
var a = require('./a.js'); // a --> i am ronffy
```

当在 `a.js` 里这样写时：

```javascript
// a.js
var s = 'i am ronffy'
exports = s;
```

`a.js` 模块的`module.exports`是一个空对象。``````

```javascript
// b.js
var a = require('./a.js'); // a --> {}
```

把`module.exports`和`exports`放到“明面”上来写，可能就更清楚了：

```javascript
var module = {
  exports: {}
}
var exports = module.exports;
console.log(module.exports === exports); // true

var s = 'i am ronffy'
exports = s; // module.exports 不受影响
console.log(module.exports === exports); // false
```

模块初始化时，`exports`和`module.exports`指向同一块内存，`exports`被重新赋值后，就切断了跟原内存地址的关系。

所以，`exports`要这样使用：

```javascript
// a.js
exports.s = 'i am ronffy';

// b.js
var a = require('./a.js');
console.log(a.s); // i am ronffy
```

CommonJS 和 CommonJS2 经常被混淆概念，一般大家经常提到的 CommonJS 其实是指 CommonJS2，本文也是如此，不过不管怎样，大家知晓它们的区别和如何应用就好。


### 2.2. AMD/CMD
随着前端业务增重，代码越来越复杂，靠全局变量通信的方式开始捉襟见肘，前端急需一种更清晰、更简单的处理代码依赖的方式，将 JS 模块化的实现及规范陆续出现，其中被应用较广的模块规范有 AMD 和 CMD。

面对一种模块化方案，我们首先要了解的是：1. 如何导出接口；2. 如何导入接口。

#### AMD
异步模块定义规范（AMD）制定了定义模块的规则，这样模块和模块的依赖可以被异步加载。这和浏览器的异步加载模块的环境刚好适应（浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。
本规范只定义了一个函数define，它是全局变量。

```js
/**
 * @param {string} id 模块名称
 * @param {string[]} dependencies 模块所依赖模块的数组
 * @param {function} factory 模块初始化要执行的函数或对象
 * @return {any} 模块导出的接口
 */
function define(id?, dependencies?, factory): any
```

**RequireJS**

AMD 是一种异步模块规范，RequireJS 是 AMD 规范的实现。接下来，我们用 RequireJS 重构上面的项目。

在原项目 js 文件夹下增加 require.js 文件：

**项目目录:**

```
├─ js                # js文件夹
│  ├─ ...
│  └─ require.js     # RequireJS 的 JS 库
└─  ...
```

```js
// config.js
define(function() {
  var api = 'https://github.com';
  var config = {
    api: api,
  };
  return config;
});
```

```js
// utils.js
define(['./config'], function(config) {
  var utils = {
    request() {
      console.log(config.api);
    }
  };
  return utils;
});
```

```js
// main.js
require(['./utils'], function(utils) {
  utils.request();
});
```

```html
<!-- index.html  -->
<!-- ...省略其他 -->
<body>

  <script data-main="./js/main" src="./js/require.js"></script>
</body>
</html>
```

可以看到，使用 RequireJS 后，每个文件都可以作为一个模块来管理，通信方式也是以模块的形式，这样既可以清晰的管理模块依赖，又可以避免声明全局变量。

特别说明：

先有 RequireJS，后有 AMD 规范，随着 RequireJS 的推广和普及，AMD 规范才被创建出来。

#### CMD和AMD

CMD 和 AMD 一样，都是 JS 的模块化规范，也主要应用于浏览器端。AMD 是 RequireJS 在的推广和普及过程中被创造出来。CMD 是 SeaJS 在的推广和普及过程中被创造出来。

二者的的主要区别是 CMD 推崇依赖就近，AMD 推崇依赖前置：

```js
// AMD
// 依赖必须一开始就写好
define(['./utils'], function(utils) {
  utils.request();
});
```

```js
// CMD
define(function(require) {
  // 依赖可以就近书写
  var utils = require('./utils');
  utils.request();
});
```

AMD 也支持依赖就近，但 RequireJS 作者和官方文档都是优先推荐依赖前置写法。
考虑到目前主流项目中对 AMD 和 CMD 的使用越来越少，大家对 AMD 和 CMD 有大致的认识就好，此处不再过多赘述。

#### CommonJS与AMD

CommonJS 和 AMD 都是运行时加载，换言之：都是在运行时确定模块之间的依赖关系。

二者有何不同点：

1. CommonJS 是服务器端模块规范，AMD 是浏览器端模块规范。
2. CommonJS 加载模块是同步的，即执行`var a = require('./a.js');`时，在 a.js 文件加载完成后，才执行后面的代码。AMD 加载模块是异步的，所有依赖加载完成后以回调函数的形式执行代码。
3. 如下代码，`fs`和`chalk`都是模块，不同的是，`fs`是 node 内置模块，`chalk`是一个 npm 包。这两种情况在 CommonJS 中才有，AMD 不支持。

```javascript
var fs = require('fs');
var chalk = require('chalk');
```

### 2.3. ES6 module

AMD 、 CMD 等都是在原有JS语法的基础上二次封装的一些方法来解决模块化的方案，ES6 module（在很多地方被简写为 ESM）是语言层面的规范，ES6 module 旨在为浏览器和服务器提供通用的模块解决方案。长远来看，未来无论是基于 JS 的 WEB 端，还是基于 node 的服务器端或桌面应用，模块规范都会统一使用 ES6 module。

#### 兼容性

目前，无论是浏览器端还是 node ，都没有完全原生支持 ES6 module，如果使用 ES6 module ，可借助 [babel](https://link.segmentfault.com/?enc=eaZYMU7AZnrFASQuCCXHvw%3D%3D.x84T7b%2Fj6aCr1W1EestSDb5Y9EQGndvqWbhoIl8DADE%3D) 等编译器。本文只讨论 ES6 module 语法，故不对 babel 或 typescript 等可编译 ES6 的方式展开讨论。

#### 导出接口

CommonJS 中顶层作用域不是全局作用域，同样的，ES6 module 中，一个文件就是一个模块，文件的顶层作用域也不是全局作用域。导出接口使用`export`关键字，导入接口使用`import`关键字。

`export`导出接口有以下方式：

**方式1**

```javascript
export const prefix = 'https://github.com';
export const api = `${prefix}/ronffy`;
```

**方式2**

```javascript
const prefix = 'https://github.com';
const api = `${prefix}/ronffy`;
export {
  prefix,
  api,
}
```

方式1和方式2只是写法不同，结果是一样的，都是把`prefix`和`api`分别导出。

**方式3（默认导出）**

```javascript
// foo.js
export default function foo() {}

// 等同于：
function foo() {}
export {
  foo as default
}
```

`export default`用来导出模块默认的接口，它等同于导出一个名为`default`的接口。配合`export`使用的`as`关键字用来在导出接口时为接口重命名。

**方式4（先导入再导出简写）**

```javascript
export { api } from './config.js';

// 等同于：
import { api } from './config.js';
export {
  api
}
```

如果需要在一个模块中先导入一个接口，再导出，可以使用`export ... from 'module'`这样的简便写法。

#### 导入模块接口

ES6 module 使用`import`导入模块接口。

导出接口的模块代码1：

```javascript
// config.js
const prefix = 'https://github.com';
const api = `${prefix}/ronffy`;
export {
  prefix,
  api,
}
```

接口已经导出，如何导入呢：

**方式1**

```javascript
import { api } from './config.js';

// or
// 配合`import`使用的`as`关键字用来为导入的接口重命名。
import { api as myApi } from './config.js';
```

**方式2（整体导入）**

```javascript
import * as config from './config.js';
const api = config.api;
```

将 config.js 模块导出的所有接口都挂载在`config`对象上。

**方式3（默认导出的导入）**

```javascript
// foo.js
export const conut = 0;
export default function myFoo() {}
// index.js
// 默认导入的接口此处刻意命名为cusFoo，旨在说明该命名可完全自定义。
import cusFoo, { count } from './foo.js';

// 等同于：
import { default as cusFoo, count } from './foo.js';
```

`export default`导出的接口，可以使用`import name from 'module'`导入。这种方式，使导入默认接口很便捷。

**方式4（整体加载）**

```javascript
import './config.js';
```

这样会加载整个 `config.js` 模块，但未导入该模块的任何接口。

**方式5（动态加载模块）**

上面介绍了 ES6 module 各种导入接口的方式，但有一种场景未被涵盖：动态加载模块。比如用户点击某个按钮后才弹出弹窗，弹窗里功能涉及的模块的代码量比较重，所以这些相关模块如果在页面初始化时就加载，实在浪费资源，`import()`可以解决这个问题，从语言层面实现模块代码的按需加载。

ES6 module 在处理以上几种导入模块接口的方式时都是编译时处理，所以`import`和`export`命令只能用在模块的顶层，以下方式都会报错：

```javascript
// 报错
if (/* ... */) {
  import { api } from './config.js'; 
}

// 报错
function foo() {
  import { api } from './config.js'; 
}

// 报错
const modulePath = './utils' + '/api.js';
import modulePath;
```

使用`import()`实现按需加载：

```javascript
function foo() {
  import('./config.js')
    .then(({ api }) => {

    });
}

const modulePath = './utils' + '/api.js';
import(modulePath);
```

特别说明：
该功能的提议目前处于 TC39 流程的第4阶段。更多说明，请查看[TC39/proposal-dynamic-import](https://link.segmentfault.com/?enc=wGjhpbdtDzGcnObVZRlTOw%3D%3D.nyyE44PVOuqeGs%2FHlUso2cD0p4S867dRCs84HrmIfZ6uppGQqNvy%2FK%2Fq%2FahgI45T)。

#### CommonJS 和 ES6 module

CommonJS 和 AMD 是运行时加载，在运行时确定模块的依赖关系。 ES6 module 是在编译时（`import()`是运行时加载）处理模块依赖关系，。

**CommonJS**

CommonJS 在导入模块时，会加载该模块，所谓“CommonJS 是运行时加载”，正因代码在运行完成后生成`module.exports`的缘故。当然，CommonJS 对模块做了缓存处理，某个模块即使被多次多处导入，也只加载一次。

```
// o.js
let num = 0;
function getNum() {
  return num;
}
function setNum(n) {
  num = n;
}
console.log('o init');
module.exports = {
  num,
  getNum,
  setNum,
}
```



```
// a.js
const o = require('./o.js');
o.setNum(1);
```



```
// b.js
const o = require('./o.js');
// 注意：此处只是演示，项目里不要这样修改模块
o.num = 2;
```



```
// main.js
const o = require('./o.js');

require('./a.js');
console.log('a o.num:', o.num);

require('./b.js');
console.log('b o.num:', o.num);
console.log('b o.getNum:', o.getNum());
```

命令行执行`node main.js`，打印结果如下：

1. `o init`
   *模块即使被其他多个模块导入，也只会加载一次，并且在代码运行完成后将接口赋值到`module.exports`属性上。*
2. `a o.num: 0`
   *模块在加载完成后，模块内部的变量变化不会反应到模块的`module.exports`。*
3. `b o.num: 2`
   *对导入模块的直接修改会反应到该模块的`module.exports`。*
4. `b o.getNum: 1`
   *模块在加载完成后即形成一个闭包。*

**ES6 module**

```
// o.js
let num = 0;
function getNum() {
  return num;
}
function setNum(n) {
  num = n;
}
console.log('o init');
export {
  num,
  getNum,
  setNum,
}
```

```
// main.js
import { num, getNum, setNum } from './o.js';

console.log('o.num:', num);
setNum(1);

console.log('o.num:', num);
console.log('o.getNum:', getNum());
```

我们增加一个 index.js 用于在 node 端支持 ES6 module：

```
// index.js
require("@babel/register")({
  presets: ["@babel/preset-env"]
});

module.exports = require('./main.js')
```

命令行执行`npm install @babel/core @babel/register @babel/preset-env -D`安装 ES6 相关 npm 包。

命令行执行`node index.js`，打印结果如下：

1. `o init`
   *模块即使被其他多个模块导入，也只会加载一次。*
2. `o.num: 0`
3. `o.num: 1`
   *编译时确定模块依赖的 ES6 module，通过`import`导入的接口只是值的引用，所以`num`才会有两次不同打印结果。*
4. `o.getNum: 1`

对于打印结果3，知晓其结果，在项目中注意这一点就好。这块会涉及到“Module Records（模块记录）”、“module instance（模快实例）” “linking（链接）”等诸多概念和原理，大家可查看[ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)进行深入的研究，本文不再展开。

ES6 module 是编译时加载（或叫做“静态加载”），利用这一点，可以对代码做很多之前无法完成的优化：

1. 在开发阶段就可以做导入和导出模块相关的代码检查。
2. 结合 Webpack、Babel 等工具可以在打包阶段移除上下文中未引用的代码（dead-code），这种技术被称作“tree shaking”，可以极大的减小代码体积、缩短程序运行时间、提升程序性能。
