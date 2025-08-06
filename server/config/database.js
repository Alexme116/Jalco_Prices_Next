const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Atlas conectado exitosamente');
    } catch (error) {
        console.error('❌ Error al conectar MongoDB Atlas:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
