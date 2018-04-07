# react-component

React SPA 解决方案

### 前言

主要对通用的模块做了集成的工作，构建工具基于creat-react-app

### 主要模块

- react
- antd
- axios
- react-router
- redux

### 代码目录

```
+-- build                            ---打包的文件目录
+-- config                           ---npm run eject 后的配置文件目录
+-- node_modules                     ---npm下载文件目录
+-- public                                 
|   --- index.html					 ---首页入口html文件
+-- src                              ---核心代码目录
|   +-- assets                       ---本地资源
|   |    |    --- ...   
|   |    --- css                     ---css
|   |    --- js                      ---js
|   |    --- fonts                   ---字体库
|   |    --- less                    ---less文件
|   |    --- img                     ---部分本地图片
|   |    --- lib                     ---本地第三方库
|   +-- axios                        ---http请求存放目录
|   |    --- index.js
|   +-- components                   ---组件目录
|   --- App.js                       ---组件入口文件
|   --- index.js                     ---项目的整体js入口文件，包括路由配置等
--- .env                             ---启动项目自定义端口配置文件
--- .eslintrc                        ---自定义eslint配置文件，包括增加的react jsx语法限制
--- package.json                     ---包括了部分配置，如proxy，请自行阅读               
```

### 安装步骤
```
npm ii
```
或者
```
# 设置npm镜像地址
npm config set registry https://registry.npm.taobao.org
npm i
```

### 本地开发

`npm run start` 

### 构建生产

`npm run build`

### 浏览器支持

现代浏览器及IE10+