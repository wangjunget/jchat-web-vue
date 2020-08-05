export interface States {
  userInfo: {
    username: string;
    password: string;
  };
  loginTip: string;
  isInSession: boolean;
  isLoginSuccess: boolean;
}

const state: States = {
  userInfo: {
    username: '',
    password: ''
  },
  loginTip: '',
  isInSession: false,
  isLoginSuccess: false
}

export default state
