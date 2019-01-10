<template>
  <div class="member-management">
    <div class="member-content">
      <div class="search">
        <div class="input-wrapper co-flex co-ac">
          <span @click="searchCardNo"><x-icon type="ios-search" size="20" style="verticalAlign:center"></x-icon></span>
          <input type="text" placeholder="请输入会员卡号"  v-model="searchValue" ref="search" @focus="search" @keyup.enter='searchCardNo'>
        </div>
      </div>
      <div class="member-wrapper co-flex co-wp">
        <div class="content" v-for="(member, index) in memberList" :key="index" @click="skipPage(index)">
          <div class="member-img co-flex co-jc co-ac">
            <img :src="member.img_url" alt="">
          </div>
          <p class="member-text">
            {{ member.member_text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderCom from '@c/HeaderCom'
// import myCookie from '@a/js/cookie.js'
import { APIS } from '@a/js/config.js'
export default {
  name: 'memberManagement',
  components: {
    HeaderCom
  },
  data () {
    return {
      searchValue: '',
      title: '会员管理',
      memberList: [
        {img_url: require('@a/images/index/list.png'), member_text: '会员列表'},
        {img_url: require('@a/images/index/group.png'), member_text: '会员群组'},
        // {img_url: require('@a/images/index/dynamic.png'), member_text: '会员动态'},
        // {img_url: require('@a/images/index/draw.png'), member_text: '群体画像'},
        {img_url: require('@a/images/index/label.png'), member_text: '会员标签'}
        // {img_url: require('@a/images/index/set.png'), member_text: '会员卡设置'}
      ]
    }
  },
  created () {
    // this.$axios.defaults.headers.common['token'] = myCookie.get('access_token')
    // this.$axios.defaults.headers.common['token'] = '055ed578-24f2-4a98-9d40-90dea0e44873'
    this.$store.dispatch('tabInfo/del_TabInfoPerson')
    this.$store.dispatch('delTime')
  },
  methods: {
    skipPage (index) {
      switch (index) {
        case 0:
          this.$router.push({name: 'memberList'})
          break
        case 1:
          this.$router.push({name: 'memberGroup'})
          break
        case 2:
          this.$router.push({name: 'VipTag'})
          break
        case 3:
          break
        case 4:
          break
        case 5:
          break
      }
    },
    search () {
      this.$refs.search.style.textAlign = 'left'
    },
    searchCardNo () {
      this.$refs.search.blur()
      this.$axios({
        method: 'get',
        url: APIS.memberCard,
        params: {cardNo: this.searchValue},
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            this.$store.dispatch('setCardNo', this.searchValue)
            this.$router.push({name: 'VipInfo', query: {cardNo: this.searchValue}})
            break
          case 400:
            this.$loading.toast(`${res.data.error}`)
            break
          case 403:
            this.$vux.toast.show({
              type: 'text',
              text: `${res.data.error}`,
              width: '10rem'
            })
            break
          case 500:
            this.$loading.toast(`${res.data.error}`)
            break
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.member-management {
  display: block;
  width: 100%;
  height: 100%;
  background: #fff;
  .member-content{
    height: 100%;
    .search{
      margin: 0.45rem 0.75rem;
    }
  }
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
  .member-wrapper{
    padding-top: 0.5rem;
    .content {
      min-width: 33.3%;
      height: 4.5rem;
         .member-img {
          height: 3rem;
          line-height: 3rem;
         }
          img {
            display: block;
            width: 1.5rem;
            height: 1.5rem;
            background-repeat: no-repeat;
            background-size: cover;
          }    
        .member-text {
          height: 1.2rem;
          line-height: 1rem;
          font-size: 0.6rem;
          color: #888888;
          text-align: center;
        }
      }

  }
}
</style>

<style lang="less">
.member-management{
  .vux-x-icon {
    fill: #d2d1d1;
    margin-top: 0.2rem;
  }
}
</style>
