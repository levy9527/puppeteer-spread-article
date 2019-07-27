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
	// 登录状态保持时间较短, 重新登录需要两次
	// 打开同一个页面，会显示上次内容
	{
		//url: 'https://hacpai.com/post?type=0',
		selectorTitle: '#articleTitle',
		selectorContent: '.vditor-textarea',
		extraOperations: async (page) => {
		  await page.click('#showReward')
		}
	},
	// 打开同一个页面，会显示上次内容
	// github的问题在于，有时图片会上传失败
	{
		//url: 'https://github.com/levy9527/blog/issues/new',
		selectorTitle: '#issue_title',
		selectorContent: '#issue_body'
	},
	// 打开同一个页面，会显示上次内容
	{
		//url: 'https://segmentfault.com/write?freshman=1',
		selectorTitle: '#myTitle',
		selectorContent: '#myEditor',
	},
	{
		//url: 'https://my.oschina.net/u/2414419/blog/write',
		selectorTitle: 'input[name=title]',
		selectorContent: '.CodeMirror-wrap textarea',
		extraOperations: async (page) => {
			await page.click('#bodyEditorWrap + .fields .selection')
			await page.waitForSelector('.selection.visible .menu.visible .item')
			await page.click('.selection.visible .menu.visible .item:nth-child(2)')
		}
	},
	// 打开同一个页面，会显示上次内容
	{
		//url: 'https://www.v2ex.com/new/blog',
		selectorTitle: '#topic_title',
		selectorContent: '#topic_content',
		extraOperations: async (page) => {
		  await page.click('#select_syntaxSelectBoxIt')
		  await page.waitForSelector('#select_syntaxSelectBoxItOptions')
		  await page.click('.selectboxit-option-last')
		}
	},
	{
		//url: 'https://www.jianshu.com/writer#/notebooks/26371741/notes/50149419',
		selectorTitle: '._24i7u',
		selectorContent: '#arthur-editor',
	},
	// 无法预览
	{
		//url: 'https://i.cnblogs.com/EditPosts.aspx?opt=1',
		selectorTitle: '#Editor_Edit_txbTitle',
		selectorContent: '#Editor_Edit_EditorBody',
		extraOperations: async (page) => {
			await page.click('#Editor_Edit_APOptions_Advancedpanel1_cklCategories_0')
			await page.click('#Editor_Edit_APOptions_APSiteHome_cbIsPublishToSiteHome')
		}
	},
	// 登录状态保持时间较短
  {
		url: 'https://juejin.im/editor/drafts/new',
		selectorTitle: '.title-input',
		selectorContent: '.ace_text-input',
	},
	// 打开同一个页面，会显示上次内容
	// 登录状态保持较短, 重新登录要尝试两次以上
	{
		url: 'https://mp.csdn.net/mdeditor?not_checkout=0#',
		selectorTitle: '.article-bar__title--input',
		selectorContent: '.editor__inner',
		extraOperations: async (page) => {
			// 前几次会出现markdown-editor的提示
			//const selectorHand = '.middle-hand > button'
			//await page.waitForSelector(selectorHand)
			//await page.click(selectorHand)
		}
	},
	// 打开同一个页面，会显示上次内容
	// 登录状态保持时间较短, 重新登录需要两次
	{
		url: 'https://blog.51cto.com/blogger/publish',
		selectorTitle: '#title',
		selectorContent: '.CodeMirror > div > textarea',
		extraOperations: async (page) => {
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

			// 以防外一：出现按钮看不见的情况
			// await page.click('#submit')
		}
	},
	{
		//url: 'https://zhuanlan.zhihu.com/write',
		selectorTitle: '.WriteIndex-titleInput .Input',
		selectorContent: '.public-DraftEditor-content'
	},
	{
		// 类似知乎，原因不明
	  //url: 'https://medium.com/new-story',
		selectorTitle: '.graf--title',
		selectorContent: '.section-inner > p',
	}
]
