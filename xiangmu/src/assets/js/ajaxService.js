import axios from 'axios'
import Vue from 'vue'
import {
  ToastPlugin
} from 'vux'
Vue.use(ToastPlugin, {
  position: 'middle',
  time: 2000
})
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  err => {
    if (err.response) {
      if (err.response.status === 403 || err.response.status === 400 || err.response.status === 500) {
        let msg = err.response.data.error ? err.response.data.error : err.response.data.message
        new Vue().$vux.toast.show({
          type: 'text',
          text: `${msg}`,
          width: '11rem'
        })
      }
      return Promise.reject(err.response.data)
    }
  }
)
export default axios
