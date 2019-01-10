<template>
    <div class="giftSigningdetall">
        <Head msg="签赠明细"/>
        <div class="select co-flex co-ac co-of" @click="selectStores">
          <p class="text-title co-te" :class="{'isclolor':!isShow}">得拿你的卡</p>
            <x-icon class="fs-0"
                    type="ios-arrow-down" :class="{'isarrow':!isShow}"></x-icon>
            <x-icon type="ios-arrow-up" :class="{'isarrow':isShow}"></x-icon>   
        </div>
        <div class="Date">
            <div class="Date-show co-flex co-jsb" @click="DateShow">
                <span>{{value1}}</span>
                <img src="../../assets/images/date.png" alt="#">
            </div>
            <group v-show="false">
                <datetime  format="YYYY-MM" v-model="value1" :show="showDate" @on-change="DateChange" @on-cancel="DateCancel">
                </datetime>
            </group>
        </div>
        <div class="content">
            <div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div>
            <div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div><div class="top co-flex co-jsb">
                <p>
                    <img src="../../assets/images/my.png" alt="">
                    <span>张三</span>
                </p>
                <p>
                    <span>2018-11-23</span>
                    <span class="top-span">13:45</span>
                </p>
            </div>
            <div class="bottom">
                <p class="bottom-p1 co-flex co-jsb">
                    <span>WH9874734</span>
                    <span>100</span>
                </p>
                <p class="bottom-p2 co-flex co-jsb">
                    <span>客户赔币</span>
                    <span class="game">游戏币</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import Head from './heard.vue'
import { Datetime, Group } from 'vux'
export default {
  components: {
    Head,
    Datetime,
    Group
  },
  data () {
    return {
      value1: '',
      showDate: false,
      isShow: true
    }
  },
  created () {
    this.nowDate()
  },
  mounted () {
  },
  methods: {
    DateShow () {
      this.showDate = true
    },
    DateChange () {
      this.showDate = false
    },
    DateCancel () {
      this.showDate = false
    },
    nowDate () {
      let now = new Date()
      let yy = now.getFullYear() // 年
      let mm = now.getMonth() + 1 // 月
      let clock = yy + '-'
      if (mm < 10) clock += '0'
      clock += mm
      this.value1 = clock
    },
    selectStores () {
      if (this.isShow) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.giftSigningdetall {
  display: block;
  width: 100%;
  height: 100%;
  .select {
      width: 100%;
      height: 2.25rem;
      margin-bottom: 0.75rem;
      font-size: 0.7rem;
      background-color: #fff;
      padding-left: 1rem;
      line-height: 2.25rem;
      .vux-x-icon {
        fill: #222222;
        width: 0.75rem;
        height: 0.75rem;
      }
      .isarrow {
        display: none;
      }
      .vux-x-icon-ios-arrow-up {
        fill: #259bec;
      }
      .text-title {
        margin-right: 0.38rem;
        font-size: 0.7rem;
      }
      .text-title.isclolor {
        color: #259bec;
      }
    }
  .Date {
    font-size: 0.75rem;
    height: 2rem;
    line-height: 2rem;
    color: #555555;
    font-size: 0.75rem;
    .Date-show {
      padding: 0 0.75rem;
      img {
        width: 1.05rem;
        height: 0.95rem;
        margin-top: 0.53rem;
      }
    }
  }
  .content {
    padding: 0 0.75rem;
    .top {
      font-size: 0.7rem;
      height: 2rem;
      line-height: 2rem;
      color: #888888;
      img {
        width: 1rem;
        height: 1rem;
        vertical-align: top;
        margin-top: 0.5rem;
      }
      .top-span {
        margin-left: 0.13rem;
      }
    }
    .bottom {
      height: 3.4rem;
      padding: 0.55rem 0 0.5rem 0;
      .bottom-p1 {
        font-size: 0.75rem;
        color: #222222;
      }
      .bottom-p2 {
        font-size: 0.65rem;
        line-height: 1.5rem;
        color: #888888;
        .game {
          color: #333333;
        }
      }
    }
  }
}
</style>
<style lang="less">
.co-Page {
  // position:relative ;
}
.weui-cell {
  // margin-top:0.09rem;
  // background: url("../../assets/images/date.png") no-repeat 95% 50% !important;
  // background-size:0.42rem 0.38rem !important;
}
.weui-cell_access {
  padding-left: 0.75rem !important;
  color: #555555 !important;
  text-decoration: none;
  font-size: 0.75rem;
}
.weui-cell_access .weui-cell__ft:after {
  border-color: red !important;
  border-width: 0rem !important;
}
</style>





