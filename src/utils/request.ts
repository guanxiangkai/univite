import type {ApiResponse, RequestMethod, RequestOptions} from '@/types/request';
import {useUserStore} from '@/store/user';
import {refreshToken, reLoginByWechat} from '@/api/user/login.ts';

const BASE_URL = import.meta.env.VITE_UPLOAD_BASEURL;
const TIMEOUT = Number(import.meta.env.VITE_REQUEST_TIMEOUT);
const CONTENT_TYPE = import.meta.env.VITE_CONTENT_TYPE;
const SHOW_LOADING_DEFAULT = import.meta.env.VITE_SHOW_LOADING === 'true';

export async function request<T = Map<String, String>>(
  method: RequestMethod,
  {url, data = {}}: RequestOptions
): Promise<ApiResponse<T>> {
  const userStore = useUserStore();
  const token = userStore.token;

  const header: Record<string, string> = {'Content-Type': CONTENT_TYPE};
  if (token) header['Authorization'] = `Bearer ${token}`;

  if (data.requestId) {
    header.requestId = data.requestId;
    delete data.requestId;
  }

  if (SHOW_LOADING_DEFAULT) await uni.showLoading({title: '加载中...', mask: true});

  return new Promise<ApiResponse<T>>((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method,
      data,
      header,
      timeout: TIMEOUT,
      async success(res) {
        if (SHOW_LOADING_DEFAULT) uni.hideLoading();

        const responseData = res.data as ApiResponse<T>; // 强制类型转换

        if (responseData && typeof responseData === 'object' && 'code' in responseData) {

          if (responseData.code === 401) {
            const refresh = await refreshToken();

            if (refresh) {
              try {
                const retryRes = await request<T>(method, {url, data});
                resolve(retryRes);
                return;
              } catch (err) {
                reject(err);
                return;
              }
            } else {
              const loginResult = await confirmLogin();

              if (loginResult) {
                try {
                  const retryLoginRes = await request<T>(method, {url, data});
                  resolve(retryLoginRes);
                } catch (e) {
                  reject(e);
                }
              } else {
                reject(new Error('登录失败，请重新尝试'));
              }
              return;
            }
          }
          resolve(responseData); // 这里直接返回ApiResponse了
        } else {
          // 数据格式不符合你的预期
          reject(new Error('接口返回的数据格式异常'));
        }
      },
    });
  });
}


const confirmLogin = async () => {
  const {confirm} = await uni.showModal({
    title: '登录',
    content: '是否允许使用微信登录？',
    cancelText: '取消',
    confirmText: '确定'
  });

  if (confirm) {
    return reLoginByWechat();
  } else {
    throw new Error('用户取消了微信登录');
  }
};

// 常见请求方法封装导出
export const get = <T = Map<String, String>>(options: RequestOptions) => request<T>('GET', options);
export const post = <T = Map<String, String>>(options: RequestOptions) => request<T>('POST', options);
export const put = <T = Map<String, String>>(options: RequestOptions) => request<T>('PUT', options);
export const del = <T = Map<String, String>>(options: RequestOptions) => request<T>('DELETE', options);
