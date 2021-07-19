<template>
  <view class="content">
    <!-- 分段器 标签页 -->
    <view>
      <uni-segmented-control
        :current="current"
        :values="title"
        @clickItem="onClickItem"
        styleType="text"
        activeColor="#d4237a"
      ></uni-segmented-control>
      <view>
        <view v-if="current === 0">
          <home-recommend />
        </view>
        <view v-if="current === 1">
          <home-category />
        </view>
        <view v-if="current === 2">
          <home-new />
        </view>
        <view v-if="current === 3">
          <home-album />
        </view>
      </view>
    </view>
    <!-- /分段器 标签页 -->
  </view>
</template>

<script>
import { uniSegmentedControl } from '@dcloudio/uni-ui'
import HomeRecommend from './components/HomeRecommend'
import HomeNew from './components/HomeNew'
import HomeCategory from './components/HomeCategory'
import HomeAlbum from './components/HomeAlbum'

export default {
  data() {
    return {
      items: [
        {
          title: '推荐',
        },
        {
          title: '分类',
        },
        {
          title: '最新',
        },
        {
          title: '专辑',
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
    HomeRecommend,
    HomeNew,
    HomeCategory,
    HomeAlbum,
  },
  methods: {
    onClickItem(e) {
      this.current = e.currentIndex
    },
  },
}
</script>

<style scoped lang="scss"></style>