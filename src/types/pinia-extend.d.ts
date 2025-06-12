import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    /**
     * Pinia 持久化插件配置
     */
    persist?: any
  }
}
