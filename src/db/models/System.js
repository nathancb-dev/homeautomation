const mongoose = require("../mongoose");
const utils = require('../../utils');

const SystemSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const System = mongoose.model('System', SystemSchema);

module.exports = System;