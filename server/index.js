const express = require('express')
const cors = require('cors')

const authRouter = require('./routers/authRouter')
const productsRouter = require('./routers/productsRouter')
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productsRouter);


app.listen(5000, () => {
    console.log('listening')
})