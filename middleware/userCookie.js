"use strict";
exports.__esModule = true;
exports.userCookieRead = exports.userCookieWrite = void 0;
var jwt = require('jwt-simple');
require('dotenv').config();
function userCookieWrite(req, res, next) {
    try {
        //Get the information from the body and from the middleware (doesUserExist)
        var email = req.body.email;
        var username = req.username;
        var role = req.role;
        if (!username || !email || !role)
            throw new Error("User details processing issues");
        //Here I set the cookie
        var cookieToWrite = JSON.stringify({ username: username, email: email, role: role });
        var token = jwt.encode(cookieToWrite, process.env.SECRET_KEY);
        //The cookie is going to expire in 30 minutes
        res.cookie("userInfo", token, { maxAge: 1800000, httpOnly: true });
        req.email = email;
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
            var username = cookie.username, email = cookie.email, role = cookie.role;
            req.username = username;
            req.email = email;
            req.role = role;
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
