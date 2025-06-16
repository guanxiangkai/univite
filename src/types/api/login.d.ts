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
