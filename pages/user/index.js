// pages/user/index.js
Page({
  data: {
    userinfo:{},
    collect:[],
    userINfo:'',
    isShow:false,
    inputValue:''
  },
  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    this.setData({
      userinfo
    })
  },
  toSearch(){
    this.setData({
      isShow:true
    })
  },
  bindKeyInput(e){
    this.setData({
      inputValue: e.detail.value
    })
    if(this.data.inputValue.length<=0){
      this.setData({
        isShow:false
      })
    }
  }
})