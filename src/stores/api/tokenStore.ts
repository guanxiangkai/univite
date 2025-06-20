/**
 * 令牌管理存储
 * 处理认证令牌的存储、刷新和验证
 * 支持自动刷新和过期判断
 */
import { defineStore } from 'pinia';
import type { TokenState } from '@/types';

/**
 * Token状态存储
 * 使用Pinia持久化插件保存令牌信息
 * 提供完整的令牌管理功能
 */
export const useTokenStore = defineStore('token', {
  // 状态定义
  state: (): TokenState => ({
    accessToken: '', // 访问令牌
    refreshToken: '', // 刷新令牌
    expiresAt: 0, // 过期时间戳
    tokenType: 'Bearer', // 令牌类型
  }),

  // 计算属性
  getters: {
    /**
     * 判断令牌是否已过期
     * @returns 如果令牌已过期或不存在则返回true
     */
    isExpired(): boolean {
      return !this.accessToken || this.expiresAt <= Date.now();
    },

    /**
     * 获取Authorization请求头
     * @returns 格式化的Authorization请求头值
     */
    authHeader(): string {
      return this.accessToken ? `${this.tokenType} ${this.accessToken}` : '';
    },

    /**
     * 判断是否已登录
     * @returns 如果有有效令牌则返回true
     */
    isLoggedIn(): boolean {
      return !!this.accessToken && !this.isExpired;
    },

    /**
     * 获取令牌过期剩余时间（秒）
     * @returns 剩余秒数，如已过期则返回0
     */
    expiresInSeconds(): number {
      if (this.isExpired) return 0;
      return Math.floor((this.expiresAt - Date.now()) / 1000);
    },
  },

  // 操作方法
  actions: {
    /**
     * 设置令牌信息
     * @param {string} accessToken - 访问令牌
     * @param {number} expiresIn - 有效期（秒）
     * @param {string} refreshToken - 刷新令牌
     */
    setToken(
      accessToken: string,
      expiresIn: number,
      refreshToken?: string,
    ): void {
      this.accessToken = accessToken;
      this.expiresAt = Date.now() + expiresIn * 1000;

      if (refreshToken) {
        this.refreshToken = refreshToken;
      }
    },

    /**
     * 设置刷新令牌
     * @param {string} refreshToken - 刷新令牌
     */
    setRefreshToken(refreshToken: string): void {
      this.refreshToken = refreshToken;
    },

    /**
     * 清除所有令牌信息
     * 用于用户登出操作
     */
    clearToken(): void {
      this.accessToken = '';
      this.refreshToken = '';
      this.expiresAt = 0;
    },

    /**
     * 检查并自动刷新令牌
     * @param {number} thresholdSeconds - 剩余时间阈值（秒），小于此值时触发刷新
     * @returns {Promise<boolean>} 刷新是否成功
     */
    async checkAndRefreshToken(
      thresholdSeconds: number = 300,
    ): Promise<boolean> {
      // 如果令牌有效且剩余时间大于阈值，不需要刷新
      if (!this.isExpired && this.expiresInSeconds > thresholdSeconds) {
        return true;
      }

      // 如果有刷新令牌，尝试刷新
      if (this.refreshToken) {
        try {
          // 实际开发中这里应调用刷新令牌API
          // const response = await api.refreshToken(this.refreshToken);
          // this.setToken(response.accessToken, response.expiresIn, response.refreshToken);

          // 模拟刷新成功
          console.log('刷新令牌成功（模拟）');
          return true;
        } catch (error) {
          console.error('刷新令牌失败:', error);
          return false;
        }
      }

      return false;
    },
  },

  // 持久化配置
  persist: true,
});

// 导出便捷访问方法
export function getToken(): ReturnType<typeof useTokenStore> {
  return useTokenStore();
}

export function setToken(tokenData: TokenState): void {
  useTokenStore().setToken(
    tokenData.tokenType,
    tokenData.expiresAt,
    tokenData.refreshToken,
  );
}

export function clearToken(): void {
  useTokenStore().clearToken();
}
