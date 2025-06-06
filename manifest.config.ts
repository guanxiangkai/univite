import {defineManifestConfig} from '@uni-helper/vite-plugin-uni-manifest';
import path from 'node:path';
import {loadEnv} from 'vite';
import {description, name, version} from './package.json';

// 加载环境变量，考虑默认值兜底
const {VITE_WX_APPID = '', VITE_FALLBACK_LOCALE = 'zh-CN'} = loadEnv(
  process.env.NODE_ENV || 'development',
  path.resolve(process.cwd(), 'env'),
);

export default defineManifestConfig({
  // 基础元数据
  name,
  description,
  appid: VITE_WX_APPID,
  versionName: version,
  versionCode: version.replace(/\D/g, ''),
  locale: VITE_FALLBACK_LOCALE,
  vueVersion: '3',

  // 微信小程序专属配置
  'mp-weixin': {
    appid: VITE_WX_APPID,
    usingComponents: true,
    setting: {
      urlCheck: false, // 关闭 URL 检查，避免不必要的警告
      es6: true,       // 启用 ES6 支持
      postcss: true,   // 支持 PostCSS
      minified: true,  // 代码压缩，提升加载速度
    },
  },
});
