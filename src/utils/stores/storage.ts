/**
 * 存储工具类
 * 提供多端兼容的本地存储方法
 */

/**
 * 存储接口定义
 * 与 Web Storage API 保持一致
 */
export interface IStorage {
  setItem(key: string, value: string): void;

  getItem(key: string): string | null;

  removeItem(key: string): void;

  clear?(): void;
}

/**
 * 多端兼容的存储适配器
 * 同时支持H5和小程序端
 */
export const Storage: IStorage = {
  /**
   * 设置存储项
   * @param {string} key - 存储键名
   * @param {string} value - 存储值
   */
  setItem(key: string, value: string): void {
    try {
      uni.setStorageSync(key, value);
    } catch (e) {
      console.error('存储数据失败:', e);
    }
  },

  /**
   * 获取存储项
   * @param {string} key - 存储键名
   * @returns {string|null} 存储值或null
   */
  getItem(key: string): string | null {
    try {
      const value = uni.getStorageSync(key);
      return value || null;
    } catch (e) {
      console.error('获取存储数据失败:', e);
      return null;
    }
  },

  /**
   * 移除存储项
   * @param {string} key - 存储键名
   */
  removeItem(key: string): void {
    try {
      uni.removeStorageSync(key);
    } catch (e) {
      console.error('移除存储数据失败:', e);
    }
  },

  /**
   * 清除所有存储
   */
  clear(): void {
    try {
      uni.clearStorageSync();
    } catch (e) {
      console.error('清除存储失败:', e);
    }
  }
};

export default Storage;
