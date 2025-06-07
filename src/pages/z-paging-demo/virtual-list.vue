<template>
  <view class="z-paging-demo p-4">
    <view class="text-center mb-4">
      <text class="text-xl font-bold">z-paging 虚拟列表演示</text>
    </view>

    <!-- 虚拟列表演示 -->
    <z-paging ref="paging" v-model="dataList" refresher-enabled use-virtual-list @query="queryList">
      <!-- 虚拟列表需要固定高度的cell，且需要给z-paging设置use-virtual-list属性 -->
      <cell v-for="(item, index) in dataList" :key="index" :index="index" :item="item"/>

      <!-- 自定义加载更多view -->
      <template #loadingMore>
        <view class="flex-center py-3">
          <wd-loading color="#4D80F0" size="24px" type="spinner"/>
          <text class="ml-2 text-gray-500">加载中...</text>
        </view>
      </template>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import Cell from './components/cell.vue';

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

// 模拟请求数据 - 大量数据
function queryList(pageNo: number, pageSize: number) {
  // 这里模拟网络请求
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      // 模拟数据
      const list: ListItem[] = [];
      // 返回大量数据用于测试虚拟列表
      for (let i = 0; i < pageSize; i++) {
        const item: ListItem = {
          id: (pageNo - 1) * pageSize + i + 1,
          title: `标题 ${(pageNo - 1) * pageSize + i + 1}`,
          content: `这是虚拟列表的第${pageNo}页第${i + 1}条数据，演示z-paging的虚拟列表功能，适用于大数据量的场景。`,
          time: new Date().toLocaleString()
        };
        list.push(item);
      }

      // 模拟总数据量限制
      const totalCount = 500;
      if ((pageNo - 1) * pageSize + list.length >= totalCount) {
        paging.value.complete(list, totalCount);
      } else {
        paging.value.complete(list);
      }
      resolve();
    }, 800);
  });
}

onLoad(() => {
  console.log('z-paging virtual list demo page loaded');
});
</script>

<style lang="scss">
.z-paging-demo {
  min-height: 100vh;
}
</style>
