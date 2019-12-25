const puppeteer = require("puppeteer");
const pageUrl = "https://forum.vuejs.org/c/chinese";
const selectorTitle = "#reply-title";
const selectorContent = ".ember-text-area";
const btnLogin = ".login-button";
const btnGithub = ".btn-social.github";

puppeteer
  .launch({
    headless: false,
    userDataDir: __dirname + "/user-dir"
  })
  .then(browser => {
    browser.newPage().then(async page => {
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(pageUrl);

      if ((await page.$(btnLogin)) !== null) {
        await page.click(btnLogin);

        await page.waitForSelector(btnGithub);
        await page.click(btnGithub);

        await page.waitFor(3000);
      }

      await page.click("#create-topic");
      await page.waitFor(500);

      await page.type(selectorTitle, "title");
      await page.type(selectorContent, "content");
    });
  });
