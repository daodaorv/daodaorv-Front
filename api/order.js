import { get, post, put, del } from '@/utils/request';

/**
 * 订单相关API
 * 支持订单创建、查询、支付、取消等功能
 */

// ==================== 订单创建相关 ====================

/**
 * 创建订单
 * @param {Object} data 订单数据
 * @param {string} data.orderType 订单类型: VEHICLE_RENTAL|CAMP_BOOKING|TOUR_PACKAGE|MALL_PRODUCT
 * @param {Array} data.items 订单项目
 * @param {string} data.couponId 优惠券ID
 * @param {string} data.insuranceId 保险ID
 * @param {string} data.pickupStoreId 取车门店ID
 * @param {string} data.dropoffStoreId 还车门店ID
 * @param {string} data.startTime 开始时间
 * @param {string} data.endTime 结束时间
 * @param {Object} data.contactInfo 联系信息
 * @returns {Promise}
 */
export function createOrder(data) {
  return post('/orders', data);
}

/**
 * 预计算订单金额
 * @param {Object} data 订单数据
 * @param {Array} data.items 订单项目
 * @param {Array} data.couponIds 优惠券ID列表
 * @param {string} data.insuranceId 保险ID
 * @returns {Promise}
 */
export function calculateOrderPrice(data) {
  return post('/orders/calculate-price', data);
}

/**
 * 获取我的订单列表
 * @param {Object} params 查询参数
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @param {string} params.status 订单状态筛选
 * @param {string} params.orderType 订单类型筛选
 * @returns {Promise}
 */
export function getMyOrders(params = {}) {
  return get('/orders', params);
}

/**
 * 获取特定订单详情
 * @param {string} orderId 订单ID
 * @returns {Promise}
 */
export function getOrderDetail(orderId) {
  return get(`/orders/${orderId}`);
}

/**
 * 获取订单支付信息
 * @param {string} orderId 订单ID
 * @param {string} paymentMethod 支付方式: wechat|alipay|balance
 * @returns {Promise}
 */
export function getOrderPaymentInfo(orderId, paymentMethod = 'wechat') {
  return post(`/orders/${orderId}/payment-info`, { paymentMethod });
}

/**
 * 确认订单支付
 * @param {string} orderId 订单ID
 * @param {Object} paymentData 支付数据
 * @param {string} paymentData.paymentMethod 支付方式
 * @param {string} paymentData.transactionId 交易ID
 * @param {number} paymentData.amount 支付金额
 * @returns {Promise}
 */
export function confirmOrderPayment(orderId, paymentData) {
  return post(`/orders/${orderId}/payment-confirm`, paymentData);
}

/**
 * 取消订单
 * @param {string} orderId 订单ID
 * @param {string} reason 取消原因
 * @returns {Promise}
 */
export function cancelOrder(orderId, reason = '') {
  return put(`/orders/${orderId}/cancel`, { reason });
}

/**
 * 提交订单评价
 * @param {string} orderId 订单ID
 * @param {Object} reviewData 评价数据
 * @param {number} reviewData.rating 总体评分 1-5
 * @param {string} reviewData.comment 评价内容
 * @param {Array} reviewData.images 评价图片
 * @param {Object} reviewData.detailRatings 详细评分
 * @returns {Promise}
 */
export function submitOrderReview(orderId, reviewData) {
  return post(`/orders/${orderId}/comments`, reviewData);
}

/**
 * 获取特惠租车路线列表
 * @param {Object} params 查询参数
 * @param {string} params.city 城市筛选
 * @param {string} params.dateRange 日期范围
 * @param {string} params.sortBy 排序方式
 * @returns {Promise}
 */
export function getSpecialRentalRoutes(params = {}) {
  return get('/special-rental/routes', params);
}

/**
 * 计算特惠租车价格
 * @param {Object} data 计算参数
 * @param {string} data.vehicleId 车辆ID
 * @param {string} data.startDate 开始日期
 * @param {string} data.endDate 结束日期
 * @param {string} data.pickupTime 提车时间
 * @param {string} data.returnTime 还车时间
 * @returns {Promise}
 */
export function calculateSpecialRentalPrice(data) {
  return post('/special-rental/calculate-price', data);
}

// ==================== 订单状态常量 ====================

export const ORDER_STATUS = {
  PENDING_PAYMENT: 'PENDING_PAYMENT',      // 待付款
  PENDING_CONFIRMATION: 'PENDING_CONFIRMATION', // 待确认
  IN_PROGRESS: 'IN_PROGRESS',              // 进行中
  COMPLETED: 'COMPLETED',                  // 已完成
  CANCELLED: 'CANCELLED',                  // 已取消
  PENDING_REFUND: 'PENDING_REFUND',        // 待退款
  REFUNDED: 'REFUNDED'                     // 已退款
};

export const ORDER_TYPE = {
  VEHICLE_RENTAL: 'VEHICLE_RENTAL',        // 房车租赁
  CAMP_BOOKING: 'CAMP_BOOKING',            // 营地预订
  TOUR_PACKAGE: 'TOUR_PACKAGE',            // 旅游套餐
  CUSTOM_TOUR: 'CUSTOM_TOUR',              // 定制旅游
  MALL_PRODUCT: 'MALL_PRODUCT'             // 商城商品
};