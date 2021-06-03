const mongoose = require("../mongoose");

const ThingSchema = new mongoose.Schema({
    thingInfoId: {
        type: String,
        required: true,
        unique: true
    },
    thingName: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    valueType: {
        type: String,
        enum: ['string', 'int', 'double'],
        required: true
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Thing = mongoose.model('Thing', ThingSchema);

module.exports = Thing;