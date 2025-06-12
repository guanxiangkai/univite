/**
 * 基于 uni.request 的 TypeScript 强类型 HTTP 工具类封装
 * 全程无 any，类型安全友好，适用于 Web、小程序多端
 */

export interface WebRequestConfig<TData = Record<string, unknown>> {
  url: string; // 请求地址
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: TData; // 请求体或url参数（类型透明，可泛型约束）
  headers?: Record<string, string>; // 请求头
  timeout?: number; // 超时（毫秒）
  showLoading?: boolean; // 是否显示loading
  loadingText?: string;  // loading内容
}

/**
 * 统一的响应泛型（业务成功/失败均可扩展字段）
 */
export interface WebResponse<T = unknown> {
  code: number | string;
  message: string;
  data: T;
}
