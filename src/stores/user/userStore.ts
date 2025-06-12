/**
 * 用户信息存储
 * 管理用户身份、认证信息和个人资料
 * 适配微信小程序和 H5 环境
 */
import {defineStore} from 'pinia';
import type {PersistContext, UserState} from '@/types';

/**
 * 用户信息存储定义
 */
export const useUserStore = defineStore('user', {
  // 状态定义
  state: (): UserState => ({
    // 用户个人偏好设置
    preferences: {},
    // 用户基本信息 (适配微信小程序)
    profile: {
      username: '',  // 用户昵称
      avatar: '',    // 用户头像
    }
  }),

  // 计算属性
  getters: {

    /**
     * 获取用户昵称或默认名称
     * @returns {string} 用户昵称
     */
    displayName(): string {
      return this.profile.username || '微信用户';
    },

    /**
     * 获取用户头像或默认头像
     * @returns {string} 用户头像URL
     */
    avatarUrl(): string {
      return this.profile.avatar || '/assets/images/default-avatar.png';
    },

    /**
     * 获取用户信息完整度百分比
     * @returns {number} 完整度百分比
     */
    profileCompleteness(): number {
      // 计算百分比
      return Math.floor((Object.values(this.profile).filter(v => v !== '').length / Object.keys(this.profile).length) * 100);
    }
  },

  // 操作方法
  actions: {

    /**
     * 设置用户信息 (微信小程序专用)
     * @param {object} userInfo 微信用户信息
     */
    setWxUserInfo(userInfo: Record<string, string>): void {
      // 判断是否有有效数据
      if (!userInfo) return;

      // 更新用户资料
      this.profile.username = userInfo.nickName || userInfo.username || '';
      this.profile.avatar = userInfo.avatarUrl || userInfo.avatar || '';

      // 更新其他可能的自定义字段
      // ...
    },

    /**
     * 更新用户资料
     * @param {Partial<UserState['profile']>} profileData 部分用户资料
     */
    updateProfile(profileData: Partial<UserState['profile']>): void {
      this.profile = {
        ...this.profile,
        ...profileData
      };
    },

    /**
     * 更新用户偏好设置
     * @param {string} key 偏好设置键名
     * @param {any} value 偏好设置值
     */
    setPreference(key: string, value: Record<string, string>): void {
      this.preferences[key] = value;
    },

    // 持久化配置 (微信小程序适配)
    persist: {
      // 存储键名
      key: 'wx_user_data',
      // 持久化的路径
      paths: ['profile', 'preferences'],
      // 恢复前钩子
      beforeRestore: (ctx: PersistContext) => {
        console.log(`准备恢复用户存储: ${ctx.store.$id}`);
      },
      // 恢复后钩子
      afterRestore: (ctx: PersistContext) => {
        console.log(`已恢复用户存储: ${ctx.store.$id}`);
      }
    }
  }
});
