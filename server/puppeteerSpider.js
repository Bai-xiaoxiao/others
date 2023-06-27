const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve=>setTimeout(resolve, ms))
}


// 获取天气截图--默认新都
const gettianqi = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://tianqi.2345.com/');

  await sleep(2000)

  await page.click('#js_cascadeDisable', {delay: 2000})

  const area = await page.$$('.cascade-box-select')

  await area[2].click({delay: 2000})

  await page.click('#js_countyCascade li a[dataval="60912"]')

  await page.click('#js_addDefaultCity', {delay: 200})

  await sleep(2000)

  // 截取单个组件的图
  const weatherCon = await page.$('.banner-right-con')
  await weatherCon.screenshot({
    path: './tianqi.png',
  })

  await page.close()
}

// 获取黄历
const gethuangli = async (browser) => {
  // 这个网站会默认展示今天的黄历
  const page = await browser.newPage();
  await page.goto('https://www.huangli.com/');

  await sleep(2000)

  const imgarea = await page.$('.lunars-b')

  await imgarea.screenshot({
    path: './huangli.png'
  })

  await page.close()
}

const puppeteerSpider = async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: {
      width: 1580,
      height: 860
    }
    // executablePath: '../../../../Applications/Chrome Apps.localized'
  });

  await gettianqi(browser)

  await gethuangli(browser)

  console.log('天气、黄历已生成截图！！！')

  await browser.close()
}

module.exports = puppeteerSpider