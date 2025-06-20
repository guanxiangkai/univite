<template>
  <view class="p-4 text-center">
    <wd-button >选择图片并上传</wd-button>
    <view v-if="false" class="text-blue h-10">上传...</view>
    <template v-else>
      <view class="m-2">上传后返回的接口数据：</view>
      <view class="m-2">1</view>
      <view class="h-80 w-full">
        <image mode="scaleToFill" />
      </view>
    </template>
  </view>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
//
</style>
