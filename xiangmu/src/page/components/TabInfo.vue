<template>
    <div class="tab-menu-info">
      <div class="shop-name" v-if="personMsg">
        <div class="data">{{personMsg.shopName}}</div>
      </div>
      <dl class="part1 co-flex co-wp" v-if="personMsg">
        <dd @click="personData('name')">
          <p>姓名</p>
          <div v-if="personMsg.name" class="data">{{personMsg.name}}</div>
          <div v-else class="data">未填写</div>
        </dd>
        <dd @click="personData('birthday')">
          <p>出生日期</p>
          <div v-if="personMsg.birthday" class="data">{{personMsg.birthday}}</div>
          <div v-else class="data">未填写</div>
        </dd>
        <dd @click="personData('sex')">
          <p>性别</p>
          <div v-if="personMsg.sex" class="data">{{personMsg.sex}}</div>
          <div v-else class="data">未填写</div>
        </dd>
        <dd @click="personData('idCard')">
          <p>身份证</p>
          <div v-if="personMsg.idCard" class="data">{{this.cardMatch(personMsg.idCard)}}</div>
          <div v-else class="data">未填写</div>
        </dd>
        <dd @click="personData('phoneNumber')">
          <p>手机号</p>
          <div v-if="personMsg.phoneNumber" class="data">{{phoneMatch(personMsg.phoneNumber)}}</div>
          <div v-else class="data">未填写</div>
        </dd>
        <dd @click="editEmail('customersEmailAddress')">
          <p>邮箱</p>
          <div v-if="personMsg.customersEmailAddress" class="data">{{emailMatch(personMsg.customersEmailAddress)}}</div>
          <div v-else class="data">未填写</div>
        </dd>
      </dl>
      <dl class="part1 part2 co-flex co-wp" v-if="gameMsg">
        <dd @click="memberCard">
          <p>会员卡号</p>
          <div class="data">{{gameMsg.cardNo}}</div>
        </dd>
        <dd @click="bankCard">
          <p>银票卡</p>
          <div class="data">{{gameMsg.silverTicketCard}}</div>
        </dd>
        <dd @click="skipGameCoin">
          <p>游戏币</p>
          <div class="data">{{gameMsg.gameCoin}}</div>
        </dd>
        <dd @click="skipGameDot">
          <p>游戏点</p>
          <div class="data">{{gameMsg.packageCoin}}</div>
        </dd>
        <dd @click="skipLottery">
          <p>彩票</p>
          <div class="data">{{gameMsg.lottery}}</div>
        </dd>
        <dd @click="skipIntegral">
          <p>积分</p>
          <div v-if="tabInfoIntegral.current_integral">
            <div class="data">{{tabInfoIntegral.current_integral}}</div>
          </div>
          <div v-else>
            <div v-if="tabInfoIntegral.current_integral === 0" class="data">0</div>
            <div v-else class="data">---</div>
          </div>
        </dd>
        <dd>
          <p>优惠券</p>
          <div v-if="discount">
            <div class="data">{{discount}}</div>
          </div>
          <div v-else>
            <div v-if="discount === 0" class="data">0</div>
            <div v-else class="data">---</div>
          </div>
        </dd>
        <dd>
          <p>兑币券</p>
          <div v-if="exchange">
            <div class="data">{{exchange}}</div>
          </div>
          <div v-else>
            <div v-if="exchange === 0" class="data">0</div>
            <div v-else class="data">---</div>
          </div>
        </dd>
      </dl>
      <div class="consume">
        <group>
          <cell title="营销活动" is-link @click.native="markActivity"></cell>
        </group>
      </div>
      <div class="comment">
        <div class="title co-flex co-jsb">
          <p>备注</p>
          <img src="../../assets/images/edit.png" alt="" @click="skipcomment">
        </div>
        <group v-if="personMsg.remark">
          <x-textarea placeholder="请填写内容" v-model="personMsg.remark"  :show-counter="false" :max="500" readonly autosize></x-textarea>
        </group>
      </div>
    </div>
</template>

<script>
import { Cell, Group, XTextarea, InlineLoading } from 'vux'
export default {
  name: 'TabInfo',
  props: {
    personMsg: {
      type: Object,
      default: {}
    },
    gameMsg: {
      type: Object,
      default: {}
    },
    tabInfoIntegral: {
      type: Object,
      default: {}
    },
    discount: {
      type: Number,
      default: ''
    },
    exchange: {
      type: Number,
      default: ''
    }
  },
  components: {
    Cell,
    Group,
    XTextarea,
    InlineLoading
  },
  methods: {
    cardMatch (val) {
      var str = String(val)
      return str.substring(0, 4) + '****' + str.substring(str.length - 2)
    },
    phoneMatch (val) {
      var str = String(val)
      return str.substring(0, 3) + '****' + str.substring(str.length - 4)
    },
    emailMatch (val) {
      var str1 = String(val).split('@')[0]
      var str2 = String(val).split('@')[1].split('.')[1]
      // var reg = /@[^\.]+\./g
      return str1.substring(0, 2) + '****' + str1.substring(str1.length - 3) + '@xxx.' + str2
    },
    skipcomment () {
      this.$emit('skipCommonFu', {index: 'comment'})
    },
    markActivity () {
      this.$emit('skipCommonFu', {index: 'activity'})
    },
    bankCard () {
      this.$emit('skipCommonFu', {index: 'SilverCard'})
    },
    personData (value) {
      this.$emit('skipCommonFu', {index: 'edit', title: value})
    },
    editEmail (value) {
      this.$emit('skipEdit', {title: value})
      // console.log(value)
    },
    skipGameDot () {
      this.$emit('skipCommonFu', {index: 'game'})
    },
    skipGameCoin () {
      this.$emit('skipCommonFu', {index: 'gameCoin'})
    },
    skipLottery () {
      this.$emit('skipCommonFu', {index: 'lottery'})
    },
    skipIntegral () {
      this.$emit('skipCommonFu', {index: 'integral'})
    },
    memberCard () {
      this.$emit('skipCommonFu', {index: 'card'})
    }
  }
}
</script>

<style lang="less" scoped>
.tab-menu-info {
  font-size: 0.75rem;
  .data{
    color: #000;
  }
  .shop-name{
    background: #ffffff;
    width: 100%;
    height: 3.25rem;
    line-height: 3.25rem;
    padding-left: 0.75rem;
  }
  .part1 {
    background: #ffffff;
    dd {
      width: 50%;
      border-top: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
      padding: 0.6rem 0 0.6rem 0.75rem;
       p {
        color: #888;
        padding-bottom: 0.375rem;
        font-size: 0.65rem;
      }
    }
    dd:nth-child(2n){
      border-right: 0;
    }
  }
  .part2 {
    margin-top: 0.75rem;
  }
  .consume{
    margin-top: 0.75rem;
  }
  .comment{
    margin-top: 0.75rem;
    background: #ffffff;
    .title{
      padding: 0.6rem 0.75rem;
      img{
        width: 1.05rem;
        height: 1.05rem;
      }
    }
  }
}
</style>

<style lang="less">
  .member-info{
    .vux-no-group-title {
      margin-top: 0;
    }
    .weui-cells {
      margin-top: 0;
      font-size: 0.75rem;
    }
    .weui-textarea {
      font-size: 0.75rem;
      color: #555555;
      line-height: 1.2rem;
      outline: none;
      text-indent: 1.5rem;
    }
  }
</style>