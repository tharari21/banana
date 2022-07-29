const express = require('express')
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    // return all products
    try {
        const products = await pool.query('SELECT * FROM products');
        if (products.rowCount > 0 ) {
            res.json({products: products.rows})
        } else {
            res.send('No Products')
        }
    } catch (err) {
        console.error(err)
        res.send(JSON.stringify(err))
    }
})
router.post('/', async (req, res) => {
    // Create new product
    const {name, description, sellerId, categoryId} = req.body;
    try {
        const newProduct = await pool.query(
            "INSERT INTO products (name, description, seller_id, catagory_id) VALUES($1, $2, (SELECT id FROM users WHERE id=$3), (SELECT id FROM catagories WHERE id=$4))",
            [name, description, sellerId, catagoryId]
            );
            res.json({ message: `Added ${name} to database` })
            
        } catch (err) {
            res.json({ message: JSON.stringify(err)})
        }
    })
    router.patch('/:productId',async  (req, res) => {
      // update req.params.id
      const { name, description, sellerId, categoryId } = req.body;
      const responseObj = {};
      if (name) {
          const updatedProduct = await pool.query('UPDATE products SET name=$1 WHERE id=$2', [name, req.params.productId])
          console.log(updatedProduct)
          responseObj.name = name
      }
      if (description) {
        const updatedProduct = await pool.query(
            "UPDATE products SET description=$1 WHERE id=$2",
            [description, req.params.productId]
        );
        console.log(updatedProduct);
        responseObj.description = description;
      }
      if (categoryId) {
          const updatedProduct = await pool.query(
              "UPDATE products SET catagory_id=(SELECT id FROM catagories WHERE id=$1) WHERE id=$2",
              [categoryId, req.params.productId]
              );
          console.log(updatedProduct)
          responseObj.categoryId = categoryId;
      }
      res.json(responseObj);

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

