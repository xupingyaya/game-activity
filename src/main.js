import Vue from 'vue'
import App from './App.vue'
import router from "./router"

import './assets/css/reset.css';
import './assets/css/common.css';
import 'amfe-flexible';

import {get,post} from './api/index'
//定义全局变量
Vue.prototype.$get = get;
Vue.prototype.$post = post;

// let param={}
// this.$get('queryParam',param)
//     .then(res=>{
//         console.log(res)
//     })
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
