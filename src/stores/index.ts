/**
 * Pinia 状态管理初始化
 *
 * 创建 Pinia 实例并配置持久化插件
 * 支持小程序和H5多端兼容的存储方式
 */
// 导入 Pinia 核心 API
import { createPinia } from 'pinia';
// 导入持久化插件创建函数
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';
// 导入存储工具类
import { Storage } from '@/utils/stores/storage.ts';

/**
 * 创建全局 Pinia 实例
 * 用于管理应用中的所有状态存储
 */
const pinia = createPinia();

/**
 * 创建持久化插件
 * 使用Storage工具类实现多端兼容的存储机制
 */
const persistedStatePlugin = createPersistedStatePlugin({
  storage: Storage, // 使用存储工具类
});

// 将持久化插件注册到 Pinia 实例
pinia.use(persistedStatePlugin);

// 导出 Pinia 实例供应用使用
export default pinia;

export * from './api';
export * from './config';
export * from './user';
