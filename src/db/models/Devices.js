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
    }
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;