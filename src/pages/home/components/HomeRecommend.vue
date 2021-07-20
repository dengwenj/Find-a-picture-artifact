<template>
  <scroll-view class="scroll" scroll-y @scrolltolower="handleScrollY">
    <!-- 推荐 -->
    <view class="recommend">
      <navigator
        class="recommend_img"
        v-for="(item, index) in recommend"
        :key="index"
        :url="`/pages/album/AlbumDetails?id=${item.target}`"
      >
        <image :src="item.thumb" mode="widthFix" />
      </navigator>
    </view>
    <!-- /推荐 -->

    <!-- 月份 -->
    <view class="month" v-if="month.items">
      <view class="month_title">
        <view class="month_title_left">
          <view class="yue">
            <text> {{ month.DD }} /</text> {{ month.MM }}月
          </view>
          <view class="wenzi">{{ month.title }}</view>
        </view>
        <view class="month_title_right">
          <text class="gengduo">更多 ></text>
        </view>
      </view>
      <view class="month_content">
        <view
          class="month_img"
          v-for="(item, index) in month.items"
          :key="index"
        >
          <go-detail :list="month.items" :index="index">
            <image
              :src="item.thumb + item.rule.replace('$<Height>', 360)"
              mode="aspectFill"
            />
          </go-detail>
        </view>
      </view>
    </view>
    <!-- /月份 -->

    <!-- 热门 -->
    <view class="hot">
      <view class="hot_title">
        <text>热门</text>
      </view>
      <view class="hot_content">
        <view class="hot_img" v-for="(item, index) in popular" :key="index">
          <image :src="item.thumb" mode="widthFix" />
        </view>
      </view>
    </view>
    <!-- /热门 -->
  </scroll-view>
</template>

<script>
import { getHomeRecommend } from '@/api/home'
import moment from 'moment'
import GoDetail from '@/pages/components/GoDetail'

export default {
  data() {
    return {
      recommend: [], // 推荐列表
      month: {}, // 月份列表
      popular: [], // 热门列表
      params: {
        limit: 30, // 每页请求多少条
        order: 'hot',
        skip: 0, // 要跳过的条数
      },
      isXYY: true, // 判断还有没有下一页
    }
  },
  components: {
    GoDetail,
  },
  created() {
    // 发送请求
    this._getHomeRecommend(this.params)
  },
  mounted() {
    // 修改页面的标题
    uni.setNavigationBarTitle({ title: '首页' })
  },
  methods: {
    // 网络请求
    async _getHomeRecommend(params) {
      const res = await getHomeRecommend(params)

      // 判断有没有下一页  返回的数组的长度为 0 了表示没有下一页了
      if (res.data.res.vertical.length === 0) {
        this.isXYY = false
        return
      }

      // 如果 this.recommend.length 等于 0 就是第一次 才发送这里的请求 不等于 0 了不发送这里的请求了
      if (this.recommend.length === 0) {
        this.recommend = res.data.res.homepage[1].items
        this.month = res.data.res.homepage[2]
        //  yyyy 年 MM 月 DD 日
        this.month.MM = moment(this.month.stime).format('MM')
        this.month.DD = moment(this.month.stime).format('DD')
      }

      // 分页 热门
      this.popular = [...this.popular, ...res.data.res.vertical] // 这里数组一定要合并
    },

    async handleScrollY() {
      // console.log('为什么超人救人的时候都穿紧身衣？？？ 救人要紧！')
      // TypeError: "skip" is read-only  这个原因是用了 const 要用 let 你把值该了
      // 分页
      // 为 true 表示有下一页
      if (this.isXYY) {
        this.params.skip += this.params.limit
        this._getHomeRecommend(this.params)
        return
      }
      // 没有下一页  提示用户
      uni.showToast({
        title: '数据加载完啦~',
        icon: 'none',
        mask: true,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.scroll {
  height: calc(100vh - 41px);
}
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
  .month_content {
    display: flex;
    flex-wrap: wrap;
    margin: 0 1px;
    .month_img {
      width: 33.33%;
      border: 3rpx solid #fff;
      image {
        width: 100%;
        border-radius: 5rpx;
      }
    }
  }
}
.hot {
  margin: 0 1px;
  margin-top: 20rpx;
  .hot_title {
    margin-left: 20rpx;
    padding-left: 10rpx;
    border-left: 10rpx solid $uni-color;
    text {
    }
  }
  .hot_content {
    margin-top: 10rpx;
    display: flex;
    flex-wrap: wrap;
    .hot_img {
      width: 33.33%;
      border: 3rpx solid #fff;
      image {
        width: 100%;
        border-radius: 5rpx;
      }
    }
  }
}
</style>

/* 
推荐: http://service.picasso.adesk.com/v3/homepage/vertical 
专辑 https://service.picasso.adesk.com/v1/wallpaper/album 
分类: https://service.picasso.adesk.com/v1/vertical/category 
分类-最新-热门 https://service.picasso.adesk.com/v1/vertical/category/${id}/vertical 
专辑-详情 https://service.picasso.adesk.com/v1/wallpaper/album/${id}/wallpaper
图片评论 https://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment
 */