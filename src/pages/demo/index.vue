<template>
  <view class="demo-page p-4">
    <view class="text-center pb-4">
      <text class="text-xl font-bold">Wot Design Uni & UnoCSS 演示</text>
    </view>

    <!-- UnoCSS 演示 -->
    <view class="mb-6 bg-gray-100 p-4 rounded-lg">
      <view class="font-bold mb-2">UnoCSS 演示</view>
      <view class="flex-between mb-2">
        <text class="text-primary">主题色文本</text>
        <view class="bg-primary text-white px-2 py-1 rounded">主题色背景</view>
      </view>
      <view class="flex-center gap-2 mb-2">
        <view class="w-16 h-16 bg-success rounded-full flex-center text-white">成功</view>
        <view class="w-16 h-16 bg-warning rounded-full flex-center text-white">警告</view>
        <view class="w-16 h-16 bg-danger rounded-full flex-center text-white">危险</view>
      </view>
      <view class="flex-col-center gap-2">
        <text class="text-small">小字体</text>
        <text class="text-normal">正常字体</text>
        <text class="text-large">大字体</text>
        <text class="text-xlarge">超大字体</text>
      </view>
    </view>

    <!-- Wot Design Uni 组件演示 -->
    <view class="mb-6">
      <view class="font-bold mb-2">按钮组件演示</view>
      <view class="flex flex-wrap gap-2 mb-4">
        <wd-button>默认按钮</wd-button>
        <wd-button type="primary">主要按钮</wd-button>
        <wd-button type="success">成功按钮</wd-button>
        <wd-button type="warning">警告按钮</wd-button>
        <wd-button type="danger">危险按钮</wd-button>
        <wd-button type="info">信息按钮</wd-button>
      </view>
      <view class="flex flex-wrap gap-2">
        <wd-button round>圆角按钮</wd-button>
        <wd-button round type="primary">主要按钮</wd-button>
        <wd-button loading type="primary">加载中</wd-button>
        <wd-button disabled type="primary">禁用按钮</wd-button>
      </view>
    </view>

    <view class="mb-6">
      <view class="font-bold mb-2">单元格组件演示</view>
      <wd-cell-group border>
        <wd-cell title="标题文字" value="内容"/>
        <wd-cell label="描述信息" title="标题文字" value="内容"/>
        <wd-cell title="带图标" value="内容">
          <template #icon>
            <wd-icon class="mr-2" name="setting"/>
          </template>
        </wd-cell>
        <wd-cell is-link title="跳转链接"/>
        <wd-cell is-link title="URL 跳转" url="/pages/demo/index"/>
      </wd-cell-group>
    </view>

    <view class="mb-6">
      <view class="font-bold mb-2">暗黑模式切换</view>
      <wd-button type="primary" @click="toggleTheme">
        {{ isDark ? '切换到亮色模式' : '切换到暗黑模式' }}
      </wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {getDarkMode, toggleDarkMode} from '@/utils/theme';

const isDark = ref(getDarkMode());

function toggleTheme() {
  isDark.value = toggleDarkMode();
}

onLoad(() => {
  // 页面加载
  console.log('demo page loaded');
});
</script>

<style lang="scss">
.demo-page {
  min-height: 100vh;
}
</style>
