import ApiService from '@/utils/api'
import { ActionTree } from 'vuex'
import { States } from './state'

const actions: ActionTree<States, any> = {
  // api错误处理函数
  apiErrorHandler ({ dispatch }, errorMsg) {
    dispatch('app/errorApiTip', errorMsg, { root: true })
  },
  // 登录
  async login ({ state, commit }, payload) {
    const loginObj = {
      username: payload.username,
      password: payload.password,
      // eslint-disable-next-line @typescript-eslint/camelcase
      is_md5: true
    }
    const data = await ApiService.login(loginObj)
    if (data.code) {
      commit('loginFailed', data)
      return Promise.reject(data)
    } else {
      commit('loginSuccess', payload)
      return Promise.resolve(state)
    }
  }
}

export default actions
