
const socketio = require('socket.io');

const app = server => {
    const io = socketio(server);
    io.on('connection', socket => { 
        console.log("someone socket connected")
     });
    console.log("Socket io OK")
}

module.exports = app;