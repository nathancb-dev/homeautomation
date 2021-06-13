const socketio = require('socket.io');
const socketAuth = require('./socketAuth');
const socketManager = require('./socketManager');

let io;

const startServer = appServer => {

    io = new socketio.Server(appServer);

    io.use(socketAuth)
        .on('connection', socketManager);

    console.log("Socket io OK")
}

const getIo = () => {
    return io;
}

module.exports = {
    startServer,
    getIo
};