<template>
  <div class="labelCreat co-f1 co-flex co-ver">
    <div class="co-f1 co-mg-t10">
      <div class="co-tb co-bd-btm">
        <div class="co-left">分类名称</div>
        <div class="co-right co-je">
          <co-input v-model="form.title" class="co-br-a0 co-cl-9 co-fs-03" :maxlength="5" placeholder='请输入分类名称'></co-input>
        </div>
      </div>
      <div  :class="['co-tb',{'co-bd-btm':istrue}]">
        <div class="co-left">分类级别</div>
        <div class="co-right"></div>
        <div class="co-right-w">
          <checklist class="checkd" :max=1 :options="commonList" v-model="form.checklist" @on-change="change"></checklist>
        </div>
      </div>
      <div class="co-tb" v-if="istrue">
        <div class="co-left">上级类目</div>
        <div class="co-right co-rl" @click="selector">
          {{form.att[0]}}<i class="coicon coicon-enter" style="font-size:0.8rem;margin-left:0.15rem;"></i>
        </div>
      </div>
    </div>
    <!-- <co-btn :bgColor="bgColor" :textColor="textColor" :isCircle="isCircle" @btn="submit"><span style="font-size:0.8rem;">保存</span></co-btn> -->
    <button class="submit" @click="submit" :class="form.checklist.length>0||form.title?'bgColor':''">
      <span style="font-size:0.8rem;">保存</span>
    </button>
    <div>
      <popup-picker :show='selectShow' v-model="form.att" @on-hide="selectShow = false" :data="selectList" @on-change="onChange"></popup-picker>
    </div>
  </div>
</template>
<script>
import CoInput from '@c/Input'
import CoBtn from '@c/Btn'
import { PopupPicker, Checklist } from 'vux'
import { APIS } from '@a/js/config.js'

export default {
  name: 'newLabel',
  components: {
    PopupPicker,
    CoInput,
    Checklist,
    CoBtn
  },
  data () {
    return {
      setColor: false,
      selectShow: false,
      commonList: ['一级分类', '二级分类'],
      selectList: [],
      // bgColor: '#259bec',  // 按钮颜色
      // initColor: '#c7c7c7',
      // textColor: '#fff',   // 字体颜色
      TagData: [],
      data: {},
      istrue: false,
      isCircle: true,
      idx: '',
      form: {
        title: '',
        checklist: [],
        att: []
      },
      parentId: '',
      postQuerty: {
        name: null,
        parentId: null
      },
      selectValue: ['性别']
    }
  },
  methods: {
    selector () {
      this.selectShow = true
    },
    change (val) {
      if (val[0] === '二级分类') {
        this.istrue = true
        this.TagData = []
        this.selectList = []
        this.getTag()
      } else {
        this.parentId = ''
        this.istrue = false
      }
    },
    onChange (val) {
      let filterdata = Object.assign({}, this.data)
      this.parentId = filterdata.data.filter((ele) => { return ele.name === val[0] }
      )[0].categoryId
      console.log(val)
    },
    // 获取列举标签类别
    getTag () {
      this.$axios({
        url: APIS.getTagType,
        method: 'get',
        params: {object: 'member', categoryId: ''}
      }).then(res => {
        if (res.data.status === 200) {
          this.data = Object.assign({}, res.data)
          this.data.data.forEach(element => {
            this.TagData.push(element.name)
          })
          this.selectList.push(this.TagData)
        } else {
          this.$loading.toast(`${res.data.error}`)
        }
      })
    },
    submitPOST () {
      this.$loading.loading('加载中')
      this.$axios({
        url: APIS.createTag,
        method: 'get',
        params: {object: 'member', name: this.form.title, parentId: this.parentId},
        headers: {'Content-Type': 'application/json'}
      }).then(res => {
        this.$loading.hideLoading()
        if (res.data.status === 200) {
          this.$loading.toast('新建分类成功', 1)
          if (!this.parentId) {
            this.$axios({
              url: APIS.getTagType,
              method: 'get',
              params: {object: 'member', categoryId: ''}
            })
            .then(res => {
              if (res.data.status === 200) {
                this.$store.dispatch('setActiveMenu', res.data.data.length - 1)
                this.$store.commit('SET_CATEGORYTYPE', 0)
                window.history.back()
              }
            })
          } else {
            this.data.data.forEach((ele, index) => {
              if (ele.name === this.form.att[0]) {
                this.idx = index
              }
            })
            this.$store.dispatch('setActiveMenu', this.idx)
            this.$store.commit('SET_CATEGORYTYPE', 1)
            window.history.back()
          }
        } else {
          this.$loading.toast(`${res.data.error}`)
        }
      })
    },
    submit () {
      if (this.form.title || this.form.checklist.length > 0) {
        if (this.form.title === '') {
          this.$loading.toast('分类名称不能为空')
          return
        } if (!/^[\u4e00-\u9fa5]{1,5}$/.test(this.form.title)) {
          this.$loading.toast('分类名称,请输入汉字', 0, 0)
          return
        } if (JSON.stringify(this.form.checklist) === '[]') {
          this.$loading.toast('分类级别不能为空')
          return
        } if (this.commonList[1] === this.form.checklist[0]) {
          if (JSON.stringify(this.form.att) === '[]') {
            this.$loading.toast('上级类目不能为空')
            return
          }
        }
        this.submitPOST()
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .submit{
      width: 90%;
      border: 0;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      right: 1rem;
      background: #c7c7c7;
      border-radius: 0.125rem;
      outline: 0;
    }
    .bgColor{
      background: #259bec;
      color: #fff;
    }
    .labelCreat{
       background-color: #f0f0f5;
       
    }
    .co-cl-9{
      color: #222222;
    }
    .co-ta-hd{
        height: 2.5rem;
    }
    .co-bd-btm{
        border-bottom: 1px solid #E6E6E6;
    }
    .co-mg-t10{
        margin-top: 0.75rem;
    }
    .co-ta-pl01{
        padding-left: 0.75rem;
    }
    .co-tb{
        height: 2.5rem;
        display: flex;
        align-items: center;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        background: #ffffff;
    }
    .co-left{
        font-size: 0.75rem;
        color: #222222;
        width: 100px;
    }
    .co-right{
        flex: 1;
        display: flex;
    }
    .co-right-w{
      width: 250px;
    }
    .co-rl{
        justify-content: flex-end;
        align-items: center;
        color: #555555;
        font-size: 0.75rem;
    }
</style>
<style lang="less">
   .labelCreat {
  .vux-cell-box{
  display: none!important;
  }
}
    //选择框样式
  .checkd{
      display: flex;
      justify-content: space-between;
      height: 100%;
      width: 100%;
      .weui-cell{
        padding: 0;
      }
      .weui-cells{
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: space-between;
      }
      //去除选择框上下边距
      .weui-cells:after{
          border-bottom: none;
      }
      .weui-cells:before{
          border-top: none;
      }
      .weui-cell:before{
          border-top: none; 
      } 
      p{
          font-size:  0.75rem;
          color: #222222;
      }  
  }
 
</style>



