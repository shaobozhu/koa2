const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const pg = require('pg')
const conString = "postgres://username:shaobo0411@localhost/dbname";
const client = new pg.Client(conString)

// app.use( async ( ctx ) => {
//   // const kitty = new Cat({ name: 'abc' })
//   // const res = await kitty.save()
//   // console.log('res===' + res)
//   // ctx.body = 'hello koa2'
// })

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa2'
  })
})
client.connect(function(err, res){
  if(err) {
    console.log('Error:'+ err)
    client.end();
    return ;
  }
  console.log('db connect success')
})
router.get('/json', async (ctx, next) => {

})
router.get('/string', async (ctx, next) => {
  let query = ()=>{
    return new Promise((resolve, reject) => {
      client.query('select * from test', function(error, results){
        if(error){
          reject({
            message: error
          })
        }
        resolve(results)
      })
    })
  }
  let result = await query();
  ctx.response.type = 'application/json;charset=UTF-8';
  ctx.body = result
})
// 注册路由
app.use(router.routes(), router.allowedMethods())

app.listen(9000, ()=>{
  console.log('server is running at http://localhost:9000')
})

// module.exports = app 