// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取数据库引用
    const db = cloud.database()
    // 获取基础信息
    const wxContext = cloud.getWXContext();
    const openid=wxContext.OPENID;

    // 查询openid对应的volunteer_id
    const VolunteerRes = await db.collection('Volunteer').where({
      _openid: openid
    }).get();

    // 将openid对应的_id保存到一个变量volunteer_id
    const volunteer_id = VolunteerRes.data[0]._id;

    // 根据志愿者编号从Volunteer_Activity表中查找参加过的所有活动编号
    const { data: volunteerActivities } = await db.collection('Volunteer_Activity').where({
        volunteer_id: volunteer_id
      }).get()

    // 返回活动信息
    return {
      code: 0,
      message: '查询成功',
      data: volunteerActivities
    }
  } catch (err) {
    // 返回错误信息
    return {
      code: -1,
      message: '查询失败',
      error: err
    }
  }
}
