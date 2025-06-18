/**
 * 日志工具
 * 在小程序中统一管理日志输出，支持不同环境配置
 */

// 日志级别
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// 日志配置
interface LoggerConfig {
  level: LogLevel;
  prefix?: string;
  showTime?: boolean;
  disabled?: boolean;
  maxLogLength?: number;
}

// 默认配置
const defaultConfig: LoggerConfig = {
  level: 'info', // 默认日志级别
  prefix: '[小程序]', // 日志前缀
  showTime: true, // 是否显示时间
  disabled: import.meta.env.VITE_API_LOG !== 'true', // 是否禁用日志
  maxLogLength: 1000, // 日志最大长度
};

// 日志级别权重
const LEVEL_WEIGHTS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * 日志类
 */
class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * 设置配置
   */
  setConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * 是否应该记录该级别的日志
   */
  private shouldLog(level: LogLevel): boolean {
    if (this.config.disabled) return false;
    return LEVEL_WEIGHTS[level] >= LEVEL_WEIGHTS[this.config.level];
  }

  /**
   * 格式化日志消息
   */
  private formatMessage(level: LogLevel, message: unknown): string {
    const parts: string[] = [];

    // 添加前缀
    if (this.config.prefix) {
      parts.push(this.config.prefix);
    }

    // 添加时间
    if (this.config.showTime) {
      const now = new Date();
      const timeStr = now.toISOString().split('T')[1].substring(0, 12);
      parts.push(`[${timeStr}]`);
    }

    // 添加日志级别
    parts.push(`[${level.toUpperCase()}]`);

    // 拼接消息前缀
    const prefix = parts.join(' ');

    // 处理对象类型消息
    if (typeof message === 'object') {
      try {
        const jsonStr = JSON.stringify(message, null, 2);
        return `${prefix} ${jsonStr}`;
      } catch (e) {
        return `${prefix} [无法序列化的对象]`;
      }
    }

    return `${prefix} ${message}`;
  }

  /**
   * 截断过长的日志
   */
  private truncateLog(message: string): string {
    if (message.length <= this.config.maxLogLength!) {
      return message;
    }
    return message.substring(0, this.config.maxLogLength!) + '... [日志过长已截断]';
  }

  /**
   * 调试日志
   */
  debug(message: unknown, ...args: unknown[]): void {
    if (!this.shouldLog('debug')) return;
    const formattedMessage = this.formatMessage('debug', message);
    console.debug(this.truncateLog(formattedMessage), ...args);
  }

  /**
   * 信息日志
   */
  info(message: unknown, ...args: unknown[]): void {
    if (!this.shouldLog('info')) return;
    const formattedMessage = this.formatMessage('info', message);
    console.info(this.truncateLog(formattedMessage), ...args);
  }

  /**
   * 警告日志
   */
  warn(message: unknown, ...args: unknown[]): void {
    if (!this.shouldLog('warn')) return;
    const formattedMessage = this.formatMessage('warn', message);
    console.warn(this.truncateLog(formattedMessage), ...args);
  }

  /**
   * 错误日志
   */
  error(message: unknown, ...args: unknown[]): void {
    if (!this.shouldLog('error')) return;
    const formattedMessage = this.formatMessage('error', message);
    console.error(this.truncateLog(formattedMessage), ...args);
  }

  /**
   * 创建子日志记录器
   */
  createSubLogger(prefix: string): Logger {
    return new Logger({
      ...this.config,
      prefix: this.config.prefix ? `${this.config.prefix}:${prefix}` : prefix,
    });
  }
}

// 创建默认日志实例
const logger = new Logger();

export default logger;
