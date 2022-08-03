const express = require('express');
const pool = require('../db');
const router = express.Router({mergeParams: true});

router.get('/cart', async (req, res) => {
    await pool('SELECT * FROM cart WHERE user_id=$1', [req.params.userId])
})
module.exports = router