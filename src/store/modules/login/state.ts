export interface States {
  userInfo: {
    username: string;
    password: string;
  };
  loginTip: string;
  isLoginSuccess: boolean;
}

const state: States = {
  userInfo: {
    username: '',
    password: ''
  },
  loginTip: '',
  isLoginSuccess: false
}

export default state
