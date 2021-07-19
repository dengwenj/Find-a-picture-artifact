<template>
  <view class="content">
    <home-recommend />
    <home-new />
    <home-category />
    <home-album />
  </view>
</template>

<script>
import HomeRecommend from './components/HomeRecommend'
import HomeNew from './components/HomeNew'
import HomeCategory from './components/HomeCategory'
import HomeAlbum from './components/HomeAlbum'

export default {
  components: {
    HomeRecommend,
    HomeNew,
    HomeCategory,
    HomeAlbum,
  },
}
</script>

<style scoped lang="scss"></style>