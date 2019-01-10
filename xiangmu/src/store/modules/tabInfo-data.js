import Vue from 'vue'
// import { cookie } from 'vux'
import { APIS } from '@a/js/config.js'
import qs from 'qs'
var bus = new Vue()
const tabInfo = {
  namespaced: true,
  state: {
    tabInfoPerson: {},
    tabInfoCard: {},
    tabInfoIntegral: {},
    discount: null,
    exchange: null,
    present: null
  },
  actions: {
    del_TabInfoPerson ({commit, state}) {
      commit('del_tabInfo_msg')
    },
    createdData ({commit, state}, data) {
      var getMemberPerson = function () {
        return bus.$axios({
          url: APIS.memberPerson,
          method: 'get',
          params: {cardNo: data},
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
      }
      var getMemberCard = function () {
        return bus.$axios({
          url: APIS.memberCard,
          method: 'get',
          params: {cardNo: data},
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
      }
      var getIntegral = function (data) {
        // let partnerSign = cookie.get('partner_sign')
        bus.$axios({
          url: APIS.integral,
          method: 'post',
          data: qs.stringify({partner_sign: data.partnerSign, customer_id: data.customersId}),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(res => {
          commit('setIntegral', res)
        })
        .catch(err => {
          console.log(err)
        })
      }
      var getDiscount = function (data) {
        bus.$axios({
          url: APIS.discount,
          method: 'get',
          params: {shop_guid: data.shopGuid, customer_id: data.customersId},
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(res => {
          commit('setDiscount', res)
        })
        .catch(err => {
          console.log(err)
        })
      }
      var getExchange = function (data) {
        bus.$axios({
          url: APIS.exchange,
          method: 'get',
          params: {openId: data.customersOpenid, shopGuid: data.shopGuid},
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(res => {
          commit('setExchange', res)
        })
        .catch(err => {
          console.log(err)
        })
      }
      if (JSON.stringify(state.tabInfoPerson) === '{}') {
        bus.$loading.loading('加载中')
        bus.$axios.all([getMemberPerson(), getMemberCard()])
        .then(bus.$axios.spread((memberPerson, membercard) => {
          bus.$loading.hideLoading()
          var person = memberPerson.data.data
          var gameMsg = membercard.data.data
          commit('setTabInfo', {person, gameMsg})
          if (person.customersId && person.shopGuid && person.customersOpenid) {
            getIntegral(person)
            getExchange(person)
            getDiscount(person)
          }
        }))
      }
    }
  },
  mutations: {
    del_tabInfo_msg (state) {
      state.tabInfoPerson = {}
      state.tabInfoCard = {}
      state.tabInfoIntegral = {}
      state.discount = null
      state.exchange = null
      state.present = null
    },
    setTabInfo (state, obj) {
      state.tabInfoPerson = obj.person
      state.tabInfoCard = obj.gameMsg
      localStorage.setItem('customersId', obj.person.customersId)
      localStorage.setItem('partnerSign', obj.person.partnerSign)
    },
    setIntegral (state, obj) {
      state.tabInfoIntegral = obj.data
      state.present = (obj.data.current_integral / obj.data.max_integral).toFixed(2) * 100
    },
    setDiscount (state, obj) {
      state.discount = obj.data.coupons.data
    },
    setExchange (state, obj) {
      state.exchange = obj.data.electroncode.data
    }
  }
}
export default tabInfo
