import Vue from 'vue'
import Vuex from 'vuex'

const screenH = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight
const screenW = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenH: screenH,//获取屏幕高度
    screenW: screenW,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
