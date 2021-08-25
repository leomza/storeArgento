/* Take a previous "online-store" app that you created in previous exercises, or take another student store.
create a backend for the store
all data will be stored in the backend
the user will see all products
the user will search for a product
the user will click a product and see it on a "product page"
on the products page, each product can be updated or deleted
the user will log-in/register
only logged in user can add a product to cart, change the quantity, and delete from cart */

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const path = require("path");
const pathToPublicFolder  = path.resolve(__dirname, "./public");

app.use(express.json());
app.use(express.static(pathToPublicFolder));

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