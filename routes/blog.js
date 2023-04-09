/**
 * 用户管理模块
 */
const router = require('koa-router')()
const util = require('../utils/util')
const blogApi = require('../service/blog')
const log4js = require('../utils/log4js')

router.prefix('/blog')

// 获取全部文章
router.get('/list', async (ctx) => {
  try {
    const param = ctx.query //获取get请求参数
    const res = await blogApi.getBlogList(param)
    ctx.body = util.success(res)
  } catch (error) {
    ctx.body = util.fail(error.message)
  }
})

// 新建文章
router.post('/add', async (ctx) => {
  try {
    const data = ctx.request.body; //获取发送的请求参数
    const res = await blogApi.addBlog(data)
    ctx.body = util.success(res)
  } catch (error) {
    ctx.body = util.fail(error.message)
  }
})
// 获取全部类型
router.get('/getClassfig', async (ctx) => {
  try {

    const param = ctx.query //获取get请求参数

    const classfiyList = await blogApi.getClassfiyList(param)
    let list = []
    classfiyList.forEach(v => {
      list = [...list, ...v.classfiy]
    })
    list = Array.from(new Set(list))
    const res = await blogApi.getPictureList(list)
    let result = JSON.parse(JSON.stringify(res))
    result.forEach(v => {
      v.path = (`${global.NODE_API}` + '/images/icon/' + v.fileName)
      // v.path = ('http://10.4.95.50:8000' + '/images/icon/' + v.fileName)
    })
    ctx.body = util.success(result)
  } catch (error) {
    ctx.body = util.fail(error.message)
  }
})
module.exports = router
