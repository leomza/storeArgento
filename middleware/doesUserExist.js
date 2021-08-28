"use strict";
exports.__esModule = true;
exports.doesUserExistLogin = exports.doesUserExistRegister = void 0;
var userModel_1 = require("../models/userModel");
function doesUserExistRegister(req, res, next) {
    try {
        var _a = req.body, email = _a.email, username = _a.username, role = _a.role;
        //Get all users to see if the user already exist
        var allUsers = new userModel_1.Users();
        allUsers.users;
        var userExist = allUsers.findUser(email);
        if (userExist) {
            res.status(400).send('User already exist');
            return;
        }
        req.username = username;
        req.role = role;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.doesUserExistRegister = doesUserExistRegister;
function doesUserExistLogin(req, res, next) {
    try {
        var email = req.body.email;
        //Get all users to see if the user exist
        var allUsers = new userModel_1.Users();
        var userExist = allUsers.findUser(email);
        if (!userExist) {
            res.status(400).send("User doesn't exist");
            return;
        }
        req.username = userExist.username;
        req.role = userExist.role;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.doesUserExistLogin = doesUserExistLogin;
