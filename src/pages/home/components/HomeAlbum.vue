<template>
  <view>
    <!-- 轮播图 -->
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
    <!-- /轮播图 -->

    <!-- 列表 -->
    <view class="list">
      <view class="list_item" v-for="(item, index) in album" :key="index">
        <view class="list_item_left">
          <image :src="item.cover" mode="" />
        </view>
        <view class="list_item_right">
          <view class="list_item_title">{{ item.name }}</view>
          <view class="list_item_content">
            {{ item.desc }}
          </view>
          <view class="list_item_guanzu">
            <text>+ 关注</text>
          </view>
        </view>
      </view>
    </view>
    <!-- /列表 -->
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
.list {
  margin: 10rpx;
  margin-top: 20rpx;
  .list_item {
    display: flex;
    background-color: #fcfffc;
    border-bottom: 1px solid #eee;
    padding: 10rpx 0;
    .list_item_left {
      flex: 1.5;
      display: flex;
      justify-content: center;
      align-content: center;
      image {
        border-radius: 5rpx;
        width: 100%;
        height: 100%;
      }
    }
    .list_item_right {
      flex: 3;
      padding: 20rpx;
      padding-top: 10rpx;
      .list_item_title {
        color: #020202;
        margin-left: 10rpx;
        margin-bottom: 8rpx;
        font-size: 30rpx;
        font-weight: 500;
      }
      .list_item_content {
        color: #6d6f6d;
        font-size: 26rpx;
        -webkit-line-clamp: 1; // 用来限制在一个块元素显示的文本的行数
        display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
        -webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
        text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
        word-break: break-all;
        overflow: hidden;
      }
      .list_item_guanzu {
        margin-top: 25rpx;
        text-align: right;
        text {
          border-radius: 10rpx;
          padding: 5rpx 8px;
          border: 1px solid $uni-color;
          color: $uni-color;
        }
      }
    }
  }
}
</style>