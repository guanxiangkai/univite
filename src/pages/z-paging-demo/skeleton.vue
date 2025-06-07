<template>
  <view class="z-paging-demo p-4">
    <view class="text-center mb-4">
      <text class="text-xl font-bold">z-paging 骨架屏演示</text>
    </view>

    <!-- 使用骨架屏的z-paging -->
    <z-paging ref="paging" v-model="dataList" refresher-enabled @query="queryList">
      <template #default="{ list }">
        <!-- 使用列表骨架屏 -->
        <view v-if="loading" class="skeleton-list">
          <view v-for="i in 5" :key="i" class="skeleton-item p-3 mb-2 rounded bg-white">
            <view class="skeleton-header flex-between">
              <view class="skeleton-title bg-gray-200 rounded"></view>
              <view class="skeleton-time bg-gray-200 rounded"></view>
            </view>
            <view class="skeleton-content bg-gray-200 rounded mt-2"></view>
            <view class="skeleton-content bg-gray-200 rounded mt-1" style="width: 80%;"></view>
          </view>
        </view>

        <!-- 实际内容 -->
        <view v-else class="list">
          <view v-for="(item, index) in list" :key="index" class="list-item border-bottom p-3 bg-white mb-2 rounded">
            <view class="flex-between">
              <text class="font-bold">{{ item.title }}</text>
              <text class="text-gray-500 text-sm">{{ item.time }}</text>
            </view>
            <view class="mt-2 text-gray-600">{{ item.content }}</view>
          </view>
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
// 是否显示骨架屏
const loading = ref(true);

// 模拟请求数据
function queryList(pageNo: number, pageSize: number) {
  // 首次加载显示骨架屏
  if (pageNo === 1) {
    loading.value = true;
  }

  // 这里模拟网络请求
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      // 延迟显示实际内容
      if (pageNo === 1) {
        loading.value = false;
      }

      // 模拟数据
      const list: ListItem[] = [];
      for (let i = 0; i < pageSize; i++) {
        const item: ListItem = {
          id: (pageNo - 1) * pageSize + i + 1,
          title: `标题 ${(pageNo - 1) * pageSize + i + 1}`,
          content: `这是第${pageNo}页的第${i + 1}条数据，演示z-paging结合骨架屏的使用方式。`,
          time: new Date().toLocaleString()
        };
        list.push(item);
      }

      // 将请求的数据传递给z-paging
      paging.value.complete(list);
      resolve();
    }, 2000); // 延长加载时间以便观察骨架屏效果
  });
}

onLoad(() => {
  console.log('z-paging skeleton demo page loaded');
});

// 下拉刷新时重新显示骨架屏
onPullDownRefresh(() => {
  loading.value = true;
});
</script>

<style lang="scss">
.z-paging-demo {
  min-height: 100vh;
}

.skeleton-list {
  .skeleton-item {
    .skeleton-header {
      .skeleton-title {
        height: 24px;
        width: 150px;
      }

      .skeleton-time {
        height: 18px;
        width: 80px;
      }
    }

    .skeleton-content {
      height: 16px;
      width: 100%;
    }
  }
}
</style>
