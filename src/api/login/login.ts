/**
 * 登录相关API接口
 */
import http from '@/utils/api/http';
import type { WebResponse } from '@/types';

/**
 * 登录参数接口
 */
export interface LoginParams {
  // 用户名
  username: string;
  // 密码
  password: string;
  // 验证码（可选）
  captcha?: string;
  // 记住登录状态
  remember?: boolean;
}

/**
 * 登录响应数据接口
 */
export interface LoginResponse {
  // 访问令牌
  accessToken: string;
  // 刷新令牌
  refreshToken: string;
  // 过期时间戳
  expiresAt: number;
  // 令牌类型
  tokenType: string;
  // 用户ID
  userId: number | string;
}

/**
 * 验证码响应接口
 */
export interface CaptchaResponse {
  // 验证码图片（Base64编码）
  image: string;
  // 验证码ID（用于提交验证时验证）
  captchaId: string;
}

/**
 * 注册参数接口
 */
export interface RegisterParams {
  // 用户名
  username: string;
  // 密码
  password: string;
  // 确认密码
  confirmPassword: string;
  // 手机号
  phone?: string;
  // 邮箱
  email?: string;
  // 验证码
  captcha?: string;
  // 验证码ID
  captchaId?: string;
  // 邀请码（如果有）
  inviteCode?: string;
}

/**
 * 登录API类
 */
class LoginAPI {
  /**
   * 用户登录
   * @param params 登录参数
   * @returns 登录结果，包含token等信息
   */
  login(params: LoginParams): Promise<WebResponse<LoginResponse>> {
    return http.post<LoginResponse, LoginParams>('/api/auth/login', params);
  }

  /**
   * 获取验证码
   * @returns 验证码信息
   */
  getCaptcha(): Promise<WebResponse<CaptchaResponse>> {
    return http.get<CaptchaResponse>('/api/auth/captcha');
  }

  /**
   * 用户注册
   * @param params 注册参数
   * @returns 注册结果
   */
  register(params: RegisterParams): Promise<WebResponse<LoginResponse>> {
    return http.post<LoginResponse, RegisterParams>('/api/auth/register', params);
  }

  /**
   * 退出登录
   * @returns 退出登录结果
   */
  logout(): Promise<WebResponse<null>> {
    return http.post<null>('/api/auth/logout');
  }

  /**
   * 发送重置密码验证码
   * @param email 用户邮箱
   * @returns 发送结果
   */
  sendResetCode(email: string): Promise<WebResponse<{ sent: boolean }>> {
    return http.post<{ sent: boolean }>('/api/auth/reset-password/code', { email });
  }

  /**
   * 重置密码
   * @param params 重置密码参数
   * @returns 重置结果
   */
  resetPassword(params: {
    email: string;
    code: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<WebResponse<{ success: boolean }>> {
    return http.post<{ success: boolean }>('/api/auth/reset-password', params);
  }
}

// 导出登录API实例
export const loginAPI = new LoginAPI();
