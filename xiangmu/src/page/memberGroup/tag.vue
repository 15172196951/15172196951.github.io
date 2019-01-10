<template>
  <div class="co-f1 co-flex co-ver co-cl-1">
    <div class="tagbox" :style="{'min-height':tagHei}">
    <div class="tit">高价值人群</div>
    <div class="taglist">
      <ul class="co-flex co-wp" v-if="tagList.length>0">
        <li v-for="(item,index) in tagList" :key="index">
          <button :class="{'btn-long':item.name.length>5, 'btn':item.name.length<=5 }" class="button">{{item.name}}</button>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>
<script>
import { getWinHei } from '@a/js/function.js'
export default {
  components: {
  },
  data () {
    return {
      tagHei: '',
      tagList: [
        {
          name: '标签'
        },
        {
          name: '我是超级长的标签十四个字以内'
        },
        {
          name: '标签'
        }
      ]
    }
  },
  mounted () {
    this.tagHei = getWinHei(0.75)
  }
}
</script>
<style lang="less" scoped>
.tagbox{
  margin-top: 0.75rem;
  background-color: #fff;
}
.tit{
  padding: 0.625rem 0.75rem;
  background-color: #fff;
  font-size:0.75rem;
  color:#333;
  border-bottom: 1px solid #e6e6e6;
}
.taglist {
  padding-top: 0.25rem;
  ul{
    li{
      margin-top: 0.6rem;
      margin-left: 0.75rem;
      .button{
        width: 5.25rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        border-radius: 1rem;
        border: #BEC8D2 1px solid;
        color: #5A7C9A;
        background: none;
        font-size: 0.7rem;
      }
      .btn-long {
        width: 11.25rem;
      }
    }
  }
}
</style>
