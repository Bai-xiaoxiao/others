const nodemailer = require('nodemailer')
const dayjs = require('dayjs')
const { getTuwei } = require('./tuwei.js')
const relativeTime = require('dayjs/plugin/relativeTime')
const puppeteerSpider = require('./puppeteerSpider.js')
const {unlinkSync, existsSync} = require('fs')
const schedule = require('node-schedule')

dayjs.extend(relativeTime)

const myEmail = '649780593@qq.com'
const test163 = 'bxd_002@163.com'
const xyz = '1826894842@qq.com'

const send = async () => {
	const transporter = nodemailer.createTransport({
		service: 'qq', //  邮箱
		secure: true, //  安全的发送模式
		auth: {
			user: myEmail, //  发件人邮箱
			pass: 'gznbxeygigyxbfea', //  授权码
		},
	})

	// 网上爬个土味情话
	const tuweitext = await getTuwei()

	// 天气和黄历
  // 如果是发送失败了，不用再次去请求
  if(!existsSync('./huangli.png')) {
	  await puppeteerSpider()
  }

	// 每周的文案提示
	const weekday = {
		1: {
			tip: '今天是周一，坐牢的第一天',
		},
	}

	transporter.sendMail(
		{
			// 发件人邮箱
			from: myEmail,
			// 邮件标题
			subject: `我们相识的第${dayjs().diff(
				dayjs('2015-10-28'),
				'day'
			)}天，我每天都如此喜欢你`,
			// 目标邮箱
			to: xyz,
			// 邮件内容
			// text: ,
			html: `
            <div style="text-align:center;"><h2 style="color: crimson;">${tuweitext}</h2>
              <br/><br/>
              <h4>今天天气很好，你也很好</h4>
              <img src="cid:tianqi" />
              <h4>大吉大利，黄历奉上</h4>
              <img src="cid:huangli" />
            </div>
          `,
			attachments: [
				{
					filename: 'tianqi.png',
					path: './tianqi.png',
					cid: 'tianqi', //same cid value as in the html img src
				},
        {
					filename: 'huangli.png',
					path: './huangli.png',
					cid: 'huangli', //same cid value as in the html img src
				},
			],
		},
		(err, data) => {
			if (err) {
				console.error(err)
        // 失败之后重试
        send()
			} else {
        // 成功之后删除图片
        unlinkSync('./tianqi.png')
        unlinkSync('./huangli.png')
				console.log('邮件发送成功！！！')
			}
		}
	)
}

let rule = new schedule.RecurrenceRule();
rule.hour = 8
rule.minute = 20

let job = schedule.scheduleJob(rule, () => {
  console.log('触发定时任务，当前时间是：' + dayjs().format('YYYY-MM-DD HH:mm:mm'))
  send()
})
// send()
