// 引入模块后的app.js文件
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('./utils/log4js')
const router = require('koa-router')()
const koajwt = require('koa-jwt')
const util = require('./utils/util')
const users = require('./routes/users')
const blog = require('./routes/blog')
const ai = require('./routes/ai')
const bodyParser = require('koa-bodyparser')
// 解决 node koa post太长 request entity too large
app.use(bodyParser({
  formLimit: "10mb",
  jsonLimit: "10mb"
}));


// error handler
onerror(app)
//连接数据库
require('./config/db')

// middlewares(中间件)
app.use(bodyparser({ //解析报文
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// 获取静态资源中间件通过这个url获取==》http://127.0.0.1:8000/images/icon/qiankun.png
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  log4js.info(`get params:${JSON.stringify(ctx.request.query)}`)
  log4js.info(`post params:${JSON.stringify(ctx.request.body)}`)
  // await next().catch((err) => {
  //   if (err.status == '401') {
  //     ctx.status = 200;
  //     ctx.body = util.fail('Token认证失败', util.CODE.AUTH_ERROR)
  //   } else {
  //     throw err;
  //   }
  // })
  await next()
})

// app.use(koajwt({ secret: 'myBlog' }).unless({
//   path: [/^\/api\/users\/login/]
// }))

router.prefix("/api")

router.use(users.routes(), users.allowedMethods())
router.use(blog.routes(), blog.allowedMethods())
router.use(ai.routes(), ai.allowedMethods())

app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  log4js.error(`${err.stack}`)
});

module.exports = app
