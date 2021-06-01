const mongoose = require("../mongoose");
const utils = require('../../utils');

const SystemSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    updateVersion: {
        type: Number
    }
});

SystemSchema.pre('save', async function (next) {
    this.updatedAt = new Date();
    this.updatedVersion = utils.getNextUpdateVersion();
    next();
});

const System = mongoose.model('System', SystemSchema);

module.exports = System;