<template>
  <div class="game-dot-wrapper">
    <scroll-list>
      <header-com isBack :title="HeadTitle"></header-com>
      <div class="game-dot-content">
        <unusable></unusable>
      </div>
    </scroll-list> 
  </div>
</template>

<script>
import ScrollList from '@c/ScrollList'
import HeaderCom from '@c/HeaderCom'
import Unusable from '../../components/Unusable'
export default {
  name: 'Integral',
  components: {
    ScrollList,
    HeaderCom,
    Unusable
  },
  data () {
    return {
      HeadTitle: '积分'
    }
  }
}
</script>

