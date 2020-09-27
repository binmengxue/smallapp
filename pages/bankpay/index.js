// pages/bankpay/index.js
import {updateFile} from "../../api/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenModle:true,
    filePath:'../../images/public/shangchuan.png',
    identityNo:'',
    loadId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      identityNo:getApp().globalData.identityNo,
      loadId:getApp().globalData.loadId
    })
  },
  cloneEvent(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  //点击我已完成打款显示弹出层
  updateEvent(){
    this.setData({  
      hiddenModle: false,
    })
  },
  //上传文件
  updateFile(){
    var  that=this;
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://court.zhiyunyi.net/api/wechat/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          success (res){
            var data=JSON.parse(res.data)
            var url=data.url
            that.setData({  
              filePath:url
            })
          }
        })
      }
    })
  },
  //提交
  async updateconfirm(){
    if(this.data.filePath=='../../images/public/shangchuan.png'){
      wx.showToast({
        title: '请上传凭证',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    const data={
      filePath:this.data.filePath,
      identityNo:this.data.identityNo,
      loadId:this.data.loadId
    }
    const result=await updateFile(data);
    if(result.code==200){
      this.setData({  
        hiddenModle: true,
        filePath:'../../images/public/shangchuan.png',
      })
      wx.showToast({
        title: '上传成功',
        icon: 'success',
        duration: 1000
      })
    }
  },
  //取消
  updatecancel(){
    this.setData({  
      hiddenModle: true,
      filePath: '../../images/public/shangchuan.png',
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