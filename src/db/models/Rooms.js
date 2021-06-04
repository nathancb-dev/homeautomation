const mongoose = require("../mongoose");

const RoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    things: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;