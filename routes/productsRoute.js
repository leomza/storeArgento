"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Middlewares that I going to use here
var userCookie_1 = require("../middleware/userCookie");
//I import the function of the Controlers that Im going to use here
var productController_1 = require("../controllers/productController");
//When the user click to start a new survey I call this method
router.post('/newProduct', userCookie_1.userCookieRead, productController_1.newProduct);
router.get('/allProducts', productController_1.getAllProducts);
router["delete"]('/deleteProduct/:id', userCookie_1.userCookieRead, productController_1.removeProduct);
router.get('/productDetail/:id', productController_1.productDetail);
router.put('/updateProduct/:id', userCookie_1.userCookieRead, productController_1.editProduct);
module.exports = router;
