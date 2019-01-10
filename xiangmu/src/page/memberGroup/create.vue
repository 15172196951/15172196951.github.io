<template>
    <div class="co-f1 co-flex co-ver co-cl-1" id="member-group-create">
      <div :style="{'min-height':groupHei}">
        <div class="group-info">
          <div class="group-name"><input v-model="name" placeholder="群组名称" maxlength="15"></div>
          <div class="group-textarea"><x-textarea :max="50" placeholder="群组说明，不超50个汉字"  :show-counter="false" v-model="desc" :autosize="true"></x-textarea></div>
        </div>
        <div class="group-tag">
          <div class="co-flex co-jsb co-ac group-tag-row">
            <span>已选标签</span>
            <span class="light">选取标签</span>
          </div>
          <div class="taglist">
            <ul class="co-flex co-wp" v-if="tagList.length>0">
              <li v-for="(item,index) in tagList" :key="index">
                <button :class="{'btn-long':item.name.length>5, 'btn':item.name.length<=5 }" class="button">{{item.name}}</button>
              </li>
            </ul>
          </div>
          <div class="co-flex co-je co-ac group-tag-row" style=" border-top: 1px solid #e6e6e6;">
            <span>群组人数：0</span>
          </div>
        </div>
        <p class="group-suggtit">营销建议（选填）</p>
        <div class="group-textarea">
          <x-textarea :max="200" placeholder="请输入"  :show-counter="false" v-model="desc" :autosize="true"></x-textarea>
        </div>
      </div>
      <div class="group-action-box co-flex co-ac">
        <x-button type="primary" :disabled="name=='' || desc==''" @click.native="handleSubmit">保存</x-button>
      </div>
    </div>
</template>

<script>
import { XButton, XTextarea } from 'vux'
import { getWinHei } from '@a/js/function.js'
export default {
  components: {
    XButton,
    XTextarea
  },
  data () {
    return {
      groupHei: '',
      name: '',
      desc: '',
      tagList: [
        {
          name: '标签'
        },
        {
          name: '我是超级长的标签十四个字以内'
        },
        {
          name: '标签'
        }
      ]
    }
  },
  methods: {
    handleSubmit () {}
  },
  mounted () {
    this.groupHei = getWinHei(3.75)
  }
}
</script>
<style lang="less" scoped>
.group-suggtit{
  margin-top: 0.875rem;
  padding-left: 0.75rem;
  padding-bottom: 0.375rem;
  font-size: 0.7rem;
  color:#555;
}
.group-name{
  background-color: #fff;
  padding: 0.6rem 0 0.6rem 0.75rem;
  border-bottom: 1px solid #e6e6e6;
  input{
    width:100%;
    height:1.05rem;
    border:none;
    background: none;
    font-size: 0.75rem;
  }
}
.group-textarea{
  padding: 0.2rem 0;
  background-color: #fff;
}
.group-tag{
  background-color: #fff;
  margin-top: 0.875rem;
  .group-tag-row{
    padding: 0 0.75rem;
    height: 2.25rem;
    font-size: 0.75rem;
    color: #333;
  }
  .light{
    color: #259BEC;
  }
}
.taglist {
  padding-bottom: 0.75rem;
  ul{
    li{
      margin-top: 0.6rem;
      margin-left: 0.75rem;
      .button{
        width: 5.25rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        border-radius: 1rem;
        border: #BEC8D2 1px solid;
        color: #5A7C9A;
        background: none;
        font-size: 0.7rem;
      }
      .btn-long {
        width: 11.25rem;
      }
    }
  }
}
</style>
<style lang="less">
#member-group-create{
  .group-action-box{
    padding: 0.5rem 1rem; 
    .small-btn{
      font-size: 0.8rem;
      width: 8rem;
      height: 2rem;
    }
    .bgplain {
      background-color: #F8F8F8;
    }
  }
  .weui-btn_disabled{
    color: #aaa !important;
    background: #dcdcdc !important;
  }
  .weui-btn:after{
    border: none !important;
  }
  .group-textarea textarea{
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size:0.75rem;
  }
}

</style>
