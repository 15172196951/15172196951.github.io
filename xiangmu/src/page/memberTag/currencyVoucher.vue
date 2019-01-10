<template>
  <div class="currency-voucher">
    <header-com isBack :title="title"></header-com>
    <div class="currency-detail">
      <p class="currency-left">共有18张优惠券</p>
      <p class="currency-right">使用记录</p>
    </div>

  <div class="sub-title">最近3个月的数据</div>

    <div class="currency-list">
      <div class="list-item" v-for="(item, index) in currencyVoucherList" :key="index">
        <div class="item-content">
          <img src="@a/vux_logo.png" alt="兑币券的名称">
          <div class="content-footer">
            <p class="footer-left">{{ item.status }}</p>
            <p class="footer-right">有效期至: {{ item.validDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderCom from '@c/HeaderCom'
export default {
  components: {
    HeaderCom
  },
  data () {
    return {
      title: '兑币券',
      currencyVoucherList: [
        {img_url: '@a/vux_logo.png', status: '未使用', validDate: '2018.04.05'},
        {img_url: '@a/vux_logo.png', status: '已使用', validDate: '2018.04.05'},
        {img_url: '@a/vux_logo.png', status: '未使用', validDate: '2018.04.05'},
        {img_url: '@a/vux_logo.png', status: '已使用', validDate: '2018.04.05'},
        {img_url: '@a/vux_logo.png', status: '未使用', validDate: '2018.04.05'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.currency-voucher {
  display: block;
  overflow: auto;
  .currency-detail {
    background-color: #FFFFFF;
    width: 100%;
    height: 2.25rem;
    line-height: 2.25rem;
    font-size: 0.75rem;
    text-align: center;
    .currency-left {
      float: left;
      padding-left: 0.75rem;
      color: #555555;
    }
    .currency-right {
      float: right;
      padding-right: 0.9rem;
      color: #259BEC;
    }
  }
  .sub-title {
    padding-left: 0.5rem;
    margin-top: 0.45rem;
    margin-bottom: 0.3rem;
    font-size: 0.7rem;
    color: #888888;
  }
  .currency-list {
    padding: 0 0.5rem;
    .list-item {
      margin-bottom: 0.5rem;
      .item-content {
        width: 100%;
        img {
          display: block;
          width: 100%;
          height: 3.5rem;
          background-color: #000;
          opacity: 0.45;
          border-radius: 0.25rem;
        }
        .content-footer {
          border-radius: 0.25rem;
          background: #FFFFFF;
          height: 2rem;
          line-height: 2rem;
          font-size: 0.7rem;
          color: #888888;
          .footer-left {
            float: left;
            padding-left: 0.75rem;
          }
          .footer-right {
            float: right;
            padding-right: 0.75rem;
          }
        }
      }
    }
  }
}
</style>


