<template>
    <div class="EditeTag co-f1 co-flex co-ver">
        <div class="co-f1 co-mg-t10">
            <div class="co-tb" :class="{'co-bd-btm':isPopupPicker}">
                <div class="co-left">类目名称</div>
                <div class="co-right co-je">
                <co-input v-model="name" class="co-br-a0 co-cl-9 co-fs-03" :maxlength="5"></co-input>
                </div>
            </div>
            <div class="co-tb" v-if="isPopupPicker">
                <div class="co-left">上级类目</div>
                <div class="co-right co-rl" @click="selector">
                   {{attr[0]}}<i class="coicon coicon-enter" style="font-size:0.8rem;margin-left:0.15rem;"></i>
                </div>
            </div>
            
            <div class="co-flex co-jsb co-ac bottom">
              <co-btn isCircle bg-color = "#fff" text-color = "#000" @btn="del">删除分类</co-btn>
              <co-btn isCircle bg-color = "#259bec" text-color = "#fff" @btn="edit">确认</co-btn>
            </div>
        </div>  
        <div>
                <popup-picker v-model="attr" :show='selectShow' @on-hide="selectShow = false" :data="selectList" @on-change="onChange"></popup-picker>
            </div>  
    </div>    
</template>
<script>
import CoBtn from '@c/Btn'
import CoInput from '@c/Input'
import { PopupPicker } from 'vux'
import { APIS } from '@a/js/config.js'
import EventEmitter from '@a/js/EventEmitter'

export default {
  name: 'EditeTag',
  components: {CoBtn, PopupPicker, CoInput},
  data () {
    return {
      form: {title: '时间'},
      selectShow: false,
      isPopupPicker: false,
      name: '',
      value: '',
      parentId: '',
      data: {},                // 请求列表一级
      TagData: [],
      selectList: [],          //  一级列表select
      attr: []                 // 选择的值
    }
  },
  mounted () {
    EventEmitter.subscribe('jump', function (item) {
      console.log(item)
    })
    // 判断是否有修改一级还是二级
    this.$route.params.userId && this.$route.query.idx ? this.isPopupPicker = true : this.isPopupPicker = false

    // this.$axios({
    //   url: APIS.getTagType,
    //   method: 'get',
    //   params: {object: 'member', categoryId: this.$route.params.userId}
    // }).then(dat => {
    //   this.name = dat.data.data.filter(ele => ele.categoryId === this.$route.query.idx)[0].name
    // })

    this.$axios({
      url: APIS.getTagType,
      method: 'get',
      params: {object: 'member', categoryId: ''}
    }).then(res => {
      this.data = Object.assign({}, res.data)
      this.attr.push(this.data.data.filter(ele => ele.categoryId === this.$route.params.userId).length === 0 ? '' : this.data.data.filter(ele => ele.categoryId === this.$route.params.userId)[0].name)
      this.name = this.data.data.filter(ele => ele.categoryId === this.$route.params.userId).length === 0 ? '' : this.data.data.filter(ele => ele.categoryId === this.$route.params.userId)[0].name
      if (this.$route.query.idx) {
        this.$axios({
          url: APIS.getTagType,
          method: 'get',
          params: {object: 'member', categoryId: this.$route.params.userId}
        }).then(dat => {
          this.name = dat.data.data.filter(ele => ele.categoryId === this.$route.query.idx)[0].name
        })
      }
      this.data.data.forEach(element => {
        this.TagData.push(element.name)
      })
      this.selectList.push(this.TagData)
    })
  },
  methods: {
    // 选择的值
    onChange (val) {
      this.parentId = this.data.data.filter(ele => ele.name === val[0])[0].categoryId
    },
    selector () {
      this.selectShow = true
    },
    update () {
      this.$route.params.userId && this.$route.query.idx ? this.$axios({
        url: APIS.updateTagType,
        method: 'get',
        params: { object: 'member', categoryId: this.$route.query.idx, name: this.name, parentId: this.parentId }
      }).then(res => {
        if (res.data.status === 200) {
          this.$loading.toast('编辑类目成功', 1)
          window.history.back()
          // this.$router.push({path: '/labelset', query: {id: this.$route.params.userId}})
        } else {
          this.$loading.toast(`${res.data.error}`)
        }
      }) : this.$axios({
        url: APIS.updateTagType,
        method: 'get',
        params: { object: 'member', categoryId: this.$route.params.userId, name: this.name, parentId: '' }
      }).then(res => {
        if (res.data.status === 200) {
          this.$loading.toast('编辑类目成功', 1)
          // EventEmitter.dispatch('update', this.$route.params.userId)
          window.history.back()
          // this.$router.push({path: '/labelset', query: {id: this.$route.params.userId}})
        } else {
          this.$loading.toast(`${res.data.error}`)
        }
      })
      EventEmitter.dispatch('update', this.$route.params.userId)
    },
    edit () {
      if (this.name === '') {
        this.$loading.toast('分类名称不能为空')
        return
      }
      if (/^[\u4e00-\u9fa5]{1,5}$/.test(this.name)) {
        this.update()
      } else {
        this.$loading.toast('分类名称请输入汉字', 0, 1)
      }
    },
    del () {
      let _self = this
      this.$route.params.userId && this.$route.query.idx
      ? this.$loading.confirm({
        content: `删除分类后，下级分类及标签均被删除，确认删除？`,
        confirm () {
          _self.$axios({
            url: APIS.deletTag,
            method: 'get',
            params: {object: 'member', categoryId: _self.$route.query.idx}
          }).then(res => {
            if (res.data.status === 200) {
              _self.$loading.toast('删除成功')
              window.history.back()
            } else {
              this.$loading.toast(`${res.data.error}`)
            }
          })
        },
        onCancel () {
        }
      }) : this.$loading.confirm({
        content: `删除分类后，下级分类及标签均被删除，确认删除？`,
        confirm () {
          _self.$axios({
            url: APIS.deletTag,
            method: 'get',
            params: { object: 'member', categoryId: _self.$route.params.userId }
          }).then(res => {
            if (res.data.status === 200) {
              _self.$loading.toast('删除成功')
              EventEmitter.dispatch('del', {index: 1})
              _self.$store.dispatch('setActiveMenu', 0)
              window.history.back()
            } else {
              this.$loading.toast(`${res.data.error}`)
            }
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

    .co-cl-9{
      color: #222222;
    }
    .co-ta-hd{
        height: 2.5rem;
    }
    .co-bd-btm{
        border-bottom: 1px solid #f0f0f5;
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
    .bottom{
        position:absolute;
        height: 2rem;
        width: 100%;
        padding: 0 1rem;
        bottom: 1.5rem;
        .co-btn{
            position: static;
            width: 48%;
        }
    }
</style>
<style lang="less">
.EditeTag {
  .vux-cell-box{
  display: none!important;
  }
}

</style>

