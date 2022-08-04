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
      const cart = userCartQuery.rows.map(cartItem => {return {...cartItem, ...productsQuery.rows.find(product => product.id === cartItem.product_id)}})

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
    const {name, description, sellerId, categoryId, rating, price} = req.body;
    try {
        const newCartQuery = await pool.query(
          "INSERT INTO cart (name, description, seller_id, catagory_id, rating, price) VALUES($1, $2, (SELECT id FROM users WHERE id=$3), (SELECT id FROM catagories WHERE id=$4), $5,$6) RETURNING id, name, description, seller_id, catagory_id, rating, price",
          [name, description, sellerId, categoryId, rating, price]
        );
        if (newCartQuery.rowCount ===1){
            res.json({ product: newCartQuery.rows[0] })
        }else {
            res.json({message: 'failed to post product to cart'})
        }
            
        } catch (err) {
            res.json({ message: JSON.stringify(err)})
        }
    })

module.exports = router;