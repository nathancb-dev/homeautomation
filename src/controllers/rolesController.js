const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

const Role = require('../db/models/Roles');

router.use(authMiddleware);

router.get('/', async (req, res) => {

    const { filter } = req.body;

    try {

        const roles = await Role.find((filter ? filter : {}));

        if (!roles)
            return res.status(400).send({ code: '13', err: 'Role not found' });

        return res.send({ roles });

    } catch (err) {
        return res.status(400).send({ code: '16', err: 'Get registers failed' });
    }

});

router.post('/', async (req, res) => {

    const { roleName } = req.body;

    try {

        if (await Role.findOne({ roleName }))
            return res.status(400).send({ code: '11', err: 'Role already exists' });

        const role = await Role.create(req.body);

        return res.send({ role });

    } catch (err) {
        return res.status(400).send({ code: '02', err: 'Registration failed' });
    }

});

router.put('/', async (req, res) => {

    const { _id, roleName } = req.body;

    try {

        if (await Role.findOne({ roleName }))
            return res.status(400).send({ code: '12', err: 'New role name already exists' });

        const role = await Role.findByIdAndUpdate(_id, { roleName }, { new: true });

        if (!role)
            return res.status(400).send({ code: '13', err: 'Role not found' });

        return res.send({ role });

    } catch (err) {
        return res.status(400).send({ code: '14', err: 'Update failed' });
    }

});

router.delete('/', async (req, res) => {

    const { _id } = req.body;

    try {

        const role = await Role.findByIdAndDelete(_id);

        if (!role)
            return res.status(400).send({ code: '13', err: 'Role not found' });

        return res.send({ role });

    } catch (err) {
        return res.status(400).send({ code: '15', err: 'Delete failed' });
    }

});

module.exports = app => app.use('/roles', router);