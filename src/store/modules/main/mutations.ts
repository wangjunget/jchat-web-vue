import { States } from './state'
import { MutationTree } from 'vuex'

const mutations: MutationTree<States> = {
  setSessionStatus (state, payload) {
    state.isInSession = payload
  }
}

export default mutations
