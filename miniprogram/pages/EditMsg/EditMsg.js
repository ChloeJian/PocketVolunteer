// pages/EditMsg/EditMsg.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personMsg:{},
    openId:""
  },
  update: function(e){
      // 用户id......
      console.log(e.volunteer_name)
      console.log(e.volunteer_stu_grade)
      console.log(e.volunteer_stu_major)
      if(e.volunteer_name.length==0)
      {
        wx.showToast({
          icon:'none',
          title: '姓名不能为空',
        })
return
      }
      if( e.volunteer_stu_grade==0)
      {
        wx.showToast({
          icon:'none',
          title: '年级不能为空',
        })
return
      }
      if( e.volunteer_stu_major==0)
      {
        wx.showToast({
          icon:'none',
          title: '专业不能为空',
        })
return
      }

      db.collection('Volunteer').where({
        _openid: this.data.openId
      }).update({
        data: {
          volunteer_name: e.volunteer_name,
          volunteer_stu_grade: e.volunteer_stu_grade,
          volunteer_stu_major: e.volunteer_stu_major
        }
      }).then(res=>{
        console.log(res);
        wx.showToast({
          title: '修改成功,请重新登录',
          icon: 'success',
          duration: 2000//持续的时间
        })

        this.setData({
          'personMsg.volunteer_name': e.volunteer_name,
          'personMsg.volunteer_stu_grade': e.volunteer_stu_grade,
          'personMsg.volunteer_stu_major': e.volunteer_stu_major
        })
        app.globalData.volunteer_name= e.volunteer_name,
        app.globalData.volunteer_stu_grade= e.volunteer_stu_grade,
        app.globalData.volunteer_stu_major= e.volunteer_stu_major,
        // 'personMsg.volunteer_stu_grade': e.volunteer_stu_grade,
        // 'personMsg.volunteer_stu_major': e.volunteer_stu_major
        console.log("personMsg!!!!")
        console.log(this.data.personMsg)
        wx.reLaunch({
          url: `../my/my?identity='user'`
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
  onLoad:function(options) {
    this.setData({
      personMsg: JSON.parse(options.data),
      openId: options.id
    })
    console.log("personMsg!!!")
    console.log(this.data.personMsg)
    console.log("openId!!!")
    console.log(this.data.openId)
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

const app = getApp()