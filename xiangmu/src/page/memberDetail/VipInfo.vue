<template>
  <div class="member-info co-f1 co-flex co-ver co-cl-1">
    <scroll-list>
      <div class="main">
        <div class="draw">
          <div class="draw-content co-flex co-jsb co-ac">
            <div class="draw-content-left co-flex co-jsb co-ac">
              <div class="head-img-wrapper">
                <img :src="tabInfoPerson.headImageUrl" alt="" v-if="tabInfoPerson.headImageUrl">
                <img src="../../assets/images/character.png" alt="" v-else>
              </div>
              <div>
                <div class="nick co-flex co-ac">
                  <p>{{tabInfoPerson.customersNick?tabInfoPerson.customersNick:tabInfoPerson.name}}</p>
                  <div>
                    <img src="../../assets/images/level/1.png" alt="" v-if="tabInfoIntegral.lever_code ==='V1'">
                    <img src="../../assets/images/level/2.png" alt="" v-if="tabInfoIntegral.lever_code ==='V2'">
                    <img src="../../assets/images/level/3.png" alt="" v-if="tabInfoIntegral.lever_code ==='V3'">
                    <img src="../../assets/images/level/4.png" alt="" v-if="tabInfoIntegral.lever_code ==='V4'">
                    <img src="../../assets/images/level/5.png" alt="" v-if="tabInfoIntegral.lever_code ==='V5'">
                    <img src="../../assets/images/level/6.png" alt="" v-if="tabInfoIntegral.lever_code ==='V6'">
                    <img src="../../assets/images/level/7.png" alt="" v-if="tabInfoIntegral.lever_code ==='V7'">
                    <img src="../../assets/images/level/8.png" alt="" v-if="tabInfoIntegral.lever_code ==='V8'">
                    <img src="../../assets/images/level/9.png" alt="" v-if="tabInfoIntegral.lever_code ==='V9'">
                    <img src="../../assets/images/level/10.png" alt="" v-if="tabInfoIntegral.lever_code ==='V10'">
                    <img src="../../assets/images/level/11.png" alt="" v-if="tabInfoIntegral.lever_code ==='V11'">
                    <img src="../../assets/images/level/12.png" alt="" v-if="tabInfoIntegral.lever_code ==='V12'">
                    <img src="../../assets/images/level/13.png" alt="" v-if="tabInfoIntegral.lever_code ==='V13'">
                    <img src="../../assets/images/level/14.png" alt="" v-if="tabInfoIntegral.lever_code ==='V14'">
                    <img src="../../assets/images/level/15.png" alt="" v-if="tabInfoIntegral.lever_code ==='V15'">
                  </div>
                </div>
                <!-- <div v-if="tabInfoIntegral.max_integral&&tabInfoIntegral.current_integral"> -->
                <div v-if="tabInfoIntegral.current_integral">
                  <x-progress :percent='present' :show-cancel="false"></x-progress>
                  <span>再努力 {{tabInfoIntegral.max_integral-tabInfoIntegral.current_integral}} 积分即可升级</span>
                </div>
                <div v-else> 
                  <div v-if="tabInfoIntegral.current_integral == 0">
                    <x-progress :percent='present' :show-cancel="false"></x-progress>
                    <span>再努力 {{tabInfoIntegral.max_integral-tabInfoIntegral.current_integral}} 积分即可升级</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="draw-content-right">
              <p><x-icon type="ios-star-outline" size="20"></x-icon></p>
              <p>关注</p>
            </div> -->
          </div>
        </div>
        <div class="tab-menu">
          <tab :line-width="3" custom-bar-width="3rem" active-color='#259BEC'>
            <tab-item v-for='(item,index) in tabMenu' :key='index' @on-item-click="onItemClick" :selected='activeIndex==index'>{{item}}</tab-item>
          </tab>
        </div>
        <div class="tab-menu-content" v-show="activeIndex == 0">
          <tab-info
          @skipCommonFu='commonFu' 
          @skipEdit='edit'
            :personMsg='tabInfoPerson' 
            :gameMsg='tabInfoCard'
            :tabInfoIntegral='tabInfoIntegral'
            :discount='discount'
            :exchange='exchange'
            >
          </tab-info>
        </div>
        <div class="tab-menu-content" v-show="activeIndex == 1">
          <tab-draw :memberDraw='memberDraw'></tab-draw>
        </div>
        <div class="tab-menu-content" v-show="activeIndex == 2">
          <tab-reach :memberDraw='memberDraw'></tab-reach>
        </div>
      </div>
    </scroll-list>
  </div>
</template>

<script>
import ScrollList from '@c/ScrollList'
import { APIS } from '@a/js/config.js'
import { Tab, TabItem, XProgress } from 'vux'
import TabInfo from '../components/TabInfo.vue'
import TabDraw from '../components/TabDraw.vue'
import TabReach from '../components/TabReach.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'VipInfo',
  components: {
    Tab,
    TabItem,
    XProgress,
    TabInfo,
    TabDraw,
    TabReach,
    ScrollList
  },
  data () {
    return {
      activeIndex: 0,
      tabMenu: ['会员信息', '会员画像', '会员触达'],
      memberDraw: []
    }
  },
  computed: {
    ...mapState({
      tabInfoPerson: state => state.tabInfo.tabInfoPerson,
      tabInfoCard: state => state.tabInfo.tabInfoCard,
      tabInfoIntegral: state => state.tabInfo.tabInfoIntegral,
      discount: state => state.tabInfo.discount,
      exchange: state => state.tabInfo.exchange,
      present: state => state.tabInfo.present
    })
  },
  created () {
    let cardNo = this.$store.state.cardNo
    this.$store.dispatch('tabInfo/createdData', cardNo)
  },
  methods: {
    ...mapActions('tabInfo', [
      'createdData'
    ]),
    commonFu (data) {
      switch (data.index) {
        case 'comment':
          this.$router.push({name: 'Comment'})
          break
        case 'activity':
          this.$router.push({name: 'MarkActivity'})
          break
        case 'SilverCard':
          this.$router.push({name: 'SilverCard'})
          break
        case 'edit':
          if (this.$store.state.tabInfo.tabInfoPerson.name && data.title === 'name' && this.$store.state.tabInfo.tabInfoPerson.name !== '微信用户') {
            this.$router.push({name: 'EditPerson', query: {headTitle: data.title, guid: this.tabInfoPerson.guid, customersId: this.tabInfoPerson.customersId}})
          }
          if (this.$store.state.tabInfo.tabInfoPerson.birthday && data.title === 'birthday') {
            this.$router.push({name: 'EditPerson', query: {headTitle: data.title, guid: this.tabInfoPerson.guid, customersId: this.tabInfoPerson.customersId}})
          }
          if (this.$store.state.tabInfo.tabInfoPerson.sex && data.title === 'sex') {
            this.$router.push({name: 'EditPerson', query: {headTitle: data.title, guid: this.tabInfoPerson.guid, customersId: this.tabInfoPerson.customersId}})
          }
          if (this.$store.state.tabInfo.tabInfoPerson.idCard && data.title === 'idCard') {
            this.$router.push({name: 'EditPerson', query: {headTitle: data.title, guid: this.tabInfoPerson.guid, customersId: this.tabInfoPerson.customersId}})
          }
          if (this.$store.state.tabInfo.tabInfoPerson.phoneNumber && data.title === 'phoneNumber') {
            this.$router.push({name: 'EditPerson', query: {headTitle: data.title, guid: this.tabInfoPerson.guid, customersId: this.tabInfoPerson.customersId}})
          }
          break
        // case 'game':
        //   this.$router.push({name: 'GameDot'})
        //   break
        // case 'gameCoin':
        //   this.$router.push({name: 'GameCoin'})
        //   break
        // case 'lottery':
        //   this.$router.push({name: 'Lottery'})
        //   break
        // case 'integral':
        //   this.$router.push({name: 'Integral'})
        //   break
        // case 'card':
        //   this.$router.push({name: 'VipCard'})
        //   break
      }
    },
    edit (data) {
      if (this.$store.state.tabInfo.tabInfoPerson.customersId && this.$store.state.tabInfo.tabInfoPerson.customersEmailAddress) {
        this.$router.push({name: 'EditPerson', query: {headTitle: data.title, guid: this.tabInfoPerson.guid, customersId: this.tabInfoPerson.customersId}})
      }
    },
    getMemberDraw () {
      let cardNo = this.$store.state.cardNo
      this.$loading.loading('加载中')
      this.$axios({
        url: APIS.memberDraw,
        method: 'get',
        params: {object: 'member', objectId: cardNo},
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      .then(res => {
        this.$loading.hideLoading()
        switch (res.data.status) {
          case 200:
            this.memberDraw = res.data.data
            break
          case 500:
            this.$loading.toast(`${res.data.error}`)
            break
        }
      })
    },
    onItemClick (index) {
      this.activeIndex = index
      switch (index) {
        case 0:
          let cardNo = this.$store.state.cardNo
          this.$store.dispatch('tabInfo/createdData', cardNo)
          break
        case 1:
          if (this.memberDraw.length === 0) {
            this.getMemberDraw()
          }
          break
        // case 2:
        //   this.currentTab = 'TabReach'
        //   break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.member-info {
  font-size: 0.75rem;
  .main {
    width: 100%;
    .draw {
      width: 100%;
      padding: 1.6rem 1rem;
      background: #448aff;
      color: #fff;
      .draw-content {
        .draw-content-left {
          .nick{
            margin-bottom: 0.9rem;
            img{
              display: block;
              width: 1rem;
              height: 1rem;
              margin-left: 0.4rem;
            }
            p {
              font-size: 0.85rem;
            }
          }
          .head-img-wrapper{
            width: 3rem;
            height: 3rem;
            margin-right: 0.9rem;
            img {
              display: block;
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
            }
          }
          span {
            font-size: 0.6rem;
            color: #ffffff;
            opacity: 0.7;
            margin-top: 0.225rem;
          }
        }
        .draw-content-right {
          p {
            text-align: center;
          }
        }
      }
    }
    .tab-menu-content {
      margin-top: 0.75rem;
    }
  }
}
</style>
<style lang="less">
.member-info {
  .vux-x-icon {
    fill: #fff;
  }
  .weui-progress__inner-bar {
    background-color: #46dab9;
    border-radius: 2.5rem;
  }
  .weui-progress__bar {
    background-color: #EBEBEB;
    height: 0.2rem;
    border-radius: 2.5rem;
    background: #2373F6;
  }
  .weui-progress {
    overflow: hidden;
  }
  .vux-tab .vux-tab-item{
    font-size: 0.75rem;
  }
}
</style>
