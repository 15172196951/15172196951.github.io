<template>
    <div class="ClassifySet co-f1 co-flex co-ver">
         <div class="cla-cot">
            <p>一级分类</p>
            <ul>
                <li>
                    <div class="demo-content b-top co-flex co-jsb co-ac" @click="jump(id)">
                        <span>{{name}}</span>
                        <span><i class="coicon coicon-enter"></i></span>
                    </div>
                    <p v-if="listChildren.length">二级分类</p>
                        <ul class="cla-ul">
                            <li v-for="(item,index) in listChildren" :key="index" @click="jumpd(item.parentId,item.categoryId)">
                                <div class="demo-content co-flex co-jsb co-ac">
                                    <span>{{item.name}}</span>
                                    <span><i class="coicon coicon-enter"></i></span>
                                </div>
                            </li>
                        </ul>
                </li>
            </ul>
         </div> 
         
    </div>
</template>
<script>
import CoBtn from '@c/Btn'
import { Swipeout, SwipeoutItem, SwipeoutButton, XInput, Group } from 'vux'
import { APIS } from '@a/js/config.js'
import EventEmitter from '@a/js/EventEmitter'

export default {
  name: 'labelSet',
  components: {Swipeout, SwipeoutItem, SwipeoutButton, CoBtn, XInput, Group},
  beforeRouteEnter (to, from, next) {
    document.title = '修改分类'
    next()
  },
  data () {
    return {
      list: {name: '自然特征', children: ['性别', '年龄', '地域']},
      id: this.$route.query.id,
      name: '',
      listChildren: [],
      bgColor: '#259bec',  // 按钮颜色
      textColor: '#fff',   // 字体颜色
      isCircle: true,
      data: []

    }
  },
  mounted () {
    if (!EventEmitter._events['del']) {
      EventEmitter.subscribe('del', item => {
        if (item.index === 1) {
          this.$router.go(-1)
        }
      })
    }
    this.init()
  },
  methods: {
    init () {
      this.getTge()
      this.$axios({
        url: APIS.getTagType,
        method: 'get',
        params: {object: 'member', categoryId: ''}
      }).then(res => {
        if (res.data.status === 200) {
          this.data = res.data.data
          this.name = this.data.filter(ele => ele.categoryId === this.$route.query.id).length === 0 ? '' : this.data.filter(ele => ele.categoryId === this.$route.query.id)[0].name
        } else {
          this.$loading.toast(`${res.data.error}`)
        }
      })
    },
    jump (index) {
      this.$router.push({name: 'EditeTag', params: { userId: index }})
    },
    jumpd (index, caid) {
      this.$router.push({name: 'EditeTag', params: { userId: index }, query: { idx: caid }})
    },
    getTge () {
      this.$loading.loading('加载中')
      this.$axios({
        url: APIS.getTagType,
        method: 'get',
        params: {object: 'member', categoryId: this.$route.query.id}
      }).then(res => {
        this.$loading.hideLoading()
        if (res.data.status === 200) {
          this.listChildren = res.data.data
        } else {
          this.$loading.toast(`${res.data.error}`)
        }
      })
    }

  }
}
</script>
<style lang="less" scoped>
    .cla-cot{
        text-align: left;
        // height: 100%;
        p{
            height: 2.25rem;
            line-height: 2.25rem;
            font-size: 0.75rem;
            color: #555555; ;
            padding: 0 0.75rem; 
        }
        .dsc{
            height: 2.25rem;
            line-height: 2.25rem;
            font-size: 0.7rem;
            color: #888888; 
            padding: 0 0.75rem;
            text-align: right;  
        }
    }
</style>
<style lang="less">
.ClassifySet {
    
        .demo-content{
           padding: 0 0.75rem;
           background: #fff;
           color: #222222; 
           height: 2.25rem;
           font-size: 0.75rem;
          
        }
        .cla-ul{
            >li{
                border-bottom: 1px solid #f0f0f5;
            }
             >li:last-child{
                border-bottom: none;
            }
        }
    
   
}   
</style>



