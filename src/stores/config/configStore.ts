/**
 * 用户信息存储
 * 管理用户身份、认证信息和个人资料
 * 适配微信小程序和 H5 环境
 */
import { defineStore } from 'pinia';
import type { ConfigState } from '@/types';

/**
 * 系统配置存储定义
 * 用于全局应用配置的状态管理
 */
export const configStore = defineStore('config', {
  // 状态定义
  state: (): ConfigState => ({}),

  // 计算属性
  getters: {},
  // 操作方法
  actions: {},
  // 持久化配置 (微信小程序适配)
  persist: {
    // 存储键名
    key: 'wx_user_data',
    // 持久化的路径
    paths: ['profile', 'preferences'],
  },
});
