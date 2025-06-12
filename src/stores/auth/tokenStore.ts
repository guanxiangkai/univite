/**
 * 令牌管理存储
 * 处理认证令牌的存储、刷新和验证
 */
import {defineStore} from 'pinia';
import type {TokenState} from "@/types";

/**
 * 令牌存储定义
 * 用于管理认证令牌的状态
 */
export const tokenStore = defineStore('token', {
// 状态定义
    state: (): TokenState => ({
        // 访问令牌
        accessToken: '',
        // 刷新令牌
        refreshToken: '',
        // 过期时间戳(毫秒)
        expiresAt: 0,
        // 令牌类型
        tokenType: 'Bearer'
    }),

    // 计算属性
    getters: {},
    // 操作方法
    actions: {},

});
