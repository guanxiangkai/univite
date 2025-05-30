import {defineStore} from 'pinia';
import type {PersistContext, UserState} from '@/types/pinia-persistedstate.d.ts';

/**
 * 用户信息存储
 * 管理用户认证信息和个人偏好设置
 */
export const userStore = defineStore('user', {
  state: (): UserState => ({
    // 用户认证令牌
    token: '',
    // 用户个人偏好设置
    preferences: {},
    // 用户基本信息
    profile: {
      username: '',
      avatar: '',
      email: ''
    }
  }),

  getters: {
    /**
     * 判断用户是否已登录
     */
    isLoggedIn(): boolean {
      return !!this.token;
    }
  },

  actions: {
    /**
     * 设置用户令牌
     * @param newToken 新的认证令牌
     */
    setToken(newToken: string): void {
      this.token = newToken;
    },

    /**
     * 用户登出，清除认证信息
     */
    logout(): void {
      this.token = '';
      this.profile.username = '';
      this.profile.avatar = '';
      this.profile.email = '';
    }
  },

  // 持久化配置
  persist: {
    // 存储键名
    key: 'user_data',  // 修改key，避免与configStore冲突
    // 使用本地存储
    storage: localStorage,
    // 持久化的路径，只保存token和profile
    paths: ['token', 'profile'],
    // 恢复前钩子
    beforeRestore: (ctx: PersistContext) => {
      console.log(`即将恢复用户存储: ${ctx.store.$id}`);
    },
    // 恢复后钩子
    afterRestore: (ctx: PersistContext) => {
      console.log(`已恢复用户存储: ${ctx.store.$id}`);
    }
  },
});
