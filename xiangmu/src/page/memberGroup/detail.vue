<template>
  <div class="co-f1 co-flex co-ver co-cl-1">
    <div class="group-info">
      <p class="tit">高价值人群高价值人群高价值人群</p>
      <p class="desc">客单价>2倍人均客单价 且 最近180天内有购买或到店 </p>
      <img class="edit-btn" src="../../assets/images/edit-icon.png" @click="actionVisible=true" />
    </div>
    <div class="group-btns co-flex co-jsb co-ac">
      <div class="btn co-flex co-ac co-jc"><img src="../../assets/images/member_tag_icon.png">群组标签</div>
      <div class="line"></div>
      <div class="btn co-flex co-ac co-jc"><img src="../../assets/images/member_num_icon.png">群组人员</div>
    </div>
    <div class="group-suggest">
      <b>营销建议：</b>高价值人群为最优质客群，消费频次高且客单价高，建议针对高价值人群提供“一对一”服务营销，建议尝试推送新品，生日礼包。
    </div>
    <div class="group-sulink">
      <p>精准营销</p>
    </div>

    <div class="black-bg" :style="{'height': winHei}" v-show="actionVisible"></div>
    <div class="detail-action" v-show="actionVisible">
      <p class="tit">编辑</p>
      <ul>
        <li>修改群组</li>
        <li @click="del">删除群组</li>
        <li @click="actionVisible=false">取消</li>
      </ul>
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
      winHei: '',
      actionVisible: false
    }
  },
  methods: {
    del () {
      // let _self = this
      this.$loading.confirm({
        content: `确定删除该群组吗？`,
        confirm () {
          // _self.$axios({
          //   url: APIS.delTag,
          //   method: 'post',
          //   params: {object: 'member', tagId: _self.$route.query.id}
          // }).then(res => {
          //   if (res.data.status === 200) {
          //     _self.$loading.toast('删除成功')
          //     window.history.back()
          //   } else {
          //     this.$loading.toast(`${res.data.error}`)
          //   }
          // })
        },
        onCancel () {
        }
      })
    }
  },
  mounted () {
    this.winHei = getWinHei(0)
  }
}
</script>

<style lang="less" scoped>
.group-info{
  position: relative;
  padding: 0.75rem;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  .tit{
    font-size: 0.9rem;
    font-weight: 700; 
    color: #222;
  }
  .desc{
    font-size: 0.75rem;
    color: #555;
    padding-top:0.6rem; 
  }
  .edit-btn{
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    right: 0.75rem;
    top: 0.75rem;
  }
}
.group-btns{
  background-color: #fff;
  height:2.25rem;
  .btn{
    width: 100%;
    height:2.25rem;
    text-align: center;
    font-size: 0.75rem;
    color: #555;
    img{
      width: 1rem;
      height: 1rem;
      margin-right: 0.25rem;
    }
  }
  .line{
    background-color: #E6E6E6;
    width: 2px;
    height: 1.25rem;
    font-size: 0;
  }
}
.group-suggest{
  padding: 0.75rem;
  margin-top: 0.75rem;
  background-color: #fff;
  font-size: 0.75rem;
  color: #252525;
  line-height: 1.6;
  b{
    color: #222;
  }
}
.group-sulink{
  margin-top: 0.75rem;
  padding: 0.625rem 0.75rem;
  background-color: #fff;
  font-size:0.75rem;
  color:#555;
  border-bottom: 1px solid #e6e6e6;
}
.black-bg{
  position: fixed;
  left: 0;
  top: 0;
  width:100%;
  background-color: #000;
  opacity: 0.5;
}
.detail-action{
  position: fixed;
  width: 9rem;
  height: 10rem;
  background-color: #fff;
  left: 4.875rem;
  top:10rem;
}
.detail-action .tit{
  font-size: 0.9rem;
  color: #259BEC;
  padding: 1.125rem 0 0.2rem 1rem; 
}
.detail-action ul{
  padding-left: 1rem;
  li{
    font-size: 0.75rem;
    color:#222;
    margin-top: 1rem;
  }
}
</style>
