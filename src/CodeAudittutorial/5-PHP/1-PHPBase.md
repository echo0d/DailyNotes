---
category: 代码审计
tags:
  - PHP
---
# PHP基础

## 1 框架

### 1.1 ThinkPHP

MVC设计模式，也支持各种现代化的Web开发技术和规范，如RESTful API、Composer等

基本代码结构通常如下：

1. app/ 应用目录  
     - controller/ 控制器，处理请求和业务逻辑  
     - model/ 模型，负责数据操作（有时在 common/model/）  
     - service/ 服务层，封装复杂业务逻辑  
     - middleware/ 中间件，处理请求前后的通用逻辑  
     - validate/ 验证器，数据校验  
     - event/ 事件定义与监听  
     - lang/ 语言包
    
2. config/ 配置文件目录  
     - 各类全局和模块配置（如数据库、缓存、路由等）
    
3. public/ 入口目录  
     - index.php 应用入口  
     - 静态资源、路由文件等
    
4. route/ 路由定义目录  
     - 自定义路由规则
    
5. runtime/ 运行时目录  
     - 缓存、日志、临时文件
    
6. extend/ 扩展类库目录  
     - 第三方 SDK、自定义扩展
    
7. composer.json
     - Composer 依赖管理文件

创建新项目
```
composer create-project topthink/think my-thinkphp-app
composer update
```
开启调试模式
```
重命名项目默认创建的 `.example.env` 文件为 `.env`
.env 文件内容：

APP_DEBUG = true
```