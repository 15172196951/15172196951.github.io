<template>
    <div class="new-member-tag">
        <div class="member-wrapper">
            <div class="tag-name">
              <p class="name-left">标签名称</p>
              <p class="name-right">
                  <input type="text" v-model="name" @click="handleFocus" maxlength="15" required="required" placeholder="请输入标签名称">
              </p>
            </div>
            
            <div class="tag-rule">
              <p class="rule-left">标签规则</p>
              <p class="rule-right" @click="scan">点击查看</p>
              <div class="rule-ft"></div>
            </div>
            
            <!-- <div class="tag-cycle">
                <p class="cycle-left">打标签周期</p>
                <p class="tag-icon"><x-icon type="ios-help-outline" size="20"></x-icon></p>
                <p class="cycle-right">一周</p>
                <div class="cycle-ft"></div>
            </div> -->
        </div>

        <div class="h-30"></div>
        <div class="tag-comments">
            <textarea id="comments-box" placeholder="请输入描述"  maxlength="500" v-model="description"></textarea>
            <p>{{ count }}/500字以内</p>
        </div>

        <!-- 按钮区 -->
        <div class="btn" v-show="show" :style="{'top': getTop}">
            <p class="saveBtn" @click="postTag" :class="name||description?'bgColor':''">保存</p>
        </div>
        <div class="update co-flex" v-show="!show" :style="{'top': getTop}">
          <button class="delTag" @click="delTag">删除标签</button>
          <button class="updateTag" @click="postTag">确定修改</button>
        </div>
    </div>
</template>

<script>
import { getWinHei } from '@a/js/function.js'
import { APIS } from '@a/js/config.js'
import EventEmitter from '@a/js/EventEmitter'
export default {
  name: 'newMemberTag',
  beforeRouteEnter (to, from, next) {
    if (to.query.categoryId) {
      document.title = '新增标签'
    }
    if (to.query.id) {
      document.title = '修改标签'
    }
    next()
  },
  computed: {
    count () {
      if (!this.description) {
        return 0
      }
      return this.description.length
    }
  },
  data () {
    return {
      show: true,
      name: '',
      description: '',
      categoryId: '',
      tagId: '',
      updateTagRuleData: {},
      getTop: ''
    }
  },
  created () {
    if (this.$route.query.id) {
      this.show = false           // 编辑
      this.$store.commit('SET_RULEDATA', {tagId: this.$route.query.id})
      if (this.$store.state.tagRuleData.name === '') {
        this.getTagData()
      }
    }
    if (this.$route.query.categoryId) {       // 新建
      // this.clearStorge()
      this.show = true
      this.$store.commit('SET_RULEDATA', {categoryId: this.$route.query.categoryId})
    }
    this.name = this.$store.state.tagRuleData.name
    this.description = this.$store.state.tagRuleData.description
    this.tagId = this.$store.state.tagRuleData.tagId
  },
  methods: {
    getTagData () {
      this.$axios({
        url: APIS.searchTag,
        methods: 'get',
        params: {
          object: 'member',
          tagId: this.$route.query.id
        }}).then((res) => {
          if (res.data.status === 200) {
          // this.tagData = res.data.data
          // this.name = res.tagData.name
          // this.description = res.tagData.description
          // 根据已有标签将数据派发给store
            this.$store.commit('SET_RULEDATA', res.data.data)
            this.name = this.$store.state.tagRuleData.name
            this.description = this.$store.state.tagRuleData.description
            this.tagId = this.$store.state.tagRuleData.tagId
          } else {
            this.$loading.toast(`${res.data.error}`)
          }
        })
    },
    scan () {
      let changeData = {name: this.name, description: this.description}
      this.$store.commit('SET_RULEDATA', changeData)
      this.$router.push({
        name: 'tagRule'
      })
    },
    clearStorge () {
      let resitState = {
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
        startConsumeTimes: '',
        endConsumeTimes: '',
        consumeTimes: '',
        startConsumeSum: '',
        endConsumeSum: '',
        consumeSum: '',
        timesSign: '0',
        sumSign: '0',
        name: '',
        description: '',
        tagId: '',
        categoryId: ''
      }
      this.$store.commit('SET_RULEDATA', resitState)
    },
    delTag () {
      // console.log(this.$route.query.id)
      let _self = this
      this.$loading.confirm({
        content: `删除标签，确认删除？`,
        confirm () {
          _self.$axios({
            url: APIS.delTag,
            method: 'post',
            params: {object: 'member', tagId: _self.$route.query.id}
          }).then(res => {
            if (res.data.status === 200) {
              _self.$loading.toast('删除成功')
              _self.$store.commit('changeISTag', true)
              EventEmitter.dispatch('del', _self.$route.query.id)
              window.history.back()
            } else {
              this.$loading.toast(`${res.data.error}`)
            }
          })
        },
        onCancel () {
        }
      })
    },
    postTag () {
      // 标签名验证,必填
      let tagReg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
      if (!tagReg.test(this.name)) {
        if (this.name) {
          this.$loading.toast('标签名称为汉字或英文或数字组合', 0, 2)
        } else {
          this.$loading.toast('请输入标签名称')
        }
        return
      }
      this.$store.commit('SET_RULEDATA', {name: this.name, description: this.description})
        // 新建标签, 数据对象组装
      let tagRuleData = {
        object: 'member'
      }
      if (this.$store.state.tagRuleData.birthMonth !== '0') {
        tagRuleData.birthMonth = this.$store.state.tagRuleData.birthMonth
      }
      if (this.$store.state.tagRuleData.consumePeriod !== '0') {
        tagRuleData.consumePeriod = this.$store.state.tagRuleData.consumePeriod
      }
      if (this.$store.state.tagRuleData.endBirthYear !== '') {
        tagRuleData.endBirthYear = this.$store.state.tagRuleData.endBirthYear
      }
      if (this.$store.state.tagRuleData.startBirthYear !== '') {
        tagRuleData.startBirthYear = this.$store.state.tagRuleData.startBirthYear
      }
      if (this.$store.state.tagRuleData.endLevel !== '等级') {
        tagRuleData.endLevel = this.$store.state.tagRuleData.endLevel
      }
      if (this.$store.state.tagRuleData.startLevel !== '等级') {
        tagRuleData.startLevel = this.$store.state.tagRuleData.startLevel
      }
      if (this.$store.state.tagRuleData.endRegisterDate !== '') {
        tagRuleData.endRegisterDate = this.$store.state.tagRuleData.endRegisterDate
      }
      if (this.$store.state.tagRuleData.startRegisterDate !== '') {
        tagRuleData.startRegisterDate = this.$store.state.tagRuleData.startRegisterDate
      }
      if (this.$store.state.tagRuleData.gender !== '0') {
        tagRuleData.gender = this.$store.state.tagRuleData.gender
      }
      if (this.$store.state.tagRuleData.memberCardType !== '0') {
        tagRuleData.memberCardType = this.$store.state.tagRuleData.memberCardType
      }
      if (this.$store.state.tagRuleData.phone !== '0') {
        tagRuleData.phone = this.$store.state.tagRuleData.phone
      }
      if (this.$store.state.tagRuleData.mountSign !== '0') {
        tagRuleData.mountSign = this.$store.state.tagRuleData.mountSign
      }
      if (this.$store.state.tagRuleData.countSign !== '0') {
        tagRuleData.countSign = this.$store.state.tagRuleData.countSign
      }
      if (this.$store.state.tagRuleData.name !== '') {
        tagRuleData.name = this.$store.state.tagRuleData.name
      }
      if (this.$store.state.tagRuleData.description !== '') {
        tagRuleData.description = this.$store.state.tagRuleData.description
      }
      if (this.$store.state.tagRuleData.categoryId) {
        tagRuleData.categoryId = this.$store.state.tagRuleData.categoryId
      }
      if (this.$store.state.tagRuleData.tagId) {
        tagRuleData.tagId = this.$store.state.tagRuleData.tagId
      }
      if (this.$store.state.tagRuleData.timesSign !== '0') {
        tagRuleData.timesSign = this.$store.state.tagRuleData.timesSign
      }
      if (this.$store.state.tagRuleData.timesSign[0] === '1') {
        tagRuleData.startConsumeTimes = this.$store.state.tagRuleData.startConsumeTimes
        tagRuleData.endConsumeTimes = this.$store.state.tagRuleData.endConsumeTimes
      }
      if (this.$store.state.tagRuleData.timesSign[0] === '2') {
        tagRuleData.consumeTimes = this.$store.state.tagRuleData.consumeTimes
      }
      if (this.$store.state.tagRuleData.timesSign[0] === '4') {
        tagRuleData.startConsumeTimes = this.$store.state.tagRuleData.startConsumeTimes
      }
      if (this.$store.state.tagRuleData.timesSign[0] === '3') {
        tagRuleData.endConsumeTimes = this.$store.state.tagRuleData.endConsumeTimes
      }
      if (this.$store.state.tagRuleData.sumSign !== '0') {
        tagRuleData.sumSign = this.$store.state.tagRuleData.sumSign
      }
      if (this.$store.state.tagRuleData.sumSign === '1') {
        tagRuleData.startConsumeSum = this.$store.state.tagRuleData.startConsumeSum
        tagRuleData.endConsumeSum = this.$store.state.tagRuleData.endConsumeSum
      }
      if (this.$store.state.tagRuleData.sumSign === '2') {
        tagRuleData.consumeSum = this.$store.state.tagRuleData.consumeSum
      }
      if (this.$store.state.tagRuleData.sumSign === '4') {
        tagRuleData.startConsumeSum = this.$store.state.tagRuleData.startConsumeSum
      }
      if (this.$store.state.tagRuleData.sumSign === '3') {
        tagRuleData.endConsumeSum = this.$store.state.tagRuleData.endConsumeSum
      }
      if (this.$store.state.tagRuleData.startConsumeSum !== '最小金额') {
        tagRuleData.startConsumeSum = this.$store.state.tagRuleData.startConsumeSum
      }
      if (this.$store.state.tagRuleData.endConsumeSum !== '最大金额') {
        tagRuleData.endConsumeSum = this.$store.state.tagRuleData.endConsumeSum
      }
      // 删除空对象的值
      Object.getOwnPropertyNames(tagRuleData).forEach(function (key) {
        if (!tagRuleData[key]) {
          delete tagRuleData[key]
        }
      })
        // 将标签规则数据派发到store
      this.$store.state.tagRuleData.tagId
        ? this.$axios({url: APIS.updateTagRule,
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          params: tagRuleData}).then((res) => {
            if (res.data.status === 200) {
              this.clearStorge()
              this.$loading.toast('修改标签成功')
              window.history.back()
              // EventEmitter.unSubscribe('save')
            } else {
              this.$loading.toast(`${res.data.error}`)
            }
          }) : this.$axios({
            method: 'post',
            url: APIS.createTagRule,
            params: tagRuleData,
            headers: {'Content-Type': 'application/json'}
          }).then((res) => {
            // this.clearStorge()
            this.$loading.toast('加载中...')
            if (res.data.status === 200) {
              this.tagId = res.data.data
              window.history.back()
            } else {
              this.$loading.toast(`${res.data.error}`)
            }
          })
    }

  },
  mounted () {
    this.getTop = getWinHei(3.5)
  }
}
</script>

<style lang="less" scoped>
    .new-member-tag {
      display: block;
      margin-top: 0.75rem;
      touch-action: none;
      .member-wrapper {
        width: 100%;
        background-color: #FFFFFF;
        .tag-name {
          padding: 0 0.75rem;
          height: 2.25rem;
          line-height: 2.25rem;
          display: flex;
          border-bottom: 1px solid #e6e6e6;
          z-index: 10;
          .name-left {
            width: 5rem;
            font-size: 0.75rem;
            letter-spacing: 0;
            color: #222222;
          }
          .name-right {
            flex: 1;
            height: 2.25rem;
            line-height: 2.25rem;
            input {
              width: 100%;
              height: 2.12rem;
              line-height: 2.22rem;
              font-size: 0.75rem;
              letter-spacing: 0;
              text-align: right;
              outline: none;
              border: none;
            }
          }
        }
        .tag-rule {
          padding: 0 0.75rem;
          height: 2.25rem;
          line-height: 2.25rem;
          display: flex;
          border-bottom: 1px solid #e6e6e6;
          .rule-left {
            width: 5rem;
            line-height: 2.25rem;
            font-size: 0.75rem;
            letter-spacing: 0;
          }
          .rule-right {
            flex: 1;
            text-align: right;
            font-size: 0.75rem;
            letter-spacing: 0;
            padding-right: 0.6rem;
          }
          .rule-ft {
            position: relative;
            &:after {
              content: "";
              display: inline-block;
              position: absolute;
              width: 0.4rem; 
              height: 0.4rem; 
              border-color: #999;
              opacity: 0.6;
              border-style: solid;
              border-width: 2px 2px 0 0;
              transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
              top: 50%;
              margin-top: -0.2rem;
              right: 0px;
            }
          }
        }
        .tag-cycle {
          padding: 0 0.75rem;
          height: 2.25rem;
          line-height: 2.25rem;
          display: flex;
          .cycle-left {
            width: 5rem;
            font-size: 0.75rem;
            letter-spacing: 0;
            color: #222222;
          }
          .tag-icon {
            display: flex;
            align-items: center;
            margin-left: -0.85rem;
          }
          .cycle-right {
            flex: 1;
            text-align: right;
            padding-right: 0.6rem;
            font-size: 0.75rem;
            color: #222222;
            letter-spacing: 0;
          }
          .cycle-ft {
            position: relative;
            &:after {
              content: "";
              display: inline-block;
              position: absolute;
              width: 0.4rem; 
              height: 0.4rem; 
              border-color: #999;
              opacity: 0.6;
              border-style: solid;
              border-width: 2px 2px 0 0;
              transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
              top: 50%;
              margin-top: -0.2rem;
              right: 0;
            }
          }
        }
      }
      .h-30 {
        height: 0.75rem;
      }
      .tag-comments {
        textarea {
          width: 100%; 
          height: 6rem;
          outline: none;
          border-color: #ffffff;
          overflow: auto;
          word-break: break-all;
          font-size: 0.75rem;
          text-indent: 0.75rem;
          padding-top: 0.6rem;
          color: #222222;
        }
        p {
          margin-top: 0.325rem;
          padding-right: 0.6rem;

          height: 1rem;
          line-height: 1rem;
          text-align: right;
          
          font-size: 0.7rem;
          color: #222222;
          letter-spacing: 0;
        }
      }
      .btn {
        position: fixed;
        z-index: 999;
        width: 100%;
        display: flex;
        justify-content: center;
        .saveBtn {
          z-index: 10000;
          width: 100%;
          margin: 0 1rem;
          height: 2rem;
          line-height: 2rem;
          color: #000;
          background-color: #e4e2e2;
          text-align: center;
          font-size: 0.8rem;
          border-radius: 0.2rem;
          letter-spacing: 0.2rem;
        }
        .bgColor{
          background-color: #259bec;
          color: #fff;
        }
      }
      .update{
        position: fixed;
        z-index: 999;
        bottom: 1.5rem;
        width: 90%;
        margin-left: 5%;
        height: 2rem;
        button{
          width: 48%;
          height: 100%;
          border: 0;
          border-radius: 0.2rem;
          font-size: 0.75rem;
        }
        .delTag{
          margin-right: 4%;
          background-color: #fff;
          border: 1px solid #f0f0f0;
        }
        .updateTag{
          background-color: #259bec;
          color: #fff;
        }
      }
    }
</style>
