const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');
router.use(authMiddleware);

// GET - Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            total: products.length,
            products: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Get all products for CATALOG
router.get('/catalog', async (req, res) => {
    try {
        const products = await Product.find()
            .select('_id nombre imagen');
        res.json({
            total: products.length,
            products: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({
            message: 'Product founded by ID',
            product: product
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Get a product by ID for ADMIN
router.get('/admin/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .select('nombre nombreGenerico categoria precioMayoreo precioMenudeo precioTienda precioConIva precioPolitica porcentajeUtilidadReal proveedor minimoMayoreo codigoDeBarras imagen');

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({
            message: 'Product found by ID',
            product: product
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Get a product by ID for ADMIN
router.get('/user/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .select('nombre categoria precioMayoreo precioMenudeo minimoMayoreo codigoDeBarras imagen');

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({
            message: 'Product found by ID',
            product: product
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get - Check availability of a product by name
router.get('/name/:name', async (req, res) => {
    try {
        const product = await Product.findOne({ name: req.params.name });
        if (!product) {
            return res.json({ exists: false });
        }
        res.json({ exists: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Create a new product
router.post('/', async (req, res) => {
    try {
        const {
            nombre, nombreGenerico, categoria, precioMayoreo, precioMenudeo,
            precioTienda, precioConIva, precioPolitica, porcentajeUtilidadReal,
            proveedor, minimoMayoreo, codigoDeBarras, imagen
        } = req.body;
        
        const existingProduct = await Product.findOne({ nombre });
        if (existingProduct) {
            return res.status(400).json({ error: 'Este producto ya existe' });
        }
        
        const newProduct = new Product({
            nombre,
            nombreGenerico,
            categoria,
            precioMayoreo,
            precioMenudeo,
            precioTienda,
            precioConIva,
            precioPolitica,
            porcentajeUtilidadReal,
            proveedor,
            minimoMayoreo,
            codigoDeBarras,
            imagen
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: 'Producto Creado Exitosamente',
            product: savedProduct
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Delete ALL products
router.delete('/', async (req, res) => {
    try {
        await Product.deleteMany();
        res.json({ message: 'All products deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

module.exports = router;
