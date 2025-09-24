/**
 * 用户认证相关工具函数
 */

// Token相关键名
const TOKEN_KEY = 'dd_token'
const USER_INFO_KEY = 'dd_user_info'
const EMPLOYEE_STATUS_KEY = 'dd_is_employee'
const PREVIOUS_PATH_KEY = 'dd_previous_path'

/**
 * 获取token
 * @returns {string|null}
 */
export function getToken() {
  try {
    return uni.getStorageSync(TOKEN_KEY) || null
  } catch (e) {
    console.error('获取token失败:', e)
    return null
  }
}

/**
 * 设置token
 * @param {string} token
 */
export function setToken(token) {
  try {
    uni.setStorageSync(TOKEN_KEY, token)
  } catch (e) {
    console.error('设置token失败:', e)
  }
}

/**
 * 移除token
 */
export function removeToken() {
  try {
    uni.removeStorageSync(TOKEN_KEY)
  } catch (e) {
    console.error('移除token失败:', e)
  }
}

/**
 * 获取用户信息
 * @returns {Object|null}
 */
export function getUserInfo() {
  try {
    const userInfo = uni.getStorageSync(USER_INFO_KEY)
    return userInfo ? JSON.parse(userInfo) : null
  } catch (e) {
    console.error('获取用户信息失败:', e)
    return null
  }
}

/**
 * 设置用户信息
 * @param {Object} userInfo
 */
export function setUserInfo(userInfo) {
  try {
    uni.setStorageSync(USER_INFO_KEY, JSON.stringify(userInfo))
  } catch (e) {
    console.error('设置用户信息失败:', e)
  }
}

/**
 * 判断是否已登录
 * @returns {boolean}
 */
export function isLoggedIn() {
  return !!getToken()
}

/**
 * 判断是否为员工账号
 * @returns {boolean}
 */
export function isEmployee() {
  try {
    return uni.getStorageSync(EMPLOYEE_STATUS_KEY) === true
  } catch (e) {
    console.error('获取员工状态失败:', e)
    return false
  }
}

/**
 * 退出登录，清除所有认证相关数据
 */
export function logout() {
  removeToken()
  try {
    uni.removeStorageSync(USER_INFO_KEY)
    uni.removeStorageSync(EMPLOYEE_STATUS_KEY)
    uni.removeStorageSync(PREVIOUS_PATH_KEY)
  } catch (e) {
    console.error('清除用户数据失败:', e)
  }
}

/**
 * 登录成功后的处理
 * @param {Object} data - 包含token和userInfo的数据
 */
export function handleLoginSuccess(data) {
  if (data.token) {
    setToken(data.token)
  }
  if (data.userInfo) {
    setUserInfo(data.userInfo)
    // 判断是否是员工账号
    if (data.userInfo.isEmployee) {
      try {
        uni.setStorageSync(EMPLOYEE_STATUS_KEY, true)
      } catch (e) {
        console.error('设置员工状态失败:', e)
      }
    }
  }
}

/**
 * 需要登录才能访问的页面检查
 * @param {string} currentPath - 当前页面路径
 * @returns {boolean} - 是否需要跳转到登录页面
 */
export function requireAuth(currentPath = '') {
  if (!isLoggedIn()) {
    // 保存当前页面路径，登录后返回
    if (currentPath) {
      try {
        uni.setStorageSync(PREVIOUS_PATH_KEY, currentPath)
      } catch (e) {
        console.error('保存跳转路径失败:', e)
      }
    }
    // 跳转到登录页面
    uni.navigateTo({
      url: '/pages/login/index',
      fail: () => {
        // 如果跳转失败，尝试重定向
        uni.redirectTo({
          url: '/pages/login/index'
        })
      }
    })
    return true
  }
  return false
}