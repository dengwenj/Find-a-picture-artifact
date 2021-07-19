<template>
  <view>
    <!-- 推荐 -->
    <view class="recommend">
      <view
        class="recommend_img"
        v-for="(item, index) in recommend"
        :key="index"
      >
        <image :src="item.thumb" mode="widthFix" />
      </view>
    </view>
    <!-- /推荐 -->
    <!-- 月份 -->
    <view class="month">
      <view class="month_title">
        <view class="month_title_left">
          <view class="yue"> <text> 18 /</text> 01月 </view>
          <view class="wenzi">你负责美丽就好</view>
        </view>
        <view class="month_title_right">
          <text class="gengduo">更多 ></text>
        </view>
      </view>
    </view>
    <!-- /月份 -->
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
.month {
  .month_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .month_title_left {
      display: flex;
      .yue {
        color: $uni-color;
        text {
          font-size: 34rpx;
        }
      }
      .wenzi {
        margin-left: 20rpx;
        color: #606360;
        font-weight: 600;
      }
    }
    .month_title_right {
      .gengduo {
        color: $uni-color;
        font-size: 24rpx;
      }
    }
  }
}
</style>