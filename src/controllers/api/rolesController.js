const router = require('express').Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const utils = require('../../utils');

const Role = require('../../db/models/Roles');
const System = require('../../db/models/System');

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

    const { roleName, permissionLevel } = req.body;
    let role;

    try {

        if (await Role.findOne({ roleName }))
            return res.status(400).send({ code: '11', err: 'Role already exists' });

        role = await Role.create({ roleName, permissionLevel });

        const updatedRoles = await utils.updatePermissionsLevels(role._id, permissionLevel);

        return res.send({ role, updatedRoles });

    } catch (err) {
        await Role.findByIdAndDelete(role._id);
        return res.status(400).send({ code: '02', err: 'Registration failed' });
    }

});

router.put('/', async (req, res) => {

    const { _id, roleName, permissionLevel } = req.body;

    try {

        if (await Role.findOne({ roleName }))
            return res.status(400).send({ code: '12', err: 'New role name already exists' });

        if (await System.findOne({ role: _id }))
            if (!(await Role.findById(_id)).permissionLevel === permissionLevel)
                return res.status(400).send({ code: '24', err: "The permissionLevel of system role can't be updated" });


        const role = await Role.findByIdAndUpdate(_id, { roleName, permissionLevel }, { new: true, runValidators: true });

        const updatedRoles = await utils.updatePermissionsLevels(_id, permissionLevel);

        if (!role)
            return res.status(400).send({ code: '13', err: 'Role not found' });

        return res.send({ role, updatedRoles });

    } catch (err) {
        return res.status(400).send({ code: '14', err: 'Update failed' });
    }

});

router.delete('/', async (req, res) => {

    const { _id } = req.body;

    try {

        if (await System.findOne({ user: _id }))
            return res.status(400).send({ code: '25', err: "The system role can't be deleted" });

        const role = await Role.findByIdAndDelete(_id);

        if (!role)
            return res.status(400).send({ code: '13', err: 'Role not found' });

        return res.send({ role });

    } catch (err) {
        return res.status(400).send({ code: '15', err: 'Delete failed' });
    }

});

module.exports = app => app.use('/roles', router);