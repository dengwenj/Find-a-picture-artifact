<template>
  <view class="content">
    <!-- 分段器 标签页 npm run dev:mp-weixin-->
    <view class="category_tab">
      <view class="category_tab_title">
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
      <view class="category_tab_content">1111 </view>
    </view>
    <!-- /分段器 标签页 -->
  </view>
</template>

<script>
import { uniSegmentedControl } from '@dcloudio/uni-ui'

export default {
  data() {
    return {
      items: [
        {
          title: '最新',
        },
        {
          title: '热门',
        },
      ],
      current: 1,
    }
  },

  computed: {
    title() {
      return this.items.map((item) => item.title)
    },
  },
  components: {
    uniSegmentedControl,
  },
  methods: {
    onClickItem(e) {
      this.current = e.currentIndex
    },
  },
}
</script>

<style scoped lang="scss">
.category_tab {
  .category_tab_title {
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
}
</style>