export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead } from '../middleware/userCookie';
import { checkStock } from '../middleware/checkStock';

//I import the function of the Controlers that Im going to use here
import { addCart, infoCart, deleteProduct, finalPurchase, allCartsPurchased, changeStatus } from '../controllers/cartController'

//When the user click to start a new survey I call this method
router.post('/addCart', userCookieRead, checkStock, addCart);
router.post('/purchase', userCookieRead, finalPurchase);
router.get('/infoCart/:cartId', userCookieRead, infoCart);
router.get('/allPurchase', userCookieRead, allCartsPurchased);
router.delete('/deleteProduct/:productId/:cartId', userCookieRead, deleteProduct);
router.put('/changeStatus', userCookieRead, changeStatus);

module.exports = router;