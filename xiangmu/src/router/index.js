import Vue from 'vue'
import Router from 'vue-router'

const searchTag = (resolve) => { require(['../page/memberTag/searchTag.vue'], resolve) }
const tagDetail = (resolve) => { require(['../page/memberTag/TagDetail.vue'], resolve) }
const vipTag = (resolve) => { require(['../page/memberTag/VipTag.vue'], resolve) }
const vipInfo = (resolve) => { require(['../page/memberDetail/VipInfo.vue'], resolve) }
const comment = (resolve) => { require(['../page/memberDetail/Comment.vue'], resolve) }
const markActivity = (resolve) => { require(['../page/memberDetail/MarkActivity.vue'], resolve) }
const activityDetail = (resolve) => { require(['../page/memberDetail/ActivityDetail.vue'], resolve) }
const silverCard = (resolve) => { require(['../page/memberDetail/memberCard/SilverCard.vue'], resolve) }
const editPerson = (resolve) => { require(['../page/memberDetail/EditPerson.vue'], resolve) }
const gameDot = (resolve) => { require(['../page/memberDetail/memberCard/GameDot.vue'], resolve) }
const gameCoin = (resolve) => { require(['../page/memberDetail/memberCard/GameCoin.vue'], resolve) }
const lottery = (resolve) => { require(['../page/memberDetail/memberCard/Lottery.vue'], resolve) }
const integral = (resolve) => { require(['../page/memberDetail/memberCard/Integral.vue'], resolve) }
Vue.use(Router)

Router.prototype.goBack = function (index) {
  this.isBack = true
  if (index) {
    this.go(index)
  } else {
    this.back()
  }
}
// 3.3创建标签分类
const newLabel = (resolve) => { require(['@/page/memberTag/newlabel.vue'], resolve) }
// 3.4编辑/删除标签分类
const labelSet = (resolve) => { require(['@/page/memberTag/labelset.vue'], resolve) }
// 会员卡
const vipCard = (resolve) => { require(['@/page/memberCard/VipCard.vue'], resolve) }
// 编辑类目
const editeTag = (resolve) => { require(['@/page/memberTag/EditeTag.vue'], resolve) }
// 优惠券
const discountCoupon = (resolve) => { require(['@/page/discountInfo/DiscountCoupon.vue'], resolve) }
// 使用记录
const userRecord = (resolve) => { require(['@/page/discountInfo/UserRecord.vue'], resolve) }

const createTag = (resolve) => { require(['@/page/memberTag/createTag'], resolve) }
const tagRule = (resolve) => { require(['@/page/memberTag/tagRule'], resolve) }
const currencyVoucher = (resolve) => { require(['@/page/memberTag/currencyVoucher'], resolve) }
const index = (resolve) => { require(['@/page/index'], resolve) }

// 会员列表 && 会员群组
const memberList = (resolve) => { require(['@/page/memberList/index.vue'], resolve) }
const memberGroup = (resolve) => { require(['@/page/memberGroup/index.vue'], resolve) }
const memberGroupCreate = (resolve) => { require(['@/page/memberGroup/create.vue'], resolve) }
const memberGroupDetail = (resolve) => { require(['@/page/memberGroup/detail.vue'], resolve) }
const memberGroupMember = (resolve) => { require(['@/page/memberGroup/member.vue'], resolve) }
const memberGroupTag = (resolve) => { require(['@/page/memberGroup/tag.vue'], resolve) }
const memberGroupSelectTag = (resolve) => { require(['@/page/memberGroup/selectTag.vue'], resolve) }

// 签赠
const giftSigning = (resolve) => { require(['@/page/giftSigning/GiftsigningHome.vue'], resolve) }
const setgiftSigning = (resolve) => { require(['@/page/giftSigning/SetGiftsigning.vue'], resolve) }
const giftSigningdetall = (resolve) => { require(['@/page/giftSigning/GiftsigningDetail.vue'], resolve) }
const newGiftsigning = (resolve) => { require(['@/page/giftSigning/NewGiftsigning.vue'], resolve) }
const staff = (resolve) => { require(['@/page/giftSigning/Staff.vue'], resolve) }

const vueRouter = new Router({
  routes: [
    {path: '/tagDetail', name: 'TagDetail', component: tagDetail, meta: {title: '标签详情'}},
    {path: '/vipTag', name: 'VipTag', component: vipTag, meta: {title: '会员标签'}},
    {path: '/searchTag', name: 'SearchTag', component: searchTag},
    {path: '/vipInfo', name: 'VipInfo', component: vipInfo, meta: {title: '会员信息'}},
    {path: '/comment', name: 'Comment', component: comment, meta: {title: '备注'}},
    {path: '/createTag', name: 'createTag', component: createTag, meta: {title: ''}},
    {path: '/tagRule/:id?', name: 'tagRule', component: tagRule, meta: {title: '标签规则'}},
    {path: '/markActivity', name: 'MarkActivity', component: markActivity, meta: {title: '营销活动'}},
    {path: '/activityDetail', name: 'ActivityDetail', component: activityDetail, meta: {title: '活动详情'}},
    {path: '/silverCard', name: 'SilverCard', component: silverCard, meta: {title: '银票卡'}},
    {path: '/editPerson', name: 'EditPerson', component: editPerson, meta: {title: '编辑信息'}},
    {path: '/gameDot', name: 'GameDot', component: gameDot},
    {path: '/gameCoin', name: 'GameCoin', component: gameCoin},
    {path: '/lottery', name: 'Lottery', component: lottery},
    {path: '/integral', name: 'Integral', component: integral},
    {path: '/newLabel', name: 'newLabel', component: newLabel, meta: {title: '新增分类'}},
    {path: '/labelset', name: 'labelset', component: labelSet, meta: {title: '修改分类'}},

    // {path: '/vipCard', name: 'VipCard', component: vipCard, meta: {title: '会员卡'}},
    {path: '/currencyVoucher', name: 'currencyVoucher', component: currencyVoucher},
    {path: '/', name: 'index', component: index, meta: {title: '会员管理'}},
    {path: '/labelset/:userId', name: 'EditeTag', component: editeTag, meta: {title: '修改分类'}},
    {path: '/vipCard', name: 'VipCard', component: vipCard, meta: {title: '会员卡'}},
    {path: '/discountCoupon', name: 'DiscountCoupon', component: discountCoupon, meta: {title: '优惠券'}},
    {path: '/userRecord', name: 'UserRecord', component: userRecord, meta: {title: '使用记录'}},
    // 会员列表 && 会员群组
    {path: '/memberList', name: 'memberList', component: memberList, meta: {title: '会员列表'}},
    {path: '/memberGroup', name: 'memberGroup', component: memberGroup, meta: {title: '会员群组'}},
    {path: '/memberGroup/create', name: 'memberGroupCreate', component: memberGroupCreate, meta: {title: '新增群组'}},
    {path: '/memberGroup/detail', name: 'memberGroupDetail', component: memberGroupDetail, meta: {title: '群组详情'}},
    {path: '/memberGroup/member', name: 'memberGroupMember', component: memberGroupMember, meta: {title: '群组人员'}},
    {path: '/memberGroup/tag', name: 'memberGroupTag', component: memberGroupTag, meta: {title: '群组标签'}},
    {path: '/memberGroup/selectTag', name: 'memberGroupSelectTag', component: memberGroupSelectTag, meta: {title: '新增群组'}},
    // 签赠
    {path: '/giftSigning', name: 'giftSigning', component: giftSigning, meta: {title: '签赠'}},
    {path: '/giftSigning/set', name: 'setgiftSigning', component: setgiftSigning, meta: {title: '签赠设置'}},
    {path: '/giftSigning/detall', name: 'giftSigningdetall', component: giftSigningdetall, meta: {title: '签赠明细'}},
    {path: '/giftSigning/new', name: 'newGiftsigning', component: newGiftsigning, meta: {title: '新建签赠人'}},
    {path: '/giftSigning/staff', name: 'staff', component: staff, meta: {title: '员工'}}
  ]
})

export default vueRouter
