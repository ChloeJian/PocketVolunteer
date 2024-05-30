

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filePath: '',
    a_id: '',
    activity: {} // 存储当前活动对象
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

    /**
   * 表单提交事件处理函数
   */
  formSubmit: async function (event) {
    // 显示加载提示框
    wx.showLoading({
      title: '保存中',
    });

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
      let fileID = '';
      if(this.data.filePath){
        fileID = await uploadImage(this.data.filePath);
      }else{
        fileID = this.data.activity.activity_intro_pic;
      }

      // 将修改后的数据更新到数据库中
      await db.collection('Activity').doc(this.data.a_id).update({
        data: {
          activity_name: activity.activity_name,
          activity_start_time: activity.activity_start_time,
          activity_end_time: activity.activity_end_time,
          activity_credit: activity.activity_credit,
          activity_hour: activity.activity_hour,
          activity_max_people: activity.activity_max_people,
          activity_intro_pic: fileID,
          activity_intro_text: activity.activity_intro_text
        }
      });

      // 隐藏加载提示框并显示保存成功的消息提示
      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      });
    } catch (error) {
      // 隐藏加载提示框并显示保存失败的消息提示
      wx.hideLoading();
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
    // 获取当前活动ID
    const a_id = options.a_id;
    console.log('正在编辑活动：', a_id);

    // 根据ID从数据库获取活动信息，并展示到表单中
    db.collection('Activity').doc(a_id).get().then(res => {
      console.log('获取活动信息成功！', res);
      this.setData({
        activity: res.data,
        a_id: a_id
      });
    }).catch(err => {
      console.error('获取活动信息失败！', err);
    });
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