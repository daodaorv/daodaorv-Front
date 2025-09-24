import { get, post, put, del } from '@/utils/request';

/**
 * 钱包相关API
 * 支持余额查询、充值、提现、交易记录等功能
 */

/**
 * 获取用户钱包余额
 * @returns {Promise}
 */
export function getWalletBalance() {
  return get('/wallet/balance');
}

/**
 * 获取钱包详细信息
 * @returns {Promise}
 */
export function getWalletInfo() {
  return get('/wallet/info');
}

/**
 * 创建充值订单
 * @param {Object} data 充值数据
 * @param {number} data.amount 充值金额
 * @param {string} data.paymentMethod 支付方式: wechat|alipay
 * @returns {Promise}
 */
export function createRechargeOrder(data) {
  return post('/wallet/recharge', data);
}

/**
 * 申请提现
 * @param {Object} data 提现数据
 * @param {number} data.amount 提现金额
 * @param {string} data.withdrawMethod 提现方式: wechat|bank
 * @param {Object} data.accountInfo 账户信息
 * @returns {Promise}
 */
export function requestWithdraw(data) {
  return post('/wallet/withdraw', data);
}

/**
 * 获取钱包交易记录
 * @param {Object} params 查询参数
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @param {string} params.type 交易类型筛选
 * @param {string} params.startDate 开始日期
 * @param {string} params.endDate 结束日期
 * @returns {Promise}
 */
export function getWalletTransactions(params = {}) {
  return get('/wallet/transactions', params);
}

/**
 * 使用余额支付
 * @param {Object} data 支付数据
 * @param {string} data.orderId 订单ID
 * @param {number} data.amount 支付金额
 * @param {string} data.password 支付密码（如果需要）
 * @returns {Promise}
 */
export function payWithBalance(data) {
  return post('/wallet/pay', data);
}

/**
 * 验证支付密码
 * @param {string} password 支付密码
 * @returns {Promise}
 */
export function verifyPaymentPassword(password) {
  return post('/wallet/verify-password', { password });
}

/**
 * 设置支付密码
 * @param {Object} data 密码数据
 * @param {string} data.password 新密码
 * @param {string} data.confirmPassword 确认密码
 * @param {string} data.verificationCode 验证码（如果需要）
 * @returns {Promise}
 */
export function setPaymentPassword(data) {
  return post('/wallet/set-password', data);
}

/**
 * 执行组合支付
 * @param {Object} data 支付数据
 * @param {string} data.orderId 订单ID
 * @param {number} data.totalAmount 总金额
 * @param {number} data.balanceAmount 余额支付金额
 * @param {number} data.thirdPartyAmount 第三方支付金额
 * @param {string} data.thirdPartyMethod 第三方支付方式: wechat|alipay
 * @param {string} data.paymentPassword 支付密码（如果需要）
 * @returns {Promise}
 */
export function executeCombinationPayment(data) {
  return post('/wallet/combination-payment', data);
}

// 常量定义
export const WALLET_TRANSACTION_TYPE = {
  RECHARGE: 'RECHARGE',           // 充值
  WITHDRAW: 'WITHDRAW',           // 提现
  PAYMENT: 'PAYMENT',             // 支付
  REFUND: 'REFUND',               // 退款
  COMMISSION: 'COMMISSION',       // 佣金收入
  BONUS: 'BONUS'                  // 奖励收入
};

export const PAYMENT_METHOD = {
  WECHAT: 'wechat',               // 微信支付
  ALIPAY: 'alipay',               // 支付宝
  BALANCE: 'balance',             // 余额支付
  COMBINATION_WECHAT: 'combination_wechat',  // 余额+微信组合支付
  COMBINATION_ALIPAY: 'combination_alipay'   // 余额+支付宝组合支付
};