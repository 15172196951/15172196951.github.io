<template>
  <div class="edit-person-wrapper">
    <scroll-list>
        <div class="edit-person-content">
          <div class="commonInput" v-if="otherShow">
            <div class="name co-flex co-ac" v-if="this.$route.query.headTitle === 'name'">
              <label for="">{{headTitle}}</label>
              <input type="text" v-model="value" maxlength="10" placeholder="请输入" @click="handleFocus" class="co-f1">
            </div>
            <div class="idCard co-flex co-ac" v-if="this.$route.query.headTitle === 'idCard'">
              <label for="">{{headTitle}}</label>
              <input type="text" v-model="value" placeholder="请输入" @click="handleFocus" class="co-f1">
            </div>
            <div class="phone co-flex co-ac" v-if="this.$route.query.headTitle === 'phoneNumber'">
              <label for="">{{headTitle}}</label>
              <input type="number" placeholder="请输入" 
              v-model="value" maxlength="11" pattern="[0-9]*" class="co-f1" @click="handleFocus">
            </div>
            <div class="email co-flex co-ac" v-if="this.$route.query.headTitle === 'customersEmailAddress'">
              <label for="">{{headTitle}}</label>
              <input type="text" v-model="value" maxlength="30" placeholder="请输入" class="co-f1" @click="handleFocus">
            </div>
          </div>
          <group v-if="this.$route.query.headTitle === 'birthday'">
            <datetime
              v-model="birth"
              title="生日" :min-year=1000></datetime>
          </group>
          <div class="sex co-flex co-jsb" v-if="this.$route.query.headTitle === 'sex'">
            <div>性别</div>
            <div class="co-flex">
              <p @click="sexType(0)"><icon :type="selectId?'success':'circle'"></icon><span ref="sexValue">男</span></p>
              <p @click="sexType(1)"><icon :type="selectType?'success':'circle'"></icon><span ref="sexValue">女</span></p>
            </div>
          </div>
          <button @click="submit">确 认</button>
        </div>
    </scroll-list>    
  </div>
</template>

<script>
import ScrollList from '@c/ScrollList'
import { APIS } from '@a/js/config.js'
import { Group, Datetime, Icon } from 'vux'
export default {
  name: 'EditPerson',
  components: {
    ScrollList,
    Group,
    Datetime,
    Icon
  },
  data () {
    return {
      validFu: null,
      value: null,
      birth: '请选择',
      birthShow: false,
      sexShow: false,
      otherShow: false,
      selectId: null,
      selectType: null,
      sex: '',
      headTitle: ''
    }
  },
  methods: {
    sexType (index) {
      if (index === 0) {
        this.sex = '男'
        this.selectId = true
        this.selectType = false
      } else {
        this.sex = '女'
        this.selectType = true
        this.selectId = false
      }
    },
    getUpdate (data) {
      this.$loading.loading('修改中')
      return this.$axios({
        url: APIS.memberUpdata,
        method: 'post',
        params: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
    },
    submit () {
      var data = {}
      switch (this.$route.query.headTitle) {
        case 'name':
          var nameReg = /^[(\u4e00-\u9fa5)|(a-zA-Z)]+$/
          if (nameReg.test(this.value)) {
            data.name = this.value
            data.guid = this.$route.query.guid
            this.getUpdate(data)
            .then(res => {
              this.$loading.hideLoading()
              if (res.data.status === 200) {
                this.$loading.toast('修改成功')
                this.$store.state.tabInfo.tabInfoPerson.name = data.name
                window.history.back()
              } else {
                this.$loading.toast(`${res.data.error}`)
              }
            })
          } else {
            this.$vux.toast.show({
              type: 'text',
              text: '只可输入中文或字母或其组合',
              width: '11rem'
            })
          }
          break
        case 'idCard':
          var IdReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          if (IdReg.test(this.value)) {
            data.idCard = this.value
            data.guid = this.$route.query.guid
            this.getUpdate(data)
            .then(res => {
              this.$loading.hideLoading()
              if (res.data.status === 200) {
                this.$loading.toast('修改成功')
                this.$store.state.tabInfo.tabInfoPerson.idCard = data.idCard
                window.history.back()
              } else {
                this.$loading.toast(`${res.data.error}`)
              }
            })
          } else {
            this.$vux.toast.show({
              type: 'text',
              text: '请输入格式正确的身份证号',
              width: '10rem'
            })
          }
          break
        case 'phoneNumber':
          var telReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
          if (telReg.test(this.value)) {
            data.phoneNumber = this.value
            data.guid = this.$route.query.guid
            this.getUpdate(data)
            .then(res => {
              this.$loading.hideLoading()
              if (res.data.status === 200) {
                this.$loading.toast('修改成功')
                this.$store.state.tabInfo.tabInfoPerson.phoneNumber = data.phoneNumber
                window.history.back()
              } else {
                this.$loading.toast(`${res.data.error}`)
              }
            })
          } else {
            this.$vux.toast.show({
              type: 'text',
              text: '请输入格式正确的手机号',
              width: '9.5rem'
            })
          }
          break
        case 'birthday':
          if (this.birth) {
            data.birthday = this.birth
            data.guid = this.$route.query.guid
            this.getUpdate(data)
            .then(res => {
              this.$loading.hideLoading()
              if (res.data.status === 200) {
                this.$loading.toast('修改成功')
                this.$store.state.tabInfo.tabInfoPerson.birthday = data.birthday
                window.history.back()
              } else {
                this.$loading.toast(`${res.data.error}`)
              }
            })
          }
          break
        case 'sex':
          if (this.sex) {
            data.sex = this.sex
            data.guid = this.$route.query.guid
            this.getUpdate(data)
            .then(res => {
              this.$loading.hideLoading()
              if (res.data.status === 200) {
                this.$loading.toast('修改成功')
                this.$store.state.tabInfo.tabInfoPerson.sex = data.sex
                window.history.back()
              } else {
                this.$loading.toast(`${res.data.error}`)
              }
            })
          }
          break
        case 'customersEmailAddress':
          var myReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
          if (myReg.test(this.value)) {
            data.customersEmailAddress = this.value
            data.customersId = this.$route.query.customersId
            this.getUpdate(data)
            .then(res => {
              this.$loading.hideLoading()
              if (res.data.status === 200) {
                this.$loading.toast('修改成功')
                this.$store.state.tabInfo.tabInfoPerson.customersEmailAddress = data.customersEmailAddress
                window.history.back()
              } else {
                this.$loading.toast(`${res.data.error}`)
              }
            })
          } else {
            this.$vux.toast.show({
              type: 'text',
              text: '请输入格式正确的邮箱',
              width: '9.5rem'
            })
          }
          break
      }
    }
  },
  created () {
    this.headTitle = this.$route.query.headTitle
    var person = this.$store.state.tabInfo.tabInfoPerson
    switch (this.$route.query.headTitle) {
      case 'name':
        this.value = person.name
        this.headTitle = '姓名'
        this.otherShow = true
        break
      case 'idCard':
        this.value = person.idCard
        this.headTitle = '身份证'
        this.otherShow = true
        break
      case 'phoneNumber':
        this.value = person.phoneNumber
        this.headTitle = '手机号'
        this.otherShow = true
        break
      case 'customersEmailAddress':
        this.value = person.customersEmailAddress
        this.headTitle = '邮箱'
        this.otherShow = true
        break
      case 'birthday':
        this.birth = person.birthday
        this.headTitle = '出生日期'
        this.birthShow = true
        break
      case 'sex':
        this.headTitle = '性别'
        this.sexShow = true
        this.sex = person.sex
        if (this.sex === '男') {
          this.selectId = true
        } else {
          this.selectType = true
        }
        break
    }
  }
}
</script>

<style lang="less" scoped>
  .edit-person-wrapper{
    font-size: 0.75rem;
    .edit-person-content{
      margin-top: 0.75rem;
      .commonInput{
        background: #fff;
        padding: 0.6rem 0.75rem;
        input{
          border: 0;
          outline: none;
          margin-left: 0.5rem;
          font-size: 0.75rem;
        }
        label{
          font-size: 0.75rem;
        }
      }
      .sex{
        background: #fff;
        height: 2.25rem;
        line-height: 2.25rem;
        padding: 0 0.75rem;
        p{
          margin-right: 3rem;
        }
      }
      button{
        background: #259BEC;
        border-radius: 0.2rem;
        border: 0;
        width: 90%;
        height: 2rem;
        font-size: 0.8rem;
        color: #FFFFFF;
        margin-top: 7.5rem;
        margin-left: 5%;
      }
    }
  }
</style>

<style lang="less">
  .edit-person-wrapper{
    .weui-input{
      outline: none;
    }
    .weui-cells{
      margin-top: 0;
      font-size: 0.75rem;
      height: 2.25rem;
      line-height: 2.25rem;
    }
    .weui-cell{
      padding: 0 0.75rem;
    }
    .weui-input{
      height: 1.05rem;
      line-height: 1.05rem;
    }
    a{
      text-decoration: none;
    }
    .vux-cell-value {
      color: #0c0c0c;
    }
    .weui-cell_access .weui-cell__ft:after {
      border-color: #222;
      border-width: 1px 1px 0 0;
    }
  }
</style>

