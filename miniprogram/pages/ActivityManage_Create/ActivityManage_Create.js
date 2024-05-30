// pages/ActivityManage_Create/ActivityManage__Create.js

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filePath: ''
  },

  onChooseTapHandler: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then(res => {
      const tempFilePaths = res.tempFilePaths;
      console.log(tempFilePaths);
      this.setData({
        filePath: tempFilePaths[0]
      })
    }).then(res => {
      console.log('选择图片成功！');
    }).catch(err => {
      console.error('选择图片失败！', err);
    })
  },

    formSubmit: async function (event) {
      wx.showLoading({
        title: '发布中',
      })
      try {
        // 获取表单数据
        const activity = event.detail.value;
        let errorMsg = '';
        if (activity.activity_end_time <= activity.activity_start_time) {
          errorMsg += "结束时间须晚于开始时间！\n";
        }
        if (activity.activity_credit <= 0) {
          errorMsg += "综测分值须大于0！\n";
        }
        if (activity.activity_hour <= 0) {
          errorMsg += "志愿时长须大于0！\n";
        }
        if (activity.activity_max_people <= 0) {
          errorMsg += "最大参与人数须大于0！\n";
        }
    
        if (errorMsg !== '') {
          throw new Error(errorMsg);
        }
        
        // 上传图片并获取图片文件 ID
        const fileID = await uploadImage(this.data.filePath);
    
        // 将表单数据和图片文件 ID 一起提交到数据库中
        const result = await db.collection('Activity').add({
          data: {
            activity_name: activity.activity_name,
            activity_create_time: new Date().toLocaleDateString(),
            activity_start_time: activity.activity_start_time,
            activity_end_time: activity.activity_end_time,
            activity_check: false,
            activity_credit: activity.activity_credit,
            activity_hour: activity.activity_hour,
            activity_cur_people: 0,
            activity_max_people: activity.activity_max_people,
            activity_intro_pic: fileID,
            activity_intro_text: activity.activity_intro_text
          }
        }).then(res=>{
          console.log(res)
          wx.hideLoading()
        }).catch(err=>{
          console.error(err)
          wx.hideLoading()
        })
        console.log('表单提交成功!', result);
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
        });
      } catch (error) {
        console.error('表单提交失败!', error);
    
        wx.showToast({
          title: error.message,
          icon: 'none',
          duration: 5000
        });
      }
    },

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
});
// 封装上传图片方法
function uploadImage(filePath) {
  return new Promise((resolve, reject) => {
    let suffix= /\.\w+$/.exec(filePath)[0];
    wx.cloud.uploadFile({
      cloudPath: 'activity_intro/' + new Date().getTime() + suffix,
      filePath: filePath,
      success: res => {
        resolve(res.fileID);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}