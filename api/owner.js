import { get, post, put, del } from '@/utils/request';

/**
 * 车主相关API
 * 包含车主认证、托管申请、车辆管理、收益管理等功能
 */

/**
 * 获取车主信息
 * @returns {Promise}
 */
export function getOwnerInfo() {
  return get('/owner/info');
}

/**
 * 更新车主信息
 * @param {Object} data 车主信息
 * @param {string} data.name 姓名
 * @param {string} data.phone 电话
 * @param {string} data.avatar 头像
 * @returns {Promise}
 */
export function updateOwnerInfo(data) {
  return put('/owner/info', data);
}

/**
 * 获取车主认证状态
 * @returns {Promise}
 */
export function getOwnerAuthStatus() {
  return get('/owner/auth/status');
}

/**
 * 提交车主认证
 * @param {Object} data 认证数据
 * @param {string} data.type 认证类型: identity|vehicle|photo|bank
 * @param {Object} data.data 认证信息
 * @returns {Promise}
 */
export function submitOwnerAuth(data) {
  return post('/owner/auth/submit', data);
}

/**
 * 提交托管申请
 * @param {Object} data 申请数据
 * @param {number} data.type 托管类型: 1-自有车辆 2-平台购车 3-集资购车
 * @param {string} data.name 姓名
 * @param {string} data.phone 电话
 * @param {string} data.city 城市
 * @param {string} data.licensePlate 车牌号
 * @param {string} data.vehicleInfo 车辆信息
 * @param {string} data.expectedEarnings 期望收益
 * @returns {Promise}
 */
export function submitHostingApplication(data) {
  return post('/owner/hosting/apply', data);
}

/**
 * 获取车辆列表
 * @param {Object} params 查询参数
 * @param {string} params.status 车辆状态
 * @param {string} params.type 托管类型
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @returns {Promise}
 */
export function getVehicleList(params = {}) {
  return get('/owner/vehicles', params);
}

/**
 * 获取车辆详情
 * @param {string} vehicleId 车辆ID
 * @returns {Promise}
 */
export function getVehicleDetail(vehicleId) {
  return get(`/owner/vehicles/${vehicleId}`);
}

/**
 * 获取车主收益数据
 * @param {string} period 时间周期 (today|week|month|year)
 * @returns {Promise}
 */
export function getOwnerEarnings(period = 'month') {
  return get('/owner/earnings', { period });
}

/**
 * 申请收益提现
 * @param {Object} data 提现数据
 * @param {number} data.amount 提现金额
 * @param {string} data.method 提现方式
 * @param {string} data.account 提现账户
 * @returns {Promise}
 */
export function withdrawEarnings(data) {
  return post('/owner/withdraw', data);
}

/**
 * 获取车辆订单列表
 * @param {string} vehicleId 车辆ID
 * @param {Object} params 查询参数
 * @param {string} params.status 订单状态
 * @param {string} params.startDate 开始日期
 * @param {string} params.endDate 结束日期
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @returns {Promise}
 */
export function getVehicleOrders(vehicleId, params = {}) {
  return get(`/owner/vehicles/${vehicleId}/orders`, params);
}

/**
 * 确认订单
 * @param {string} orderId 订单ID
 * @param {Object} data 确认数据
 * @returns {Promise}
 */
export function confirmOrder(orderId, data) {
  return post(`/owner/orders/${orderId}/confirm`, data);
}

/**
 * 拒绝订单
 * @param {string} orderId 订单ID
 * @param {Object} data 拒绝数据
 * @param {string} data.reason 拒绝原因
 * @returns {Promise}
 */
export function rejectOrder(orderId, data) {
  return post(`/owner/orders/${orderId}/reject`, data);
}

/**
 * 提交维护申请
 * @param {string} vehicleId 车辆ID
 * @param {Object} data 维护数据
 * @param {string} data.type 维护类型
 * @param {string} data.description 维护描述
 * @param {Array} data.images 维护图片
 * @param {string} data.urgency 紧急程度: low|medium|high
 * @returns {Promise}
 */
export function submitMaintenanceRequest(vehicleId, data) {
  return post(`/owner/vehicles/${vehicleId}/maintenance`, data);
}

/**
 * 获取集资项目列表
 * @param {Object} params 查询参数
 * @param {string} params.status 项目状态: recruiting|funded|operating|completed
 * @param {string} params.investmentRange 投资金额范围
 * @param {string} params.returnRate 预期收益率
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @returns {Promise}
 */
export function getCrowdfundingProjects(params = {}) {
  return get('/owner/crowdfunding/projects', params);
}

/**
 * 参与集资项目
 * @param {string} projectId 项目ID
 * @param {Object} data 投资数据
 * @param {number} data.amount 投资金额
 * @param {string} data.paymentMethod 支付方式
 * @returns {Promise}
 */
export function joinCrowdfundingProject(projectId, data) {
  return post(`/owner/crowdfunding/projects/${projectId}/join`, data);
}