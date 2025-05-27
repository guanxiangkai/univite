import { fileURLToPath, URL } from 'node:url';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

/**
 * Vite 配置文件
 * @see https://cn.vite.dev/config/
 */
export default defineConfig(({ command, mode }: ConfigEnv) => {
  // 根据 env 目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const env = loadEnv(mode, fileURLToPath(new URL('./env', import.meta.url)), 'VITE_');
  console.log('当前环境:', env.VITE_ENV);
  console.log('当前环境变量:', env);

  return {
    // 指定环境变量文件目录
    envDir: fileURLToPath(new URL('env', import.meta.url)),
    // 定义基础公共路径
    base: env.VITE_BASE_URL,

    // 插件配置
    plugins: [
      // Vue 插件，用于处理 .vue 文件
      vue(),
      // Vue 开发者工具插件，提供更好的调试体验
      vueDevTools(),
    ],

    // 解析配置
    resolve: {
      // 路径别名配置
      alias: {
        // 基础别名
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    // 服务器配置
    server: {
      // 启动端口
      port: Number(env.VITE_PORT), // 当前环境的启动端口
      // 是否自动打开浏览器
      open: env.VITE_OPEN === 'true', // 是否在启动时自动打开浏览器
      // 代理配置（可根据需要启用）
      proxy: {
        // 使用环境变量中的API前缀和目标服务器
        [env.VITE_API_PREFIX]: {
          target: env.VITE_API_TARGET, // API请求的目标地址
          changeOrigin: true, // 修改请求的源地址
          rewrite: (path) => path.replace(new RegExp(env.VITE_API_PREFIX), ''), // 重写路径
        },
      }
    },

    // CSS 预处理器配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@styles/variables.scss";', // 引入全局SCSS变量
        },
      },
    },
  };
});
