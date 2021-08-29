"use strict";
exports.__esModule = true;
exports.userCookieRead = exports.userCookieWrite = void 0;
var jwt = require('jwt-simple');
require('dotenv').config();
var userModel_1 = require("../models/userModel");
function userCookieWrite(req, res, next) {
    try {
        //Get the information from the body and from the middleware (doesUserExist)
        var email = req.body.email;
        var allUsers = new userModel_1.Users();
        var user = allUsers.findUser(email);
        if (!user) {
            var _a = req.body, username = _a.username, role = _a.role;
            var hashPassword = req.hashPassword;
            user = new userModel_1.User(username, email, hashPassword, role);
        }
        //Here I set the cookie
        var cookieToWrite = JSON.stringify({ id: user.uuid });
        var token = jwt.encode(cookieToWrite, process.env.SECRET_KEY);
        //The cookie is going to expire in 30 minutes
        res.cookie("userInfo", token, { maxAge: 1800000, httpOnly: true });
        req.email = email;
        req.username = user.username;
        req.role = user.role;
        req.user = user;
        //"Next" means that I will continue with the Route
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.userCookieWrite = userCookieWrite;
function userCookieRead(req, res, next) {
    try {
        var userInfo = req.cookies.userInfo;
        if (userInfo) {
            var decoded = jwt.decode(userInfo, process.env.SECRET_KEY);
            var cookie = JSON.parse(decoded);
            var id = cookie.id;
            var allUsers = new userModel_1.Users();
            var user = allUsers.findUserById(id);
            req.username = user.username;
            req.email = user.email;
            req.role = user.role;
            next();
        }
        else {
            res.status(401).send({ cookieExist: req.cookieExists, message: 'The session has expired. Please log in again.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.userCookieRead = userCookieRead;
