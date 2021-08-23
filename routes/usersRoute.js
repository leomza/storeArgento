"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Middlewares that I going to use here
var userCookie_1 = require("../middleware/userCookie");
//I import the function of the Controlers that Im going to use here
var userController_1 = require("../controllers/userController");
router.post('/register', userCookie_1.userCookieWrite, userController_1.registerUser);
router.get('/username/:email', userController_1.findUsername);
router.post('/login', userCookie_1.userCookieWrite, userController_1.login);
/*router.get('/info', userCookieRead, sendCookie);
//When the user click to finish the new survey I call this method
router.post('/uploadUserWithSurvey/:uuid', userCookieRead, isAdmin, uploadSurvey);
router.post('/answerLoginBefore', userCookieWrite, sendCookie);
router.post('/answerLoginAfter/:uuid', userCookieRead, answerLogin);
router.delete('/deleteSurvey/:uuid', userCookieRead, deleteSurveyUser); */
module.exports = router;
