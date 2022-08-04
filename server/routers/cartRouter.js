const express = require('express');
const format = require('pg-format')
const pool = require('../db')
const router = express.Router()

router.get('/', async (req, res) => {
  const {userId} = req.query
  try {
    const userCartQuery = await pool.query('SELECT * FROM cart WHERE user_id=$1', [userId])
    const productIds = userCartQuery.rows.map(cartItem => cartItem.product_id)
    if (productIds.length) {
      const productsQuery = await pool.query(format('SELECT * FROM products WHERE id IN (%L)', productIds) )
      console.log(productsQuery.rows)
      // monster line of code right here
      const cart = userCartQuery.rows.map(cartItem => (
        {
            ...cartItem, 
            // ...productsQuery.rows.find(product => product.id === cartItem.product_id)
            product: productsQuery.rows.find(product => product.id === cartItem.product_id)
        }
        ))

      res.json(cart)
    } else {
      res.json([])
    }
  } catch (err) {
    console.log(err)
    res.json({message: 'Error getting from database', ...err})
  }


})

router.post('/', async (req, res) => {
    // Create new item in cart
      const {userId} = req.query
      const {productId} = req.body;
    
    

    try {
        const newCartQuery = await pool.query(
          "INSERT INTO cart (user_id, product_id, quantity) VALUES($1, $2, $3)",
          [userId, productId, 1]
        );
        console.log(newCartQuery.rows)
        if (newCartQuery.rowCount ===1){
            console.log('ITWORKED')
            res.json({ product: newCartQuery.rows[0] })
        }else {
            res.json({message: 'failed to post product to cart'})
        }
            
        } catch (err) {
            res.json(err)
        }
    })

module.exports = router;