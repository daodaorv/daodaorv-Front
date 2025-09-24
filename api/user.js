import { get, post, put, del } from '@/utils/request';

/**
 * 用户相关API
 * 包含认证、用户信息管理等功能
 */

// ==================== 用户认证相关 ====================

/**
 * 小程序登录
 * @param {Object} data 登录数据
 * @param {string} data.code 登录code
 * @param {Object} data.userInfo 用户信息对象
 * @param {string} data.userInfo.nickName 用户昵称
 * @param {string} data.userInfo.avatarUrl 用户头像
 * @param {number} data.userInfo.gender 用户性别(0:未知, 1:男, 2:女)
 * @returns {Promise}
 */
export function login(data) {
  return post('/auth/login', data);
}

/**
 * 手机号登录
 * @param {Object} data 登录数据
 * @param {string} data.phone 手机号
 * @param {string} data.code 验证码
 * @returns {Promise}
 */
export function phoneLogin(data) {
  return post('/auth/phone-login', data);
}

/**
 * 密码登录
 * @param {Object} data 登录数据
 * @param {string} data.phone 手机号
 * @param {string} data.password 密码
 * @returns {Promise}
 */
export function passwordLogin(data) {
  return post('/auth/password-login', data);
}

/**
 * 发送短信验证码
 * @param {Object} data 数据
 * @param {string} data.phone 手机号
 * @param {string} data.type 验证码类型: login|register|reset|bind
 * @returns {Promise}
 */
export function sendSmsCode(data) {
  return post('/auth/send-sms', data);
}

/**
 * 获取当前用户信息
 * @returns {Promise}
 */
export function getUserInfo() {
  return get('/user/me');
}

/**
 * 更新用户信息
 * @param {Object} data 用户数据
 * @param {string} data.nickName 昵称
 * @param {string} data.avatarUrl 头像
 * @param {number} data.gender 性别
 * @param {string} data.city 城市
 * @param {string} data.bio 个人简介
 * @returns {Promise}
 */
export function updateUserInfo(data) {
  return put('/user/me', data);
}

/**
 * 实名认证
 * @param {Object} data 认证数据
 * @param {string} data.realName 真实姓名
 * @param {string} data.idCard 身份证号
 * @param {string} data.idCardFrontUrl 身份证正面照
 * @param {string} data.idCardBackUrl 身份证背面照
 * @returns {Promise}
 */
export function realNameAuth(data) {
  return post('/user/real-name-auth', data);
}

/**
 * 驾驶证认证
 * @param {Object} data 认证数据
 * @param {string} data.drivingLicenseUrl 驾驶证照片
 * @param {string} data.drivingLicenseNumber 驾驶证号
 * @param {string} data.licenseType 准驾车型
 * @param {string} data.issueDate 发证日期
 * @param {string} data.expireDate 有效期
 * @returns {Promise}
 */
export function driverLicenseAuth(data) {
  return post('/user/driver-license-auth', data);
}

/**
 * 获取用户积分
 * @returns {Promise}
 */
export function getUserPoints() {
  return get('/user/points');
}

/**
 * 获取分销统计数据
 * @returns {Promise}
 */
export function getDistributionStats() {
  return get('/user/distribution/stats');
}

/**
 * 获取佣金数据
 * @returns {Promise}
 */
export function getCommissionData() {
  return get('/user/commission/overview');
}

/**
 * 获取团队信息
 * @returns {Promise}
 */
export function getTeamInfo() {
  return get('/user/team/info');
}

/**
 * 获取PLUS会员信息
 * @returns {Promise}
 */
export function getPlusMembershipInfo() {
  return get('/user/plus-membership');
}

/**
 * 购买PLUS会员
 * @param {Object} data 购买数据
 * @param {string} data.planId 套餐ID
 * @param {string} data.paymentMethod 支付方式
 * @returns {Promise}
 */
export function purchasePlusMembership(data) {
  return post('/user/plus-membership/purchase', data);
}

/**
 * 获取用户优惠券列表
 * @param {Object} params 查询参数
 * @param {string} params.status 优惠券状态: all|unused|used|expired
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @returns {Promise}
 */
export function getUserCoupons(params = {}) {
  return get('/user/coupons', params);
}