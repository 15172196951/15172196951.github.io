<template>
  <div class="silver-card-wrpper">
    <scroll-list>
      <div class="silver-card-content">
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <div class="store">
              <h5>银票卡-{{item.shopName}}</h5>
              <p>{{item.cash}}</p>
            </div>
            <div class="cardNum co-flex">
              <button><p class="cardNo">卡号</p></button><span>{{item.cardNo}}</span>
            </div>
          </li>
        </ul>
      </div>
    </scroll-list>
  </div>
</template>

<script>
import ScrollList from '@c/ScrollList'
import { APIS } from '@a/js/config.js'
export default {
  name: 'SilverCard',
  components: {
    ScrollList
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.$axios({
      url: APIS.SilverCard,
      method: 'get',
      params: {cardNo: this.$store.state.tabInfo.tabInfoCard.cardNo},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(res => {
      if (res.data.data.length > 0) {
        this.list = res.data.data
      } else {
        this.$vux.toast.show({
          type: 'text',
          text: '暂无数据'
        })
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .silver-card-wrpper{
    .silver-card-content{
      border-top: 1px solid #E2E5EB;
      ul{
        li{
          background: #fff;
          margin-bottom: 0.75rem;
          .store{
            padding: 0.75rem 0 0.475rem 1.25rem;
            h5{
              font-size: 0.85rem;
            }
            p{
              color: #259BEC;
              font-size: 1.05rem;
              margin-top: 0.825rem;
            }
          }
          .cardNum{
            border-top: 1px solid #f0f0f0;
            padding: 0.4rem 0 0.35rem 1.25rem;
            button{
              margin-right: 0.475rem;
              transform: skewX(-15deg);
              border: 0;
              border-radius: 2px;
              background: #C2C3DC;
              .cardNo{
                font-size: 0.55rem;
                transform: skewX(15deg);
                width: 1.6rem;
                height: 0.75rem;
                line-height: 0.75rem;
                color: #fff;
              }
            }
            span{
              color: #999999;
            }
          }
        }
      }
    }
  }
</style>
