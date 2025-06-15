/**
 * 工具集统一导出
 */
// 汇总成统一对象（可选，便于解构调用）
import * as login from './login'
import * as user from './user'

export const Api = {
  login,
  user
}
