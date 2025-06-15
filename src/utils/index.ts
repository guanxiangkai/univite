/**
 * 工具集统一导出
 */
// 汇总成统一对象（可选，便于解构调用）
import * as api from './api'
import * as stores from './stores'

export const Utils = {
  api,
  stores
}
