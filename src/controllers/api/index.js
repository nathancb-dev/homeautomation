const router = require('express').Router();

require('./authController')(router);
require('./rolesController')(router);
require('./houseController')(router);
require('./devicesController')(router);
require('./thingsController')(router);
require('./roomsController')(router);
require('./logsController')(router);
require('./statusController')(router);

module.exports = app => app.use('/api', router);