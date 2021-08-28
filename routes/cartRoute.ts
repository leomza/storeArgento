export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead } from '../middleware/userCookie';
import { checkStockProduct, checkStockCart } from '../middleware/checkStock';
import { isAdmin } from '../middleware/isAdmin';

//I import the function of the Controlers that Im going to use here
import { addCart, infoCart, deleteProduct, finalPurchase, allCartsPurchased, changeStatus } from '../controllers/cartController'

//When the user click to start a new survey I call this method
router.post('/addCart', userCookieRead, checkStockProduct, addCart);
router.post('/purchase', userCookieRead, checkStockCart, finalPurchase);
router.get('/infoCart/:cartId', userCookieRead, infoCart);
router.get('/allPurchase', userCookieRead, isAdmin, allCartsPurchased);
router.delete('/deleteProduct/:productId/:cartId', userCookieRead, deleteProduct);
router.put('/changeStatus', userCookieRead, isAdmin, changeStatus);

module.exports = router;