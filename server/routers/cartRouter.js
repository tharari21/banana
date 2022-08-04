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
        const existingCartQuery = await pool.query('SELECT * FROM cart WHERE user_id=$1 AND product_id=$2', [userId, productId])
        if (existingCartQuery.rowCount === 1) {
            existingCartQuery.rows[0].quantity+1
            const updatedQuantityQuery = await pool.query('UPDATE cart SET quantity=$1 WHERE user_id=$2 AND product_id=$3', [existingCartQuery.rows[0].quantity+1,userId, productId])
            res.json({message: 'User has that item in cart. Incremented quantity'})
        } else {
            const newCartQuery = await pool.query(
              "INSERT INTO cart (user_id, product_id, quantity) VALUES($1, $2, $3)",
              [userId, productId, 1]
            );
            console.log(newCartQuery.rows)
            if (newCartQuery.rowCount ===1){
                res.json({ product: newCartQuery.rows[0] })
            }else {
                res.json({message: 'failed to post product to cart'})
            }
                
            
        }
    } catch (err) {
        res.json(err)
    }
})
router.patch('/:cartId', async (req, res) => {
    const {quantity} = req.body;
    try {
        const updateQuantityQuery = await pool.query('UPDATE cart SET quantity=$1 WHERE id=$2 RETURNING id', [quantity, req.params.cartId])
        console.log(updateQuantityQuery.rows)
        if (updateQuantityQuery.rowCount === 1) {
            res.json({updated: true})
        } else {
            res.json({updated: false})
        }

    } catch (err) {
        res.json({updated: false})
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const deleteCartItemQuery = await pool.query('DELETE FROM cart WHERE id=$1', [req.params.id])
        if (deleteCartItemQuery.rowCount === 1) {
            res.json({deleted: true})
        } else {
            res.json({deleted: false, message: `cart id ${req.params.id} does not exist` })
        }
    } catch (err) {
        res.json({deleted: false, message: 'error', ...err})

    }
})

module.exports = router;