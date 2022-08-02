const express = require("express");
const app = express()
const authRouter = require('./routers/authRouter')

app.use(express.json())
app.use("/auth", authRouter);

app.listen(4000)