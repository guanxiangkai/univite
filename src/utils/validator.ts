import {helpers} from '@vuelidate/validators';

/**
 * 表单验证工具类
 */
export class ValidatorUtils {
  /**
   * 必填验证
   * @param message 错误信息
   * @returns 验证规则
   */
  static required(message = '此字段不能为空') {
    return helpers.withMessage(message, (value: any) => {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    });
  }

  /**
   * 最小长度验证
   * @param min 最小长度
   * @param message 错误信息
   * @returns 验证规则
   */
  static minLength(min: number, message = `长度不能小于${min}个字符`) {
    return helpers.withMessage(message, (value: string) => {
      if (!value) return true; // 如果为空，由 required 规则处理
      return value.length >= min;
    });
  }

  /**
   * 最大长度验证
   * @param max 最大长度
   * @param message 错误信息
   * @returns 验证规则
   */
  static maxLength(max: number, message = `长度不能超过${max}个字符`) {
    return helpers.withMessage(message, (value: string) => {
      if (!value) return true; // 如果为空，由 required 规则处理
      return value.length <= max;
    });
  }

  /**
   * 手机号验证
   * @param message 错误信息
   * @returns 验证规则
   */
  static phone(message = '请输入有效的手机号码') {
    return helpers.withMessage(message, (value: string) => {
      if (!value) return true; // 如果为空，由 required 规则处理
      return /^1[3-9]\d{9}$/.test(value);
    });
  }

  /**
   * 邮箱验证
   * @param message 错误信息
   * @returns 验证规则
   */
  static email(message = '请输入有效的邮箱地址') {
    return helpers.withMessage(message, (value: string) => {
      if (!value) return true; // 如果为空，由 required 规则处理
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);
    });
  }

  /**
   * 数字验证
   * @param message 错误信息
   * @returns 验证规则
   */
  static numeric(message = '请输入有效的数字') {
    return helpers.withMessage(message, (value: string) => {
      if (!value) return true; // 如果为空，由 required 规则处理
      return /^\d+$/.test(value);
    });
  }

  /**
   * 数值范围验证
   * @param min 最小值
   * @param max 最大值
   * @param message 错误信息
   * @returns 验证规则
   */
  static between(min: number, max: number, message = `数值必须在${min}到${max}之间`) {
    return helpers.withMessage(message, (value: number) => {
      if (value === null || value === undefined) return true; // 如果为空，由 required 规则处理
      const num = Number(value);
      return !isNaN(num) && num >= min && num <= max;
    });
  }

  /**
   * URL 验证
   * @param message 错误信息
   * @returns 验证规则
   */
  static url(message = '请输入有效的URL地址') {
    return helpers.withMessage(message, (value: string) => {
      if (!value) return true; // 如果为空，由 required 规则处理
      try {
        new URL(value);
        return true;
      } catch (e) {
        return false;
      }
    });
  }

  /**
   * 身份证号验证
   * @param message 错误信息
   * @returns 验证规则
   */
  static idCard(message = '请输入有效的身份证号码') {
    return helpers.withMessage(message, (value: string) => {
      if (!value) return true; // 如果为空，由 required 规则处理
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
    });
  }

  /**
   * 密码强度验证（至少包含大小写字母和数字）
   * @param message 错误信息
   * @returns 验证规则
   */
  static strongPassword(message = '密码需包含大小写字母和数字，长度至少8位') {
    return helpers.withMessage(message, (value: string) => {
      if (!value) return true; // 如果为空，由 required 规则处理
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
    });
  }
}

// 使用示例
/*
import { useVuelidate } from '@vuelidate/core';
import { ValidatorUtils } from '@/utils/validator';

// 组件中使用
const state = reactive({
  username: '',
  email: '',
  phone: '',
  password: ''
});

const rules = {
  username: {
    required: ValidatorUtils.required('用户名不能为空'),
    minLength: ValidatorUtils.minLength(3, '用户名长度不能小于3个字符')
  },
  email: {
    required: ValidatorUtils.required('邮箱不能为空'),
    email: ValidatorUtils.email()
  },
  phone: {
    required: ValidatorUtils.required('手机号不能为空'),
    phone: ValidatorUtils.phone()
  },
  password: {
    required: ValidatorUtils.required('密码不能为空'),
    strongPassword: ValidatorUtils.strongPassword()
  }
};

const v$ = useVuelidate(rules, state);
*/
