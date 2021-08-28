export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead, userCookieWrite } from '../middleware/userCookie';
import { sendEmail } from '../middleware/sendEmail'
import { checkUnpurachaseCart } from '../middleware/unpurchaseCarts'
import { doesUserExist } from '../middleware/doesUserExist';
import { validateBody } from '../middleware/validateBody';
const Schemas = require('../schemas/allSchemas');
import { encryptPassword, decryptPassword } from '../middleware/encryptPassword';

//I import the function of the Controlers that Im going to use here
import { registerUser, findUser, login } from '../controllers/userController'

router.post('/register', validateBody(Schemas.registerSchemaFJS), doesUserExist, encryptPassword, userCookieWrite, sendEmail, registerUser);
router.get('/username/:email', findUser);
router.get('/info', userCookieRead, findUser);
router.post('/login', userCookieWrite, decryptPassword, checkUnpurachaseCart, login);

module.exports = router;