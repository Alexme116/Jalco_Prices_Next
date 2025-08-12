const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    ind: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    messages: [{
        ind: {
            type: Number,
            required: true
        },
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