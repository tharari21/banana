const jwt = require("jsonwebtoken");
const pool = require("../db");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')


const generateAccessToken = (user) => {
  return [
    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" }),
    jwt.sign(user, process.env.REFRESH_TOKEN_SECRET),
  ];
};

router.post("/token", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.json({ message: "No refresh token was sent" });
  const tokenExistsQuery = await pool.query(
    "SELECT * FROM tokens WHERE token=$1",
    [refreshToken]
  );
  if (tokenExistsQuery.rowCount === 0) {
    return res.json({ message: "" });
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.json({ message: "Error", ...err });
      }
      const accessToken = generateAccessToken(user);
      res.json(accessToken);
    });
  }
});

router.delete("/logout", async (req, res) => {
  const deleteTokenQuery = await pool.query(
    "DELETE FROM tokens WHERE token=$1",
    [req.body.token]
  );
  if (deleteTokenQuery.rowCount === 1) {
    res.sendStatus(204);
    res.redirect("/login");
  } else {
    res.sendStatus();
  }
});

router.post("/login", async (req, res) => {
    
  const { email, password } = req.body;
  const potentialLogin = await pool.query(
    "SELECT id, email, hashedpassword FROM users WHERE email = $1",
    [email]
  );
  if (potentialLogin.rowCount === 1) {
    const isSamePass = await bcrypt.compare(
      password,
      potentialLogin.rows[0].hashedpassword
    );
    // const isSamePass = password === potentialLogin.rows[0].hashedpassword;
    if (isSamePass) {
      const user = {
        email,
        id: potentialLogin.rows[0].id,
      };
      const [accessToken, refreshToken] = generateAccessToken(user);

      res.json({ user, accessToken, refreshToken });
    } else {
      res.json({ message: "not logged in" });
    }
  } else {
    res.json({ messgae: "invalid email" });
  }
});
router.post("/signup", async (req, res) => {
    console.log(req.body);
  const { email, password, isSeller } = req.body;
  const existingUser = await pool.query(
    "SELECT email FROM users WHERE email =$1",
    [email]
  );
  if (existingUser.rowCount === 0) {
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUserQuery = await pool.query(
      "INSERT INTO users(email, hashedpassword, isSeller) VALUES($1, $2, $3) RETURNING id, email",
      [email, hashedPassword, isSeller]
    );
    const user = {
      email,
      id: newUserQuery.rows[0].id,
    };
    const [accessToken, refreshToken] = generateAccessToken(user);

    res.json({ user, accessToken, refreshToken });
  } else {
    res.json({ message: "An account with that email already exists" });
  }
});

module.exports = router;