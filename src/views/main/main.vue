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
  data () {
    return {}
  },
  created () {
    const loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: '#ffffff'
    })
    this.$store.dispatch('main/init')
      .then(() => {
        this.$store.dispatch('main/getSelfInfo')
      })
      .catch(() => {
        this.$router.push('/login')
      })
      .finally(() => {
        loading.close()
      })
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo,
      isInSession: state => state.login.isInSession,
      isLoginSuccess: state => state.login.isLoginSuccess
    })
  },
  methods: {}
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
