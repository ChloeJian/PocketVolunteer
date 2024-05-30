// pages/volunteer/volunteer.js
const  db = wx.cloud.database();
// const XLSX = require('../utils/excel.js');
let currentPage = 0; // 当前第几页,0代表第一页 
let pageSize = 5; //每页显示多少数据 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [], //放置返回数据的数组  
    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false, //“没有数据”的变量，默认false，隐藏  
    tempFileId: ''  //零时下载excel的fileId
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

    // 云数据库导入云端excel
    cdb2excel: function () {
      wx.cloud.callFunction({
        name: 'CDB2excel',
        data: {
          row: ['_id', '_openid','volunteer_credit','volunteer_hour','volunteer_name','volunteer_reputation','volunteer_stu_grade','volunteer_stu_id','volunteer_stu_major'],
          dbname: 'Volunteer'
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

  insert: function(){ //插入
    db.collection('Volunteer').add({
      data: {
        volunteer_credit: 80,
        volunteer_hour: 80,
        volunteer_name: '羽欧',
        // volunteer_openid: '0h7766666"
        volunteer_reputation: 78,
        volunteer_stu_grade: '2022',
        volunteer_stu_id: '20042099012',
        volunteer_stu_major: '计算机科学与技术'
      },
      }).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
  },

  delete: function(e){  //删除
    db.collection('Volunteer').where({
      _id: e.currentTarget.dataset.id
    }).remove()
    .then(res=>{
      console.log(res);
      console.log(e.currentTarget.dataset.id);
      this.data.dataList.pop(e.currentTarget.dataset.id);
      this.setData({
        dataList: this.data.dataList
      });
    }).catch(err=>{
      console.error(err);
      console.log(id);
    })
  },

  //访问网络,请求数据  
  getData() {
    let that = this;
    //第一次加载数据
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }
    //云数据的请求
    wx.cloud.database().collection("Volunteer")
      .skip(currentPage * pageSize) //从第几个数据开始
      .limit(pageSize)
      .get({
        success(res) {
          if (res.data && res.data.length > 0) {
            console.log("请求成功", res.data)
            currentPage++
            //把新请求到的数据添加到dataList里  
            let list = that.data.dataList.concat(res.data)
            that.setData({
              dataList: list, //获取数据数组    
              loadMore: false //把"上拉加载"的变量设为false，显示  
            });
            if (res.data.length < pageSize) {
              that.setData({
                loadMore: false, //隐藏加载中。。
                loadAll: true //所有数据都加载完了
              });
            }
          } else {
            that.setData({
              loadAll: true, //把“没有数据”设为true，显示  
              loadMore: false //把"上拉加载"的变量设为false，隐藏  
            });
          }
        },
        fail(res) {
          console.log("请求失败", res)
          that.setData({
            loadAll: false,
            loadMore: false
          });
        }
      })
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
    console.log("上拉触底事件")
    let that = this
    if (!that.data.loadMore) {
      that.setData({
        loadMore: true, //加载中  
        loadAll: false //是否加载完所有数据
      });

      //加载更多，这里做下延时加载
      setTimeout(function() {
        that.getData()
      }, 2000)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})