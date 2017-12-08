// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex/store'

import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import App from './App'
import router from './router'

import Mock from './mock'
import {MOCK_DATA_ENABLE} from './config'

if (MOCK_DATA_ENABLE) {
  Mock.bootstrap()
}

Vue.use(MuseUi)

Vue.config.productionTip = false
// 加载本地缓存资料
store.commit('LOAD_STORAGE')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
