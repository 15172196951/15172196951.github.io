<template>
    <div class="activity-detail co-flex co-ver co-ac co-jc">
      <scroll-list isRequest ref = "scroll" :page-size = "pageSize"  pull-up-load @show-data = "showData">
        <div class="detail-content">
          <p class="prize">已获奖励</p>
          <div class="activity-show" v-for="(item,index) in activityList" :key="index">
            <div class="rule co-flex co-ac">
              <div>
                <img :src="item.prize_img" alt="">
              </div>
              <div>
                <h5>{{item.item_name}}</h5>
                <p>使用规则 : 满{{item.deductible}}元可用,</p>
                <p v-if="item.end_time">有效期至 : {{item.end_time}} </p>
                <p v-else>有效期 : {{item.valid_day}} 天</p>
              </div>
            </div>
            <div class="state" v-if="item.status === 4">
              <p>领取成功，已使用</p>
            </div>
            <div class="state" v-if="item.status === 2">
              <p>领取成功，未使用</p>
            </div>
            <div class="state" v-if="item.status === 1">
              <p>已抽中</p>
            </div>
            <div class="state" v-if="item.status === 0">
              <p>未抽中</p>
            </div>
            <div v-if="item.status === 3">
              <div class="stateFalse co-flex co-jsb co-ac">
                <p style="color: #F13A36">领取失败</p>
                <button @click="again(index, item.guid)">再发一张</button>
              </div>
            </div>
          </div>
        </div>
      </scroll-list>
    </div>
</template>

<script>
import ScrollList from '@c/ScrollList'
import { APIS } from '@a/js/config.js'
export default {
  name: 'ActivityDetail',
  components: {
    ScrollList
  },
  data () {
    return {
      title: '活动详情',
      activityList: [],
      showType: null,
      pageSize: 10,
      pageIndex: 1
    }
  },
  methods: {
    showData (obj) {
      if (obj.type === 0) {
        this.pageIndex = 1
      } else {
        this.pageIndex ++
      }
      this.$axios({
        method: 'get',
        url: APIS.desc,
        params: {activity_guid: this.$route.query.id, activity_type: this.$route.query.type, customer_id: localStorage.getItem('customersId'), pageIndex: this.pageIndex, pageSize: this.pageSize},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(res => {
        let result = res.data.pagedData
        if (obj.type === 0) {
          this.activityList = result
        } else if (this.pageIndex <= res.data.pageIndex) {
          this.activityList = this.activityList.concat(result)
        }
        obj.cb(result.length, this.pageIndex, res.data.pageIndex)
      })
      // this.$store.dispatch('activity/getDetailList', {type: this.$route.query.type, id: this.$route.query.id})
    },
    again (index, id) {
      var sign = localStorage.getItem('partnerSign')
      var data = {activity_type: this.$route.query.type, partner_sign: sign, prize_customer_guid: id}
      this.$axios({
        method: 'post',
        url: APIS.again,
        data: data,
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        if (res.status === 200) {
          this.$set(this.activityList[index], 'status', 2)
        } else {
          this.$loading.toast('领取失败！')
        }
      })
    }
  },
  created () {
    let _self = this
    this.showData({
      type: 0,
      cb (len) {
        _self.$refs.scroll.upShow(len)
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .activity-detail{
    font-size: 0.7rem;
    width: 100%;
    .wrapper{
      width:100%;
    }
    .detail-content{
      .prize{
        background: #FFF8EE;
        color: #F98125;
        text-align: center;
        height: 1.75rem;
        line-height: 1.75rem;
        border-top: 1px solid #f0f0f0;
        font-size: 0.75rem;
      }
      .activity-show{
        background: #fff;
        margin-top: 0.75rem;
        .rule{
          border-bottom: 1px solid #f0f0f0;
          padding: 1.125rem 1rem;
          img{
            width: 3.25rem;
            height: 3.25rem;
            margin-right: 1.2rem;
          }
          h5{
            margin-bottom: 0.375rem;
            font-size: 0.8rem;
          }
        }
        .state{
          padding: 0.5rem 1rem;
        }
        .stateFalse{
          padding: 0.325rem 1rem;
          button{
            width: 4.5rem;
            height: 1.35rem;
            border-radius: 0.75rem;
            border: 0;
            border: 1px solid #259BEC;
            background: #fff;
            color: #259BEC;
            outline: 0;
          }
        }
      }
    }
  }
</style>
