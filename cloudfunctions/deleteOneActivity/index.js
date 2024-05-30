// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取数据库引用
    const db = cloud.database()
    const _id = event.a_id;

    // 查询数据
    const result = await db.collection('Activity').doc(_id).remove();

    // 返回查询结果
    return result
  } catch (error) {
    // 返回错误信息
    return error
  }
}