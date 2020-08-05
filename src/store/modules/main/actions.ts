import { States } from './state'
import { ActionTree } from 'vuex'
import ApiService from '@/utils/api'

const actions: ActionTree<States, any> = {
  /** api错误处理函数 */
  apiErrorHandler ({ dispatch }, errorMsg) {
    dispatch('app/errorApiTip', errorMsg, { root: true })
  }

}

export default actions
