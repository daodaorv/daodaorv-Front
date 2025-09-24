import { get, post, put, del } from '@/utils/request.js'

/**
 * 合同管理相关API
 */

/**
 * 获取合同模板
 * @param {Object} data - 订单信息
 * @returns {Promise}
 */
export function getContractTemplate(data) {
  return post('/contract/template', data)
}

/**
 * 生成合同
 * @param {Object} data - 合同生成数据
 * @returns {Promise}
 */
export function generateContract(data) {
  return post('/contract/generate', data)
}

/**
 * 提交合同签署
 * @param {Object} data - 合同签署数据
 * @returns {Promise}
 */
export function submitContract(data) {
  return post('/contract/submit', data)
}

/**
 * 获取用户合同列表
 * @param {Object} params - 查询参数
 * @returns {Promise}
 */
export function getUserContracts(params = {}) {
  return get('/contract/user/list', params)
}

/**
 * 获取合同详情
 * @param {string} contractId - 合同ID
 * @returns {Promise}
 */
export function getContractDetail(contractId) {
  return get(`/contract/detail/${contractId}`)
}

/**
 * 下载合同
 * @param {string} contractId - 合同ID
 * @returns {Promise}
 */
export function downloadContract(contractId) {
  return get(`/contract/download/${contractId}`)
}

/**
 * 更新合同状态
 * @param {string} contractId - 合同ID
 * @param {Object} data - 状态数据
 * @returns {Promise}
 */
export function updateContractStatus(contractId, data) {
  return put(`/contract/status/${contractId}`, data)
}

/**
 * 验证合同签名
 * @param {Object} data - 签名验证数据
 * @returns {Promise}
 */
export function verifyContractSignature(data) {
  return post('/contract/verify-signature', data)
}

/**
 * 创建电子签名会话
 * @param {Object} data - 签名会话数据
 * @returns {Promise}
 */
export function createSignatureSession(data) {
  return post('/contract/signature/session', data)
}

/**
 * 完成电子签名
 * @param {string} sessionId - 会话ID
 * @param {Object} data - 签名数据
 * @returns {Promise}
 */
export function completeSignature(sessionId, data) {
  return post(`/contract/signature/complete/${sessionId}`, data)
}

// 合同状态常量
export const CONTRACT_STATUS = {
  PENDING: 'pending',           // 待签署
  ACTIVE: 'active',            // 执行中
  COMPLETED: 'completed',      // 已完成
  EXPIRED: 'expired',          // 已过期
  CANCELLED: 'cancelled',      // 已取消
  TERMINATED: 'terminated'     // 已终止
}

// 合同类型常量
export const CONTRACT_TYPE = {
  RENTAL: 'rental',           // 房车租赁
  CAMP: 'camp',              // 营地预订
  TOUR: 'tour',              // 定制旅游
  HOSTING: 'hosting',        // 房车托管
  CROWDFUNDING: 'crowdfunding', // 众筹投资
  PURCHASE: 'purchase'       // 平台购车
}