const puppeteer = require('puppeteer');
const pageUrl = 'https://mp.csdn.net/mdeditor?not_checkout=0#'
const selectorTitle = '.article-bar__title--input'
const selectorContent = '.editor__inner'

puppeteer.launch({
	headless: false,
	userDataDir: __dirname + '/user-dir'
}).then(browser => {
	browser.newPage().then(async page => {
	  await page.setViewport({ width: 1280, height: 800 })
		await page.goto(pageUrl)

    const selectorHand = '.middle-hand > button'
		await page.waitForSelector(selectorHand)
		await page.click(selectorHand)
		
		await page.$eval(selectorTitle, el => el.value = 'title')

		await page.$eval(selectorContent, el => el.innerText = '')
		await page.type(selectorContent, 'content')

	})
})
