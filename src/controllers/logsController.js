const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

const Log = require('../db/models/Logs');

router.use(authMiddleware);

router.get('/', async (req, res) => {

    const { filter } = req.body;

    try {

        const logs = await Log.find((filter ? filter : {}));

        if (!logs)
            return res.status(400).send({ code: '19', err: 'Log data not found' });

        return res.send({ logs });

    } catch (err) {
        return res.status(400).send({ code: '16', err: 'Get registers failed' });
    }

});

module.exports = app => app.use('/logs', router);