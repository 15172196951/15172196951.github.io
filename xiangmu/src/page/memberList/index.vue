<template>
  <div class="member-list">
    <div class="search" id="member-list-search">
      <div class="input-wrapper co-flex co-ac">
        <span @click="searchMember"><x-icon type="ios-search" size="20" style="verticalAlign:center"></x-icon></span>
        <input type="text" placeholder="搜索"  v-model="searchValue" ref="search" @keyup.enter='searchMember'>
      </div>
    </div>
    <div class="search-banner co-flex co-bg-0 co-ac co-jsb" :class="{'fixed':showOrg}">
      <div class="org-name co-flex co-ac co-of" :class="{'active': showOrg}"><span @click="showOrg=!showOrg">{{curOrg}}</span><x-icon class="fs-0" type="ios-arrow-down" :class="{'hide':showOrg}"></x-icon><x-icon type="ios-arrow-up" :class="{'hide':!showOrg}"></x-icon></div>
      <img :src="selectIcon" class="select-icon" v-show="!showOrg" @click="isShowSearch=!isShowSearch">
    </div>
    <select-org :selectvalue="curOrg" @selectd="getOrg" v-if="showOrg" @selectshop="getSpell">
    </select-org>
    <div class="member-box" v-show="!showOrg">
      <scroll-list>
          <member-com :data="memberData"></member-com>
      </scroll-list>
    </div>
    <div class="search-pop" v-show="isShowSearch" :style="{'height': searchPopHei}">
      <div class="black-bg" :style="{'height': searchPopHei}"></div>
      <div class="search-pop-box" id="member-search-pop">
        <div style="padding: 0.5rem 0; height:11.875rem;">
          <div class="enter-time co-flex co-ac">
            <datetime title="最近消费" v-model="searchData.startConsumerDate" placeholder="开始时间" :class="searchData.startConsumerDate == '' ? '' : 'selected'"></datetime>
            <p class="born-text">至</p>
            <datetime id="special003" v-model="searchData.endConsumerDate" placeholder="结束时间" :class="searchData.endConsumerDate == '' ? '' : 'selected'"></datetime>
          </div>
          <div class="enter-time co-flex co-ac">
            <datetime title="入会时间" v-model="searchData.startRegisterDate" placeholder="开始时间" :class="searchData.startRegisterDate == '' ? '' : 'selected'"></datetime>
            <p class="born-text">至</p>
            <datetime id="special003" v-model="searchData.endRegisterDate" placeholder="结束时间" :class="searchData.endRegisterDate == '' ? '' : 'selected'"></datetime>
          </div>
          <div class="enter-time co-flex co-ac">
            <popup-picker title="等级" :data="levelList" v-model="searchData.startLevel" :class="searchData.startLevel == '等级' ? '' : 'selected'"></popup-picker>
          </div>
          <div class="enter-time co-flex co-ac">
            <popup-picker title="性别" :data="genderList" :show-name="true"  :columns="1" :class="searchData.gender == '0' ? '' : 'selected'" v-model="searchData.gender" @on-show="stopScroll" @on-hide="statScroll"></popup-picker>
          </div>
        </div>
        <div class="search-pop-btns co-flex">
          <div class="reset">重置</div>
          <div class="submit">确定</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import selectIcon from '@a/images/search_find_icon.png'
import selectedIcon from '@a/images/search_find_icon2.png'
import { getWinHei } from '@a/js/function.js'
import {cookie, Datetime, PopupPicker} from 'vux'
import SelectOrg from '@c/SelectOrg'
import ScrollList from '@c/ScrollList'
import MemberCom from '@c/MemberCom'
import {APIS} from '@a/js/config.js'
export default {
  name: 'memberList',
  components: {
    SelectOrg,
    ScrollList,
    MemberCom,
    Datetime,
    PopupPicker
  },
  data () {
    return {
      searchValue: '',
      curOrg: '',
      orgId: '',
      showOrg: false,
      isShowSearch: false,
      searchPopHei: '',
      searchData: {
        startConsumerDate: '',
        endConsumerDate: '',
        startRegisterDate: '',
        endRegisterDate: '',
        startLevel: ['等级'],
        gender: ['0']
      },
      currentSearch: {
        startConsumerDate: '',
        endConsumerDate: '',
        startRegisterDate: '',
        endRegisterDate: '',
        startLevel: ['等级'],
        gender: ['0']
      },
      levelList: [],
      memberData: [{
        name: '1111'
      }]
    }
  },
  computed: {
    selectIcon () {
      return (this.isShowSearch || !!(this.currentSearch.startConsumerDate === '' && this.currentSearch.endConsumerDate === '' &&
      this.currentSearch.startRegisterDate === '' && this.currentSearch.endRegisterDate === '' &&
      this.currentSearch.startLevel[0] === '等级' && this.currentSearch.gender[0] === '0')) ? selectIcon : selectedIcon
    },
    genderList () {
      return [
        {name: '选择', value: '0'},
        {name: '男', value: '1'},
        {name: '女', value: '2'},
        {name: '未知', value: '3'}
      ]
    }
  },
  created () {
    this.getInfo()
    this.$axios({
      method: 'get',
      url: APIS.level,
      params: {group_id: cookie.get('group_id')},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(res => {
      if (res.data.result.pagedData) {
        let data = []
        res.data.result.pagedData.forEach(ele => {
          data.push(ele.lever_code)
        })
        data.unshift('等级')
        this.$set(this.levelList, 0, data)
      }
    })
  },
  mounted () {
    this.searchPopHei = getWinHei(4.5)
  },
  methods: {
    searchMember () {
    },
    getOrg (val, bool) {
      this.curOrg = val.org_name
      this.orgId = val.org_guid
      this.showOrg = bool
      // this.org = val.org_guid
      // this.$store.commit('CHANGE_ORG', val)
      // this.selectvalue = this.$store.state.dataParms.org_name
      // this.org = this.$store.state.dataParms.org_guid
      // this.showData({
      //   type: 0,
      //   cb: (len) => {
      //     this.$refs.scroll.upShow(len)
      //   }
      // })
    },
    getSpell (obj, bool) {
      this.curOrg = obj.text
      this.orgId = obj.org_guid
      this.showOrg = bool
      // this.showData({
      //   type: 0,
      //   cb: (len) => {
      //     this.$refs.scroll.upShow(len)
      //   }
      // })
    },
     // 初始化
    getInfo () {
      // let _self = this
      this.$loading.loading('加载中')
      this.$axios({
        url: APIS.memberOrganization,
        method: 'get',
        params: {employee_id: cookie.get('creatorId'), org_guid: ''},
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
      }).then(res => {
        this.$loading.hideLoading()
        this.curOrg = res.data.result[0].org_name
        this.orgId = res.data.result[0].org_guid
        // this.showData({
        //   type: 0,
        //   cb (len) {
        //     _self.$refs.scroll.upShow(len)
        //   }
        // })
      })
    },
    stopScroll () {
      window.addEventListener('touchmove', this.winPreventDefault, { passive: false })
    },
    statScroll () {
      window.removeEventListener('touchmove', this.winPreventDefault)
    },
    winPreventDefault (e) {
      e.preventDefault()
    }
  }
}
</script>

<style lang="less" scoped>
.member-list {
  display: block;
  width: 100%;
  height: 100%;
  background: #f0f0f5;
    .search{
      padding: 0.525rem 0.75rem 0.525rem 1rem;
      height: 2.25rem;
      background: #fff;
      .input-wrapper{
        width: 88%;
        border-radius: 0.1rem;
        overflow: hidden;
        background: #F5F5F5;
        height: 1.6rem;
        input{
          width: 100%;
          height: 1.6rem;
          border:0;
          outline: none;
          background: transparent;
          font-size: 0.6rem;
          margin-left: 0.15rem;
        }
        span{
          margin-left: 0.35rem;
          display: block;
        }
      }
    }
  }
.search-banner{
  background: #FFFFFF;
  padding: 0.525rem 0.75rem 0.525rem 1rem;
  height: 2.25rem;
  width: 100%;
  .org-name {
    span{
      font-size: 0.7rem;
      color: #222;
      margin-right: 0.25rem;
    }
    .hide{
      display: none;
    }
    .vux-x-icon {
      fill: #222222;
      width: 0.8rem;
      height: 0.8rem;
    }
    .vux-x-icon-ios-arrow-up{
      fill:  #259BEC;
    }
  }
  .org-name.active span{
    color: #259BEC;
  }
}
.fixed{
  position: fixed;
  left: 0;
  top: 0;
}
.select-icon{
  width: 1.2rem;
  height: 1.2rem;
}
.member-box{
   margin-top: 0.75rem;
}
.search-pop{
  position: absolute;
  left: 0;
  top: 4.5rem;
  width:100%;
}
.black-bg{
  position: absolute;
  left: 0;
  top: 0;
  width:100%;
  background-color: #000;
  opacity: 0.5;
}
.search-pop-box{
  border-top: 1px solid #e6e6e6;
  position: relative;
  width: 100%;
  height: 14.375rem;
  background-color: #fff;
}
.search-pop-btns div{
  width: 50%;
  height:2.5rem;
  line-height: 2.5rem;
  text-align: center;
  font-size: 0.8rem;
  &.reset{
    background-color: #F0F0F5;
    color: #222;
  }
  &.submit{
    background-color: #259BEC;
    color: #fff;
  }
}
</style>

<style lang="less">
#member-list-search{
  .vux-x-icon {
    fill: #d2d1d1;
    margin-top: 0.2rem;
  }
}
#member-search-pop{
  .enter-time {
    padding-left: 1rem;
    height: 2.7rem;
    .vux-datetime.selected .vux-cell-primary.vux-datetime-value{
      background-color: #F1F7FB !important;
      span {
        color: #259BEC !important;
      }
    }  
    .vux-datetime:first-child div{
      width:4rem;
      display: inline-block;
    }
    .vux-datetime {
      text-decoration: none;
      &:before {
        display: none;
      }
      > div {
        font-size: 0.75rem;
      }
      .vux-cell-primary.vux-datetime-value {
        padding-right: 0;
        text-align: center;
        width: 5rem!important;
        height: 1.6rem;
        line-height: 1.6rem;
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
      &.selected .weui-cell.vux-tap-active.weui-cell_access .vux-cell-primary.vux-popup-picker-select-box .vux-popup-picker-select {
        background-color: #F1F7FB;
        .vux-popup-picker-value.vux-cell-value {
          color: #259BEC;
        }
      }
      .weui-cell.vux-tap-active.weui-cell_access {
        display: flex;
        display: -webkit-flex;
        align-items: center;
	      -webkit-align-items:center;
        padding: 0;
        .weui-cell__hd {
          width: 4.15rem;
          .weui-label {
            font-size: 0.75rem;
            color: #222222;
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
    .born-text {
      font-size: 0.75rem;
      color: #222222;
      padding: 0 0.5rem;
    }
    #special003 {
      width: auto; 
      .weui-cell__hd {
        width: 0;
      }
    }
  }
} 
</style>
