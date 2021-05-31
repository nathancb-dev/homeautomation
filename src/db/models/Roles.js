const mongoose = require("../mongoose");

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

RoleSchema.pre('save', async (next) => {
    this.updatedAt = Date.now;
    next();
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;