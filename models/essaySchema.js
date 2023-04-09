// models\userSchema.js

const mongoose = require('mongoose')
const EssaySchema = mongoose.Schema({
  title: { type: String, default: '' },//标题
  picture: String, // 照片
  readingVolume: { type: Number, default: 0 },//阅读量
  likeNumber: { type: Number, default: 0 },//点赞数
  wordNumber: { type: Number, default: 0 },//字数
  commentsNumber: { type: Number, default: 0 },//评论数
  classfiy: Array,//分类
  label: Array,//标签
  content: { type: String, default: '' },//内容
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

module.exports = mongoose.model("essay", EssaySchema)