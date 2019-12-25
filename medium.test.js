const puppeteer = require('puppeteer')
const pageUrl = 'https://medium.com/new-story'
const selectorTitle = '.graf--title'
const selectorContent = '.section-inner > p'

puppeteer
  .launch({
    headless: false,
    userDataDir: __dirname + '/user-dir'
  })
  .then(browser => {
    browser.newPage().then(async page => {
      await page.setViewport({width: 1280, height: 800})
      await page.goto(pageUrl)

      await page.$eval('.graf--title', el => (el.innerText = 'title'))
      await page.type(selectorContent, 'content')
    })
  })
