function request(params) {
  // 加载中
  uni.showLoading({
    title: '加载中',
    mask: true
  })

  // 设置公共的 url
  // params.url = `http://157.122.54.189:9088${params.url}`

  return new Promise((resolve, reject) => {
    uni.request({
      ...params, // 对象合并
      success: (res) => {
        resolve(res) // 成功调这里
      },
      fail: (error) => {
        reject(error) // 失败调这里
      },
      complete: () => {
        // 不管成功与不成功 响应回来了 都关闭加载中
        uni.hideLoading()
      }
    })
  })
}

// 导出
export default request

// let obj = {
//   l: 0,
//   j: 1
// }

// obj.l = 1 + 1
// console.log(obj) // {l:2,j:1}