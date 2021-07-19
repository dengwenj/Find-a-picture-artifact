<template>
  <view>
    <view class="recommend">
      <view
        class="recommend_img"
        v-for="(item, index) in recommend"
        :key="index"
      >
        <image :src="item.thumb" mode="widthFix" />
      </view>
    </view>
  </view>
</template>

<script>
import { getHomeRecommend } from '@/api/home'

export default {
  data() {
    return {
      recommend: [], // 推荐列表
      month: [], // 月份列表
      popular: [], // 热门列表
    }
  },
  created() {
    // 发送请求
    this._getHomeRecommend()
  },
  methods: {
    async _getHomeRecommend() {
      const res = await getHomeRecommend({
        limit: 30,
        order: 'hot',
        skip: 0,
      })
      console.log(res.data.res.vertical)
      this.recommend = res.data.res.homepage[1].items
      this.month = res.data.res.homepage[2].items
      this.popular = res.data.res.vertical
    },
  },
}
</script>

<style scoped lang="scss">
.recommend {
  display: flex;
  flex-wrap: wrap;
  padding: 10rpx 5rpx;
  .recommend_img {
    width: 50%;
    border: 2rpx solid #fff;
    image {
      width: 100%;
      border-radius: 5rpx;
    }
  }
}
</style>