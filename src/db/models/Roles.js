const mongoose = require("../mongoose");

const RoleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;