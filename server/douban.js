const axios = require('axios')
const cheerio = require('cheerio');
const fs = require('fs')

let start = 0
const arr = []

const getData = () => {
  axios.get(`https://movie.douban.com/top250?start=${start}`, {
    headers: {
      'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    }
  }).then(res => {
    const $ = cheerio.load(res.data)
    $('.grid_view .item').each((idx, item) => {
      arr.push({
        title: $(item).find('.title').text(),
        rank: idx + start
      })
    })

    start += 25

    if(start < 50) {
      getData()
    } else {
      fs.writeFileSync('./douban.json', JSON.stringify(arr), 'utf-8')
    }
  })
}

getData()

