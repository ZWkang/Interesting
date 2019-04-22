const minipack = require('./index')
const fs = require('fs')
const exec = require('child_process').exec
const makeEntry = (entryHtml, outputhtml, entryJS ) => {
    const temp = fs.readFileSync(entryHtml).toString()
    // console.log(temp)caches.c
    const graph = minipack.createGraph(entryJS)

    const result = minipack.bundle(graph)

    const data = temp.replace('<% script %>', `<script>${result}</script><script>
    const ws = new WebSocket('ws://127.0.0.1:8080')

    ws.onmessage = function(data) {
        console.log(data)
        let parseData
        try {
            parseData = JSON.parse(data.data)
        }catch(e) {
            throw e;
        }
        if(parseData.type === 'update') {
            const [fn,mapping] = modules[parseData.id]
            modules[parseData.id] = [
                new Function('require', 'module', 'exports', parseData.code),
                mapping
            ]
            require(0)
        }
    }
    
    </script>`)
    fs.writeFileSync(outputhtml, data)
}

makeEntry('./temp.html', './index.html', './test.js')


exec(`open ${__dirname + '/index.html'}`)