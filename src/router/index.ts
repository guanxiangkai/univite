import {createRouter} from 'uni-mini-router';
import pagesJson from '@/pages.json';
import parsePages from 'uni-parse-pages';
import {type Route} from '@/types/router/router';


// 自动解析pages.json
const index = parsePages(pagesJson);

// 添加自定义路由元信息
const customRoutes: Route[] = [
  {
    path: '/pages/home/index',
    name: 'home',
    meta: {
      title: '首页',
      isTabPage: true
    }
  },
  {
    path: '/pages/user/index',
    name: 'user',
    meta: {
      title: '用户中心',
      isTabPage: true
    }
  },
  {
    path: '/pages/login/index',
    name: 'login',
    meta: {
      title: '登录页',
      isAuth: false
    }
  }
];

// 合并路由配置
const routes = index.map((route) => {
  const customRoute = customRoutes.find((item) => item.path === route.path);
  return {...route, ...customRoute};
});

const router = createRouter({
  routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 可以在这里进行登录验证等逻辑
  next();
});

// 全局后置钩子
router.afterEach((to, from) => {
  console.log('路由跳转完成', to, from);
});

export default router;
