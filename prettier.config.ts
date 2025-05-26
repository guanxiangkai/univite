/**
 * Prettier 配置文件
 *
 * 该文件定义了项目的代码格式化规则，确保团队代码风格一致
 * 文档参考: https://prettier.io/docs/en/options.html
 */

// 导入 Prettier 配置类型
import type {Config} from 'prettier'

/**
 * Prettier 配置对象
 * 自定义代码格式化的各种规则
 */
const config: Config = {
  // 行尾不加分号
  semi: false,

  // 使用单引号而非双引号
  singleQuote: true,

  // 每行代码最大长度
  printWidth: 100,

  // 使用 2 个空格缩进
  tabWidth: 2,

  // 不使用 tab 缩进
  useTabs: false,

  // 对象花括号内部添加空格
  bracketSpacing: true,

  // 箭头函数只有一个参数时也使用括号
  arrowParens: 'always',

  // 行尾使用 LF 换行符
  endOfLine: 'lf',

  // Vue 文件中的 script 和 style 标签内部缩进
  vueIndentScriptAndStyle: false,

  // 多行数组、对象最后一项添加逗号
  trailingComma: 'es5',

  // HTML 标签属性换行规则
  htmlWhitespaceSensitivity: 'css',
}

export default config
