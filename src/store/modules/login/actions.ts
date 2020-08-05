import ApiService from '@/utils/api'
import { ActionTree } from 'vuex'
import { States } from './state'
import { SessionService } from '@/utils/storage.service'
import authPayload, { sessionKeys } from '@/utils/config'
import { createSignature } from '@/utils/signature'

const actions: ActionTree<States, any> = {
  /** api错误处理函数 */
  apiErrorHandler ({ dispatch }, errorMsg) {
    dispatch('app/errorApiTip', errorMsg, { root: true })
  },
  /** 初始化用户信息 */
  initUserInfo ({ commit }) {
    const username = SessionService.get(sessionKeys.username)
    const password = SessionService.get(sessionKeys.password)
    if (username && password) {
      const userInfo = {
        username: username,
        password: password
      }
      commit('setSessionStatus', true)
      commit('setUserInfo', userInfo)
    }
  },
  /** 重置用户信息 */
  resetUserInfo ({ commit }) {
    const userInfo = {
      username: '',
      password: ''
    }
    commit('setSessionStatus', false)
    commit('setLoginStatus', false)
    commit('setUserInfo', userInfo)
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
  /** 登录 */
  async login ({ state, commit, dispatch }, payload) {
    const loginObj = {
      username: payload.username,
      password: payload.password,
      // eslint-disable-next-line @typescript-eslint/camelcase
      is_md5: true
    }
    const data = await ApiService.login(loginObj)
    if (data.code) {
      dispatch('apiErrorHandler', data)
      commit('loginFailed', data)
      return Promise.reject(data)
    }
    commit('loginSuccess', payload)
    return Promise.resolve(state)
  }
}

export default actions
