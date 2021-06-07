const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../../middlewares/authMiddleware');
const authConfig = require('../../config/auth')

const User = require('../../db/models/Users');
const Role = require('../../db/models/Roles');
const System = require('../../db/models/System');

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.hash, {
        // expiresIn: '1h'
    });
}

router.post('/authenticate', async (req, res) => {

    const { username, password } = req.body;

    try {

        const user = await User.findOne({ username }).select('+password');

        if (!user)
            return res.status(400).send({ code: '03', err: 'User not found' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(401).send({ code: '04', err: 'Invalid Password' });

        user.password = undefined;

        res.send({
            user,
            token: generateToken({ userId: user._id })
        });

    } catch (err) {

    }

});

router.post('/register', authMiddleware, async (req, res) => {

    const { username, roles } = req.body;

    try {

        if (await User.findOne({ username }))
            return res.status(400).send({ code: '01', err: 'User already exists' });

        for (const k in roles) {

            const roleId = roles[k];

            if (!await Role.findById(roleId))
                return res.status(400).send({ code: '13', err: 'Role not found' });

        }

        const user = await (await User.create(req.body)).populate("roles").execPopulate();

        user.password = undefined;

        return res.send({ user });

    } catch (err) {
        return res.status(400).send({ code: '02', err: 'Registration failed' });
    }

});

router.get('/user', authMiddleware, async (req, res) => {

    const { filter } = req.body;

    try {

        const users = await User.find((filter ? filter : {})).populate('roles');

        if (!users)
            return res.status(400).send({ code: '03', err: 'User not found' });

        return res.send({ users });

    } catch (err) {
        return res.status(400).send({ code: '16', err: 'Get registers failed' });
    }

});

router.post('/change_password', authMiddleware, async (req, res) => {

    const { username, password, new_password } = req.body;

    try {

        const user = await User.findOne({ username }).select('+password');

        if (!user)
            return res.status(400).send({ code: '03', err: 'User not found' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(401).send({ code: '04', err: 'Invalid Password' });

        user.password = new_password;

        await user.save(); // need be save method because the mongo middleware to encrypt password (pre('save', func))

        user.password = undefined;

        res.send({ user });

    } catch (err) {
        return res.status(400).send({ code: '05', err: 'Change password error' });
    }

});

router.put('/user', authMiddleware, async (req, res) => {

    const { _id, username, name, roles } = req.body;

    try {

        if (await User.findOne({ username, _id: { $ne: _id } }))
            return res.status(400).send({ code: '01', err: 'User already exists' });

        for (const k in roles) {

            const roleId = roles[k];

            if (!await Role.findById(roleId))
                return res.status(400).send({ code: '13', err: 'Role not found' });

        }

        const system = await System.findOne({ user: _id });
        if (system)
            if (!roles.find((x) => x == system.role))
                return res.status(400).send({ code: '27', err: "The system role can't be removed from system user" });

        const user = await User.findByIdAndUpdate(_id, { username, name, roles }, { new: true }).populate('roles');

        if (!user)
            return res.status(400).send({ code: '03', err: 'User not found' });

        res.send({ user });

    } catch (err) {
        return res.status(400).send({ code: '06', err: 'Update user error' });
    }

});

router.delete('/user', authMiddleware, async (req, res) => {

    const { _id } = req.body;

    try {

        if (await System.findOne({ user: _id }))
            return res.status(400).send({ code: '26', err: "The system user can't be deleted" });

        const user = await User.findByIdAndDelete(_id).select("-password").populate('roles');

        if (!user)
            return res.status(400).send({ code: '03', err: 'User not found' });

        res.send({ user });

    } catch (err) {
        return res.status(400).send({ code: '15', err: 'Delete failed' });
    }

});

module.exports = app => app.use('/auth', router);