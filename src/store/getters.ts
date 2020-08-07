const getters = {
  isInSession: state => state.login.isInSession,
  isLoginSuccess: state => state.login.isLoginSuccess,
  userInfo: state => state.login.userInfo

}

export default getters
