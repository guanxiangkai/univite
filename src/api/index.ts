/**
 * 工具集统一导出
 */
// 汇总成统一对象（可选，便于解构调用）
import * as login from './login'
import * as user from './user'
/**
 * API模块统一导出
 * 集中导出所有API，方便统一引入
 */

// 导出登录相关API
export * from './login/login';

// 导出用户相关API
export * from './user/user';

// 导出通用API
export * from './common/common';

// 其他API模块在此导出...
export const Api = {
  login,
  user
}
