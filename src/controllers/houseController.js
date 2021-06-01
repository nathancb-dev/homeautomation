const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

const House = require('../db/models/House');

router.use(authMiddleware);

router.get('/', async (req, res) => {

    try {
        
        const house = await House.findOne();

        if (!house)
            return res.status(400).send({ code: '17', err: 'House data not found' });

        return res.send({ house });

    } catch (err) {
        return res.status(400).send({ code: '16', err: 'Get registers failed' });
    }

});

router.put('/', async (req, res) => {

    delete req.body._id; // for security

    try {

        house = await House.findOneAndUpdate({}, req.body, { new: true });

        if (house)
            return res.send({ house });

        house = await House.create(req.body);

        return res.send({ house });

    } catch (err) {
        console.log(err)
        return res.status(400).send({ code: '14', err: 'Update failed' });
    }

});

module.exports = app => app.use('/house', router);