# task-manage-erp

## 概述

任务电商是一款任务类型的app，基于lerna作为[monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)的包管理工具，统一规定了目录结构、开发规范等范式。

### 开发环境
+ vscode 插件
    + Auto Close Tag
    + ESLint
    + GitLens
    + npm
    + npm lntllisense
    + path lntllisense
    + Sass
    + vetur
    + Beautify
+ Git
+ NodeJS

---

## 快速开始

1. 安装环境依赖
    + `npm` 安装

    ```shell
    $> npm install

    $> npm run init
    ```

3. 启动项目

    ```shell
    $> npm run start
    ```

---

## 脚本说明

+ `npm run start` 启动
+ `npm run build` 编译
+ `npm run up-pc` 上传代码（提审）
+ `npm run up-app` 上传代码（提审）
+ `npm run up-service` 上传代码（提审）

---

## 开发规范

+ 遵守ESLint开发规范
+ 遵守前端开发规范
+ 遵守`git commit`规范
+ 遵守`checklist`规范
+ 一起共同维护此项目
+ 公共模块:（分包和主包同时需要）放`src/components`目录
+ 分包模块:（分包内使用）放`src/subPackages/**/pages/components`目录
+ 第三方模块放在`src/vendor`目录

---

## ESLint规范

+ airbnb 规范
+ vue 官方规范
+ eslint-config-egg 规范

---

## git提交规范

feat: 新功能（feature）

fix: 修补bug

docs: 文档（documentation）

style: 格式（不影响代码运行的变动）

refactor: 重构（即不是新增功能，也不是修改bug的代码变动）

test: 增加测试

revert: 回滚

config: 构建过程或辅助工具的变动

chore: 其他改动

项目内置两种提交方式，前提必须保证规范一致

+ 使用 `git cz` 或者 `npm run commit`（推荐）

``` bash
npm run commit
```

+ 使用 `sourcetree` 或者 `github desktop`

---

## checklist 检查清单

+ 语法规范 `npm run lintfix`
+ commit规范
+ docs规范

---

## 参考文档

+ [vue 开发文档](https://cn.vuejs.org/index.html)
+ [vuex 开发文档](https://vuex.vuejs.org/zh/)
+ [flutter 开发文档](https://flutter.dev/)
+ [sass 使用文档](https://sass.bootcss.com/documentation)
+ [微信小程序 开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
+ [chai 开发文档](https://www.chaijs.com/)
+ [mocha 开发文档](https://mochajs.cn/)
+ [lerna 使用文档](https://github.com/lerna/lerna)
+ [egg 使用文档](https://eggjs.org/zh-cn/intro/quickstart.html/)

## 常见问题

[链接地址](docs/issues.md)
