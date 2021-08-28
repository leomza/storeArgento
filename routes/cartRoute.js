"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Middlewares that I going to use here
var userCookie_1 = require("../middleware/userCookie");
var checkStock_1 = require("../middleware/checkStock");
var isAdmin_1 = require("../middleware/isAdmin");
//I import the function of the Controlers that Im going to use here
var cartController_1 = require("../controllers/cartController");
//When the user click to start a new survey I call this method
router.post('/addCart', userCookie_1.userCookieRead, checkStock_1.checkStockProduct, cartController_1.addCart);
router.post('/changeQuantity', userCookie_1.userCookieRead, checkStock_1.checkStockProduct, cartController_1.changeQuantity);
router.post('/purchase', userCookie_1.userCookieRead, checkStock_1.checkStockCart, cartController_1.finalPurchase);
router.get('/infoCart/:cartId', userCookie_1.userCookieRead, cartController_1.infoCart);
router.get('/allPurchase', userCookie_1.userCookieRead, isAdmin_1.isAdmin, cartController_1.allCartsPurchased);
router["delete"]('/deleteProduct/:productId/:cartId', userCookie_1.userCookieRead, cartController_1.deleteProduct);
router.put('/changeStatus', userCookie_1.userCookieRead, isAdmin_1.isAdmin, cartController_1.changeStatus);
module.exports = router;
