/**
 * Pinia 持久化插件类型定义文件
 *
 * 为 pinia-plugin-persistedstate-2 插件提供类型支持
 * 包含状态存储相关的类型定义和接口
 */

// 导入 Pinia 基础类型
import 'pinia'

/**
 * 存储记录类型
 * 用于表示通用的键值对数据结构
 */
export type StoreRecord = Record<string, unknown>;

/**
 * 存储属性键类型
 * 用于索引存储对象的属性
 */
export type StorePropertyKey = string;

/**
 * 持久化上下文接口
 * 在持久化钩子函数中提供存储的上下文信息
 */
export interface PersistContext {
  /**
   * 存储对象
   */
  store: {
    /** 存储的唯一标识符 */
    $id: string;
    /** 存储的其他属性 */
    [key: StorePropertyKey]: unknown;
  };
}

/**
 * 用户状态接口
 * 定义用户信息存储的数据结构
 */
export interface UserState {
  /** 用户认证令牌 */
  token: string;
  /** 用户偏好设置 */
  preferences: StoreRecord;
  /**
   * 用户基本信息
   */
  profile: {
    /** 用户名 */
    username: string;
    /** 头像URL */
    avatar: string;
    /** 电子邮箱 */
    email: string;
  };
}

/**
 * 配置状态接口
 * 定义应用配置信息的数据结构
 */
export interface ConfigState {
  /** 主题设置：亮色或暗色 */
  theme: 'light' | 'dark';
  /** 语言设置 */
  language: string;
  /** 布局相关配置 */
  layoutSettings: StoreRecord;
}

/**
 * 扩展 Pinia 存储选项接口
 * 为 Pinia 添加持久化相关的配置选项
 */
declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    /**
     * 持久化配置选项
     * 用于配置状态的持久化行为
     */
    persist?: {
      /**
       * 存储键名
       * 用于在存储介质中保存状态的键名
       */
      key?: string;

      /**
       * 存储对象
       * 用于指定使用哪种存储介质，如 localStorage 或 sessionStorage
       */
      storage?: Storage;

      /**
       * 需要持久化的状态路径
       * 指定哪些状态属性需要被持久化，不指定则持久化所有状态
       */
      paths?: string[];

      /**
       * 恢复前的钩子函数
       * 在从存储中恢复状态之前调用
       * @param context 持久化上下文对象
       */
      beforeRestore?: (context: PersistContext) => void;

      /**
       * 恢复后的钩子函数
       * 在从存储中恢复状态之后调用
       * @param context 持久化上下文对象
       */
      afterRestore?: (context: PersistContext) => void;
    };
  }
}
