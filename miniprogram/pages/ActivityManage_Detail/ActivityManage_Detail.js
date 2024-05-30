// pages/ActivityManage_Detail/ActivityManage_Detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: {},
    a_id:''
  },

  gotoAMUpdate: function(event){
    wx.navigateTo({
      url: `../ActivityManage_Update/ActivityManage_Update?a_id=${event.target.dataset.a_id}`
    })
  },
  
  onDeleteTapHandler:function(){
    wx.cloud.callFunction({
      name:'deleteOneActivity',
      data:{
        a_id:this.data.a_id
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
    wx.showLoading({
      title: '加载中',
    })
    console.log(options)
    this.setData({
      a_id:options.a_id
    })
    wx.cloud.callFunction({
      name:'getOneActivity',
      data: {
        a_id:this.data.a_id
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        activity: res.result.data
      })
      wx.hideLoading()
    }).catch(err=>{
      console.err(error)
      wx.hideLoading()
    })
  },
  signIn: function(event){
    console.log(event.target.dataset.a_id)
     wx.cloud.database().collection('Activity').where({
      _id:event.target.dataset.a_id
    }).update({
      data: {
       activity_check:true
      },
      success(res) {
      console.log('发起签到成功', res)
        
      wx.showToast({
        title: '发起签到成功',
        icon:'success',
        duration:2000,
        success:function(){
          
          setTimeout(function(){
            wx.navigateTo({
              url: `../code/code?a_id=${event.target.dataset.a_id}`,
            })
        
        },2000);
        }
      })
  
       },
    })
    
  }, 
  code: function(event){
    wx.navigateTo({
      url: `../code/code?a_id=${event.target.dataset.a_id}`,
    })
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