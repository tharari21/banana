const express = require("express");
const cors = require('cors')
const jwt = require("jsonwebtoken");
const pool = require("./db");
const bcrypt = require('bcrypt')
const app = express()

app.use(express.json())
app.use(cors())
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" })
};


app.get("/logout", async (req, res) => {
    localStorage.clear();
});

app.post("/login", async (req, res) => {
  
  const { email, password } = req.body;
  const potentialLogin = await pool.query(
    "SELECT id, email, hashedpassword FROM users WHERE email = $1",
    [email]
  );
  console.log(email)
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
      const accessToken = generateAccessToken(user);

      res.json({ user, accessToken });
    } else {
      res.json({ message: "Incorrect username/password" });
    }
  } else {
    res.json({ messgae: "Incorrect username/password" });
  }
});
app.post("/signup", async (req, res) => {
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
    const accessToken = generateAccessToken(user);

    res.json({ user, accessToken });
  } else {
    res.json({ message: "An account with that email already exists" });
  }
});


app.listen(4000)