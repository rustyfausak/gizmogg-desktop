import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import VueTimeago from 'vue-timeago'

import App from './App'
import routes from './routes'

import 'bulma/css/bulma.css'
import './css/app.css'
import 'font-awesome/css/font-awesome.css'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US',
  locales: {
    // you will need json-loader in webpack 1
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
