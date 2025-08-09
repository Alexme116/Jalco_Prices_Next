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
            return res.status(404).json({ error: 'No se encontro el usuario' });
        }
        res.json({
            message: 'Usuario encontrado por ID',
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
            return res.status(404).json({ error: 'No se encontro el usuario' });
        }
        res.json({
            message: 'Usuario encontrado por email',
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Create a new user
router.post('/', async (req, res) => {
    try {
        const { email, rol } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya esta registrado' });
        }
        
        const newUser = new User({
            email,
            rol
        });
        
        const savedUser = await newUser.save();
        res.status(201).json({
            message: 'Usuario creado correctamente',
            user: savedUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT - Update user rol By email
router.put('/email/rol/:email', async (req, res) => {
    try {
        const { rol } = req.body;
        const user = await User.findOneAndUpdate({ email: req.params.email }, { rol }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'No se encontro el usuario' });
        }
        res.json({
            message: 'Rol de usuario actualizado correctamente',
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
