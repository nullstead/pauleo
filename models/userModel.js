const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    { 
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, require: true},
        role: {type: String, enum: ['admin', 'user'], default: 'user'},
        isVerified: { type: Boolean, default: false },
        passwordResetToken: {type: String},
        passwordResetExpires: {type: Date}

    },

    {
        timestamps: true
    }
)

const User = new mongoose.model('User', userSchema)

module.exports = User