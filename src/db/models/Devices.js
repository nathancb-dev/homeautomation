const mongoose = require("../mongoose");

const DeviceSchema = new mongoose.Schema({
    deviceInfoId: {
        type: String,
        required: true
    },
    deviceName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;