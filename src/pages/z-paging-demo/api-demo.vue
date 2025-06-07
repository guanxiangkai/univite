<template>
  <view class="z-paging-demo">
    <!-- 结合API的z-paging -->
    <z-paging
      ref="paging"
      v-model="dataList"
      :empty-view-text="'暂无数据'"
      :refresher-threshold="80"
      auto-show-back-to-top
      refresher-enabled
      @query="queryList"
    >
      <!-- 顶部筛选条件 -->
      <template #top>
        <view class="filter-bar bg-white p-3 flex-between border-bottom">
          <wd-button size="small" type="primary" @click="showFilterDialog">筛选</wd-button>
          <view class="flex-center gap-2">
            <wd-button :type="sortType === 'time' ? 'primary' : 'info'" size="small" @click="changeSort('time')">
              时间排序
            </wd-button>
            <wd-button :type="sortType === 'id' ? 'primary' : 'info'" size="small" @click="changeSort('id')">ID排序
            </wd-button>
          </view>
        </view>
      </template>

      <!-- 列表内容 -->
      <view class="list px-3">
        <view v-for="(item, index) in dataList" :key="index"
              class="list-item bg-white mb-3 rounded-lg overflow-hidden shadow-sm">
          <!-- 如果有图片则显示 -->
          <image v-if="item.image" :src="item.image" class="w-full" mode="aspectFill" style="height: 150px;"/>

          <view class="p-3">
            <view class="flex-between">
              <text class="font-bold">{{ item.title }}</text>
              <text class="text-gray-500 text-sm">{{ item.time }}</text>
            </view>

            <view class="mt-2 text-gray-600">{{ item.content }}</view>

            <!-- 标签 -->
            <view v-if="item.tags && item.tags.length > 0" class="mt-2 flex flex-wrap gap-1">
              <view
                v-for="(tag, tagIndex) in item.tags"
                :key="tagIndex"
                :class="getTagClass(tagIndex)"
                class="px-2 py-1 rounded-full text-xs"
              >
                {{ tag }}
              </view>
            </view>

            <view class="mt-3 flex-end">
              <wd-button size="small" type="primary">查看详情</wd-button>
            </view>
          </view>
        </view>
      </view>

      <!-- 自定义加载失败 -->
      <template #loadingMoreFail>
        <view class="flex-center py-3">
          <wd-icon color="#fa4350" name="warn" size="18px"/>
          <text class="ml-2 text-danger">加载失败，点击重试</text>
        </view>
      </template>
    </z-paging>

    <!-- 筛选弹窗 -->
    <wd-popup v-model="showFilter" :close-on-click-modal="true" position="bottom">
      <view class="filter-dialog p-4">
        <view class="text-center font-bold mb-4">筛选条件</view>

        <view class="mb-4">
          <text class="mb-2 block">每页数量</text>
          <wd-radio-group v-model="pageSize" inline>
            <wd-radio value="5">5条/页</wd-radio>
            <wd-radio value="10">10条/页</wd-radio>
            <wd-radio value="20">20条/页</wd-radio>
          </wd-radio-group>
        </view>

        <view class="mb-4">
          <text class="mb-2 block">延迟模拟</text>
          <wd-slider v-model="delayTime" :max="3000" :min="500" :step="100">
            <template #end-text>{{ delayTime }}ms</template>
          </wd-slider>
        </view>

        <view class="flex-center gap-3 mt-6">
          <wd-button @click="() => showFilter = false">取消</wd-button>
          <wd-button type="primary" @click="applyFilter">确定</wd-button>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import {getMockListData, type MockListItem} from '@/utils/api-mock';

// 列表数据
const dataList = ref<MockListItem[]>([]);
// 分页组件ref
const paging = ref();

// 筛选条件
const showFilter = ref(false);
const pageSize = ref('10');
const delayTime = ref(1000);
const sortType = ref('time'); // 排序类型

// 查询列表数据
async function queryList(pageNo: number, pageSize: number) {
  try {
    const result = await getMockListData({
      pageNo,
      pageSize,
      delayMs: delayTime.value,
      mockData: (pageNo, pageSize) => {
        // 根据排序类型返回不同的数据
        const data = mockListData(pageNo, pageSize);
        if (sortType.value === 'time') {
          // 按时间排序（随机模拟）
          return data.sort(() => Math.random() - 0.5);
        } else {
          // 按ID排序
          return data.sort((a, b) => a.id - b.id);
        }
      }
    });

    // 将数据传递给分页组件
    paging.value.complete(result.list);
  } catch (error: any) {
    console.error('获取列表数据失败', error);
    // 通知分页组件加载失败
    paging.value.complete(false);

    // 显示错误提示
    uni.showToast({
      title: error.message || '加载失败',
      icon: 'none'
    });
  }
}

// 显示筛选弹窗
function showFilterDialog() {
  showFilter.value = true;
}

// 应用筛选条件
function applyFilter() {
  showFilter.value = false;
  // 重新加载数据
  paging.value.reload();
}

// 切换排序方式
function changeSort(type: 'time' | 'id') {
  if (sortType.value !== type) {
    sortType.value = type;
    // 重新加载数据
    paging.value.reload();
  }
}

// 获取标签样式
function getTagClass(index: number) {
  const classes = [
    'bg-primary text-white',
    'bg-success text-white',
    'bg-warning text-white',
    'bg-danger text-white',
    'bg-info text-white'
  ];
  return classes[index % classes.length];
}

// 模拟数据生成函数
function mockListData(pageNo: number, pageSize: number): MockListItem[] {
  const result: MockListItem[] = [];
  const startIndex = (pageNo - 1) * pageSize;

  for (let i = 0; i < pageSize; i++) {
    const id = startIndex + i + 1;
    // 如果id超过了总数，就不再生成
    if (id > 100) break;

    const tags = ['热门', '推荐', '新品', '限时', '特惠'];
    // 随机选择1-3个标签
    const randomTags = tags
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1);

    result.push({
      id,
      title: `列表项 ${id}`,
      content: `这是一个结合API的z-paging示例，展示了如何处理实际业务场景。当前排序方式：${sortType.value === 'time' ? '时间排序' : 'ID排序'}`,
      time: new Date(Date.now() - Math.random() * 86400000 * 30).toLocaleString(),
      tags: randomTags,
      image: id % 4 === 0 ? `https://picsum.photos/300/200?random=${id}` : undefined
    });
  }

  return result;
}

onLoad(() => {
  console.log('z-paging api demo page loaded');
});
</script>

<style lang="scss">
.z-paging-demo {
  min-height: 100vh;
}

.filter-dialog {
  min-height: 300px;
}
</style>
