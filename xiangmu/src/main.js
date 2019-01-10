// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import App from './App'
import ajaxService from '@a/js/ajaxService.js'
import namedavatarVue from '@a/js/namedavatar-vue.js'
import { cookie } from 'vux'

// ajaxService.defaults.headers['token'] = cookie.get('access_token')
ajaxService.defaults.headers['access-token'] = '8541e9d3-cbf9-4e58-8384-cdccae919770'
// cookie.set('group_id', 'a6f0e6cc-8163-11e7-8272-00155d01920e')
// cookie.set('partner_sign', '6A8CA59D-599A-4B2E-9252-2B72D502E4FF')
cookie.set('group_id', 'b0ce9ded-ec5a-4b40-b8fb-e7b952664cf5')
cookie.set('creatorId', 'cd2318e2-2fd8-49aa-b77e-302272365a47')

require('@a/js/vux-plugin.js')
require('@a/css/iconfont.css')
require('@a/css/flex.css')
require('@a/css/base.css')
require('@a/js/rem.js')

Vue.directive('avatar', namedavatarVue.directive)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    try {
      const isiOS = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isiOS) {
        window.webkit.messageHandlers.setHeadTitle.postMessage(to.meta.title)
      }
    } catch (error) {
      console.log(error)
    }
  }
  next()
})

let VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
Vue.prototype.$axios = ajaxService
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.handleFocus = function (e) {
  let name = e.target.value
  e.target.value = ''
  e.target.focus()
  e.target.value = name
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
