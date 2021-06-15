const socketio = require('socket.io');
const socketAuth = require('./socketAuth');

let sio;

const startServer = appServer => {

    sio = new socketio.Server(appServer);

    sio.use(socketAuth)

    console.log("Socket io server instantiated");
}

const addManager = () => {
    sio.on('connection', require('./socketManager'));
    console.log("Socket io manager added");
}

const io = () => {
    return sio;
}

module.exports = {
    startServer,
    addManager,
    io
};