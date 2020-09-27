


const app = getApp()
// 同时发送异步代码的次数
let ajaxTimes=0;
export const request=(options)=>{
  ajaxTimes++;
  // 显示加载中 效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  return new Promise((resolve,reject)=>{
    const { data, method } = options
    if(data && method !== 'get') {
      options.data = JSON.stringify(data)
    }
    wx.request({
     ...options,
     header: {
        'Content-Type': 'application/json; charset=UTF-8',
     },
     success:(result)=>{
       resolve(result.data);
     },
     fail:(err)=>{
       reject(err);
     },
     complete:()=>{
      ajaxTimes--;
      if(ajaxTimes===0){
        //  关闭正在等待的图标
        wx.hideLoading();
      }
     }
    });
  })
}