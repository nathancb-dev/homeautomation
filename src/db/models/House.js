const mongoose = require("../mongoose");

const HouseSchema = new mongoose.Schema({
    name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

HouseSchema.pre('save', async function (next) {
    this.updatedAt = new Date();
    next();
});

const House = mongoose.model('House', HouseSchema);

module.exports = House;