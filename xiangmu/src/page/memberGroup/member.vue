<template>
<div class="co-f1 co-flex co-ver co-cl-1">
  <div class="total-count">
    群组人数：8644人
  </div>
  <div class="member-box">
  <scroll-list>
    <member-com :data="memberData"></member-com>
  </scroll-list>
  </div>
</div>  
</template>
<script>
import ScrollList from '@c/ScrollList'
import MemberCom from '@c/MemberCom'
export default {
  components: {
    ScrollList,
    MemberCom
  },
  data () {
    return {
      memberData: [{
        name: '1111'
      }]
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.total-count{
  margin-top: 0.75rem;
  padding: 0.625rem 0.75rem;
  background-color: #fff;
  font-size:0.75rem;
  color:#333;
}
.member-box{
  background-color: #fff;
}
</style>
