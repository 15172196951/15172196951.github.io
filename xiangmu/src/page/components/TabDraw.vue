<template>
    <div class="tab-menu-draw">
      <div class="draw-content">
        <div class="darw-list">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <p><span class="dot"></span><span>{{item.categoryName.name}}</span></p>
              <dl class="co-flex co-wp">
                <dd v-for="(val,i) in item.tagNameList" :key="i">
                  <button v-if="val.name.length>5" :class="{'btn-long':val.name.length>5}">{{val.name}}</button>
                  <button v-else class="btn">{{val.name}}</button>
                </dd>
                <dd class="last" @click="btnDown(index)">
                  <button v-show='item.show'>
                    <span v-if="item.flag"><x-icon type="ios-arrow-up" size="20" style="vertical-align:middle"></x-icon></span>
                    <span v-else><x-icon type="ios-arrow-down" size="20" style="vertical-align:middle"></x-icon></span>
                    <span>{{item.flag?'展开':'收起'}}</span>
                  </button>      
                </dd>
              </dl>
              <div class="line"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'TabDraw',
  props: {
    memberDraw: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      drawList: [],
      list: []
    }
  },
  methods: {
    btnDown (index) {
      let data = []
      this.memberDraw.forEach((item, i) => {
        if (index === i) {
          this.list[index].flag = !this.list[index].flag
          if (this.list[index].flag) {
            data = item.tagNameList.slice(0, 4).sort(this.sortId).slice(0, 4)
          } else {
            data = item.tagNameList.slice(0, 4).sort(this.sortId).slice(0, 4).concat(item.tagNameList.slice(4))
          }
        }
      })
      this.$set(this.list[index], 'tagNameList', data)
    },
    sortId (a, b) {
      return a.name.length - b.name.length
    },
    deepClone (obj) {
      let _obj = JSON.stringify(obj)
      let objClone = JSON.parse(_obj)
      return objClone
    }
  },
  watch: {
    memberDraw (val) {
      val.forEach((item, index) => {
        item.flag = true
        item.show = true
      })
      this.list = this.deepClone(val)
      this.list.forEach((item, index) => {
        if (item.tagNameList.length > 5) {
          item.tagNameList = item.tagNameList.slice(0, 4).sort(this.sortId)
        } else {
          item.show = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .darw-list{
    background: #fff;
    padding-left: 0.75rem;
    ul{
      li{
        padding-top: 0.9rem;
        p{
          margin-bottom: 0.75rem;
          font-size: 0.75rem;
          .dot{
            width: 0.5rem;
            height: 0.5rem;
            display: inline-block;
            background: #259BEC;
            border-radius: 50%;
            margin-right: 0.55rem;
          }
        }
        dl{
          box-sizing: border-box;
          dd{
            margin-bottom: 0.6rem;
            margin-right: 0.75rem;
            button{
              border-radius: 38.5px;
              background: #fff;
              width: 5.25rem;
              height: 1.5rem;
              border: 1px solid #bec8d2;
              color: #5A7C9A;
              font-size: 0.7rem;
            }
            .btn-long {
              width: 11.25rem;
              overflow: hidden;
            }
          }
        }
        .line{
          height: 0.6rem;
          margin-right: 0.75rem;
          border-bottom: 1px solid #E6E6E6;
        }
      }
    }
  }
</style>
<style lang="less">
  .tab-menu-draw{
    .vux-x-icon {
      fill: #5A7C9A;
    }
  }
</style>
