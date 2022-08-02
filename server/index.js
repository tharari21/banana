const express = require('express')
const cors = require('cors')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const pgSession = require("connect-pg-simple")(session);
const authRouter = require('./routers/authRouter')
const productsRouter = require('./routers/productsRouter')
const categoriesRouter = require("./routers/categoriesRouter");
const pool = require("./db");

const app = express();
app.set('trust proxy', 1) // trust first proxy

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: oneDay,
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax", // Will cookie be communicated to different domains?
    },
    credentials: true,
    name: "sid", // sessioln id
    resave: false, // It enables the session to be stored back to the session store, even if the session was never modified during the request. This can result in a race situation in case a client makes two parallel requests to the server. Thus modification made on the session of the first request may be overwritten when the second request ends. The default value is true. However, this may change at some point. false is a better alternative.
    saveUninitialized: false, // Only save cookie if user successfully logged in.
    store: new pgSession({
        // Insert connect-pg-simple options here
      pool: pool, // Connection pool
    //   tableName: "user_sessions",
    }),
  })
);
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);


app.listen(5000, () => {
    console.log('listening')
    
 
})