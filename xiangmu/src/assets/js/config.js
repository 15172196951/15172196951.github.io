// let service = 'http://api.toonyoo.net'
// let account = 'http://api.toonyoo.net'
let service = 'http://10.201.5.142:8080'
let account = 'http://10.201.5.142:8080'
// let account = 'http://10.101.3.163:8080'
let APIS = {}
APIS.viptagList = account + '/api/category/list'
APIS.viptagChildrenList = account + '/api/tag/list'
APIS.tagDetail = account + '/api/tag/object/count'
APIS.search = account + '/api/tag/name_query'
APIS.memberDraw = account + '/api/tag/object/list_tags'

APIS.memberPerson = service + '/member/information/query'
APIS.memberCard = service + '/member/asset/query'
APIS.memberUpdata = service + '/member/information/update'
APIS.SilverCard = service + '/member/silver_ticket_card/query'
APIS.memberIntegral = service + '/ integral/list/query/integral/rights'
APIS.Lottery = service + '/member/lottery/detail'
APIS.gameCoin = service + '/member/member_coin_in_out/day_total'
APIS.gameDot = service + '/member/package/asset'

APIS.integral = service + '/member/integral/list/query/integral/rights'
APIS.discount = service + '/couponmarketing/customer/coupon/count'
APIS.exchange = service + '/electroncode/code/customer/count'
APIS.activity = service + '/couponmarketing/activity/marketing/customer/list'
APIS.activityDetail = service + '/couponmarketing/activity/marketing/customer/detail'
APIS.desc = service + '/couponmarketing/activity/marketing/reward/list'
APIS.again = service + '/couponmarketing/activity/marketing/resend/coupon'
APIS.level = service + '/member/manage/level/list'

APIS.searchTag = account + '/api/tag/query'
APIS.updateTagRule = account + '/api/tag/update'
APIS.createTagRule = account + '/api/tag/create'
APIS.delTag = account + '/api/tag/delete'
// 1.1创建标签类型
APIS.createTag = account + '/api/category/create'
// 1.5列举标签类别
APIS.getTagType = account + '/api/category/list'
// 1.2修改标签类别
APIS.updateTagType = account + '/api/category/update'
// 1.3删除标签类别
APIS.deletTag = account + '/api/category/delete'
// 2.5列举标签
APIS.memberTag = account + '/api/tag/list'
// export {serviceYM, APIS}
// 选择组织
APIS.memberOrganization = service + '/employee/data/permission/org/list'
APIS.memberSpellList = service + '/employee/data/permission/shop/order/list'

export {service, account, APIS}
