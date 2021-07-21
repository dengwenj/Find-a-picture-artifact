<template>
  <view class="content">
    <!-- 分段器 标签页 npm run dev:mp-weixin-->
    <view class="video_tab">
      <view class="video_tab_title">
        <view class="tab_uni">
          <uni-segmented-control
            :current="current"
            :values="title"
            @clickItem="onClickItem"
            styleType="text"
            activeColor="#d4237a"
          ></uni-segmented-control>
        </view>
        <view class="iconfont icon-zhenhuichongtubiaozhizuo-kuozhan-"></view>
      </view>
      <view class="video_tab_content">
        <view v-if="current >= 0 && current < 4">
          <video-main
            :urlobj="{ url: items[current].url, params: items[current].params }"
          ></video-main>
        </view>
        <view v-else>
          <video-category></video-category>
        </view>
      </view>
    </view>
    <!-- /分段器 标签页 -->
  </view>
</template>

<script>
import { uniSegmentedControl } from '@dcloudio/uni-ui'
import VideoMain from './videomain/VideoMain'
import VideoCategory from './videocategory/VideoCategory'

export default {
  data() {
    return {
      items: [
        {
          title: '推荐',
          url: 'http://157.122.54.189:9088/videoimg/v1/videowp/featured',
          params: {
            limit: 30,
            skip: 0,
            order: 'hot',
          },
        },
        {
          title: '娱乐',
          url: 'http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',
          params: {
            limit: 30,
            skip: 0,
            order: 'new',
          },
        },
        {
          title: '最新',
          url: 'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',
          params: {
            limit: 30,
            skip: 0,
            order: 'new',
          },
        },
        {
          title: '热门',
          url: 'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',
          params: {
            limit: 30,
            skip: 0,
            order: 'hot',
          },
        },
        {
          title: '分类',
          url: 'http://157.122.54.189:9088/videoimg/v1/videowp/category',
          params: {},
        },
      ],
      current: 0,
    }
  },

  computed: {
    title() {
      return this.items.map((item) => item.title)
    },
  },
  components: {
    uniSegmentedControl,
    VideoMain,
    VideoCategory,
  },
  methods: {
    onClickItem(e) {
      this.current = e.currentIndex
    },
  },
}
</script>

<style scoped lang="scss">
.video_tab {
  .video_tab_title {
    position: relative;
    .tab_uni {
      padding-top: 10rpx;
      width: 60%;
    }
    .icon-zhenhuichongtubiaozhizuo-kuozhan- {
      position: absolute;
      bottom: 20%;
      right: 5%;
      font-size: 38rpx;
    }
  }
  .video_tab_content {
  }
}
</style>