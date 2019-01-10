<template>
  <div class="game-dot-wrapper">
    <scroll-list>
      <header-com isBack :title="HeadTitle"></header-com>
      <div class="game-dot-content">
        <unusable :Datas="lotteryList" :otherMsg='total' @timeFu='timeSelected'></unusable>
      </div>
    </scroll-list> 
  </div>
</template>

<script>
import ScrollList from '@c/ScrollList'
import HeaderCom from '@c/HeaderCom'
import { APIS } from '@a/js/config.js'
import Unusable from '../../components/Unusable'
export default {
  name: 'Lottery',
  components: {
    ScrollList,
    HeaderCom,
    Unusable
  },
  data () {
    return {
      HeadTitle: '彩票',
      lotteryList: [],
      total: {num: 0, title: '当前彩票'},
      month: 1
    }
  },
  methods: {
    timeSelected (data) {
      this.month = data
      this.ajaxData()
    },
    ajaxData () {
      this.$axios({
        method: 'get',
        url: APIS.Lottery,
        params: {cardNo: 'NY00666666', pageIndex: 1, pageSize: 5},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(res => {
        console.log(res.data)
        this.lotteryList = res.data.result.data.list
        this.total.num = res.data.result.data.total
      })
    }
  },
  created () {
    this.ajaxData()
  }
}
</script>

