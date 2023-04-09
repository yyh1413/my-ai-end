/**
 * 用户管理模块
 */
const router = require('koa-router')()
const util = require('../utils/util')
const aiApi = require('../service/ai')

router.prefix('/ai')

router.get('/getdata', async (ctx) => {
  try {
    const param = ctx.query //获取get请求参数
    const res = await aiApi.getAiData(param)
    const va = res.data.choices[0].text
    ctx.body = util.success(va)
  } catch (error) {
    ctx.body = util.fail(error.message)
  }
})
router.get('/text', async (ctx) => {
  try {
    const param = ctx.query //获取get请求参数
    ctx.body = util.success('hello wrod  aws')
  } catch (error) {
    ctx.body = util.fail(error.message)
  }
})
module.exports = router
