import {useDebounceFn, useThrottleFn} from '@vueuse/core';

/**
 * 防抖和节流工具类
 */
export class DebounceFnUtils {
  /**
   * 创建防抖函数
   * @param fn 需要防抖的函数
   * @param wait 等待时间（毫秒），默认 300ms
   * @returns 防抖处理后的函数
   */
  static debounce<T extends (...args: any[]) => any>(fn: T, wait = 300) {
    return useDebounceFn(fn, wait);
  }

  /**
   * 创建节流函数
   * @param fn 需要节流的函数
   * @param wait 等待时间（毫秒），默认 300ms
   * @returns 节流处理后的函数
   */
  static throttle<T extends (...args: any[]) => any>(fn: T, wait = 300) {
    return useThrottleFn(fn, wait);
  }
}

// 示例使用
/*
import { DebounceFnUtils } from '@/utils/debounce';

// 在组件中使用
const handleSearch = DebounceFnUtils.debounce((value) => {
  // 搜索逻辑
  console.log('搜索:', value);
}, 500);

// 节流示例
const handleScroll = DebounceFnUtils.throttle(() => {
  // 滚动处理逻辑
  console.log('滚动事件');
}, 200);
*/
