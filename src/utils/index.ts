// 导出所有工具类
export * from './mock';
export * from './i18n';
export * from './debounce';
export * from './date';
export * from './validator';
export * from './chart';
export * from './map';
export * from './request';
export * from './crypto';

// 统一对外暴露工具类
import {MockUtils} from './mock';
import {I18nUtils} from './i18n';
import {DebounceFnUtils} from './debounce';
import {DateUtils} from './date';
import {ValidatorUtils} from './validator';
import {ChartUtils} from './chart';
import {MapUtils} from './map';
import {HttpRequest} from './request';
import {CryptoUtils} from './crypto';

// 创建默认HTTP实例（使用环境变量配置）
const defaultHttp = new HttpRequest();

// 添加通用请求拦截器
defaultHttp.addRequestInterceptor((config) => {
  // 获取存储的token并添加到请求头
  const token = uni.getStorageSync(import.meta.env.VITE_TOKEN_KEY || 'token');
  if (token) {
    config.header = config.header || {};
    config.header['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// 添加通用响应拦截器
defaultHttp.addResponseInterceptor((response, config) => {
  // 处理401未授权错误（token过期）
  if (response.statusCode === 401) {
    // 清除token
    uni.removeStorageSync(import.meta.env.VITE_TOKEN_KEY || 'token');
    // 跳转到登录页
    uni.navigateTo({url: '/pages/login/index'});
  }
  return response;
});

// 工具集合
export const Utils = {
  Mock: MockUtils,
  I18n: I18nUtils,
  Debounce: DebounceFnUtils,
  Date: DateUtils,
  Validator: ValidatorUtils,
  Chart: ChartUtils,
  Map: MapUtils,
  Http: defaultHttp,  // 使用默认配置的HTTP实例
  HttpRequest: HttpRequest,  // 导出HttpRequest类，允许创建自定义实例
  Crypto: CryptoUtils,
};

export default Utils;
