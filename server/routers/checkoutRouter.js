// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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

module.exports = router