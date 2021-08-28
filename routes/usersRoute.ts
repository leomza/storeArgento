export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead, userCookieWrite } from '../middleware/userCookie';
import { sendEmail } from '../middleware/sendEmail'
import { checkUnpurachaseCart } from '../middleware/unpurchaseCarts'
import { doesUserExistRegister, doesUserExistLogin } from '../middleware/doesUserExist';
import { validateBody } from '../middleware/validateBody';
const Schemas = require('../schemas/allSchemas');
import { encryptPassword, decryptPassword } from '../middleware/encryptPassword';

//I import the function of the Controlers that Im going to use here
import { registerUser, findUser, login } from '../controllers/userController'

router.post('/register', validateBody(Schemas.registerSchemaFJS), doesUserExistRegister, encryptPassword, userCookieWrite, sendEmail, registerUser);
router.post('/login', doesUserExistLogin, userCookieWrite, decryptPassword, checkUnpurachaseCart, login);
router.get('/info', userCookieRead, findUser);

module.exports = router;