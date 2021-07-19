import request from "@/utils/request"

// 获取首页模块-推荐页面的数据
export const getHomeRecommend = () => {
  return request({
    url: '/image/v1/vertical/category',
    method: 'get'
  })
}