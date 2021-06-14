const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

// router.use(authMiddleware);

router.post('/reboot', (req, res) => {
    setTimeout(function () {
        // When NodeJS exits
        process.on("exit", function () {

            require("child_process").spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: "inherit"
            });
        });
        process.exit();
    }, 1000);

    res.send({ msg: "restarting" });
});

module.exports = app => app.use('/system', router);