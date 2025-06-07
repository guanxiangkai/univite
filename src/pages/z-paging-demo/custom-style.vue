<template>
  <view class="z-paging-demo">
    <!-- 自定义样式的z-paging -->
    <z-paging
      ref="paging"
      v-model="dataList"
      :empty-view-text="'暂无数据'"
      :loading-more-custom-style="{ color: '#4D80F0' }"
      :loading-more-default-text="'上拉加载更多'"
      :loading-more-loading-text="'加载中...'"
      :loading-more-no-more-text="'没有更多了'"
      :refresher-default-text="'下拉刷新'"
      :refresher-pulling-text="'松开刷新'"
      :refresher-refreshing-text="'加载中...'"
      :refresher-threshold="80"
      auto-hide-empty-view
      auto-show-back-to-top
      back-to-top-class="custom-back-to-top"
      refresher-enabled
      refresher-theme-style="black"
      @query="queryList"
    >
      <!-- 自定义导航栏 -->
      <template #top>
        <view class="custom-nav bg-primary text-white p-4 flex-between">
          <view class="flex-center">
            <wd-icon color="#fff" name="list" size="20px"/>
            <text class="ml-2 font-bold">自定义导航栏</text>
          </view>
          <wd-button size="small" type="info">操作按钮</wd-button>
        </view>
      </template>

      <!-- 列表内容 -->
      <view class="list px-4">
        <view v-for="(item, index) in dataList" :key="index"
              class="list-item border-bottom p-3 bg-white mb-2 rounded shadow-sm">
          <view class="flex-between">
            <text class="font-bold">{{ item.title }}</text>
            <text class="text-gray-500 text-sm">{{ item.time }}</text>
          </view>
          <view class="mt-2 text-gray-600">{{ item.content }}</view>
          <view class="mt-2 flex-end">
            <wd-button size="small" type="primary">查看详情</wd-button>
          </view>
        </view>
      </view>

      <!-- 自定义空数据 -->
      <template #empty>
        <view class="flex-col-center py-10">
          <wd-icon color="#4D80F0" name="warn-filling" size="48px"/>
          <text class="mt-2 text-primary">暂无数据，下拉刷新试试</text>
          <wd-button class="mt-4" size="small" type="primary" @click="reload">重新加载</wd-button>
        </view>
      </template>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
interface ListItem {
  id: number;
  title: string;
  content: string;
  time: string;
}

// 列表数据
const dataList = ref<ListItem[]>([]);
// 分页组件ref
const paging = ref();

// 模拟请求数据
function queryList(pageNo: number, pageSize: number) {
  // 这里模拟网络请求
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      // 模拟数据
      const list: ListItem[] = [];
      for (let i = 0; i < pageSize; i++) {
        const item: ListItem = {
          id: (pageNo - 1) * pageSize + i + 1,
          title: `自定义样式标题 ${(pageNo - 1) * pageSize + i + 1}`,
          content: `这是一个带有自定义样式的z-paging示例，可以通过自定义属性来调整样式和行为。`,
          time: new Date().toLocaleString()
        };
        list.push(item);
      }

      // 模拟第3页之后没有更多数据
      if (pageNo >= 3) {
        paging.value.complete(list, (pageNo - 1) * pageSize + list.length);
      } else {
        paging.value.complete(list);
      }

      resolve();
    }, 1000);
  });
}

// 重新加载
function reload() {
  paging.value.reload();
}

onLoad(() => {
  console.log('z-paging custom style demo page loaded');
});
</script>

<style lang="scss">
.z-paging-demo {
  min-height: 100vh;

  .custom-nav {
    height: 90rpx;
  }

  .custom-back-to-top {
    background-color: rgba(77, 128, 240, 0.8) !important;
    color: white !important;
  }
}
</style>
