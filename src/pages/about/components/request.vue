<template>
  <view class="p-6 text-center">
    <view class="my-2">使用的是 laf 云后台</view>
    <view class="text-green-400">我的推荐码，可以获得佣金</view>

    <!-- #ifdef H5 -->
    <view class="my-2">
      <a class="my-2"  target="_blank">1</a>
    </view>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <view class="my-2 text-left text-sm">1</view>
    <!-- #endif -->

    <!-- http://localhost:9000/#/pages/index/request -->
    <wd-button class="my-6">发送请求</wd-button>
    <view class="h-16">
      <view >loading...</view>
    </view>
    <wd-button type="error"  class="my-6" >重置数据</wd-button>
  </view>
</template>

<script lang="ts" setup>
</script>
