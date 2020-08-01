import state from './state'
import mutations from './mutations'
import actions from './actions'

const main = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default main
