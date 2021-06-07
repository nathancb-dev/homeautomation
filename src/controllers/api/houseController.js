const router = require('express').Router();
const authMiddleware = require('../../middlewares/authMiddleware');

const House = require('../../db/models/House');

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

    const { houseName } = req.body;

    try {

        let house = await House.findOneAndUpdate({}, { houseName }, { new: true });

        if (!house)
            return res.status(400).send({ code: '17', err: 'House data not found' });

        return res.send({ house });

    } catch (err) {
        console.log(err)
        return res.status(400).send({ code: '14', err: 'Update failed' });
    }

});

module.exports = app => app.use('/house', router);