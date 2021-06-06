const mongoose = require("../mongoose");

const RoleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true
    },
    permissionLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 99
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;