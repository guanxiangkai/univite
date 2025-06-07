import {addDays, addMonths, differenceInDays, format, formatDistance, isValid, parseISO} from 'date-fns';
import {enUS, zhCN} from 'date-fns/locale';
import {formatInTimeZone, utcToZonedTime, zonedTimeToUtc} from 'date-fns-tz';
import {I18nUtils} from './i18n';

// 支持的日期格式
type DateFormat =
  'yyyy-MM-dd'
  | 'yyyy/MM/dd'
  | 'yyyy-MM-dd HH:mm:ss'
  | 'HH:mm:ss'
  | 'yyyy年MM月dd日'
  | 'MM月dd日'
  | string;

/**
 * 时间工具类
 */
export class DateUtils {
  /**
   * 格式化日期
   * @param date 日期对象、时间戳或 ISO 字符串
   * @param formatStr 格式化字符串，默认为 'yyyy-MM-dd'
   * @returns 格式化后的日期字符串
   */
  static formatDate(date: Date | number | string, formatStr: DateFormat = 'yyyy-MM-dd'): string {
    if (!date) return '';

    try {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(parsedDate)) return '';

      return format(parsedDate, formatStr, {locale: this.getLocale()});
    } catch (error) {
      console.error('日期格式化错误:', error);
      return '';
    }
  }

  /**
   * 按时区格式化日期
   * @param date 日期对象、时间戳或 ISO 字符串
   * @param timeZone 时区，默认为 'Asia/Shanghai'
   * @param formatStr 格式化字符串，默认为 'yyyy-MM-dd HH:mm:ss'
   * @returns 格式化后的日期字符串
   */
  static formatWithTimeZone(
    date: Date | number | string,
    timeZone = 'Asia/Shanghai',
    formatStr: DateFormat = 'yyyy-MM-dd HH:mm:ss'
  ): string {
    if (!date) return '';

    try {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(parsedDate)) return '';

      return formatInTimeZone(parsedDate, timeZone, formatStr, {locale: this.getLocale()});
    } catch (error) {
      console.error('时区日期格式化错误:', error);
      return '';
    }
  }

  /**
   * 获取相对时间（如：3天前，2小时前）
   * @param date 日期对象、时间戳或 ISO 字符串
   * @param baseDate 基准日期，默认为当前时间
   * @returns 相对时间字符串
   */
  static formatRelative(date: Date | number | string, baseDate: Date | number = new Date()): string {
    if (!date) return '';

    try {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(parsedDate)) return '';

      return formatDistance(parsedDate, baseDate, {
        addSuffix: true,
        locale: this.getLocale(),
      });
    } catch (error) {
      console.error('相对时间格式化错误:', error);
      return '';
    }
  }

  /**
   * UTC 时间转为指定时区时间
   * @param date UTC 日期对象、时间戳或 ISO 字符串
   * @param timeZone 目标时区，默认为 'Asia/Shanghai'
   * @returns 时区时间
   */
  static utcToZoned(date: Date | number | string, timeZone = 'Asia/Shanghai'): Date {
    if (!date) return new Date();

    try {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(parsedDate)) return new Date();

      return utcToZonedTime(parsedDate, timeZone);
    } catch (error) {
      console.error('UTC转时区时间错误:', error);
      return new Date();
    }
  }

  /**
   * 指定时区时间转为 UTC 时间
   * @param date 时区日期对象、时间戳或 ISO 字符串
   * @param timeZone 源时区，默认为 'Asia/Shanghai'
   * @returns UTC 时间
   */
  static zonedToUtc(date: Date | number | string, timeZone = 'Asia/Shanghai'): Date {
    if (!date) return new Date();

    try {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(parsedDate)) return new Date();

      return zonedTimeToUtc(parsedDate, timeZone);
    } catch (error) {
      console.error('时区转UTC时间错误:', error);
      return new Date();
    }
  }

  /**
   * 添加天数
   * @param date 日期对象、时间戳或 ISO 字符串
   * @param amount 添加的天数
   * @returns 新的日期对象
   */
  static addDays(date: Date | number | string, amount: number): Date {
    if (!date) return new Date();

    try {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(parsedDate)) return new Date();

      return addDays(parsedDate, amount);
    } catch (error) {
      console.error('添加天数错误:', error);
      return new Date();
    }
  }

  /**
   * 添加月份
   * @param date 日期对象、时间戳或 ISO 字符串
   * @param amount 添加的月数
   * @returns 新的日期对象
   */
  static addMonths(date: Date | number | string, amount: number): Date {
    if (!date) return new Date();

    try {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(parsedDate)) return new Date();

      return addMonths(parsedDate, amount);
    } catch (error) {
      console.error('添加月份错误:', error);
      return new Date();
    }
  }

  /**
   * 计算两个日期之间的天数差
   * @param dateLeft 第一个日期
   * @param dateRight 第二个日期
   * @returns 天数差
   */
  static diffInDays(dateLeft: Date | number | string, dateRight: Date | number | string): number {
    if (!dateLeft || !dateRight) return 0;

    try {
      const parsedDateLeft = typeof dateLeft === 'string' ? parseISO(dateLeft) : dateLeft;
      const parsedDateRight = typeof dateRight === 'string' ? parseISO(dateRight) : dateRight;

      if (!isValid(parsedDateLeft) || !isValid(parsedDateRight)) return 0;

      return differenceInDays(parsedDateLeft, parsedDateRight);
    } catch (error) {
      console.error('计算天数差错误:', error);
      return 0;
    }
  }

  /**
   * 获取当前语言环境对应的 date-fns locale
   * @returns date-fns locale 对象
   */
  private static getLocale() {
    const currentLocale = I18nUtils.getLocale();
    return currentLocale === 'zh-CN' ? zhCN : enUS;
  }
}
