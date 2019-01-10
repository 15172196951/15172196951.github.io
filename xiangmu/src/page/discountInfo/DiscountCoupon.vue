<template>
    <div class="discount-coupon co-f1 co-flex co-ver">
        <header-com isBack :title="title"></header-com>
        <div class="head co-bg-0 co-flex co-ac co-jsb">
            <span>共有18张优惠券</span>
            <span style="color: #259BEC;">使用记录</span>
        </div>
        <div class="main">
            <p>最近三个月的数据</p>
            <div class="content">
                <div class="content_nav co-flex  co-jsb" v-for="(item ,index) in list" :key="index">
                    <div class="left">
                        <div class="name">{{item.name}}</div>
                        <div class="info">
                            <div class="data">{{item.time}}</div>
                            <div class="case">满{{item.full}}使用</div>
                        </div>
                    </div>
                    <div class="right" :class="{'active':item.status}">
                        <div class="status">{{['未使用','已使用'][item.status]}}</div> 
                        <div class="dis co-flex co-jc"><div class="num">{{item.status?100:item.disRate}}</div><div class="fol">{{item.status?'元':'折'}}</div></div> 
                    </div>    
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import HeaderCom from '@c/HeaderCom'
export default {
  name: 'DiscountCoupon',
  components: {HeaderCom},
  data () {
    return {
      title: '优惠券',
      list: [{
        name: '优惠券名称',
        time: '2018.10.12-2018.12.30',
        full: 88,
        status: 0,
        disRate: 9
      }, {
        name: '优惠券名称',
        time: '2018.10.12-2018.12.30',
        full: 88,
        status: 1,
        disRate: 9
      }, {
        name: '优惠券名称',
        time: '2018.10.12-2018.12.30',
        full: 88,
        status: 0,
        disRate: 9
      }, {
        name: '优惠券名称',
        time: '2018.10.12-2018.12.30',
        full: 88,
        status: 1,
        disRate: 9
      }, {
        name: '优惠券名称',
        time: '2018.10.12-2018.12.30',
        full: 88,
        status: 0,
        disRate: 9
      }]
    }
  }
}
</script>
<style lang="less" scoped>
    .head{
        height: 2.25rem;
        padding: 0 0.9rem 0 0.75rem;
        font-size: 0.75rem;
        border-top: 0.05rem solid #E6E6E6; 
        color: #555555;
    }
    .main{
        padding: 0 0.5rem 0 0.5rem;
        p{
            padding: 0.45rem 0 0.3rem 0;
            font-size: 0.7rem;
            color: #888888;
        }
        .content{
            .content_nav{
                margin-bottom: 0.5rem;
                .left{
                    width: 71.83%;
                    height: 5rem;
                    background-image: url('../../assets/images/rt_bg.png');
                    background-repeat: no-repeat;
                    background-position: left top;
                    background-size: cover;
                    padding: 0.75rem 0.75rem 0.625rem 0.75rem;
                    .name{
                        font-size: 0.8rem;
                        line-height: 1.125rem;
                        color: #222222;
                    }
                    .info{
                        margin-top: 0.4rem;
                        height: 2.1rem;
                        color: #888888;
                        font-size: 0.7rem;
                        >div{
                            line-height: 1.1rem
                        }
                    
                    }
                }
                .right{
                    width: 28.17%;
                    height: 5rem;
                    background-image: url('../../assets/images/lt_bg2.png');
                    background-repeat: no-repeat;
                    background-position: left top;
                    background-size: cover;
                    color: #ffffff;
                    padding: 0.8rem 0 1.05rem 0;
                    text-align: center;
                    .status{
                        line-height: 1.05rem;
                        font-size: 0.75rem;
                    }
                    .dis{  
                        margin-top: 0.225rem;
                        line-height: 1.875rem;
                        .num{
                            font-size: 1.35rem;
                            line-height: 1.875rem;
                        }
                        .fol{
                            padding-top: 0.66rem; 
                            font-size: 0.7rem;
                            margin-left: 0.225rem;
                            line-height: 1rem;
                            
                        }
                    }
                }
                .active{
                  background-image: url('../../assets/images/lt_bg1.png');  
                }
            }
        }
    }
</style>



