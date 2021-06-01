const mongoose = require("../mongoose");

const SystemSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

SystemSchema.pre('save', async function (next) {
    this.updatedAt = new Date();
    next();
});

const System = mongoose.model('System', SystemSchema);

module.exports = System;