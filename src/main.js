import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import './mock/mock'

Vue.config.productionTip = false

Vue.prototype.$axios=Axios
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
