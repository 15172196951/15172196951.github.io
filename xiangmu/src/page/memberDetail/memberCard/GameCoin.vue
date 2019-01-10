<template>
  <div class="game-coin-wrapper">
    <scroll-list>
      <header-com isBack :title="HeadTitle"></header-com>
      <div class="game-dot-content">
        <unusable :Datas="GameCoinList" :otherMsg='total' @timeFu='timeSelected'></unusable>
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
  name: 'GameCoin',
  components: {
    ScrollList,
    HeaderCom,
    Unusable
  },
  data () {
    return {
      HeadTitle: '游戏币',
      total: {num: 0, title: '当前游戏币'},
      GameCoinList: [],
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
        url: APIS.gameCoin,
        params: {cardNo: 'NY00666666', pageIndex: 1, pageSize: 5, month: this.month},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(res => {
        console.log(res)
        this.GameCoinList = res.data.result.data.list
        this.total.num = res.data.result.data.total
      })
    }
  },
  created () {
    this.ajaxData()
  }
}
</script>

<style>

</style>
