<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {onLoad} from '@dcloudio/uni-app';

// 轮播图数据
const swiperList = ref([
  {id: 1, image: '/assets/swiper/banner1.jpg', title: '精选商品'},
  {id: 2, image: '/assets/swiper/banner2.jpg', title: '限时活动'},
  {id: 3, image: '/assets/swiper/banner3.jpg', title: '新品上架'}
]);

// 功能模块数据
const featureList = ref([
  {id: 1, icon: '🛒', name: '商城', path: ''},
  {id: 2, icon: '🎁', name: '活动', path: ''},
  {id: 3, icon: '📢', name: '资讯', path: ''},
  {id: 4, icon: '🔖', name: '优惠券', path: ''}
]);

// 商品列表数据
const goodsList = ref([
  {id: 1, name: '商品1', price: 99, image: '/assets/goods/item1.jpg'},
  {id: 2, name: '商品2', price: 199, image: '/assets/goods/item2.jpg'},
  {id: 3, name: '商品3', price: 299, image: '/assets/goods/item3.jpg'},
  {id: 4, name: '商品4', price: 399, image: '/assets/goods/item4.jpg'}
]);

// 页面加载函数
onLoad(() => {
  console.log('首页加载完成');
});

// 模拟加载数据
onMounted(() => {
  // 模拟网络请求延迟
  setTimeout(() => {
    // 实际开发中这里会是真实的API请求
    console.log('数据加载完成');
  }, 500);
});

// 跳转到登录页面
const goToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/index'
  });
};

// 查看商品详情
const viewGoodsDetail = (id: number) => {
  uni.showToast({
    title: `查看商品${id}详情`,
    icon: 'none'
  });
};

// 处理轮播图点击
const handleSwiperClick = (item: any) => {
  uni.showToast({
    title: `点击了: ${item.title}`,
    icon: 'none'
  });
};
</script>

<template>
  <view class="home-container">
    <!-- 顶部搜索 -->
    <view class="search-bar">
      <view class="search-input">
        <text class="search-icon">🔍</text>
        <input disabled placeholder="搜索商品" @tap="goToLogin"/>
      </view>
    </view>

    <!-- 轮播图 -->
    <swiper autoplay circular class="banner-swiper" indicator-dots>
      <swiper-item v-for="item in swiperList" :key="item.id" @tap="handleSwiperClick(item)">
        <image :src="item.image" class="banner-image" mode="aspectFill">
          <view class="image-placeholder">{{ item.title }}图片</view>
        </image>
      </swiper-item>
    </swiper>

    <!-- 功能模块导航 -->
    <view class="feature-section">
      <view
        v-for="item in featureList"
        :key="item.id"
        class="feature-item"
        @tap="goToLogin"
      >
        <text class="feature-icon">{{ item.icon }}</text>
        <text class="feature-name">{{ item.name }}</text>
      </view>
    </view>

    <!-- 商品推荐 -->
    <view class="goods-section">
      <view class="section-header">
        <text class="section-title">热门推荐</text>
        <text class="more-link" @tap="goToLogin">查看更多 ></text>
      </view>

      <view class="goods-list">
        <view
          v-for="item in goodsList"
          :key="item.id"
          class="goods-item"
          @tap="viewGoodsDetail(item.id)"
        >
          <view class="goods-image">
            <view class="image-placeholder">{{ item.name }}图片</view>
          </view>
          <view class="goods-info">
            <text class="goods-name">{{ item.name }}</text>
            <text class="goods-price">¥{{ item.price }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 登录入口 -->
    <view class="login-entry">
      <button class="login-button" @tap="goToLogin">立即登录体验更多功能</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 100rpx;
}

/* 搜索栏样式 */
.search-bar {
  padding: 20rpx 30rpx;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-input {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 30rpx;
  padding: 15rpx 30rpx;
}

.search-icon {
  margin-right: 10rpx;
}

/* 轮播图样式 */
.banner-swiper {
  width: 100%;
  height: 300rpx;
}

.banner-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
}

.image-placeholder {
  color: #666;
  font-size: 28rpx;
}

/* 功能模块样式 */
.feature-section {
  display: flex;
  justify-content: space-around;
  padding: 30rpx 20rpx;
  background-color: #fff;
  margin-top: 20rpx;
  border-radius: 12rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-icon {
  font-size: 50rpx;
  margin-bottom: 10rpx;
}

.feature-name {
  font-size: 24rpx;
  color: #333;
}

/* 商品区域样式 */
.goods-section {
  margin: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx 0 30rpx;
  border-bottom: 1rpx solid #eee;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.more-link {
  font-size: 24rpx;
  color: #999;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.goods-item {
  width: 48%;
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.goods-image {
  width: 100%;
  height: 200rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.goods-info {
  padding: 16rpx;
}

.goods-name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.goods-price {
  font-size: 32rpx;
  color: #ff4d4f;
  font-weight: bold;
}

/* 登录入口样式 */
.login-entry {
  margin: 40rpx 20rpx;
}

.login-button {
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
