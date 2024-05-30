// pages/ActivityManage/ActivityManage.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a_id:''
  },
  //扫码
  onTabItemTap: function(){
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,// 只允许从相机扫码
      success(res){
        console.log("扫码成功："+JSON.stringify(res))
        console.log("activity_id")
        console.log(res.result)
        console.log("_openid")
        console.log(that.openid)
        // 扫码成功后  在此处理接下来的逻辑
        that.setData({
          scanCode: res.result
        })
        db.collection('Volunteer_Activity').where({
          activity_id : res.result.a_id,
          _openid: that.openid,
          enroll_check:false
        }).get({
          success:rr=>{
            if(!rr.data[0]){
              wx.showToast({
                title: '您未报名此活动或已签过到',
              })
            }
            else{
        
              db.collection('Volunteer_Activity').where({
                activity_id : res.result.a_id,
                _openid: that.openid,
                enroll_check:false
              }).update({
                data: {
                  enroll_check:true,
                  }
              }).then(res => {
                db.collection('Volunteer').where({
                  _openid: that.openid
                }).update({
                  data:{
                    volunteer_credit: db.command.inc(1),
                    volunteer_hour: db.command.inc(2),
                    volunteer_reputation: db.command.inc(1)
                  },
                  
                })
              })
              wx.showToast({
                title: '签到成功',
              })
            }
          }
        })
        
       
      
      
      }
    })
  },
  //扫码
  
      
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})