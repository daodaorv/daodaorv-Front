import { get, post } from '@/utils/request';

/**
 * 高德地图API封装
 * 提供地理定位、地址解析、周边搜索等功能
 */

/**
 * 获取当前位置
 * @param {Object} options 定位选项
 * @param {boolean} options.enableHighAccuracy 是否高精度定位
 * @param {number} options.timeout 超时时间(毫秒)
 * @returns {Promise}
 */
export function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02',
      isHighAccuracy: options.enableHighAccuracy || true,
      highAccuracyExpireTime: options.timeout || 10000,
      success: (res) => {
        resolve({
          latitude: res.latitude,
          longitude: res.longitude,
          accuracy: res.accuracy,
          altitude: res.altitude,
          speed: res.speed,
          address: res.address
        });
      },
      fail: (err) => {
        reject({
          code: err.errCode || 'LOCATION_ERROR',
          message: err.errMsg || '定位失败',
          error: err
        });
      }
    });
  });
}

/**
 * 选择位置
 * @returns {Promise}
 */
export function chooseLocation() {
  return new Promise((resolve, reject) => {
    uni.chooseLocation({
      success: (res) => {
        resolve({
          name: res.name,
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        });
      },
      fail: (err) => {
        reject({
          code: err.errCode || 'CHOOSE_LOCATION_ERROR',
          message: err.errMsg || '选择位置失败',
          error: err
        });
      }
    });
  });
}

/**
 * 打开地图查看位置
 * @param {Object} params 位置参数
 * @param {number} params.latitude 纬度
 * @param {number} params.longitude 经度
 * @param {string} params.name 位置名称
 * @param {string} params.address 位置地址
 * @param {number} params.scale 缩放级别(5-18)
 * @returns {Promise}
 */
export function openLocation(params) {
  return new Promise((resolve, reject) => {
    uni.openLocation({
      latitude: params.latitude,
      longitude: params.longitude,
      name: params.name || '',
      address: params.address || '',
      scale: params.scale || 15,
      success: () => {
        resolve();
      },
      fail: (err) => {
        reject({
          code: err.errCode || 'OPEN_LOCATION_ERROR',
          message: err.errMsg || '打开地图失败',
          error: err
        });
      }
    });
  });
}

/**
 * 地理编码 - 地址转坐标
 * @param {Object} params 查询参数
 * @param {string} params.address 地址
 * @param {string} params.city 城市(可选)
 * @returns {Promise}
 */
export function geocode(params) {
  return get('/map/geocode', params);
}

/**
 * 逆地理编码 - 坐标转地址
 * @param {Object} params 查询参数
 * @param {number} params.latitude 纬度
 * @param {number} params.longitude 经度
 * @param {number} params.radius 搜索半径(米，默认1000)
 * @returns {Promise}
 */
export function regeocode(params) {
  return get('/map/regeocode', params);
}

/**
 * 周边搜索
 * @param {Object} params 搜索参数
 * @param {string} params.keywords 搜索关键词
 * @param {number} params.latitude 中心点纬度
 * @param {number} params.longitude 中心点经度
 * @param {number} params.radius 搜索半径(米，默认1000)
 * @param {string} params.types POI类型
 * @param {number} params.page 页码
 * @param {number} params.limit 每页数量
 * @returns {Promise}
 */
export function searchNearby(params) {
  return get('/map/search/nearby', params);
}

/**
 * 搜索营地
 * @param {Object} params 搜索参数
 * @param {number} params.latitude 中心点纬度
 * @param {number} params.longitude 中心点经度
 * @param {number} params.radius 搜索半径(米)
 * @param {string} params.city 城市
 * @returns {Promise}
 */
export function searchCamps(params) {
  return searchNearby({
    ...params,
    keywords: '营地|房车营地|露营|野营',
    types: '150903|150904'
  });
}

/**
 * 计算两点间直线距离
 * @param {number} lat1 起点纬度
 * @param {number} lng1 起点经度
 * @param {number} lat2 终点纬度
 * @param {number} lng2 终点经度
 * @returns {number} 距离(米)
 */
export function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000; // 地球半径(米)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * 格式化距离显示
 * @param {number} distance 距离(米)
 * @returns {string} 格式化后的距离字符串
 */
export function formatDistance(distance) {
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  } else if (distance < 10000) {
    return `${(distance / 1000).toFixed(1)}km`;
  } else {
    return `${Math.round(distance / 1000)}km`;
  }
}