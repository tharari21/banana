const express = require('express');
const format = require('pg-format')
const pool = require('../db')
const router = express.Router()

router.get('/', async (req, res) => {
  const {userId} = req.query
  console.log(userId)
  try {
    const userCartQuery = await pool.query('SELECT * FROM cart WHERE user_id=$1', [userId])
    const productIds = userCartQuery.rows.map(cartItem => cartItem.product_id)
    if (productIds.length) {
      const productsQuery = await pool.query(format('SELECT * FROM products WHERE id IN (%L)', productIds) )
      res.json(userCartQuery.rows)
    } else {
      res.json([])
    }
  } catch (err) {
    console.log(err)
    res.json({message: 'Error getting from database', ...err})
  }


})

module.exports = router;