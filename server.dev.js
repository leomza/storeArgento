"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var cookieParser = require('cookie-parser');

var path = require("path");

var pathToPublicFolder = path.resolve(__dirname, "./public");

var morgan = require('morgan');

app.use(express.json());
app.use(express["static"](pathToPublicFolder)); //It usefull to see information in the console when I call the server

app.use(morgan('tiny')); //I use this to read a cookie (I can create it with out this)

app.use(cookieParser()); //Route (I import the routes of users, products and cart)

var userRoute = require('./routes/usersRoute');

var productsRoute = require('./routes/productsRoute');

var cartRoute = require('./routes/cartRoute'); //Use of that Routes that I imported


app.use('/user', userRoute);
app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.listen(port, function () {
  console.log("Listening on port: ".concat(port));
});