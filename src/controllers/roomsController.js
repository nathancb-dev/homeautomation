const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

const Room = require('../db/models/Rooms');

router.use(authMiddleware);

module.exports = app => app.use('/rooms', router);