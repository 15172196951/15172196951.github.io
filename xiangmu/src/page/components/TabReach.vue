<template>
  <div class="tab-menu-reach">
    <scroll-list>
      <ul>
        <li v-for="(item,index) in list" :key='index' class="co-flex co-ac">
          <div>
            <img :src="item.url" alt="">
          </div>
          <div class="desc co-flex co-ver co-jsb">
            <h4>{{item.title}}</h4>
            <p>{{item.desc}}</p>
          </div>
        </li>
      </ul>
    </scroll-list>
  </div>
</template>

<script>
import ScrollList from '@c/ScrollList'
export default {
  name: 'TabReach',
  components: {
    ScrollList
  },
  data () {
    return {
      list: [
        {
          title: '发微信',
          desc: '发送软文传递活动及品牌价值',
          url: require('@a/images/draw/Group6.png')
        },
        {
          title: '发短信',
          desc: '发发送短信传递活动及品牌价值',
          url: require('@a/images/draw/Group8.png')
        },
        {
          title: '发优惠券',
          desc: '发券促进消费',
          url: require('@a/images/draw/Group4.png')
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .tab-menu-reach{
    font-size: 0.75rem;
    ul{
      background: #fff;
      li{
        border-bottom: 1px solid #f0f0f0;
        padding: 0.8rem 0.75rem;
        img{
          width: 2.4rem;
          height: 2.4rem;
          display: block;
          margin-right: 0.75rem;
        }
        .desc{
          height: 2.4rem;
          p{
            font-size: 0.7rem;
            color: #888;
          }
        }
      }
    }
  }
</style>

