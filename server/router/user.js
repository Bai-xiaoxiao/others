const express = require('express')
const fs = require('fs')
const {sendJson} = require('../utils/requestUtils')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('user-router')
})

router.post('/register', (req, res) => {
  // 模拟注册流程
  const {username, password} = req.body
  const filePath = 'database/user.json'
  if(!username || !password) {
    res.status(500).send({
      message: '账号豁密码错误'
    })
    return
  };
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  if(users.find(i => i.username === username)) {
    res.status(500).send({message: "用户名已存在"})
  } else {
    users.push({
      id: users.length,
      username,
      password
    })
    fs.writeFileSync(filePath, JSON.stringify(users), 'utf-8')
    res.send({message: "创建成功"})
  }
})

router.post('/login', (req, res) => {
  const {username, password} = req.body
  const filePath = 'database/user.json'

  if(!username || !password) {
    sendJson(res, '信息不完整', 500)
    return
  }

  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  if(!users.find(i => i.username === username && i.password === password)) {
    sendJson(res, '账号豁密码错误', 500)
    return
  }

  res.send({
    message: '登录成功'
  })
})

module.exports = router