// 云函数入口文件
const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx');

cloud.init({ 
  env: "cloud1-1ggg6bk6e63161e3"
}) // 使用当前云环境

const db = cloud.database();
let jsonData = []

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 1.从数据库中读取数据
  const countResult = await db.collection(event.dbname).count()
  const total = countResult.total
  for(let i=0;i<total;i++){
    await db.collection(event.dbname).skip(i).limit(1).get().then(res=>{
      if(i!=0){
        jsonData=jsonData.concat(res.data)
      }else{
        jsonData=res.data
      }
    })
  }
  // 2.格式化数据
  let alldata = []
  let row = event.row
  alldata.push(row)  // 列名导入到数组中
  for(let i in jsonData){
    let newitem = []
    for(let j=0;j<row.length;j++){
      newitem = newitem.concat(jsonData[i][row[j]])
      // console.log(i+"  "+newitem)
    }
    alldata.push(newitem)
  }
  // 3.存储为excel
  var buffer = await xlsx.build([{
    name: 'sheet',
    data: alldata
  }])

  return await cloud.uploadFile({
    cloudPath: 'cdb2exceltest.xlsx',
    fileContent: buffer, //excel二进制文件
  })
}

  


