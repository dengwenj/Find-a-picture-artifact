<template>
  <view class="video_play">
    <image :src="video.img" mode="scaleToFill" />
    <!-- 工具栏 -->
    <view class="video_utils">
      <view>
        <text
          @click="muted = !muted"
          :class="['iconfont', muted ? 'icon-jingyin' : 'icon-shengyin']"
        ></text>
        <button open-type="share" class="iconfont icon-zhuanfa"></button>
      </view>
    </view>
    <!-- /工具栏 -->
    <!-- 视频 -->
    <view class="video">
      <video :muted="muted" object-fit="fill" :src="video.video"></video>
    </view>
    <!-- 视频 -->
    <!-- 下载 -->
    <view class="download" @click="handleDownLond">
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
      muted: false, // 是否静音
    }
  },
  onLoad(options) {
    this.video = getApp().globalData.video
  },
  methods: {
    async handleDownLond() {
      uni.showLoading({
        title: '下载中',
        mask: true,
      })
      // 下载远程文件到小程序的内存中
      const res = await uni.downloadFile({
        url: this.video.video,
      })
      const { tempFilePath } = res[1]

      uni.hideLoading()
      // console.log(tempFilePath)
      // 将视频内存中下载到本地
      const res1 = await uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath,
      })
      if (!res1[0].errMsg.includes('fail')) {
        uni.showToast({
          title: '下载完成',
          icon: 'success',
          mask: true,
        })
      }
    },
  },
}
// var str = 'ddd'
// str.includes
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
      .iconfont {
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
      width: 600rpx;
      height: 1000rpx;
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