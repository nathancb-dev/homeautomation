const mongoose = require("../mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async (next) => {
    const hash = await bcrypt.hash(thi.password, 10);
    this.password = hash;
    this.updatedAt = Date.now;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;