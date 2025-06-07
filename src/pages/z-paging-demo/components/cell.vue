<template>
  <view :style="{ height: '120px' }" class="cell border-bottom p-3 bg-white mb-2 rounded">
    <view class="flex-between">
      <text class="font-bold">{{ item.title }}</text>
      <text class="text-gray-500 text-sm">{{ item.time }}</text>
    </view>
    <view class="mt-2 text-gray-600">{{ item.content }}</view>
    <view class="mt-2 text-primary text-sm">
      虚拟列表项 #{{ index + 1 }}
    </view>
  </view>
</template>

<script lang="ts" setup>
// 定义组件的props
defineProps({
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});
</script>

<style lang="scss">
.cell {
  box-sizing: border-box;
}
</style>
