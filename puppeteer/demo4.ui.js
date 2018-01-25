// 键盘输入测试
const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({
            headless: false //要看演示可以使用false
        });
        const page = await browser.newPage();
        await page.setViewport({
            width:1280,
            height:980
        })
        await page.goto('https://segmentfault.com/')
        
        await page.waitForSelector('#searchBox')
        await page.click('#searchBox');
        await page.type('#searchBox','javascript',{delay:100})
        await page.click('.btn-link')
        await page.waitForSelector('.search-result')
        await page.waitFor(8000).then(async ()=>{
            await page.screenshot({
                path: 'keyboardTest.png',// 拍个照看看测试结果
                fullPage: true
            })
        })
        await page.close()
        await browser.close()
    })();