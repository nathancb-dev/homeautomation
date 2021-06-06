const mongoose = require("../mongoose");

const HouseSchema = new mongoose.Schema({
    houseName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const House = mongoose.model('House', HouseSchema);

module.exports = House;