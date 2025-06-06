import {defineStore} from 'pinia';
import type {ConfigState, PersistContext} from '@/types/pinia-persistedstate.d.ts';

/**
 * 应用全局配置存储 (微信小程序专用)
 * 用于管理用户界面偏好设置，如主题、语言等
 */
export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    // 主题设置：light 或 dark
    theme: 'light',
    // 语言设置：默认使用中文
    language: 'zh-CN',
    // 布局相关设置
    layoutSettings: {},
  }),

  getters: {
    /**
     * 是否为暗色模式
     * @returns {boolean} 是否为暗色模式
     */
    isDarkMode(): boolean {
      return this.theme === 'dark';
    }
  },

  actions: {
    /**
     * 切换主题
     * @param {('light'|'dark')} newTheme 新主题值
     */
    setTheme(newTheme: 'light' | 'dark'): void {
      this.theme = newTheme;
      // 同步微信小程序导航栏样式
      this.syncNavBarStyle();
    },

    /**
     * 设置语言
     * @param {string} lang 语言代码
     */
    setLanguage(lang: string): void {
      this.language = lang;
    },

    /**
     * 同步导航栏样式到微信小程序
     * 根据当前主题设置适合的导航栏样式
     */
    syncNavBarStyle(): void {
      // 确保在uni环境下执行
      if (typeof uni === 'undefined') return;

      // 根据主题设置导航栏前景色
      uni.setNavigationBarColor({
        frontColor: this.theme === 'dark' ? '#ffffff' : '#000000',
        backgroundColor: this.theme === 'dark' ? '#333333' : '#ffffff',
        animation: {
          duration: 300,
          timingFunc: 'easeIn'
        }
      });
    },

    /**
     * 检测系统主题
     * 用于自动适应系统暗色/亮色模式
     */
    detectSystemTheme(): void {
      // 确保在uni环境下执行
      if (typeof uni === 'undefined') return;

      // 获取系统信息
      uni.getSystemInfo({
        success: (res) => {
          // 检测系统是否为暗色模式
          if (res.theme === 'dark') {
            this.theme = 'dark';
          }
        }
      });
    }
  },

  // 持久化配置 (微信小程序适配)
  persist: {
    // 存储键名
    key: 'wx_app_config',
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
