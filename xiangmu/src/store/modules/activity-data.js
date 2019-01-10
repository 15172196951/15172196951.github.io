import Vue from 'vue'
import { APIS } from '@a/js/config.js'
const activity = {
  namespaced: true,
  state: {
    markList: [],
    activityList: []
  },
  actions: {
    getData ({commit, state}, data) {
      var format = function (value) {
        return `${value[0]}-${value[1]}`
      }
      new Vue().$axios({
        url: APIS.activity,
        method: 'get',
        params: {date: format(data), customer_id: localStorage.getItem('customersId')},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(res => {
        var list = res.data.data
        commit('setActivity', list)
      })
    }
  },
  mutations: {
    setActivity (state, obj) {
      state.markList = obj
    }
  }
}
export default activity
