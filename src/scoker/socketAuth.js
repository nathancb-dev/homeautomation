const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (socket, next) => {

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

    return next();

    function mountError(data) {
        const err = new Error(data.err);
        err.data = data;
        return err;
    }

}