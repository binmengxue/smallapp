// 接口文档
// 获取验证码
import {request} from '../request/index'
let DEBUG = false;
var Mock = require('../utils/mock.js')
const baseUrl = getApp().globalData.host
// 获取用户登录
export function login(data) {
  if(!DEBUG){
    return request({
      url: `${baseUrl}/api/wechat/login`,
      method: 'post',
      data
    })
  }else{
    var res = Mock.mock({
      data: {
        code:0,
        session3rd:'21212wwww',
        user:{
          userName:'张三'
        }
      }
    })
    return res.data
  }
}
//借款列表
export function borrowList(data) {
  if(!DEBUG){
    return request({
      url: `${baseUrl}/api/wechat/case_list`,
      method: 'get',
      data
    })
  }else{
    var res = Mock.mock({
      data: [
        {
         "id":'001',
          'caseId':'100300006788',
        },
        {
          "id":'002',
           'caseId':'100300006797',
         },
      ]
    })
    return res.data
  }
 
}
//查询分类
export function classify() {
  return request({
    url: `${baseUrl}/api/wechat/dictType/case_info_case_source`,
    method: 'get'
  })
}
//借款详情
export function borrowDetail(data) {
  return request({
    url: `${baseUrl}/api/wechat/case_detail`,
    method: 'get',
    data
  })
}
//上传图片
export function updateFile(data) {
  return request({
    url: `${baseUrl}/api/wechat/uploadCertificate`,
    method: 'post',
    data
  })
}
