// pages/my/my.js
const db = wx.cloud.database();
const open_id = wx.getStorageSync('open_id');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myAllActivityList:[],
    myUnsignedActivityList:[],
    mySignedActivityLIst:[],
    currentActivityList:[],
    activity: {},
    volunteer: {},
    a_id:'',
    openid:'',
    identity: '',
    Data:{
      userInfo:{},
      myAllActivityList:[],
      myUnsignedActivityList:[],
      mySignedActivityLIst:[]
    },
    AdData:{
      userInfo:{},
      myAllActivityList:[],
      myUnsignedActivityList:[],
      mySignedActivityLIst:[]
    }
  },
  adminlogin(){
    wx.cloud.database().collection('admin').where({
      _openid: this.openid
    }).get({
      success:res=>{
        if (!res.data[0]) {
          //不是管理员时
          wx.showToast({
            title: '您没有管理权限',
          })
        }
        else {
          wx.showToast({
            title: '登录成功',
          })
          this.setData({
            identity:'admin',
            'AdData.userInfo': res.data[0]
          })
        }
      }
    })
  },
  
  
  initOperation:async function () {
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
        'AdData.allActivityList': all,
        'AdData.currentActivityList': all,
        'AdData.unsignedActivityList': no,
        'AdData.signedActivityList': yes,
      })
      wx.hideLoading()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },
  handleChangeValue: function(event) {
  // 更新变量的值
  this.setData({
      identity: event.detail
    })
  },
  login() {
   console.log("调用了login函数")
    wx.getUserProfile({
      desc: '获取用户信息',
      success: res => {
        console.log(res.userInfo)
        var user = res.userInfo
        //设置全局用户信息
        //设置局部用户信息
        this.setData({
          'Data.userInfo': user
        })

        //将数据添加到数据库
        wx.cloud.database().collection('Volunteer').where({
          _openid: this.openid
        }).get({
          success:res=>{
            if (!res.data[0]) {
              //将数据添加到数据库
              wx.cloud.database().collection('Volunteer').add({
                data: {
                  volunteer_name: user.nickName
                },
                success: res => {
                  wx.navigateTo({
                    url: `/pages/regist/regist?data=` + JSON.stringify(res.data[0])
                  })
                  
                }
               
                
              })
            } 
            else {
              //已经添加过了
              this.setData({
                userInfo: res.data[0]
              })
              if(res.data[0].volunteer_stu_id==null)
              {
                wx.navigateTo({
                  url: '/pages/regist/regist?data='+JSON.stringify(res.data[0])
                })
              }
              else{
                console.log("登陆成功！！")
                wx.showToast({
                  title:'登录成功'
                })
                this.setData({
                  identity:'user',
                  'Data.userInfo': res.data[0]
                })
                app.globalData = this.data.Data.userInfo
                console.log(this.data.identity)
                console.log(this.data.Data.userInfo)
                // wx.navigateTo({
                //   url: `../ActivityPer/ActivityPer?data=`+JSON.stringify(res.data[0])
                // })
                
              }
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const openIdRes = await wx.cloud.callFunction({
      name: 'getOpenID'
    });
    console.log('当前用户的openid为：', openIdRes.result.openid)
   this.openid=openIdRes.result.openid
   this.initOperation()
   console.log("my:options.indentity")
   console.log(options.identity)
   console.log(typeof options.identity)
   if(options.identity === "'admin'") {
     this.adminlogin();
   }
   if(options.identity === "'user'") {
     console.log("yess")
     console.log("登陆成功！！")
     wx.showToast({
       title:'登录成功'
     })
     console.log("全局变量")
     console.log(app.globalData)
     this.setData({
       identity:'user',
       'Data.userInfo': app.globalData
     })
   }

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