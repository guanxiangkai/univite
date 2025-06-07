import {createI18n} from 'vue-i18n';

// 引入语言包
const messages = {
  'zh-CN': {
    common: {
      confirm: '确认',
      cancel: '取消',
      submit: '提交',
      loading: '加载中...',
      success: '成功',
      error: '错误',
      warning: '警告',
      info: '提示',
    },
    validation: {
      required: '{field}不能为空',
      email: '请输入有效的电子邮件地址',
      phone: '请输入有效的手机号码',
      minLength: '{field}长度不能小于{min}个字符',
      maxLength: '{field}长度不能大于{max}个字符',
    },
  },
  'en-US': {
    common: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      submit: 'Submit',
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
    },
    validation: {
      required: '{field} is required',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
      minLength: '{field} must be at least {min} characters',
      maxLength: '{field} must be less than {max} characters',
    },
  },
};

// 检测系统语言
const getSystemLanguage = (): string => {
  let systemLanguage = uni.getSystemInfoSync().language || 'zh-CN';
  // 对语言进行标准化处理
  if (systemLanguage.includes('zh')) {
    systemLanguage = 'zh-CN';
  } else {
    systemLanguage = 'en-US';
  }
  return systemLanguage;
};

// 创建 i18n 实例
export const i18n = createI18n({
  locale: getSystemLanguage(),
  fallbackLocale: 'zh-CN',
  messages,
  legacy: false,
});

/**
 * 国际化工具类
 */
export class I18nUtils {
  /**
   * 切换语言
   * @param locale 语言代码
   */
  static setLocale(locale: string): void {
    if (messages[locale]) {
      i18n.global.locale.value = locale;
      // 保存语言设置到本地存储
      uni.setStorageSync('locale', locale);
    } else {
      console.warn(`Unsupported locale: ${locale}`);
    }
  }

  /**
   * 获取当前语言
   * @returns 当前语言代码
   */
  static getLocale(): string {
    return i18n.global.locale.value as string;
  }

  /**
   * 获取本地化文本
   * @param key 文本键值
   * @param params 参数
   * @returns 本地化文本
   */
  static t(key: string, params?: Record<string, any>): string {
    return i18n.global.t(key, params) as string;
  }
}
