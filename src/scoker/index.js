
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const app = server => {
    const io = new socketio.Server(server);

    io.use(function (socket, next) {

        const authToken = socket.handshake.auth.token;

        if (!authToken)
            return next(new Error(JSON.stringify({ code: '07', err: 'No token provided' })));

        const parts = authToken.split(' ');

        if (!parts.length === 2)
            return next(new Error(JSON.stringify({ code: '08', err: 'Token error' })));

        const [bearer, token] = parts;

        if (!/^Bearer$/i.test(bearer))
            return next(new Error(JSON.stringify({ code: '09', err: 'Token malformated' })));

        jwt.verify(token, authConfig.hash, (err, decoded) => {
            if (err)
                return next(new Error(JSON.stringify({ code: '10', err: 'Invalid token' })));

            socket.data.userId = decoded.userId;
        });

        if (!socket.data.userId) return; // prevent on invalid token

        const type = socket.handshake.query.type;

        switch (type) {
            case 'app':

                socket.join(type);
                socket.data.type = type;

                break;
            case 'node':

                socket.join(type);
                socket.data.type = type;

                break;
            default:

                return next(new Error(JSON.stringify({ code: '10', err: 'Invalid type' })));
        }

        return next();

    }).on('connection', socket => {

        console.log(`socketId: ${socket.id} connected`);

        socket.on("disconnect", (reason) => {
            //
        });

    });

    console.log("Socket io OK")
}

module.exports = app;