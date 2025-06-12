import type {WebRequestConfig, WebResponse} from '@/types/http/request';

/**
 * 类型守卫：判断接口返回的数据是否为 WebResponse<T> 结构
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
 */
function request<TResp = unknown, TReq = Record<string, unknown>>(config: WebRequestConfig<TReq>): Promise<WebResponse<TResp>> {
  if (config.showLoading) {
    uni.showLoading({
      title: config.loadingText || '加载中',
      mask: true,
    });
  }

  return new Promise<WebResponse<TResp>>((resolve, reject) => {
    uni.request({
      url: config.url,
      method: config.method || 'GET',
      data: config.data ?? {}, // data 至少是一个对象
      header: config.headers,
      timeout: config.timeout,
      success(res) {
        // 类型安全校验
        if (isWebResponse<TResp>(res.data)) {
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
        reject({
          code: -2,
          message: (error && typeof error === 'object' && 'errMsg' in error)
            ? (error as { errMsg: string }).errMsg
            : '网络错误',
          data: undefined as unknown as TResp,
        });
      },
      complete() {
        if (config.showLoading) {
          uni.hideLoading();
        }
      },
    });
  });
}

// GET、POST等方法参考前一版，只需直接调用上面的 request

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

export const http = {
  request,
  get,
  post,
  put,
  delete: del,
};
export default http;
