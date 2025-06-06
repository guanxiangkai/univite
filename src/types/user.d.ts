// 定义用户状态的类型接口
export interface UserState {
  token: string;         // 用户访问令牌
  refreshToken: string;  // 刷新令牌，用于重新获取token
  userInfo: Record<string, any> | null; // 用户详细信息，可根据实际项目情况调整
}
