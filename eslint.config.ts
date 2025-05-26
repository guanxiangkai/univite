/**
 * ESLint 配置文件
 *
 * 使用扁平配置格式（Flat Config）进行 ESLint 配置
 * 针对 Vue 3 + TypeScript 项目的推荐配置
 *
 * 文档参考:
 * - ESLint 扁平配置: https://eslint.org/docs/latest/use/configure/configuration-files-new
 * - Vue ESLint 配置: https://eslint.vuejs.org/user-guide/
 */

// 全局忽略配置，用于指定哪些文件应被 ESLint 忽略
import {globalIgnores} from 'eslint/config'
// Vue + TypeScript 的 ESLint 配置工具和预设
import {defineConfigWithVueTs, vueTsConfigs} from '@vue/eslint-config-typescript'
// Vue 特定的 ESLint 规则插件
import pluginVue from 'eslint-plugin-vue'
// Oxlint 规则插件，提供高性能的代码检查
import pluginOxlint from 'eslint-plugin-oxlint'
// 与 Prettier 集成的配置，防止 ESLint 和 Prettier 规则冲突
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

/**
 * 如需在 `.vue` 文件中支持 `ts` 以外的其他语言，取消注释以下代码:
 *
 * import { configureVueProject } from '@vue/eslint-config-typescript'
 * configureVueProject({ scriptLangs: ['ts', 'tsx'] })
 *
 * 更多信息请参考: https://github.com/vuejs/eslint-config-typescript/#advanced-setup
 */

export default defineConfigWithVueTs(
  // 定义要检查的文件
  {
    name: 'app/files-to-lint', // 配置名称
    files: ['**/*.{ts,mts,tsx,vue}'], // 检查所有 TypeScript 和 Vue 文件
  },

  // 定义全局忽略的文件和目录
  globalIgnores([
    '**/dist/**',     // 构建输出目录
    '**/dist-ssr/**', // SSR 构建输出目录
    '**/coverage/**'  // 测试覆盖率报告目录
  ]),

  // Vue 核心规则集 - 仅包含必要的规则
  pluginVue.configs['flat/essential'],

  // TypeScript 推荐规则集
  vueTsConfigs.recommended,

  // Oxlint 推荐规则集，使用展开运算符应用所有规则
  ...pluginOxlint.configs['flat/recommended'],

  // 跳过与 Prettier 冲突的格式化规则，让 Prettier 处理代码格式
  skipFormatting,
)
