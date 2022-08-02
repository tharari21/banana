const express = require('express')
const cors = require('cors')
const productsRouter = require('./routers/productsRouter')
const categoriesRouter = require("./routers/categoriesRouter");

const app = express();
app.use(express.json());
app.set('trust proxy', 1) // trust first proxy
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);


app.listen(5000)

