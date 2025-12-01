const express =require('express');
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
// models 
const userModel = require('./models/user-model');
const productModel = require('./models/product-model');
const ownerModel = require('./models/owner-model');
// database 
const db = require('./config/mongoose-connection');

// Routers 
const userRouter = require('./routes/usersRouter');
const productRouter = require('./routes/productsRouter');
const ownerRouter = require('./routes/ownersRouter');

app.use(express.json());                    
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/owner', ownerRouter);

app.listen(3000);