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

module.exports = router;