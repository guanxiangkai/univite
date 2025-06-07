import {faker} from '@faker-js/faker/locale/zh_CN';

// 模拟通用数据
export default [
  {
    url: '/api/common/config',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取成功',
        data: {
          appName: 'UniVite',
          appLogo: faker.image.url(),
          appVersion: '1.0.0',
          aboutUs: faker.lorem.paragraphs(3),
          privacyPolicy: faker.lorem.paragraphs(5),
          userAgreement: faker.lorem.paragraphs(5),
        },
      };
    },
  },
  {
    url: '/api/common/version',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取成功',
        data: {
          version: '1.0.0',
          isForceUpdate: false,
          updateContent: faker.lorem.paragraphs(2),
          downloadUrl: faker.internet.url(),
        },
      };
    },
  },
  {
    url: '/api/common/regions',
    method: 'get',
    response: () => {
      // 生成模拟的省市区数据
      const regions = Array.from({length: 10}).map(() => {
        const province = {
          code: faker.string.numeric(6),
          name: faker.location.state(),
          children: Array.from({length: 5}).map(() => {
            const city = {
              code: faker.string.numeric(6),
              name: faker.location.city(),
              children: Array.from({length: 3}).map(() => ({
                code: faker.string.numeric(6),
                name: faker.location.county(),
              })),
            };
            return city;
          }),
        };
        return province;
      });

      return {
        code: 200,
        message: '获取成功',
        data: regions,
      };
    },
  },
  {
    url: '/api/common/send-sms-code',
    method: 'post',
    response: ({body}) => {
      if (body.mobile) {
        return {
          code: 200,
          message: '验证码发送成功',
          data: {
            expireTime: 300, // 验证码有效期（秒）
          },
        };
      }
      return {
        code: 400,
        message: '手机号不能为空',
        data: null,
      };
    },
  },
];
