const router = require('express').Router();
const authMiddleware = require('../../middlewares/authMiddleware');

const Device = require('../../db/models/Devices');
const Thing = require('../../db/models/Things');

router.use(authMiddleware);

router.get('/', async (req, res) => {

    const { filter } = req.body;

    try {

        const devices = await Device.find((filter ? filter : {}));

        if (!devices)
            return res.status(400).send({ code: '18', err: 'Device not found' });

        return res.send({ devices });

    } catch (err) {
        return res.status(400).send({ code: '16', err: 'Get registers failed' });
    }

});

router.put('/', async (req, res) => {

    const { _id, deviceName } = req.body; // for security

    try {

        const device = await Device.findByIdAndUpdate(_id, { deviceName }, { new: true });

        if (!device)
            return res.status(400).send({ code: '18', err: 'Device not found' });

        return res.send({ device });

    } catch (err) {
        console.log(err)
        return res.status(400).send({ code: '14', err: 'Update failed' });
    }

});

router.delete('/', async (req, res) => {

    const { _id } = req.body;

    try {

        const device = await Device.findById(_id);

        if (!device)
            return res.status(400).send({ code: '18', err: 'Device not found' });

        const things = await Thing.find({ device: _id });

        for (const k in things) {
            await Thing.findByIdAndDelete(things[k]._id);
        }

        return res.send({ device });

    } catch (err) {
        return res.status(400).send({ code: '15', err: 'Delete failed' });
    }

});

module.exports = app => app.use('/devices', router);