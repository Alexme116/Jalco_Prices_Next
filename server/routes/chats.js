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
        const { ind, title } = req.body;

        const newChat = new Chat({
            ind,
            title
        });

        const savedChat = await newChat.save();
        res.status(201).json({ chat: savedChat });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST - Add Message to a Chat
router.post('/:id/message', async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        const { ind, text, email, rol } = req.body;
        const newMessage = { ind, text, email, rol };
        chat.messages.push(newMessage);
        await chat.save();

        res.status(201).json({ message: newMessage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT - Update Chat Title and Status
router.put('/:id', async (req, res) => {
    try {
        const { title, status } = req.body;
        const chat = await Chat.findByIdAndUpdate(req.params.id, { title, status }, { new: true });
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        res.json({ chat: chat });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Delete a chat by Id
router.delete('/:id', async (req, res) => {
    try {
        const chat = await Chat.findByIdAndDelete(req.params.id);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        res.json({ message: 'Chat deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
