# z-paging 分页组件使用指南

## 组件概述

z-paging 是一个功能强大的 uniapp 分页组件，支持自动管理分页、自动加载更多、下拉刷新、虚拟列表等功能，适用于各种列表场景。

## 示例页面

本项目提供了以下示例页面：

1. **基础用法** - `index.vue`：展示 z-paging 最基本的用法
2. **虚拟列表** - `virtual-list.vue`：展示虚拟列表功能，适用于大量数据场景
3. **自定义样式** - `custom-style.vue`：展示如何自定义 z-paging 的样式和行为
4. **骨架屏** - `skeleton.vue`：展示如何结合骨架屏提升用户体验
5. **API 演示** - `api-demo.vue`：展示在实际业务场景中如何使用 z-paging

## 使用方法

### 基础用法

```vue
<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList">
    <view v-for="(item, index) in dataList" :key="index">
      {{ item.title }}
    </view>
  </z-paging>
</template>

<script setup>
const dataList = ref([]);
const paging = ref();

function queryList(pageNo, pageSize) {
  // 这里请求服务器数据
  request().then(res => {
    // 将请求的结果通过complete传给z-paging
    paging.value.complete(res.data.list);
  });
}
</script>
```

### 关键配置项

- `refresher-enabled`：是否开启下拉刷新
- `auto-hide-empty-view`：是否自动隐藏空数据视图
- `auto-show-back-to-top`：是否自动显示返回顶部按钮
- `use-virtual-list`：是否使用虚拟列表

### 常用方法

- `complete(list)`：请求结束，传入请求的列表数据
- `completeByTotal(list, total)`：请求结束，传入列表数据和总数
- `complete(false)`：请求失败
- `reload()`：重新加载，会自动回到第一页

## 注意事项

1. 虚拟列表模式下，需要固定 item 的高度
2. 使用自定义导航栏时，需要正确设置高度
3. 列表数据必须是响应式的，建议使用 `ref` 或 `reactive`
4. 处理加载失败状态时，使用 `complete(false)` 通知组件

## 自定义插槽

- `#empty`：空数据时的视图
- #loadingMoreDefault：加载更多默认视图
- #loadingMoreLoading：加载更多加载中视图
- #loadingMoreNoMore：没有更多数据时的视图
- #loadingMoreFail：加载更多失败时的视图

## 更多文档

访问 [z-paging 官方文档](https://z-paging.zxlee.cn) 获取更多信息。
