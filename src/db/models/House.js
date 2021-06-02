const mongoose = require("../mongoose");

const HouseSchema = new mongoose.Schema({
    houseName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const House = mongoose.model('House', HouseSchema);

module.exports = House;