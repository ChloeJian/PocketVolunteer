const db=wx.cloud.database();
Component({

  /**
   * 页面的初始数据
   */
  data: {
    myAllActivityList:[],
    myUnsignedActivityList:[],
    mySignedActivityList:[],
    currentActivityList:[],
    individualData: {},
    Data:{
      userInfo:{},
      myAllActivityList:[],
      myUnsignedActivityList:[],
      mySignedActivityList:[]
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
        Data: newVal,
      })
    }
  },
  methods: {
  gotoDetail:function(event){
    wx.navigateTo({
      url: `../ActivityDetail/ActivityDetail?a_id=${event.target.dataset.a_id}`
    })
  },

  

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
    wx.showModal({
      title: '联系客服',
      content: 'TEL:123456 (没事不要联系我!)',
      showCancel: false,
      confirmText: '确定'
    })
  },
    
  showSigned: function(){
    this.setData({
      currentActivityList:this.data.mySignedActivityList
    })
  },
  goToAllActivity:function(){
    console.log("tap!")
    wx.navigateTo({
      url: `../AllActivity/AllActivity?data='All'`
    })
  },
  goToUnsignedActivity:function(){
    wx.navigateTo({
      url: `../AllActivity/AllActivity?data='Unsigned'`
    })
  },
  goToSignedActivity:function(){
    wx.navigateTo({
      url: `../AllActivity/AllActivity?data='Signed'`
    })
  },
  goToEditMsg:function(event){
    // console.log(this.data.individualData._openid)
    wx.navigateTo({
      url: `../EditMsg/EditMsg?data=${JSON.stringify(this.data.individualData)}&&id=${this.data.individualData._openid}`
    })
  },
  exitLogin:function(){
    this.triggerEvent('changeValue', '')
    wx.navigateTo({
      url: `../my/my`
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
})
