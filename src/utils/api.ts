import { global } from './global'

const timeoutData = { code: -2 }

class ApiService {
  // JIM初始化
  static init (initObj: object, success?: Function, error?: Function, timeout?: Function) {
    return this.callback(global.JIM.init(initObj), success, error, timeout)
  }

  // 登录
  static login (loginObj: object, success?: Function, error?: Function, timeout?: Function) {
    return this.callback(global.JIM.login(loginObj), success, error, timeout)
  }

  // 注册
  static register (registerObj: object, success?: Function, error?: Function, timeout?: Function) {
    return this.callback(global.JIM.register(registerObj), success, error, timeout)
  }

  // 回调函数
  static callback (obj, ...args) {
    return new Promise(resolve => {
      if (obj && obj.onSuccess) {
        obj.onSuccess(successData => {
          if (successData.code) {
            delete successData.code
          }
          if (args[0] && args[0] instanceof Function) {
            args[0](successData)
          }
          resolve(successData)
        }).onFail(errorData => {
          if (args[1] && args[1] instanceof Function) {
            args[1](errorData)
          }
          resolve(errorData)
        }).onTimeout(() => {
          if (args[2] && args[2]) {
            args[2]()
          }
          resolve(timeoutData)
        })
      }
    })
  }

  // 发送消息回调函数
  static msgCallback (obj, ...args) {
    return new Promise(resolve => {
      if (obj && obj.onSuccess) {
        obj.onSuccess((successData, msgs) => {
          if (successData.key) {
            msgs.key = successData.key
          }
          msgs.unread_count = successData.unread_count || 0
          if (args[0] && args[0] instanceof Function) {
            args[0](msgs)
          }
          resolve(msgs)
        }).onFail(errorData => {
          if (args[1] && args[1] instanceof Function) {
            args[1](errorData)
          }
          resolve(errorData)
        }).onTimeout(() => {
          if (args[2] && args[2] instanceof Function) {
            args[2]()
          }
          resolve(timeoutData)
        })
      }
    })
  }
}

export default ApiService
