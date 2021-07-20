<template>
  <view>详情</view>
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
    }
  },
  onLoad(options) {
    this.id = options.id

    // 发送请求
    this._getHomeAlbumDetails()
  },

  methods: {
    async _getHomeAlbumDetails() {
      const res = await getHomeAlbumDetails(this.id, this.params)
      console.log(res)
    },
  },
}
</script>

<style scoped lang="scss"></style>