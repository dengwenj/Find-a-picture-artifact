import request from "@/utils/request"

// 获取首页模块-推荐页面的数据
export const getHomeRecommend = data => {
  return request({
    url: 'http://service.picasso.adesk.com/v3/homepage/vertical',
    method: 'GET',
    data
  })
}

// 获取首页模块-专辑列表的数据
export const getHomeAlbum = data => {
  return request({
    url: 'https://service.picasso.adesk.com/v1/wallpaper/album',
    method: 'GET',
    data
  })
}