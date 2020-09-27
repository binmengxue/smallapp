
import {login} from '../../api/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    parameters:{
      identityNo:null,//身份证
      password:null,//密码
    },
    showModal: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    
  },
  getPassword(e){
    let password = 'parameters.password';
    this.setData({
        [password]:e.detail.value
    })
  },
  formSubmit(e) {
    var {identityNo,password}= e.detail.value;
    var myreg =/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    if (identityNo == "") {
       wx.showToast({
         title: '身份证不能为空',
         icon: 'none',
         duration: 1000
       })
      return false;
    } else if (!myreg.test(identityNo)) {
      wx.showToast({
         title: '请输入正确的身份证号',
        icon: 'none',
         duration: 1000
     })
     return false;
    }
    if (password == "") {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else if(password!="123456"){
      wx.showToast({
        title: '输入正确密码',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    this.setData({
      parameters:{
        identityNo,
        password
      }
    });
    var that = this;
    login(this.data.parameters).then(function(value) {
      if(value.code==200){
        that.setData({
          showModal: true
        });
      }else{
        wx.showToast({
          title: '查询失败',
          icon: 'none',
          duration: 1000
        })
      }
    });
  },
  onShow() {
  },
  toPage(){
    this.setData({
      showModal: false
    });
    getApp().globalData.identityNo=this.data.parameters.identityNo
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
});