"use strict";
exports.__esModule = true;
exports.isAdmin = void 0;
var userModel_1 = require("../models/userModel");
function isAdmin(req, res, next) {
    try {
        var allUsers = new userModel_1.Users();
        var user = allUsers.findUser(req.email);
        if (user.role === 'admin') { // user is admin
            next();
        }
        else {
            res.status(401).send('You are not authorized to open this page');
            return;
        }
        ;
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
exports.isAdmin = isAdmin;
