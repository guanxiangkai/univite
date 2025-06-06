export default {
    semi: true, // 代码末尾强制使用分号
    singleQuote: true, // 使用单引号而不是双引号
    trailingComma: 'all', // 在可能的情况下添加尾随逗号
    printWidth: 80, // 每行最大长度，超过则换行
    bracketSpacing: true, // 在对象字面量的大括号内部添加空格
    arrowParens: 'always', // 箭头函数参数括号，单个参数也添加括号
    endOfLine: 'lf', // 使用统一的 Unix 风格的换行符
    vueIndentScriptAndStyle: false, // Vue 文件中script和style标签内的代码不额外缩进
    htmlWhitespaceSensitivity: 'css', // HTML文件对于空格的敏感性保持默认(css)

    // 忽略指定文件或目录，避免格式化不必要文件，提升性能
    ignoreFiles: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/uni_modules/**',
        '**/build/**',
        '**/*.log',
        '**/*.lock',
        '**/public/**',
        '**/template/**',
    ],
};
