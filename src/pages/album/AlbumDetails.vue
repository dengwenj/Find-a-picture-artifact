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
          {{ album.desc }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getHomeAlbumDetails } from '@/api/home'

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
    }
  },
  onLoad(options) {
    this.id = options.id
    // this.id = '4ffa889b5ba1c60a31000143'

    // 发送请求
    this._getHomeAlbumDetails()
  },

  methods: {
    async _getHomeAlbumDetails() {
      const res = await getHomeAlbumDetails(this.id, this.params)
      console.log(res)
      this.album = res.data.res.album
      this.wallpaper = res.data.res.wallpaper
    },
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
}
</style>