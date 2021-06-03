const mongoose = require("../mongoose");

const RoomSchema = new mongoose.Schema({
    roomName: {
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