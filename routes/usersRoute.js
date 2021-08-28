"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Middlewares that I going to use here
var userCookie_1 = require("../middleware/userCookie");
var sendEmail_1 = require("../middleware/sendEmail");
var unpurchaseCarts_1 = require("../middleware/unpurchaseCarts");
var doesUserExist_1 = require("../middleware/doesUserExist");
var validateBody_1 = require("../middleware/validateBody");
var Schemas = require('../schemas/allSchemas');
var encryptPassword_1 = require("../middleware/encryptPassword");
//I import the function of the Controlers that Im going to use here
var userController_1 = require("../controllers/userController");
router.post('/register', validateBody_1.validateBody(Schemas.registerSchemaFJS), doesUserExist_1.doesUserExist, encryptPassword_1.encryptPassword, userCookie_1.userCookieWrite, sendEmail_1.sendEmail, userController_1.registerUser);
router.get('/username/:email', userController_1.findUser);
router.get('/info', userCookie_1.userCookieRead, userController_1.findUser);
router.post('/login', userCookie_1.userCookieWrite, encryptPassword_1.decryptPassword, unpurchaseCarts_1.checkUnpurachaseCart, userController_1.login);
module.exports = router;
