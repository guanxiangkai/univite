import {defineManifestConfig} from '@uni-helper/vite-plugin-uni-manifest';
import path from 'node:path';
import {loadEnv} from 'vite';
import {description, name, version} from './package.json';

// 加载环境变量，考虑默认值兜底
const {VITE_UNI_APPID='',VITE_WX_APPID = '',VITE_FALLBACK_LOCALE='zh-Hans'} = loadEnv(
  process.env.NODE_ENV || 'development',
  path.resolve(process.cwd(), 'env'),
);

export default defineManifestConfig({
  // 基础元数据
  name,
  description,
  appid: VITE_UNI_APPID,
  versionName: version,
  versionCode: version.replace(/\D/g, ''),
  transformPx: false,
  locale: VITE_FALLBACK_LOCALE,
  // 微信小程序专属配置
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: VITE_WX_APPID,
    setting: {
      urlCheck: false,
      // 是否启用 ES6 转 ES5
      es6: true,
      minified: true,
    },
    usingComponents: true,
  },
});
