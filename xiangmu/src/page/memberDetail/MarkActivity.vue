<template>
  <div class="MarkActivity">
    <scroll-list>
      <div class="activity-content">
        <div class="store">
          <group>
            <popup-picker 
            :title="storeTitle"
             v-model="formatDemoValue"
              :data="years1" 
              :display-format="format"
              @on-hide='hide'
              ></popup-picker>
          </group>
        </div>
        <div class="mark" v-if="markList.length>0">
          <group>
            <cell :title="item.name" :inline-desc='item.create_time' is-link v-for="(item,index) in markList" :key="index" @click.native="skipDetail(item)">
              <img slot="icon" width="55" height="55" style="display:block;margin-right:0.5rem;" :src="item.logo">
            </cell>
          </group>
        </div>
        <div class='notData' v-else>暂无数据</div>
      </div>
    </scroll-list>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Cell, Group, PopupPicker } from 'vux'
import ScrollList from '@c/ScrollList'
import HeaderCom from '@c/HeaderCom'
let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i,
    value: i + ''
  })
}
export default {
  name: 'MarkActivity',
  components: {
    ScrollList,
    HeaderCom,
    Cell,
    Group,
    PopupPicker
  },
  data () {
    return {
      years1: [years, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
      formatDemoValue: [],
      storeTitle: '',
      format: function (value, name) {
        return `${value[0]}-${value[1]}`
      }
    }
  },
  methods: {
    skipDetail (item) {
      this.$router.push({name: 'ActivityDetail', query: {type: item.activity_type, id: item.guid}})
    },
    hide (val) {
      if (val) {
        this.$store.dispatch('activity/getData', this.formatDemoValue)
        this.$store.dispatch('setTime', this.formatDemoValue)
      }
    },
    ...mapActions('activity', [
      'getData'
    ])
  },
  computed: {
    ...mapState({
      markList: state => state.activity.markList
    })
  },
  created () {
    this.storeTitle = this.$store.state.tabInfo.tabInfoPerson.shopName
    if (this.$store.state.activityTime.length > 0) {
      this.formatDemoValue = this.$store.state.activityTime
    } else {
      var year = new Date().getFullYear()
      var month = new Date().getMonth() + 1
      this.formatDemoValue[0] = String(year)
      this.formatDemoValue[1] = String(month)
    }
    this.$store.dispatch('activity/getData', this.formatDemoValue)
  }
}
</script>

<style lang="less" scoped>
  .MarkActivity{
    .activity-content{
      .mark{
        margin-top: 0.75rem;
      }
      .notData{
        text-align: center;
        padding-top: 50%;
      }
    }
  }
</style>

<style lang="less">
  .MarkActivity{
    .weui-cells {
      margin-top: 0;
    }
    .weui-cell {
      padding: 0.75rem;
    }
    .weui-label{
      font-size: 0.65rem;
    }
    .vux-cell-value{
      color: #000 !important;
    }
    .store{
      a{
        text-decoration:none
      }
      span{
        margin-right: 0.25rem;
        font-size: 0.65rem;
      }
      p{
        font-size: 0.65rem;
      }
      .weui-cell_access .weui-cell__ft:after {
        border-width: 0 1px 1px 0;
        border-color: #000;
        margin-top: -0.25rem;
      }
    }
    .mark{
      .weui-cell:before {
        border-top: 0;
      }
      .weui-cell_access {
        border-bottom: 1px solid #f0f0f0;
      }
      .vux-cell-primary {
        p{
          font-size: 0.75rem;
          font-weight: bold;
          margin-bottom: 0.35rem;
        }
      }
      .vux-label-desc{
        font-size: 0.7rem;
        color: #888;
      }
    }
  }
</style>
