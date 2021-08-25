"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Middlewares that I going to use here
var userCookie_1 = require("../middleware/userCookie");
var sendDataProduct_1 = require("../middleware/sendDataProduct");
//I import the function of the Controlers that Im going to use here
var cartController_1 = require("../controllers/cartController");
//When the user click to start a new survey I call this method
router.post('/addCart', userCookie_1.userCookieRead, sendDataProduct_1.sendDataProduct, cartController_1.addCart);
router.get('/infoCart/:cartId', userCookie_1.userCookieRead, cartController_1.infoCart);
router["delete"]('/deleteProduct/:productId/:cartId', userCookie_1.userCookieRead, cartController_1.deleteProduct);
module.exports = router;
