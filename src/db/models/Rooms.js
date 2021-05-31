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
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

RoomSchema.pre('save', async (next) => {
    this.updatedAt = Date.now;
    next();
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;