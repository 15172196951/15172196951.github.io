<template>
    <div class="select-list" id="org-wrapper">
        <tab-menu :tabMenu="tabMenu" @tab-current='getTab'></tab-menu>
        <div class="area" v-if='selelcBoole'>
          <div class="area-nav co-flex">
            <ul class="area-nav-ul co-flex">
              <li v-for="(item,index) in navMenus" :key="index" @click="selectUpd(index,item)">{{item.org_name}}</li>
            </ul>
            <div class="area-nav-sel" @click="selectUpd('','')">请选择</div>
          </div>
          <div class="arealist">
               <div @click="selectAll">全部</div>
               <ul>
                 <li v-for="(item,index) in arealist" :key="index" @click="selectItem(item,index)">{{item.org_name}}</li>
               </ul>
          </div>  
        </div>
        <div class="spell content" v-show='!selelcBoole'>
              <search
              @on-change="getResult"
              v-model="value"
              placeholder="搜索门店"
              top='4.5rem'
              ref="search"></search>
        </div>
        <div class="content_main" v-show='!selelcBoole' :style="{'height': spellHei}">
            <div class="left" ref="left">
              <ul>
                <li v-for="(item,index) in dataArr" :key="index"
                @click="selectName(index,$event)">
                {{item.key}}
                </li>
              </ul>
            </div>
            <div class="right" ref="right">
              <ul class="right_ul">
                <li v-for="(item,index) in dataArr" ref="Lis" :key="index" class="right-item right-item-hook">
                  <h2>{{item.key}}</h2>
                    <div v-for="(its,index) in item.item" :key="index" @click="selectSpellShop(its)">
                      {{its.text}}
                    </div>
                </li>
                <div v-if="!dataArr.length&&isdisplay"  class="scroll-nodata-pd co-flex co-ver co-ac co-jc co-cl-3">
                    <i class="coicon coicon-shielding co-mg-a04 co-fs-5"></i>
                    <div class="co-flex co-ac co-jc">暂无数据</div>
                </div>
              </ul>
            </div>
          </div>
    </div>
</template>
<script>
import { getWinHei } from '@a/js/function.js'
import TabMenu from './TabMenu'
import {Search, cookie} from 'vux'
import BScroll from 'better-scroll'
import { APIS } from '../assets/js/config.js'
export default {
  name: 'select-org',
  components: {TabMenu, Search},
  props: {
  },
  data () {
    return {
      tabMenu: [{name: '按区域', tip: 0}, {name: '按拼音', tip: 0}],
      data: [],
      arealist: [],
      navMenu: [],
      navMenus: [],
      selelcBoole: true,
      value: '',
      checklist: [],      // 选择的值
      iSChecked: 0,       // 已选个数
      iSCheckedValue: [], // 已选值
      listHight: [],
      scrollY: 0,
      clickEvent: false,
      show: false,
      name: '',
      isdisplay: false,
      paramsData: {employee_id: cookie.get('creatorId'), org_guid: ''},
      spellHei: '',
      spellData: {
        employee_id: cookie.get('creatorId'),   // 员工guid
        group_id: cookie.get('group_id'),      // 商户id
        if_all: false,
        org_name: '',
        excludeGuid: ''
      },
      dataArr: []
    }
  },
  mounted () {
    this.getOrg()
       // 即定时器 20ms

    this.$nextTick(() => {
          // $refs绑定元素
      this._initScroll()
      this._getHight()
      this.spellHei = getWinHei(6.95)
    })
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHight.length; i++) {
        let height = this.listHight[i]
        let height2 = this.listHight[i + 1]
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    // 获取拼音列表
    getSpell () {
      this.$loading.loading('加载中')
      this.$axios({
        method: 'get',
        url: APIS.memberSpellList,
        params: {...this.spellData}
      }).then(res => {
        this.$loading.hideLoading()
        this.isdisplay = true
        this.dataArr = res.data.result.shopDataList
      })
    },
    // 选者拼音门店
    selectSpellShop (obj) {
      // this.$refs.search.setBlur()
      // setTimeout(() => {
      this.$emit('selectshop', obj, false)
      // }, 200)
    },
    // 获取组织
    getOrg () {
      this.$loading.loading('加载中')
      this.$axios({
        method: 'get',
        url: APIS.memberOrganization,
        params: {...this.paramsData},
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
      }).then(res => {
        this.$loading.hideLoading()
        this.data = res.data.result
        this.navMenus.splice(0, 0, this.data[0])
        this.name = this.navMenus[0].org_name
        let org = {org_guid: res.data.result[0].org_guid}
        if (res.data.result[0].if_next) {
          this.$loading.loading('加载中')
          this.$axios({
            method: 'get',
            url: APIS.memberOrganization,
            params: {...this.paramsData, ...org},
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
          }).then(data => {
            this.$loading.hideLoading()
            this.arealist = data.data.result
          })
        }
      })
    },
    // 选择的值
    selectItem (obj, index) {
      this.name += '/' + obj.org_name
      if (obj.if_next) {
        var org = {org_guid: obj.org_guid}
        this.navMenus.push(obj)
        this.$loading.loading('加载中')
        this.$axios({
          method: 'get',
          url: APIS.memberOrganization,
          params: {...this.paramsData, ...org},
          headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).then(res => {
          this.$loading.hideLoading()
          this.arealist = res.data.result
        })
      } else {
        this.$emit('selectd', obj, false, this.name)
      }
    },
    // 全部
    selectAll () {
      this.$emit('selectd', this.navMenus[this.navMenus.length - 1], false, this.name)
      this.selelcBoole = false
    },
    // 请选择
    selectUpd (index, obj) {
      this.navMenus = []
      this.getOrg()
    },
    // tab 切换
    getTab (item) {
      if (item.name === '按区域') {
        this.selelcBoole = true
        this.navMenus = []
        this.getOrg()
      } else {
        this.selelcBoole = false
        this.getSpell()
      }
    },
    getResult (val) {
      this.spellData.org_name = val
      this.getSpell()
    },
    selectName (index, event) {
      this.clickEvent = true

      this.currentNum = index
      if (!event._constructed) {
        return
      }
      // this._getHight()
      let rightItems = this.$refs.right.getElementsByClassName('right-item')
      let el = rightItems[index]
      this.rights.scrollToElement(el, 300)
    },
    _initScroll () {
      this.lefts = new BScroll(this.$refs.left, {
            // 开启点击事件 默认为false
        click: true
      })
      this.rights = new BScroll(this.$refs.right, {
         // 开启点击事件 默认为false
        click: true,
        probeType: 3
      })
      // 获取滑动的高度
      this.rights.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _getHight () {
      let rightItems = this.$refs.right.getElementsByClassName('right-item')
      let height = 0
      this.listHight.push(height)
      for (let i = 0; i < rightItems.length; i++) {
        let item = rightItems[i]
        height += item.clientHeight
        this.listHight.push(height)
      }
    }

  }
}
</script>
<style lang="less">
#org-wrapper{
  //按区域
  flex:1;
  .area{
    .area-nav{
      padding-top: 0.7rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      .area-nav-ul{
        li{
          line-height: 1.25rem;
          margin-right: 0.925rem;
          color: #222222;
          font-size: 0.65rem;
        }
      }
      .area-nav-sel{
        line-height: 1.25rem;
        padding-right: 0.075rem;
        font-size: 0.65rem;
        color: #F98125;
        border-bottom: 0.1rem solid #F98125;
      }   
    }
    .arealist{
      margin-top: 0.125rem;
      padding-left: 0.75rem;
      line-height: 2.05rem;
      font-size: 0.65rem;
      color: #222222;
    }
  }
  // 按拼音
  .spell{
    position: absolute;
    top: 2.25rem;
    bottom: 0;
    width: 100%;
    .weui-search-bar{
      padding: 0.45rem 0.75rem;
      background: #F5F5F5;
    }
    .weui-search-bar:before{
      display: none;
    }
    .weui-search-bar:after{
      display: none;
    }
    .weui-search-bar__form{
      height: 1.6rem;
    }
  
  }
   .content_main{
      position: absolute;
      top: 4.75rem;
      width: 100%;
      bottom: 0;
      overflow: hidden;
      .left{
        position: absolute;
        top: 0.35rem;
        right: 0.675rem;
        z-index: 100;
        ul{
          li{
            color: #222222;
            font-size: 0.55rem;
            line-height: 0.8rem;
          }
        }
      }
      .right{
        height: 100%;
        h2{
          background: #F5F5F5;
          color: #555555;
          font-size: 0.7rem;
          padding-right: 0.75rem;
          line-height: 1.375rem;
          padding-left: 0.75rem;
          font-weight: normal;
        }
        .right_ul{
          div{
            background: #FFFFFF;
            line-height: 2rem;
            padding-right: 0.75rem;
            padding-left: 0.75rem;
            font-size: 0.65rem;
            border-bottom: 1px solid #F5F5F5;
          }
        }
      }
   } 
  .spell{
  .weui-search-bar__form:after {
        display: none!important;
      }
    .weui-search-bar__label{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items:center;
        justify-content: center;
        -webkit-justify-content:center;
        font-size: 0.65rem;
        color: #888888;
      }
    .weui-search-bar__box{
      background: #fff;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items:center;
        font-size: 0.65rem;
        color: #888888;
        .weui-icon-search {
          left:0.4rem;
          line-height:1.6rem;
        }
    }
    .weui-search-bar__cancel-btn{
        font-size: 0.7rem;
        color: #259BEC;
        margin-left: 1rem;
        margin-right: 0.25rem; 
    }
    a{
      text-decoration:none
    }
  }
}
</style>


