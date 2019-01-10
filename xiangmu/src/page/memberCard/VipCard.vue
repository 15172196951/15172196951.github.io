<template>
    <div class="vip-Card co-f1 co-flex co-ver">
        <header-com isBack :title="title"></header-com>
        <div class="main" @click="remove">
           <ul>
              <li :style="{backgroundImage:Image}" :class="[{'co-change':(ischange==index&&ISchange)}]" v-for="(item,index) in data" :key="index">
                  <div class="title co-flex co-jsb co-ac">
                    <div class="name">{{item.name}}</div>
                    <div class="btn" @click.stop="change(index, item.id)">修改</div>
                  </div>
                   <p class="co-status" v-if="item.cardType[0].status">已冻结</p>
                  <div class="info co-flex co-jsb co-ac">
                      <div class="typed co-flex">
                        <div v-for="(info,index) in item.cardType" :key="index" :class="{'co-status-c':info.status}"><span>{{info.type}}</span>
                        </div>
                      </div>
                      <div class="bnum">{{item.idCard}}</div>
                  </div>
                  <div class="co-des co-flex co-ac" :class="[{'co-jsb':item.cardType.length===2},{'co-jc':item.cardType.length!==2}]" v-if="ischange==index&&ISchange">
                      <span v-for="(info,index) in item.cardType" :key="index" @click.stop="relief">{{['冻结','激活'][info.status]}}<br>{{info.type}}</span>
                      <span class="co-jq" v-if="item.cardType.length===2" @click.stop="reliefd">解除<br>绑定</span>
                  </div>
              </li>
           </ul>
        </div>
    </div>
</template>
<script>
import HeaderCom from '@c/HeaderCom'
export default {
  name: 'VipCard',
  components: {HeaderCom},
  data () {
    return {
      title: '会员卡',
      Image: 'url(' + require('../../assets/images/Rectangle.png') + ')',
      data: [{name: '武汉菱角湖万达店', cardType: [{type: '实体卡', status: 0}, {type: '微信卡', status: 0}], idCard: 'WH083454545', id: 0}, {name: '武汉菱角湖万达店', cardType: [{type: '实体卡', status: 0}, {type: '微信卡', status: 0}], idCard: 'WH083454545', id: 1}, {name: '武汉菱角湖万达店', cardType: [{type: '实体卡', status: 0}], idCard: 'WH083454545', id: 2}, {name: '武汉菱角湖万达店', cardType: [{type: '实体卡', status: 1}], idCard: 'WH083454545', id: 3}],
      ischange: 0,
      ISchange: false
    }
  },
  created () {

  },
  methods: {
    // 修改改变颜色
    change (idx, id) {
      this.ISchange = true
      this.ischange = idx
      console.log(idx + 'xxx' + id)
    },
    // 移除
    remove () {
      this.ISchange = false
    },
    // 冻结
    relief () {
      this.ISchange = true
      console.log(11111)
    },
    reliefd () {
      this.ISchange = true
      console.log(111118888)
    }
  }
}
</script>
<style lang="less" scoped>
  .vip-Card{
    .main{
      width: 100%;
      height: 100%;
      padding: 0.75rem 0.75rem 2.425rem 0.75rem;
      overflow-y: auto;
      ul {
        //默认样式
        li{
          width: 100%;
          height: 7.5rem;
          border-radius: 0.4rem;
          margin-bottom: 1.5rem;
          background-color: #ffffff;
          background-position: left top;
          background-repeat: no-repeat;
          background-size: cover;
          box-shadow: 0 0.5rem 0.5rem #d0d0d1;
          padding: 1.15rem 1rem 1.3rem 1.25rem;
          
          .title{
            height: 1.4rem;
            .name{
              color: #222222;
              font-size: 0.8rem;
              font-weight: bold; 
            }
            .btn{
              width: 2.725rem;
              height: 100%;
              border:  1px solid #259BEC;
              border-radius: 0.2rem;
              text-align: center;
              font-size: 0.7rem;
              color: #259BEC;
              line-height: 1.4rem;
            }
          }
          .co-status{
            color: #555555;
            font-size: 0.75rem;
            line-height: 1.25rem;
            position: absolute;
          }
          .info{
             height: 1rem;
             width: 100%;
             margin-top: 2.65rem;
              .typed{   
                div{
                  display:inline-block;
                  width: 2.25rem;
                  height: 100%;
                  font-size: 0.45rem;
                  text-align: center;
                  color: #ffffff;
                  font-size: 0.45rem;
                  transform: skew(-20deg);
                  line-height: 1rem;
                  span{
                    display: block;
                    transform: skew(20deg); 
                  }
                }
               
                >div:nth-of-type(1) {
                  background: #F98125;
                  margin-left: 0.2rem;
                  margin-right: 0.45rem;
                }
                >div:nth-of-type(2){
                  background: #0EAE36;
                }
                >div.co-status-c{
                  background: #aaaaaa; 
                }
              
              }  
             .bnum{
               font-size: 0.8rem;
               color: #555555;
               line-height: 1rem;
             }
          }
        }
        // 点击修改的样式
        .co-change{
          position: relative; 
            &:after{
              content: " ";
              display: block;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.40);
              border-radius: 0.4rem;
            }
            .title{
              .btn{
                border-color: #4d4d4d;
                color: #4d4d4d; 
              }
            }
            .info{
              .typed{
                >div:nth-of-type(1) {
                  background: #5d5d5d;
                  
                }
                >div:nth-of-type(2) {
                  background: #434343;
                  
                }
              } 
            }
            .co-des{
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              z-index: 10;
              padding-left: 2.25rem;
              padding-right: 2.25rem;
              span{
                display: inline-block;
                width: 3.25rem;
                height: 3.25rem;
                border-radius: 50%;
                background-color: #ffffff;
                padding: 0.775rem 0.575rem;
                text-align: center;
                color: #58b3f1;
                font-size: 0.7rem;
                line-height: 0.85rem;
              }
              .co-jq{
                color: #f99d9b;
              }
            }
        }
      }
    }
  }
</style>


