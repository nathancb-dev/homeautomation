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
    }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;