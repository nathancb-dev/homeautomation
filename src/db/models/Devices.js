const mongoose = require("../mongoose");

const DeviceSchema = new mongoose.Schema({
    deviceInfoId: {
        type: String,
        required: true
    },
    deviceName: {
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