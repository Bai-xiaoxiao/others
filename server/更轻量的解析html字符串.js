const axios = require('axios')
const fs = require('fs')
const cheerio = require('cheerio');

axios
	.get('https://tophub.today/', {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
		},
	})
	.then(pageData => {
		const $ = cheerio.load(pageData.data)

		const result = []
		$('#node-6 .nano-content a').each((i, el) => {
			result.push({
        title: $(el).find('.t').text(),
        href: $(el).attr('href')
      })
		})

    // fs.writeFileSync('./zhihulist.json', JSON.stringify(result), 'utf-8')
	})
