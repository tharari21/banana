const express = require('express')
const pool = require('../db');
const router = express.Router();
const imageRouter = require('./imageRouter');

router.get('/', async (req, res) => {
    // return all products
    try {
        const productsQuery = await pool.query('SELECT * FROM products');
        if (productsQuery.rowCount > 0) {
          res.json( productsQuery.rows );
        } else {
          res.send("No Products");
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
        const newProductQuery = await pool.query(
          "INSERT INTO products (name, description, seller_id, catagory_id) VALUES($1, $2, (SELECT id FROM users WHERE id=$3), (SELECT id FROM catagories WHERE id=$4)) RETURNING id, name, description, seller_id, catagory_id",
          [name, description, sellerId, categoryId]
        );
        if (newProductQuery.rowCount ===1){
            res.json({ product: newProductQuery.rows[0] })
        }else {
            res.json({message: 'failed to post product'})
        }
            
        } catch (err) {
            res.json({ message: JSON.stringify(err)})
        }
    })
    router.patch('/:productId',async  (req, res) => {
      // update req.params.id
      const { name, description, sellerId, categoryId } = req.body;
      const responseObj = {};
    
      if (name) {
        try {
          
          const updatedProductQuery = await pool.query(
            "UPDATE products SET name=$1 WHERE id=$2",
            [name, req.params.productId]
          );
          if (updatedProductQuery.rowCount === 1) {
              responseObj.name = name
              responseObj.isNameUpdated = true
          }
          else {
              responseObj.isNameUpdated = false 
          }
        }catch(err){
            responseObj.isNameUpdated = false 
        }
      }
      if (description) {
        try {
          const updatedProductQuery = await pool.query(
            "UPDATE products SET description=$1 WHERE id=$2",
            [description, req.params.productId]
          );
          
          if (updatedProductQuery.rowCount === 1) {

            responseObj.description = description;
            responseObj.isDescriptionUpdated = true;
        } else {
            responseObj.isDescriptionUpdated = false;
          }
        } catch (err) {
          responseObj.isDescriptionUpdated = false;
        }
      }
      if (categoryId) {
        try {
          const updatedProductQuery = await pool.query(
            "UPDATE products SET catagory_id=(SELECT id FROM catagories WHERE id=$1) WHERE id=$2",
            [categoryId, req.params.productId]
          );
          if (updatedProductQuery.rowCount === 1) {
            responseObj.categoryId = categoryId;
            responseObj.isCategoryUpdated = true;
        } else {
            responseObj.isCategoryUpdated = false;
            
          }
        } catch (err) {
          responseObj.isCategoryUpdated = false;
        }
      }
      res.json(responseObj);

    })
router.delete('/:productId', async (req, res) => {
    // delete req.params.id
    try {
      const deletedProductQuery = await pool.query(
        "DELETE FROM products WHERE id=$1",
        [req.params.productId]
      );
      if (deletedProductQuery.rowCount === 1) {
          res.json({ message: `Deleted product with id: ${req.params.productId}` });
        } else {
            
            res.json({ message: `ID ${req.params.productId} does not exist` });
            
        }
    } catch (err) {
        res.json({ message: `Some error occured when deleting product with id: ${req.params.productId}` });
    }

})


router.use("/:productId/images", imageRouter);



module.exports = router

