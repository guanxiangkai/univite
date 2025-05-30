/**
 * ESLint 配置文件
 *
 * 使用 ESLint 扁平配置格式，为 Vue 3 + TypeScript 项目提供代码检查规则
 * 包含针对不同文件类型的专用规则配置
 */

// 导入 TypeScript 解析器
import typescriptParser from '@typescript-eslint/parser';
// 导入 TypeScript ESLint 插件
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
// 导入 Vue ESLint 插件
import vuePlugin from 'eslint-plugin-vue';
// 导入 Oxlint 插件（高性能代码检查）
import oxlint from 'eslint-plugin-oxlint';
// 导入 ESLint 配置工具函数
import {defineConfig} from 'eslint';
// 全局忽略配置，用于指定哪些文件应被 ESLint 忽略
import {globalIgnores} from 'eslint/config';
// 与 Prettier 集成的配置，防止 ESLint 和 Prettier 规则冲突
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

/**
 * ESLint 扁平配置
 * 将不同文件类型的规则分别配置，提供更精细的代码检查控制
 */
export default defineConfig([
  // 全局忽略的文件和目录
  globalIgnores([
    '**/dist/**',     // 构建输出目录
    '**/dist-ssr/**', // SSR 构建输出目录
    '**/coverage/**', // 测试覆盖率报告目录
    '**/node_modules/**', // 依赖包目录
  ]),

  /**
   * Vue 单文件组件配置
   * 提供针对 .vue 文件的专用规则
   */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vuePlugin.parser,
      parserOptions: {
        parser: typescriptParser,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      // 组件名应使用多个单词（警告级别）
      'vue/multi-word-component-names': 'warn',
      // 强制使用 script setup 风格的组件 API
      'vue/component-api-style': ['error', ['script-setup']],
      // script 标签必须使用 TypeScript
      'vue/block-lang': ['error', {script: {lang: 'ts'}}],
      // 模板中组件名使用 PascalCase 命名法
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      // 事件名称使用连字符形式（如 click-item 而非 clickItem）
      'vue/v-on-event-hyphenation': ['error', 'always'],
    },
  },

  /**
   * TypeScript 文件配置
   * 为 .ts 和 .tsx 文件提供类型检查规则
   */
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      // 禁止使用 any 类型，尝试修复为 unknown 类型
      '@typescript-eslint/no-explicit-any': ['error', {
        fixToUnknown: true,
      }],
      // 函数应显式声明返回类型（警告级别）
      '@typescript-eslint/explicit-function-return-type': 'warn',
      // 禁止存在未使用的变量
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },

  /**
   * 类型声明文件特殊配置
   * 为 .d.ts 文件提供特殊规则，允许更灵活的类型定义
   */
  {
    files: ['**/*.d.ts'],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      // 在类型声明文件中允许使用 any 类型
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  /**
   * 全局通用配置
   * 适用于所有 JavaScript、TypeScript 和 Vue 文件的基础规则
   */
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    plugins: {
      oxlint,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // 在生产环境中禁用 console 语句（开发环境允许）
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // 在生产环境中禁用 debugger 语句（开发环境允许）
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },

  // 跳过与 Prettier 冲突的格式化规则
  skipFormatting,
]);
