<template>
  <div id="login-container">
    <div class="login-form">
      <div class="form-container sign-in-container">
        <div class="form">
          <h1>登录</h1>
          <input
            v-model="loginForm.username"
            type="text"
            placeholder="用户名"
            @change="onLoginUsernameChange"
          >
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
          >
          <el-button
            :loading="isLoginLoading"
            :disabled="isLoginButtonDisabled"
            @click="handleLogin"
          >
            登录
          </el-button>
        </div>
      </div>
      <div class="form-container sign-up-container">
        <div class="form">
          <h1>注册</h1>
          <input
            v-model="signUpForm.username"
            type="text"
            placeholder="用户名"
          >
          <input
            v-model="signUpForm.password"
            type="password"
            placeholder="密码"
          >
          <el-button
            :loading="isSignUpLoading"
            :disabled="isSignUpButtonDisabled"
          >
            注册
          </el-button>
        </div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有帐号？</h1>
            <p>请使用您的帐号进行登录</p>
            <el-button
              id="signIn"
              class="ghost"
              @click="changeToSignIn"
            >
              登录
            </el-button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有帐号？</h1>
            <p>立即注册加入我们，和我们一起开始旅程吧</p>
            <el-button
              id="signUp"
              class="ghost"
              @click="changeToSignUp"
            >
              注册
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { StorageService, SessionService } from '@/utils/storage.service'
import md5 from 'js-md5'

export default Vue.extend({
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '18395580001',
        password: '123456'
      },
      signUpForm: {
        username: '18395580002',
        password: '123456'
      },
      isLoginButtonDisabled: true, // 登录按钮是否可点击
      isSignUpButtonDisabled: true, // 注册按钮是否可点击
      loginInputErrorTip: '', // 登录用户名验证提示
      signUpInputErrorTip: '', // 注册用户名验证提示
      isLoginLoading: false, // 登录加载状态
      isSignUpLoading: false, // 注册加载状态
      rememberPassword: '', // 本地记住的密码
      emptyPassword: false // 是否为空密码，判断输入状态
    }
  },
  computed: {
    ...mapState('login', {
      // isLoginLoading: state => state.isLoginLoading,
      // isSignUpLoading: state => state.isSignUpLoading
    })
  },
  watch: {
    loginForm: {
      handler (value) {
        this.isLoginButtonDisabled = value.username === ''
      },
      deep: true,
      immediate: true
    },
    signUpForm: {
      handler (value) {
        this.isSignUpButtonDisabled = value.username === ''
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.getRememberUsernamePassword()
  },
  methods: {
    // 切换到登录界面
    changeToSignIn (): void {
      const loginContainer = document.getElementById('login-container')
      loginContainer.classList.remove('right-panel-active')
    },
    // 切换到注册界面
    changeToSignUp () {
      const loginContainer = document.getElementById('login-container')
      loginContainer.classList.add('right-panel-active')
    },
    // 登录
    handleLogin () {
      const password = this.rememberPassword ? this.rememberPassword : md5(this.loginForm.password)
      const loginObj = {
        username: this.loginForm.username.trim(),
        password
      }
      this.isLoginLoading = true
      this.$store.dispatch('main/jimInit')
        .then(() => {
          return this.$store.dispatch('login/login', loginObj)
        })
        .then((loginState) => {
          this.loginSuccess(loginState)
          this.$router.push('/')
        })
        .catch((errorMsg) => {
          this.isLoginLoading = false
          this.$store.dispatch('app/errorApiTip', errorMsg)
        })
    },
    // 登录成功
    loginSuccess (loginState: any) {
      const md5Username = md5('jchat-remember-username')
      const md5Password = md5('jchat-remember-password')
      StorageService.set(md5Username, loginState.userInfo.username, true)
      StorageService.set(md5Password, loginState.userInfo.password, true)
      SessionService.set(md5Username, loginState.userInfo.username)
      SessionService.set(md5Password, loginState.userInfo.password)
    },
    // 获取记住的用户名和密码
    getRememberUsernamePassword () {
      const username = StorageService.get(md5('jchat-remember-username'), true)
      const password = StorageService.get(md5('jchat-remember-password'), true)
      if (username && password) {
        this.loginForm.username = username
        this.rememberPassword = password
        this.loginForm.password = password.substring(0, 6)
        this.emptyPassword = true
      }
    },
    // 登录用户名变更
    onLoginUsernameChange () {
      if (this.emptyPassword) {
        this.loginForm.password = ''
        this.rememberPassword = ''
        this.emptyPassword = false
      }
    }

  }
})
</script>

<style lang="scss" scoped>
    #login-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-form {
        width: 768px;
        min-width: 700px;
        min-height: 480px;
        background: #fff;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    }
    .form-container {
        position: absolute;
        top: 0;
        height: 100%;
        transition: all .6s ease-in-out;

        .form {
            background: #fff;
            display: flex;
            flex-direction: column;
            padding:  0 50px;
            height: 100%;
            justify-content: center;
            align-items: center;
            text-align: center;

            input {
                background: #eee;
                border: none;
                padding: 12px 15px;
                margin: 8px 0;
                width: 100%;
                outline: none;
            }
        }
    }
    .sign-in-container {
        left: 0;
        width: 50%;
        z-index: 2;
    }
    .sign-up-container {
        left: 0;
        width: 50%;
        z-index: 1;
        opacity: 0;
    }
    h1 {
        font-weight: bold;
        margin: 0 0 20px;
    }
    span {
        font-size: 12px;
        margin: 10px 0;
    }
    button {
        border-radius: 20px;
        border: 1px solid #ff4b2b;
        background: #ff4b2b;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        padding: 12px 45px;
        margin-top: 20px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: transform 80ms ease-in;
        cursor: pointer;

        &:focus {
            outline: none;
        }

        &:active {
            transform: scale(.95);
        }
    }
    .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: transform .6s ease-in-out;
        z-index: 100;

        .overlay {
            background: #ff416c;
            background: linear-gradient(to right, #ff4b2b, #ff416c) no-repeat 0 0 / cover;
            color: #fff;
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateY(0);
            transition: transform .6s ease-in-out;

            .overlay-panel {
                position: absolute;
                top: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0 40px;
                height: 100%;
                width: 50%;
                text-align: center;
                transform: translateY(0);
                transition: transform .6s ease-in-out;
            }
        }
        button {
            background: transparent;
            border-color: #fff;
        }
    }
    .overlay-right {
        right: 0;
        transform: translateY(0);
    }

    .overlay-left {
        transform: translateY(-20%);
    }
    .right-panel-active .sign-in-container {
        transform: translateY(100%);
    }
    .right-panel-active .sign-up-container {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
    }
    .right-panel-active .overlay {
        transform: translateX(50%);
    }
    .right-panel-active .overlay-container {
        transform: translateX(-100%);
    }
    .right-panel-active .overlay-right {
        transform: translateY(20%);
    }
</style>
