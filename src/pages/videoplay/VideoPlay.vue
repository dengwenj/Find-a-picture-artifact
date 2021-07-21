<template>
  <view class="video_play">
    <image :src="video.img" mode="scaleToFill" />
    <!-- 工具栏 -->
    <view class="video_utils">
      <view>
        <text class="iconfont icon-shengyin"></text>
        <text class="iconfont icon-zhuanfa"></text>
      </view>
    </view>
    <!-- /工具栏 -->
    <!-- 视频 -->
    <view class="video">
      <video object-fit="fill" :src="video.video"></video>
    </view>
    <!-- 视频 -->
    <!-- 下载 -->
    <view class="download">
      <view class="xiazai">下载高清</view>
    </view>
    <!-- 下载 -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      video: {},
    }
  },
  onLoad(options) {
    console.log(getApp().globalData)
    this.video = getApp().globalData.video
  },
}
</script>

<style scoped lang="scss">
.video_play {
  position: relative;
  image {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    filter: blur(10px);
  }
  .video_utils {
    view {
      margin-left: 550rpx;
      display: flex;
      text-align: right;
      .icon-shengyin,
      .icon-zhuanfa {
        margin: 10rpx;
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.2);
        font-size: 50rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .video {
    display: flex;
    justify-content: center;
    video {
      width: 360rpx;
      height: 600rpx;
    }
  }
  .download {
    display: flex;
    justify-content: center;
    .xiazai {
      width: 360rpx;
      height: 80rpx;
      background-color: rgba(0, 0, 0, 0.2);
      border: 1px solid #fff;
      color: #fff;
      border-radius: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15rpx;
    }
  }
}
</style>