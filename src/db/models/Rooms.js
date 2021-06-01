const mongoose = require("../mongoose");

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
    }
});

RoomSchema.pre('save', async function (next) {
    this.updatedAt = new Date();
    next();
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;