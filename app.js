const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const config = require('./config')

const app = new Koa()
const router = new Router()

// { "command": "", "token": "" }
router.post('/call', async ctx => {
  const body = ctx.request.body
  const { command, token } = body
  ctx.assert(token === config.token, 401, 'Unauthorized')
  ctx.assert(config.commands.includes(command), 404, 'Command not found')
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
