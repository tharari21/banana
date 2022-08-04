const express = require('express')
const cors = require('cors')
const stripe = require('stripe')()
//STRIPE_PRIVATE_KEY
// on checkout btn add post request to server for items
//items: {[{id: , quantity}]}
//server will return url
//window.location = url

//add end point for post request 
// const stripe.checkout.sessions.create({
//payment_methode_types: ['card],
//mode: 'payment',
//success_url: ,
//cancel_url: ,
//line_items: req.body.items.map(item => {const storeItem = requestedItems.get(item.id)
//return {
//  price_data: {
//  currency: 'usd',
//  product_data: {
    //nameL storeItem.name
//},
//unit_amount: storeItem.priceInCents
//},
// quantitiy: item.quantity
//}})
//})
//res.json({url: session.url})
const productsRouter = require('./routers/productsRouter')
const categoriesRouter = require("./routers/categoriesRouter");
const cartRouter = require("./routers/cartRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();
app.use(express.json());
// app.set('trust proxy', 1) // trust first proxy
app.use(cors());


app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use('users/:userId', usersRouter);
app.use('/cart', cartRouter)

app.listen(5000)


