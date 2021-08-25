export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead, userCookieWrite } from '../middleware/userCookie';

//I import the function of the Controlers that Im going to use here
import { newProduct, getAllProducts, removeProduct, productDetail, editProduct } from '../controllers/productController'

//When the user click to start a new survey I call this method
router.post('/newProduct', userCookieRead, newProduct);
router.get('/allProducts', getAllProducts);
router.delete('/deleteProduct/:id', userCookieRead, removeProduct);
router.get('/productDetail/:id', productDetail);
router.put('/updateProduct/:id', userCookieRead, editProduct);

module.exports = router;