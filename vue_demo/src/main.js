import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

import VueLazyLoad from 'vue-lazyload'
import './filter'

//axios.defaults.baseURL = '/api'

Vue.use(MintUI);
Vue.use(VueLazyLoad, {
  loading: require('./common/img/timg.gif')
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

