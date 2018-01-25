const puppeteer = require('puppeteer');
const Koa = require('koa')
const app = new Koa()

async function getSpaContent(ctx, next) {

    if(/\.html/.test(ctx.request.url) || /^\/$/.test(ctx.request.url) || /.css$/.test(ctx.request.url)){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://localhost:1234${ctx.request.url}`)
        console.log(`visiting http://localhost:1234${ctx.request.url}`)
        if(/.css$/.test(ctx.request.url)){
            ctx.body = await page.evaluate(()=>{
                return  document.querySelector('pre').innerText
            })
            ctx.type="text/css"
        }else{
            await page.content().then((v)=>{ //此处返回的是promise  简单地获取即可
                return ctx.body = v;
            })
        }

        await browser.close();
        
    }else{
        ctx.body = {};
    }
    await next();
}

app.use(getSpaContent);
let len = process.argv.length;
let port = `3000`;
for(let i =0;i<len-1;i++){
    if(process.argv[i]==='--port' && i!==len-1){
        port = process.argv[i+1];
    }
}
app.listen(port,()=>{
    console.log(`listening  in port with ${port}`);
})
