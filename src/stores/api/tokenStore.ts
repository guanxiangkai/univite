/**
 * 令牌管理存储
 * 处理认证令牌的存储、刷新和验证
 */
import {defineStore} from 'pinia';
import type {TokenState} from "@/types";

/**
 * Token状态存储
 * 使用Pinia持久化插件保存令牌信息
 */
export const useTokenStore = defineStore('token', {
  // 状态定义
  state: (): TokenState => ({
    accessToken: '',      // 访问令牌
    refreshToken: '',     // 刷新令牌
    expiresAt: 0,         // 过期时间戳
    tokenType: 'Bearer',  // 令牌类型
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
    }
  },

  // 操作方法
  actions: {
    /**
     * 设置令牌信息
     * @param tokenData 完整的令牌数据
     */
    setToken(tokenData: TokenState) {
      this.accessToken = tokenData.accessToken;
      this.refreshToken = tokenData.refreshToken;
      this.expiresAt = tokenData.expiresAt;
      this.tokenType = tokenData.tokenType || 'Bearer';
    },

    /**
     * 清除所有令牌信息
     */
    clearToken() {
      this.accessToken = '';
      this.refreshToken = '';
      this.expiresAt = 0;
    }
  },

  // 持久化配置
  persist: {
    enabled: true,
    strategies: [{
      key: 'token_store',
      storage: 'local' // 使用本地存储
    }]
  }
});

// 导出便捷访问方法
export function getToken(): ReturnType<typeof useTokenStore> {
  return useTokenStore();
}

export function setToken(tokenData: TokenState): void {
  useTokenStore().setToken(tokenData);
}

export function clearToken(): void {
  useTokenStore().clearToken();
}
