<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { global } from '@/utils/global'
import { Loading } from 'element-ui'
import { mapState } from 'vuex'

export default Vue.extend({
  created () {
    global.JIM = new JMessage({ debug: true })
    this.$store.dispatch('login/initUserInfo')
    if (this.isInSession && !this.isLoginSuccess) {
      this.loginUser()
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo,
      isInSession: state => state.login.isInSession,
      isLoginSuccess: state => state.login.isLoginSuccess
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
      this.$store.dispatch('login/jimInit')
        .then(() => {
          return this.$store.dispatch('login/login', this.userInfo)
        })
        .then(() => {
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
          loading.close()
        })
        .catch(() => {
          loading.close()
          this.$router.push('/login')
        })
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
