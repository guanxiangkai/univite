import {type ConfigEnv, defineConfig, loadEnv} from 'vite'
import {fileURLToPath, URL} from 'node:url'
import uni from '@dcloudio/vite-plugin-uni'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({mode}: ConfigEnv) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())}
    console.log(`当前编译环境: ${process.env.NODE_ENV}`)

    return {
    plugins: [
        UniPages({
            // 排除组件文件
            exclude: ['**/components/**/**.*'],
            // 'json5' | 'json' | 'yaml' | 'yml', 具体使用参看文档：https://uni-helper.js.org/vite-plugin-uni-pages
            routeBlockLang: 'json5',
            dts: 'src/types/uni-pages.d.ts',
        }),
        UniManifest(),
        // @ts-expect-error missing types
        uni.default(),
        // Vue 开发者工具插件，提供更好的调试体验
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },

    }
})
