<template>
  <view class="album_details">
    <view class="album_top">
      <view class="album_details_img">
        <image :src="album.cover" mode="aspectFill" />
        <view class="album_details_title">{{ album.name }}</view>
        <view class="guanzuzhuanji">关注专辑</view>
      </view>
      <view class="album_details_user">
        <view class="user_info">
          <view class="user_img">
            <image :src="album.user.avatar" />
          </view>
          <view class="user_name">{{ album.user.name }}</view>
        </view>
        <view class="album_details_content">
          <text> {{ album.desc }}</text>
        </view>
      </view>
    </view>
    <!-- 列表 -->
    <view class="album_list">
      <view
        class="album_list_item"
        v-for="(item, index) in wallpaper"
        :key="index"
      >
        <go-detail :list="wallpaper" :index="index">
          <image :src="item.thumb" mode="widthFix" />
        </go-detail>
      </view>
    </view>
    <!-- 列表 -->
  </view>
</template>

<script>
import { getHomeAlbumDetails, getHomeRecommend } from '@/api/home'
import GoDetail from '@/pages/components/GoDetail'

export default {
  data() {
    return {
      id: null,
      params: {
        limit: 30,
        order: 'new',
        skip: 0,
        // 1 返回值中 有 album 对象 表示第一次请求数据
        // 0 返回值中 只有 wallpaper 数组 不是第一次请求数据
        first: 1,
      },
      album: {}, // 专辑信息
      wallpaper: [], // 专辑列表
      // list列表加载下一页数据
      data: {
        limit: 30,
        order: 'hot',
        skip: 0,
      },
      isJZWB: true, // 是否还有下一页
    }
  },
  components: {
    GoDetail,
  },
  onLoad(options) {
    this.id = options.id

    // 发送请求
    this._getHomeAlbumDetails()
    this._getHomeRecommend()
  },

  methods: {
    async _getHomeAlbumDetails() {
      const res = await getHomeAlbumDetails(this.id, this.params)
      this.album = res.data.res.album
      this.wallpaper = res.data.res.wallpaper
    },

    //  用热门图片代替下下面的列表图片  因为下面 list 列表数据后台没有了
    async _getHomeRecommend() {
      const res = await getHomeRecommend(this.data)
      // console.log(res.data.res.vertical)

      // 这个长度为 0 了表示没有下一页了 到底了
      if (res.data.res.vertical.length === 0) {
        this.isJZWB = false

        // 没有下一页 到底了 提示用户
        uni.showToast({
          title: '数据加载完啦~',
          icon: 'none',
          mask: true,
        })

        return
      }

      this.wallpaper = [...this.wallpaper, ...res.data.res.vertical] // 合并数组 不是就是替换了 前面的数据就没有了
    },
  },

  // 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项 页面周期事件
  onReachBottom() {
    // 判断数据是否还有下一页
    if (this.isJZWB) {
      this.data.skip += this.data.limit // 跳过 30 条，加载新的 30 条
      this._getHomeRecommend()
      return
    }

    // 没有下一页 到底了 提示用户
    uni.showToast({
      title: '数据加载完啦~',
      icon: 'none',
      mask: true,
    })
  },
}
</script>

<style scoped lang="scss">
.album_details {
  .album_top {
    width: 100%;
    .album_details_img {
      width: 100%;
      height: 500rpx;
      position: relative;
      image {
        width: 100%;
        height: 100%;
      }
      .album_details_title {
        position: absolute;
        bottom: 20rpx;
        left: 40rpx;
        color: #fff;
        font-size: 32rpx;
      }
      .guanzuzhuanji {
        position: absolute;
        bottom: 20rpx;
        right: 20rpx;
        padding: 10rpx 20rpx;
        background-color: #e83a79;
        border-radius: 10rpx;
        color: #fff;
        font-size: 26rpx;
      }
    }
    .album_details_user {
      margin-top: 20rpx;
      padding: 0 20rpx;
      .user_info {
        display: flex;
        .user_img {
          image {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            background-size: cover;
          }
        }
        .user_name {
          margin-left: 20rpx;
          color: #383a38;
          padding-top: 10rpx;
        }
      }
      .album_details_content {
        margin-top: 10rpx;
        font-size: 26rpx;
        color: #919491;
      }
    }
  }
  .album_list {
    margin-top: 60rpx;
    padding: 0 2rpx;
    display: flex;
    flex-wrap: wrap;
    .album_list_item {
      width: 33.33%;
      border: 1rpx solid #fff;
      image {
        width: 100%;
      }
    }
  }
}
</style>