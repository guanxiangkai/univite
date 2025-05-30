import {defineStore} from 'pinia';
import type {ConfigState, PersistContext} from '@/types/pinia-persistedstate.d.ts';

/**
 * 应用全局配置存储
 * 用于管理用户界面偏好设置，如主题、语言等
 */
export const configStore = defineStore('config', {
  state: (): ConfigState => ({
    // 主题设置：light 或 dark
    theme: 'light',
    // 语言设置：默认使用中文
    language: 'zh-CN',
    // 布局相关设置
    layoutSettings: {},
  }),

  actions: {
    /**
     * 切换主题
     * @param newTheme 新主题值
     */
    setTheme(newTheme: 'light' | 'dark'): void {
      this.theme = newTheme;
    },

    /**
     * 设置语言
     * @param lang 语言代码
     */
    setLanguage(lang: string): void {
      this.language = lang;
    }
  },

  // 持久化配置
  persist: {
    // 存储键名
    key: 'app_config',
    // 使用本地存储
    storage: localStorage,
    // 只持久化主题和语言设置
    paths: ['theme', 'language'],

    // 恢复前钩子
    beforeRestore: (ctx: PersistContext) => {
      console.log(`即将恢复配置存储: ${ctx.store.$id}`);
    },
    // 恢复后钩子
    afterRestore: (ctx: PersistContext) => {
      console.log(`已恢复配置存储: ${ctx.store.$id}`);
    }
  },
});
