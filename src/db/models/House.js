const mongoose = require("../mongoose");

const HouseSchema = new mongoose.Schema({
    name: {
        type: String
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

HouseSchema.pre('save', async (next) => {
    this.updatedAt = Date.now;
    next();
});

const House = mongoose.model('House', HouseSchema);

module.exports = House;