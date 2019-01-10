<template>
  <div class="game-dot-wrapper">
    <scroll-list>
      <header-com isBack :title="HeadTitle"></header-com>
      <div class="game-dot-content">
        <unusable :Datas="gameDotList" :otherMsg='total' @timeFu='timeSelected'></unusable>
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
  name: 'GameDot',
  components: {
    ScrollList,
    HeaderCom,
    Unusable
  },
  data () {
    return {
      HeadTitle: '游戏点',
      total: {num: 0, title: '当前游戏点'},
      gameDotList: [],
      month: 1
    }
  },
  created () {
    this.$axios({
      method: 'get',
      url: APIS.gameDot,
      params: {cardNo: 'NY00666666', pageIndex: 1, pageSize: 5, month: 1},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(res => {
      this.gameDotList = res.data.result.data.list
      this.total.num = res.data.result.data.total
    })
  }
}
</script>

