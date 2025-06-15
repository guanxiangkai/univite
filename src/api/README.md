# API 接口模块

## 目录结构

```
src/api/
├── index.ts              # API 统一导出文件
├── README.md             # API 模块说明文档
├── common/               # 通用 API
│   └── common.ts         # 通用接口定义与实现
├── login/                # 登录认证相关 API
│   └── login.ts          # 登录接口定义与实现
└── user/                 # 用户相关 API
    └── user.ts           # 用户接口定义与实现
```

## 使用方法

### 引入 API

```typescript
// 方法一：按需引入特定 API
import { userAPI } from '@/api/user/user';

// 方法二：从统一导出引入（推荐）
import { userAPI, loginAPI } from '@/api';
```

### 调用 API

```typescript
// 获取用户信息
userAPI.getCurrentUser().then(response => {
  if (response.code === 0) {
    const userInfo = response.data;
    // 处理用户信息
    console.log(userInfo);
  } else {
    // 处理错误
    console.error(response.message);
  }
}).catch(error => {
  console.error('请求失败', error);
});

// 使用 async/await
async function fetchUserData() {
  try {
    const response = await userAPI.getCurrentUser();
    if (response.code === 0) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error('获取用户信息失败', error);
    return null;
  }
}
```

## API 接口规范

1. 所有 API 请求返回 `Promise<WebResponse<T>>`，其中 `T` 为具体的响应数据类型
2. 请求参数和响应数据都应该定义明确的接口类型
3. API 类应按功能模块进行组织，每个模块一个文件
4. 推荐使用类的形式组织 API，便于扩展和维护

## 添加新的 API 模块

1. 在 `src/api/` 下创建新的模块目录和文件
2. 定义接口类型和 API 类
3. 在 `src/api/index.ts` 中导出新模块

## 请求配置

请求超时、请求头等配置可以在 `src/utils/api/http.ts` 中进行全局配置，也可以在具体 API 调用时传入配置参数。
