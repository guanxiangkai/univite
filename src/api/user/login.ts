import type {ApiResponse} from '@/types/request';
import {useUserStore} from '@/store/user';

const BASE_URL = import.meta.env.VITE_UPLOAD_BASEURL;
const TIMEOUT = Number(import.meta.env.VITE_REQUEST_TIMEOUT);
const CONTENT_TYPE = import.meta.env.VITE_CONTENT_TYPE;

// 刷新token
export async function refreshToken(): Promise<boolean> {
  const userStore = useUserStore();
  try {
    const response = await uni.request({
      url: BASE_URL + '/auth/refresh-token',
      method: 'POST',
      data: {refreshToken: userStore.refreshToken},
      header: {'Content-Type': CONTENT_TYPE},
      timeout: TIMEOUT,
    });

    const result = response.data as ApiResponse<{ token: string; refreshToken: string }>;

    if (result.code === 200 && result.data.token) {
      userStore.saveToken(result.data.token, result.data.refreshToken);
      return true;
    }

    return false;
  } catch (error) {
    console.error('刷新token失败:', error);
    return false;
  }
}

// 调用微信授权登录重新获取token
export async function reLoginByWechat(): Promise<boolean> {
  const userStore = useUserStore();
  try {
    const [profileRes, loginRes] = await Promise.all([
      uni.getUserProfile({desc: '用于完善用户资料'}),
      uni.login({}),
    ]);

    if (!(loginRes.code && profileRes.userInfo)) {
      uni.showToast({title: '授权或登录失败', icon: 'error'});
      return false;
    }

    const response = await uni.request({
      url: BASE_URL + '/auth/login',
      method: 'POST',
      timeout: TIMEOUT,
      header: {'Content-Type': CONTENT_TYPE},
      data: {
        code: loginRes.code,
        userInfo: profileRes.userInfo,
      },
    });

    const result = response.data as ApiResponse<{ token: string; refreshToken: string }>;

    if (result.code === 200 && result.data.token) {
      userStore.saveToken(result.data.token, result.data.refreshToken);
      uni.showToast({title: '登录成功', icon: 'success'});
      return true;
    }

    uni.showToast({title: '登录失败', icon: 'error'});
    return false;
  } catch (error) {
    console.error('微信授权登录失败', error);
    uni.showToast({title: '登录失败，请检查网络', icon: 'error'});
    return false;
  }
}
