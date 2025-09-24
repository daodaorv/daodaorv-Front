import { get, post, put, del } from '@/utils/request';

/**
 * 营地相关API
 * 支持营地共创、查询、预订等功能
 */

/**
 * 获取营地列表
 * @param {Object} params 查询参数
 * @param {string} params.city 城市筛选
 * @param {string} params.type 营地类型: rv|tent|cabin|mixed
 * @param {number} params.latitude 纬度(用于距离排序)
 * @param {number} params.longitude 经度(用于距离排序)
 * @param {number} params.radius 搜索半径(公里)
 * @param {number} params.priceMin 最低价格
 * @param {number} params.priceMax 最高价格
 * @param {Array} params.facilities 设施筛选
 * @param {string} params.sort 排序方式: distance|price|rating|newest
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @returns {Promise}
 */
export function getCampList(params = {}) {
  return get('/camps', params);
}

/**
 * 获取营地详情
 * @param {string} id 营地ID
 * @returns {Promise}
 */
export function getCampDetail(id) {
  return get(`/camps/${id}`);
}

/**
 * 提交营地信息
 * @param {Object} data 营地数据
 * @param {string} data.name 营地名称
 * @param {string} data.type 营地类型
 * @param {string} data.phone 联系电话
 * @param {string} data.description 营地简介
 * @param {string} data.province 所在省份
 * @param {string} data.city 所在城市
 * @param {string} data.district 所在区县
 * @param {string} data.address 详细地址
 * @param {number} data.latitude 纬度
 * @param {number} data.longitude 经度
 * @param {number} data.siteCount 营位数量
 * @param {number} data.priceMin 最低价格
 * @param {number} data.priceMax 最高价格
 * @param {Array} data.facilities 设施列表
 * @param {Array} data.images 图片列表
 * @param {string} data.contactName 联系人
 * @param {string} data.wechat 微信号
 * @returns {Promise}
 */
export function submitCamp(data) {
  return post('/camps/submit', data);
}

/**
 * 创建营地预订
 * @param {Object} data 预订数据
 * @param {string} data.campId 营地ID
 * @param {string} data.siteId 营位ID
 * @param {string} data.checkIn 入住日期
 * @param {string} data.checkOut 退房日期
 * @param {number} data.guests 住客数量
 * @param {Object} data.contactInfo 联系信息
 * @param {string} data.specialRequests 特殊需求
 * @returns {Promise}
 */
export function createCampBooking(data) {
  return post('/camps/bookings', data);
}

/**
 * 获取营地评价列表
 * @param {string} campId 营地ID
 * @param {Object} params 查询参数
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @param {string} params.sort 排序方式: newest|rating|helpful
 * @returns {Promise}
 */
export function getCampReviews(campId, params = {}) {
  return get(`/camps/${campId}/reviews`, params);
}

/**
 * 创建营地评价
 * @param {string} campId 营地ID
 * @param {Object} data 评价数据
 * @param {number} data.rating 评分(1-5)
 * @param {string} data.content 评价内容
 * @param {Array} data.images 评价图片
 * @param {Object} data.ratings 详细评分
 * @returns {Promise}
 */
export function createCampReview(campId, data) {
  return post(`/camps/${campId}/reviews`, data);
}

/**
 * 收藏营地
 * @param {string} campId 营地ID
 * @returns {Promise}
 */
export function favoriteCamp(campId) {
  return post(`/camps/${campId}/favorite`);
}

/**
 * 取消收藏营地
 * @param {string} campId 营地ID
 * @returns {Promise}
 */
export function unfavoriteCamp(campId) {
  return del(`/camps/${campId}/favorite`);
}