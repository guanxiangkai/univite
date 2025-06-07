import {type ConfigEnv, defineConfig, loadEnv} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import uni from '@dcloudio/vite-plugin-uni'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'

export default defineConfig(({mode}: ConfigEnv) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())}
    console.log(`当前编译环境: ${process.env.NODE_ENV}`)

    return {
        publicDir: './public',
        envDir: './env', // 自定义env目录
        plugins: [
            tsconfigPaths(),
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
        ],

    }
})
