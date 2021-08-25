export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead, userCookieWrite } from '../middleware/userCookie';
import { sendEmail } from '../middleware/sendEmail'
import { checkUnpurachaseCart } from '../middleware/unpurchaseCarts'

//I import the function of the Controlers that Im going to use here
import { registerUser, findUser, login} from '../controllers/userController'

router.post('/register', userCookieWrite, sendEmail, registerUser);
router.get('/username/:email', findUser);
router.get('/info', userCookieRead, findUser);
router.post('/login', userCookieWrite, checkUnpurachaseCart, login);

module.exports = router;