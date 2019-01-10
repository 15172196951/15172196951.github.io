<template>
  <div>
    <div class="member-one co-flex co-ac" v-for="(item, i) in data" :key="i">
      <img class="head-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545994010067&di=4edcb80ab5d6a3ca82e209eefb12404f&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201409%2F14%2F20140914161150_Vh3km.jpeg">
      <div class="info">
        <p class="nickname co-flex co-ac">我是昵称<span class="level">V14</span><img src="../assets/images/man.png" class="gender-icon"></p>
        <p class="cardno co-flex co-ac"><img src="../assets/images/card_icon.png" class="card-icon">WH9744555</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'member-com',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.member-one{
  background: #fff;
  height: 4rem;
  border-top:1px solid #f0f0f5;
  padding-left: 0.75rem;
}
.info{
  padding-left:0.6rem; 
}
.info .nickname{
  font-size: 0.8rem;
  color: #222;
  padding-bottom: 0.2rem;
}
.info .nickname .level{
  border: 1px solid #259BEC;
  color: #259BEC;
  border-radius: 3px;
  font-size: 0.6rem;
  padding: 2px 3px;
  margin-left: 0.5rem;
}
.info .cardno{
  padding-top: 0.2rem;
  font-size: 0.7rem;
  color: #888;
}
.head-img{
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 100%;
}
.gender-icon{
  width: 0.9rem;
  height: 0.9rem;
  margin-left: 0.5rem;
  display: block;
}
.card-icon{
  width: 1rem;
  height: 1rem;
  margin-right: 0.4rem;
  display: block;
}
</style>
