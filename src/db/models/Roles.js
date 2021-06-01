const mongoose = require("../mongoose");

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

RoleSchema.pre('save', async function (next) {
    this.updatedAt = new Date();
    next();
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;