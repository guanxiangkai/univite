/**
 * 用户相关API接口
 */
import http from '@/utils/api/http';
import type { WebResponse } from '@/types';

/**
 * 用户基本信息接口
 */
export interface UserInfo {
  // 用户ID
  id: number | string;
  // 用户名
  username: string;
  // 昵称
  nickname: string;
  // 头像URL
  avatar: string;
  // 手机号码
  phone?: string;
  // 电子邮箱
  email?: string;
  // 用户角色
  roles: string[];
  // 用户权限
  permissions?: string[];
  // 是否已认证
  verified: boolean;
  // 注册时间
  createdAt: string;
  // 最后登录时间
  lastLoginAt?: string;
  // 用户状态
  status: 'active' | 'disabled' | 'pending';
}

/**
 * 用户详细信息接口
 */
export interface UserDetail extends UserInfo {
  // 个人简介
  bio?: string;
  // 性别: 0-未设置, 1-男, 2-女
  gender?: 0 | 1 | 2;
  // 生日
  birthday?: string;
  // 地址
  address?: string;
  // 兴趣爱好
  interests?: string[];
  // 社交账号
  socialAccounts?: {
    weixin?: string;
    weibo?: string;
    github?: string;
    [key: string]: string | undefined;
  };
  // 统计信息
  stats?: {
    followers: number;
    following: number;
    posts: number;
    likes: number;
  };
}

/**
 * 用户配置接口
 */
export interface UserSettings {
  // 通知设置
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  // 隐私设置
  privacy: {
    showPhone: boolean;
    showEmail: boolean;
    publicProfile: boolean;
  };
  // 安全设置
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
  };
  // 主题设置
  theme: 'light' | 'dark' | 'system';
  // 语言设置
  language: string;
}

/**
 * 更新用户信息参数接口
 */
export interface UpdateUserParams {
  nickname?: string;
  avatar?: string;
  bio?: string;
  gender?: 0 | 1 | 2;
  birthday?: string;
  address?: string;
  interests?: string[];
  socialAccounts?: Record<string, string>;
}

/**
 * 更新密码参数接口
 */
export interface UpdatePasswordParams {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * 用户API类
 */
class UserAPI {
  /**
   * 获取当前用户信息
   * @returns 用户基本信息
   */
  getCurrentUser(): Promise<WebResponse<UserInfo>> {
    return http.get<UserInfo>('/api/user/info');
  }

  /**
   * 获取用户详细信息
   * @param userId 用户ID，不传则获取当前用户
   * @returns 用户详细信息
   */
  getUserDetail(userId?: string | number): Promise<WebResponse<UserDetail>> {
    const url = userId ? `/api/user/${userId}/detail` : '/api/user/detail';
    return http.get<UserDetail>(url);
  }

  /**
   * 获取用户设置
   * @returns 用户设置信息
   */
  getUserSettings(): Promise<WebResponse<UserSettings>> {
    return http.get<UserSettings>('/api/user/settings');
  }

  /**
   * 更新用户设置
   * @param settings 设置参数
   * @returns 更新结果
   */
  updateUserSettings(settings: Partial<UserSettings>): Promise<WebResponse<UserSettings>> {
    return http.put<UserSettings, Partial<UserSettings>>('/api/user/settings', settings);
  }

  /**
   * 更新用户信息
   * @param params 用户信息参数
   * @returns 更新后的用户信息
   */
  updateUserInfo(params: UpdateUserParams): Promise<WebResponse<UserDetail>> {
    return http.put<UserDetail, UpdateUserParams>('/api/user/info', params);
  }

  /**
   * 修改密码
   * @param params 密码参数
   * @returns 修改结果
   */
  updatePassword(params: UpdatePasswordParams): Promise<WebResponse<{ success: boolean }>> {
    return http.put<{ success: boolean }, UpdatePasswordParams>('/api/user/password', params);
  }

  /**
   * 绑定手机号
   * @param params 手机号参数
   * @returns 绑定结果
   */
  bindPhone(params: { phone: string; code: string }): Promise<WebResponse<{ success: boolean }>> {
    return http.post<{ success: boolean }>('/api/user/bind/phone', params);
  }

  /**
   * 绑定邮箱
   * @param params 邮箱参数
   * @returns 绑定结果
   */
  bindEmail(params: { email: string; code: string }): Promise<WebResponse<{ success: boolean }>> {
    return http.post<{ success: boolean }>('/api/user/bind/email', params);
  }

  /**
   * 获取用户收藏列表
   * @param params 分页参数
   * @returns 收藏列表
   */
  getFavorites(params: { page: number; size: number }): Promise<WebResponse<{
    items: Array<any>;
    total: number;
    page: number;
    size: number;
  }>> {
    return http.get<{
      items: Array<any>;
      total: number;
      page: number;
      size: number;
    }>('/api/user/favorites', params);
  }

  /**
   * 上传用户头像
   * @param file 文件对象
   * @returns 上传结果，包含头像URL
   */
  uploadAvatar(file: File): Promise<WebResponse<{ avatarUrl: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);

    return http.post<{ avatarUrl: string }, FormData>('/api/user/avatar/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

// 导出用户API实例
export const userAPI = new UserAPI();
