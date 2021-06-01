const mongoose = require("../mongoose");
const utils = require('../../utils');

const RoleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true
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

RoleSchema.pre('save', async function (next) {
    this.updatedAt = new Date();
    this.updateVersion = utils.getNextUpdateVersion();
    next();
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;