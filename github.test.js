const puppeteer = require('puppeteer')
const pageUrl = 'https://github.com/levy9527/blog/issues/new'
const selectorTitle = '#issue_title'
const selectorContent = '#issue_body'

puppeteer
  .launch({
    headless: false,
    userDataDir: __dirname + '/user-dir'
  })
  .then(browser => {
    browser.newPage().then(async page => {
      await page.setViewport({width: 1280, height: 800})
      await page.goto(pageUrl)

      await page.type(selectorTitle, 'title')
      await page.type(selectorContent, 'content')
    })
  })
