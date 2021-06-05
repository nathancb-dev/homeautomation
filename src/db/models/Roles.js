const mongoose = require("../mongoose");

const RoleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true
    },
    permissionLevel: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;