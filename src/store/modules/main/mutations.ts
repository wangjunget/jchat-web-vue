import { States } from './state'
import { MutationTree } from 'vuex'

const mutations: MutationTree<States> = {
  setSessionStatus (state, payload) {
    state.isInSession = payload
  },
  setSelfInfo (state, payload) {
    state.selfInfo = payload
  }
}

export default mutations
