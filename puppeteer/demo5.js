const puppeteer = require('puppeteer');

(async ()=>{
    const browser = await puppeteer.launch({
        headless:false
    })
    const page = await browser.newPage()

    await page.tracing.start({path: 'trace.json'});
    await page.goto('https://ls-l.cn');
    await page.tracing.stop()
    await page.close()
    await browser.close()
})()