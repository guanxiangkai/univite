import {defineUniPages} from '@uni-helper/vite-plugin-uni-pages'
import {name} from './package.json'

export default defineUniPages({

  // 全局样式配置
  globalStyle: {
    navigationBarTitleText: name,
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    backgroundColor: '#ffffff',
    backgroundTextStyle: 'light',
    enablePullDownRefresh: false,
    navigationStyle: 'default',
  },

  // 页面配置
  pages: [
    {
      path: 'pages/login/index',
      style: {
        navigationBarTitleText: '用户登录'
      }
    }
  ],

  tabBar: {
    color: '#999999',
    selectedColor: '#5474f2',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        iconPath: '/assets/tabbar/home_default.png',
        selectedIconPath: '/assets/tabbar/home_active.png',
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        iconPath: '/assets/tabbar/user_default.png',
        selectedIconPath: '/assets/tabbar/user_active.png',
        pagePath: 'pages/user/index',
        text: '我的'
      }
    ]
  }
})
