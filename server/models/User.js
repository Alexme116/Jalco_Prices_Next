const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['enabled', 'disabled'],
        default: 'disabled',
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
