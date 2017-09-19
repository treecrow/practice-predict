import Vue from 'vue'
import router from 'client/config/router'
import protoList from 'client/config/protoList'
import elementUi from 'client/config/elementUi'
import App from 'client/App'
import store from 'client/store'

Vue.use(protoList)
elementUi(Vue)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
