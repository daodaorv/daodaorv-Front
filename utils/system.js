/**
 * 系统信息工具模块
 * 使用新的API替代废弃的getSystemInfoSync
 */

/**
 * 获取窗口信息
 * @returns {Object} 窗口信息对象
 */
export function getWindowInfo() {
  // #ifdef MP-WEIXIN
  if (typeof wx !== 'undefined' && wx.getWindowInfo) {
    return wx.getWindowInfo();
  }
  // #endif
  
  // #ifdef MP-ALIPAY
  if (typeof my !== 'undefined' && my.getSystemInfoSync) {
    try {
      const systemInfo = my.getSystemInfoSync();
      // 标准化字段名，确保与uni-app一致
      return {
        ...systemInfo,
        windowWidth: systemInfo.windowWidth || systemInfo.screenWidth,
        windowHeight: systemInfo.windowHeight || systemInfo.screenHeight,
        statusBarHeight: systemInfo.statusBarHeight || 20
      };
    } catch (error) {
      console.warn('支付宝获取窗口信息失败:', error);
    }
  }
  // #endif
  
  // #ifdef H5
  return {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1,
    statusBarHeight: 0 // H5平台没有状态栏
  };
  // #endif
  
  // 兜底方案，使用uni-app的API
  return uni.getSystemInfoSync();
}

/**
 * 获取设备信息
 * @returns {Object} 设备信息对象
 */
export function getDeviceInfo() {
  // #ifdef MP-WEIXIN
  if (typeof wx !== 'undefined' && wx.getDeviceInfo) {
    return wx.getDeviceInfo();
  }
  // #endif
  
  // #ifdef MP-ALIPAY
  if (typeof my !== 'undefined' && my.getSystemInfoSync) {
    return my.getSystemInfoSync();
  }
  // #endif
  
  // #ifdef H5
  return {
    platform: navigator.platform,
    system: navigator.userAgent,
    brand: '',
    model: ''
  };
  // #endif
  
  // 兜底方案，使用uni-app的API
  return uni.getSystemInfoSync();
}

/**
 * 获取完整的系统信息（兼容旧API）
 * @returns {Object} 系统信息对象
 */
export function getSystemInfo() {
  const windowInfo = getWindowInfo();
  const deviceInfo = getDeviceInfo();
  
  // 合并所有信息，保持与原getSystemInfoSync相同的结构
  return {
    ...windowInfo,
    ...deviceInfo,
    // 为了向下兼容，保留常用字段
    screenWidth: windowInfo.screenWidth || windowInfo.windowWidth,
    screenHeight: windowInfo.screenHeight || windowInfo.windowHeight,
    windowWidth: windowInfo.windowWidth,
    windowHeight: windowInfo.windowHeight,
    pixelRatio: windowInfo.pixelRatio || 1,
    platform: deviceInfo.platform || '',
    system: deviceInfo.system || '',
    brand: deviceInfo.brand || '',
    model: deviceInfo.model || '',
    // 确保状态栏高度被正确传递
    statusBarHeight: windowInfo.statusBarHeight || deviceInfo.statusBarHeight || 20
  };
}

/**
 * 异步获取系统信息
 * @returns {Promise<Object>} 系统信息对象
 */
export function getSystemInfoAsync() {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    if (typeof wx !== 'undefined' && wx.getSystemInfo) {
      wx.getSystemInfo({
        success: resolve,
        fail: reject
      });
      return;
    }
    // #endif
    
    // #ifdef MP-ALIPAY
    if (typeof my !== 'undefined' && my.getSystemInfo) {
      my.getSystemInfo({
        success: resolve,
        fail: reject
      });
      return;
    }
    // #endif
    
    // 其他情况使用同步方法
    try {
      resolve(getSystemInfo());
    } catch (error) {
      reject(error);
    }
  });
}