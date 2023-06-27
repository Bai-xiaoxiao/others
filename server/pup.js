const puppeteer = require('puppeteer');

// 使用puppeteer做一些自动化的操作
// 采集数据，模仿填写表单之类的，如果是只想获取数据，那么使用api请求+cheerio就可以了
// puppeteer更多的是做一些操作
// 一些doc：https://zhuanlan.zhihu.com/p/624900686?utm_id=0
// https://puppeteer.bootcss.com/api#class-jshandle

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://movie.douban.com/top250');

  // await page.screenshot({path: 'example.png'});

  // await page.$$('')

  // await page.click('#su')

  // setTimeout(async () => {
  //   await browser.close();
  // }, 30000);
})();