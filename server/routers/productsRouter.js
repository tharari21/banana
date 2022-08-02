const express = require('express')
const pool = require('../db');
const router = express.Router();
const imageRouter = require('./imageRouter');
const jwt = require('jsonwebtoken')
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.json({message: 'No token provided'})
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.json({message: 'Token no longer valid'})// A token was given but is no longer valid
    } else {
      req.user = user;
      next();
    }
  });
};


router.get('/',  async (req, res) => {
    // return all products

    try {
        const productsQuery = await pool.query('SELECT * FROM products');
        if (productsQuery.rowCount > 0) {
          res.json( productsQuery.rows );
        } else {
          res.json({message: "No Products"});
        }
    } catch (err) {
        res.json({message: 'ERROR', error: err})
    }
})
router.post('/', async (req, res) => {
    // Create new product
    const {name, description, sellerId, categoryId, rating, price} = req.body;
    try {
        const newProductQuery = await pool.query(
          "INSERT INTO products (name, description, seller_id, catagory_id, rating, price) VALUES($1, $2, (SELECT id FROM users WHERE id=$3), (SELECT id FROM catagories WHERE id=$4), $5,$6) RETURNING id, name, description, seller_id, catagory_id, rating, price",
          [name, description, sellerId, categoryId, rating, price]
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
      const { name, description, sellerId, categoryId, rating, price } = req.body;
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
      if (rating) {
        try {
          const updatedProductQuery = await pool.query(
            "UPDATE products SET rating=$1 WHERE id=$2",
            [rating, req.params.productId]
          );
          if (updatedProductQuery.rowCount === 1) {
            responseObj.rating = rating;
            responseObj.isRatingUpdated = true;
        } else {
            responseObj.isRatingUpdated = false;
            
          }
        } catch (err) {
          responseObj.isRatingUpdated = false;
        }
      }
      if (price) {
        try {
          const updatedProductQuery = await pool.query(
            "UPDATE products SET price=$1 WHERE id=$2",
            [price, req.params.productId]
          );
          if (updatedProductQuery.rowCount === 1) {
            responseObj.price = price;
            responseObj.isPriceUpdated = true;
        } else {
            responseObj.isPriceUpdated = false;
            
          }
        } catch (err) {
          responseObj.isPriceUpdated = false;
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

