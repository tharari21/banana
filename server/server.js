const express = require('express')
const cors = require('cors')

const productsRouter = require('./routers/productsRouter')
const categoriesRouter = require("./routers/categoriesRouter");
const cartRouter = require("./routers/cartRouter");
const usersRouter = require("./routers/usersRouter");
const checkoutRouter = require('./routers/checkoutRouter')
const app = express();
app.use(express.json());
// app.set('trust proxy', 1) // trust first proxy
app.use(cors());


app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use('users/:userId', usersRouter);
app.use('/cart', cartRouter)
app.use('/checkout', checkoutRouter)

app.listen(5000)


