const puppeteer = require('puppeteer');
const {dropTitle, dropAnchor, replaceBrWithNewline, getYuqueSlug} = require('./utils')
const siteList = require('./site-list')

if (!process.env.POST) {
  console.log("env var: POST required")
	return
}

(async () => {
 try {
   const browser = await puppeteer.launch({
     headless: false,
   	 userDataDir: __dirname + '/user-dir'
   });

	 browser.newPage().then(async page => {

		 await page.setRequestInterception(true)

     page.on('request', async req => {
		   if(['css', 'svg', 'png'].some(resoure => req.url().includes(resoure))) {
				req.abort()
				return
			 }
			 req.continue()

		   if (req.url().includes('contributors?book_id=')) {
			   let id = req.url().split('=')[1]
				 let slug = getYuqueSlug(process.env.POST)

				 await page.goto(`https://www.yuque.com/api/docs/${slug}?book_id=${id}&mode=markdown`)

				 // await browser.close();
			 }
		 })

		 page.on('response', async resp => {
		   if(resp.url().includes('markdown')) {
				 let {data: {title, sourcecode}} = await resp.json()
				 let content = replaceBrWithNewline(dropAnchor(dropTitle(sourcecode)))

				  //console.log(content)
			   
				  let promiseList = siteList.map(site => browser.newPage().then(async page => {
					  if (!site.url) return
			   
					  await page.setViewport({ width: 1280, height: 800 })
					  await page.goto(site.url, {waitUntil:'networkidle0'})

						// 简书是特殊的存在
						if (site.url.includes('jianshu')) {
						  // 需要点击新建文章, 等待请求响应并重新渲染
						  await page.click('._2cVn3')
							await page.waitFor(3000)
						}
			   
						if (site.selectorTitle) {
							await page.evaluate(
							  ({selectorTitle, title}) => {
								  let el = document.querySelector(selectorTitle)
									if ('value' in el) el.value = title
									else el.innerText = title
								},
							  {selectorTitle: site.selectorTitle, title}
							)

							// 有些网站一定要触发键盘事件才能保存标题
							await page.type(site.selectorTitle, '1')
							await page.keyboard.press('Backspace')
						}

						if (site.selectorContent) {

							await page.evaluate(
							  ({site, content}) => {
								  let el = document.querySelector(site.selectorContent)
									if ('value' in el) el.value = content
									else if (site.url.includes('csdn')) el.innerHTML = content
									else el.innerText = content

									if (site.url.includes('medium'))
									  el.innerText = '\n'
								},
							  {site, content}
							)

							// 掘金只能通过键盘事件
						//	if (site.url.includes('juejin'))
						 //   await page.type(site.selectorContent, content)
						}

						site.extraOperations && await site.extraOperations(page)
					}))
			   
					Promise.all(promiseList)
			 }
		 })

	   await page.goto(process.env.POST)
	 })
	
 } catch (e) {
   console.log(e) 
 }
})();
