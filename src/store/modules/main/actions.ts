import { States } from './state'
import { ActionTree } from 'vuex'
import ApiService from '@/utils/api'

const actions: ActionTree<States, any> = {
  /** api错误处理函数 */
  apiErrorHandler ({ dispatch }, errorMsg) {
    dispatch('app/errorApiTip', errorMsg, { root: true })
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
