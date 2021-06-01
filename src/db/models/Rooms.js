const mongoose = require("../mongoose");
const utils = require('../../utils');

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    things: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
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

RoomSchema.pre('save', async function (next) {
    this.updatedAt = new Date();
    this.updatedVersion = utils.getNextUpdateVersion();
    next();
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;