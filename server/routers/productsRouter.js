const express = require('express')
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    // return all products
    try {
        const products = await pool.query('SELECT * FROM products');
    } catch (err) {
        console.error(err)
    }
    if (products.rowCount > 0 ) {
        res.json({products: products.rows})
    }
})
router.post('/', (req, res) => {
    // Create new product
})
router.patch('/:productId', (req, res) => {
    // update req.params.id
})
router.delete('/:productId', (req, res) => {
    // delete req.params.id

})

router.get('/:productId/images', (req, res) => {
    // return product req.params.id's images
})
router.post('/:productId/images', (req, res) => {
    // Create image for product req.params.id
})
router.patch('/:productId/images/:imageId', (req, res) => {
    // update image req.params.id's images
})
router.delete('/:productId/images/:imageId', (req, res) => {
    // delete image req.params.id's images
})



module.exports = router

