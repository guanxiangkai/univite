import {I18nUtils} from './i18n';

// HTTP 方法类型
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

// 请求配置接口
interface RequestConfig {
  url: string;
  method?: HttpMethod;
  data?: any;
  params?: Record<string, any>;
  header?: Record<string, string>;
  timeout?: number;
  dataType?: 'json' | 'text' | 'html';
  responseType?: 'text' | 'arraybuffer';
  sslVerify?: boolean;
  withCredentials?: boolean;
  showLoading?: boolean;
  loadingText?: string;
  hideErrorToast?: boolean;
  baseUrl?: string;
  interceptor?: {
    request?: (config: RequestConfig) => RequestConfig;
    response?: (response: any, config: RequestConfig) => any;
  };
}

// 响应接口
interface Response<T = any> {
  data: T;
  statusCode: number;
  header: Record<string, string>;
  cookies: string[];
  errMsg: string;
}

// 自定义响应格式
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

/**
 * HTTP 请求工具类
 */
export class HttpRequest {
  private baseUrl: string = '';
  private timeout: number = import.meta.env.VITE_REQUEST_TIMEOUT || 30000;
  private header: Record<string, string> = {};
  private showLoading: boolean = import.meta.env.VITE_SHOW_LOADING === 'true';
  private showError: boolean = import.meta.env.VITE_SHOW_ERROR !== 'false';
  private tokenKey: string = import.meta.env.VITE_TOKEN_KEY || 'token';
  private interceptors: {
    request: Array<(config: RequestConfig) => RequestConfig>;
    response: Array<(response: any, config: RequestConfig) => any>;
  } = {
    request: [],
    response: [],
  };

  /**
   * 构造函数
   * @param baseUrl 基础 URL
   * @param timeout 超时时间
   * @param header 默认头部
   * @param showLoading 是否显示加载提示
   * @param showError 是否显示错误提示
   */
  constructor({
                baseUrl = '',
                timeout = import.meta.env.VITE_REQUEST_TIMEOUT || 30000,
                header = {},
                showLoading = import.meta.env.VITE_SHOW_LOADING === 'true',
                showError = import.meta.env.VITE_SHOW_ERROR !== 'false'
              } = {}) {
    this.baseUrl = baseUrl;
    this.timeout = Number(timeout);
    this.showLoading = showLoading;
    this.showError = showError;
    this.header = {
      'Content-Type': import.meta.env.VITE_CONTENT_TYPE || 'application/json',
      ...header,
    };
  }

  /**
   * 添加请求拦截器
   * @param interceptor 请求拦截器函数
   */
  addRequestInterceptor(interceptor: (config: RequestConfig) => RequestConfig) {
    this.interceptors.request.push(interceptor);
  }

  /**
   * 添加响应拦截器
   * @param interceptor 响应拦截器函数
   */
  addResponseInterceptor(interceptor: (response: any, config: RequestConfig) => any) {
    this.interceptors.response.push(interceptor);
  }

  /**
   * 设置认证令牌
   * @param token 认证令牌
   * @param tokenType 令牌类型，默认为 Bearer
   */
  setToken(token: string, tokenType: string = 'Bearer') {
    this.header['Authorization'] = tokenType ? `${tokenType} ${token}` : token;
    // 同时存储到本地
    uni.setStorageSync(this.tokenKey, token);
  }

  /**
   * 移除认证令牌
   */
  removeToken() {
    delete this.header['Authorization'];
  }

  /**
   * 发送请求
   * @param config 请求配置
   * @returns Promise 响应对象
   */
  request<T = any>(config: RequestConfig): Promise<T> {
    const finalConfig = this.processConfig(config);

    // 显示加载提示
    if (finalConfig.showLoading) {
      uni.showLoading({
        title: finalConfig.loadingText || I18nUtils.t('common.loading'),
        mask: true,
      });
    }

    return new Promise<T>((resolve, reject) => {
      uni.request({
        url: finalConfig.url,
        method: finalConfig.method as any || 'GET',
        data: finalConfig.data,
        header: finalConfig.header,
        timeout: finalConfig.timeout,
        dataType: finalConfig.dataType || 'json',
        responseType: finalConfig.responseType || 'text',
        sslVerify: finalConfig.sslVerify !== false,
        withCredentials: finalConfig.withCredentials || false,
        success: (res: Response) => {
          let processedRes = res;

          // 应用响应拦截器
          this.interceptors.response.forEach((interceptor) => {
            processedRes = interceptor(processedRes, finalConfig);
          });

          // 对于自定义 API 响应格式，可以在这里处理
          if (processedRes.statusCode >= 200 && processedRes.statusCode < 300) {
            // 检查是否是自定义 API 响应格式
            const data = processedRes.data as unknown as ApiResponse<T>;
            if (data && typeof data === 'object' && 'code' in data) {
              // 自定义 API 响应格式
              if (data.code === 200 || data.success) {
                resolve(data.data);
              } else {
                // 业务逻辑错误
                if (!finalConfig.hideErrorToast) {
                  uni.showToast({
                    title: data.message || I18nUtils.t('common.error'),
                    icon: 'none',
                    duration: 2000,
                  });
                }
                reject(data);
              }
            } else {
              // 直接返回数据
              resolve(processedRes.data as unknown as T);
            }
          } else {
            // HTTP 错误
            if (!finalConfig.hideErrorToast) {
              uni.showToast({
                title: processedRes.errMsg || `HTTP Error: ${processedRes.statusCode}`,
                icon: 'none',
                duration: 2000,
              });
            }
            reject(processedRes);
          }
        },
        fail: (err) => {
          if (!finalConfig.hideErrorToast) {
            uni.showToast({
              title: err.errMsg || I18nUtils.t('common.networkError'),
              icon: 'none',
              duration: 2000,
            });
          }
          reject(err);
        },
        complete: () => {
          // 隐藏加载提示
          if (finalConfig.showLoading) {
            uni.hideLoading();
          }
        },
      });
    });
  }

  /**
   * 发送 GET 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 其他配置
   * @returns Promise 响应对象
   */
  get<T = any>(url: string, params?: Record<string, any>, config?: Omit<RequestConfig, 'url' | 'method' | 'params'>): Promise<T> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...config,
    });
  }

  /**
   * 发送 POST 请求
   * @param url 请求地址
   * @param data 请求体数据
   * @param config 其他配置
   * @returns Promise 响应对象
   */
  post<T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>): Promise<T> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config,
    });
  }

  /**
   * 发送 PUT 请求
   * @param url 请求地址
   * @param data 请求体数据
   * @param config 其他配置
   * @returns Promise 响应对象
   */
  put<T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>): Promise<T> {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...config,
    });
  }

  /**
   * 发送 DELETE 请求
   * @param url 请求地址
   * @param data 请求体数据
   * @param config 其他配置
   * @returns Promise 响应对象
   */
  delete<T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>): Promise<T> {
    return this.request<T>({
      url,
      method: 'DELETE',
      data,
      ...config,
    });
  }

  /**
   * 上传文件
   * @param url 上传地址
   * @param filePath 文件路径
   * @param name 文件对应的 key
   * @param formData 其他表单数据
   * @param config 其他配置
   * @returns Promise 响应对象
   */
  uploadFile<T = any>(
    url: string,
    filePath: string,
    name: string = 'file',
    formData?: Record<string, any>,
    config?: Omit<RequestConfig, 'url'>
  ): Promise<T> {
    const finalConfig = this.processConfig({url, ...config});

    // 显示加载提示
    if (finalConfig.showLoading) {
      uni.showLoading({
        title: finalConfig.loadingText || I18nUtils.t('common.uploading'),
        mask: true,
      });
    }

    return new Promise<T>((resolve, reject) => {
      uni.uploadFile({
        url: finalConfig.url,
        filePath,
        name,
        formData,
        header: finalConfig.header,
        timeout: finalConfig.timeout,
        success: (res: UniApp.UploadFileSuccessCallbackResult) => {
          let data: any;

          try {
            data = JSON.parse(res.data);
          } catch (e) {
            data = res.data;
          }

          const processedRes = {...res, data};

          // 应用响应拦截器
          let result = processedRes;
          this.interceptors.response.forEach((interceptor) => {
            result = interceptor(result, finalConfig);
          });

          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(result.data as T);
          } else {
            if (!finalConfig.hideErrorToast) {
              uni.showToast({
                title: `Upload Error: ${res.statusCode}`,
                icon: 'none',
                duration: 2000,
              });
            }
            reject(result);
          }
        },
        fail: (err) => {
          if (!finalConfig.hideErrorToast) {
            uni.showToast({
              title: err.errMsg || I18nUtils.t('common.uploadFailed'),
              icon: 'none',
              duration: 2000,
            });
          }
          reject(err);
        },
        complete: () => {
          // 隐藏加载提示
          if (finalConfig.showLoading) {
            uni.hideLoading();
          }
        },
      });
    });
  }

  /**
   * 下载文件
   * @param url 下载地址
   * @param config 其他配置
   * @returns Promise 响应对象
   */
  downloadFile(url: string, config?: Omit<RequestConfig, 'url'>): Promise<UniApp.DownloadSuccessData> {
    const finalConfig = this.processConfig({url, ...config});

    // 显示加载提示
    if (finalConfig.showLoading) {
      uni.showLoading({
        title: finalConfig.loadingText || I18nUtils.t('common.downloading'),
        mask: true,
      });
    }

    return new Promise<UniApp.DownloadSuccessData>((resolve, reject) => {
      uni.downloadFile({
        url: finalConfig.url,
        header: finalConfig.header,
        timeout: finalConfig.timeout,
        success: (res: UniApp.DownloadSuccessData) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res);
          } else {
            if (!finalConfig.hideErrorToast) {
              uni.showToast({
                title: `Download Error: ${res.statusCode}`,
                icon: 'none',
                duration: 2000,
              });
            }
            reject(res);
          }
        },
        fail: (err) => {
          if (!finalConfig.hideErrorToast) {
            uni.showToast({
              title: err.errMsg || I18nUtils.t('common.downloadFailed'),
              icon: 'none',
              duration: 2000,
            });
          }
          reject(err);
        },
        complete: () => {
          // 隐藏加载提示
          if (finalConfig.showLoading) {
            uni.hideLoading();
          }
        },
      });
    });
  }

  /**
   * 处理请求配置
   * @param config 请求配置
   * @returns 处理后的请求配置
   */
  private processConfig(config: RequestConfig): RequestConfig {
    // 合并默认配置
    let newConfig = {
      ...config,
      header: {...this.header, ...config.header},
      timeout: config.timeout || this.timeout,
      baseUrl: config.baseUrl || this.baseUrl,
      showLoading: config.showLoading !== undefined ? config.showLoading : this.showLoading,
      hideErrorToast: config.hideErrorToast !== undefined ? config.hideErrorToast : !this.showError,
    };

    // 处理 URL
    if (newConfig.baseUrl && !newConfig.url.startsWith('http')) {
      newConfig.url = newConfig.baseUrl + newConfig.url;
    }

    // 处理 GET 请求参数
    if (newConfig.params && (newConfig.method === 'GET' || !newConfig.method)) {
      const queryString = Object.entries(newConfig.params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');

      if (queryString) {
        newConfig.url += (newConfig.url.includes('?') ? '&' : '?') + queryString;
      }
    }

    // 应用请求拦截器
    this.interceptors.request.forEach((interceptor) => {
      newConfig = interceptor(newConfig);
    });

    return newConfig;
  }
}

// 创建默认请求实例
export const http = new HttpRequest();

// 添加通用请求拦截器（示例）
http.addRequestInterceptor((config) => {
  // 可以在这里添加通用的请求头、参数等
  return config;
});

// 添加通用响应拦截器（示例）
http.addResponseInterceptor((response, config) => {
  // 可以在这里处理通用的响应逻辑，如刷新 token 等
  return response;
});
