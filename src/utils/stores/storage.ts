/**
 * 存储工具类
 * 提供多端兼容的本地存储方法
 * 适配H5和各类小程序环境
 */
import type { IStorage } from '@/types';

// 环境判断工具函数
const isDevMode = process.env.NODE_ENV === 'development';

/**
 * 多端兼容的存储适配器
 * 同时支持H5和小程序端的统一存储接口
 * 提供更完善的错误处理和日志
 */
export const Storage: IStorage = {
  /**
   * 设置存储项
   * @param {string} key - 存储键名
   * @param {string} value - 存储值
   */
  setItem(key: string, value: string): void {
    if (!key) {
      isDevMode && console.warn('存储失败: 键名不能为空');
      return;
    }

    try {
      uni.setStorageSync(key, value);
      isDevMode && console.debug(`存储成功: ${key}`);
    } catch (e) {
      console.error('存储数据失败:', e);
      // 可以在这里添加备用存储策略或上报错误
    }
  },

  /**
   * 获取存储项
   * @param {string} key - 存储键名
   * @returns {string|null} 存储值或null
   */
  getItem(key: string): string | null {
    if (!key) {
      isDevMode && console.warn('获取存储失败: 键名不能为空');
      return null;
    }

    try {
      const value = uni.getStorageSync(key);
      return value || null;
    } catch (e) {
      console.error('获取存储数据失败:', e);
      // 可以在这里添加备用获取策略
      return null;
    }
  },

  /**
   * 移除存储项
   * @param {string} key - 存储键名
   */
  removeItem(key: string): void {
    if (!key) {
      isDevMode && console.warn('移除存储失败: 键名不能为空');
      return;
    }

    try {
      uni.removeStorageSync(key);
      isDevMode && console.debug(`移除存储成功: ${key}`);
    } catch (e) {
      console.error('移除存储数据失败:', e);
    }
  },

  /**
   * 清除所有存储
   * 慎用此方法，会清除所有本地存储
   */
  clear(): void {
    try {
      uni.clearStorageSync();
      isDevMode && console.debug('清除所有存储成功');
    } catch (e) {
      console.error('清除存储失败:', e);
    }
  },
};

export default Storage;
