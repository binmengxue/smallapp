// pages/borrowDetail/index.js
import {borrowDetail} from "../../api/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    obj:{},
    inputValue:'',//输入的金额
    hiddenmodalput:true,  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
       id:options.id,
       //id:'2899'
    })
    this.getList();
  },
  async getList(){
    var that=this;
    const result=await borrowDetail({
      identityNo:getApp().globalData.identityNo,
      id:this.data.id,                      
    });
    if(result.code==200){
      that.setData({
        obj:result.data
      })
    }
  },
  //全部处理
  bindToPage() {
    this.setData({
      inputValue:this.data.obj.noRepayTotalAmount
    })
    wx.navigateTo({
      url: '/pages/out/index?money='+this.data.inputValue+'&loadId='+this.data.obj.loadId
    })
  }, 
   //点击部分还款显示弹出层
  halfToBorrow(){
    this.setData({  
        hiddenmodalput: false
    })
  },
   //实现双向绑定
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //提交按钮
  confirm(){  
      this.setData({  
        hiddenmodalput: true
      })
      if(getApp().globalData.identityNo=="210319197409044920"){
        return false
      }
      wx.navigateTo({
        url: '/pages/bankpay/index?money='+this.data.inputValue+'&loadId='+this.data.obj.loadId
      })
      
  },
  //重置按钮
  cancel(){  
    this.setData({  
        hiddenmodalput: true,
        inputValue:''
    })
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({  
      inputValue:''
    })
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})