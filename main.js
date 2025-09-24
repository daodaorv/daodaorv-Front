import { createSSRApp } from 'vue'
import App from './App.vue'
import { registerGlobalComponents } from '@/utils/register-components'
import { globalErrorHandler, ERROR_TYPES } from '@/utils/error-handler'
import { SafeIterationMixin } from '@/utils/safe-iteration'
import { setupGlobalErrorHandling, IterationSafetyMixin } from '@/utils/iteration-safety'
import { initCompatibility, isH5 } from '@/utils/miniprogram-compatibility'
import { safeMpWeixinInit, isMpWeixin } from '@/utils/mp-weixin-safe-start'

export function createApp() {
  const app = createSSRApp(App)
  
  // 根据环境选择不同的初始化策略
  if (isMpWeixin()) {
    // 微信小程序使用安全启动模式
    console.log('🔧 使用微信小程序安全模式')
    safeMpWeixinInit()
  } else {
    // 其他环境延迟初始化兼容性支持
    console.log('🔧 使用通用兼容性模式') 
    try {
      initCompatibility()
    } catch (error) {
      console.warn('兼容性初始化跳过:', error.message)
    }
  }

  // 注册全局组件
  registerGlobalComponents(app)

  // 注册全局错误处理
  app.config.errorHandler = (error, instance, info) => {
    // 特殊处理迭代错误
    if (error && error.message &&
        (error.message.includes('object null is not iterable') ||
         error.message.includes('cannot read property Symbol(Symbol.iterator)'))) {
      console.warn('检测到迭代错误，已被安全处理:', error.message);
      console.warn('组件:', instance?.$?.type?.name || 'Unknown');
      console.warn('错误信息:', info);
      return; // 阻止错误继续传播
    }

    globalErrorHandler.handleError(error, ERROR_TYPES.COMPONENT_ERROR, {
      componentName: instance?.$?.type?.name || 'Unknown',
      errorInfo: info
    })
  }

  // 捕获未处理的Promise错误（只在H5环境中）
  if (isH5() && typeof window !== 'undefined') {
    try {
      window.addEventListener('unhandledrejection', (event) => {
        if (event.reason && event.reason.message) {
          const message = event.reason.message;
          
          // 检查是否为已知的兼容性错误
          if (message.includes('object null is not iterable') ||
              message.includes('cannot read property Symbol(Symbol.iterator)') ||
              message.includes('document.querySelector is not a function') ||
              message.includes('document.getElementById is not a function')) {
            console.warn('检测到兼容性错误，已被安全处理:', message);
            event.preventDefault();
            return;
          }
        }

        globalErrorHandler.handleError(event.reason, ERROR_TYPES.PROMISE_ERROR, {
          context: 'unhandledrejection'
        });
      });
    } catch (error) {
      console.warn('Promise错误监听设置失败:', error.message)
    }
  }

  // 注册安全迭代混入
  app.mixin(SafeIterationMixin)
  app.mixin(IterationSafetyMixin)
  
  // 设置全局错误处理
  setupGlobalErrorHandling()

  // 全局属性
  app.config.globalProperties.$errorHandler = globalErrorHandler
  app.config.globalProperties.$ERROR_TYPES = ERROR_TYPES

  return {
    app
  }
}