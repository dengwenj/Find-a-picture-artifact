<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    handleClick() {
      // 全局共享数据
      getApp().globalData.imageList = this.list
      getApp().globalData.imageindex = this.index

      // 跳转到图片详情页面
      uni.navigateTo({ url: '/pages/imgdetail/ImgDetail' })
    },
  },
}
</script>

<style scoped lang="scss"></style>