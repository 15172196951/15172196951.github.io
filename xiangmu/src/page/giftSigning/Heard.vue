<template>
    <div class="heard">
        <x-header :left-options="{backText: ''}">{{msg}}</x-header>
    </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
  name: 'Head',
  components: {
    XHeader
  },
  props: ['msg'],
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>
.heard {
  z-index: 2;
  display: block;
  width: 100%;
  .vux-header {
    background-color: #fff;
    // border-bottom: 0.5rem solid #d2d2d2;
  }
}
</style>
<style lang="less">
.vux-header-title {
  color: black !important;
  height: 3.2rem !important;
  line-height: 3.2rem !important;
  font-size: 0.9rem !important;
}
.vux-header .vux-header-left .left-arrow:before {
  border-color: #259bec !important;
  border-width: 0.1rem 0 0 0.1rem !important;
  width: 0.6rem !important;
  height: 0.6rem !important;
  top: 0.7rem !important;
  left: 1.08rem !important;
}
</style>
