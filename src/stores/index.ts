/**
 * Pinia 状态管理初始化
 *
 * 创建 Pinia 实例并配置持久化插件
 * 支持 localStorage 和 sessionStorage 两种存储方式
 */

// 导入 Pinia 核心 API
import {createPinia} from 'pinia';
// 导入持久化插件创建函数
import {createPersistedStatePlugin} from 'pinia-plugin-persistedstate-2';

/**
 * 创建全局 Pinia 实例
 * 用于管理应用中的所有状态存储
 */
const pinia = createPinia();

/**
 * 创建会话存储持久化插件
 * 页面刷新后数据保留，但关闭浏览器后数据丢失
 */
const sessionStoragePlugin = createPersistedStatePlugin({
  storage: sessionStorage, // 使用浏览器会话存储
});

/**
 * 创建本地存储持久化插件
 * 数据长期保存，即使关闭浏览器后数据仍然存在
 */
const localStoragePlugin = createPersistedStatePlugin({
  storage: localStorage, // 使用浏览器本地存储
});

// 将持久化插件注册到 Pinia 实例
pinia.use(sessionStoragePlugin);
pinia.use(localStoragePlugin);

// 导出 Pinia 实例供应用使用
export default pinia;
