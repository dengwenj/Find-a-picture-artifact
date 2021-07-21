<template>
  <view class="">1-4</view>
</template>

<script>
import { jingmeiVideo } from '@/api/home'

export default {
  props: {
    urlobj: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  watch: {
    urlobj: {
      async handler(value) {
        const res = await jingmeiVideo(value.url, value.params)
        console.log(res)
      },
      immediate: true,
    },
  },
}
</script>

<style scoped lang="scss"></style>