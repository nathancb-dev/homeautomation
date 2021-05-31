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
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

DeviceSchema.pre('save', async (next) => {
    this.updatedAt = Date.now;
    next();
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;