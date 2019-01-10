/**
 * 公用store模块
 */
import Vue from 'vue'
import Vuex from 'vuex'
import activity from './modules/activity-data.js'
import tabInfo from './modules/tabInfo-data.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    activity, tabInfo
  },
  state: {
    activeMenu: 0,
    categoryType: 0,
    cardNo: '',
    activityTime: [],
    isTag: false,
    doGetDetail: false,
    tagRuleData: {
      gender: '0',
      startBirthYear: '',
      endBirthYear: '',
      birthMonth: '0',
      phone: '0',
      startLevel: '等级',
      endLevel: '等级',
      startRegisterDate: '',
      endRegisterDate: '',
      memberCardType: '0',
      consumePeriod: '0',
      startConsumeTimes: '',           // 最小次数
      endConsumeTimes: '',             // 最大次数
      consumeTimes: '',                // '等于'
      startConsumeSum: '',             // 最小金额
      endConsumeSum: '',               // 最大金额
      consumeSum: '',                  // 等于
      timesSign: '0',
      sumSign: '0',
      name: '',
      description: '',
      tagId: '',
      categoryId: ''
    },
    count: '',
    updateTagRuleData: {}
  },
  actions: {
    setActiveMenu ({commit, state}, data) {
      commit('changeActiveMenu', data)
    },
    setCardNo ({commit, state}, data) {
      commit('changeCardNo', data)
    },
    setTime ({commit, state}, data) {
      commit('changeTime', data)
    },
    delTime ({commit, state}) {
      commit('delActivetyTime')
    }
  },
  mutations: {
    changeISTag (state, data) {
      state.isTag = data
    },
    changeCardNo (state, obj) {
      state.cardNo = obj
    },
    changeActiveMenu (state, obj) {
      state.activeMenu = obj
    },
    changeTime (state, obj) {
      state.activityTime = obj
    },
    delActivetyTime (state) {
      state.activityTime = []
      state.activeMenu = 0
    },
    SET_RULEDATA (state, tagRuleData) {
      state.tagRuleData = {...state.tagRuleData, ...tagRuleData}
    },
    SET_COUNT (state, data) {
      state.count = data
    },
    SET_TAGDATA (state, tagData) {
      state.tagData = tagData
    },
    SET_UPDATETAGRULEDATA (state, updateTagRuleData) {
      state.updateTagRuleData = updateTagRuleData
    },
    SET_DOGETDETAIL (state, flag) {
      state.doGetDetail = flag
    },
    SET_CATEGORYTYPE (state, flag) {
      state.categoryType = flag
    }
  }
})
