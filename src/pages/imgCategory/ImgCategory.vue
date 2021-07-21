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
      <view class="category_tab_content">
        <view
          class="category_tab_content_item"
          v-for="(item, index) in vertical"
          :key="index"
        >
          <view>{{ item.id }}</view>
        </view>
      </view>
    </view>
    <!-- /分段器 标签页 -->
  </view>
</template>

<script>
import { uniSegmentedControl } from '@dcloudio/uni-ui'
// 网络请求
import { categoryNewHot } from '@/api/home'

export default {
  data() {
    return {
      items: [
        {
          title: '最新',
          order: 'new',
        },
        {
          title: '热门',
          order: 'hot',
        },
      ],
      current: 0,

      id: null,
      params: {
        limit: 30,
        skip: 0,
        order: 'new',
      },
      vertical: [], // 循环的数据
    }
  },
  onLoad(options) {
    this.id = options.id
    this._categoryNewHot()
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
    // 点击分段器
    onClickItem(e) {
      // 这个是拿到的索引 点击谁就是谁的索引
      this.current = e.currentIndex

      // “new” 最新 “hot” 热门
      // 点击最新 order要发送 new 点击热门 order 要发送 hot
      this.params.order = this.items[e.currentIndex].order
      // 然后在求发送请
      this._categoryNewHot()
    },

    // 发送请求
    async _categoryNewHot() {
      const res = await categoryNewHot(this.id, this.params)
      this.vertical = res.data.res.vertical
      console.log(res)
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
  .category_tab_content {
    padding: 10rpx 5rpx;
    display: flex;
    flex-wrap: wrap;
    .category_tab_content_item {
      width: 33.33%;
      height: 300rpx;
      overflow: hidden;
      border: 2px solid #fff;
      background-color: aqua;
      view {
      }
    }
  }
}
</style>