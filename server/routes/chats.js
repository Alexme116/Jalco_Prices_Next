const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const authMiddleware = require('../middleware/auth');
router.use(authMiddleware);

// GET - Get all chats
router.get('/', async (req, res) => {
    try {
        const chats = await Chat.find();
        res.json({
            total: chats.length,
            chats: chats
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Get a chat by ID
router.get('/:id', async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        res.json({ chat: chat });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Create a new chat
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;

        const newChat = new Chat({
            title
        });

        const savedChat = await newChat.save();
        res.status(201).json({ chat: savedChat });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
