import {createProdMockServer} from 'vite-plugin-mock/client';
import userMock from './user';
import commonMock from './common';

// 导出所有Mock数据
export function setupProdMockServer() {
  createProdMockServer([...userMock, ...commonMock]);
}

// 导出所有Mock模块（开发环境使用）
export default [
  ...userMock,
  ...commonMock,
];
