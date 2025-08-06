const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    nombreGenerico: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    precioMayoreo: {
        type: Number,
        required: true,
        default: 0
    },
    precioMenudeo: {
        type: Number,
        required: true,
        default: 0
    },
    precioTienda: {
        type: Number,
        required: true,
        default: 0
    },
    precioConIva: {
        type: Number,
        required: true,
        default: 0
    },
    precioPolitica: {
        type: Number,
        required: true,
        default: 0
    },
    porcentajeUtilidadReal: {
        type: Number,
        required: true,
        default: 0
    },
    proveedor: {
        type: String,
        required: true,
        trim: true
    },
    minimoMayoreo: {
        type: Number,
        required: true,
        default: 0
    },
    codigoDeBarras: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        required: true,
        trim: true
    },
    vecesVisto: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Product', productSchema);