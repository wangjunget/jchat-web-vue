import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import login from './modules/login'
import main from './modules/main'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    login,
    main
  },
  getters,
  plugins: [createPersistedState({
    storage: {
      getItem: (key) => window.sessionStorage.getItem(key),
      setItem: (key, value) => window.sessionStorage.setItem(key, value),
      removeItem: (key) => window.sessionStorage.removeItem(key)
    },
    paths: []
  })]
})

export default store
