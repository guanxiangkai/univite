# UniVite - Vue3 小程序模板

> 基于 Vue3 + TypeScript + Vite + UnoCSS 的小程序开发模板，集成了常用的组件和工具，提供开箱即用的开发体验。

## 技术栈

- **框架**: Vue 3.5.16
- **构建工具**: Vite 6.3.5
- **语言**: TypeScript 5.8.3
- **CSS 框架**: UnoCSS 66.1.3
- **状态管理**: Pinia 3.0.2 + pinia-plugin-persistedstate-2
- **UI 组件库**: wot-design-uni 1.9.1
- **分页组件**: z-paging 2.8.7
- **路由管理**: uni-mini-router 0.1.6
- **代码规范**: ESLint + Prettier + Oxlint

## 项目特性

- 🚀 **快速开发**: 基于 Vite 的开发服务器，提供极速的热更新
- 🔄 **自动引入**: 组件和 API 的自动按需引入
- 📊 **主题定制**: 支持深色模式切换
- 🧩 **原子化 CSS**: 使用 UnoCSS 提高开发效率
- 📱 **响应式设计**: 适配各种屏幕尺寸
- 🔒 **类型安全**: 完整的 TypeScript 支持
- 📝 **代码规范**: 内置 ESLint、Prettier 和 Oxlint 配置
- 📋 **列表优化**: 集成 z-paging 高性能列表组件

## 目录结构

```
├── env                # 环境变量配置
├── public             # 静态资源
├── src                # 源代码
│   ├── components     # 公共组件
│   ├── pages          # 页面
│   ├── router         # 路由配置
│   ├── stores         # 状态管理
│   ├── styles         # 全局样式
│   ├── types          # 类型定义
│   ├── utils          # 工具函数
│   ├── App.vue        # 入口组件
│   └── main.ts        # 入口文件
├── .eslintrc.cjs      # ESLint 配置
├── .prettierrc        # Prettier 配置
├── tsconfig.json      # TypeScript 配置
├── unocss.config.ts   # UnoCSS 配置
└── vite.config.ts     # Vite 配置
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 打包构建

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

### 代码格式化

```bash
pnpm format
```

## 主要功能

### 组件自动引入

项目配置了组件自动引入，无需手动 import 即可使用 wot-design-uni 和 z-paging 组件。

### UnoCSS

项目集成了 UnoCSS，提供了丰富的原子化 CSS 类，可以直接在模板中使用：

```html

<view class="flex-center p-4 text-primary bg-white rounded shadow-sm">
    原子化 CSS 演示
</view>
```

### 主题切换

支持浅色/深色主题切换，使用 `toggleDarkMode` 方法切换：

```ts
import {toggleDarkMode} from '@/utils/theme';

// 切换主题
toggleDarkMode();
```

### z-paging 分页列表

项目集成了 z-paging 分页组件，提供了多种列表场景的解决方案：

- 基础列表
- 虚拟列表
- 骨架屏
- 自定义样式
- API 集成

详细用法可查看 `src/pages/z-paging-demo` 目录下的示例。

## 环境配置

项目支持多环境配置，在 `env` 目录下创建不同的环境配置文件：

- `.env` - 所有环境的默认配置
- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

## 小程序配置

在 `src/manifest.json` 文件中配置小程序的基本信息，包括 AppID、版本号等。

## 最佳实践

1. 使用 TypeScript 编写类型安全的代码
2. 优先使用组件库提供的组件
3. 使用 Pinia 进行状态管理
4. 利用 UnoCSS 提高样式开发效率
5. 大型列表使用 z-paging 的虚拟列表功能
6. 遵循项目的代码规范

## 许可证

[MIT](LICENSE)
