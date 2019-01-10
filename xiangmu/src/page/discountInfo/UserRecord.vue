<template>
    <div class="user-record co-f1 co-flex co-ver">
       <header-com isBack :title="title"></header-com>
       <div class="head">
           <span><img src="../../assets/images/dat.png" ></span>
           <div class="head_dat">
              <popover placement="bottom" @on-show="onShow" @on-hide="onHide">
                    <div slot="content" class="popover-demo-content">
                       <ul>
                           <li><span>三个月</span></li>
                           <li><span>六个月</span></li>
                           <li><span>九个月</span></li>
                       </ul>
                    </div>
                    <span>一个月</span>
                </popover>  
           </div>
         
       </div>
       <div class="content">
           <ul>
               <li v-for="(item,index) in data" :key="index">
                   <div class="name">优惠券名称</div>
                   <div class="time"><span>{{item.year}}</span><span>{{item.time}}</span></div>
                   <div class="price"><span>$</span><span>22</span></div>
               </li>
           </ul>
       </div>
    </div>    
</template>
<script>
import HeaderCom from '@c/HeaderCom'
import { Popover } from 'vux'
export default {
  name: 'UserRecord',
  components: {HeaderCom, Popover},
  data () {
    return {
      title: '使用记录',
      data: [{
        year: '2017.10.25',
        time: '11:25:43'
      }, {
        year: '2017.10.25',
        time: '11:25:43'
      }, {
        year: '2017.10.25',
        time: '11:25:43'
      }, {
        year: '2017.10.25',
        time: '11:25:43'
      }]
    }
  },
  methods: {
    onShow () {

    },
    onHide () {

    }
  }
}
</script>
<style lang="less" scoped>
   .head{
      height: 2rem;
      line-height: 2rem;
      text-align: right;
      padding: 0 0.75rem;
      position: relative;
      >span{
          display: inline-block;
          height: 2rem;
          font-size: 0.7rem;
          color: #222222;
          img{
              width: 1.2rem;
              height: 1.2rem;
              vertical-align: middle;
              margin-right: 2.6rem;
          }
      }
      .head_dat{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0.75rem;
          height: 2rem;
          >div{
              width: 100%;
              height: 100%;
              >span{
                  display: block;
                  width: 100%;
                  height: 100%;
                  >span{
                    display: block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height:  2rem; 
                    font-size: 0.7rem;
                    color: #222; 
                  }
              }

          }
      }
   } 
   .content{
        ul{
            li {
               padding: 0.6rem 0.75rem;
               height: 3.25rem;
               background-color: #ffffff;
               border-bottom: 0.05rem solid #f0f0f5;
               position: relative;
               .name{
                    font-size: 0.7rem;
                    color: #222222;
                    line-height: 0.85rem; 
               }
               .time{
                   color: #888888;
                   line-height: 0.8rem;
                   font-size: 0.65rem;
                   margin-top: 0.4rem;
                   >span:nth-of-type(1)
                   {
                       margin-right: 1rem;
                   }
               }
               .price{
                   position:absolute;
                   top: 50%;
                   transform: translateY(-50%);
                   right: 0.75rem;
                   font-size: 0.9rem;
                   color: #F98125;
                   >span:nth-of-type(1){
                       margin-right: 0.3rem;
                   }
               }
            } 
            >li:last-child{
                border-bottom: none;
            }  
        }
   }

</style>
<style lang="less">
 .vux-popover{
    top: 4.2rem !important;
    left: 68% !important;
    right: 5% !important;
    background-color: #fff !important;
    color: #000 !important;
  }
  .vux-popover-arrow-up {
    left: 78% !important;
    border-bottom: 5px solid #fff !important;
  }
  .popover-demo-content{
    ul{
      li{
        span{
          border-bottom: 1px solid #f0f0f0;
          height: 2rem;
          line-height: 2rem;
          padding: 0 1rem;
          display: inline-block;
        }
      }
    }
  }
</style>

</style>




