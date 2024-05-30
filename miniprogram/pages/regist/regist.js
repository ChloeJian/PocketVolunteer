// pages/regist/regist.js
Page({
  data: {
  name: '',
  num: '',
  zhuanye: '',
  grade:'',
  individualData: {  }
  },
  onLoad: async function(options) {
    const openIdRes = await wx.cloud.callFunction({
      name: 'getOpenID'
    });
    console.log('当前用户的openid为：', openIdRes.result.openid)
   this.data.openid=openIdRes.result.openid
   console.log("options")
   console.log(options)
  // this.initOperation()
  this.data.individualData = JSON.parse(options.data);
  console.log("individualData")
  console.log(this.data.individualData)
   },

  //获取用户名
  getName(event) {
  console.log('获取输入的用户名', event.detail.value)
  this.setData({
   name: event.detail.value
  })
  },
  //获取用户学号
  getnum(event) {
  console.log('获取输入的账号', event.detail.value)
  this.setData({
   num: event.detail.value
  })
  },
  // 获取zhuanye
  getzhuanye(event) {
  console.log('获取zhuanye', event.detail.value)
  this.setData({
   zhuanye: event.detail.value
  })
  },
  getgrade(event) {
    console.log('获取grade', event.detail.value)
    this.setData({
     grade: event.detail.value
    })
    },
  
  //注册
  regist() {
    let name = this.data.name
    let num = this.data.num
    let zhuanye = this.data.zhuanye
    let grade = this.data.grade
    console.log("点击了注册")
    console.log("name", name)
    console.log("num", num)
    console.log("zhuanye",zhuanye)
    console.log("grade",grade)
    //校验用户名
    if (name.length < 2) {
     wx.showToast({
      icon: 'none',
      title: '姓名至少2位',
     })
     return
    }
    if (zhuanye.length < 2) {
      wx.showToast({
       icon: 'none',
       title: '专业至少两个字',
      })
      return
     }
    if (name.length > 4) {
     wx.showToast({
      icon: 'none',
      title: '姓名最多4位',
     })
     return
    }
    //校验账号
    if (num.length < 4) {
     wx.showToast({
      icon: 'none',
      title: '学号至少4位',
     })
     return
    }
    //注册功能的实现
    wx.cloud.database().collection('Volunteer').where({
      _openid:this.openid
    }).update({
     data: {
      volunteer_name: name,
      volunteer_stu_id: num,
      volunteer_stu_major: zhuanye,
      volunteer_credit:90,
      volunteer_hour:0,
      volunteer_reputation:0,
      volunteer_stu_grade:grade
     },

     success(res) {
      console.log('注册成功，请重新登录', res)
       // 在当前页面中设置需要传递的参数
       // var pages = getCurrentPages();
       // var prevPage = pages[pages.length - 2]; // 获取上一个页面实例对象
       // prevPage.setData({
       //   message: this.data.individualData
       // });
        // 在 B 页面返回 A 页面并传递参数
        // 在当前页面调用 navigateBack 方法返回上一页并携带参数
        // wx.navigateBack({
        //   delta: 1,
        //   success: function() {
        //     console.log('返回成功');
        //   }
        // });
        wx.showToast({
         title: '注册成功',
        })
        wx.reLaunch({
          url: '/pages/Home/Home'
        })
      


     },
     fail(res) {
      console.log('注册失败', res)
     }
    })
  },
  //保存按钮
  formSubmit:function(e){
    //表单返回的所有数据
    var formData=e.detail.value;
    this.regist(formData)
  },
  })
  