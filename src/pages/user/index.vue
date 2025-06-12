<script lang="ts" setup>
import {ref} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import {useUserStore} from '@/stores/user/userStore';
import {useTokenStore} from '@/stores/auth/tokenStore';

// 使用Pinia存储
const userStore = useUserStore();
const tokenStore = useTokenStore();

// 用户信息（默认未登录）
const userInfo = ref({
  isLoggedIn: false,
  username: '',
  avatar: '/assets/avatar/default.png'
});

// 设置列表
const settingsList = ref([
  {id: 1, icon: '📋', name: '我的订单', path: ''},
  {id: 2, icon: '🏆', name: '我的积分', path: ''},
  {id: 3, icon: '💰', name: '我的优惠券', path: ''},
  {id: 4, icon: '⭐', name: '我的收藏', path: ''},
  {id: 5, icon: '📍', name: '收货地址', path: ''},
  {id: 6, icon: '⚙️', name: '设置', path: ''},
  {id: 7, icon: '📱', name: '联系客服', path: ''}
]);

// 页面加载
onLoad(() => {
  console.log('用户页面加载');
  // 使用Pinia存储检查登录状态
  checkLoginStatus();
});

// 检查登录状态
const checkLoginStatus = () => {
  // 使用tokenStore检查登录状态
  if (tokenStore.isLoggedIn) {
    userInfo.value = {
      isLoggedIn: true,
      username: userStore.displayName,
      avatar: userStore.avatarUrl
    };
  } else if (tokenStore.refreshToken) {
    // 有刷新令牌但访问令牌已过期，尝试刷新
    tokenStore.refreshAccessToken().then(success => {
      if (success) {
        userInfo.value = {
          isLoggedIn: true,
          username: userStore.displayName,
          avatar: userStore.avatarUrl
        };
      }
    });
  }
};

// 前往登录页
const goToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/index'
  });
};

// 处理设置项点击
const handleSettingClick = (item: any) => {
  if (!userInfo.value.isLoggedIn) {
    uni.showModal({
      title: '提示',
      content: '请先登录',
      confirmText: '去登录',
      success: (res) => {
        if (res.confirm) {
          goToLogin();
        }
      }
    });
    return;
  }

  // 处理各设置项的点击
  uni.showToast({
    title: `点击了${item.name}`,
    icon: 'none'
  });
};

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除登录状态 - 使用Pinia存储
        tokenStore.clearToken();

        // 更新UI状态
        userInfo.value.isLoggedIn = false;
        userInfo.value.username = '';

        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        });
      }
    }
  });
};
</script>

<template>
  <view class="user-container">
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-avatar">
        <view class="avatar-placeholder">头像</view>
      </view>

      <view v-if="userInfo.isLoggedIn" class="user-info">
        <text class="username">{{ userInfo.username }}</text>
        <text class="user-id">ID: 10086</text>
      </view>

      <view v-else class="login-prompt">
        <text class="login-text">登录体验更多功能</text>
        <button class="login-btn" @tap="goToLogin">立即登录</button>
      </view>
    </view>

    <!-- 我的数据统计 -->
    <view class="data-panel">
      <view class="data-item" @tap="handleSettingClick({name: '我的收藏'})">
        <text class="data-num">0</text>
        <text class="data-label">收藏</text>
      </view>
      <view class="data-item" @tap="handleSettingClick({name: '浏览记录'})">
        <text class="data-num">0</text>
        <text class="data-label">足迹</text>
      </view>
      <view class="data-item" @tap="handleSettingClick({name: '我的优惠券'})">
        <text class="data-num">0</text>
        <text class="data-label">优惠券</text>
      </view>
      <view class="data-item" @tap="handleSettingClick({name: '我的积分'})">
        <text class="data-num">0</text>
        <text class="data-label">积分</text>
      </view>
    </view>

    <!-- 设置列表 -->
    <view class="settings-list">
      <view
        v-for="item in settingsList"
        :key="item.id"
        class="setting-item"
        @tap="handleSettingClick(item)"
      >
        <view class="setting-left">
          <text class="setting-icon">{{ item.icon }}</text>
          <text class="setting-name">{{ item.name }}</text>
        </view>
        <text class="setting-arrow">></text>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view v-if="userInfo.isLoggedIn" class="logout-section">
      <button class="logout-btn" @tap="handleLogout">退出登录</button>
    </view>

    <!-- 未登录时的登录入口 -->
    <view v-else class="login-section">
      <button class="big-login-btn" @tap="goToLogin">立即登录</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.user-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
}

/* 用户信息卡片 */
.user-card {
  display: flex;
  align-items: center;
  padding: 40rpx 30rpx;
  background-color: #5474f2;
  color: #fff;
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 30rpx;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder {
  color: #666;
  font-size: 24rpx;
}

.user-info {
  flex: 1;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}

.user-id {
  font-size: 24rpx;
  opacity: 0.8;
}

.login-prompt {
  flex: 1;
}

.login-text {
  font-size: 30rpx;
  margin-bottom: 15rpx;
  display: block;
}

.login-btn {
  background-color: #fff;
  color: #5474f2;
  font-size: 24rpx;
  padding: 8rpx 30rpx;
  border-radius: 30rpx;
  display: inline-block;
  line-height: 1.5;
}

/* 数据面板 */
.data-panel {
  display: flex;
  justify-content: space-around;
  padding: 30rpx 0;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.data-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.data-num {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.data-label {
  font-size: 24rpx;
  color: #999;
}

/* 设置列表 */
.settings-list {
  background-color: #fff;
  border-radius: 12rpx;
  margin: 0 20rpx;
  overflow: hidden;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-left {
  display: flex;
  align-items: center;
}

.setting-icon {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.setting-name {
  font-size: 30rpx;
  color: #333;
}

.setting-arrow {
  color: #ccc;
  font-size: 32rpx;
}

/* 退出登录按钮 */
.logout-section {
  margin: 60rpx 20rpx 0;
}

.logout-btn {
  width: 100%;
  height: 80rpx;
  background-color: #fff;
  color: #ff4d4f;
  font-size: 30rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 未登录时的大登录按钮 */
.login-section {
  margin: 60rpx 20rpx 0;
}

.big-login-btn {
  width: 100%;
  height: 80rpx;
  background-color: #5474f2;
  color: #fff;
  font-size: 30rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
