const EventEmitter = require('events').EventEmitter
const WebSocket = require('ws')

class wsServer extends EventEmitter {
    constructor(port) {
        super()
        this.wss = new WebSocket.Server({ port });
        this.wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(message) {
              console.log('received: %s', message);
            });
        });
    }
    emitmessage(assetSource) {
        this.wss.clients.forEach(ws => {
            ws.send(JSON.stringify({
                type: 'update',
                ...assetSource
            }))
        })
    }
}


const wsserver = new wsServer(8080)
module.exports = wsserver