const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const app = new Koa()
const router = new Router()

// { "command": "" }
router.post('/call', async ctx => {
  const body = ctx.request.body
  // TODO: white list of command
  const { command } = body
  const { stdout, stderr } = await exec(`python BlackBeanControl/BlackBeanControl.py -c '${command}'`)
  ctx.body = 'ok'
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
