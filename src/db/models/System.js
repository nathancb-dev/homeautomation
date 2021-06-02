const mongoose = require("../mongoose");

const SystemSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const System = mongoose.model('System', SystemSchema);

module.exports = System;