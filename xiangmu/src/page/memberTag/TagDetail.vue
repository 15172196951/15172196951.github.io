<template>
    <div class="tag-detail">
        <div class="main">
            <div class="content-top">
                <div class="ageTag">
                    <div class="title co-flex co-ac co-jsb">
                        <span>{{detailList.name}}</span>
                        <div @click="skipRule">
                          <img src="../../assets/images/edit.png" alt="">
                        </div>
                    </div>
                    <div class="desc">
                        <p class="first" v-if="detailList.description">{{detailList.description}}</p>
                        <p class="rule">
                          <span v-if="detailList.gender!=='0'&&detailList.gender">性别 :{{['选择','男','女','未知'][detailList.gender]}};</span>
                          <span v-if="detailList.startBirthYear&&detailList.endBirthYear">出生年份 : {{detailList.startBirthYear?detailList.startBirthYear:''}}{{detailList.startBirthYear?'年至':''}}{{detailList.endBirthYear?detailList.endBirthYear:''}}{{detailList.endBirthYear?'年':''}};</span>
                          <span v-if="detailList.birthMonth">出生月份 : {{['选择','一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'][detailList.birthMonth]}};</span>
                          <span v-if="detailList.phone">手机号 : {{['选择','有手机号','无手机号码'][detailList.phone]}};</span>
                          <span v-if="detailList.startLevel&&detailList.endLevel">等级 : {{detailList.startLevel}}-{{detailList.endLevel}};</span>
                          <span v-if="detailList.startRegisterDate&&detailList.endRegisterDate">入会时间 : {{detailList.startRegisterDate}}至{{detailList.endRegisterDate}};</span>
                          <span v-if="detailList.memberCardType">会员卡 : {{['选择','仅微信会员卡','仅实体会员卡','已绑卡'][detailList.memberCardType]}};</span>
                          <span v-if="detailList.consumePeriod">最近消费 : {{consumePeriodFilter(detailList.consumePeriod)}};</span>
                          <span v-if="detailList.timesSign==='1'">消费次数: {{detailList.startConsumeTimes}}-{{detailList.endConsumeTimes}};</span>
                          <span v-if="detailList.timesSign==='2'">消费次数等于 : {{detailList.consumeTimes}};</span>
                          <span v-if="detailList.timesSign==='3'">消费次数小于等于: {{detailList.endConsumeTimes}};</span>
                          <span v-if="detailList.timesSign==='4'">消费次数大于等于 : {{detailList.startConsumeTimes}};</span>
                          <span v-if="detailList.sumSign==='1'">消费金额等于 : {{detailList.startConsumeSum}}-{{detailList.endConsumeSum}}</span>
                          <span v-if="detailList.sumSign==='2'">消费金额等于 : {{detailList.consumeSum}}</span>
                          <span v-if="detailList.sumSign==='3'">消费金额小于等于 : {{detailList.endConsumeSum}}</span>
                          <span v-if="detailList.sumSign==='4'">消费金额大于等于 : {{detailList.startConsumeSum}}</span>
                        </p>
                    </div>
                </div>
                <div class="checkVip co-flex co-jsb co-ac">
                    <div @click="skipRule" class="co-flex co-ac">
                      <img src="../../assets/images/character.png" alt=""><inline-loading v-show="detailList.count===''"></inline-loading><span class="cell-span">{{detailList.count}}</span>
                    </div>
                    <div>
                        <!-- <span>查看会员</span> -->
                    </div>
                </div>
            </div>
            <!-- <div class="content-bottom">
                <div class="touch">
                  <p>精准营销</p>
                </div>
                <ul class="list">   
                    <li v-for="(item,index) in list" :key="index" class="co-flex">
                        <div class="slide-left">
                           <img :src='item.url' alt="">
                        </div>
                        <div class="slide-right co-flex co-ver co-jsb">
                            <h4>{{item.title}}</h4>
                            <p>{{item.desc}}</p>
                        </div>
                    </li>
                </ul>
            </div> -->
        </div>
    </div>
</template>

<script>
import { InlineLoading } from 'vux'
import EventEmitter from '@a/js/EventEmitter'
import { APIS } from '@a/js/config.js'
export default {
  name: 'TagDetail',
  components: {
    InlineLoading
  },
  data () {
    return {
      list: [
        {title: '群发微信', desc: '发送软文传递活动及品牌价值', url: require('@a/images/draw/Group6.png')},
        {title: '群发短信', desc: '发送短信传递活动及品牌价值', url: require('@a/images/draw/Group8.png')},
        {title: '群发优惠券', desc: '发券促进消费', url: require('@a/images/draw/Group4.png')}
      ],
      detailList: {
        name: '',
        count: '',
        description: ''
      }
    }
  },
  methods: {
    skipRule () {
      // this.$store.commit('SET_DOGETDETAIL', true)
      if (this.$route.query.id) {
        this.$router.push({name: 'createTag', query: {id: this.$route.query.id}})
      } else {
        this.$router.push({name: 'createTag', query: {id: this.$route.query.tagId}})
      }
    },
    consumePeriodFilter (val) {
      if (val === '-1') {
        return '超过360天'
      } else if (val === '0') {
        return '选时段'
      } else if (val === '7') {
        return '7天内'
      } else if (val === '30') {
        return '30天内'
      } else if (val === '90') {
        return '90天内'
      } else if (val === '180') {
        return '180天内'
      } else {
        return '360天内'
      }
    }
  },
  created () {
    if (!EventEmitter._events['del']) {
      EventEmitter.subscribe('del', item => {
        window.history.back()
      })
    }
    this.$loading.loading('加载中')
    if (this.$route.query.id && !this.$store.state.isTag) {
      this.$axios({
        method: 'get',
        url: APIS.searchTag,
        params: {object: 'member', tagId: this.$route.query.id},
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
      }).then(res => {
        this.$loading.hideLoading()
        if (res.data.status === 200) {
          this.detailList = {...this.detailList, ...res.data.data}
        } else {
          this.$loading.toast(`${res.data.error}`)
        }
      })
      this.$axios({
        method: 'get',
        url: APIS.tagDetail,
        params: {object: 'member', tagId: this.$route.query.id},
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      .then(res => {
        if (res.data.status === 200) {
          // this.$store.commit('SET_COUNT', res.data.data.count)
          this.detailList.count = res.data.data.count
        } else {
          this.$loading.toast(`${res.data.error}`)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tag-detail {
  width: 100%;
  font-size: 0.75rem;
  .main{
    width: 100%;
  }
  .content-top {
    width: 100%;
    background-color: #fff;
    .ageTag {
      width: 100%;
      padding: 0 1rem;
      .title {
        border-bottom: 1px solid #f0f0f0;
        padding: 0.75rem 0;
        span {
          font-weight: bold;
          font-size: 1rem;
        }
        img{
          width: 1rem;
          height: 1rem;
          vertical-align: middle;
        }
      }
      .desc {
        p {
          line-height: 1rem;
        }
        .first {
          width: 100%;
          padding-top: 0.9rem;
          word-break: break-all;
        }
        .rule {
          margin-bottom: 1.575rem;
          padding-top: 0.9rem;
        }
      }
    }
    .checkVip {
      border-top: 1px solid #f0f0f0;
      padding: 0.725rem 1rem;
      height: 2.5rem;
      span{
        margin-right: 0.4rem;
        color: #222222;
      }
      .cell-span{
        font-size: 0.9rem;
      }
      img{
        width: 0.75rem;
        height: 0.925rem;
        vertical-align: middle;
        margin-right: 0.525rem;
      }
    }
  }
  .content-bottom {
    margin-top: 0.75rem;
    background-color: #fff;
    .touch {
      height: 2.25rem;
      line-height: 2.25rem;
      padding: 0 0.75rem;
    }
    .list {
      li {
        padding: 0.85rem 1rem;
        border-top: 1px solid #f0f0f0;
        align-items: center;
        img {
          width: 2.4rem;
          height: 2.4rem;
          display: block;
        }
        .slide-right {
          margin-left: 0.75rem;
          height: 2.4rem;
          h4{
            font-size: 0.75rem;
          }
          p{
            color: #888888;
            font-size: 0.7rem;
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
  .tag-detail{
    .vux-x-icon {
      fill: #9a9a9a;
    }
  }
</style>