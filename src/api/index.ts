import {UserApi} from './modules/user';
import {CommonApi} from './modules/common';
import apiHttp from './http';

// 导出所有API接口
export {UserApi, CommonApi};

// 导出HTTP实例
export {apiHttp};

// 统一导出所有API
export const Api = {
  User: UserApi,
  Common: CommonApi,
};

export default Api;
