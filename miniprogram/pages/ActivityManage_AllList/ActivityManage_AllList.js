// pages/ActivityManage/ActivityManage.js

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allActivityList:[],
    unsignedActivityList:[],
    signedActivityList:[],
    currentActivityList:[]
  },

  initOperation: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getAllActivities',
    }).then(res => {
      console.log(res.result.data)
      let all=res.result.data;
      let no=[],yes=[];
      for (let i = 0; i < all.length; i++) {
if (!all[i].activity_check) {
          no.push(all[i]);
        }
        else{
          yes.push(all[i]);
        }
      }
      this.setData({
        allActivityList: all,
        currentActivityList: all,
        unsignedActivityList: no,
        signedActivityList: yes,
      })
      wx.hideLoading()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  showAll: function(){
    this.setData({
      currentActivityList:this.data.allActivityList
    })
  },

  showUnsigned: function(){
    this.setData({
      currentActivityList:this.data.unsignedActivityList
    })
  },

  showSigned: function(){
    this.setData({
      currentActivityList:this.data.signedActivityList
    })
  },

  gotoAMDetail: function(event){
    wx.navigateTo({
      url: `../ActivityManage_Detail/ActivityManage_Detail?a_id=${event.target.dataset.a_id}`
    })
  },

  gotoAMUpdate: function(event){
    wx.navigateTo({
      url: `../ActivityManage_Update/ActivityManage_Update?a_id=${event.target.dataset.a_id}`
    })
  },  

  onDeleteTapHandler:function(event){
    wx.cloud.callFunction({
      name:'deleteOneActivity',
      data:{
        a_id:event.target.dataset.a_id
      }
    }).then(res=>{
      console.log(res)
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      })
    }).catch(err=>{
      console.err(error)
      wx.showToast({
        title: '删除失败',
        icon: 'fail',
        duration: 2000
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initOperation()
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
});
