/**
 * 工具集统一导出
 */
// 汇总成统一对象（可选，便于解构调用）
import * as Http from './http'
import * as Router from './router'
import * as Stores from './stores'

export const Utils = {
  Http,
  Router,
  Stores
}
