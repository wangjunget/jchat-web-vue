<template>
  <main>
    <div class="chat-container">
      <main-menu />
      <main-right />
    </div>
  </main>
</template>

<script>
import MainMenu from './components/mainMenu'
import MainRight from './components/mainRight'
import { Loading } from 'element-ui'
import { mapState } from 'vuex'

export default {
  components: {
    MainMenu,
    MainRight
  },
  created () {
    if (!this.isLoginSuccess) {
      this.loginUser()
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo,
      isLoginSuccess: state => state.main.isLoginSuccess
    })
  },
  methods: {
    loginUser () {
      const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: '#ffffff'
      })
      this.$store.dispatch('main/jimInit')
        .then(() => {
          return this.$store.dispatch('login/login', this.userInfo)
        })
        .then(() => {
          loading.close()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #71c3a457;
    }
    .chat-container {
        display: flex;
        max-width: 980px;
        width: 100%;
        max-height: 710px;
        min-width: 770px;
        min-height: 550px;
        height: 100%;
        margin: 0 auto;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
    }
</style>
