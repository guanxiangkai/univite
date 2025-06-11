/**
 * Pinia 持久化插件类型定义
 * 用于增强 TypeScript 的类型检查和智能提示
 */

/**
 * 持久化上下文接口
 * 在持久化过程中提供存储和恢复的上下文信息
 */
export interface PersistContext {
  // 当前存储实例
  store: any;
  // 存储选项
  options: any;
}

/**
 * 用户状态接口
 * 定义用户存储的数据结构
 */
export interface UserState {
  // 用户个人偏好设置
  preferences: Record<string, any>;
  // 用户基本信息
  profile: {
    username: string; // 用户昵称
    avatar: string;   // 用户头像
  };
}

/**
 * 系统配置状态接口
 * 定义系统全局配置的数据结构
 */
export interface ConfigState {

}

/**
 * 令牌状态接口
 * 定义认证令牌的数据结构
 */
export interface TokenState {
  // 访问令牌
  accessToken: string;
  // 刷新令牌
  refreshToken: string;
  // 过期时间戳
  expiresAt: number;
  // 令牌类型
  tokenType: string;
}
