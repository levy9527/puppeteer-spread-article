const puppeteer = require('puppeteer')
const pageUrl = 'https://juejin.im'
const selectorTitle = '.title-input'
const selectorContent = '.ace_text-input'

puppeteer
  .launch({
    headless: false,
    userDataDir: __dirname + '/user-dir'
  })
  .then(browser => {
    browser.newPage().then(async page => {
      await page.setViewport({width: 1280, height: 800})
      await page.goto(pageUrl)

      try {
        const btnLogin = '.login'
        const btnGithub = '.oauth-bg:last-child .oauth-btn'

        await page.waitForSelector(btnLogin, {timeout: 1000})
        await page.click(btnLogin)
        await page.click(btnGithub)

        await page.waitFor(5000)
      } catch (e) {
        console.log('juejin no need to login')
      } finally {
        await page.click('.add-btn')
        await page.waitFor(3000)

        await page.type(selectorTitle, 'title')
        await page.type(selectorContent, 'content')
      }
    })
  })
