<template>
  <div class="tag-rule">
    <div class="base-props">
      <span class="icon-circle"></span>
      <group title="基础属性">
        <popup-picker title="性别" :data="genderList" :show-name="true"  :columns="1" :class="gender == '0' ? '' : 'selected'" v-model="gender" @on-show="stopScroll" @on-hide="statScroll"></popup-picker>
        <div class="born-year">
          <datetime title="出生年份" :min-year="1850" :max-year="nowYear" placeholder="开始年份" v-model="startBirthYear" format="YYYY" :class="startBirthYear == '' ? '' : 'selected'" default-selected-value='1990'></datetime>
          <p class="born-text" style="margin-left:0.85rem;">至</p>
          <datetime :min-year="leftminYear" :max-year="nowYear"  placeholder="结束年份" v-model="endBirthYear" format="YYYY" :class="endBirthYear == '' ? '' : 'selected'"></datetime>
        </div>
        <popup-picker title="出生月份" :data="birthMonthList" v-model="birthMonth"  :columns="1" :show-name="true" :class="birthMonth == '0' ? '' : 'selected'" ></popup-picker>
        <popup-picker title="手机号" :data="phoneList" v-model="phone" :columns="1" :show-name="true" :class="phone == '0' ? '' : 'selected'"></popup-picker>
      </group>
    </div>
    
    <div class="asset-props">
      <span class="icon-circle"></span>
      <group title="资产属性">
        <div class="born-year">
          <popup-picker title="等级" :data="rankList1" v-model="startLevel" :class="startLevel == '等级' ? '' : 'selected'"></popup-picker>
          <p class="born-text">至</p>
          <popup-picker id="special002" :data="rankList2" v-model="endLevel"  :class="endLevel == '等级' ? '' : 'selected'"></popup-picker>
        </div>
        <div class="enter-time">
          <datetime title="入会时间" v-model="startRegisterDate" placeholder="开始时间" :class="startRegisterDate == '' ? '' : 'selected'"></datetime>
          <p class="born-text" style="margin-left:0.85rem;">至</p>
          <datetime id="special003" v-model="endRegisterDate" placeholder="结束时间" :class="endRegisterDate == '' ? '' : 'selected'"></datetime>
        </div>
        <popup-picker title="会员卡" :data="memberCardList" v-model="memberCardType" :columns="1" :show-name="true" :class="memberCardType == '0' ? '' : 'selected'"></popup-picker>
      </group>
    </div>
    <div class="consumer-props">
      <span class="icon-circle"></span>
      <group title="消费属性">
        <popup-picker title="最近消费" :data="consumerList" v-model="consumePeriod" :columns="1" :show-name="true" :class="consumePeriod == '0' ? '' : 'selected'"></popup-picker>
        <!-- 消费次数 -->
        <div class="consumer-count">
          <popup-picker title="消费次数" :data="countSignList" v-model="timesSign" :columns="1" :show-name="true" :class="timesSign == '0' ? '' : 'selected'"></popup-picker>
          <div class="user-define" v-show="timesSign == '2'">
            <input type="number" @click="handleFocus" placeholder="次数" v-model.number="consumeTimes" :class="{'countinput':consumeTimes}" @blur="blur">
          </div>
           <div class="user-define" v-show="timesSign == '4'">
            <input type="number" @click="handleFocus" placeholder="次数" v-model.number="startConsumeTimes" :class="{'countinput':startConsumeTimes}" @blur="blur">
          </div>
          <div class="user-define" v-show="timesSign == '3'">
            <input type="number" @click="handleFocus"  placeholder="次数" v-model.number="endConsumeTimes" :class="{'countinput':endConsumeTimes}" @blur="blur">
          </div>
        </div> 
        <div class="count-range" v-show="timesSign == '1'">
           <div class="user-define" >
            <input type="number" @click="handleFocus" style="margin-left:0;" v-model.number="startConsumeTimes" :class="{'countinput':startConsumeTimes}" placeholder="次数" @blur="blur">
           </div>
           <span class="user-area">至</span>
           <div class="user-define">
            <input type="number" @click="handleFocus"  placeholder="次数" v-model.number="endConsumeTimes" :class="{'countinput':endConsumeTimes}" @blur="blur">
           </div>
        </div>
        <!-- 消费金额 -->
        <div class="consumer-mount">
          <popup-picker title="消费金额" :data="mountSignList" v-model="sumSign"  :columns="1" :show-name="true" :class="sumSign == '0' ? '' : 'selected'"></popup-picker>
          <div class="user-define" v-show="sumSign == '2'">
            <input type="number" @click="handleFocus"  placeholder="金额" v-model.number="consumeSum" :class="{'countinput':consumeSum}" @blur="blur">
          </div>
          <div class="user-define" v-show="sumSign == '4'">
            <input type="number" @click="handleFocus"  placeholder="金额" v-model.number="startConsumeSum" :class="{'countinput':startConsumeSum}" @blur="blur">
          </div>
          <div class="user-define" v-show="sumSign == '3'">
            <input type="number" @click="handleFocus"  placeholder="金额" v-model.number="endConsumeSum" :class="{'countinput':endConsumeSum}" @blur="blur">
          </div>
        </div>

        <div class="mount-range" v-show="sumSign == '1'">
           <div class="user-define" >
            <input type="number" @click="handleFocus" style="margin-left:0;" v-model.number="startConsumeSum" :class="{'countinput':startConsumeSum}" placeholder="金额" @blur="blur">
           </div>
           <span class="user-area">至</span>
           <div class="user-define">
            <input type="number" @click="handleFocus"  placeholder="金额" v-model.number="endConsumeSum" :class="{'countinput':endConsumeSum}" @blur="blur"> 
           </div>
        </div>
      </group>
    </div>

    <!-- 按钮区 -->
    <div class="btn">
        <p class="confirmBtn" 
        @click="save" 
        :class="gender[0] != '0'
        || startBirthYear
        || endBirthYear
        || birthMonth[0] != '0'
        || phone[0] != 0
        || startLevel[0] != '等级'
        || endLevel[0] != '等级'
        || startRegisterDate
        || endRegisterDate
        || memberCardType[0] != '0'
        || consumePeriod[0] != '0'
        || sumSign[0] != '0'
        ||timesSign[0] != '0'
        ?'activeColor':''">确定</p>
    </div>
  </div>
</template>
<script>
import { Group, Datetime, PopupPicker, Cell, cookie } from 'vux'
import { APIS } from '@a/js/config.js'
export default {
  name: 'tagRule',
  components: {
    Group,
    Datetime,
    PopupPicker,
    Cell
  },
  data () {
    let now = new Date()
    let nowYear = now.getFullYear()
    return {
      setColor: false,
      tagId: '',
      genderList: [
        {name: '选择', value: '0'},
        {name: '男', value: '1'},
        {name: '女', value: '2'},
        {name: '未知', value: '3'}
      ],
      gender: ['0'],
      startBirthYear: '',
      endBirthYear: '',
      nowYear: nowYear,
      leftminYear: 1850,
      birthMonth: ['0'],
      birthMonthList: [
        {
          name: '选择',
          value: '0'
        },
        {
          name: '1月',
          value: '1'
        },
        {
          name: '2月',
          value: '2'
        },
        {
          name: '3月',
          value: '3'
        },
        {
          name: '4月',
          value: '4'
        },
        {
          name: '5月',
          value: '5'
        },
        {
          name: '6月',
          value: '6'
        },
        {
          name: '7月',
          value: '7'
        }, {
          name: '8月',
          value: '8'
        }, {
          name: '9月',
          value: '9'
        }, {
          name: '10月',
          value: '10'
        }, {
          name: '11月',
          value: '11'
        }, {
          name: '12月',
          value: '12'
        }
      ],
      phoneList: [
        {name: '选择', value: '0'},
        {name: '无手机号', value: '2'},
        {name: '有手机号', value: '1'}
      ],
      phone: ['0'],
      // rankList1: [['等级', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6']],
      rankList1: [],
      rankList2: [],
      startLevel: ['等级'],
      endLevel: ['等级'],
      startRegisterDate: '',
      endRegisterDate: '',
      memberCardList: [
        {name: '选择', value: '0'},
        {name: '仅微信会员卡', value: '1'},
        {name: '仅实体会员卡', value: '2'},
        {name: '已绑卡', value: '3'}
      ],
      memberCardType: ['0'],
      consumerList: [
        {name: '选时段', value: '0'},
        {name: '7天内', value: '7'},
        {name: '30天内', value: '30'},
        {name: '90天内', value: '90'},
        {name: '180天内', value: '180'},
        {name: '360天内', value: '360'},
        {name: '超过360天内', value: '-1'}
      ],
      consumePeriod: ['0'],
      countSignList: [{name: '选择等式', value: '0'}, {name: '[ ]', value: '1'}, {name: '=', value: '2'}, {name: '<=', value: '3'}, {name: '>=', value: '4'}],
      timesSign: ['0'],
      countList: [['5', '10', '15', '20']],
      startConsumeTimes: '',
      endConsumeTimes: '',
      consumeTimes: '',
      mountSignList: [{name: '选择等式', value: '0'}, {name: '[ ]', value: '1'}, {name: '=', value: '2'}, {name: '<=', value: '3'}, {name: '>=', value: '4'}],
      sumSign: ['0'],
      startConsumeSum: '',
      endConsumeSum: '',
      consumeSum: '',
      value: '',
      isActive: false
    }
  },
  created () {
    let groupid = cookie.get('group_id')
    this.$axios({
      method: 'get',
      url: APIS.level,
      params: {group_id: groupid},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(res => {
      if (res.data.result.pagedData) {
        let data = []
        res.data.result.pagedData.forEach(ele => {
          data.push(ele.lever_code)
        })
        data.unshift('等级')
        this.$set(this.rankList1, 0, data)
        this.$set(this.rankList2, 0, data)
      }
    })
    this.tagId = this.$store.state.tagRuleData.tagId
    this.gender[0] = this.$store.state.tagRuleData.gender
    this.startBirthYear = this.$store.state.tagRuleData.startBirthYear
    this.endBirthYear = this.$store.state.tagRuleData.endBirthYear
    this.birthMonth[0] = this.$store.state.tagRuleData.birthMonth
    this.phone[0] = this.$store.state.tagRuleData.phone
    this.startLevel[0] = this.$store.state.tagRuleData.startLevel
    this.endLevel[0] = this.$store.state.tagRuleData.endLevel
    this.startRegisterDate = this.$store.state.tagRuleData.startRegisterDate
    this.endRegisterDate = this.$store.state.tagRuleData.endRegisterDate
    this.memberCardType[0] = this.$store.state.tagRuleData.memberCardType
    this.consumePeriod[0] = this.$store.state.tagRuleData.consumePeriod
    this.startConsumeTimes = this.$store.state.tagRuleData.startConsumeTimes
    this.endConsumeTimes = this.$store.state.tagRuleData.endConsumeTimes
    this.consumeTimes = this.$store.state.tagRuleData.consumeTimes
    this.startConsumeSum = this.$store.state.tagRuleData.startConsumeSum
    this.endConsumeSum = this.$store.state.tagRuleData.endConsumeSum
    this.consumeSum = this.$store.state.tagRuleData.consumeSum
    this.timesSign[0] = this.$store.state.tagRuleData.timesSign
    this.sumSign[0] = this.$store.state.tagRuleData.sumSign
  },
  watch: {
    timesSign: function (val, oldval) {
      if (oldval[0] !== '0') {
        this.startConsumeTimes = ''
        this.endConsumeTimes = ''
        this.consumeTimes = ''
      }
    },
    sumSign: function (val, oldval) {
      if (oldval[0] !== '0') {
        this.startConsumeSum = ''
        this.endConsumeSum = ''
        this.consumeSum = ''
      }
    }
  },
  mounted () {
    // this.gender[0] = this.$store.state.tagRuleData.gender + ''
  },
  methods: {
    blur () {},
    stopScroll () {
      window.addEventListener('touchmove', this.winPreventDefault, { passive: false })
    },
    statScroll () {
      window.removeEventListener('touchmove', this.winPreventDefault)
    },
    winPreventDefault (e) {
      e.preventDefault()
    },
    save () {
      if (this.gender[0] !== '0' || this.startBirthYear || this.endBirthYear || this.birthMonth[0] !== '0' || this.phone[0] !== '0' || this.startLevel[0] !== '等级' || this.endLevel[0] !== '等级' || this.startRegisterDate || this.endRegisterDate || this.memberCardType[0] !== '0' || this.consumePeriod[0] !== '0' || this.sumSign[0] !== '0' || this.timesSign[0] !== '0') {
        let tagRuleData = {
          gender: this.gender[0],
          startBirthYear: this.startBirthYear,
          endBirthYear: this.endBirthYear,
          birthMonth: this.birthMonth[0],
          phone: this.phone[0],
          startLevel: this.startLevel[0],
          endLevel: this.endLevel[0],
          startRegisterDate: this.startRegisterDate,
          endRegisterDate: this.endRegisterDate,
          memberCardType: this.memberCardType[0],
          consumePeriod: this.consumePeriod[0],
          startConsumeTimes: this.startConsumeTimes,
          endConsumeTimes: this.endConsumeTimes,
          consumeTimes: this.consumeTimes,
          startConsumeSum: this.startConsumeSum,
          endConsumeSum: this.endConsumeSum,
          consumeSum: this.consumeSum,
          timesSign: this.timesSign[0],             // 次数
          sumSign: this.sumSign[0]                  // 金额
        }
        var reg = /^([1-9][0-9]*)$/
        if (!this.startBirthYear && this.endBirthYear) {
          this.$loading.toast('开始年份不能为空')
          return
        } else if (this.startBirthYear && !this.endBirthYear) {
          this.$loading.toast('结束年份不能为空')
          return
        } else if (this.startBirthYear > this.endBirthYear) {
          this.$loading.toast('结束年份要大于等于开始年份')
          return
        }
        if (this.endLevel[0] !== '等级' && this.startLevel[0] === '等级') {
          this.$loading.toast('请选择开始等级')
          return
        }
        if (this.endLevel[0] === '等级' && this.startLevel[0] !== '等级') {
          this.$loading.toast('请选择结束等级')
          return
        }
        if (this.endLevel[0] !== '等级' && this.startLevel[0] !== '等级') {
          if (parseInt(this.startLevel[0].substring(1)) > parseInt(this.endLevel[0].substring(1))) {
            this.$loading.toast('结束等级要大于开始等级')
            return
          }
        }
        if (!new Date(this.endRegisterDate).getTime() && new Date(this.startRegisterDate).getTime()) {
          this.$loading.toast('结束入会时间不能为空')
          return
        }
        if (new Date(this.endRegisterDate).getTime() && !new Date(this.startRegisterDate).getTime()) {
          this.$loading.toast('开始入会时间不能为空')
          return
        }
        if (new Date(this.endRegisterDate).getTime() < new Date(this.startRegisterDate).getTime()) {
          this.$loading.toast('开始入会时间要小于结束入会时间')
          return
        }
        if (this.timesSign[0] === '1') {
          if (this.startConsumeTimes === '') {
            this.$loading.toast('消费次数不能为空')
            return
          }
          if (this.endConsumeTimes === '') {
            this.$loading.toast('消费次数不能为空')
            return
          }
          if (!reg.test(this.startConsumeTimes)) {
            this.$loading.toast('消费次数必须为整数')
            return
          }
          if (!reg.test(this.endConsumeTimes)) {
            this.$loading.toast('消费次数必须为整数')
            return
          }
          if (Number(this.startConsumeTimes) > Number(this.endConsumeTimes)) {
            this.$loading.toast('结束次数要大于开始次数')
            return
          }
          if (this.consumePeriod[0] === '0') {
            this.$loading.toast('请选择最近消费时段')
            return
          }
        } else if (this.timesSign[0] === '2') {
          if (this.consumeTimes === '') {
            this.$loading.toast('消费次数不能为空')
            return
          }
          if (!reg.test(this.consumeTimes)) {
            this.$loading.toast('消费次数必须为整数')
            return
          }
          if (this.consumePeriod[0] === '0') {
            this.$loading.toast('请选择最近消费时段')
            return
          }
        } else if (this.timesSign[0] === '3') {
          if (this.endConsumeTimes === '') {
            this.$loading.toast('消费次数不能为空')
            return
          }
          if (!reg.test(this.endConsumeTimes)) {
            this.$loading.toast('消费次数必须为整数')
            return
          }
          if (this.consumePeriod[0] === '0') {
            this.$loading.toast('请选择最近消费时段')
            return
          }
        } else if (this.timesSign[0] === '4') {
          if (this.startConsumeTimes === '') {
            this.$loading.toast('消费次数不能为空')
            return
          }
          if (!reg.test(this.startConsumeTimes)) {
            this.$loading.toast('消费次数必须为整数')
            return
          }
          if (this.consumePeriod[0] === '0') {
            this.$loading.toast('请选择最近消费时段')
            return
          }
        }
        if (this.sumSign[0] === '1') {
          if (this.startConsumeSum === '') {
            this.$loading.toast('消费金额不能为空')
            return
          }
          if (this.endConsumeSum === '') {
            this.$loading.toast('消费金额不能为空')
            return
          }
          if (!reg.test(this.startConsumeSum)) {
            this.$loading.toast('消费金额必须为整数')
            return
          }
          if (!reg.test(this.endConsumeSum)) {
            this.$loading.toast('消费金额必须为整数')
            return
          }
          if (Number(this.startConsumeSum) > Number(this.endConsumeSum)) {
            this.$loading.toast('结束金额要大于开始金额')
            return
          }
          if (this.consumePeriod[0] === '0') {
            this.$loading.toast('请选择最近消费时段')
            return
          }
        } else if (this.sumSign[0] === '2') {
          if (this.consumeSum === '') {
            this.$loading.toast('消费金额不能为空')
            return
          }
          if (!reg.test(this.consumeSum)) {
            this.$loading.toast('消费金额必须为整数')
            return
          }
          if (this.consumePeriod[0] === '0') {
            this.$loading.toast('请选择最近消费时段')
            return
          }
        } else if (this.sumSign[0] === '3') {
          if (this.endConsumeSum === '') {
            this.$loading.toast('消费金额不能为空')
            return
          }
          if (!reg.test(this.endConsumeSum)) {
            this.$loading.toast('消费金额必须为整数')
            return
          }
          if (this.consumePeriod[0] === '0') {
            this.$loading.toast('请选择最近消费时段')
            return
          }
        } else if (this.sumSign[0] === '4') {
          if (this.startConsumeSum === '') {
            this.$loading.toast('消费金额不能为空')
            return
          }
          if (!reg.test(this.startConsumeSum)) {
            this.$loading.toast('消费金额必须为整数')
            return
          }
          if (this.consumePeriod[0] === '0') {
            this.$loading.toast('请选择最近消费时段')
            return
          }
        }
        this.$store.commit('SET_RULEDATA', tagRuleData)
        // this.$store.commit('SET_DOGETDETAIL', false)
        this.blur()
        setTimeout(() => {
          window.history.back()
        }, 200)
      }
    }
  }
}
</script>

<style lang="less">
.tag-rule {
  display: block;
  background-color: #fff;
  position: relative;
  z-index: 10;
  .base-props {
    .icon-circle {
      position: absolute;
      z-index: 20;
      left: 0.75rem;
      top: 1.375rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: #259bec;
      transform: translate3d(0, -50%, 0);
    }
    > div {
      .weui-cells__title {
        margin-left: 0.9rem;
        margin-top: 0;
        margin-bottom: 0;
        padding: 0 0.75rem;
        height: 2.75rem;
        line-height: 2.75rem;

        font-size: 0.75rem;
        color: #222222;
        letter-spacing: 0;
      }
      .weui-cells {
        padding: 0 1rem;
        position: relative;
        &:before {
          position: absolute;
          display: none;
        }
        .born-year {
          display: flex;
          align-items: center;
          .born-text {
            height: 2.75rem;
            line-height: 2.75rem;
            font-size: 0.75rem;
            color: #222222;
          }
        }
        .vux-datetime {
          padding: 0;
          height: 2.75rem;
          line-height: 2.75rem;
          text-decoration: none;
          &:before {
            display: none;
          }
          > div {
            > p {
              font-size: 0.75rem;
            }
          }
          .vux-cell-primary.vux-datetime-value {
            padding-right: 0;
            text-align: center;
            width: 5rem!important;
            height: 1.6rem;
            line-height: 1.6rem;
            margin-left: 1rem;
            background-color: #F0F0F5;
            border-radius: 0.15rem;
            &:after {
              display: none;
            }
            > span {
              color: #888888;
              font-size: 0.7rem;
            }
          }
        }
        .vux-cell-box {
          position: relative;
          &:before {
            position: absolute;
            display: none;
          }
          .weui-cell.vux-tap-active.weui-cell_access {
            padding: 0;
            height: 2.75rem;
            line-height: 2.75rem;
            .weui-cell__hd {
              width: 3rem;
              .weui-label {
                font-size: 0.75rem;
                color: #222222;
                letter-spacing: 0;
                line-height: 2.75rem;
              }
            }
            .vux-cell-primary.vux-popup-picker-select-box {
              .vux-popup-picker-select {
                text-align: center!important;
                width: 5rem;
                height: 1.6rem;
                line-height: 1.6rem;
                background-color: #F0F0F5;
                border-radius: 0.15rem;
                margin-left: 1rem;
                .vux-popup-picker-value.vux-cell-value {
                  font-size: 0.7rem;
                  color: #888888;
                  text-align: center;
                }
              }
            }
            .weui-cell__ft {
              position: relative;
              &:after {
                position: absolute;
                display: none;
              }
            }
          }
        }
      }
    }
  }
  .asset-props {
    .icon-circle {
      position: absolute;
      z-index: 20;
      left: 0.75rem;
      top: 1.375rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: #F98125;
      transform: translate3d(0, -50%, 0);
    }
    > div {
      .weui-cells__title {
        margin-left: 0.9rem;
        margin-top: 0;
        margin-bottom: 0;
        padding: 0 0.75rem;
        height: 2.75rem;
        line-height: 2.75rem;

        font-size: 0.75rem;
        color: #222222;
        letter-spacing: 0;
      }
      .weui-cells {
        padding: 0 1rem;
        position: relative;
        &:before {
          position: absolute;
            display: none;
        }
        .born-year {
          display: flex;
          align-items: center;
          .born-text {
            height: 2.75rem;
            line-height: 2.75rem;
            font-size: 0.75rem;
            color: #222222;
          }
          .vux-datetime {
          padding: 0;
          height: 2.75rem;
          line-height: 2.75rem;
          text-decoration: none;
          &:before {
            display: none;
          }
          > div {
            > p {
              font-size: 0.75rem;
            }
          }
          .vux-cell-primary.vux-datetime-value {
            padding-right: 0;
            text-align: center;
            width: 5rem!important;
            height: 1.6rem;
            line-height: 1.6rem;
            margin-left: 1rem;
            background-color: #F0F0F5;
            border-radius: 0.15rem;
            &:after {
              display: none;
            }
            > span {
              color: #888888;
              font-size: 0.7rem;
            }
          }
        }
          #special002 {
            width: auto; 
            .weui-cell__hd {
              width: 0;
            }
          }
        }
        .enter-time {
          display: flex;
          align-items: center;
          .vux-datetime {
            // width: 9.65rem;
            padding: 0;
            height: 2.75rem;
            line-height: 2.75rem;
            text-decoration: none;
            &:before {
              display: none;
            }
            > div {
              > p {
                font-size: 0.75rem;
              }
            }
            .vux-cell-primary.vux-datetime-value {
              padding-right: 0;
              text-align: center;
              width: 5rem!important;
              height: 1.6rem;
              line-height: 1.6rem;
              margin-left: 1rem;
              background-color: #F0F0F5;
              border-radius: 0.15rem;
              &:after {
                display: none;
              }
              > span {
                color: #888888;
                font-size: 0.7rem;
              }
            }
          }
          .born-text {
            height: 2.75rem;
            line-height: 2.75rem;
            font-size: 0.75rem;
            color: #222222;
          }
          #special003 {
            width: auto; 
            .weui-cell__hd {
              width: 0;
            }
          }
        }
        .vux-cell-box {
          position: relative;
          &:before {
            position: absolute;
            display: none;
          }
          .weui-cell.vux-tap-active.weui-cell_access {
            padding: 0;
            height: 2.75rem;
            line-height: 2.75rem;
            .weui-cell__hd {
              width: 3rem;
              .weui-label {
                font-size: 0.75rem;
                color: #222222;
                letter-spacing: 0;
                line-height: 2.75rem;
              }
            }
            .vux-cell-primary.vux-popup-picker-select-box {
              .vux-popup-picker-select {
                text-align: center!important;
                width: 5rem;
                height: 1.6rem;
                line-height: 1.6rem;
                background-color: #F0F0F5;
                border-radius: 0.15rem;
                margin-left: 1rem;
                .vux-popup-picker-value.vux-cell-value {
                  font-size: 0.7rem;
                  color: #888888;
                  text-align: center;
                }
              }
            }
            .weui-cell__ft {
              position: relative;
              &:after {
                position: absolute;
                display: none;
              }
            }
          }
        }
      }
    }
  }
  .consumer-props {
    .icon-circle {
      position: absolute;
      z-index: 20;
      left: 0.75rem;
      top: 1.375rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: #B35CFF;
      transform: translate3d(0, -50%, 0);
    }
    > div {
      .weui-cells__title {
        margin: 0 0 0 0.9rem;
        padding: 0 0.75rem;
        height: 2.75rem;
        line-height: 2.75rem;

        font-size: 0.75rem;
        color: #222222;
        letter-spacing: 0;
      }
      .weui-cells {
        padding: 0 1rem;
        position: relative;
        &:before {
          position: absolute;
          display: none;
        }
        .consumer-count {
          display: flex;
          align-items: center;
          .born-text {
            height: 2.75rem;
            line-height: 2.75rem;
            font-size: 0.75rem;
            color: #222222;
          }
          #special004 {
            width: auto; 
            .weui-cell__hd {
              width: 0;
            }
          }
        
        }
        .count-range {
          display: flex;
          align-items: center;
          margin-left: 4rem;
          .born-text {
            height: 2.75rem;
            line-height: 2.75rem;
            font-size: 0.75rem;
            color: #222222;
          }
          #special005 {
            width: auto; 
            .weui-cell__hd {
              width: 0;
            }
          }
        }
        .consumer-mount {
          display: flex;
          align-items: center;
          .born-text {
            height: 2.75rem;
            line-height: 2.75rem;
            font-size: 0.75rem;
            color: #222222;
          }
          #special006 {
            width: auto; 
            .weui-cell__hd {
              width: 0;
            }
          }
          .user-define {
            height: 2.75rem;
            line-height: 2.75rem;
            input {
              font-size: 0.7rem;
              margin-left: 1rem;
              width: 5rem;
              height: 1.6rem;
              text-align: center;
              outline: none;
              border: none;
              background-color: #F0F0F5;
              color: #888888;
            }
          }
        }
        .mount-range {
          display: flex;
          align-items: center;
          margin-left: 4rem;
          .born-text {
            height: 2.75rem;
            line-height: 2.75rem;
            font-size: 0.75rem;
            color: #222222;
          }
          #special007 {
            width: auto; 
            .weui-cell__hd {
              width: 0;
            }
          }
        }
        .vux-cell-box {
          position: relative;
          &:before {
            position: absolute;
            display: none;
          }
          .weui-cell.vux-tap-active.weui-cell_access {
            padding: 0;
            height: 2.75rem;
            line-height: 2.75rem;
            .weui-cell__hd {
              width: 3rem;
              .weui-label {
                font-size: 0.75rem;
                color: #222222;
                letter-spacing: 0;
                line-height: 2.75rem;
              }
            }
            .vux-cell-primary.vux-popup-picker-select-box {
              .vux-popup-picker-select {
                text-align: center!important;
                width: 5rem;
                height: 1.6rem;
                line-height: 1.6rem;
                background-color: #F0F0F5;
                border-radius: 0.15rem;
                margin-left: 1rem;
                .vux-popup-picker-value.vux-cell-value {
                  font-size: 0.7rem;
                  color: #888888;
                  text-align: center;
                }
              }
            }
            .weui-cell__ft {
              position: relative;
              &:after {
                position: absolute;
                display: none;
              }
            }
          }
        }
      }
    }
  }
  .btn {
      margin-top: 2.5rem;
      margin-bottom: 1.5rem;
      width: 100%;
      display: flex;
      justify-content: center;
      background-color: #f8f8f8;
      .confirmBtn {
        width: 100%;
        margin: 0 1rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        font-size: 0.8rem;
        border-radius: 0.2rem;
        color: #ffffff;
        background-color: #c7c7c7;
        border-width: 2px;
        letter-spacing: 0.2rem;
      }
      .activeColor{
        background-color: #259bec;
      }
    }
}

.tag-rule .base-props > div .weui-cells .vux-cell-box.selected     .weui-cell.vux-tap-active.weui-cell_access .vux-cell-primary.vux-popup-picker-select-box .vux-popup-picker-select{
  background-color: #F1F7FB;
}
.tag-rule .base-props > div .weui-cells .vux-cell-box.selected     .weui-cell.vux-tap-active.weui-cell_access .vux-cell-primary.vux-popup-picker-select-box .vux-popup-picker-select .vux-popup-picker-value.vux-cell-value{
  color: #259BEC;
}

.tag-rule .asset-props > div .weui-cells .vux-cell-box.selected .weui-cell.vux-tap-active.weui-cell_access .vux-cell-primary.vux-popup-picker-select-box .vux-popup-picker-select {
  background-color: #F1F7FB;
}
.tag-rule .asset-props > div .weui-cells .vux-cell-box.selected .weui-cell.vux-tap-active.weui-cell_access .vux-cell-primary.vux-popup-picker-select-box .vux-popup-picker-select .vux-popup-picker-value.vux-cell-value {
  color: #259BEC;
}

.tag-rule .asset-props > div .weui-cells .enter-time .vux-datetime.selected .vux-cell-primary.vux-datetime-value {
  background-color: #F1F7FB;
}
.tag-rule .asset-props > div .weui-cells .enter-time .vux-datetime.selected .vux-cell-primary.vux-datetime-value > span {
  color: #259BEC;
}

.tag-rule .base-props > div .weui-cells .vux-datetime.selected .vux-cell-primary.vux-datetime-value {
  background-color: #F1F7FB;
}
.tag-rule .base-props > div .weui-cells .vux-datetime.selected .vux-cell-primary.vux-datetime-value > span {
  color: #259BEC;
}

.tag-rule .base-props > div .weui-cells .vux-cell-box.selected .weui-cell.vux-tap-active.weui-cell_access .vux-cell-primary.vux-popup-picker-select-box .vux-popup-picker-select {
  background-color: #F1F7FB;
}
.tag-rule .base-props > div .weui-cells .vux-cell-box.selected .weui-cell.vux-tap-active.weui-cell_access .vux-cell-primary.vux-popup-picker-select-box .vux-popup-picker-select .vux-popup-picker-value.vux-cell-value {
  color: #259BEC;
}

.tag-rule .consumer-props > div .weui-cells .vux-cell-box.selected .weui-cell.vux-tap-active.weui-cell_access .vux-cell-primary.vux-popup-picker-select-box .vux-popup-picker-select {
  background-color: #F1F7FB;
}
.tag-rule .consumer-props > div .weui-cells .vux-cell-box.selected .weui-cell.vux-tap-active.weui-cell_access .vux-cell-primary.vux-popup-picker-select-box .vux-popup-picker-select .vux-popup-picker-value.vux-cell-value {
  color: #259BEC;
}
  .user-define {
            height: 2.75rem;
            line-height: 2.75rem;
            input {
              font-size: 0.7rem;
              margin-left: 1rem;
              width: 5rem;
              height: 1.6rem;
              text-align: center;
              outline: none;
              border: none;
              background-color: #F0F0F5;
              color: #888888;
            }
            .countinput{
              color: #259BEC!important;
              background-color: #F1F7FB!important;
            }
          }
    .user-area{
          font-size: 0.75rem;
          padding-left: 0.85rem;
          line-height: 2.75rem;
          color: #222222;
    }      
</style>
