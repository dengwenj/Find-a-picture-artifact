<template>
  <view @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <slot></slot>
  </view>
</template>

<script>
export default {
  /* 
   1 给容器绑定两个触屏事件 touchstart 和 touchend
   2 用户按下屏幕事件
     1 记录用户按下屏幕的时间 Date.now() 时间戳
     2 记录用户按下屏幕的坐标 x 和 y
   3 用户离开屏幕事件
     1 记录用户离开屏幕的时间 Date.now()
     2 记录用户离开屏幕的坐标 x 和 y
     3 根据两个时间 运算 判断 用户按下屏幕时长是否合法
     4 根据两对坐标 判断距离是否合法 判断 滑动的方向
 */
  data() {
    return {
      // 按下的时间
      startTime: 0,
      // 按下的坐标
      startX: 0,
    }
  },

  methods: {
    handleTouchStart(e) {
      // console.log(e.changedTouches[0].pageX)
      this.startTime = Date.now()
      this.startX = e.changedTouches[0].pageX
    },

    handleTouchEnd(e) {
      // console.log(e.changedTouches[0].pageX)
      const endTime = Date.now()
      const endX = e.changedTouches[0].pageX

      // 判断时间合法不  大于了两秒 就 不执行了
      if (endTime - this.startTime > 2000) {
        return
      }

      let lr = ''
      // 判断滑动的方向  大于 0 说明是往右滑  小于 0 左滑
      // if (Math.abs(endX - this.startX) > 20) {
      //   if (Math.abs(endX) - Math.abs(this.startX) > 0) {
      //     // console.log(Math.abs(endX) - Math.abs(this.startTime))
      //     lr = '向右滑动'
      //   } else if (Math.abs(endX) - Math.abs(this.startX) < 0) {
      //     lr = '向左滑动'
      //   }
      // }
      // console.log(lr)
      if (Math.abs(endX - this.startX) > 50) {
        lr = endX - this.startX > 0 ? '向右滑动' : '向左滑动'
      } else {
        return
      }
      this.$emit('swiperAction', { lr })
    },
  },
}
</script>

<style scoped lang="scss"></style>