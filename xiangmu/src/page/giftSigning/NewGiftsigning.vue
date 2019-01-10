<template>
    <div class="newGiftsigning">
        <Head msg="新建签赠人"/>
        <div class="Signperson co-flex co-jsb">
            <p>签赠人</p>
            <p @click="goYuangong">
                <img src="../../assets/images/rightjiantou.png" alt="">
            </p>
        </div>
        <div class="everyDay">
            <x-input
                title="每月游戏币签赠上限"
                v-model="lengthP"
                text-align="right"  
                placeholder="未输入"
                @on-change="aa"
            ></x-input>
        </div>
        <div class="btnBox">
           <button class="btn" @click="baocun">保存</button>
        </div>
    </div>
</template>
<script>
import Head from './heard.vue'
import { XInput } from 'vux'
export default {
  components: {
    Head,
    XInput
  },
  data () {
    return {
      lengthP: ''
    }
  },
  mounted () {},
  methods: {
    goYuangong () {
      this.$router.push({ path: '/giftSigning/staff' })
    },
    aa () {
      console.log(this.lengthP)
    },
    baocun () {
      console.log('保存按钮被点击')
    }
  }
}
</script>
<style lang="less" scoped>
.newGiftsigning {
  display: block;
  width: 100%;
  height: 100%;
  .Signperson {
    height: 2.25rem;
    line-height: 2.25rem;
    font-size: 0.75rem;
    padding: 0 0.75rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      margin-top: 0.73rem;
    }
  }
  .everyDay {
    height: 2.25rem;
    line-height: 2.25rem;
    font-size: 0.75rem;
    margin-bottom: 21.85rem;
  }
  .btnBox {
    padding: 0 0.75rem;
    text-align: center;
    .btn {
      border: 0;
      background-color: none;
      width: 16.75rem;
      height: 2rem;
      background-color: #259bec;
      color: #fff;
      font-size: 0.8rem;
      border-radius: 0.2rem;
    }
  }
}
</style>
<style lang="less">
input::-webkit-input-placeholder {
  color: #aaaaaa;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #aaaaaa;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #aaaaaa;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #aaaaaa;
}
.weui-cell {
  padding: 0 0.75rem !important;
}
.weui-label {
  width: 100% !important;
}
</style>


