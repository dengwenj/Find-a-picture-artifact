import request from "@/utils/request"

// 获取首页模块-推荐页面的数据
export const getHomeRecommend = data => {
  return request({
    url: '/image/v3/homepage/vertical',
    method: 'GET',
    data
  })
}