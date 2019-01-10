<template>
  <ul>
    <li v-for="(item,i) in datas" :key="i">
        <p>{{item.categoryName.name}}</p>
        <dl class="co-flex co-wp">
            <dd v-for="(val,index) in item.tagNameList" :key="index" @click="skipDetail(val.id)" v-if="val.name">
              <button :class="{'btn-long':val.name.length>5, 'btn':val.name.length<=5 }">{{val.name}}</button>
            </dd>
            <dd @click="skipAdd(item.categoryName.id)"><button>+ 新建</button></dd>
        </dl>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MenuList',
  props: {
    datas: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    skipDetail (id) {
      this.$emit('goDetail', id)
    },
    skipAdd (id) {
      this.$emit('addTag', id)
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  box-sizing: border-box;
  font-size: 0.75rem;
  li {
    margin-bottom: 1.3rem;
    p {
      margin-bottom: 0.75rem;
      margin-left: 0.75rem;
      font-weight: bold;
    }
    dl {
      box-sizing: border-box;
      dd {
        margin-bottom: 0.5rem;
        margin-left: 0.75rem;
        button{
          border-radius: 38.5px;
          background: #fff;
          width: 5.5rem;
          height: 1.5rem;
          border: 1px solid #bec8d2;
          color: #5A7C9A;
          outline:0;
          font-size: 0.7rem;
        }
        .btn-long {
          width: 11.75rem;
        }
      }
    }
  }
}
</style>

