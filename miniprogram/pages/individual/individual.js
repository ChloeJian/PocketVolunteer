// pages/indivadual/individual.js
const  db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    individualData: {
      volunteer_credit: 0,
      volunteer_hour: 0,
      volunteer_name: '',
      volunteer_reputation: 0,
      volunteer_stu_grade: '',
      volunteer_stu_id: '',
      volunteer_stu_major: ''
    },
    openId:''
  },
getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        console.log('云函数获取到的openid: ', res)
        this.setData({
          'openId': res.result.openid
        })
        console.log(this.data.openId)
      }
    })
  },
  update: function(e){
    // 用户id......
    db.collection('Volunteer').where(this.data.openId).update({
      data: {
        volunteer_credit: e.volunteer_credit,
        volunteer_hour: e.volunteer_hour,
        volunteer_name: e.volunteer_name,
        volunteer_reputation: e.volunteer_reputation,
        volunteer_stu_grade: e.volunteer_stu_grade,
        volunteer_stu_id: e.volunteer_stu_id,
        volunteer_stu_major: e.volunteer_stu_major
      }
    }).then(res=>{
      console.log(res);
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 2000//持续的时间
      })
    }).catch(err=>{
      console.log(err);
    })
  },

  //保存按钮
  formSubmit:function(e){
    //表单返回的所有数据
    var formData=e.detail.value;
    this.update(formData)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getData() {
    let that = this;
    wx.cloud.database().collection('Volunteer').where({
      // _id: '${当前用户。。。id}'
      _id: '0122a5876450b0890ac93b360aee003e'
    }).get({
      success(res){
        console.log(res);
        that.setData({
          ['individualData.volunteer_credit']: res.data[0].volunteer_credit,
          ['individualData.volunteer_hour']: res.data[0].volunteer_hour,
          ['individualData.volunteer_name']: res.data[0].volunteer_name,
          ['individualData.volunteer_reputation']: res.data[0].volunteer_reputation,
          ['individualData.volunteer_stu_grade']: res.data[0].volunteer_stu_grade,
          ['individualData.volunteer_stu_id']: res.data[0].volunteer_stu_id,
          ['individualData.volunteer_stu_major']: res.data[0].volunteer_stu_major
        })
      },
      fail(err) {
        console.log("请求失败", res)
        that.setData({
          ['individualData.volunteer_credit']: '',
          ['individualData.volunteer_hour']: '',
          ['individualData.volunteer_name']: '',
          ['individualData.volunteer_reputation']: '',
          ['individualData.volunteer_stu_grade']: '',
          ['individualData.volunteer_stu_id']: '',
          ['individualData.volunteer_stu_major']: '',
        })
      }
    })
  },

  onLoad(options) {
  this.getOpenid();
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
    this.getData()
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