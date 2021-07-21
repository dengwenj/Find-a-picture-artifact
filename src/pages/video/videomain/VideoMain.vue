<template>
  <scroll-view scroll-y enable-flex class="scroll">
    <view class="video_main_item" v-for="(item, index) in videowp" :key="index">
      <image :src="item.img" mode="widthFix" />
    </view>
  </scroll-view>
</template>

<script>
import { jingmeiVideo } from '@/api/home'

export default {
  props: {
    urlobj: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      videowp: [],
    }
  },
  watch: {
    urlobj: {
      async handler(value) {
        const res = await jingmeiVideo(value.url, value.params)
        this.videowp = res.data.res.videowp
      },
      immediate: true,
    },
  },
}
</script>

<style scoped lang="scss">
.scroll {
  height: calc(100vh - 41px);
  margin-top: 10rpx;
  display: flex;
  flex-wrap: wrap;
  .video_main_item {
    width: 33.33%;
    border: 3rpx solid #fff;
    image {
      width: 100%;
    }
  }
}
</style>