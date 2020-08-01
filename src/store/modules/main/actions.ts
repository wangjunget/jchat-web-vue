import { States } from './state'
import { ActionTree } from 'vuex'
import ApiService from '@/utils/api'
import authPayload from '@/utils/config'
import { createSignature } from '@/utils/signature'

const actions: ActionTree<States, any> = {
  // api错误处理函数
  apiErrorHandler ({ dispatch }, errorMsg) {
    dispatch('app/errorApiTip', errorMsg, { root: true })
  },
  // 初始化
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
    } else {
      return Promise.resolve()
    }
  }

}

export default actions
