// 请求方法类型
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// 响应状态码枚举 (清晰明确)
export enum ResponseCode {
  SUCCESS = 200,        // 请求成功
  TOKEN_INVALID = 401,  // TOKEN失效或未授权
  // 根据实际情况，可以继续补充其他可能出现的code
}

export interface RequestOptions {
  url: string;
  data?: Record<string, any>;
}

// 请求统一配置interface
export interface RequestConfig<T = any> {
  url: string;
  data?: string | AnyObject | ArrayBuffer;
  header?: AnyObject;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  timeout?: number;
  success?: (result: RequestSuccessCallbackResult) => void;
  fail?: (result: GeneralCallbackResult) => void;

}

// 接口统一返回格式
export interface ApiResponse<T = any> {
  code: number;                 // 状态码（精确固定字段）
  msg: string;                  // 消息（精确固定字段）
  data: T;                      // 数据泛型，不同接口返回不同类型
}


