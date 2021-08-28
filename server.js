const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const path = require("path");
const pathToPublicFolder  = path.resolve(__dirname, "./public");
const morgan = require('morgan');

app.use(express.json());
app.use(express.static(pathToPublicFolder));

//It usefull to see information in the console when I call the server
app.use(morgan('tiny'));

//I use this to read a cookie (I can create it with out this)
app.use(cookieParser());

//Route (I import the routes of users, products and cart)
const userRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const cartRoute = require('./routes/cartRoute');

//Use of that Routes that I imported
app.use('/user', userRoute);
app.use('/products', productsRoute);
app.use('/cart', cartRoute);

app.listen(port, () => { console.log(`Listening on port: ${port}`) });