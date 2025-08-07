const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    nombreGenerico: {
        type: String,
        default: "",
        trim: true
    },
    categoria: {
        type: String,
        default: "",
        trim: true
    },
    precioMayoreo: {
        type: Number,
        default: 0
    },
    precioMenudeo: {
        type: Number,
        default: 0
    },
    precioTienda: {
        type: Number,
        default: 0
    },
    precioConIva: {
        type: Number,
        default: 0
    },
    precioPolitica: {
        type: Number,
        default: 0
    },
    porcentajeUtilidadReal: {
        type: Number,
        default: 0
    },
    proveedor: {
        type: String,
        default: "",
        trim: true
    },
    minimoMayoreo: {
        type: Number,
        default: 0
    },
    codigoDeBarras: {
        type: String,
        default: "",
        trim: true
    },
    imagen: {
        type: String,
        default: "",
        trim: true
    },
    vecesVisto: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Product', productSchema);