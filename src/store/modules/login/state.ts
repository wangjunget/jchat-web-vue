export interface States {
  isLoginSuccess: boolean;
  userInfo: {
    username: string;
    password: string;
  };
  loginTip: string;
}

const state: States = {
  isLoginSuccess: false,
  userInfo: {
    username: '',
    password: ''
  },
  loginTip: ''
}

export default state
