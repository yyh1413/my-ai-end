// models\userSchema.js

const mongoose = require('mongoose')
const PictureSchema = mongoose.Schema({
  classfiyName: String, // 照片
  fileName: String,
  userId: {
    type: String,
    default: '001'
  },//用户ID
  userName: {
    type: String,
    default: 'yang'
  },//用户名称
  createTime: {
    type: Date,
    default: Date.now()
  },//创建时间

  updateTime: {
    type: Date,
    default: Date.now()
  },//更新时间
  remark: { type: String, default: '' } // 备注
})

module.exports = mongoose.model("pictures", PictureSchema)