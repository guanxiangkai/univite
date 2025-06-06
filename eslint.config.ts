import {globalIgnores} from 'eslint/config'
import {defineConfigWithVueTs, vueTsConfigs} from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// 若需在 .vue 文件中允许更多脚本语言，可以取消注释以下内容：
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// 更多配置参考：https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
    },

    // 全局忽略无需校验的文件和目录（如构建产物、测试结果与三方库目录等）
    globalIgnores([
        '**/dist/**',
        '**/dist-ssr/**',
        '**/coverage/**',
        '**/node_modules/**',
        '**/logs/**',
        '**/.cache/**',
        '**/.nuxt/**',
        '**/.output/**',
        '**/.temp/**',
        '**/temp/**',
        '**/tmp/**',
        '**/public/**',
        '**/static/**',
        '**/out/**',
        '**/build/**',
        '**/generated/**',
        '**/*.d.ts',
    ]),

    // Vue 基础配置
    pluginVue.configs['flat/essential'],

    // 推荐的基于TypeScript的Vue编码风格指南
    vueTsConfigs.recommended,

    // Oxlint 推荐规则
    ...pluginOxlint.configs['flat/recommended'],

    // 跳过 Prettier 已处理的格式化规则，避免冲突
    skipFormatting,
)
