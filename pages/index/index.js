import {borrowList,classify} from "../../api/index.js";
Page({
  data: {
    identityNo:'',
    list:[],
    classifyList:[]
  },
  toPage(e){
    const id=e.currentTarget.dataset['id'];
    const loadId=e.currentTarget.dataset['loadid'];
    getApp().globalData.loadId=loadId;
      wx.navigateTo({
        url: '/pages/borrowDetail/index?id='+id,
      })
      
  },
  onLoad: function (options) {
    var that=this
    var identityNo = getApp().globalData.identityNo
    that.setData({
      identityNo: identityNo
    });
   this.getClassify();
   this.getList();
  },
  async getList(){
    var that=this;
    const result=await borrowList({
      identityNo:this.data.identityNo,
      //identityNo:'610113197709281691',
      pageNum:1,
      pageSize:100,
      orderByColumn:'create_time',
      isAsc:'asc'                      
    });
    var array=result.rows;
    array.map((item,index)=>{
        var caseSourceName=this.getFileItem(item.caseSource,this.data.classifyList)    
        result.rows[index].caseSourceName = caseSourceName;    
    }) 
    if(result.code==200){
      that.setData({
        list:result.rows
      })
    }
  },
  async getClassify(){
    const result=await classify();
    this.setData({
      classifyList:result.data
    })
  },
  getFileItem(vaule,arys){
    let fileAry=arys;
      for(var i=0,n=fileAry.length;i<n;i++){
        if(Number(fileAry[i].dictValue)===Number(vaule)){
              return fileAry[i].dictLabel;
          }
      }
  },
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