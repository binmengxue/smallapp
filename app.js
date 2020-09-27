//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
   onLaunch:function(options) {
    
  },
  onShow: function(options) {
    //分享
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onHide: function() {

  },
  onError: function(msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function(options) {

  },
  globalData: {
      userInfo: null,
      loginCode: null,
      version: '1.0.0',
      host: 'https://court.zhiyunyi.net',
      identityNo:'',
      loadId:''
  }
});
  