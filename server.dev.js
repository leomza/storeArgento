"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var cookieParser = require('cookie-parser');

var path = require("path");

var pathToPublicFolder = path.resolve(__dirname, "./public");
app.use(express.json());
app.use(express["static"](pathToPublicFolder)); //I use this to read a cookie (I can create it with out this)

app.use(cookieParser()); //Route (I import the routes of users and products)

var userRoute = require('./routes/usersRoute');

var productsRoute = require('./routes/productsRoute'); //Use of that Routes that I imported


app.use('/user', userRoute);
app.use('/products', productsRoute);
app.listen(port, function () {
  console.log("Listening on port: ".concat(port));
});