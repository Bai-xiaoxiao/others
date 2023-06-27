const axios = require('axios')
const fs = require('fs')
const cheerio = require('cheerio')
const dayjs = require('dayjs')
const path = require('path')

const todayHubNodes = [
  {
    id: '1',
    name: '微博',
    data: []
  },
  {
    id: '2',
    name: '百度',
    data: []
  },
  {
    id: '6',
    name: '知乎',
    data: []
  }
]

const getData = async () => {
  const today = dayjs().format('YYYY-MM-DD')
  const filePath = path.join(__dirname, `/data-${today}.json`)
  console.log(filePath);
  if(fs.existsSync(filePath)) {
    // 每天抓取一次
    return
  }

  const pageData = await axios.get('https://tophub.today/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
    }
  })
  const $ = cheerio.load(pageData.data)
  todayHubNodes.forEach(nodeItem => {
    const arr = []

    $(`#node-${nodeItem.id} .nano-content a`).each((i, el) => {
			arr.push({
        title: $(el).find('.t').text(),
        href: $(el).attr('href'),
        rank: i + 1,
        hot: $(el).find('.e').text()
      })
		})

    nodeItem.data = arr
  })

    // fs.unlinkSync('./todayHubData.json')
  fs.writeFileSync(filePath, JSON.stringify(todayHubNodes), 'utf-8')
}

const getHtml = () => {
  const today = dayjs().format('YYYY-MM-DD')
  const filePath = path.join(__dirname, `/data-${today}.json`)
  const arr = JSON.parse(fs.readFileSync(filePath), 'utf-8')
  let str = ''
  arr.forEach(node => {
    str += `<h2>${node.name}</h2>`
    str += '<ul>'
    node.data.forEach(item => {
      str += `<li><a href="${item.href}" target="_blank">${item.rank} -- ${item.title} -- ${item.hot}</a></li>`
    })
    str += '</ul>'
  })
  const htmlStr = `<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    ${str}
  </body>
  </html>`
  // fs.writeFileSync('zhihu.html', htmlStr, 'utf-8')
  return htmlStr
}

module.exports = async () => {
  await getData()
  return getHtml()
}


