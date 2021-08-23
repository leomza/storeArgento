export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead, userCookieWrite } from '../middleware/userCookie';

//I import the function of the Controlers that Im going to use here
import { registerUser, findUsername, login} from '../controllers/userController'

router.post('/register', userCookieWrite, registerUser);
router.get('/username/:email', findUsername);
router.post('/login', userCookieWrite, login);
/*router.get('/info', userCookieRead, sendCookie);
//When the user click to finish the new survey I call this method
router.post('/uploadUserWithSurvey/:uuid', userCookieRead, isAdmin, uploadSurvey);
router.post('/answerLoginBefore', userCookieWrite, sendCookie);
router.post('/answerLoginAfter/:uuid', userCookieRead, answerLogin);
router.delete('/deleteSurvey/:uuid', userCookieRead, deleteSurveyUser); */

module.exports = router;