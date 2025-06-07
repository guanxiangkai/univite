import apiHttp from '../http';

// 用户相关API接口
export const UserApi = {
  /**
   * 用户登录
   * @param params 登录参数
   */
  login(params: { username: string; password: string }) {
    return apiHttp.post<{
      token: string;
      userInfo: {
        id: string;
        username: string;
        avatar: string;
        nickname: string;
      };
    }>('/api/user/login', params);
  },

  /**
   * 获取用户信息
   */
  getUserInfo() {
    return apiHttp.get<{
      id: string;
      username: string;
      avatar: string;
      nickname: string;
      role: string;
      permissions: string[];
    }>('/api/user/info');
  },

  /**
   * 修改用户信息
   * @param params 用户信息
   */
  updateUserInfo(params: { nickname?: string; avatar?: string }) {
    return apiHttp.put('/api/user/info', params);
  },

  /**
   * 修改密码
   * @param params 密码信息
   */
  changePassword(params: { oldPassword: string; newPassword: string }) {
    return apiHttp.post('/api/user/change-password', params);
  },

  /**
   * 上传头像
   * @param filePath 文件路径
   */
  uploadAvatar(filePath: string) {
    return apiHttp.uploadFile(
      '/api/user/avatar/upload',
      filePath,
      'avatar',
      {},
      {showLoading: true, loadingText: '上传中...'}
    );
  },

  /**
   * 用户登出
   */
  logout() {
    return apiHttp.post('/api/user/logout');
  },
};
