const mongoose = require("../mongoose");
const utils = require('../../utils');

const DeviceSchema = new mongoose.Schema({
    deviceInfoId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
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

DeviceSchema.pre('save', async function (next) {
    this.updatedAt = new Date();
    this.updateVersion = utils.getNextUpdateVersion();
    next();
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;