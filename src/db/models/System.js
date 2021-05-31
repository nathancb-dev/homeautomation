const mongoose = require("../mongoose");

const SystemSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

SystemSchema.pre('save', async (next) => {
    this.updatedAt = Date.now;
    next();
});

const System = mongoose.model('System', SystemSchema);

module.exports = System;