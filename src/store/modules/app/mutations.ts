import { MutationTree } from 'vuex'
import { States } from './state'

const mutations: MutationTree<States> = {
  setTipModal (state, payload): void {
    state.tipModal.title = payload.title
    state.tipModal.tip = payload.tip
  },
  setTipMessage (state, payload): void {
    state.tipMessage.message = payload.message
    state.tipMessage.type = payload.type
  }
}

export default mutations
