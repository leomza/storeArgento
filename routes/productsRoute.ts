export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead } from '../middleware/userCookie';
import { validateBody } from '../middleware/validateBody';
const Schemas = require('../schemas/allSchemas');
import { isAdmin } from '../middleware/isAdmin';

//I import the function of the Controlers that Im going to use here
import { newProduct, getAllProducts, removeProduct, productDetail, editProduct } from '../controllers/productController'

//When the user click to start a new survey I call this method
router.post('/newProduct', userCookieRead, isAdmin, validateBody(Schemas.productSchemaFJS), newProduct);
router.get('/allProducts', userCookieRead, getAllProducts);
router.delete('/deleteProduct/:id', userCookieRead, isAdmin, removeProduct);
router.get('/productDetail/:id', userCookieRead, productDetail);
router.put('/updateProduct/:id', userCookieRead, isAdmin, editProduct);

module.exports = router;