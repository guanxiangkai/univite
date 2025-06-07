import {HttpRequest} from '@/utils/request';

// 创建API请求实例
export const apiHttp = new HttpRequest({
  // 可根据环境变量配置基础URL
  baseUrl: import.meta.env.VITE_API_BASEURL || '',
  timeout: import.meta.env.VITE_REQUEST_TIMEOUT ? Number(import.meta.env.VITE_REQUEST_TIMEOUT) : 15000,
  showLoading: true,
  showError: true,
});

// 请求拦截器
apiHttp.addRequestInterceptor((config) => {
  // 获取token
  const token = uni.getStorageSync(import.meta.env.VITE_TOKEN_KEY || 'token');
  if (token) {
    config.header = config.header || {};
    config.header['Authorization'] = `Bearer ${token}`;
  }

  // 添加小程序特有的平台信息
  const systemInfo = uni.getSystemInfoSync();
  config.header = {
    ...config.header,
    'X-Platform': 'mp-weixin',
    'X-Platform-Version': systemInfo.version || '',
    'X-Device-Model': systemInfo.model || '',
    'X-System': systemInfo.system || '',
  };

  return config;
});

// 响应拦截器
apiHttp.addResponseInterceptor((response, config) => {
  // 处理业务错误码
  const data = response.data;
  if (data && typeof data === 'object' && 'code' in data) {
    // 处理特定业务错误码
    if (data.code === 401) {
      // token失效，清除本地token
      uni.removeStorageSync(import.meta.env.VITE_TOKEN_KEY || 'token');

      // 跳转到登录页
      setTimeout(() => {
        uni.navigateTo({url: '/pages/login/index'});
      }, 1500);
    }

    // 特定错误码不显示错误提示
    if ([401, 403].includes(data.code) && !config.hideErrorToast) {
      uni.showToast({
        title: data.message || '请重新登录',
        icon: 'none',
        duration: 1500,
      });
    }
  }

  return response;
});

export default apiHttp;
