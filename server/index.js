// 感谢教程：https://mp.weixin.qq.com/s/xF_tuhNrpVFZ_w11v9-Jdw
const express = require('express')
const getNews = require('./utils/getNews')
const userRouter = require('./router/user')

const app = express()

// 要解析post请求的body中的信息就需要这段--还需要在post请求中指定{"Content-Type": "application/json"}
app.use(express.json())

// 如果要处理表单请求
// 表单请求为get或者post都有可能，浏览器发起表单请求编码为application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true
  })
);

// 主页
app.get('/', (req, res) => {
  res.send('hello world')
})

// 每日新闻
app.get('/news', async (req, res) => {
  const data = await getNews()
  res.send(data)
})

// 登录
app.get('/login', (req, res) => {
  res.set('Content-Type', 'application/json')
  // 便捷设置如下，结果等同
  // res.type('application/json');

  res.send({status: 0, message: '成功'})
})

// 重定向
app.get('/redirect', (req, res) => {
  // 重定向
  res.redirect('https://baidu.com')
})

// 下载文件
app.get('/download', (req, res) => {
  // 下载
  res.download('./view/1.html')
})

app.use('/user', userRouter)

// 未配置的路由都还进入这里
app.get('*', (req, res) => {
  res.status(404).send('ohhhhhhhhhhhhhhh it\'s not found')
  // 便捷设置如下，结果等同
  // res.sendStatus(404)
})

// 静态资源服务
// app.use(express.static('view'))

app.listen('3333', () => {
  console.log('服务成功启动，请访问：localhost:3333');
})