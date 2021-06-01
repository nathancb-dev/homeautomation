const mongoose = require("../mongoose");

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
    }
});

DeviceSchema.pre('save', async function (next) {
    this.updatedAt = new Date();
    next();
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;