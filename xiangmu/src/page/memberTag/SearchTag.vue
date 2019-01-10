<template>
  <div class="search-tag-wrapper">
    <scroll-list>
      <div class="search-content">
        <div class="input-wrapper co-flex co-ac">
          <input type="text" placeholder="输入标签名称" v-focus v-model="searchValue" ref="search" @focus="search" @blur="blur" @keyup.enter='startSearch'>
          <span @click="startSearch"><x-icon type="ios-search" size="22" style="verticalAlign:center"></x-icon></span>
        </div>
        <div class="search-data" v-show="show">
          <ul class="co-flex co-wp" v-if="searchList.length>0">
            <li v-for="(item,index) in searchList" :key="index" @click="skipDetail(item.tagId)">
              <button :class="{'btn-long':item.name.length>5, 'btn':item.name.length<=5 }" class="button">{{item.name}}</button>
            </li>
          </ul>
          <div v-else>
            <p>没有查询到 ' {{searchValue}} ' 的结果</p>
          </div>
        </div>
      </div>
    </scroll-list>
  </div>
</template>

<script>
import ScrollList from '@c/ScrollList'
import { APIS } from '@a/js/config.js'
export default {
  name: 'SearchTag',
  components: {
    ScrollList
  },
  data () {
    return {
      searchValue: '',
      searchList: [],
      show: false
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    skipDetail (id) {
      this.$router.push({name: 'TagDetail', query: {id: id}})
    },
    search () {
      this.$refs.search.style.textAlign = 'left'
    },
    blur () {
      if (!this.searchValue) {
        this.$refs.search.style.textAlign = 'center'
      }
    },
    startSearch () {
      this.$axios({
        method: 'get',
        url: APIS.search,
        params: {object: 'member', name: this.searchValue}
      })
      .then(res => {
        this.show = true
        this.searchList = res.data.data
      })
    }
  },
  watch: {
    searchValue (val) {
      if (!val) {
        this.show = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-tag-wrapper{
    height: 100%;
    background: #fff;
    font-size: 0.75rem;
    .search-content{
      height: 100%;
      margin-top: 0.2rem;
      background: #fff;
      padding: 0.75rem 0 ;
      .input-wrapper{
        width: 86%;
        margin: 0 7%;
        border-radius: 1rem;
        border: 1px solid #d2d1d1;
        overflow: hidden;
        input{
          width: 100%;
          height: 1rem;
          border:0;
          text-align: center;
          outline: none;
          text-indent: 0.75rem;
          font-size: 0.75rem;
        }
        span{
          padding-right: 0.3rem;
        }
      }
      .search-data{
        width: 86%;
        margin: 7%;
        ul{
          li{
            margin-left: 0.25rem;
            margin-bottom: 0.25rem;
            .button{
              border: 0;
              width: 4.5rem;
              height: 1.3rem;
              line-height: 1.3rem;
              text-align: center;
              border-radius: 1rem;
              background: #d2d1d1;
              font-size: 0.7rem;
            }
            .btn-long {
              width: 12rem;
            }
          }
        }
      }
    }
  }
</style>

<style lang="less">
.search-tag-wrapper{
  .vux-x-icon {
    fill: #d2d1d1;
    padding-top: 0.125rem;
  }
}
</style>
