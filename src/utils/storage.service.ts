// 登录信息长期记录
export class StorageService {
  static set (key: string, data: any, useCookie: boolean, time?: number, path?: string) {
    if (localStorage && !useCookie) {
      try {
        localStorage.setItem(key, data)
        return
      } catch (error) { // 在Safari的匿名模式会报错

      }
    }
    const exp = new Date()
    if (time) {
      exp.setTime(exp.getTime() + time)
    } else {
      exp.setTime(exp.getTime() + 23.9 * 60 * 60 * 1000)
    }
    if (path) {
      document.cookie = key + '=' + data + ';expires=' + exp.toUTCString() + ';path=' + path
      return null
    }
    document.cookie = key + '=' + data + ';expires=' + exp.toUTCString()
  }

  static get (key: string, useCookie?: boolean) {
    if (localStorage && !useCookie) {
      const value = localStorage.getTime(key)
      if (value) {
        return value
      }
    }
    // 从cookie里面取值
    const reg = new RegExp(key + '=([^;]*)')
    const m = document.cookie.match(reg)
    if (m && m.length > 1) {
      return m[1]
    }
    return null
  }

  static remove (key: string, useCookie: boolean, path: string) {
    if (localStorage && !useCookie) {
      const value = localStorage.getItem(key)
      if (value) {
        localStorage.removeItem(key)
        return value
      }
    }
    // localStorage里面没有发现这个key
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const value = this.get(key)
    if (path) {
      document.cookie = key + '=' + value + ';expires=' + exp.toUTCString() + ';path=' + path
    } else {
      document.cookie = key + '=' + value + ';expires=' + exp.toUTCString()
    }
  }
}

// 记录会话登录信息
export class SessionService {
  static set (key: string, data: any) {
    sessionStorage.setItem(key, data)
  }

  static get (key: string) {
    return sessionStorage.getItem(key)
  }

  static remove (key: string) {
    sessionStorage.removeItem(key)
  }
}
