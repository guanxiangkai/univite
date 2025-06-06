interface ImportMetaEnv {
  readonly VITE_WX_APPID: string;
  readonly VITE_TOKEN_KEY: string;
  readonly VITE_SHOW_LOADING: string
  readonly VITE_SHOW_ERROR: string
  readonly VITE_REQUEST_TIMEOUT: number
  readonly VITE_CONTENT_TYPE: string
  readonly VITE_UPLOAD_BASEURL: string;
  readonly VITE_DELETE_CONSOLE: boolean;
  readonly VITE_SHOW_SOURCEMAP: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
