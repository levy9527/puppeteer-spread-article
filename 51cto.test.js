const puppeteer = require('puppeteer')
const pageUrl = 'https://blog.51cto.com/blogger/publish'
const selectorTitle = '#title'
const selectorContent = '.CodeMirror > div > textarea'

puppeteer
  .launch({
    headless: false,
    userDataDir: __dirname + '/user-dir'
  })
  .then(browser => {
    browser.newPage().then(async page => {
      await page.setViewport({width: 1280, height: 800})
      await page.goto(pageUrl)

      await page.$eval(selectorTitle, el => (el.value = 'title'))
      await page.type(selectorContent, 'content')

      await page.hover('.pulldown-title')
      await page.waitForSelector('.pulldown-title.on')
      await page.click('.pulldown-title .pulldown-list li:first-child')

      await page.hover('.system-one')
      await page.waitForSelector('.system-one.on')
      await page.click('#system-one-list li:nth-child(5)')

      await page.waitFor(500)
      await page.hover('.system-two')
      await page.waitForSelector('.system-two.on')
      await page.click('#system-two-list li:nth-child(5)')
    })
  })
