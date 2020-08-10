import { States } from './state'
import { ActionTree } from 'vuex'
import { SessionService } from '@/utils/storage.service'
import authPayload, { sessionKeys } from '@/utils/config'
import ApiService from '@/utils/api'
import { createSignature } from '@/utils/signature'
import { global } from '@/utils/global'

const actions: ActionTree<States, any> = {
  /** api错误处理函数 */
  apiErrorHandler ({ dispatch }, errorMsg) {
    dispatch('app/errorApiTip', errorMsg, { root: true })
  },
  /** 初始化信息
   * 判断登录状态
   */
  async init ({ rootGetters, commit, dispatch }) {
    if (rootGetters.isLoginSuccess) {
      return Promise.resolve()
    }
    global.JIM = new JMessage({ debug: true })
    const username = SessionService.get(sessionKeys.username)
    const password = SessionService.get(sessionKeys.password)
    if (username && password) {
      await dispatch('jimInit')
      const loginObj = {
        username: username,
        password: password
      }
      return dispatch('login/login', loginObj, { root: true })
    }
    return Promise.reject(new Error('请先登录'))
  },
  /** 初始化 */
  async jimInit ({ dispatch }) {
    const timestamp = new Date().getTime()
    const signature = createSignature(timestamp)
    const initObj = {
      appkey: authPayload.appkey,
      random_str: authPayload.randomStr,
      flag: authPayload.flag,
      signature,
      timestamp
    }
    const data = await ApiService.init(initObj)
    if (data.code) {
      dispatch('apiErrorHandler', data)
      return Promise.reject(data)
    }
    return Promise.resolve(data)
  },
  /** 获取当前用户信息 */
  async getSelfInfo ({ dispatch, commit, rootGetters }) {
    const userInfoObj = {
      username: rootGetters.userInfo.username
    }
    const data = await ApiService.getUserInfo(userInfoObj)
    if (data.code) {
      dispatch('apiErrorHandler', data)
      return Promise.reject(data)
    }
    commit('setSelfInfo', data.user_info)
    return Promise.resolve(data)
  }

}

export default actions
