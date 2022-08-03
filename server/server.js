const express = require('express')
const cors = require('cors')

const productsRouter = require('./routers/productsRouter')
const categoriesRouter = require("./routers/categoriesRouter");
const cartRouter = require("./routers/cartRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();
app.use(express.json());
app.set('trust proxy', 1) // trust first proxy
app.use(cors({
  origin: ['http://10.129.2.168:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));


app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use('users/:userId', usersRouter);
app.use('/cart', cartRouter)

app.listen(5000)


