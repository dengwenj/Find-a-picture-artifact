<template>
  <view class="img_detail">
    <!-- 上面 -->
    <view class="img_top">
      <view class="user_info">
        <view class="user_img">
          <image :src="imgDetail.thumb" mode="scaleToFit" />
        </view>
        <view class="user_name">
          <text>{{ imgDetail.store }}</text>
          <view class="user_time">{{ imgDetail.cnTime }}</view>
        </view>
      </view>
      <view class="img">
        <!-- 滑动组件 -->
        <swiper-action @swiperAction="swiperAction">
          <image :src="imgDetail.thumb" mode="scaleToFill" />
        </swiper-action>
        <!-- 滑动组件 -->
      </view>
      <view class="dzsc">
        <view class="dianzan">
          <view class="iconfont icon-dianzan">{{ imgDetail.rank }}</view>
        </view>
        <view class="shoucang">
          <view class="iconfont icon-shoucang">收藏</view>
        </view>
      </view>
    </view>
    <!-- 上面 -->
  </view>
</template>

<script>
import SwiperAction from '@/pages/components/SwiperAction'
import moment from 'moment'
moment.locale('zh-cn')

// 网络请求
import { getCommentData } from '@/api/home'

export default {
  data() {
    return {
      imgDetail: {}, // 图片详情
      imageList: [],
      imageIndex: 0,
    }
  },
  components: {
    SwiperAction,
  },
  onLoad(options) {
    const { imageList, imageIndex } = getApp().globalData
    this.imageList = imageList
    this.imageIndex = imageIndex

    this.getData()
  },
  methods: {
    getData() {
      this.imgDetail = this.imageList[this.imageIndex]
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()

      // 获取图片详情 id  发送请求  图片评论的
      this._getCommentData(this.imgDetail.id)
    },

    async _getCommentData(id) {
      const res = await getCommentData(id)
    },

    // 滑动事件
    swiperAction(lr) {
      /* 
        用户 是左滑 就加载下一页 this.imageIndex++
        用户 是右滑 就 this.imageIndex--
        并且还要判断有没有图片在确定 加不加载下一页
      */
      if (lr.lr === '向左滑动' && this.imageIndex < this.imageList.length - 1) {
        this.imageIndex++
        this.getData()
      } else if (lr.lr === '向右滑动' && this.imageIndex > 0) {
        this.imageIndex--
        this.getData()
      } else {
        uni.showToast({
          title: '没有数据了',
          icon: 'none',
          mask: true,
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.img_detail {
  margin-top: 20rpx;
  .img_top {
    .user_info {
      display: flex;
      margin: 50rpx 0 0 40rpx;
      .user_img {
        width: 80rpx;
        height: 80rpx;
        image {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .user_name {
        margin-left: 20rpx;
        font-size: 26rpx;
        text {
          color: #747e7a;
        }
        .user_time {
          margin-top: 10rpx;
          font-size: 24rpx;
          color: #d2d3cf;
        }
      }
    }
  }
  .img {
    margin-top: 40rpx;
    width: 100%;
    image {
      width: 100%;
    }
  }
  .dzsc {
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1px solid #eee;
    .dianzan {
      flex: 1;
      display: flex;
      justify-content: center;
      align-content: center;
    }
    .shoucang {
      flex: 1;
      display: flex;
      justify-content: center;
      align-content: center;
    }
  }
}
</style>