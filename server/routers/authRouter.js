const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db')



router.post('/login', async(req,res) => {
    console.log(req.session)
    const {email, password} = req.body;
    const potentialLogin = await pool.query('SELECT id, email, hashedpassword FROM users WHERE email = $1', [email])
    if (potentialLogin.rowCount === 1){
        // const isSamePass = await bcrypt.compare(
        //     password,
        //     potentialLogin.rows[0].hashedpassword
        // );
        const isSamePass = password === potentialLogin.rows[0].hashedpassword;
        if (isSamePass){
            req.session.user = {
                email,
                id: potentialLogin.rows[0].id
            }
            
            res.json({messsage: 'logged in'})
        }else {
            res.json({message: 'not logged in'})
        }


    }else {
        res.json({messgae: 'invalid email'})
    }


})
router.post('/signup', async(req,res) => {
    const {email, password, isSeller} = req.body;
    const existingUser = await pool.query('SELECT email FROM users WHERE email =$1', [email])
    if (existingUser.rowCount === 0){
        const hashedPassword = await bcrypt.hash(password, 10);
        let newUserQuery = await pool.query('INSERT INTO users(email, hashedpassword, isSeller) VALUES($1, $2, $3) RETURNING id, email', [email, hashedPassword, isSeller] )
        req.session.user = {
          email,
          id: potentialLogin.rows[0].id,
        };
        res.json({message: 'signup successful'})
    }else {
        res.json({message: 'An account with that email already exists'})
    }

})

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // Couls nor logout
      res.redirect("/");
    } else {
      res.clearCookie("sid");
      res.redirect("/login");
    }
  });
});
module.exports = router

