const router = require('express').Router();
const authMiddleware = require('../../middlewares/authMiddleware');

const Room = require('../../db/models/Rooms');
const Thing = require('../../db/models/Things');
const Role = require('../../db/models/Roles');

router.use(authMiddleware);

router.get('/', async (req, res) => {

    const { filter } = req.body;

    try {

        const rooms = await Room.find((filter ? filter : {})).populate(['roles', 'things']);

        if (!rooms)
            return res.status(400).send({ code: '21', err: 'Room not found' });

        return res.send({ rooms });

    } catch (err) {
        return res.status(400).send({ code: '16', err: 'Get registers failed' });
    }

});

router.post('/', async (req, res) => {

    const { roomName, icon, things, roles } = req.body;

    try {

        for (const k in things) {

            const thingId = things[k];

            if (!await Thing.findById(thingId))
                return res.status(400).send({ code: '20', err: 'Thing not found' });

        }

        for (const k in roles) {

            const roleId = roles[k];

            if (!await Role.findById(roleId))
                return res.status(400).send({ code: '13', err: 'Role not found' });

        }

        const room = await (await Room.create({ roomName, icon, things, roles })).populate(['roles', 'things']).execPopulate();

        return res.send({ room });

    } catch (err) {
        return res.status(400).send({ code: '02', err: 'Registration failed' });
    }

});

router.put('/', async (req, res) => {

    const { _id, roomName, icon, things, roles } = req.body;

    try {

        for (const k in things) {

            const thingId = things[k];

            if (!await Thing.findById(thingId))
                return res.status(400).send({ code: '20', err: 'Thing not found' });

        }

        for (const k in roles) {

            const roleId = roles[k];

            if (!await Role.findById(roleId))
                return res.status(400).send({ code: '13', err: 'Role not found' });

        }

        const room = await Room.findByIdAndUpdate(_id, { roomName, icon, things, roles }, { new: true }).populate(['roles', 'things']);

        if (!room)
            return res.status(400).send({ code: '21', err: 'Room not found' });

        return res.send({ room });

    } catch (err) {
        return res.status(400).send({ code: '14', err: 'Update failed' });
    }

});

router.put('/add_things', async (req, res) => {

    const { _id, things } = req.body;

    try {

        for (const k in things) {

            const thingId = things[k];

            if (!await Thing.findById(thingId))
                return res.status(400).send({ code: '20', err: 'Thing not found' });

        }

        if (!await Thing.findOne({ _id, things: { $in: things } })) // with ! operator
            return res.status(400).send({ code: '22', err: 'Thing already in room' });

        const room = await Room.findByIdAndUpdate(_id, { $push: { things } }, { new: true }).populate(['roles', 'things']);

        if (!room)
            return res.status(400).send({ code: '21', err: 'Room not found' });

        return res.send({ room });

    } catch (err) {
        return res.status(400).send({ code: '14', err: 'Update failed' });
    }

});

router.put('/remove_things', async (req, res) => {

    const { _id, things } = req.body;

    try {

        for (const k in things) {

            const thingId = things[k];

            if (!await Thing.findById(thingId))
                return res.status(400).send({ code: '20', err: 'Thing not found' });

        }

        if (await Thing.findOne({ _id, things: { $in: things } })) // without ! operator
            return res.status(400).send({ code: '23', err: 'Thing not in room' });

        const room = await Room.findByIdAndUpdate(_id, { $pull: { things } }, { new: true }).populate(['roles', 'things']);

        if (!room)
            return res.status(400).send({ code: '21', err: 'Room not found' });

        return res.send({ room });

    } catch (err) {
        return res.status(400).send({ code: '14', err: 'Update failed' });
    }

});

router.delete('/', async (req, res) => {

    const { _id } = req.body;

    try {

        const room = await Role.findByIdAndDelete(_id).populate(['roles', 'things']);

        if (!room)
            return res.status(400).send({ code: '21', err: 'Room not found' });

        return res.send({ room });

    } catch (err) {
        return res.status(400).send({ code: '15', err: 'Delete failed' });
    }

});

module.exports = app => app.use('/rooms', router);