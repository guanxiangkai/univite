import type { WebRequestConfig, WebResponse } from '@/types/api/request';
import { handle401, requestInterceptor } from './authHandler';

/**
 * 类型守卫：判断接口返回的数据是否为 WebResponse<T> 结构
 * @param obj 要检查的对象
 * @returns 是否符合 WebResponse<T> 结构
 */
function isWebResponse<T>(obj: unknown): obj is WebResponse<T> {
  return !!obj
    && typeof obj === 'object'
    && 'code' in obj
    && 'message' in obj
    && 'data' in obj;
}

/**
 * 通用请求方法
 * 实现请求发送、响应处理、错误处理和Token自动刷新
 *
 * @param config 请求配置
 * @returns 返回响应结果的Promise
 */
function request<TResp = unknown, TReq = Record<string, unknown>>(
  config: WebRequestConfig<TReq>
): Promise<WebResponse<TResp>> {
  // 应用请求拦截器，处理Token等信息
  const processedConfig = requestInterceptor(config);

  // 显示加载提示
  if (processedConfig.showLoading) {
    uni.showLoading({
      title: processedConfig.loadingText || '加载中',
      mask: true,
    });
  }

  return new Promise<WebResponse<TResp>>((resolve, reject) => {
    uni.request({
      url: processedConfig.url,
      method: processedConfig.method,
      data: processedConfig.data ?? {}, // data 至少是一个对象
      header: processedConfig.headers,
      timeout: processedConfig.timeout,
      success(res) {
        // 处理状态码为401的情况（Token过期）
        if (res.statusCode === 401) {
          // 隐藏加载提示
          if (processedConfig.showLoading) {
            uni.hideLoading();
          }

          // 尝试刷新Token并重试请求
          handle401<TResp>(processedConfig, request)
            .then(resolve)
            .catch(reject);
          return;
        }

        // 类型安全校验
        if (isWebResponse<TResp>(res.data)) {
          // 处理业务状态码为401的情况（Token过期）
          if (res.data.code === 401) {
            // 隐藏加载提示
            if (processedConfig.showLoading) {
              uni.hideLoading();
            }

            // 尝试刷新Token并重试请求
            handle401<TResp>(processedConfig, request)
              .then(resolve)
              .catch(reject);
            return;
          }

          // 常规响应处理
          resolve(res.data);
        } else {
          // 自定义兜底：补全所有字段，保证类型兼容
          resolve({
            code: -1,
            message: '服务端返回格式不规范',
            data: undefined as unknown as TResp
          });
        }
      },
      fail(error) {
        // 网络错误或请求被拒绝
        reject({
          code: -2,
          message: (error && typeof error === 'object' && 'errMsg' in error)
            ? (error as { errMsg: string }).errMsg
            : '网络错误',
          data: undefined as unknown as TResp,
        });
      },
      complete() {
        // 隐藏加载提示
        if (processedConfig.showLoading) {
          uni.hideLoading();
        }
      },
    });
  });
}

/**
 * GET请求方法
 *
 * @param url 请求地址
 * @param params 请求参数（会被转换为查询字符串）
 * @param config 其他配置选项
 * @returns 返回响应结果的Promise
 */
function get<TResp = unknown, TParams = undefined>(
  url: string,
  params?: TParams,
  config?: Omit<WebRequestConfig<TParams>, 'url' | 'method' | 'data'>
): Promise<WebResponse<TResp>> {
  return request<TResp, TParams>({
    ...config,
    url,
    method: 'GET',
    data: params
  });
}

/**
 * POST请求方法
 *
 * @param url 请求地址
 * @param data 请求体数据
 * @param config 其他配置选项
 * @returns 返回响应结果的Promise
 */
function post<TResp = unknown, TReq = Record<string, unknown>>(
  url: string,
  data?: TReq,
  config?: Omit<WebRequestConfig<TReq>, 'url' | 'method' | 'data'>
): Promise<WebResponse<TResp>> {
  return request<TResp, TReq>({
    ...config,
    url,
    method: 'POST',
    data
  });
}

/**
 * PUT请求方法
 *
 * @param url 请求地址
 * @param data 请求体数据
 * @param config 其他配置选项
 * @returns 返回响应结果的Promise
 */
function put<TResp = unknown, TReq = Record<string, unknown>>(
  url: string,
  data?: TReq,
  config?: Omit<WebRequestConfig<TReq>, 'url' | 'method' | 'data'>
): Promise<WebResponse<TResp>> {
  return request<TResp, TReq>({
    ...config,
    url,
    method: 'PUT',
    data
  });
}

/**
 * DELETE请求方法
 *
 * @param url 请求地址
 * @param data 请求体数据
 * @param config 其他配置选项
 * @returns 返回响应结果的Promise
 */
function del<TResp = unknown, TReq = Record<string, unknown>>(
  url: string,
  data?: TReq,
  config?: Omit<WebRequestConfig<TReq>, 'url' | 'method' | 'data'>
): Promise<WebResponse<TResp>> {
  return request<TResp, TReq>({
    ...config,
    url,
    method: 'DELETE',
    data
  });
}

/**
 * HTTP请求工具对象
 * 提供各种HTTP方法的简便访问
 */
export const http = {
  request,
  get,
  post,
  put,
  delete: del,
};

export default http;
