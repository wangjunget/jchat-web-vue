import state from './modules/app/state'

const getters = {
  isLogin: state => {
    return !!state.login.userInfo.username && !!state.login.userInfo.password
  }
}

export default getters
