import { MutationTree } from 'vuex'
import { States } from './state'

const mutatios: MutationTree<States> = {
  loginSuccess (state, payload) {
    state.isLoginSuccess = true
    state.loginTip = ''
    state.userInfo.username = payload.username
    state.userInfo.password = payload.password
  },
  loginFailed (state, payload) {
    state.isLoginSuccess = false
    if (Number(payload.code === 880111)) {
      state.loginTip = '账号已被禁用'
    } else {
      state.loginTip = '用户名或密码错误'
    }
  }
}

export default mutatios
