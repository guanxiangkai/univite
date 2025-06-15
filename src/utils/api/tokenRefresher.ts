/**
 * 刷新Token API实现
 * 用于处理Token过期时的刷新操作
 */
import type { WebResponse, TokenState } from '@/types';

/**
 * 刷新Token接口
 * @param refreshToken 当前的刷新令牌
 * @returns Promise<TokenState> 返回新的令牌信息
 */
export async function refreshTokenAPI(refreshToken: string): Promise<TokenState> {
  // 这里应该调用真实的刷新Token接口
  // 以下为示例实现，实际项目中需要替换为真实接口调用
  return new Promise<TokenState>((resolve, reject) => {
    // 显示加载提示
    uni.showLoading({
      title: '重新登录中',
      mask: true
    });

    uni.request({
      url: '/api/auth/refresh', // 替换为实际的刷新Token接口
      method: 'POST',
      data: { refreshToken },
      success(res) {
        // 假设接口返回格式为 WebResponse<TokenState>
        const response = res.data as WebResponse<TokenState>;
        if (response.code === 0 && response.data) {
          // 为TokenState添加计算属性
          const tokenData = response.data;

          // 添加自定义属性
          Object.defineProperties(tokenData, {
            isExpired: {
              get: function() {
                // 当前时间戳（毫秒）
                const now = Date.now();
                // 判断是否已过期（预留30秒缓冲）
                return now >= (this.expiresAt - 30000);
              }
            },
            authHeader: {
              get: function() {
                return `${this.tokenType} ${this.accessToken}`;
              }
            }
          });

          resolve(tokenData);
        } else {
          reject(new Error(response.message || '刷新Token失败'));
        }
      },
      fail() {
        reject(new Error('网络错误，刷新Token失败'));
      },
      complete() {
        // 隐藏加载提示
        uni.hideLoading();
      }
    });
  });
}
