<template>
  <div class="comment-wrap">
    <scroll-list>
      <div class="comment-content">
        <group>
          <x-textarea :max="500" placeholder="填写评论内容" :height="380" :show-counter="false" v-model="value" :autosize="true"></x-textarea>
        </group>
        <p>{{counter}}</p>
        <button :class="{'btnActive':btnType}" @click="submit" :disabled='!btnType'>确定</button>
      </div>
    </scroll-list>
  </div>
</template>

<script>
import ScrollList from '@c/ScrollList'
import { APIS } from '@a/js/config.js'
import { XTextarea, Group } from 'vux'
export default {
  name: 'Comment',
  components: {
    XTextarea,
    Group,
    ScrollList
  },
  data () {
    return {
      title: '备注',
      counter: '500字以内',
      value: '',
      btnType: false
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.counter = '500/' + val.length
        this.btnType = true
      } else {
        this.counter = '500字以内'
        this.btnType = false
      }
    }
  },
  methods: {
    submit () {
      if (this.value) {
        this.$loading.loading('正在修改中')
        this.$axios({
          url: APIS.memberUpdata,
          method: 'post',
          params: {remark: this.value, guid: this.$store.state.tabInfo.tabInfoPerson.guid},
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(res => {
          this.$loading.hideLoading()
          if (res.data.status === 200) {
            this.$loading.toast('修改成功')
            this.$store.state.tabInfo.tabInfoPerson.remark = this.value
            window.history.back()
          } else {
            this.$loading.toast(`${res.data.error}`)
          }
        })
      }
    }
  },
  created () {
    this.value = this.$store.state.tabInfo.tabInfoPerson.remark
  }
}
</script>

<style lang="less" scoped>
  .comment-wrap{
    .comment-content{
      p{
        padding-left: 0.75rem;
        height: 2.2rem;
        line-height: 2.2rem;
        font-size: 0.7rem;
      }
      button{
        margin-top: 1.3rem;
        width: 16.75rem;
        margin-left: 1rem;
        border-radius: 0.2rem;
        border: 0;
        height: 2rem;
        line-height: 2rem;
        outline: none;
        color: #AAAAAA;
        font-size: 0.8rem;
      }
      .btnActive{
        background: #259BEC;
        color: #fff;
      }
    }
  }
</style>

<style lang='less'>
  .comment-wrap{
    .weui-textarea-counter {
      text-align: left;
    }
    .weui-cells {
      margin-top: 0;
    }
    .weui-cell {
      padding: .75rem;
    }
    .weui-textarea {
      outline: none;
      font-size: 0.75rem;
      overflow-y: scroll;
    }
  }
</style>
