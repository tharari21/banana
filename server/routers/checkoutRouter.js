// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const pool = require('../db')
const express = require('express');
require('dotenv').config()

const router = express.Router();

const YOUR_DOMAIN = 'http://10.129.2.168:3000';

router.post('/create-checkout-session', async (req, res) => {
  const {lineItems} = req.body
  console.log(req.body)
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({redirect_url: session.url});
});


router.delete('/delete-user-cart', async (req, res) => {
    const {userId} = req.query
    try {
        const deleteCartQuery = await pool.query('DELETE FROM cart WHERE user_id=$1', [userId])
        console.log(deleteCartQuery)
        if (deleteCartQuery.rowCount > 0) {
            res.json({deleted: true})
        }else {
            res.json({deleted: false})
        }
        
    } catch (err) {
      console.log(err)
        res.json({deleted: false})
        
    }
})


module.exports = router