const puppeteer = require('puppeteer');
const pageUrl = 'https://my.oschina.net/u/2414419/blog/write'
const selectorTitle = 'input[name=title]'
const selectorContent = '.CodeMirror-wrap textarea'

puppeteer.launch({
	headless: false,
	userDataDir: __dirname + '/user-dir'
}).then(browser => {
	browser.newPage().then(async page => {
	  await page.setViewport({ width: 1280, height: 800 })
		await page.goto(pageUrl)

		await page.type(selectorTitle, 'title')
		await page.type(selectorContent, 'content')

		await page.click('#bodyEditorWrap + .fields .selection')
		await page.waitForSelector('.selection.visible .menu.visible .item')
		await page.click('.selection.visible .menu.visible .item:nth-child(2)')
	})
})
