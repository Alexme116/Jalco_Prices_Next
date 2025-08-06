require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Routes Import
const usersRoutes = require('./routes/users');
const chatsRoutes = require('./routes/chats');
const productsRoutes = require('./routes/products');

// Crear aplicación Express
const app = express();

// Conectar a MongoDB Atlas
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', usersRoutes);
app.use('/api/chat', chatsRoutes);
app.use('/api/product', productsRoutes);

// 404 - Manage Not Found
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// General error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error en el servidor' });
});

// Iniciar servidor
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
