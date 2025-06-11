/**
 * 工具集统一导出
 */
// 导出所有工具方法
export * as Http from './http'
export * as Router from './router'
export * as Storage from './stores'

// 汇总成统一对象（可选，便于解构调用）
import * as Http from './http'
import * as Router from './router'
import * as Stores from './stores'

export const Utils = {
  Http,
  Router,
  Stores
}

// 导出所有类型（假设每个模块都已经 export 了类型，可以这样一次性 re-export）
export type * from './http'
export type * from './router'
export type * from './stores'

