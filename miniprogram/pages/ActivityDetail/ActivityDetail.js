// pages/ActivityDetail/ActivityDetail.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: {},
    volunteer: {},
    a_id:'',
    openid:''
  },

    onEnrollTapHandler: async function() {
      try {
        if (this.data.volunteer && this.data.activity) {
          const resyn = await db.collection('Volunteer_Activity').where({
            volunteer_id:this.data.volunteer._id,
            activity_id:this.data.activity._id
          }).get();
          if(resyn.data[0]){
            wx.showToast({
              title: '请勿重复报名',
              icon: 'fail',
              duration: 2000
            })
          }else{
            const resa = await db.collection('Activity').where({
              _id:this.data.a_id
            }).get()
            console.log(resa.data[0])
            if(resa.data[0].activity_cur_people + 1 > resa.data[0].activity_max_people){
              wx.showToast({
                title: '报名人数超过限额',
                icon: 'fail',
                duration: 2000
              })
            }else if(resa.data[0].activity_check){
              wx.showToast({
                title: '本活动已结束',
                icon: 'fail',
                duration: 2000
              })
            }else{
              const res1 = await db.collection('Volunteer_Activity').add({
                data: {
                  volunteer_id: this.data.volunteer._id,
                  activity_id: this.data.activity._id,
                  enroll_time: new Date().toLocaleDateString(),
                  enroll_check: false,
                  check_time: null
                }
              });
              const res2 = await db.collection('Activity').doc(this.data.a_id).get();
              const cur=res2.data.activity_cur_people;
              const newCur=cur+1;
              const res3 = await db.collection('Activity').doc(this.data.a_id).update({
                data: {
                  activity_cur_people: newCur
               }
              })
              console.log(res1,res2,res3);
              wx.showToast({
                title: '报名成功',
                icon: 'success',
                duration: 2000
              })
            }
          }
        } else {
          console.log("志愿者或活动数据缺失。");
          wx.showToast({
            title: '报名失败',
            icon: 'fail',
            duration: 2000
          })
        }
      } catch (err) {
        console.log(err);
        wx.showToast({
          title: '报名失败',
          icon: 'fail',
          duration: 2000
        })
      }
    },
  
    onCancelEnrollTapHandler: async function(){
      try {
        const resyn = await db.collection('Volunteer_Activity').where({
          volunteer_id:this.data.volunteer._id,
          activity_id:this.data.activity._id
        }).get();
        if(!resyn.data[0]){
          wx.showToast({
            title: '您还未报名',
            icon: 'fail',
            duration: 2000
          })
        }else{
          const res1 = await db.collection('Volunteer_Activity').where({
            volunteer_id:this.data.volunteer._id,
            activity_id:this.data.activity._id
          }).limit(1).remove();
          const res2 = await db.collection('Activity').doc(this.data.a_id).get();
          const cur=res2.data.activity_cur_people;
          const newCur=cur-1;
          const res3 = await db.collection('Activity').doc(this.data.a_id).update({
            data: {
              activity_cur_people: newCur
           }
          })
          console.log(res1,res2,res3);
          wx.showToast({
            title: '取消报名成功',
            icon: 'success',
            duration: 2000
          })
        }
      } catch (err) {
        console.log(err);
        wx.showToast({
          title: '取消报名失败',
          icon: 'fail',
          duration: 2000
        })
      }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    try {
      wx.showLoading({
        title: '加载中',
      })
      // 1
      console.log(options)
      this.setData({
        a_id:options.a_id
      })
      // 2
      const openIdRes = await wx.cloud.callFunction({
        name: 'getOpenID'
      });
      console.log('当前用户的openid为：', openIdRes.result.openid)
      this.setData({
        openid:openIdRes.result.openid
      })

      const activityRes = await wx.cloud.callFunction({
        name:'getOneActivity',
        data: {
          a_id:this.data.a_id
        }
      });
      console.log(activityRes)
      this.setData({
        activity: activityRes.result.data
      });

      const volunteerRes = await wx.cloud.callFunction({
        name: 'getOneVolunteer',
        data: {
          _openid: this.data.openid
        }
      });
      console.log(volunteerRes)
      const volunteerArr=volunteerRes.result.data
      this.setData({
        volunteer: volunteerArr[0]
      });

      wx.hideLoading();
    } catch (err) {
      console.error(err);
      wx.hideLoading();
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
