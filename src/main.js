import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

// 通过new出来的Vue实例，进行发送数据和接收数据
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
