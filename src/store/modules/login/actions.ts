import ApiService from '@/utils/api'
import { ActionTree } from 'vuex'
import { States } from './state'

const actions: ActionTree<States, any> = {
  /** api错误处理函数 */
  apiErrorHandler ({ dispatch }, errorMsg) {
    dispatch('app/errorApiTip', errorMsg, { root: true })
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
  },
  /** 注册 */
  async signUp ({ dispatch }, payload) {
    const signUpObj = {
      username: payload.username,
      password: payload.password,
      is_md5: true
    }
    const data = await ApiService.register(signUpObj)
    if (data.code) {
      dispatch('apiErrorHandler', data)
      return Promise.reject(data)
    }
    const tipMessage = {
      message: '注册成功',
      type: 'success'
    }
    dispatch('app/showTipMessage', tipMessage, { root: true })
    return Promise.resolve(data)
  }
}

export default actions
