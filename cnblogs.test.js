const puppeteer = require('puppeteer')
const pageUrl = 'https://i.cnblogs.com/EditPosts.aspx?opt=1'
const selectorTitle = '#Editor_Edit_txbTitle'
const selectorContent = '#Editor_Edit_EditorBody'

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

      await page.click('#Editor_Edit_APOptions_Advancedpanel1_cklCategories_0')
      await page.click(
        '#Editor_Edit_APOptions_APSiteHome_cbIsPublishToSiteHome'
      )
    })
  })
