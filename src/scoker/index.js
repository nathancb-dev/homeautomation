
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const socketManager = require('./socketManager');

let io;

const createServer = server => {
    io = new socketio.Server(server);

    io.use(function (socket, next) {
        //next()
        const authToken = socket.handshake.auth.token;

        if (!authToken)
            return next(mountError({ code: '07', err: 'No token provided' }));

        const parts = authToken.split(' ');
        if (parts.length !== 2) {
            console.log('q')
            return next(mountError({ code: '08', err: 'Token error' }));
        }

        const [bearer, token] = parts;

        if (!/^Bearer$/i.test(bearer))
            return next(mountError({ code: '09', err: 'Token malformated' }));

        jwt.verify(token, authConfig.hash, (err, decoded) => {
            if (err)
                return next(mountError({ code: '10', err: 'Invalid token' }));

            socket.data.userId = decoded.userId;
        });

        if (!socket.data.userId) return; // prevent on invalid token

        const query = socket.handshake.query;
        if (query.type === 'node') {
            socket.data.type = query.type;
        } else {
            socket.data.type = 'app';
        }

        socket.join(socket.data.type);
        return next();

        function mountError(data) {
            const err = new Error(data.err);
            err.data = data;
            return err;
        }

    }).on('connection', socketManager);

    console.log("Socket io OK")
}

module.exports = {
    createServer,
    io
};