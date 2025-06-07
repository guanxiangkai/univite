/**
 * 主题管理工具
 */

// 是否深色模式
let isDark = false;

// 切换深色模式
export function toggleDarkMode() {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  uni.setStorageSync('theme', isDark ? 'dark' : 'light');
  return isDark;
}

// 获取当前模式
export function getDarkMode() {
  return isDark;
}

// 初始化主题
export function initTheme() {
  // 获取缓存的主题设置
  const theme = uni.getStorageSync('theme');
  isDark = theme === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
}
