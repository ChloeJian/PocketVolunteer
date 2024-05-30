// pages/AllActivity/AllActivity.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    currentActivityList:[],
  allActivity:[],
  Data:{
    userInfo:{},
    myAllActivityList:[],
    myUnsignedActivityList:[],
    mySignedActivityLIst:[]
  },
  },
  
  initOperation: async function () {
    try {
          wx.showLoading({
            title: '加载中',
          });
          const resPar = await wx.cloud.callFunction({
            name: 'getMyParticipation'
          });
          const res = await wx.cloud.callFunction({
            name: 'getMyActivities',
          });
          let allPar=resPar.result.data;
          let all=res.result.data;
          console.log(1,allPar);
          console.log(2,all);
          let no=[],yes=[];
          for (let i = 0; i < all.length; i++) {
            if (!allPar[i].enroll_check) {
              no.push(all[i]);
            }else{
              yes.push(all[i]);
            }
          }
          this.setData({
            'Data.myAllActivityList': all,
            'Data.myUnsignedActivityList': no,
            'Data.mySignedActivityList': yes,
          });
          console.log("myAllActivityList")
          console.log(this.data.Data.myAllActivityList)
          console.log("myUnsignedActivityList")
          console.log(this.data.Data.myUnsignedActivityList)
          console.log("mySignedActivityList")
          console.log(this.data.Data.mySignedActivityList)
          if(this.data.type === "'All'"){
          this.setData({
            allActivity : this.data.Data.myAllActivityList
          })
            
          }
          if(this.data.type === "'Unsigned'"){
            this.setData({
              allActivity : this.data.Data.myUnsignedActivityList
            })
          }
          if(this.data.type === "'Signed'"){
            this.setData({
              allActivity : this.data.Data.mySignedActivityList
            })
          }
          // console.log("myAllActivityList")
          // console.log(this.data.Data.myAllActivityList)
          // console.log("myUnsignedActivityList")
          // console.log(this.data.Data.myUnsignedActivityList)
          // console.log("mySignedActivityList")
          // console.log(this.data.Data.mySignedActivityList)
        } catch (err) {
          console.error(err);
        } finally {
          wx.hideLoading();
        }
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
    this.initOperation()
    this.setData({
      type: options.data
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
    this.initOperation()
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