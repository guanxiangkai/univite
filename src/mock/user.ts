import {faker} from '@faker-js/faker/locale/zh_CN';

// 模拟用户数据
export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({body}) => {
      // 简单的用户名密码验证
      if (body.username && body.password) {
        return {
          code: 200,
          message: '登录成功',
          data: {
            token: faker.string.alphanumeric(32),
            userInfo: {
              id: faker.string.uuid(),
              username: body.username,
              nickname: faker.person.fullName(),
              avatar: faker.image.avatar(),
            },
          },
        };
      }
      return {
        code: 400,
        message: '用户名或密码错误',
        data: null,
      };
    },
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取成功',
        data: {
          id: faker.string.uuid(),
          username: faker.internet.userName(),
          nickname: faker.person.fullName(),
          avatar: faker.image.avatar(),
          role: 'user',
          permissions: ['user:view', 'user:edit'],
        },
      };
    },
  },
  {
    url: '/api/user/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '退出成功',
        data: null,
      };
    },
  },
];
