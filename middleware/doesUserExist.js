"use strict";
exports.__esModule = true;
exports.doesUserExist = void 0;
var userModel_1 = require("../models/userModel");
function doesUserExist(req, res, next) {
    try {
        var email_1 = req.body.email;
        //Get all users to see if the user already exist
        var allUsers = new userModel_1.Users();
        allUsers.users;
        var userExist = allUsers.users.find(function (user) { return user.email === email_1; });
        if (userExist) {
            res.status(400).send('User already exist');
            return;
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.doesUserExist = doesUserExist;
