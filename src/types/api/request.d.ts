/**
 * API请求和响应的类型定义
 */


/**
 * 通用请求配置
 */
export interface WebRequestConfig<T = any> {
  // 请求URL
  url: string;
  // 请求方法
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  // 请求头
  headers?: Record<string, string>;
  // 请求数据/参数
  data?: T;
  // 请求超时时间（毫秒）
  timeout?: number;
  // 是否显示加载指示器
  showLoading?: boolean;
  // 加载指示器文本
  loadingText?: string;
  // 内部属性：是否为重试请求
  _isRetry?: boolean;
}

/**
 * 通用响应结构
 */
export interface WebResponse<T = any> {
  // 业务状态码
  code: number;
  // 响应消息
  message: string;
  // 响应数据
  data: T;
  // 其他可能的属性
  [key: string]: any;
}

/**
 * HTTP状态码类型
 * 定义常见的HTTP状态码，方便响应处理
 */
export enum HttpStatusCode {
  // 2xx 成功
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // 3xx 重定向
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,

  // 4xx 客户端错误
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  REQUEST_TIMEOUT = 408,

  // 5xx 服务器错误
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
}
