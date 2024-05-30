const db=wx.cloud.database();
Component({

  /**
   * 页面的初始数据
   */
  data: {
    myAllActivityList:[],
    myUnsignedActivityList:[],
    mySignedActivityLIst:[],
    currentActivityList:[],
    AdData:{
      userInfo:{},
      myAllActivityList:[],
      myUnsignedActivityList:[],
      mySignedActivityLIst:[]
    },
    openid: '',
  },
  properties: {
      myProp: {
        type: Object,
        value: {}
      }
    },
observers: {
    'myProp': function(newVal) {
      this.setData({
        AdData: newVal
      })
    }
  },
  methods:{
    gotoDetail:function(event){
      wx.navigateTo({
        url: `../ActivityDetail/ActivityDetail?a_id=${event.target.dataset.a_id}`
      })
    },
    
    // initOperation: function () {
    //   wx.showLoading({
    //     title: '加载中',
    //   })
    //   wx.cloud.callFunction({
    //     name: 'getMyActivities',
    //   }).then(res => {
    //     console.log(res.result.data)
    //     let all=res.result.data;
    //     let no=[],yes=[];
    //     for (let i = 0; i < all.length; i++) {
    //       if (!all[i].enroll_check) {
    //         no.push(all[i]);
    //       }
    //       if (all[i].enroll_check) {
    //         yes.push(all[i]);
    //       }
    //     }
    //     this.setData({
    //       myAllActivityList: all,
    //       currentActivityList: all,
    //       myUnsignedActivityList: no,
    //       mySignedActivityLIst: yes,
    //     })
    //     wx.hideLoading()
    //   }).catch(err => {
    //     console.error(err)
    //     wx.hideLoading()
    //   })
    // },
    
    showAll: function(){
      this.setData({
        currentActivityList:this.data.myAllActivityList
      })
    },
    
    showUnsigned: function(){
      this.setData({
        currentActivityList:this.data.myUnsignedActivityList
      })
    },
    showTel:function(){
      console.log(this.data.AdData)
      wx.showModal({
        title: '联系客服',
        content: 'TEL:123456 (没事不要联系我!)',
        showCancel: false,
        confirmText: '确定'
      })
    },
      
    showSigned: function(){
      this.setData({
        currentActivityList:this.data.mySignedActivityLIst
      })
    },
    exitLogin:function(){
      this.triggerEvent('changeValue', '')
      wx.navigateTo({
        url: `../my/my`
      })
    },
    goToActivityManage:function(){
      wx.navigateTo({
        url: `../ActivityManage_AllList/ActivityManage_AllList`
      })
    },
  //下载excel
  downloadexcel: function(){
    wx.cloud.downloadFile({
      fileID: this.data.tempFileId,  // 填写云存储中的url
      success: res => {
        wx.openDocument({
          filePath: res.tempFilePath ,
          success: function (res){
            console.log('打开文档成功')
          }
        })
      },
      fail: err => {
       console.error('打开文档失败')
      }
    })
  },
  goToAdmin:function(){
    wx.navigateTo({
      url:`../admin/admin`
    })
  },
  goToVol:function(){
    wx.navigateTo({
      url:`../volunteer/volunteer`
    })
  },
  // 云数据库导入云端excel
  cdb2excel: function () {
    wx.cloud.callFunction({
      name: 'CDB2excel',
      data: {
        row: ['_id', '_openid','admin_name','admin_stu_grade','admin_stu_id','admin_stu_major'],
        dbname: 'admin'
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        console.log(res.result.fileID);
        this.setData({
          ['tempFileId']: res.result.fileID
        });
        // 下载打开文档
        this.downloadexcel()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
            title: '调用失败',
          })
          console.error('[云函数] 调用失败：', err);
          this.setData({
            ['tempFileId']: ''
          })
        }
      })
    },
    goToReleaseActivity:function(event){
      wx.navigateTo({
        url: `../ActivityManage_Create/ActivityManage_Create`
      })
    },
    goToSignedActivity:function(event){
      wx.navigateTo({
        url: `../AllActivity/AllActivity?data=${this.data.AdData.mySignedActivityList}&&id=${this.data.openid}`
      })
    },
    goToEditMsg:function(event){
      wx.navigateTo({
        url: `../EditMsg/EditMsg?data=${this.data.individualData}`
      })
    },
    getData() {
      let that = this;
      wx.cloud.database().collection('Volunteer').where({
        // _id: '${当前用户。。。id}'
        _id: this.data.openid,
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
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.initOperation()
    // this.data.individualData = JSON.parse(options.data);
    // console.log("individualData!!")
    // console.log(this.data.individualData); // 输出：123
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
