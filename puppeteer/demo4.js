const assert = require('assert'); //使用assert断言库
const puppeteer = require('puppeteer');
const WEBSITE_TITLE = 'kangkangblog – Mr.kangblog';
const MY_GITHUB_LINK = 'https://github.com/ZWkang';
const FIRST_ITEM_TEXT = '首页';
let browser;
let page;

before(async ()=>{
        browser = await puppeteer.launch({
            headless:true
        })
        page = await browser.newPage()
        await page.goto('https://ls-l.cn')
        
})

describe('check my website',()=>{
    
    it('i need a title man!!',async ()=>{
        const titleValue = await page.title().then((title_value)=>{
            return title_value            
        })
        assert.equal(titleValue,WEBSITE_TITLE)
    }).timeout(10000);

    it('menu frist item',async ()=>{
        await page.waitForSelector('#site-navigation')
        const titleItem = await page.evaluate(()=>{
            return document.querySelectorAll('#site-navigation ul > li')[0].innerText;
        })
        assert.equal(titleItem,FIRST_ITEM_TEXT);
    }).timeout(10000);

    it(`the website will have my github link`,async()=>{
        const my_github_link = await page.evaluate(()=>{
            return document.querySelector('.call-to-action-button').href
        })
        assert.equal(my_github_link,MY_GITHUB_LINK)
    }).timeout(10000);
})

after(async ()=>{
    await browser.close()
})