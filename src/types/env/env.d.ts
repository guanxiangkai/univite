/// <reference types="vite/client" />

interface ImportMetaEnv {
  // ===== 微信小程序相关配置 =====
  readonly VITE_WX_APPID: string;

  // ===== 国际化配置 =====
  readonly VITE_FALLBACK_LOCALE: string;

  // ===== 请求相关配置 =====
  readonly VITE_TOKEN_KEY: string;
  readonly VITE_SHOW_LOADING: string;
  readonly VITE_REQUEST_TIMEOUT: string;
  readonly VITE_CONTENT_TYPE: string;
  readonly VITE_API_LOG: string;
  readonly VITE_API_BASEURL: string;
  readonly VITE_UPLOAD_BASEURL: string;

  // ===== 主题配置 =====
  readonly VITE_DEFAULT_THEME: string;

  // ===== 调试工具配置 =====
  readonly VITE_DELETE_CONSOLE: string;
  readonly VITE_SHOW_SOURCEMAP: string;

  // ===== Mock数据配置 =====
  readonly VITE_USE_MOCK: string;

  // ===== 性能监控配置 =====
  readonly VITE_PERFORMANCE_MONITOR: string;

  // ===== 开发辅助工具 =====
  readonly VITE_DEV_TOOLS: string;
  readonly VITE_ERROR_OVERLAY: string;

  // ===== 性能优化配置 =====
  readonly VITE_COMPRESS: string;
  readonly VITE_CDN_ASSETS: string;

  // ===== 安全配置 =====
  readonly VITE_API_ENCRYPT: string;
  readonly VITE_DISABLE_DEVTOOLS: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
