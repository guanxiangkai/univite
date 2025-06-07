<template>
  <view class="z-paging-demo p-4">
    <view class="text-center mb-4">
      <text class="text-xl font-bold">z-paging 分页列表演示</text>
    </view>

    <!-- z-paging 基础用法 -->
    <z-paging ref="paging" v-model="dataList" refresher-enabled @query="queryList">
      <!-- 列表内容，z-paging会自动将page传给@query所绑定的方法 -->
      <template #default="{ list }">
        <view class="list">
          <view v-for="(item, index) in list" :key="index" class="list-item border-bottom p-3 bg-white mb-2 rounded">
            <view class="flex-between">
              <text class="font-bold">{{ item.title }}</text>
              <text class="text-gray-500 text-sm">{{ item.time }}</text>
            </view>
            <view class="mt-2 text-gray-600">{{ item.content }}</view>
          </view>
        </view>
      </template>

      <!-- 自定义空数据 -->
      <template #empty>
        <view class="flex-col-center py-10">
          <wd-icon color="#ccc" name="warn-filling" size="48px"/>
          <text class="mt-2 text-gray-400">暂无数据</text>
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
      const isFail = Math.random() > 0.8; // 模拟偶尔请求失败
      if (isFail) {
        // 请求失败，调用分页组件的fail方法
        paging.value.complete(false);
        return;
      }

      // 模拟数据
      const list: ListItem[] = [];
      for (let i = 0; i < pageSize; i++) {
        const item: ListItem = {
          id: (pageNo - 1) * pageSize + i + 1,
          title: `标题 ${(pageNo - 1) * pageSize + i + 1}`,
          content: `这是第${pageNo}页的第${i + 1}条数据，演示z-paging的基础用法。`,
          time: new Date().toLocaleString()
        };
        list.push(item);
      }

      // 将请求的数据传递给z-paging
      paging.value.complete(list);
      resolve();
    }, 1000); // 模拟请求延迟1s
  });
}

onLoad(() => {
  console.log('z-paging demo page loaded');
});
</script>

<style lang="scss">
.z-paging-demo {
  min-height: 100vh;
}
</style>
