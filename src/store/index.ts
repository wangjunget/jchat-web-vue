import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import login from './modules/login'
import main from './modules/main'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    login,
    main
  }
})

export default store
