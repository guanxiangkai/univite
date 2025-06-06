import {defineStore} from 'pinia';
import type {PersistContext, UserState} from '@/types/pinia-persistedstate.d.ts';

/**
 * 用户信息存储
 * 管理用户认证信息和微信小程序用户资料
 */
export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    // 用户认证令牌
    token: '',
    // 用户个人偏好设置
    preferences: {},
    // 用户基本信息 (适配微信小程序)
    profile: {
      username: '',  // 用户昵称
      avatar: '',    // 用户头像
      email: ''      // 预留字段
    }
  }),

  getters: {
    /**
     * 判断用户是否已登录
     * @returns {boolean} 是否已登录
     */
    isLoggedIn(): boolean {
      return !!this.token;
    },

    /**
     * 获取用户昵称或默认名称
     * @returns {string} 用户昵称
     */
    displayName(): string {
      return this.profile.username || '微信用户';
    }
  },

  actions: {
    /**
     * 设置用户令牌
     * @param {string} newToken 新的认证令牌
     */
    setToken(newToken: string): void {
      this.token = newToken;
    },

    /**
     * 设置用户信息 (微信小程序专用)
     * @param {object} userInfo 微信用户信息
     */
    setWxUserInfo(userInfo: any): void {
      this.profile.username = userInfo.nickName || '';
      this.profile.avatar = userInfo.avatarUrl || '';
    },

    /**
     * 用户登出，清除认证信息
     */
    logout(): void {
      this.token = '';
      this.profile.username = '';
      this.profile.avatar = '';
      this.profile.email = '';
    },

    /**
     * 尝试获取微信用户信息
     * 封装了微信的获取用户信息 API
     */
    async getUserProfile(): Promise<boolean> {
      try {
        // 确保在uni环境下执行
        if (typeof uni === 'undefined') return false;

        // 获取微信用户信息
        const res = await new Promise<any>((resolve, reject) => {
          uni.getUserProfile({
            desc: '用于完善用户资料',
            success: resolve,
            fail: reject
          });
        });

        // 更新用户信息
        if (res.userInfo) {
          this.setWxUserInfo(res.userInfo);
          return true;
        }
        return false;
      } catch (error) {
        console.error('获取用户信息失败:', error);
        return false;
      }
    }
  },

  // 持久化配置 (微信小程序适配)
  persist: {
    // 存储键名
    key: 'wx_user_data',
    // 持久化的路径
    paths: ['token', 'profile'],
    // 恢复前钩子
    beforeRestore: (ctx: PersistContext) => {
      console.log(`即将恢复用户存储: ${ctx.store.$id}`);
    },
    // 恢复后钩子
    afterRestore: (ctx: PersistContext) => {
      console.log(`已恢复用户存储: ${ctx.store.$id}`);
    }
  }
});
