import { WebSocketServer, WebSocket } from "ws";

//initialize a new stand alone server, this creates it's own http server just for the handshake
const wss = new WebSocketServer({ port : 8080 })

//0 : CONNECTING
//1 : OPEN (the only state where you can .send())
//2 : CLOSING
//3 : CLOSED

//the first event using websocket, CONNECTION

wss.on('connection', (socket, request) => {
    const ip = request.socket.remoteAddress;

//the rawData is actually a buffer or binary, so its needs to be converted to text
    socket.on('message', (rawData) => {
        const message = rawData.toString()
        console.log({rawData})

        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) client.send(`server broadcast ${message}`)
        })
    })

    socket.on('error', (err) => {
        console.error(err)
    })

    socket.on('close', () => {
        console.log("the server is closed")
    } )
    
})

console.log("websocket server is running on PORT 8080")