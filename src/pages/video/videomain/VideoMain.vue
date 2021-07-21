<template>
  <scroll-view
    scroll-y
    enable-flex
    class="scroll"
    @scrolltolower="handleVideoMain"
  >
    <view
      class="video_main_item"
      v-for="(item, index) in videowp"
      :key="index"
      @click="handleVideoClick(item)"
    >
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
      urlPrams: {},
      isZJWB: true,
    }
  },
  watch: {
    urlobj: {
      handler(value) {
        this.urlPrams = value

        // 重置
        this.videowp = []
        this.isZJWB = true

        this._jingmeiVideo()
      },
      immediate: true,
    },
  },

  methods: {
    async _jingmeiVideo() {
      const res = await jingmeiVideo(this.urlPrams.url, this.urlPrams.params)
      console.log(res)
      if (res.data.res.videowp.length === 0) {
        this.isZJWB = false
        uni.showToast({
          title: '数据加载完啦~',
          icon: 'none',
          mask: true,
        })
        return
      }

      this.videowp = [...this.videowp, ...res.data.res.videowp] // 合并数组
    },

    // 分页事件
    handleVideoMain() {
      // // 有下一页
      if (this.isZJWB) {
        this.urlPrams.params.skip += this.urlPrams.params.limit
        this._jingmeiVideo()
        return
      }

      uni.showToast({
        title: '数据加载完啦~',
        icon: 'none',
        mask: true,
      })
    },

    // 点击
    handleVideoClick(item) {
      // 全局共享
      getApp().globalData.video = item

      // 跳转到视频页面
      uni.navigateTo({ url: '/pages/videoplay/VideoPlay' })
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