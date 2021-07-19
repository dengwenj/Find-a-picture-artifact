<template>
  <view>
    <view class="swiper">
      <swiper
        indicator-dots
        circular
        autoplay
        indicator-color="#fff"
        indicator-active-color="#d4237a"
        interval="5000"
      >
        <swiper-item v-for="(item, index) in banner" :key="index">
          <image :src="item.thumb" mode="widthFix" />
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
// 网络请求
import { getHomeAlbum } from '@/api/home'

export default {
  data() {
    return {
      params: {
        limit: 30,
        order: 'new',
        skip: 0,
      },
      banner: [], // 轮播图列表
      album: [], // 专辑列表
    }
  },
  created() {
    this._getHomeAlbum()
  },
  mounted() {
    // 修改页面的标题
    uni.setNavigationBarTitle({ title: '专辑' })
  },
  methods: {
    async _getHomeAlbum() {
      const res = await getHomeAlbum(this.params)
      console.log(res.data.res.album)
      console.log(res.data.res.banner)
      this.banner = res.data.res.banner
      this.album = res.data.res.album
    },
  },
}
</script>

<style scoped lang="scss">
.swiper {
  swiper {
    width: 100%;
    height: calc(750rpx * 284 / 640); // swiper 的高等于这样
    swiper-item {
      image {
        width: 100%;
      }
    }
  }
}
</style>