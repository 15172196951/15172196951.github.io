<template>
  <div class="common-wrapper">
    <div class="current-show">
      <div class="content" v-if="this.otherMsg">
        <p class="num">{{otherMsg.num}}</p>
        <p class="name">{{otherMsg.title}}</p>
      </div>
    </div>
    <div class="time-wrapper co-flex co-je co-ac">
      <div><img src="https://via.placeholder.com/24X24" alt=""></div>
      <div class="time-show">
        <popover placement="bottom" style="right:0">
          <div slot="content" class="popover-demo-content">
            <ul>
              <li v-for="(item,index) in timeList" :key="index" @click="selectIndex(index)" class="co-flex co-jc"><span>{{item}}</span></li>
            </ul>
          </div>
          <button class="btn btn-default">{{timeSelect}}</button>
        </popover>
      </div>
    </div>
    <ul v-if="Datas">
      <li class="co-flex co-ac co-jsb" v-for="(item,index) in Datas" :key='index'>
        <div>
          <p class="desc">{{item.operType}}</p>
          <span>{{item.dateline}}</span>
        </div>
        <div>
          <p class="right" :class="item.lotteryNum>0?'colorShow':''">{{item.lotteryNum>0?'+':''}}{{item.lotteryNum}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Popover } from 'vux'
export default {
  props: {
    Datas: {
      type: Array,
      default: () => {
        return []
      }
    },
    otherMsg: {
      type: Object,
      default: {}
    }
  },
  components: {
    Popover
  },
  data () {
    return {
      timeSelect: '一个月',
      timeList: ['一个月', '三个月', '六个月'],
      ajaxIndex: 1
    }
  },
  methods: {
    selectIndex (index) {
      switch (index) {
        case 0:
          this.timeSelect = '一个月'
          this.ajaxIndex = 1
          break
        case 1:
          this.timeSelect = '三个月'
          this.ajaxIndex = 3
          break
        case 2:
          this.timeSelect = '六个月'
          this.ajaxIndex = 6
          break
      }
      this.$emit('timeFu', this.ajaxIndex)
    }
  }
}
</script>

<style lang="less" scoped>
  .common-wrapper{
    font-size: 0.7rem;
    .current-show{
      position: relative;
      height: 5rem;
      background: #818A94;
      .content{
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #FFFFFF;
        .num{
          font-size: 1.35rem;
        }
        .name{
          opacity: 0.6;
          filter:alpha(opacity=60);
          font-size: 0.75rem;
        }
      }
    }
    .time-wrapper{
      height: 2rem;
      line-height: 2rem;
      text-align: right;
      padding: 0 0.75rem;
      img{
        width: 1.2rem;
        height: 1.2rem;
        vertical-align: middle;
        margin-right: 0.5rem;
      }
      .time-show{
        button{
          border: 0;
          background: transparent;
          outline: none;
        }
      }
    }
    ul{
      background: #fff;
      li{
        padding: 0.6rem 0.75rem;
        border-bottom: 1px solid #f0f0f0;
        .desc{
          margin-bottom: 0.4rem;
        }
        span{
          color: #888888;
          font-size: 0.65rem;
        }
        .right{
          font-size: 0.9rem;
        }
        .colorShow{
          color: #F98125;
        }
      }
    }
  }
</style>

<style lang="less">
  .vux-popover{
    top: 9.3rem !important;
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
