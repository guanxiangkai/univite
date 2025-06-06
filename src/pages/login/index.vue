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
