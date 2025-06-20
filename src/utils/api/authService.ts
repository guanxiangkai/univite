/**
 * Token验证与刷新处理工具
 * 处理接口响应中的Token相关问题，如过期、无效等
 */
import { getToken, setToken, clearToken } from '@/stores';
import { refreshTokenAPI } from './tokenRefresher';
import type { WebRequestConfig, WebResponse, TokenState } from '@/types';

// 全局变量 - 标记当前是否有正在进行的Token刷新操作
let _refreshingTokenPromise: Promise<TokenState> | null = null;

/**
 * 处理401未授权错误（Token过期或无效）
 * 1. 自动尝试刷新Token
 * 2. 刷新成功后重试原请求
 * 3. 刷新失败则跳转到登录页
 *
 * @param originalConfig 原始请求配置，支持任意类型的请求数据
 * @param requestFn 请求执行函数，必须是一个能处理通用WebRequestConfig的函数
 * @returns 返回请求结果Promise
 *
 * T - 响应数据类型
 * R - 请求数据类型（默认为any，保持类型灵活性）
 *
 * 注意：这里使用了泛型函数类型，使得函数可以处理任何类型的请求配置，
 * 而不仅限于TokenState类型，从而解决了类型不匹配的问题
 */
export async function handle401<T, R = unknown>(
  originalConfig: WebRequestConfig<R>,
  requestFn: <U = T, V = R>(
    config: WebRequestConfig<V>,
  ) => Promise<WebResponse<U>>,
): Promise<WebResponse<T>> {
  // 防止并发请求重复刷新Token
  if (_refreshingTokenPromise) {
    // 已有刷新Token任务正在进行，等待其完成
    try {
      // 等待现有的刷新Token操作完成
      await _refreshingTokenPromise;

      // 使用新Token重试原请求
      const tokenStore = getToken();
      originalConfig.headers = {
        ...originalConfig.headers,
        Authorization: tokenStore.authHeader,
      };

      // 重新发起原始请求
      return requestFn(originalConfig);
    } catch (error) {
      // 如果等待过程中发生错误，则继续抛出
      return Promise.reject(error);
    }
  }

  try {
    // 标记刷新Token操作开始
    const tokenStore = getToken();
    _refreshingTokenPromise = refreshTokenAPI(tokenStore.refreshToken);

    // 等待刷新Token完成
    const newToken = await _refreshingTokenPromise;

    // 保存新的Token信息
    setToken(newToken);

    // 更新原始请求中的Token并重试
    originalConfig.headers = {
      ...originalConfig.headers,
      Authorization: `${newToken.tokenType} ${newToken.accessToken}`,
    };

    // 重新发起原始请求
    return requestFn<T, R>(originalConfig);
  } catch (error) {
    // 刷新Token失败，清除本地Token信息
    clearToken();

    // 跳转到登录页面
    // 注意：这里应根据项目实际路由实现修改
    uni.navigateTo({ url: '/pages/login/index' });

    // 返回错误信息
    return Promise.reject({
      code: 401,
      message: '登录已过期，请重新登录',
      data: null,
    });
  } finally {
    // 无论成功失败，重置刷新Token的标记
    _refreshingTokenPromise = null;
  }
}

/**
 * 请求拦截器 - 添加Token到请求头
 * @param config 请求配置
 * @returns 处理后的请求配置
 */
export function requestInterceptor<T = unknown>(
  config: WebRequestConfig<T>,
): WebRequestConfig<T> {
  const tokenStore = getToken();

  // 如果存在Token且未过期，则添加到请求头
  if (tokenStore.accessToken && !tokenStore.isExpired) {
    // 构建授权头信息
    const authHeader = `${tokenStore.tokenType} ${tokenStore.accessToken}`;

    config.headers = {
      ...config.headers,
      Authorization: authHeader,
    };
  }

  return config;
}
