import {defineConfig, presetAttributify, presetIcons, presetUno} from 'unocss'

export default defineConfig({
  shortcuts: {
    // 常用的flex布局
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-start': 'flex items-center justify-start',
    'flex-end': 'flex items-center justify-end',
    'flex-col-center': 'flex flex-col items-center justify-center',
    'flex-col-between': 'flex flex-col items-center justify-between',
    'flex-col-start': 'flex flex-col items-center justify-start',
    'flex-col-end': 'flex flex-col items-center justify-end',

    // 常用字体大小
    'text-small': 'text-xs',
    'text-normal': 'text-sm',
    'text-large': 'text-base',
    'text-xlarge': 'text-lg',
    'text-xxlarge': 'text-xl',

    // 自定义边框样式
    'border-base': 'border border-gray-200',
    'border-bottom': 'border-b border-b-gray-200',
    'border-top': 'border-t border-t-gray-200',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  theme: {
    colors: {
      primary: 'var(--wd-primary, #4D80F0)',
      success: 'var(--wd-success, #34d19d)',
      warning: 'var(--wd-warning, #f0883a)',
      danger: 'var(--wd-danger, #fa4350)',
      info: 'var(--wd-info, #909399)',
    },
  },
  safelist: 'bg-primary text-primary border-primary bg-success text-success border-success bg-warning text-warning border-warning bg-danger text-danger border-danger bg-info text-info border-info'.split(' '),
})
