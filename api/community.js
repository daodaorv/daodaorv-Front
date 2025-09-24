import { get, post, put, del } from '@/utils/request';

/**
 * 社区内容相关API
 * 支持三种内容类型：guide(攻略)、experience(体验)、activity(活动)
 */

/**
 * 发布内容
 * @param {Object} data 内容数据
 * @param {string} data.type 内容类型: guide|experience|activity
 * @param {string} data.title 标题
 * @param {string} data.content 内容详情
 * @param {Array} data.images 图片列表
 * @param {Array} data.tags 标签列表
 * @param {boolean} data.isPrivate 是否私有
 * @param {boolean} data.enableNotification 是否开启通知
 * @param {Object} data.typeSpecificData 类型特有数据
 * @returns {Promise}
 */
export function publishContent(data) {
  return post('/community/posts', data);
}

/**
 * 获取内容列表
 * @param {Object} params 查询参数
 * @param {string} params.type 内容类型筛选
 * @param {string} params.keyword 搜索关键词
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @param {string} params.sort 排序方式: latest|hot|recommend
 * @param {string} params.city 城市筛选
 * @returns {Promise}
 */
export function getContentList(params = {}) {
  return get('/community/posts', params);
}

/**
 * 获取内容详情
 * @param {string} id 内容ID
 * @returns {Promise}
 */
export function getContentDetail(id) {
  return get(`/community/posts/${id}`);
}

/**
 * 点赞内容
 * @param {string} id 内容ID
 * @returns {Promise}
 */
export function likeContent(id) {
  return post(`/community/posts/${id}/like`);
}

/**
 * 收藏内容
 * @param {string} id 内容ID
 * @returns {Promise}
 */
export function favoriteContent(id) {
  return post(`/community/posts/${id}/favorite`);
}

/**
 * 获取评论列表
 * @param {string} postId 内容ID
 * @param {Object} params 查询参数
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @returns {Promise}
 */
export function getComments(postId, params = {}) {
  return get(`/community/posts/${postId}/comments`, params);
}

/**
 * 发表评论
 * @param {string} postId 内容ID
 * @param {Object} data 评论数据
 * @param {string} data.content 评论内容
 * @param {string} data.parentId 父评论ID(可选)
 * @returns {Promise}
 */
export function createComment(postId, data) {
  return post(`/community/posts/${postId}/comments`, data);
}

/**
 * 获取热门标签
 * @param {Object} params 查询参数
 * @param {string} params.type 内容类型
 * @param {number} params.limit 数量限制
 * @returns {Promise}
 */
export function getPopularTags(params = {}) {
  return get('/community/tags/popular', params);
}

/**
 * 获取我的收藏列表
 * @param {Object} params 查询参数
 * @returns {Promise}
 */
export function getMyFavorites(params = {}) {
  return get('/community/me/favorites', params);
}

/**
 * 获取我的发布列表
 * @param {Object} params 查询参数
 * @returns {Promise}
 */
export function getMyPosts(params = {}) {
  return get('/community/me/posts', params);
}