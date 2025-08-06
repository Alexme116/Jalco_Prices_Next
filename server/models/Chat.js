const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    messages: [{
        text: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        rol: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        }
    }],
    status: {
        type: String,
        enum: ['normal', 'important'],
        default: 'normal'
    }
});

module.exports = mongoose.model('Chat', chatSchema);