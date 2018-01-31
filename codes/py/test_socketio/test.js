const io = require('socket.io-client');
auth_data = {}
const args = process.argv
port = 8080
if (args.length > 2) {
    port = args[2]
}
console.log('port = ', port)
const socket = io('http://localhost:' + port + '/fanout', {
    transportOptions: {
        polling: {
            extraHeaders: auth_data
        }
    }
})
socket.on('connect', () => {
    console.log('connect')
    socket.send('raw message from client')
    socket.emit('my_event', 'event from client')
    socket.send({'k1': 'v1', 'k2': 'v2'})
})
socket.connect()
socket.on('message', (data) => {
    console.log('message =>', data)
})
socket.on('my event', (data) => {
    console.log('message =>', data)
})