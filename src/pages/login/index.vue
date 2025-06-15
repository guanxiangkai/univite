<script lang="ts" setup>
import {ref} from 'vue';
import {onLoad} from '@dcloudio/uni-app';

// 用户登录表单数据
const loginForm = ref({
  username: '',
  password: ''
});

// 表单验证错误信息
const errors = ref({
  username: '',
  password: ''
});

// 登录状态
const isLoggedIn = ref(false);

// 加载状态
const loading = ref(false);

// 验证表单
const validateForm = () => {
  // 重置错误信息
  errors.value = {
    username: '',
    password: ''
  };

  let isValid = true;

  // 验证用户名
  if (!loginForm.value.username) {
    errors.value.username = '请输入用户名';
    isValid = false;
  }

  // 验证密码
  if (!loginForm.value.password) {
    errors.value.password = '请输入密码';
    isValid = false;
  } else if (loginForm.value.password.length < 6) {
    errors.value.password = '密码长度不能少于6位';
    isValid = false;
  }

  return isValid;
};

// 处理登录
const handleLogin = () => {
  if (!validateForm()) return;

  // 设置加载状态
  loading.value = true;

  // 模拟登录请求
  setTimeout(() => {
    // 这里通常是调用接口
    // 模拟登录成功
    if (loginForm.value.username === 'admin' && loginForm.value.password === '123456') {
      isLoggedIn.value = true;
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      });
    } else {
      uni.showToast({
        title: '用户名或密码错误',
        icon: 'none'
      });
    }
    loading.value = false;
  }, 1000);
};

// 返回首页
const goToHome = () => {
  uni.switchTab({
    url: '/pages/home/index'
  });
};

// 页面加载
onLoad(() => {
  console.log('登录页面加载');
});
</script>

<template>
  <view class="login-container">
    <!-- 登录前表单 -->
    <view v-if="!isLoggedIn" class="login-box">
      <view class="login-header">
        <text class="login-title">用户登录</text>
        <text class="login-subtitle">欢迎使用我们的小程序</text>
      </view>

      <view class="form-item">
        <text class="form-label">用户名</text>
        <input
          v-model="loginForm.username"
          class="form-input"
          placeholder="请输入用户名"
          type="text"
        />
        <text v-if="errors.username" class="error-text">{{ errors.username }}</text>
      </view>

      <view class="form-item">
        <text class="form-label">密码</text>
        <input
          v-model="loginForm.password"
          class="form-input"
          placeholder="请输入密码"
          type="password"
        />
        <text v-if="errors.password" class="error-text">{{ errors.password }}</text>
      </view>

      <button
        :loading="loading"
        class="login-button"
        @click="handleLogin"
      >
        {{ loading ? '登录中...' : '登录' }}
      </button>
      <script lang="ts" setup>
        import {ref} from 'vue';
        import {useUserStore} from '@/stores/user/userStore.ts';
        import {useTokenStore} from '@/stores/api/tokenStore.ts';

        // 使用Pinia存储
        const userStore = useUserStore();
        const tokenStore = useTokenStore();

        // 表单数据
        const formData = ref({
          username: '',
          password: ''
        });

        // 加载状态
        const loading = ref(false);

        // 错误信息
        const errorMsg = ref('');

        // 登录操作
        const handleLogin = async () => {
          // 表单验证
          if (!formData.value.username) {
            errorMsg.value = '请输入用户名';
            return;
          }

          if (!formData.value.password) {
            errorMsg.value = '请输入密码';
            return;
          }

          errorMsg.value = '';
          loading.value = true;

          try {
            // 模拟登录请求
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 演示：检查用户名和密码
            if (formData.value.username === 'demo' && formData.value.password === '123456') {
              // 设置令牌 (实际应用中应该从后端获取)
              tokenStore.setToken(`demo_token_${Date.now()}`, 7200); // 有效期2小时
              tokenStore.setRefreshToken(`refresh_token_${Date.now()}`);

              // 设置用户信息
              userStore.updateProfile({
                username: '演示用户',
                avatar: '/assets/avatar/default.png',
                email: 'demo@example.com'
              });

              // 设置用户偏好
              userStore.setPreference('theme', {
                dark: 'false',
                color: '#5474f2'
              });

              uni.showToast({
                title: '登录成功',
                icon: 'success'
              });

              // 延迟返回，让用户看到登录成功的提示
              setTimeout(() => {
                uni.navigateBack();
              }, 1500);
            } else {
              errorMsg.value = '用户名或密码错误';
            }
          } catch (error) {
            console.error('登录失败', error);
            errorMsg.value = '登录失败，请稍后再试';
          } finally {
            loading.value = false;
          }
        };

        // 微信登录
        const handleWxLogin = async () => {
          loading.value = true;
          errorMsg.value = '';

          try {
            // 模拟微信登录
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 演示：模拟获取微信用户信息
            const wxUserInfo = {
              nickName: '微信用户',
              avatarUrl: '/assets/avatar/default.png'
            };

            // 设置令牌
            tokenStore.setToken(`wx_token_${Date.now()}`, 7200);
            tokenStore.setRefreshToken(`wx_refresh_${Date.now()}`);

            // 设置用户信息
            userStore.setWxUserInfo(wxUserInfo);

            uni.showToast({
              title: '登录成功',
              icon: 'success'
            });

            // 延迟返回
            setTimeout(() => {
              uni.navigateBack();
            }, 1500);
          } catch (error) {
            console.error('微信登录失败', error);
            errorMsg.value = '微信登录失败，请稍后再试';
          } finally {
            loading.value = false;
          }
        };
      </script>

      <template>
        <view class="login-container">
          <view class="login-header">
            <text class="login-title">用户登录</text>
            <text class="login-subtitle">登录后体验更多功能</text>
          </view>

          <view class="login-form">
            <!-- 错误提示 -->
            <view v-if="errorMsg" class="error-message">
              {{ errorMsg }}
            </view>

            <!-- 用户名输入 -->
            <view class="form-item">
              <text class="form-label">用户名</text>
              <input
                v-model="formData.username"
                class="form-input"
                placeholder="请输入用户名 (demo)"
                type="text"
              />
            </view>

            <!-- 密码输入 -->
            <view class="form-item">
              <text class="form-label">密码</text>
              <input
                v-model="formData.password"
                class="form-input"
                placeholder="请输入密码 (123456)"
                type="password"
              />
            </view>

            <!-- 登录按钮 -->
            <button
              :disabled="loading"
              class="login-button"
              @tap="handleLogin"
            >
              {{ loading ? '登录中...' : '登录' }}
            </button>

            <!-- 分割线 -->
            <view class="divider">
              <view class="divider-line"></view>
              <text class="divider-text">其他登录方式</text>
              <view class="divider-line"></view>
            </view>

            <!-- 微信登录 -->
            <button
              :disabled="loading"
              class="wx-login-button"
              @tap="handleWxLogin"
            >
              微信一键登录
            </button>
          </view>
        </view>
      </template>

      <style lang="scss" scoped>
        .login-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding: 60rpx 40rpx;
          background-color: #f8f8f8;
        }

        .login-header {
          margin-bottom: 80rpx;
          padding-top: 60rpx;
        }

        .login-title {
          font-size: 48rpx;
          font-weight: bold;
          color: #333;
          margin-bottom: 20rpx;
          display: block;
        }

        .login-subtitle {
          font-size: 28rpx;
          color: #999;
          display: block;
        }

        .login-form {
          background-color: #fff;
          border-radius: 12rpx;
          padding: 40rpx;
          box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
        }

        .error-message {
          background-color: #fff2f0;
          border: 1px solid #ffccc7;
          padding: 20rpx;
          border-radius: 8rpx;
          color: #f5222d;
          font-size: 28rpx;
          margin-bottom: 30rpx;
        }

        .form-item {
          margin-bottom: 40rpx;
        }

        .form-label {
          font-size: 30rpx;
          color: #333;
          margin-bottom: 16rpx;
          display: block;
        }

        .form-input {
          width: 100%;
          height: 88rpx;
          background-color: #f9f9f9;
          border-radius: 8rpx;
          padding: 0 30rpx;
          font-size: 30rpx;
          color: #333;
          border: 1px solid #eee;
        }

        .login-button {
          width: 100%;
          height: 88rpx;
          background-color: #5474f2;
          color: #fff;
          font-size: 32rpx;
          border-radius: 8rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 50rpx;
          margin-bottom: 50rpx;
        }

        .login-button[disabled] {
          background-color: #b4bef0;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 50rpx 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background-color: #eee;
        }

        .divider-text {
          color: #999;
          font-size: 26rpx;
          padding: 0 20rpx;
        }

        .wx-login-button {
          width: 100%;
          height: 88rpx;
          background-color: #07c160;
          color: #fff;
          font-size: 32rpx;
          border-radius: 8rpx;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wx-login-button[disabled] {
          background-color: #a3e2bf;
        }
      </style>
      <view class="tips">
        <text>提示：演示账号 admin，密码 123456</text>
      </view>
    </view>

    <!-- 登录成功页面 -->
    <view v-else class="success-box">
      <view class="success-icon">✓</view>
      <text class="success-title">登录成功</text>
      <text class="success-message">欢迎回来，{{ loginForm.username }}</text>
      <button class="home-button" @click="goToHome">返回首页</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  min-height: 100vh;
  background-color: #f8f8f8;
}

.login-box {
  width: 100%;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 60rpx;
}

.login-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.login-subtitle {
  font-size: 28rpx;
  color: #999;
  display: block;
}

.form-item {
  margin-bottom: 30rpx;
}

.form-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.form-input {
  width: 100%;
  height: 80rpx;
  border: 1px solid #ddd;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.error-text {
  color: #ff4d4f;
  font-size: 24rpx;
  margin-top: 10rpx;
  display: block;
}

.login-button {
  width: 100%;
  height: 80rpx;
  background-color: #5474f2;
  color: #fff;
  font-size: 32rpx;
  border-radius: 8rpx;
  margin-top: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tips {
  margin-top: 30rpx;
  text-align: center;
  font-size: 24rpx;
  color: #999;
}

/* 登录成功样式 */
.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  width: 100%;
}

.success-icon {
  width: 120rpx;
  height: 120rpx;
  background-color: #52c41a;
  color: #fff;
  font-size: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40rpx;
}

.success-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.success-message {
  font-size: 32rpx;
  color: #666;
  margin-bottom: 60rpx;
}

.home-button {
  width: 100%;
  height: 80rpx;
  background-color: #5474f2;
  color: #fff;
  font-size: 32rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
