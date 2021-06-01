const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const authConfig = require('../config/auth')

const User = require('../db/models/Users');

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.hash, {
        // expiresIn: '1h'
    });
}

router.post('/register', async (req, res) => {

    const { username } = req.body;

    try {

        if (await User.findOne({ username }))
            return res.status(400).send({ code: '01', err: 'User already exists' });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user });

    } catch (err) {
        return res.status(400).send({ code: '02', err: 'Registration failed' });
    }

});

router.post('/authenticate', async (req, res) => {

    const { username, password } = req.body;

    try {

        const user = await User.findOne({ username }).select('+password');

        if (!user)
            return res.status(401).send({ code: '03', err: 'User not found' });

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

router.post('/change_password', authMiddleware, async (req, res) => {

    const { username, password, new_password } = req.body;

    try {

        const user = await User.findOne({ username }).select('+password');

        if (!user)
            return res.status(401).send({ code: '03', err: 'User not found' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(401).send({ code: '04', err: 'Invalid Password' });

        user.password = new_password;

        await user.save();

        user.password = undefined;

        res.send({ user });

    } catch (err) {
        return res.status(401).send({ code: '05', err: 'Change password error' });
    }

});

router.post('/update_user', authMiddleware, async (req, res) => {

    const { username, name, roles } = req.body;

    try {

        const user = await User.findOneAndUpdate({ username }, { name, roles }, { new: true });

        if (!user)
            return res.status(401).send({ code: '03', err: 'User not found' });

        res.send({ user });

    } catch (err) {
        return res.status(401).send({ code: '06', err: 'Update user error' });
    }

})

module.exports = app => app.use('/auth', router);