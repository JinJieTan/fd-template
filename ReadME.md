#### 云空间前端通用脚手架 - 2020 年 2 月 11 日第一个版本发布

#### 项目启动流程

-   开发模式

```
yarn

yarn  dev //开发模式自带打包依赖可视化分析

yarn  test //启动jest测试,根据你编写的测试代码去测试

yarn  test -c //生成单元测试报告
```

-   打包代码

```

npm run build

```

### 脚手架集成

-   Ant-Desgin 按需加载

-   TypeScript 混合 JavaScript 开发

-   Jest 单元测试，UI 快照

-   集成 dva,dva-hmr 热更新

-   部分 webpack5 插件

#### 项目结构

-   config --webpack 配置文件
    -   proxy_config 开发模式接口调用的代理配置
-   dist 打包输出后的代码

-   src 源码文件

    -   assets 项目全局资源文件
    -   components 复用公共组件
    -   pages 页面文件
    -   utills 工具类、API 函数
    -   index.tsx 入口文件
    -   index.html 入口模板
    -   app.tsx 根组件

-   .gitignore git 忽略配置文件

-   .prettierrc 代码格式化统一配置文件

-   tsconfig.json ts 配置文件

#### 项目采用 typescript 编写

> 请你注意以下几点：

-   减少 any 的使用
-   接口和类型定义尽量在组件内、每个组件对应一个 less 文件、方便管理、后期维护
-   请在定义接口、类型时，附上相应注释
-   组件文件以 tsx 结尾，工具类文件以 ts 结尾
-   保证错误被捕获，频繁调用函数请封装 promise 风格，保证项目健壮性

#### 测试用例，单元测试

> 本项目采用 TypeScript+jest 双重校验

-   在 build 打包代码前，必须经过 jest 的测试才能打包
-   频繁调用、公共函数、重要的底层组件方法，需要经过单元测试,保证一致性
-   UI 快照，可以适时引入

#### 项目打包依赖可视化

> 在项目开发模式热更新情况下，会有打包依赖可视化自动打开,这时候可以分析项目依赖
