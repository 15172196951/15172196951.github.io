<template>
    <div class="selectPerson-container">
    <div class="main">   
      <div class="menu">
          <div class="slide-left"  id="slide-left">
            <ul id="slide-leftul">
              <li v-for="(item,index) in menuList" :key="index" @click="select(index)"><p :class="{'active-li':activeMenu==index}">{{item.name}}</p></li>
            </ul>
          </div>
          <div class="slide-right">
              <div class="right-content">
                <ul class="check-tag-list">
                  <li v-for="(item,i) in childrenList" :key="i">
                  <p>{{item.categoryName.name}}</p>
                    <div class="tag-list">
                      <span v-for="(val,index) in item.tagNameList" :key="index" @click="addCheckCount(val)" :class="{'btn-long':val.name.length>5, 'btn':val.name.length<=5, 'selected': val.status}">{{val.name}}</span>
                    </div>
                  </li>
                </ul>
              </div>
          </div>
      </div>
    </div>
    <div class="select-count">
      <div class="co-flex co-ac">
        <div class="co-f1" @click="openPoupe">
          <p>
            <span >已选标签</span>
            <span style="color:#F98125;margin-left:0.5rem">{{checkLength}}</span>
          </p>
        </div>
        <button @click="sureCheck">确认</button>
      </div>
    </div>

    <div class="black-bg" :style="{'height': bgHei}" v-show="countVisible && checkLength > 0"></div>
    <div class="select-tag" v-show="countVisible && checkLength > 0" :style="{'height': selectHei}" >
      <ul>
          <li v-for="(item,index) in checkList" :key='index' class="co-flex co-jsb">
            <p>{{item.name}}</p>
            <div @click="del(item,index)">
              <img src="../../assets/images/del.png">
            </div>
          </li>
      </ul>
      </div>
  </div>
</template>

<script>
import { getWinHei } from '@a/js/function.js'
import ScrollList from '@c/ScrollList'
import {Icon, Popup} from 'vux'
export default {
  components: {
    ScrollList, Icon, Popup
  },
  data () {
    return {
      checkList: [],
      countVisible: false,
      menuList: [
        {
          name: '自然属性',
          id: 'a1',
          list: [
            {
              categoryName: {name: '性别', childId: 'a11'},
              tagNameList: [
                {name: '五个字以内', tagId: 'a111'}, {name: '已选标签', tagId: 'a222'}, {name: '男', tagId: 'a333'}
              ]
            }
          ]
        },
        {
          name: '年龄属性',
          id: 'b2',
          list: [
            {
              categoryName: {name: '年龄', childId: 'b22'},
              tagNameList: [
                {name: '10岁以内', tagId: 'b111'}, {name: '20岁以内', tagId: 'b222'}, {name: '30岁以内', tagId: 'b333'}
              ]
            }
          ]
        },
        {
          name: '人口属性',
          id: 'c3',
          list: [
            {
              categoryName: {name: '性别', childId: 'c11'},
              tagNameList: [
                {name: '五个字以内', tagId: 'c111'}, {name: '已选标签', tagId: 'c222'}, {name: '男', tagId: 'c333'}
              ]
            }
          ]
        },
        {
          name: '测试属性',
          id: 'd4',
          list: [
            {
              categoryName: {name: '性别', childId: 'd11'},
              tagNameList: [
                {name: '五个字以内', tagId: 'd111'}, {name: '已选标签', tagId: 'd222'}, {name: '男', tagId: 'd333'}
              ]
            }
          ]
        }
      ],
      childrenList: [],
      title: '',
      activeMenu: 0,
      bgHei: ''
    }
  },
  watch: {
    checkList () {
      this.setTagStatus()
    }
  },
  methods: {
    addCheckCount (val) {
      let res = false
      this.checkList.forEach(item => {
        if (item.tagId === val.tagId) {
          res = true
        }
      })
      if (res) {
        this.checkList = this.checkList.filter(item => item.tagId !== val.tagId)
      } else {
        if (this.checkLength === 10) {
          this.$loading.toast('最多选择10个标签')
          return
        }
        this.checkList.push(val)
      }
    },
    setTagStatus () {
      this.menuList.forEach((val, i) => {
        if (this.activeMenu === i) {
          let list = this.menuList[i].list
          list.forEach((cat) => {
            cat.tagNameList.forEach((tag) => {
              let res = false
              this.checkList.forEach(item => {
                if (item.tagId === tag.tagId) {
                  res = true
                }
              })
              tag.status = res
            })
          })
          this.childrenList = list
        }
      })
    },
    sureCheck () {
      console.log(this.checkList)
      window.history.back()
    },
    openPoupe () {
      if (this.checkLength > 0) {
        this.countVisible = !this.countVisible
      }
    },
    del (item, index) {
      this.checkList.splice(index, 1)
      if (this.checkLength === 0) {
        this.countVisible = false
      }
    },
    select (index) {
      this.activeMenu = index
      this.setTagStatus()
    }
  },
  computed: {
    checkLength () {
      return this.checkList.length
    },
    selectHei () {
      return this.checkLength * 2.25 + 'rem'
    }
  },
  created () {
    this.select(0)
  },
  mounted () {
    this.bgHei = getWinHei(2.4)
  }
}
</script>

<style lang="less" scoped>
.selectPerson-container{
  .main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    .menu {
      height: 100%;
      .bgc{
        background: #fff;
      }
      .slide-left {
        width: 5.05rem;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow-y: scroll;
        -webkit-overflow-scrolling : touch;
        background: #fff;
        ul {
          padding-top: 0.35rem;
          li {
            padding: 0.6rem 0;
            p {
              text-align: center;
              color: #555555;
              font-size:0.8rem;
            }
            .active-li {
              border-left: 4px solid #259bec;
              color: #222222;
              font-weight: 550;
            }
          }
        }
      }
      .slide-right {
        overflow-y: scroll;
        -webkit-overflow-scrolling : touch;
        position: absolute;
        top: 0;
        left: 5.05rem;
        right: 0;
        bottom: 0;
        padding: 0 1rem 0 0.2rem;
        // background: #fff;
        .right-content {
          .cell {
            padding: 0.725rem 0 1.4rem 0.75rem;
            span {
              font-weight: bold;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }
  .check-tag-list{
  box-sizing: border-box;
  li {
    margin-bottom: 1rem;
    p {
      margin:0.75rem;
      padding-top:0.2rem;
      font-size:0.75rem;
      font-weight: bold;
    }
    .tag-list{
      span{
        border: 0;
        background: transparent;
        font-size: 0.7rem;
        width: 5.4rem;
        height: 1.5rem;
        line-height: 1.5rem;
        color: #5A7C9A;
        float: left;
        text-align: center;
        border: 1px solid #BEC8D2;
        margin-bottom: 0.5rem;
        margin-left: 0.75rem;
        border-radius: 0.96rem;
        &.selected{
          border: 1px solid #259BEC;
          background:#259BEC;
          color:#fff;
        }
        &.btn-long {
          width: 11.75rem;
        }
      }
    }
  }
}
  .select-count{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index:999;
    button{
      font-size: 0.8rem;
      width: 6.25rem;
      background: #259BEC;
      border: 0;
      height: 2.4rem;
      color: #fff;
    }
    p{
      font-size: 0.75rem;
      opacity: 0.9;
      filter:alpha(opacity=90);  //filter 过滤器   兼容IE678
      background: #222222;
      height: 2.4rem;
      line-height: 2.4rem;
      color: #AAAAAA;
      padding: 0 0.75rem;
    }
  }
}
.select-tag{
  position: fixed;
  width: 100%;
  left:0;
  bottom:2.4rem;
  background: #fff;
  li{
    height: 2.25rem;
    padding:0.6rem 0.75rem;
    border-bottom:1px solid #f0f0f0
  }
  img{
    width:1rem;
    height:1rem;
  }
}
.black-bg{
  position: fixed;
  left: 0;
  top: 0;
  width:100%;
  background-color: #000;
  opacity: 0.5;
}
</style>
