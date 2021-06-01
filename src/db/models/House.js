const mongoose = require("../mongoose");
const utils = require('../../utils');

const HouseSchema = new mongoose.Schema({
    houseName: {
        type: String
    },
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

HouseSchema.pre('save', async function (next) {
    this.updatedAt = new Date();
    this.updatedVersion = utils.getNextUpdateVersion();
    next();
});

const House = mongoose.model('House', HouseSchema);

module.exports = House;