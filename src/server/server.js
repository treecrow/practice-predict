// ------------------------------模块引入------------------------------
// core
const path = require('path')

// koa
const Koa = require('koa')
const views = require('koa-views')
const static = require('koa-static')
const cors = require('koa2-cors')
const Router = require('koa-router')

// graphql
const graphqlHTTP = require('koa-graphql')
const {
  graphql
} = require('graphql')
const {
  schema,
  queryList
} = require('./graphql')

// middleware
const uploadFile = require('./sundry/uploadFile')

// ------------------------------准备------------------------------
const app = new Koa()
const router = new Router()

// ------------------------------开始------------------------------
// 允许跨域
app.use(cors({
  origin: 'http://localhost:9000',
  credentials: true,
}))

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

// 设置静态文件服务
app.use(static(path.join(__dirname, '../../static'), {
  defer: true
}))


// 路由
router.post('/upload', uploadFile).get('/test', async (ctx) => {
  await ctx.render('test')
}).get('/apiList', async (ctx) => {
  let graphqlApiList = []
  for (let query of queryList) {
    graphqlApiList.push({
      query,
      result: await graphql(schema, query)
    })
  }
  await ctx.render('graphql', {
    graphqlApiList
  })
}).all('/graphql', graphqlHTTP((ctx) => {
  const startTime = Date.now()
  return {
    schema: schema,
    graphiql: true,
    extensions({
      document,
      variables,
      operationName,
      result
    }) {
      return {
        runTime: Date.now() - startTime
      }
    },
    formatError: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.originalError && error.originalError.state,
      oldStack: error.stack,
      path: error.path
    })
  }
}));

app.use(router.routes()).use(router.allowedMethods())

// ------------------------------监听------------------------------

process.on('unhandledRejection', (err, p) => {
  // ...
})

app.listen(3000)

console.log('starting at port 80')
