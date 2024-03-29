// 复杂点的文章，很多网站会格式错乱
// https://www.yuque.com/deepexi-serverless/component-ulh7va/lgloen
// 1.```markdown ```vue``` ```
// 2.```js 这里添加多行注释```
// 3.代码里含有换行的{}, 这样所有新内容都会在尖括号里面
// 4.yaml/sh文件有缩进, 造成缩进混乱
// 解决方案：把以上内容变成图片, 对第4点，如果只有一层缩进，也可以把缩进消除，达到格式不错乱的目的
// 总结：以下网站中知乎的markdown解析器是最差的， medium也一样，只要出现代码块，后面的内容就全在代码里出不来了
// 另：知乎可以导入文档; 但不能显示在线图片，也即![]()语法无效。
module.exports = [
  // 登录状态保持时间较短, 有时可能需要重新登录两次
  {
    //url: 'https://hacpai.com/post?type=0',
    selectorTitle: '#articleTitle',
    selectorContent: '.vditor-textarea',
    beforeWriting: async page => {
      const btnLogin = '.navLogin'
      const btnGithub = '.verifyOauthBtn'

      try {
        await page.waitForSelector(btnLogin, {timeout: 500})
        await page.click(btnLogin)

        await page.waitForSelector(btnLogin, {timeout: 500})
        await page.click(btnGithub)

        await page.waitFor(8000)
      } catch (e) {
        console.log('hacpai no need to login')
      }
    },
    extraOperations: async page => {
      await page.click('#showReward')
    }
  },
  {
    //url: 'https://forum.vuejs.org/c/chinese',
    selectorTitle: '#reply-title',
    selectorContent: '.ember-text-area',
    beforeWriting: async page => {
      const btnLogin = '.login-button'
      const btnGithub = '.btn-social.github'

      try {
        // 登录
        await page.waitForSelector(btnLogin, {timeout: 100})
        await page.click(btnLogin)

        // 使用 github 账号
        await page.waitForSelector(btnGithub, {timeout: 500})
        await page.click(btnGithub)

        await page.waitFor(3000)
      } catch (e) {
        console.log('forum.vuejs: no need to login')
      } finally {
        await page.click('#create-topic')
        await page.waitFor(500)

        //await page.click('.toggle-fullscreen')
      }
    }
  },
  // 有时图片会上传失败
  {
    //url: 'https://github.com/levy9527/blog/issues/new',
    selectorTitle: '#issue_title',
    selectorContent: '#issue_body'
  },
  {
    url: 'https://segmentfault.com/write?freshman=1',
    selectorTitle: '#title',
    selectorContent: '.CodeMirror-wrap textarea'
  },
  {
    //url: 'https://my.oschina.net/u/2414419/blog/write',
    selectorTitle: 'input[name=title]',
    selectorContent: '.CodeMirror-wrap textarea',
    extraOperations: async page => {
      await page.click('#bodyEditorWrap + .fields .selection')
      await page.waitForSelector('.selection.visible .menu.visible .item')
      await page.click('.selection.visible .menu.visible .item:nth-child(2)')
    }
  },
  {
    //url: 'https://www.v2ex.com/new/blog',
    selectorTitle: '#topic_title',
    selectorContent: '#topic_content',
    extraOperations: async page => {
      await page.click('#select_syntaxSelectBoxIt')
      await page.waitForSelector('#select_syntaxSelectBoxItOptions')
      await page.click('.selectboxit-option-last')
    }
  },
  {
    //url: 'https://www.jianshu.com/writer#/notebooks/26371741/notes/50149419',
    selectorTitle: '._24i7u',
    selectorContent: '#arthur-editor'
  },
  // 无法预览
  {
    //url: 'https://i.cnblogs.com/EditPosts.aspx?opt=1',
    selectorTitle: '#Editor_Edit_txbTitle',
    selectorContent: '#Editor_Edit_EditorBody',
    extraOperations: async page => {
      await page.click('#Editor_Edit_APOptions_Advancedpanel1_cklCategories_0')
      await page.click(
        '#Editor_Edit_APOptions_APSiteHome_cbIsPublishToSiteHome'
      )
    }
  },
  // 登录状态保持时间较短, 有时可能需要重新登录两次
  {
    //url: 'https://mp.csdn.net/mdeditor?not_checkout=0#',
    selectorTitle: '.article-bar__title--input',
    selectorContent: '.editor__inner',
    extraOperations: async page => {
      // 前几次会出现markdown-editor的提示
      //const selectorHand = '.middle-hand > button'
      //await page.waitForSelector(selectorHand)
      //await page.click(selectorHand)
    }
  },
  // 登录状态保持时间较短, 有时可能需要重新登录两次
  {
    //url: 'https://blog.51cto.com/blogger/publish',
    selectorTitle: '#title',
    selectorContent: '.CodeMirror > div > textarea',
    extraOperations: async page => {
      await page.waitFor(100)

      // 选择原创
      await page.hover('.pulldown-title')
      await page.waitForSelector('.pulldown-title.on')
      await page.click('.pulldown-title .pulldown-list li:first-child')

      // 选择一级分类
      await page.hover('.system-one')
      await page.waitForSelector('.system-one.on')
      await page.click('#system-one-list li:nth-child(5)')

      // 选择二级分类
      await page.waitFor(1000)
      await page.hover('.system-two')
      await page.waitForSelector('.system-two.on')
      await page.click('#system-two-list li:nth-child(5)')

      // 以防外一：出现按钮看不见的情况
      // await page.click('#submit')
    }
  },
  // 登录状态保持时间较短
  {
    //url: "https://juejin.im",
    selectorTitle: '.title-input',
    selectorContent: '.ace_text-input',
    beforeWriting: async page => {
      try {
        const btnLogin = '.login'
        const btnGithub = '.oauth-bg:last-child .oauth-btn'

        await page.waitForSelector(btnLogin, {timeout: 1000})
        await page.click(btnLogin)
        await page.click(btnGithub)

        await page.waitFor(8000)
      } catch (e) {
        console.log('juejin no need to login')
      } finally {
        await page.click('.add-btn')
        await page.waitFor(3000)
      }
    }
  },
  {
    //url: 'https://zhuanlan.zhihu.com/write',
    selectorTitle: '.WriteIndex-titleInput .Input',
    selectorContent: '.public-DraftEditor-content'
  },
  {
    //url: 'https://medium.com/new-story',
    selectorTitle: '.graf--title',
    selectorContent: '.section-inner > p'
  }
]
