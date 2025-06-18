import {type ConfigEnv, defineConfig, loadEnv} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import uni from '@dcloudio/vite-plugin-uni'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UnoCSS from 'unocss/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import AutoImport from 'unplugin-auto-import/vite'

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
              dts: 'src/types/pages/uni-pages.d.ts',
            }),
            UniManifest(),
            Components({
              dts: 'src/types/components/components.d.ts',
                resolvers: [
                    // 内置的wot-design-uni组件解析器
                    (name) => {
                        // wot-design-uni组件前缀为wd
                        if (name.match(/^wd[A-Z]/)) {
                            const compName = name.slice(2)
                            return {
                                name: compName,
                                from: 'wot-design-uni'
                            }
                        }
                        // z-paging组件解析
                        if (name === 'zPaging') {
                            return {
                                name: 'z-paging',
                                from: 'z-paging'
                            }
                        }
                    }
                ]
            }),
            AutoImport({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/, /\.vue\?vue/, // .vue
                ],
                imports: ['vue', 'uni-app'],
              dts: 'src/types/imports/auto-imports.d.ts',
            }),
            UnoCSS(),
            // @ts-expect-error missing types
            uni.default(),
        ],
    }
})
