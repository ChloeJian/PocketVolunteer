const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList:[]
  },

  gotoDetail:function(event){
    wx.navigateTo({
      url: `../ActivityDetail/ActivityDetail?a_id=${event.target.dataset.a_id}`
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    this.getActivityList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})