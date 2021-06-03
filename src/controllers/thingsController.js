const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

const Thing = require('../db/models/Things');
const Role = require('../db/models/Roles');

router.use(authMiddleware);

router.get('/', async (req, res) => {

    const { filter } = req.body;

    try {

        const things = await Thing.find((filter ? filter : {}));

        if (!things)
            return res.status(400).send({ code: '20', err: 'Thing not found' });

        return res.send({ things });

    } catch (err) {
        return res.status(400).send({ code: '16', err: 'Get registers failed' });
    }

});

router.put('/', async (req, res) => {

    const { _id, thingName, icon, valueType, roles } = req.body;

    try {

        for (const k in roles) {

            const roleId = roles[k];

            if (!await Role.findById(roleId))
                return res.status(400).send({ code: '13', err: 'Role not found' });

        }

        const thing = await Thing.findOneAndUpdate(_id, { thingName, icon, valueType, roles }, { new: true });

        if (!thing)
            return res.status(400).send({ code: '20', err: 'Thing not found' });

        return res.send({ thing });

    } catch (err) {
        console.log(err)
        return res.status(400).send({ code: '14', err: 'Update failed' });
    }

});

module.exports = app => app.use('/things', router);