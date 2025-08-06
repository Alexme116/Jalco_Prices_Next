const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
router.use(authMiddleware);

// GET - Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            total: users.length,
            users: users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            message: 'User founded by ID',
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get - Get a user by email
router.get('/email/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            message: 'User founded by email',
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Create a new user
router.post('/', async (req, res) => {
    try {
        const { email, rol, status } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }
        
        const newUser = new User({
            email,
            rol,
            status
        });
        
        const savedUser = await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user: savedUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
