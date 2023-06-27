const axios = require('axios')
const cheerio = require('cheerio')

let start = parseInt(Math.random()*100)

const getTuwei = () => {
  return axios.get(`https://www.nanss.com/yulu/2492.html`, {
    headers: {
      'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    }
  }).then(res => {
    const $ = cheerio.load(res.data)

    const text = $('.content p').eq(start).text().split('、')[1]

    console.log('土味情话获取成功!!!')
    return text
  })
}

module.exports = {
  getTuwei
}