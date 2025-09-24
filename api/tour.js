import { get, post, put, del } from '@/utils/request';

/**
 * 旅游路线相关API
 * 支持路线查询、预订、评价等功能
 */

/**
 * 获取省份路线列表
 * @param {Object} params 查询参数
 * @param {string} params.provinceId 省份ID
 * @param {string} params.type 路线类型: cultural|nature|adventure|photography
 * @param {number} params.duration 天数筛选
 * @param {number} params.priceMin 最低价格
 * @param {number} params.priceMax 最高价格
 * @param {string} params.difficulty 难度等级: 1|2|3|4|5
 * @param {string} params.sort 排序方式: price|rating|popularity|duration
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @returns {Promise}
 */
export function getProvinceRoutes(params) {
  return get('/tours/province', params);
}

/**
 * 获取路线详情
 * @param {string} id 路线ID
 * @returns {Promise}
 */
export function getRouteDetail(id) {
  return get(`/tours/${id}`);
}

/**
 * 搜索路线
 * @param {Object} params 搜索参数
 * @param {string} params.keyword 搜索关键词
 * @param {string} params.destination 目的地
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @returns {Promise}
 */
export function searchRoutes(params) {
  return get('/tours/search', params);
}

/**
 * 获取热门路线
 * @param {Object} params 查询参数
 * @param {string} params.category 路线分类
 * @param {number} params.limit 数量限制
 * @returns {Promise}
 */
export function getPopularRoutes(params = {}) {
  return get('/tours/popular', params);
}

/**
 * 创建路线预订
 * @param {Object} data 预订数据
 * @param {string} data.routeId 路线ID
 * @param {string} data.departureDate 出发日期
 * @param {number} data.adults 成人数量
 * @param {number} data.children 儿童数量
 * @param {Object} data.contactInfo 联系信息
 * @param {string} data.specialRequests 特殊需求
 * @param {Array} data.travelers 旅客信息
 * @returns {Promise}
 */
export function createRouteBooking(data) {
  return post('/tours/bookings', data);
}

/**
 * 获取路线评价列表
 * @param {string} routeId 路线ID
 * @param {Object} params 查询参数
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @param {string} params.sort 排序方式: newest|rating|helpful
 * @returns {Promise}
 */
export function getRouteReviews(routeId, params = {}) {
  return get(`/tours/${routeId}/reviews`, params);
}

/**
 * 创建路线评价
 * @param {string} routeId 路线ID
 * @param {Object} data 评价数据
 * @param {number} data.rating 总体评分(1-5)
 * @param {string} data.content 评价内容
 * @param {Array} data.images 评价图片
 * @param {Object} data.ratings 详细评分
 * @returns {Promise}
 */
export function createRouteReview(routeId, data) {
  return post(`/tours/${routeId}/reviews`, data);
}

/**
 * 收藏路线
 * @param {string} routeId 路线ID
 * @returns {Promise}
 */
export function favoriteRoute(routeId) {
  return post(`/tours/${routeId}/favorite`);
}

/**
 * 提交定制路线需求
 * @param {Object} data 定制需求数据
 * @param {string} data.destination 目的地
 * @param {string} data.duration 行程天数
 * @param {string} data.departureDate 期望出发日期
 * @param {number} data.peopleCount 人数
 * @param {number} data.budget 预算范围
 * @param {Array} data.interests 兴趣偏好
 * @param {string} data.specialRequests 特殊要求
 * @param {Object} data.contactInfo 联系信息
 * @returns {Promise}
 */
export function submitCustomRequest(data) {
  return post('/tours/custom-request', data);
}