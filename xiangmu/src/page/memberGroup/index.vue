<template>
<div class="co-f1 co-flex co-ver co-cl-1" id="member-group-index">
  <tab bar-position="bottom" :animate="false" v-model="tabIndex">
    <tab-item :selected="tabIndex === 0">系统推荐人群</tab-item>
    <tab-item :selected="tabIndex === 1">自定义人群</tab-item>
  </tab>
  <!--  系统推荐人群  -->
  <div class="group-category wrapper co-f1 co-of" ref="sysGroup" v-show="tabIndex==0" :style="{'height': sysGroupHei}">
      <div style="padding-bottom: 0.75rem;">
      <div class="category-box">
        <div class="listone">
          <p class="tit">高价值人群</p>
          <p class="desc">客单价>2倍人均客单价，且最近180天内有购买或到店</p>
        </div>
        <div class="listone">
          <p class="tit">高价值人群</p>
          <p class="desc">客单价>2倍人均客单价，且最近180天内有购买或到店</p>
        </div>
      </div>
    </div>
  </div>
  <!--  自定义人群  -->
  <div class="group-category wrapper co-f1 co-of" v-show="tabIndex==1">
    <div style="padding-top: 0.75rem;">
      <div class="defindGroup co-flex co-ac co-jsb">
        <span>自定义会员群组</span>
        <span style="color:#555" class="co-flex co-ac"><x-icon type="ios-plus-empty" size="24"></x-icon> 新建群组</span>
      </div>
      <scroll-list>
        <div>
          <div class="listone">
            <p class="tit">高价值人群</p>
            <p class="desc">客单价>2倍人均客单价，且最近180天内有购买或到店</p>
          </div>
        </div>
      </scroll-list>
    </div>

  </div>
</div>
</template>
<script>
import {Tab, TabItem, LoadMore} from 'vux'
import { getWinHei } from '@a/js/function.js'
import ScrollList from '@c/ScrollList'
import BScroll from 'better-scroll'
// import {APIS} from '@a/js/config.js'
export default {
  components: {
    Tab,
    TabItem,
    ScrollList,
    LoadMore
  },
  data () {
    return {
      tabIndex: 1,
      sysGroupHei: '',
      loading: {
        status: true,
        tip: '正在加载'
      }
    }
  },
  mounted () {
    this.sysGroupHei = getWinHei(1.85)
    this.$nextTick(() => {
      this.minH = this.$refs.sysGroup.offsetHeight + 1
      this.scroll = new BScroll(this.$refs.sysGroup, {
        click: true,
        scrollbar: true
      })
      this.scroll.refresh()
    })
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
#member-group-index{
  background-color: #f0f0f5;
}
.category-box{
  padding-top: 0.75rem;
  .listone:first-child{
    border-top:none;
  }
}
.listone{
  background-color: #fff;
  padding: 0.75rem;
  border-top: 1px solid #e6e6e6; 
  
  .tit{
    font-size: 0.75rem;
    font-weight: 700;
    color: #222;
  }
  .desc{
    padding-top:0.3rem; 
    font-size: 0.65rem;
    color: #888;
  }
}
.defindGroup{
  background-color: #fff;
  height: 2.25rem;
  padding: 0 0.75rem;
  font-size: 0.75rem;
}
</style>
<style>
#member-group-index .vux-x-icon {
  fill: #555;
}
</style>

