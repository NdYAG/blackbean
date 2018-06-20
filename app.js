const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

const app = new Koa()
const router = new Router()

// { "command": "" }
router.post('/call', async ctx => {
  const body = JSON.parse(ctx.request.body)
})

app.use(logger())
app.use(
  bodyParser({
    enableTypes: ['text', 'json', 'form']
  })
)
app.use(router.routes())

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at ${port}`)
})
