const router = require('express').Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const { aedes } = require('../../mqtt');
const state = require('../../state');
const io = require('../../scoker').io();

router.use(authMiddleware);

router.get('/connected_mqtt', async (req, res) => {

    res.send(state.mqtt.getClients());

});

router.get('/connected_ws', async (req, res) => {

    const sockets = await io.fetchSockets();
    const connecteds = [];

    for (const k in sockets) {
        const socket = sockets[k];
        connecteds.push({
            id: socket.id
        })
    }

    res.send(connecteds);

});

module.exports = app => app.use('/status', router);