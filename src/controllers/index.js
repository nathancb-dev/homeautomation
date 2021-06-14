const router = require('express').Router();

require('./api')(router);
require('./systemController')(router);

module.exports = app => app.use('', router);