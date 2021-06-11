const mongoose = require("../mongoose");

const ThingSchema = new mongoose.Schema({
    thingInfoId: {
        type: String,
        required: true,
        unique: true
    },
    thingName: {
        type: String
    },
    icon: {
        type: String
    },
    valueType: {
        type: String,
        enum: ['string', 'int', 'double']
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Thing = mongoose.model('Thing', ThingSchema);

module.exports = Thing;