// pages/Home/Home.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      activityList:[]
  },
getActivityList: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getAllActivities',
    }).then(res => {
      console.log(res.result.data)
      this.setData({
        activityList: res.result.data
      })
      wx.hideLoading()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },
  goToActivityList:function(){
    console.log("yes")
    wx.navigateTo({
      url: `../ActivityList/ActivityList`
    })
  },
  goToDetail:function(event){
    wx.navigateTo({
      url: `../ActivityDetail/ActivityDetail?a_id=${event.target.dataset.a_id}`
    })
  },
  goToMsgDetaiil1:function(){
    wx.navigateTo({
      url: `../ActivityDetail/ActivityDetail?a_id=2cc84e266467780b0d3072d41f84c7c5`
    })
  },
  goToMsgDetaiil3:function(){
    wx.navigateTo({
      url: `../ActivityDetail/ActivityDetail?a_id=8ab5d44b6461e5930016f3301d61b38c`
    })
  },
  goToMsgDetaiil2:function(){
    wx.navigateTo({
      url: `../ActivityDetail/ActivityDetail?a_id=3db71b216461e0550010a0db6fa58645`
    })
  },
  goToSwiperDetail1:function(event){
    wx.navigateTo({
      url: `../ActivityDetail/ActivityDetail?a_id=3db71b216461e0550010a0db6fa58645`
    })
  },
  goToSwiperDetail2:function(event){
    wx.navigateTo({
      url: `../ActivityDetail/ActivityDetail?a_id=2cc84e266467780b0d3072d41f84c7c5`
    })
  },
  goToSwiperDetail3:function(event){
    wx.navigateTo({
      url: `../ActivityDetail/ActivityDetail?a_id=8ab5d44b6461e5930016f3301d61b38cs`
    })
  },
  gotoDetail:function(event){
    wx.navigateTo({
      url: `../ActivityDetail/ActivityDetail?a_id=${event.target.dataset.a_id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      // this.getSwiperList()
        this.getActivityList()
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