<template>
    <div class="vip-tag">
        <section>
          <div class="search">
            <div class="search-input co-flex co-ac">
              <input type="text" placeholder="搜索" class="co-f1" @focus="skipSearch"><x-icon type="ios-search-strong" size="20" style="position:absolute;left:0.3rem;top:0.3rem"></x-icon>
              <span @click="skipAddlist" class="add"><img src="../../assets/images/add.png" alt=""></span>
              <!-- <span @click="skipAddlist" class="add"><x-icon type="ios-plus-outline" size="27" style="verticalAlign:middle"></x-icon></span> -->
            </div>
          </div>
        </section>
        <div class="main">   
          <div class="menu">
              <div class="slide-left"  id="slide-left" :class="menuList.length>0?'':'bgc'">
                <ul id="slide-leftul">
                  <li v-for="(item,index) in menuList" :key="index" @click="select(item,index)"><p :class="{'active-li':activeMenu==index}">{{item.name}}</p></li>
                </ul>
              </div>
              <div class="slide-right">
                  <div class="right-content">
                      <div class="cell co-flex co-jsb" v-if="title" @click="skipList">
                        <span>{{title}}</span>
                        <span><x-icon type="ios-arrow-right" size="23" style="vertical-align:middle"></x-icon></span>
                      </div>
                      <menu-list :datas="childrenList" @goDetail='skipVipDetail' @addTag='skipAddTag'></menu-list>
                  </div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import { APIS } from '@a/js/config.js'
import { mapState } from 'vuex'
import MenuList from '../components/MenuList.vue'
export default {
  name: 'VipTag',
  components: {
    MenuList
  },
  data () {
    return {
      resData: {},
      title: '',
      childrenList: [],
      categoryId: '',
      menuList: []
    }
  },
  computed: {
    ...mapState({
      activeMenu: state => state.activeMenu
    })
  },
  methods: {
    init () {
      this.$loading.loading('加载中')
      this.$axios({
        method: 'get',
        url: APIS.viptagList,
        params: {object: 'member'},
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      .then(res => {
        this.$loading.hideLoading()
        switch (res.data.status) {
          case 500:
            this.$loading.toast(`${res.data.error}`)
            break
          case 403:
            this.$loading.toast(`${res.data.error}`)
            break
          case 200:
            this.menuList = res.data.data
            this.$nextTick(() => {
              if (this.$store.state.activeMenu) {
                this.getHeight(this.$store.state.activeMenu)
              }
            })
            if (this.menuList.length > 0) {
              this.menuList.forEach((item, i) => {
                if (i === this.$store.state.activeMenu) {
                  this.title = item.name
                  this.categoryId = item.categoryId
                }
              })
              this.getChildren()
            }
            break
        }
      })
    },
    skipAddlist () {
      this.$router.push({name: 'newLabel'})
    },
    skipList () {
      this.$router.push({name: 'labelset', query: {id: this.categoryId}})
    },
    skipSearch () {
      this.$router.push({name: 'SearchTag'})
    },
    skipVipDetail (id) {
      this.$router.push({name: 'TagDetail', query: {id: id}})
    },
    skipAddTag (id) {
      this.$router.push({name: 'createTag', query: {categoryId: id}})
    },
    select (item, index) {
      this.$store.dispatch('setActiveMenu', index)
      this.title = item.name
      this.categoryId = item.categoryId
      this.getChildren()
    },
    getHeight () {
      let ele = document.getElementById('slide-left')
      // var screenW = document.documentElement.clientWidth || document.body.clientWidth
      if (this.$store.state.categoryType === 0) {
        ele.scrollTop = this.$store.state.activeMenu * document.getElementById('slide-leftul').getElementsByTagName('li')[0].clientHeight
      }
      if (this.$store.state.categoryType === 1) {
        ele.scrollTop = this.$store.state.activeMenu * document.getElementById('slide-leftul').getElementsByTagName('li')[0].clientHeight
      }
    },
    getChildren () {
      this.$axios({
        method: 'get',
        url: APIS.viptagChildrenList,
        params: {object: 'member', categoryId: this.categoryId},
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
      }).then(res => {
        if (res.data.status === 200) {
          this.childrenList = res.data.data
        } else {
          this.$loading.toast(`${res.data.error}`)
        }
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
    }
  },
  mounted () {
    this.clearStorge()
    this.$store.commit('changeISTag', false)
    this.init()
  }
}
</script>

<style lang="less" scoped>
.vip-tag {
  height: 100%;
  width: 100%;
  font-size: 0.75rem;
  section {
    .search {
      width: 100%;
      padding: 0.45rem 0.75rem;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 666;
      .search-input {
        width: 100%;
        input {
          background: #F5F5F5;
          border: 0;
          border-radius: 4px;
          height: 1.6rem;
          text-indent: 1.5rem;
          outline:none;
          font-size: 0.65rem;
        }
        span {
          text-align: center;
          margin-left: 0.55rem;
          img{
            width: 1.2rem;
            height: 1.2rem;
            display: block;
          }
        }
      }
    }
  }
  .main {
    width: 100%;
    height: 100%;
    padding-top: 2.5rem;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    .menu {
      height: 100%;
      .bgc{
        background: #fff;
      }
      .slide-left {
        width: 5.05rem;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow-y: scroll;
        -webkit-overflow-scrolling : touch;
        ul {
          li {
            padding: 0.725rem 0;
            p {
              text-align: center;
              color: #555555;
            }
            .active-li {
              border-left: 4px solid #259bec;
              color: #222222;
              font-weight: 550;
            }
          }
        }
      }
      .slide-right {
        overflow-y: scroll;
        -webkit-overflow-scrolling : touch;
        position: absolute;
        top: 0;
        left: 5.05rem;
        right: 0;
        bottom: 0;
        padding: 0 1rem 0 0.2rem;
        background: #fff;
        .right-content {
          .cell {
            padding: 0.725rem 0 1.4rem 0.75rem;
            span {
              font-weight: bold;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
  .vip-tag{
    .add{
      .vux-x-icon {
        fill: #259BEC;
      }
    }
    .vux-x-icon {
      fill: #c5c0c0;
    }
  }
</style>
