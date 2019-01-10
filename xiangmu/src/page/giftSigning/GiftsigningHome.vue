<template>
  <div class="giftSigning">
    <div class="box">
    <!-- <Head msg="签赠"/> -->
    <div class="select co-flex co-ac co-of" @click="selectStores">
      <p class="text-title co-te" :class="{'isclolor':!isShow}">{{curOrg}}</p>
        <x-icon class="fs-0"
                type="ios-arrow-down" :class="{'isarrow':!isShow}"></x-icon>
        <x-icon type="ios-arrow-up" :class="{'isarrow':isShow}"></x-icon>   
    </div>
    <div class="content" v-if="isShow">
      <div class="giftcontent">
        <div class="membernum">
          <span>会员卡号</span>
          <input type="text" placeholder="请输入会员名" maxlength="11" style='color:#222222;font-size:0.8rem' v-model="giftcontent.memberName">
          <img src="../../assets/images/saoyisao.png" alt="#" @click="saoyisao">
        </div>
        <div class="sign-content co-flex co-jsb">
          <span>签赠内容</span>
          <checker v-model="asdasd" default-item-class="demo5-ite" selected-item-class="demo5-item-selected">
            <checker-item :value="1" @on-item-click="getValue">游戏币</checker-item>
          </checker>
          <checker default-item-class="demo5-ite1" selected-item-class="demo5-item-selected2">
            <checker-item :value="2">游戏券</checker-item>
          </checker>
          <span></span>
          <span></span>
        </div>
        <div class="giftnum">
          <span>签赠数量</span>
          <input type="number" placeholder="请输入数量" style='color:#F98125;font-size:1.5rem;' @input="handleInput" :value="val" />
        </div>
      </div>
      <div class="yongtu">
        <group label-width="4.5em" label-margin-right="2em" label-align="left">
          <selector v-model="list.value" title="用途" :options="list" direction="rtl"></selector>
          <x-input
            title="备注"
            v-model="lengthP"
            text-align="right"
            placeholder="请输入备注"
            @on-change="beizhu"
          ></x-input>
        </group>  
      </div>
      <div class="btnbox">
        <x-button type="primary" :disabled="aa" class="btn" @click.native="queren">确认</x-button>
      </div>
      <div class="gift-foot co-flex co-jsb">
        <div class="foot-left">
          <img src="../../assets/images/set.png" alt="#">
          <router-link :to="{name:'setgiftSigning'}">签赠设置</router-link>
        </div>
        <div class="foot-right">
          <img src="../../assets/images/mingxi.png" alt>
          <router-link :to="{name:'giftSigningdetall'}">签赠明细</router-link>
        </div>
      </div>
    </div>
      <select-org v-if="!isShow" :selectvalue="curOrg" @selectd="getOrg" @selectshop="getSpell">
      </select-org>
    <div v-if="showDialog" class="dialog">
      <div class="dialog-content">
          <ul class="dialog-ul">
            <li>
                <span class="dialog-title">签赠会员：</span>
                <span>{{giftcontent.memberName}}</span>
            </li>
            <li>
                <span class="dialog-title">签赠内容：</span>
                <span>{{giftcontent.gameCurrency}}</span>
            </li>
            <li>
                <span class="dialog-title">签赠数量：</span>
                <span class="dialog-num">{{val}}</span>
            </li>
          </ul>
          <div class="dialog-btn co-flex co-flex co-jsb">
            <span @click="dialogNo">取消</span>
            <span class="dialog-querenBtn" @click="dialogYes">确认签赠</span>
          </div>
      </div>
    </div>
  </div>
  <div>666666666666666666666</div>
  </div>
</template>
<script>
// import Head from './heard.vue'
import SelectOrg from '@c/SelectOrg'
import { APIS } from '@a/js/config.js'
import {
  Checker,
  CheckerItem,
  XButton,
  Group,
  Selector,
  XInput,
  cookie
} from 'vux'
export default {
  components: {
    // Head,
    Checker,
    CheckerItem,
    XButton,
    Group,
    Selector,
    XInput,
    SelectOrg
  },
  data () {
    return {
      demo5: 1,
      list: [
        { key: 'gd', value: '接待用币' },
        { key: 'gx', value: '赔赠用币' }
      ],
      lengthP: '',
      val: '',
      giftcontent: {
        memberName: '', // 会员卡号
        gameCurrency: '' // 选中游戏币
      },
      showDialog: false,
      isShow: true,
      curOrg: '',
      orgId: '',
      asdasd:'游戏币',
    }
  },
  computed: {
    aa () {
      console.log(this.giftcontent.memberName)
      if (this.giftcontent.memberName !== '' && this.asdasd == '1') {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    // this.getInfo()
  },
  methods: {
    getValue (a,b) {
      console.log(a,b)
      console.log(6666)
      this.giftcontent.gameCurrency = '游戏币'
    },
    // 判断按钮高亮起来
    activeBtn () {
    },
    // 确认点击判断内容做表单验证
    queren () {
      console.log('确认按钮被点击')
      console.log(this.giftcontent.memberName)
      console.log(this.val)
      this.showDialog = true
    },
    beizhu () {
      if (this.lengthP.length >= 10) {
        this.lengthP = this.lengthP.substring(0, 10) + '...'
      } else {
        console.log(`2`)
      }
    },
    saoyisao () {
      console.log('扫一扫被电击')
    },
    handleInput (e) {
      this.val = e.target.value.replace(/[^\d]/g, '')
    },
    dialogYes () {
      console.log('确认签赠被电击')
    },
    dialogNo () {
      this.showDialog = false
    },
    selectStores () {
      if (this.isShow) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    // 初始化
    getInfo () {
      this.$loading.loading('加载中')
      this.$axios({
        url: APIS.memberOrganization,
        method: 'get',
        params: { employee_id: cookie.get('creatorId'), org_guid: '' },
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      }).then(res => {
        console.log(res)
        this.$loading.hideLoading()
        this.curOrg = res.data.result[0].org_name
        this.orgId = res.data.result[0].org_guid
      })
    },
    getOrg (val) {
      this.curOrg = val.org_name
      this.orgId = val.org_guid
    },
    getSpell (obj, bool) {
      this.curOrg = obj.text
      this.orgId = obj.org_guid
    }
  }
}
</script>
<style lang="less" scoped>
.giftSigning {
  width: 100%;
  height: 100%;
  display: block;
  .box {
    width: 100%;
    height: 100%;
    display: block;
    a {
      text-decoration: none;
    }
    .select {
      width: 100%;
      height: 2.25rem;
      margin-bottom: 0.75rem;
      font-size: 0.7rem;
      background-color: #fff;
      padding-left: 1rem;
      line-height: 2.25rem;
      .vux-x-icon {
        fill: #222222;
        width: 0.75rem;
        height: 0.75rem;
      }
      .isarrow {
        display: none;
      }
      .vux-x-icon-ios-arrow-up {
        fill: #259bec;
      }
      .text-title {
        margin-right: 0.375rem;
        font-size: 0.7rem;
      }
      .text-title.isclolor {
        color: #259bec;
      }
    }
    .giftcontent {
      height: 9.75rem;
      font-size: 0.8rem;
      margin-bottom: 0.75rem;
      background-color: #fff;
      padding-left: 0.75rem;
      .membernum {
        height: 3.25rem;
        line-height: 3.25rem;
        padding-right: 0.75rem;
        input::-webkit-input-placeholder {
          color: #aaaaaa;
          font-size: 0.8rem;
        }
        span {
          float: left;
          margin-right: 1.5rem;
        }
        input {
          line-height: 1.13rem;
          float: left;
          background: none;
          outline: none;
          border: 0;
          margin-right: 1.25rem;
          margin-top: 1.08rem;
        }
        img {
          float: left;
          margin-top: 1.03rem;
          width: 1.2rem;
          height: 1.2rem;
          vertical-align: top;
        }
      }
      .sign-content {
        height: 3.25rem;
        line-height: 3.25rem;
        .demo5-ite,
        .demo5-ite1 {
          color: #888888;
          width: 4.25rem;
          height: 1.5rem;
          border: 0.05rem solid #d2d2d2;
          font-size: 0.7rem;
          line-height: 1.5rem;
          text-align: center;
          border-radius: 0.1rem;
        }
        .demo5-item-selected {
          background: url("../../assets/images/active.png") no-repeat right
            bottom;
          background-size: 0.9rem 0.9rem;
          color: #259bec;
          border: 1px solid #259bec;
          border-radius: 0.1rem;
        }
      }
      .giftnum {
        height: 3.25rem;
        line-height: 3.25rem;
        span {
          float: left;
          margin-right: 1.5rem;
        }
        input::-webkit-input-placeholder {
          color: #aaaaaa;
          font-size: 0.8rem;
        }
        input {
          line-height: 2.1rem;
          margin-top: 0.58rem;
          width: 50%;
          float: left;
          background: none;
          outline: none;
          border: 0;
        }
      }
    }
    .yongtu {
      height: 4.5rem;
      font-size: 0.75rem;
      background-color: #fff;
      margin-bottom: 1.5rem;
      padding-right: 0.5rem;
    }
    .btnbox {
      margin-bottom: 4rem;
      .weui-btn_disabled.weui-btn_primary {
        background-color: #dcdcdc;
      }
      .btn {
        width: 16.75rem;
        height: 2rem;
      }
    }
    .gift-foot {
      padding: 0 0.75rem;
      height: 1.05rem;
      line-height: 1.05rem;
      img {
        width: 0.88rem;
        height: 0.88rem;
        vertical-align: top;
        margin-top: 0.09rem;
      }
      a {
        color: #5a7c9a;
        font-size: 0.75rem;
      }
    }
    .dialog {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #222222;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1;
      .dialog-content {
        padding: 1.65rem 2.3rem 0.73rem 2.3rem;
        top: 12.08rem;
        left: 2.63rem;
        width: 13.5rem;
        height: 9.3rem;
        font-size: 0.8rem;
        background-color: #fff;
        border-radius: 0.3rem;
        .dialog-ul {
          height: 4.2rem;
          margin-bottom: 1.6rem;
          li {
            overflow: hidden;
            height: 1.4rem;
            line-height: 1.4rem;
            span {
              color: #222222;
            }
            .dialog-num {
              color: #f98125;
            }
            .dialog-title {
              color: #888;
              font-size: 0.75rem;
            }
          }
        }
        .dialog-querenBtn {
          color: #259bec;
        }
      }
    }
  }
}
</style>
<style lang="less">
.weui-label {
  font-size: 0.75rem;
}
.weui-select {
  font-size: 0.75rem !important;
}
.weui-input {
  font-size: 0.75rem !important;
}
.vux-search-box{
    top:8.5rem !important;
  }
</style>