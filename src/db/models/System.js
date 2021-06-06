const mongoose = require("../mongoose");

const SystemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const System = mongoose.model('System', SystemSchema);

module.exports = System;