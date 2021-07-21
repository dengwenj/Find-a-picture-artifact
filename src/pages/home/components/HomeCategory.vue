<template>
  <view class="category">
    <navigator
      class="category_item"
      v-for="(item, index) in category"
      :key="index"
      :url="`/pages/imgCategory/ImgCategory?id=${item.id}`"
    >
      <image class="category_cover" :src="item.cover" mode="scaleToFill" />
      <view class="category_name">{{ item.name }}</view>
    </navigator>
  </view>
</template>

<script>
// 网络请求
import { getCategory } from '@/api/home'

export default {
  data() {
    return {
      category: [], // 分类
    }
  },
  created() {
    // 发送请求
    this._getCategory()
  },
  mounted() {
    // 修改页面的标题
    uni.setNavigationBarTitle({ title: '分类' })
  },
  methods: {
    async _getCategory() {
      const res = await getCategory()
      const { category } = res.data.res
      this.category = category
    },
  },
}
</script>

<style scoped lang="scss">
.category {
  padding-top: 10rpx;
  display: flex;
  flex-wrap: wrap;
  .category_item {
    position: relative;
    width: 32.2%;
    height: 220rpx;
    border: 4rpx solid #fff;
    .category_cover {
      border-radius: 5rpx;
      width: 100%;
      height: 100%;
    }
    .category_name {
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 0 0 10rpx 15rpx;
      color: #fff;
      font-size: 30rpx;
    }
  }
}
</style>