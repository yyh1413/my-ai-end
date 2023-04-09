
const EssaySchema = require('../..//models/essaySchema')
const PictureSchema = require('../../models/pictureSchema')
const util = require('../../utils/util')

//新增文章
async function addBlog(param) {
  //增加数据
  const dto = new EssaySchema({ ...param })
  await dto.save()
  return '保存成功'
}
//获取文章  传id获取单条   不传获取全部
async function getBlogList(param) {
  let res
  if (param._id) {
    return await EssaySchema.findOne({ ...param })
  } else if (param.classfiyName) {
    res = await EssaySchema.find().where('classfiy').regex(param.classfiyName)
  } else if (param.type) {
    res = await EssaySchema.find({ title: { $regex: param.title.trim(), $options: "$i" } })
      .sort({ createTime: param.type == 0 ? 'asc' : 'desc' })
  }
  else {
    res = await EssaySchema.find().sort({ createTime: -1 })
  }
  res?.forEach(v => {
    v.content = util.delHtmlTag(v.content).slice(0, 60)
  })
  return res
}

/**
 * 获取分类信息
 * @param {*}  
 * @returns 
 */
async function getClassfiyList(param) {

  let res = await EssaySchema.find({}).select('classfiy').where('classfiy')

  return res
}
/**
 * 获取图片信息
 * @param {*}  
 * @returns 
 */
async function getPictureList(param) {

  let res = await PictureSchema.find({ type: 0 }).where('classfiyName').in(param).select('classfiyName fileName')


  return res
}
module.exports = { addBlog, getBlogList, getClassfiyList, getPictureList }